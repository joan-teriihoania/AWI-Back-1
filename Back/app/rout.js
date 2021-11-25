const express = require("express")
const router = express.Router();
const path = require("path");
const modelIngredient=require(path.join(__dirname,"../../Back/app/models/Ingredient"))
const modelCategory=require(path.join(__dirname,"../../Back/app/models/Category"))


router.post("/createIngredient",(req,res)=>{
  console.log(req.body);
  data=req.body;
  modelIngredient.createIngredient(data.NAME,data.UNIT,data.UNIT_PRICE,data.ID_Category).then();
  res.status(201).end();

})
router.get("/getIngredient",(req,res)=>{
  modelIngredient.getAllIngredient().then((result)=>{
    console.log(JSON.parse(JSON.stringify(result)))
    res.json(JSON.parse(JSON.stringify(result)));
    res.status(200).end();
  })
})
router.post("/deleteIngredient",(req,res)=>{
  console.log(req.body);
  data=req.body;
  modelIngredient.deleteIngredient(data.ID).then().catch((err)=>{
    console.log(err);
  });
  res.status(200).end();

})
router.get("/getICategory",(req,res)=>{
  modelCategory.getCategory("I_Category").then((result)=>{
    console.log(JSON.parse(JSON.stringify(result)))
    res.json(JSON.parse(JSON.stringify(result)));
    res.status(200).end();
  })
})


module.exports=router;
