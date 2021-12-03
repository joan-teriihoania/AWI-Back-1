const express = require("express")
const router = express.Router();
const path = require("path");

const modelCategory=require(path.join(__dirname,"../../Back/app/models/Category"))


router.get("/getICategory",(req,res)=>{
  modelCategory.getCategory("I_Category").then((result)=>{
    console.log(JSON.parse(JSON.stringify(result)))
    res.json(JSON.parse(JSON.stringify(result)));
    res.status(200).end();
  })
})

router.get("/getACategory",(req,res)=>{
  modelCategory.getCategory("A_Category").then((result)=>{
    console.log(JSON.parse(JSON.stringify(result)))
    res.json(JSON.parse(JSON.stringify(result)));
    res.status(200).end();
  })
})
router.get("/getRCategory",(req,res)=>{
  modelCategory.getCategory("R_Category").then((result)=>{
    console.log(JSON.parse(JSON.stringify(result)))
    res.json(JSON.parse(JSON.stringify(result)));
    res.status(200).end();
  })
})


module.exports=router;
