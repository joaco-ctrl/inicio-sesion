const conexion = require("../database");

function obtenerUsuarios(callback) {
    conexion.query("SELECT * FROM usuarios", callback);
}

function buscarUsuarios(data, callback) {
    const id = Number(data.id);

    if (!id || id > 50000) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query("SELECT * FROM usuarios WHERE id = ?", [id], callback);
}

function crearUsuario(data, callback) {
    const { nombre, apellido } = data;
    if (!nombre || !apellido) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query(
        "INSERT INTO usuarios (nombre, apellido) VALUES (?, ?)",
        [nombre, apellido],
        callback
    );
}

function actualizarUsuario(id, data, callback) {
    const { nombre, apellido } = data;

    if (!nombre || !apellido) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query(
        "UPDATE usuarios SET nombre = ?, apellido = ? WHERE id = ?",
        [nombre, apellido, id],
        callback
    );
}

function eliminarUsuario(id, callback) {
    if (!id || id > 50000) {
        return callback(new Error("Datos invalidos"));
    }

    conexion.query("DELETE FROM usuarios WHERE id = ?", [id], callback);
}


module.exports = {
    obtenerUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    buscarUsuarios,
};
