var numUser = 1;

class User{
    constructor(userId,userName,password,isAdmin){
        this.userId = userId;
        this.userName = userName;
        this.password = password;
        this.isAdmin = isAdmin;
    }    
}

window.addEventListener('load',()=>{
    var user = new User(0,"Admin","123",true);
    insertar(user);

    var btn_register = document.getElementById("register");    

    btn_register.addEventListener('click',()=>{
        
        var userName = document.getElementById("userName").value;
        var password = document.getElementById("password").value;
        
        if(validarnombre(userName) && validarpassword(password)){
            var user = new User(numUser,userName,password,false);
            if(insertar(user)){
                alert("Usuario registrado, bienvenido: "+user.userName);
                window.location.href = "./index.html";
                numUser += 1;
            }else{
                alert("Ya existe ese usuario");
            }            
        }                
        
    })

})

function validarpassword(password){
    if(password.length>8){
        return true;
    }else{
        alert("La contraseña debe contener al menos 8 caracteres");
        return false;
    }
}

function validarnombre(nombre){
    const regex = /^[a-zA-Z]([-']?[a-z]+)([a-zA-Z]([-']?[a-z]+))*$/;
    if(!validar(regex,nombre)) 
    {
        alert("Nombre no valido");
        return false

    } else {        
        return true
    }

}

function validar(r,str){
    var match = str.match(r);
    return match && str ===match[0];
}


function insertar(user){
    var flag = true;
    if(localStorage.getItem('Users')==null){
        
        localStorage.setItem('Users','[]')
    }
    
    var datos = JSON.parse(localStorage.getItem('Users'))
    datos.forEach((it)=>{
        if(it.userName==user.userName){
            console.log(it.userName);
            flag = false;
        }
    })

    if(flag){
        datos.push(user);
        localStorage.setItem('Users',JSON.stringify(datos))
        return true;
    }else{
        return false;
    }
    
}