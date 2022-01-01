const express = require("express")
const router = express.Router();
const path = require("path");

const modelCategory=require(path.join(__dirname,"../../Back/app/models/Category"))




router.get("/getCategory/:type",(req,res)=>{
  if(req.params.type=="I_Category"||req.params.type=="A_Category"||req.params.type=="R_Category"){
    modelCategory.getCategory(req.params.type).then((result)=>{
      res.json(JSON.parse(JSON.stringify(result)));
      res.status(200).end();
    })
  }else res.status(400).end();


})

router.post("/createCategory/:type",(req,res)=>{
  if(req.params.type=="I_Category"||req.params.type=="A_Category"||req.params.type=="R_Category"){
    modelCategory.createCategory(req.params.type,req.body.NAME,req.body.URL).then((result)=>{
      res.json(JSON.parse(JSON.stringify(result))[0]);
      res.status(201).end();
    }).catch((e)=>{
      console.log(e);
      res.status(400).end();
    });
  }else res.status(400).end();

})
router.post("/updateCategory/:type",(req,res)=>{
  if(req.params.type=="I_Category"||req.params.type=="A_Category"||req.params.type=="R_Category"){
    modelCategory.updateCategory(req.params.type,req.body.ID,req.body.NAME,req.body.URL).then(()=>{
      res.status(201).end();
    }).catch((e)=>{
      console.log(e);
      res.status(400).end();
    });
  }else res.status(400).end();

})
router.post("/deleteCategory/:type",(req,res)=>{
  if(req.params.type=="I_Category"||req.params.type=="A_Category"||req.params.type=="R_Category"){
    modelCategory.deleteCategory(req.params.type,req.body.ID).then(()=>{
      res.status(201).end();
    }).catch((err)=>{
      console.log(err);
      if(err.errno==1451){
        res.status(405).end();
      }else {
        res.status(404).end();
      }
    });
  }else res.status(400).end();
})



module.exports=router;
