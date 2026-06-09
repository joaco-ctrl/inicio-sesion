const conexion = require("../database");
function login(data, callback) {
    const { email, contraseña } = data;
    if (!email || !contraseña) {
        return callback(new Error("Datos invalidos"));
    }
    else {
        conexion.query(
            "SELECT * FROM cuenta WHERE email = ?",
            [email],
            callback
        );
    }
}

function registro(data, callback) {
    const { email, contraseña, rol } = data;
    if (!email || !contraseña || !rol) {
        return callback(new Error("Datos invalidos"));
    }
    else {
        conexion.query(
            "INSERT INTO cuenta (email, contraseña, rol) VALUES (?, ?, ?)",
            [email, contraseña, rol],
            callback
        );
    }
}

module.exports = {
    login,
    registro
};

