const express = require("express")
const router = express.Router();
const path = require("path");
const modelAllergen=require(path.join(__dirname,"../../Back/app/models/Allergen"))


router.post("/createAllergen",(req,res)=>{
  console.log(req.body);
  data=req.body;
  modelAllergen.create(data.NAME,data.ID_Category).then((result)=>{
      res.json(JSON.parse(JSON.stringify(result))[0]);
      res.status(201).end();
    }
  ).catch((e)=>{
    console.log(e);
    res.status(400).end();
  });
})


router.get("/getAll",(req,res)=>{
  modelAllergen.getAll().then((result)=>{
    console.log(JSON.parse(JSON.stringify(result)))
    res.json(JSON.parse(JSON.stringify(result)));
    res.status(200).end();
  })
})
router.post("/deleteAllergen",(req,res)=>{
  console.log(req.body);
  data=req.body;
  modelAllergen.deleteA(data.ID).then().catch((err)=>{
    console.log(err);
  });
  res.status(200).end();

})



module.exports=router;
