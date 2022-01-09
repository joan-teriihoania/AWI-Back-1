const path = require('path');
const db =require(path.join(__dirname, '../../BDD'));


function create(name,id_Category){
  return new Promise((resolve,reject) =>{
      let sql="INSERT INTO `Allergen`(NAME,ID_Category) VALUES (?,?);";
      db.query(sql,[name,id_Category],(err1,result)=>{
        if (err1) {
          reject(err1);
        } else {
            resolve(result.insertId)

        }
      })
    }
  )
}
function getAll(){
  return new Promise((resolve,reject) =>{
      let sql="SELECT ID_ALLERGEN,Allergen.NAME,Allergen.ID_Category,URL from `Allergen` JOIN A_Category ON Allergen.ID_Category=A_Category.ID_Category";
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
