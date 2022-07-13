var mysql = require('mysql');
const sqlConfig=require("./config");
console.log(sqlConfig);
var conPool=mysql.createPool(sqlConfig)

function executeQuery(sql,callback) {
 
  conPool.getConnection((err, connection) => {
       if (err) 
    {
      console.log(err);
      return callback(err);
  }
    console.log("Connected!");
    connection.query(sql, function (err, result) {
      console.log("Before connection release"); // -1
      console.log(conPool._freeConnections.indexOf(connection)); // -1

      connection.release();
      console.log("After connection release");
      console.log(conPool._freeConnections.indexOf(connection)); // 0
      if (err) 
      {
      console.log(err);
      return callback(err);
      }
      else{
        console.log("Result: " );
        console.log(result);
        return callback(result);
      }
     
    });
  });
}
// executeQuery("SELECT * FROM `items`",(data)=>{
//   console.log("From call back function..")
//   console.log(data);
// })
module.exports.executeQuery=executeQuery;

