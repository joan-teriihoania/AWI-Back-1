const express = require("express")
const router = express.Router();
const path = require("path");
const modelRecipe= require(path.join(__dirname,"../../Back/app/models/Recipe"));



router.get("/getCost", (req, res) => {
  modelRecipe.getDefaultCost().then((result) => {
    console.log(JSON.parse(JSON.stringify(result))[0])
    res.json(JSON.parse(JSON.stringify(result))[0]);

    res.status(200).end();
  }).catch((err) => {
      console.log(err)
      res.status(400).end()

    }
  )
})

router.put("/setCost",(req,res)=>{

  modelRecipe.setDefaultCost([req.body.COUT_FLUIDE, req.body.COUT_PERSONNEL ,req.body.COUT_ASSAISONEMENT,req.body.ISPERCENT]).then(()=>{
    res.status(200).end();
  }).catch((err) => {
      console.log(err)
      res.status(400).end()
    }
  )
})

router.post("/createRecipe",(req,res)=>{
  modelRecipe.createRecipe(req.body.NAME,req.body.NB_COUVERT,req.body.COUT_ASSAISONNEMENT,req.body.ISPERCENT,req.body.AUTHOR,req.body.ID_Category,req.body.STEP).then((id)=>{
      res.json({ID:id});
      res.status(201).end();
    }
  ).catch((e)=>{
    console.log(e);
    res.status(400).end();
  });
})
router.put("/updateRecipe",(req,res)=>{
  modelRecipe.updateRecipe(req.body.ID,req.body.NAME,req.body.NB_COUVERT,req.body.COUT_ASSAISONNEMENT,req.body.ISPERCENT,req.body.AUTHOR,req.body.ID_Category,req.body.STEP).then((result)=>{
      res.status(201).end();
    }
  ).catch((e)=>{
    console.log(e);
    res.status(400).end();
  });
})
router.post("/deleteRecipe",(req,res)=>{
  modelRecipe.deleteRecipe(req.body.ID).then((result)=>{
    if(result=="Done") {
      console.log(result);
      res.status(201).end();
    }
    else {
      res.json(JSON.parse(JSON.stringify(result)));
      res.status(201).end();
    }
    }
  ).catch((e)=>{
    console.log(e);
    res.status(400).end();
  });
})

router.get("/getAllRecipe", (req, res) => {
  modelRecipe.getAll().then((result) => {
      let json = JSON.parse(JSON.stringify(result))
      let cpt = 0;
      for (let item of json) {
        json[cpt].INGREDIENT = JSON.parse(JSON.parse(JSON.stringify(item.INGREDIENT)));
        cpt++;
      }

      res.json(JSON.parse(JSON.stringify(json)));
      res.status(201).end();
    }
  ).catch((e) => {
    console.log(e)
    res.status(400).end();
  });
})
router.get("/getRecipeById/:id",(req,res)=>{

  modelRecipe.getRecipById(req.params.id).then((result) => {
      let json = JSON.parse(JSON.stringify(result))
      let cpt = 0;
      for (let item of json) {
        json[cpt].INGREDIENT = JSON.parse(JSON.parse(JSON.stringify(item.INGREDIENT)));
        cpt++;
      }

      res.json(JSON.parse(JSON.stringify(json)));
      res.status(201).end();
    }
  ).catch((e) => {
    console.log(e)
    res.status(400).end();
  });
})
router.get("/getAllRecipe/:id", (req, res) => {
  modelRecipe.getAllFiltered(req.params.id).then((result) => {
      let json = JSON.parse(JSON.stringify(result))
      let cpt = 0;
      for (let item of json) {
        json[cpt].INGREDIENT = JSON.parse(JSON.parse(JSON.stringify(item.INGREDIENT)));
        cpt++;
      }

      res.json(JSON.parse(JSON.stringify(json)));
      res.status(201).end();
    }
  ).catch((e) => {
    console.log(e)
    res.status(400).end();
  });
})
module.exports=router;
