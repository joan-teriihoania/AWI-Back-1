const path = require('path');
const db =require(path.join(__dirname, '../../../Back/BDD'));


function createIngredient(name,unit,unit_price,id_Category){
  return new Promise((resolve,reject) =>{
      let sql="INSERT INTO `Ingredient`(NAME,UNIT,UNIT_PRICE,ID_Category) VALUES (?,?,?,?);";
      db.query(sql,[name,unit,unit_price,id_Category],(err,result)=>{
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    }
  )
}
function getAllIngredient(){
  return new Promise((resolve,reject) =>{
      let sql="SELECT * from `Ingredient`";
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

function deleteIngredient(ID){
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
module.exports={createIngredient,deleteIngredient,getAllIngredient}
