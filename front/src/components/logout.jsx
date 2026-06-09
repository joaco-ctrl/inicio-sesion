import React from "react";

function logout() {
    localStorage.removeItem("token")
    alert("sesion cerrada")

}
export default logout