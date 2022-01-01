const express = require("express")
const router = express.Router();
const path = require("path");
const modelStep=require(path.join(__dirname,"../../Back/app/models/Step"))


router.post("/createStep",(req,res)=>{
  console.log(req.body);
  modelStep.create(req.body.NAME,req.body.DESCRIPTION,req.body.DURATION,req.body.INGREDIENT).then((result)=>{
      res.json({ID:result});
      res.status(201).end();
    }
  ).catch((e)=>{
    console.log(e);
    res.status(400).end();
  });
})
router.get("/getStep",(req,res)=>{
  modelStep.getAll().then((result)=>{
    console.log(result)
    let json=JSON.parse(JSON.stringify(result))
    let cpt=0;
    for(let item of json){
      json[cpt].INGREDIENT=JSON.parse(JSON.parse(JSON.stringify(item.INGREDIENT)));

      cpt++;
    }
    res.json(JSON.parse(JSON.stringify(json)));
    res.status(200).end();
  })
})
router.post("/updateStep",(req,res)=>{
  console.log(req.body);
  modelStep.update(req.body.ID,req.body.NAME,req.body.DESCRIPTION,req.body.DURATION,req.body.INGREDIENT).then((result)=>{
      res.json({ID:result});
      res.status(201).end();
    }
  ).catch((e)=>{
    console.log(e);
    res.status(400).end();
  });
})

router.post("/deleteIngredient", (req, res) => {
  console.log(req.body);

  modelIngredient.deleteIngredient(req.body.ID).then(() => {
      res.status(200).end()
    }
  ).catch((err) => {
    console.log(err)
    res.status(400).end();
  });

})

module.exports=router;
