/**
 * Ce fichier gère la connexion à la base de donnée
 */
const path=require("path")
const mysql = require('mysql');
const dbConfig = require(path.join(__dirname,"app/config/db.config"));

/*
 * Création d'une instance pour communiquer avec la base de données
 */

let db = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USERNAME,
  password: dbConfig.PASSWORD,
  database: dbConfig.NAME,
  timezone: dbConfig.TIMEZONE,
});

db.connect(function(err) {
  if (err)
    throw err;
  console.log("Connecté à la base de données MySQL!") ;
});

// Si on arrive là alors la conenxion s'est bien passée
console.log("Connexion réussie à la base de données");

module.exports = db;
