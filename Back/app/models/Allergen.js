const path = require('path');
const db =require(path.join(__dirname, '../../../Back/BDD'));


function create(name,id_Category){
  return new Promise((resolve,reject) =>{
      let sql="INSERT INTO `Allergen`(NAME,ID_Category) VALUES (?,?);";
      db.query(sql,[name,id_Category],(err)=>{
        if (err) {
          reject(err);
        } else {
          db.query("SELECT LAST_INSERT_ID() AS ID FROM Allergen; ",(err,result)=>{
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
      let sql="SELECT * from `Allergen`";
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

function deleteA(ID){
  return new Promise((resolve,reject) =>{
      let sql="DELETE FROM`Allergen`WHERE ID_ALLERGEN= ?;";
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
module.exports={create,deleteA,getAll}
