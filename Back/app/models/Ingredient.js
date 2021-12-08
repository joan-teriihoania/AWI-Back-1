const path = require('path');
const db =require(path.join(__dirname, '../../../Back/BDD'));


function create(name,unit,unit_price,id_Category){
  return new Promise((resolve,reject) =>{
      let sql="INSERT INTO `Ingredient`(NAME,UNIT,UNIT_PRICE,ID_Category) VALUES (?,?,?,?);";
      db.query(sql,[name,unit,unit_price,id_Category],(err)=>{
        if (err) {
          reject(err);
        } else {
          db.query("SELECT LAST_INSERT_ID() AS ID FROM Ingredient; ",(err,result)=>{
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          })

        }
      })
    }
  )
}
function getAll(){
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
module.exports={create,deleteI,getAll}
