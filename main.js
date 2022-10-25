
var savedQuestions = []

function handleFocus(e){
    if( e.target.id!='last' ) return;

    let QID = e.target.parentElement.parentElement.id 

    addInciso( QID );
}
function addQuestion( e )
{
    let currentQuestions = document.getElementById('questionContainer')
    
    let newQ = document.createElement('div')
    newQ.classList.add('question');
    newQ.classList.add('container');

    let QN = document.createElement('div')
    QN.classList.add('questionName')
    QN.innerHTML = `<input type="text" placeholder="Pregunta">`

    let incisos = document.createElement('div')
    let totalQ = document.querySelector('#questionContainer').children.length
    incisos.id = "incisos" + (totalQ+1)

    let inciso = document.createElement('div')
    inciso.classList.add('inciso')
    inciso.innerHTML = `<input class="check" type="checkbox" disabled>
        <input class="input" id="last" type="text" onfocus="handleFocus(event)" placeholder="Agrega Un Inciso">
        <button class="button" onclick="deleteInciso(1)" disabled> X </button>`

    incisos.appendChild(inciso)

    newQ.appendChild(QN)
    newQ.appendChild(incisos)

    currentQuestions.appendChild(newQ)
}


function addInciso( QID ){
    /* Obtengo todos los incisos y creo uno nuevo */
    let currentIncisos = document.getElementById(QID);
    let newInciso = document.createElement('div');
    
    /* Le quito su id al penultimo */
    currentIncisos.querySelector('#last').id = ''

    /* Establezco una clase y un id para el nuevo inciso (ultimo) */
    newInciso.classList.add('inciso')
    let totalIncisos = currentIncisos.children.length + 1;
    newInciso.id = totalIncisos;

    /* Escribo el HTML del inciso y sus eventos */
    newInciso.innerHTML =  
    `<input class="check" type="checkbox" >
    <input 
        class="input" 
        id="last" 
        type="text" 
        onfocus="handleFocus(event)" 
        placeholder="Opcion: ${newInciso.id}">
    <button class="button" onclick="deleteInciso(${QID},${newInciso.id})">X</button>`
    
    /* Añado el nuevo inciso y actualizo */
    currentIncisos.appendChild(newInciso)
    updateIncisos(QID)
}
function deleteInciso(QID, id){

    /* Se elimina el inciso con el id */
    console.log('questionId: ',QID,'incico: ',id)
    let incisos = document.getElementById(QID)
    let inciso = incisos.querySelector(`[id='${id}']`)

    inciso.remove()

    /* Se actualizan los id's y eventos */
    updateIncisos(QID)
    
}
function updateIncisos(QID){
    /* Obtenemos los incisos de la pregunta */
    let currentIncisos = document.getElementById(QID).children;
    let totalIncisos = currentIncisos.length;

    /* Recorremos cada uno para cambiar cosas */
    for( let i = 0; i < totalIncisos; i++ ){
        const newIncisoId = i+1;
        /* Cambiamos el Id */
        currentIncisos[i].id = newIncisoId;
        
        let btn = currentIncisos[i].getElementsByClassName("button")[0]
        let inp = currentIncisos[i].getElementsByClassName("input")[0]
        let check = currentIncisos[i].getElementsByClassName("check")[0]
        /* Cambiamos el evento del boton */
        btn.onclick = function() { deleteInciso(QID,newIncisoId) }        
        btn.disabled = false;
        check.disabled = false;
        if( totalIncisos === 1)
            btn.disabled=true

        inp.id = ''
        inp.placeholder = 'Opcion: '+ newIncisoId;
        if( i+1 === totalIncisos ){
            inp.id = 'last'
            inp.placeholder = 'Agregar Un Inciso'
            check.disabled = true
            btn.disabled = true;
        }
    }
}
function saveQuestion(){
    /* Obtenemos el contenedor principal */
    var cont = document.getElementById("questionContainer")
    /* Guardamos el valor del input con la pregunta y los incisos */
    var InputQuestion = cont.firstElementChild.firstElementChild
    var question = InputQuestion.value
    InputQuestion.value = ''
    var inc = cont.querySelector("#incisos")
    var totalInc =  inc.children.length;
    /* Recorremos los Incisos y guardamos cada uno en un arreglo */
    var Incisos = []
    for( let i=0; i<totalInc-1; i++ ){
        var isCorrectAnswer = inc.children[i].querySelector(".check").checked;
        var incisoText = inc.children[i].querySelector(".input").value
        Incisos.push({text:incisoText, isCorrect:isCorrectAnswer})
    } 
    savedQuestions.push( {question:question, incisos:Incisos} )
    
    showQuestion()

    while( inc.children.length > 1 ){
        inc.children[0].remove();
    }
}

function showQuestion(){
    var saved = document.querySelector("#savedQuestions")
    var totalSaved = saved.children.length

    while( totalSaved )
    {
        saved.children[0].remove()
        totalSaved--;
    }
    savedQuestions.map( (q) => {
        var newSaved = document.createElement("div")
        newSaved.classList.add("savedQuestion")

        var divTitle = document.createElement("div")
        divTitle.innerHTML = `<h2>${q.question}</h2>`
        newSaved.appendChild(divTitle)
        var divIncisos = document.createElement('div')
        q.incisos.map( inciso => {
            divIncisos.innerHTML += `<p>${inciso.text}</p>`
        } )
        newSaved.appendChild(divIncisos);
        saved.appendChild(newSaved)
    } )


}