const { validationResult } = require("express-validator");

const validarCampos = (req, res, next)=>{ 
    const errores = validationResult(req); //Obtener errores
    if(!errores.isEmpty()){
        return res.status(400).json({errores});
    }

    next();

}

module.exports = {
    validarCampos
}