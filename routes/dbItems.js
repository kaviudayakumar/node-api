const express = require('express')
const router =express.Router();
let response;
//Import required files
const fetchDetials=require('../services/items/fetchdetail')

// Handling request using router
router.get('/db',(req,res)=>{
   return res.send("This request for items from DataBase works")
})

router.get('/db/items',(req,res)=>{
        fetchDetials.getItems(null,(data)=>{
        console.log("response:::");
        console.log(data);
        
        response=fetchDetials.buildResponse(data)
        return res.send(response) 
    })
    
},err=>{
    console.log("Error :")
    console.log(err)
    response=fetchDetials.buildResponse(data,true)
    return res.send(response)
})

router.get('/db/items/:id',(req,res)=>{
    console.log("Request for get specific Item: `/api/items at "+Date());
    let id = parseInt(req.params.id)? parseInt(req.params.id):null;
    if(id!=null){
        fetchDetials.getItem(id,(data)=>{
            console.log("response ::")
            response=fetchDetials.buildResponse(data);
            return res.send(response)
        },(err)=>{
            console.log("Error :")
            console.log(err)
            response=fetchDetials.buildResponse(data,true)
            return res.send(response)
        })
    }
    else{
        response=fetchDetials.buildResponse(null,true)
        return res.send(response)
    }

})

router.post('/db/items',(req,res)=>{
    console.log("Request for create Item using post: `/api/items at "+Date());
    if(isNaN(req.body.name)){
        fetchDetials.insertItem(req.body.name,(data)=>{
            response=fetchDetials.buildResponse(data);
            return res.send(response) 
        })
    }else{
        response=fetchDetials.buildResponse(null,true)
        return res.send(response) 
    }
});

router.put('/db/items',(req,res)=>{
    console.log("Request for create Item using post: `/api/items at "+Date());
    if(isNaN(req.body.name) && parseInt(req.body.id)){
        fetchDetials.updateItem({name:req.body.name,id:req.body.id},(data)=>{
            response=fetchDetials.buildResponse(data);
            return res.send(response) 
        })
    }else{
        response=fetchDetials.buildResponse(null,true)
        return res.send(response) 
    }
});

router.delete('/db/items',(req,res)=>{
    console.log("Request for get specific Item: `/api/items at "+Date());
    let id = parseInt(req.body.id)? parseInt(req.body.id):null;
    if(id!=null){
      fetchDetials.deleteItem({id:req.body.id},(data)=>{
        response=fetchDetials.buildResponse(data);
        return res.send(response) 
      })
    }
    else{
        response=fetchDetials.buildResponse(null,true)
        return res.send(response) 
    }
})
module.exports=router;