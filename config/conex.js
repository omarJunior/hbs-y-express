const mysql = require("mysql")

const conexion = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_mysql_crud_db"
})

conexion.connect(function(e){
    if(e){
        console.log("Error al conectar con la base de datos");
        throw new Error("ha ocurrido un error en la conexion a la base de datos")
    }else{
        console.log("Base de datos conectada")
    }
})

module.exports = conexion 