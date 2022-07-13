const express=require("express")
const router=express.Router()
  
// Handling request using router
router.get('/', (req, res) => {
    console.log("Request for `/items at "+Date());    
    res.send("This is the items request")
},error=>{
    console.log("Invalid request");
    res.status(404).send("Not Found")
})
var items = [
    {
        id: 1,
        name: "Paper"
    },
    {
        id: 2,
        name: "Pen"
    },
    {
        id: 3,
        name: "Scissors"
    },
    {
        id: 4,
        name: "NotePad"
    }
]
router.get('/items', (req, res) => {
    console.log("Request for get Items: `/api/items at "+Date());
    res.send({
        status: "Success",
        result: items
    })
})

router.get('/items/:id', (req, res) => {
    console.log("Request for get specific Item: `/api/items at "+Date());
    let id = parseInt(req.params.id)? parseInt(req.params.id):null;
    let index = items.findIndex(element => element.id == id);
    if (index != -1) {
        res.send({
            status: "Success",
            result:  items[index]
        });
    }
    else {
        //res.status(404).send("Not found");
        res.send({
            status: "Error",
            message: "Error. Try Again"
        })
    }
})

// create or add items
router.post('/items',(req,res)=>{
    console.log("Request for create Item using post: `/api/items at "+Date());

    if(isNaN(req.body.name)){
        let existingNameIndex = items.findIndex(element=> element.name==req.body.name);
        if(existingNameIndex!=-1){
            res.send({
                status:"Error",
                message:"Error. Try Again"
            })
        }
        else{
            const item={
                id: items.length+1,
                name: req.body.name
            }
        
            items.push(item);
            res.send({
                status: "Success",
                result:item
            })
        }
        
    }
    else{
        
        res.send({
            status:"Error",
            message:"Error. Try Again"
        })
    }
   
})
/**
 * add or create items using joi package input validation 
 */
router.post('/items/joi',(req,res)=>{
    console.log("Request for creating an Item using post and joi validation: `/api/items at "+Date());
    console.log("Body of the request")
    console.log(req.body);
    const schema=Joi.object({
        name: Joi.string().min(3).required()
    });

    const result= schema.validate(req.body)
    console.log("Result")
    console.log(result);
    if(result.error){
        res.send({
            status: "Error",
            message: result.error.details[0].message
        })
    }
    else{
        let existingNameIndex = items.findIndex(element=> element.name==req.body.name);
        if(existingNameIndex!=-1){
            res.send({
                status:"Error",
                message:"Error. Try Again"
            })
        }
        else{
            const item={
                id: items.length+1,
                name: req.body.name
            }
        
            items.push(item);
            res.send({
                status: "Success",
                result:item
            })
        }
        
    }
    
})

router.put('/items/:id',(req,res)=>{
    console.log("Request for update specific Item using put: `/api/items at "+Date());
      //find the item exists or not
      let id = parseInt(req.params.id)? parseInt(req.params.id):null;
      let index = items.findIndex(element => element.id == id);
      console.log(`Index value of array ${index}`)
    if(index==-1){
        res.send({
            status:"Error",
            message:"Error. Try Again"
        })
    }
    else{
        //validate the item details
        console.log("body of the request :");
        console.log(req.body);
    const {error}= validateItem(req.body);
    if(error){
        res.send({
            status: "Error",
            message: error.details[0].message
        })
    }
    else{
        //update the item name
        items[index].name=req.body.name;
        res.send({
            status: "Success",
            result: items[index]
        })
    }

    }
})

router.delete('/items',(req,res)=>{
    console.log("Request for deleting specific Item using delete method: `/api/items at "+Date());
 //find the item exists or not
 let id = parseInt(req.body.id)? parseInt(req.body.id):null;
 let index = items.findIndex(element => element.id == id);
   if(index!=-1){
     items.splice(index,1) ;
     res.send({
        status: "Success",
        result: items
    })
   }
    else{
        console.log("Invalid item id provdied.")
        res.send({
            status: "Error",
            result: "Error. Try again"
        })
    }
},(error)=>{
    console.log("Invalid request");
    res.status(404).send("Not Found")
})


function validateItem(item){

    const schema=Joi.object({
        name: Joi.string().min(3).required()
    });

    const result= schema.validate(item)
    console.log("Result")
    console.log(result);    
    return result;
}

module.exports=router;