function verificarAdmin(req, res, next) {
    if (req.usuario.rol === "admin") {
        next()
    } else {
        res.status(403).json({
            error: "acceso denegado"
        })
    }
}

module.exports = verificarAdmin