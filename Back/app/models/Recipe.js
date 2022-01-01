const path = require('path');
const db =require(path.join(__dirname, '../../../Back/BDD'));

function getDefaultCost() {
  return new Promise((resolve, reject) => {
      let sql = "Select  COUT_FLUIDE, COUT_PERSONNEL,COUT_ASSAISONNEMENT, ISPERCENT From Cost WHERE ID = 0";
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    }
  )
}

function setDefaultCost(newCost) {
  return new Promise((resolve, reject) => {
      let sql = "UPDATE Cost SET COUT_FLUIDE = ?, COUT_PERSONNEL = ? , COUT_ASSAISONNEMENT = ?,ISPERCENT = ? WHERE ID = 0 ;";
      db.query(sql, newCost, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      })
    }
  )
}
function createRecipe(NAME,NB_COUVERT,COUT_ASSAISONNEMENT,ISPERCENT,AUTHOR,ID_Category,STEP) {
  return new Promise((resolve,reject) =>{
    let sql="INSERT INTO Recipe (NAME,NB_COUVERT,COUT_ASSAISONNEMENT, ISPERCENT,AUTHOR,ID_Category) VALUES (?,?,?,?,?,?);";
    var ID;
    db.query(sql,[NAME,NB_COUVERT,COUT_ASSAISONNEMENT,ISPERCENT,AUTHOR,ID_Category],(err1)=>{
      if (err1) {
        reject(err1);
      } else {
        db.query("SELECT LAST_INSERT_ID() AS ID FROM Recipe",(err2,result)=>{
          if (err2) {
            reject(err2);
          } else {
            ID=JSON.parse(JSON.stringify(result))[0].ID;
            for (let item of STEP){
              if(item.TYPE=="RECIPE"){
                db.query("INSERT INTO Recipe_Recipe VALUES (?,?,?);",[ID,item.ID,item.RANK],(err3)=>{
                  if (err3) {
                    reject(err3);
                  }
                })
              }else if(item.TYPE=="STEP") {
                db.query("INSERT INTO Recipe_Step VALUES (?,?,?);",[ID,item.ID,item.RANK],(err4)=>{
                  if (err4) {
                    reject(err4);
                  }
                })
              }else {
                reject("Err type not a step or a recipe")
              }
            }
            resolve(ID);
          }
        })
      }
    })
  }
)
}

function updateRecipe(ID, NAME, NB_COUVERT, COUT_ASSAISONNEMENT, ISPERCENT, AUTHOR, ID_Category, STEP) {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE Recipe SET NAME=?,NB_COUVERT=?,COUT_ASSAISONNEMENT=?, ISPERCENT=?,AUTHOR=?,ID_Category=? WHERE ID_RECIPE=?";

    db.query(sql, [NAME, NB_COUVERT, COUT_ASSAISONNEMENT, ISPERCENT, AUTHOR, ID_Category, ID], (err) => {
      if (err) {
        reject(err);
      } else {
        db.query("DELETE FROM Recipe_Recipe WHERE ID_RECIPE=?;DELETE FROM Recipe_Step WHERE ID_RECIPE=?;",[ID,ID],(err)=>{
          if(err){
            reject(err)
          }else {
            for (let item of STEP) {
              if (item.TYPE == "RECIPE") {
                db.query("INSERT INTO Recipe_Recipe VALUES (?,?,?);", [ID, item.ID, item.RANK], (err) => {
                  if (err) {
                    reject(err);
                  }
                })
              } else if (item.TYPE == "STEP") {
                db.query("INSERT INTO Recipe_Step VALUES (?,?,?);", [ID, item.ID, item.RANK], (err) => {
                  if (err) {
                    reject(err);
                  }
                })
              } else {
                reject("Err type not a step or a recipe")
              }
            }
            resolve("Done");
          }
        })
      }
    })
  })
}
function deleteRecipe(ID) {
  return new Promise((resolve, reject) => {
    db.query("Select NAME FROM Recipe_Recipe join Recipe on Recipe.ID_RECIPE=Recipe_Recipe.ID_Recipe WHERE ID_STEP=? ;",[ID],(err,result) => {
      console.log(result)
      if(err)
        reject(err)

      else if(result[0]==undefined){
        let sql = "DELETE FROM Recipe_Recipe WHERE ID_RECIPE=? ;";
        db.query(sql, [ID], (err) => {
          if (err)
            reject(err);
          db.query("DELETE FROM Recipe_Step WHERE ID_RECIPE= ? ;", [ID], (err) => {
            if (err)
              reject(err);
            db.query("DELETE FROM Recipe WHERE ID_RECIPE= ? ;", [ID], (err) => {
              if (err)
                reject(err);
              else {
                resolve('Done')
              }
            })
          })
        })
      }else{
        resolve(result)
      }
    })
  })
}


function getAll(){
  let sql="SELECT DISTINCT Recipe.ID_RECIPE,Recipe.NAME,Recipe.AUTHOR,Recipe.ID_Category, JSON_ARRAYAGG(JSON_OBJECT('ID', Ingredient.ID_INGREDIENT,'NAME',Ingredient.NAME,'QUANTITY',QUANTITY,'UNIT',UNIT,'UNIT_PRICE', UNIT_PRICE,'ID_Category',Ingredient.ID_Category,'STOCK',FORMAT(STOCK, 3)," +
    "'ALLERGEN',JSON_OBJECT('ID', Ingredient.ID_ALLERGEN,'NAME',Allergen.NAME,'ID_Category',Allergen.ID_Category,'URL',URL))) AS INGREDIENT " +
    "FROM Recipe " +
    "LEFT JOIN Recipe_Recipe on Recipe.ID_RECIPE = Recipe_Recipe.ID_RECIPE " +
    "LEFT JOIN Recipe_Step RS on  RS.ID_RECIPE = RS.ID_STEP " +
    "LEFT JOIN Recipe_Step on Recipe.ID_RECIPE = Recipe_Step.ID_RECIPE " +
    "JOIN Step on Step.ID_STEP = Recipe_Step.ID_STEP " +
    "JOIN Step_Ingredient on  Step.ID_STEP= Step_Ingredient.ID_STEP " +
    "JOIN Ingredient on Step_Ingredient.ID_INGREDIENT=Ingredient.ID_INGREDIENT " +
    "LEFT JOIN Allergen on Ingredient.ID_ALLERGEN=Allergen.ID_ALLERGEN " +
    "LEFT JOIN A_Category on Allergen.ID_Category=A_Category.ID_Category " +
    "GROUP BY Recipe.ID_RECIPE;"
  return new Promise((resolve, reject) => {
      db.query(sql, (err,result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    }
  )
}
function getRecipById(id){
  return new Promise((resolve, reject) => {
    let sql="SELECT Recipe.ID_RECIPE,Recipe.NAME AS NAMER,Recipe.AUTHOR,Recipe.ID_Category,Recipe.NB_COUVERT,Recipe.COUT_ASSAISONNEMENT ,Recipe.ISPERCENT ,Recipe_Step.POSITION, " +
      "Step.ID_STEP,Step.NAME AS NAMES, DESCRIPTION, DURATION,JSON_ARRAYAGG(JSON_OBJECT('ID', Ingredient.ID_INGREDIENT,'NAME',Ingredient.NAME,'QUANTITY',ROUND(QUANTITY, 3),'UNIT',UNIT,'UNIT_PRICE', ROUND(UNIT_PRICE, 3),'ID_Category',Ingredient.ID_Category,'STOCK',FORMAT(STOCK, 3), " +
      "'ALLERGEN',JSON_OBJECT('ID', Ingredient.ID_ALLERGEN,'NAME',Allergen.NAME,'ID_Category',Allergen.ID_Category,'URL',URL))) INGREDIENT  " +
      "FROM Recipe  " +
      "JOIN Recipe_Step on Recipe.ID_RECIPE = Recipe_Step.ID_RECIPE  " +
      "JOIN Step on Step.ID_STEP = Recipe_Step.ID_STEP  " +
      "JOIN Step_Ingredient on  Step.ID_STEP= Step_Ingredient.ID_STEP  " +
      "JOIN Ingredient on Step_Ingredient.ID_INGREDIENT=Ingredient.ID_INGREDIENT  " +
      "LEFT JOIN Allergen on Ingredient.ID_ALLERGEN=Allergen.ID_ALLERGEN  " +
      "LEFT JOIN A_Category on Allergen.ID_Category=A_Category.ID_Category  " +
      "WHERE Recipe.ID_RECIPE= ? " +
      "GROUP BY Step.ID_STEP,Recipe_Step.POSITION;"

      db.query(sql,[id], (err,result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    }
  )
}
function getAllFiltered(filtre){
  let sql="SELECT Recipe.ID_RECIPE,Recipe.NAME,Recipe.AUTHOR,Recipe.ID_Category, JSON_ARRAYAGG(JSON_OBJECT('ID', Ingredient.ID_INGREDIENT,'NAME',Ingredient.NAME,'QUANTITY',QUANTITY,'UNIT',UNIT,'UNIT_PRICE', UNIT_PRICE,'ID_Category',Ingredient.ID_Category,'STOCK',FORMAT(STOCK, 3)," +
    "'ALLERGEN',JSON_OBJECT('ID', Ingredient.ID_ALLERGEN,'NAME',Allergen.NAME,'ID_Category',Allergen.ID_Category,'URL',URL))) AS INGREDIENT " +
    "FROM Recipe " +
    "LEFT JOIN Recipe_Recipe on Recipe.ID_RECIPE = Recipe_Recipe.ID_RECIPE " +
    "LEFT JOIN Recipe_Step RS on  RS.ID_RECIPE = RS.ID_STEP " +
    "LEFT JOIN Recipe_Step on Recipe.ID_RECIPE = Recipe_Step.ID_RECIPE " +
    "JOIN Step on Step.ID_STEP = Recipe_Step.ID_STEP " +
    "JOIN Step_Ingredient on  Step.ID_STEP= Step_Ingredient.ID_STEP " +
    "JOIN Ingredient on Step_Ingredient.ID_INGREDIENT=Ingredient.ID_INGREDIENT " +
    "LEFT JOIN Allergen on Ingredient.ID_ALLERGEN=Allergen.ID_ALLERGEN " +
    "LEFT JOIN A_Category on Allergen.ID_Category=A_Category.ID_Category " +
    "WHERE LOWER(Ingredient.NAME) LIKE ? OR LOWER(Recipe.NAME) LIKE ? "+
    "GROUP BY Recipe.ID_RECIPE;"
  return new Promise((resolve, reject) => {
      db.query(sql,["%"+filtre.toLowerCase()+"%","%"+filtre.toLowerCase()+"%"],(err,result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    }
  )
}


module.exports={getAllFiltered,getRecipById,getAll,createRecipe,updateRecipe,deleteRecipe ,getDefaultCost,setDefaultCost}
