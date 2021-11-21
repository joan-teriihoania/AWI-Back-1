const path = require('path');
const db =require(path.join(__dirname, '../../../Back/BDD'));

//Valeur possible A_Category I_Category R_Category
function createCategory(category,nom){
  return new Promise((resolve,reject) =>{
      let sql="INSERT INTO "+category+" (NAME) VALUES (?);";
      db.query(sql,[nom],(err,result)=>{
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      })
    }
  )
}
function getCategory(category){
  return new Promise((resolve,reject) =>{
      let sql="SELECT * from "+category+" ;"
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

function deleteCategory(ID,category){
  return new Promise((resolve,reject) =>{
      let sql="DELETE FROM "+category+"WHERE ID_Category= ?;";
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
module.exports={createCategory,getCategory,deleteCategory}
