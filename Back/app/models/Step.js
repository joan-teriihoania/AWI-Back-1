const path = require('path');
const db =require(path.join(__dirname, '../../../Back/BDD'));

function create(name,description,duration,ingredient){
  return new Promise((resolve,reject) =>{
      let sql="INSERT INTO `Step`(NAME,DESCRIPTION,DURATION) VALUES (?,?,?);";
      var ID;
      db.query(sql,[name,description,duration],(err)=>{
        if (err) {
          reject(err);
        } else {
          db.query("SELECT LAST_INSERT_ID() AS ID FROM Step",(err,result)=>{
            if (err) {
              reject(err);
            } else {
              ID=JSON.parse(JSON.stringify(result))[0].ID;
              for (let item of ingredient){
                console.log("it work"+ [ID,item.ID,item.QUANTITY])
                db.query("INSERT INTO `Step_Ingredient` VALUES (?,?,?);",[ID,item.ID,item.QUANTITY],(err)=>{
                  if (err) {
                    reject(err);
                  }
                })
              }
              resolve(ID);
            }
          })

        }
      })
    }
  )

}

function getAll(){
  return new Promise(((resolve, reject) =>{
    let sql="SELECT Step.ID_STEP,Step.NAME AS NAME, DESCRIPTION, DURATION,JSON_ARRAYAGG(JSON_OBJECT('ID', Ingredient.ID_INGREDIENT,'NAME',Ingredient.NAME,'QUANTITY',FORMAT(QUANTITY,3),'UNIT',UNIT,'UNIT_PRICE', FORMAT(UNIT_PRICE,2),'ID_Category',Ingredient.ID_Category,'STOCK',FORMAT(STOCK,3)," +
      "'ALLERGEN',JSON_OBJECT('ID', Ingredient.ID_ALLERGEN,'NAME',Allergen.NAME,'ID_Category',Allergen.ID_Category,'URL',URL))) INGREDIENT " +
      "FROM Step, Step_Ingredient, Ingredient " +
      "LEFT JOIN Allergen on Ingredient.ID_ALLERGEN=Allergen.ID_ALLERGEN " +
      "LEFT JOIN A_Category on Allergen.ID_Category=A_Category.ID_Category " +
      "WHERE Step.ID_STEP=Step_Ingredient.ID_STEP " +
      "AND Step_Ingredient.ID_INGREDIENT=Ingredient.ID_INGREDIENT " +
      "GROUP BY Step.ID_STEP;"
    db.query(sql,(err,result)=>{
      if (err) {
        reject(err);
      }else {
        resolve(result)
      }
    })
  }))
}

function update(id, name, description, duration, ingredient) {
  return new Promise((resolve, reject) => {
    let sql = "UPDATE `Step` SET NAME = ?, DESCRIPTION = ?,DURATION = ? WHERE ID_STEP = ? ;";

    db.query(sql, [name, description, duration, id], (err) => {
      if (err) {
        reject(err);
      } else {
        sql = "DELETE FROM `Step_Ingredient` WHERE ID_STEP = ?;"
        db.query(sql, [id], (err) => {
          if (err) {
            reject(err);
          } else {
            for (let item of ingredient) {
              console.log("it work" + [id, item.ID, item.QUANTITY])
              db.query("INSERT INTO `Step_Ingredient` VALUES (?,?,?);", [id, item.ID, item.QUANTITY], (err) => {
                if (err) {
                  reject(err);
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

module.exports={create,update,getAll}
