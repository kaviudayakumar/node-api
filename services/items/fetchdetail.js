const { response } = require('express');
const querySqlDb=require('../../db/connect-sql-db.js');
let sql;
function getItems(params,resDataCallback) {
    sql="SELECT * FROM `items`";
querySqlDb.executeQuery(sql,(data)=>{
   
    if(data){       
        return resDataCallback(data);
    }
    else{
        console.log("Error msg:" + data.sqlMessage);
        return resDataCallback(data);
       
    }
},(err)=>{
    console.log("Error msg for query execution");
    console.log(err);
    return resDataCallback(data);
});
}

function getItem(params,resDataCallback){
    sql="SELECT * FROM `items` WHERE id="+params;
    querySqlDb.executeQuery(sql,(data)=>{
   
        if(data){       
            return resDataCallback(data);
        }
        else{
            console.log("Error msg:" + data.sqlMessage);
            return resDataCallback(data);           
        }
    });
}

function insertItem(params,resDataCallback) {
    sql="INSERT INTO `items`(`name`, `createdOn`) VALUES ('"+params+"',CURRENT_TIMESTAMP);";
    querySqlDb.executeQuery(sql,(data)=>{
   
        if(data){       
            return resDataCallback(data);
        }
        else{
            console.log("Error msg:" + data.sqlMessage);
            return resDataCallback(data);           
        }
    });
}

//updateItem

function updateItem(params,resDataCallback) {
    sql="UPDATE `items` SET `name`='"+params.name+"',`updatedOn`=CURRENT_TIMESTAMP WHERE `id`="+params.id;
    querySqlDb.executeQuery(sql,(data)=>{
   
        if(data){       
            return resDataCallback(data);
        }
        else{
            console.log("Error msg:" + data.sqlMessage);
            return resDataCallback(data);           
        }
    });
}

function deleteItem(params,resDataCallback) {
    sql="DELETE FROM items WHERE `items`.`id` ="+params.id;
    querySqlDb.executeQuery(sql,(data)=>{
   
        if(data){       
            return resDataCallback(data);
        }
        else{
            console.log("Error msg:" + data.sqlMessage);
            return resDataCallback(data);           
        }
    });
}

/**
 * buildResponse based on data
 * @params: data from Db
 * @params: callback function
 */
function buildResponse(data,isErrMsg){
    let response=null;
    let errRespose=isErrMsg? true:false
    if(data && data.code){
        response={
            status:"Error",
            result:data.sqlMessage ? data.sqlMessage:data.code
        }

    }
    else if(errRespose==true)
    {
        response={
            status:"Error",
            result: "Error. Try Again"
        }

        
    }
    else{
        response={
            status:"Success",
            result:data
        }
    }
console.log("Response:");
console.log(response)
    return response;
}
//getItems(null)

module.exports={
    getItems,
    buildResponse,
    getItem,
    insertItem,
    updateItem,
    deleteItem
}

