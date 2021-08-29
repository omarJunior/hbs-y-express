
const home = (req, res)=>{
    res.render("index", { titulo: "Pagina principal" });
}

const vistaRegistro = (req, res)=>{
    res.render("registro", {titulo: "Formulario para insertar usuarios"})
}

module.exports = {
    home,
    vistaRegistro
}