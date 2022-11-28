var frmLogin = document.getElementById("frmLogin");
var inpUser = document.getElementsByName('inpUser')[0]
var inpPass = document.getElementsByName('inpPass')[0]
var inpPass2 = document.getElementsByName('inpPass2')[0]

var lblUser = document.getElementById('lblUser')
var lblPass = document.getElementById('lblPass')
var lblPass2 = document.getElementById('lblPass2')


window.addEventListener('DOMContentLoaded', (event) => {
    var lbox = document.getElementById("theLoginBox");
    lbox.style['opacity'] = '100%';
    lbox.style['transform'] = 'translateY(-30px)';
});

frmLogin.addEventListener('submit', (e)=>{
    if( inpUser.value == '' || inpUser.value.length < 3 ){
        inpUser.classList.add('required');
        lblUser.innerText = "Usuario*"
        e.preventDefault();
    }
    if( inpPass.value == '' || inpPass.value.length < 8 || inpPass.value!=inpPass2.value ){
        inpPass.classList.add('required');
        lblPass.innerText = "Contraseña*"
        e.preventDefault();
    }
    if( inpPass2.value == '' || inpPass2.value.length < 8 || inpPass.value!=inpPass2.value ){
        inpPass2.classList.add('required');
        lblPass2.innerText = "Confirmar Contraseña*"
        e.preventDefault();
    }
})

inpUser.addEventListener('keypress', () => {

    if(inpUser.classList.contains('required') ){
        inpUser.classList.remove('required')
        lblUser.innerText = "Usuario"
    }
    
})
inpPass.addEventListener('keypress', (e)=>{


    if(inpPass.classList.contains('required')){
        inpPass.classList.remove('required')
        lblPass.innerText = "Contraseña"
    }  

})
inpPass2.addEventListener('keypress', (e)=>{


    if(inpPass2.classList.contains('required')){
        inpPass2.classList.remove('required')
        lblPass2.innerText = "Confirmar Contraseña"
    }  

})