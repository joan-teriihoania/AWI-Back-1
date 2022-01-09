const path = require('path');
const db =require(path.join(__dirname, '../../BDD'));


function create(data){
  return new Promise((resolve,reject) =>{
      let sql="INSERT INTO `Ingredient`(NAME,UNIT,UNIT_PRICE,ID_Category,STOCK,ID_ALLERGEN) VALUES (?,?,?,?,?,?);";
      db.query(sql,data,(err,res)=>{
        if (err) {
          reject(err);
        } else {
            resolve(res.insertId)
        }
      })
    }
  )
}
function update(data){
  return new Promise((resolve,reject) =>{
      let sql="UPDATE `Ingredient`SET NAME = ?,UNIT=?,UNIT_PRICE=?,ID_Category=?,STOCK=?,ID_ALLERGEN=? WHERE ID_INGREDIENT=?";
      db.query(sql,data,(err)=>{
        if (err) {
          reject(err);
        } else {
          resolve("Done")
        }
      })
    }
  )
}
function updateStock(data){
  return new Promise((resolve,reject) =>{
      db.beginTransaction(function (err) {
          if (err) {
              throw err;
          }
          for (let item of data) {
              db.query("UPDATE `Ingredient`SET STOCK=? WHERE ID_INGREDIENT=?", [item.QUANTITY, item.ID], function (error, results, fields) {
                  if (error) {
                      return db.rollback(function () {
                          throw error;
                      });
                  }
              })
          }
          db.commit(function (err) {
              if (err) {
                  return db.rollback(function () {
                      throw err;
                  });
              }
              resolve("Done")
          });
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
module.exports={create,deleteI,getAll,update,updateStock}
