const express = require("express")
const router = express.Router();
const path = require("path");
const modelIngredient=require(path.join(__dirname,"../app/models/Ingredient"))



router.post("/createIngredient",(req,res)=>{
  console.log(req.body);
  modelIngredient.create([req.body.NAME,req.body.UNIT,req.body.UNIT_PRICE,req.body.ID_Category,req.body.STOCK,req.body.ALLERGEN]).then((result)=>{
      res.json({ID:result});
      res.status(201).end();
    }
  ).catch((e)=>{
    console.log(e);
    res.status(400).end();
  });
})
router.put("/updateIngredient",(req,res)=>{

  modelIngredient.update([req.body.NAME,req.body.UNIT,req.body.UNIT_PRICE,req.body.ID_Category,req.body.STOCK,req.body.ALLERGEN,req.body.ID]).then((result)=>{
      res.json({ID:result});
      res.status(201).end();
    }
  ).catch((e)=>{
    console.log(e);
    res.status(400).end();
  });
})


router.get("/getIngredient",(req,res)=>{
  modelIngredient.getAll().then((result)=>{
    res.json(JSON.parse(JSON.stringify(result)));
    res.status(200).end();
  })
})
router.post("/deleteIngredient",(req,res)=>{
  console.log(req.body);
  modelIngredient.deleteI(req.body.ID).then(()=>{
    res.status(200).end();
  }).catch((err)=>{
    console.log(err);
    if(err.errno==1451){
      res.status(405).end();
    }else {
      res.status(404).end();
    }


  });

})



module.exports=router;
