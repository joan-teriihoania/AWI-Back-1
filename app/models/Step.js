const path = require('path');
const db =require(path.join(__dirname, '../../BDD'));

function create(name,description,duration,ingredient){
  return new Promise((resolve,reject) =>{
      let sql="INSERT INTO `Step`(NAME,DESCRIPTION,DURATION) VALUES (?,?,?);";
    var ID;
    db.query(sql, [name, description, duration], (err1, result) => {
      if (err1) {
        reject(err1);
      } else {
        ID = result.insertId

        for (let item of ingredient) {
          db.query("INSERT INTO `Step_Ingredient` VALUES (?,?,?);", [ID, item.ID, item.QUANTITY], (err3) => {
            if (err3) {
              reject(err3);
            }
          })
        }
        resolve(ID);
      }
    })
    }
  )
}

function getAll(){
  return new Promise((resolve, reject) =>{
    let sql="SELECT Step.ID_STEP,Step.NAME AS NAME, DESCRIPTION, DURATION,JSON_ARRAYAGG(JSON_OBJECT('ID', Ingredient.ID_INGREDIENT,'NAME',Ingredient.NAME,'QUANTITY',FORMAT(QUANTITY,3),'UNIT',UNIT,'UNIT_PRICE', FORMAT(UNIT_PRICE,2),'ID_Category',Ingredient.ID_Category,'STOCK',FORMAT(STOCK,3)," +
      "'ALLERGEN',JSON_OBJECT('ID', Ingredient.ID_ALLERGEN,'NAME',Allergen.NAME,'ID_Category',Allergen.ID_Category,'URL',URL))) INGREDIENT " +
      "FROM Step " +
      "LEFT JOIN Step_Ingredient on Step.ID_STEP=Step_Ingredient.ID_STEP " +
      "LEFT JOIN  Ingredient on Step_Ingredient.ID_INGREDIENT=Ingredient.ID_INGREDIENT " +
      "LEFT JOIN Allergen on Ingredient.ID_ALLERGEN=Allergen.ID_ALLERGEN " +
      "LEFT JOIN A_Category on Allergen.ID_Category=A_Category.ID_Category " +
      "GROUP BY Step.ID_STEP;"
    db.query(sql,(err,result)=>{
      if (err) {
        reject(err);
      }else {
        resolve(result)
      }
    })
  })
}

function update(id, name, description, duration, ingredient) {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE `Step` SET NAME = ?, DESCRIPTION = ?,DURATION = ? WHERE ID_STEP = ? ;";

    db.query(sql, [name, description, duration, id], (err1) => {
      if (err1) {
        reject(err1);
      } else {
        sql = "DELETE FROM `Step_Ingredient` WHERE ID_STEP = ?;"
        db.query(sql, [id], (err2) => {
          if (err2) {
            reject(err2);
          } else {
            for (let item of ingredient) {
              console.log("it work" + [id, item.ID, item.QUANTITY])
              db.query("INSERT INTO `Step_Ingredient` VALUES (?,?,?);", [id, item.ID, item.QUANTITY], (err3) => {
                if (err3) {
                  reject(err3);
                }
              })
            }
          }
          resolve(id);
        })
      }
    })
  })

}
function deleteStep(id) {
  return new Promise((resolve, reject) => {

    db.query("SELECT * FROM Recipe_Step WHERE ID_STEP=? ", [id], (err1,result) => {
      if (err1) {
        reject(err1);
      } else {
        console.log(JSON.parse(JSON.stringify(result))[0]==undefined)
        if(JSON.parse(JSON.stringify(result))[0]==undefined){

          db.query("DELETE FROM `Step_Ingredient` WHERE ID_STEP = ? ;", [id], (err2) => {
            if (err2) {
              reject(err2);
            } else {

              db.query("DELETE FROM `Step` WHERE ID_STEP = ? ;", [id], (err3) => {
                if (err3) {
                  reject(err3);

                }
                resolve("done");
              })

            }
          })
        }else{
          reject({errno:1451})
        }

      }
    })
  })

}

module.exports={create,update,getAll,deleteStep}
