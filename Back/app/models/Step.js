const path = require('path');
const db =require(path.join(__dirname, '../../../Back/BDD'));

function create(name,description,duration,ingredient){
  return new Promise((resolve,reject) =>{
      let sql="INSERT INTO `STEP`(NAME,DESCRIPTION,DURATION) VALUES (?,?,?);";
      var ID;
      db.query(sql,[name,description,duration],(err)=>{
        if (err) {
          reject(err);
        } else {
          db.query("SELECT LAST_INSERT_ID() AS ID FROM Ingredient",(err,result)=>{
            if (err) {
              reject(err);
            } else {
              ID=JSON.parse(JSON.stringify(result))[0].ID_Step;
              for (let item of ingredient){
                db.query("INSERT INTO `STEP_INGREDIENT` VALUES (?,?,?);",[ID,item.ID,item.QUANTITY],(err)=>{
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



module.exports={create}
