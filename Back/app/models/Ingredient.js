const path = require('path');
const db =require(path.join(__dirname, '../../../Back/BDD'));


function create(data){
  return new Promise((resolve,reject) =>{
      let sql="INSERT INTO `Ingredient`(NAME,UNIT,UNIT_PRICE,ID_Category,STOCK,ID_ALLERGEN) VALUES (?,?,?,?,?,?);";
      let ID;
      db.query(sql,data,(err)=>{
        if (err) {
          reject(err);
        } else {
          db.query("SELECT LAST_INSERT_ID() AS ID FROM Ingredient; ",(err,result)=>{
            if (err) {
              reject(err);
            } else {
              ID=JSON.parse(JSON.stringify(result))[0].ID_INGREDIENT;
              resolve(ID);

            }
          })

        }
      })
    }
  )
}
function update(data){
  return new Promise((resolve,reject) =>{
      let sql="UPDATE `Ingredient`SET NAME = ?,UNIT=?,UNIT_PRICE=?,ID_Category=?,STOCK=?,ID_ALLERGEN=? WHERE ID_INGREDIENT=?";
      let ID;
      db.query(sql,data,(err)=>{
        if (err) {
          reject(err);
        } else {
          db.query("SELECT LAST_INSERT_ID() AS ID FROM Ingredient; ",(err,result)=>{
            if (err) {
              reject(err);
            } else {
              ID=JSON.parse(JSON.stringify(result))[0].ID_INGREDIENT;
              resolve(ID);

            }
          })

        }
      })
    }
  )
}
function getAll(){
  return new Promise((resolve,reject) =>{
    let sql="SELECT ID_INGREDIENT," +
      "Ingredient.NAME as NAMEI,UNIT," +
      "UNIT_PRICE," +
      "Ingredient.ID_Category as Ingredient_ID_Category," +
      "STOCK," +
      "Ingredient.ID_ALLERGEN," +
      "Allergen.NAME as NAMEA," +
      "Allergen.ID_Category as Allergen_ID_Category, URL " +
      "from `Ingredient` LEFT JOIN Allergen on Ingredient.ID_ALLERGEN=Allergen.ID_ALLERGEN LEFT JOIN A_Category ON Allergen.ID_Category=A_Category.ID_Category;"
      db.query(sql,(err,result)=>{
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    }
  )
}

function deleteI(ID){
  return new Promise((resolve,reject) =>{
      let sql="DELETE FROM`Ingredient`WHERE ID_INGREDIENT= ?;";
      db.query(sql,[ID],(err,result)=>{
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    }
  )
}
module.exports={create,deleteI,getAll,update}
