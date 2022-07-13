console.log("From app.js");
const Joi = require('joi')
const express = require('express');
const app = express()
app.use(express.json())

// Importing all the routes
const listItems=require("./routes/items");
const dbListItems=require("./routes/dbItems.js")

app.use("/api/items",listItems);
app.use("/api/db",dbListItems);
//PORT

app.get("/api",(req,res)=>{
    console.log("Requested for :"+req.hostname)
    res.send("API is working...")
},error=>{
    console.log("Invalid request");
    console.log(error)
    res.status(404).send("Not Found")
})
const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}... "`);
    console.log("Started server on :" + new Date())
});
