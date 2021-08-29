const {Router} = require("express")
const {  check } = require("express-validator");
const router = Router();

const { insertarUsuario, obtenerUsuarios, obtenerUsuarioPorId, eliminarUsuario, actualizarUsuario } = require("../controllers/usuario");
const { validarCampos } = require("../middlewares/validar-campos");

//Agregar datos
router.post("/",[
    check("email", "El email debe ser obligatorio").isEmail(),
    check('password', 'La password debe ser obligatoria').isLength({ min: 5 }),
    validarCampos
] ,insertarUsuario)

//Obtener datos de usuarios
router.get("/", obtenerUsuarios);

//Obtener usuario por id
router.get("/data/:id", obtenerUsuarioPorId)

//Actualizar datos 
router.post("/update/:id", actualizarUsuario)

//Eliminar usuario
router.get("/delete/:id", eliminarUsuario)

module.exports = router