const jwt =require("jsonwebtoken")
function verificarToken (req, res,next){
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({
            error: "Token requerido"
        })
    }

    const parts = authHeader.split(" ")
    const token = parts.length === 2 ? parts[1] : authHeader

    jwt.verify(token, process.env.JWT_SECRET || "secreto", (err, usuario) => {
        if(err){
            return res.status(403).json({
                error:"Token invalido"
            })
        }
        req.usuario = usuario
        next()
    })
}

    module.exports = verificarToken
