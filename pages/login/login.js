let userLocalStorage;
let sesionActiva;

function login() {
    var usuario = document.getElementById("userNameLogin").value;
    var pass = document.getElementById("passwordLogin").value;
    if (usuario != "" && pass != "") {
        verificarUser(usuario, pass);
    } else {
        alert("Datos faltantes");
    }
    return false;
}

function verificarUser(nombre, pass) {
    var flag = false;
    var datos = JSON.parse(localStorage.getItem('Users'))
    datos.forEach((it) => {
        if (it.userName == nombre && it.password == pass) {
            flag = true;
        }
    })

    if (flag) {
        document.getElementById("localUser").innerHTML = "Bienvenido " + nombre;
        window.location.href = "../principal/principal.html";
        userLocalStorage = nombre;
        localStorage.setItem("usuarioLog", userLocalStorage);
        sesionActiva = true;
        localStorage.setItem("sesionActiva", sesionActiva);
    } else {
        alert("Los datos no coinciden");
    }
}

function cerrar() {
    localStorage.removeItem("sesionActiva");
    localStorage.removeItem("usuarioLog");
    document.getElementById("localUser").innerHTML = "Iniciar Sesion";
}

window.addEventListener('load', () => {
    var btn_register = document.getElementById("register");

    btn_register.addEventListener('click', () => {
        window.location.href = "../registro/registro.html";
    })

    if (localStorage.getItem("sesionActiva")) {
        document.getElementById("localUser").innerHTML = "Bienvenido " + localStorage.getItem("usuarioLog");
    } 
    else if (!localStorage.getItem("sesionActiva")) {
        document.getElementById("localUser").innerHTML = "Iniciar Sesion";
    }

    if (sesionActiva) {
        document.getElementById("cerrarSesion").style.visibility = "visible";
    } else {
        document.getElementById("cerrarSesion").style.visibility = "hidden";
    }
});
