const express = require("express")
const router = express.Router();
const path = require("path");
const modelAllergen=require(path.join(__dirname,"../../Back/app/models/Allergen"))


router.post("/createAllergen",(req,res)=>{
  console.log(req.body);
  modelAllergen.create(req.body.NAME,req.body.ID_Category).then((result)=>{
      res.json(JSON.parse(JSON.stringify(result))[0]);
      res.status(201).end();
    }
  ).catch((e)=>{
    console.log(e);
    res.status(400).end();
  });
})
router.post("/updateAllergen",(req,res)=>{
  console.log(req.body);
  modelAllergen.update(req.body.ID,req.body.NAME,req.body.ID_Category).then((result)=>{
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
    res.json(JSON.parse(JSON.stringify(result)));
    res.status(200).end();
  })
})
router.post("/deleteAllergen",(req,res)=>{
  console.log(req.body);
  modelAllergen.deleteA(req.body.ID).then().catch((err)=>{
    console.log(err);
  });
  res.status(200).end();

})



module.exports=router;
