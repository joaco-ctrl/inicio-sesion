const express=require("express");
const verificartoken =require("../middleware/authmiddleware")
const router=express.Router();
const verificarToken = require("../middleware/adminMiddleware");
const {
    buscarUsuarios,
    obtenerUsuarios,
    crearUsuario,
    eliminarUsuario,
    actualizarUsuario,
    login,
    registro
}=require("../controllers/controller");

router.get("/usuarios/:id", buscarUsuarios);
router.get("/usuarios", obtenerUsuarios);
router.post("/usuarios",verificartoken, crearUsuario);
router.put("/usuarios/:id",verificartoken, actualizarUsuario);
router.delete("/usuarios/:id",verificartoken, eliminarUsuario);
//login
router.post("/login", login);
router.post("/registro", registro);

//fin login

module.exports=router;
