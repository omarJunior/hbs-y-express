const { Router } = require("express");
const { home, vistaRegistro } = require("../controllers/home");

const router = Router();

router.get("/", home)

router.get("/registro", vistaRegistro)

module.exports = router;

