const express = require("express")
const router = express.Router();
const path = require("path");
const modelStep=require(path.join(__dirname,"../../Back/app/models/Step"))


router.post("/createStep",(req,res)=>{
  console.log(req.body);
  data=req.body;
  modelStep.create(data.NAME,data.DESCRIPTION,data.DURATION,data.INGREDIENT).then((result)=>{
      res.json({ID:result});
      res.status(201).end();
    }
  ).catch((e)=>{
    console.log(e);
    res.status(400).end();
  });
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

module.exports=router;
