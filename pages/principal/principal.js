function contarVisita(){
    if(localStorage.getItem('visita')==null){
        localStorage.setItem('visita', '0');
    }
    let visita=JSON.parse(localStorage.getItem('visita'));
    visita++;
    localStorage.setItem('visita', JSON.stringify(visita));
    mostrarVisitantes();  
}

function mostrarVisitantes(){
    let visita=JSON.parse(localStorage.getItem('visita'));
    document.getElementById("visitante").innerHTML="Eres el visitante "+visita;
}function contarVisita(){
    if(localStorage.getItem('visita')==null){
        localStorage.setItem('visita', '0');
    }
    let visita=JSON.parse(localStorage.getItem('visita'));
    visita++;
    localStorage.setItem('visita', JSON.stringify(visita));
    mostrarVisitantes();  
}

function mostrarVisitantes(){
    let visita=JSON.parse(localStorage.getItem('visita'));
    document.getElementById("visitante").innerHTML="Eres el visitante "+visita;
}