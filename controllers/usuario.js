
const conexion = require("../config/conex")
const bCrypts = require("bcryptjs");

function insertarUsuario(req,res){
    const {first_name, last_name, email, password, phone, organization, designation, salary, status, created_at} = req.body;
    //Encriptar contraseña
    const salt = bCrypts.genSaltSync();
    const passwordEncriptada = bCrypts.hashSync(password, salt);

    const objeto = {
        first_name, 
        last_name, 
        email, 
        password: passwordEncriptada, 
        phone, 
        organization, 
        designation, 
        salary, 
        status, 
        created_at
    };
    conexion.query("SELECT *  FROM employees WHERE email=?", email, (error, data)=>{
        if(error){
            console.log("Ha ocurrido un error");
            throw new Error(error);
        }
        if(data.length === 0){
            conexion.query("INSERT INTO employees SET ?", [objeto], (error, data)=>{
                if(error){
                    return res.status(400).json({
                        msg : "Ha ocurrido un error"
                    })
                }
                if(data.affectedRows > 0){
                    return res.redirect("/auth/user")
                   /*  return res.status(201).json({
                        msg : "Datos creados satifactoriamente en la base de datos",
                        datos : objeto
                    }) */
                }else{
                    return res.status(400).json({
                        msg : "Ha ocurrido un error, no se insertaron los datos"
                    })
                }
            });
        }else{
            return res.status(400).json({
                msg : `No puede ingresar el Correo: ${email} porque ya existe en la base de datos`
            });
        }
    } )

}

function obtenerUsuarios(req,res){
    conexion.query("SELECT * FROM employees", (error, data)=>{
        if(error){
            return res.status(400).json({
                msg:"Error en la consulta"
            })  
        }else{
            return res.render("datos", {
                resultado: data
            })
          /*   return res.json({
                msg:"Datos del usuario", 
                resultado: (data.length > 0) ? data : "No hay datos en la base de datos, porfavor ingresarlos"
            }) */
        }
    })
}

function obtenerUsuarioPorId(req,res){
    const { id } = req.params;
    conexion.query("SELECT * FROM employees WHERE id= ?",id,(error, data)=>{
        if(error){
            return res.status(400).json({
                msg:"Error en esa consulta"
            })
        }else{
            if(data.length > 0){
                res.render("actualizar", {
                    datos: data[0]
                })
               /*  return res.json({
                    msg:"Datos del usuario",
                    data
                }) */
            }else{
                return res.json({
                    msg: `No hay datos con el id ${id}`
                })
            }
            
        }

    })
}

const actualizarUsuario = (req,res)=>{
    const {id} = req.params;
    const { first_name,
        last_name,
        phone,
        organization,
        designation,
        salary,
        created_at } = req.body;
    const datoPersona = {
        first_name,
        last_name,
        phone,
        organization,
        designation,
        salary,
        created_at
    }

    conexion.query("UPDATE employees SET ? WHERE id = ?",[datoPersona , id], (error, data)=>{
        if(error){
            console.log(error);
            return res.status(400).json({
                msg:"Error en la consulta"
            })
        }else{
            if(data.affectedRows > 0){
                return res.redirect("/auth/user");
                /* return res.json({
                    msg:"Datos Actualizados",
                    data,
                    datoPersona
    
                }) */
            }else{
                return res.status(400).json({
                    msg: `EL id ${id}  no existe en la base de datos`
                })
            }
            
        }
    })
}

const eliminarUsuario = (req,res)=>{
    const {id} = req.params;
    conexion.query("SELECT first_name, last_name FROM employees WHERE id=?", id, (error, data)=>{
        if(error){
            return res.status(400).json({
                msg: "Ha ocurrido un error en  la consulta"
            })
        }
        if(data.length === 0){
            return res.status(400).json({
                msg: `No existe datos con el id ${id}`
            })
        }
        const nombre = data[0].first_name;
        const apellido = data[0].last_name;
        const objeto = {
            nombre, 
            apellido
        };
        if(data.length > 0){
            conexion.query("DELETE FROM employees WHERE id=?", id, (error, data)=>{
                if(error){
                    return res.status(400).json({
                        msg:"Error en la consulta"
                    })
                }else{
                    if(data.affectedRows === 0){
                        return res.status(400).json({
                            msg: `El id ${id} no existe en la base de datos`
                        })
                    }
                    res.redirect("/auth/user");
                    /* return res.json({
                        msg:"Dato eliminado correctamente de la base de datos",
                        objeto
                    }) */
                }
            })
        }else{
            return res.status(400).json({
                msg: `El ${id} no existe en la base de datos para eliminar el usuario`
            })
        }
        
    })
}

module.exports = {
    insertarUsuario,
    obtenerUsuarios,
    obtenerUsuarioPorId,
    actualizarUsuario,
    eliminarUsuario

}