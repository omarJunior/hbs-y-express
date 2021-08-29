
const express = require("express");
const conexion = require("../config/conex");

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths ={
            inicio: '/auth/home',
            usuario:'/auth/user'
        }
        this.conexion();
        this.middlewares();
        this.router();

        //Si es que el usuario introduce una ruta incorrecta
        this.app.use((req, res, next)=>{
            res.status(404).render("404",{
                titulo: "404",
                descripcion: "Pagina no encontrada"
            })
        })
    }
    async conexion(){
        await conexion;
    }

    middlewares(){
        this.app.use(express.json()); //Poder recibir datos en formato json desde postman   
        this.app.use(express.urlencoded({extended: false})) //Poder recibir datos del formulario

        //Para que funcionen bien el __dirname
        let simbolo = "'\\'";
        let separador = simbolo.charAt(1) // /
        let arreglo = __dirname.split(separador);
        arreglo.pop();
        const data = arreglo.join("/");  //c:/Programacion/Mysql/crudNodeMysql

        // Motor de plantilla
        const hbs = require('hbs');
        hbs.registerPartials(data + '/views/partials', function (err) {});
        this.app.set('view engine', 'hbs');
       
        this.app.set("views",  data + "/views");
        this.app.use(express.static(data + "/public"));
    }

    router(){
        this.app.use(this.paths.inicio, require("../router/home"));
        this.app.use(this.paths.usuario, require("../router/usuario"))
    }

    listen(){   
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }
  
    
}

module.exports= Server

