/*


*/

var myTrivias = [] //               Estructura que guarda los objetos
var selectedTriviaId = null      //   El id (UID) de la trivia seleccionada        


/*
Cuando se enfoca un input de inciso
queremos saber si es el ultimo de su pregunta              */ 
function handleFocus(e) {
    // Los inputs estan anidados
    // Pero queremos el id del contenedor principal
    let QuestionId = e.target.parentNode.parentNode.parentNode.id 
    let ParagraphId = e.target.id

    // El querySelector busca en en lo mas profundo
    // Y se puede especificar el padre
    let Q = document.getElementById(QuestionId).querySelector('#paragraphs');
    let size = Q.children.length

    /*
        <paragraph>               <question>
        id: 'P1'                  id: 'Q1'
        id[1] = 1 
    */
    /* Es la ultima ?  Incrustamos un fragmento */ 
    if (size === Number(ParagraphId[1])) {
        // podemos acceder al css de las etiquetas
        Q.querySelector('#' + ParagraphId).placeholder = "Inciso " + ParagraphId[1]

        let newP = document.createElement('div')
        newP.classList.add('paragraphContainer')

        let Check = document.createElement('input')
        Check.id = 'isCorrect'
        Check.type = "checkbox"

        let Del = document.createElement('button')
        Del.addEventListener('click', deleteParagraph)
        Del.classList.add('button')
        Del.textContent = 'X'

        let Input = document.createElement('input')
        Input.id = 'P' + (size + 1);
        Input.addEventListener('focus', handleFocus)
        Input.classList.add('paragraphText')
        Input.type = "text"
        Input.placeholder = 'Nuevo Inciso'

        newP.appendChild(Check)
        newP.appendChild(Input)
        newP.appendChild(Del)

        Q.appendChild(newP)
    }
    // Recorremos los incisos para cambiar el index
    updateParagraphs(e.target.parentNode.parentNode.children)
/**
 * Esta es una forma de incrustar html
 * pero no es la unica
 */
}


function appendQuestion() {

    let Q = document.getElementById('questions')
    let newId = 'Q' + (Q.children.length + 1)

    let newQ = document.createElement('div')
    newQ.classList.add('questionContainer')
    newQ.id = newId

    let pointsRow = document.createElement('div')
    pointsRow.classList.add('flex-row')
    pointsRow.classList.add('pointsRow')
    pointsRow.classList.add('between')

    /**
     * podemos pasar las eetiquetas en forma de string
     * la desventaja: que no podemos definir listeners (click, focus...)
     */
    pointsRow.innerHTML =
        ` <div class="flex-row w-30" >
        <p>Puntos: </p>
        <input class="pointsInput" type="number" placeholder="Pts.">
    </div>`

    let delQ = document.createElement('button')
    delQ.textContent = 'X'
    delQ.classList.add('button')
    delQ.classList.add('deleteQuestion')

    /**
     * se definen asi
     */
    delQ.addEventListener('click', deleteQuestion)

    pointsRow.appendChild(delQ)

    newQ.appendChild(pointsRow)

    let row = document.createElement('div')
    row.classList.add('flex-row')
    row.classList.add('questionRow')


    let quest = document.createElement('input')
    quest.classList.add('questionText')
    quest.placeholder = 'Pregunta'
    quest.type = "text"

    row.appendChild(quest)
    newQ.appendChild(row)

    let P = document.createElement('div')
    P.id = 'paragraphs'

    let PC = document.createElement('div')
    PC.classList.add('paragraphContainer')

    let Check = document.createElement('input')
    Check.id = "isCorrect"
    Check.type = "checkbox"

    let Input = document.createElement('input')
    Input.id = 'P1'
    Input.classList.add('paragraphText')
    Input.type = "text"
    Input.addEventListener('focus', handleFocus)
    Input.placeholder = 'Nuevo Inciso'

    let Del = document.createElement('button')
    Del.addEventListener('click', deleteParagraph)
    Del.disabled = true
    Del.classList.add('button')
    Del.textContent = 'X'

    PC.appendChild(Check)
    PC.appendChild(Input)
    PC.appendChild(Del)
    P.appendChild(PC)
    newQ.append(P)
    Q.appendChild(newQ)

}
function deleteQuestion(event) {
    // Remover
    event.target.parentNode.parentNode.remove()
    // Recorremos las preguntas para cambiar el id
    let Questions = document.getElementById('questions').children
    let N = Questions.length

    for (let i = 0; i < N; i++) {
        Questions[i].id = 'Q' + (i + 1)
    }
}
function deleteParagraph(event) {
    let paragraphs = event.target.parentNode.parentNode.children
    event.target.parentNode.remove()
    updateParagraphs(paragraphs)
}

function updateParagraphs(paragraphs) {
    let N = paragraphs.length

    for (let i = 0; i < N; i++) {
        paragraphs[i].children[1].placeholder = 'Inciso ' + (i + 1)
        paragraphs[i].children[1].id = 'P' + (i + 1)
        paragraphs[i].children[2].disabled = false
    }

    paragraphs[N - 1].children[1].placeholder = 'Nuevo Inciso'
    paragraphs[N - 1].children[2].disabled = true

    if (N == 1)
        paragraphs[0].children[2].disabled = true
}

/**
 * Pasamos el html a JSON
 */
function saveTrivia() {
    let t = document.getElementById('triviaName').value
    document.getElementById(selectedTriviaId).querySelector('#lblTriviaName').textContent = 'Nombre: '+ t+''
    
    
    let Q = document.getElementById('questions')
    let N = Q.children.length
   document.getElementById(selectedTriviaId).querySelector('#lblQuestionsCount').textContent = 'Preguntas:'+ N+''

    let qs = []
    for (let i = 0; i < N; i++) {
        let q = Q.children[i].querySelector('.questionText').value
        let p = Q.children[i].querySelector('.pointsInput').value
        let P = Q.children[i].querySelector('#paragraphs')
        let M = P.children.length

        let pg = []
        for (let j = 0; j < M - 1; j++) {
            let paragraph = P.children[j].querySelector('.paragraphText').value
            let isCorrect = P.children[j].querySelector('#isCorrect').checked
            pg.push({ paragraph: paragraph, isCorrect: isCorrect })
        }
        qs.push({ question: q, points: p, paragraphs: pg })
    }
    myTrivias.forEach((tr, i) => {
        if (tr.triviaId === selectedTriviaId) {
            myTrivias[i] = { triviaId: selectedTriviaId, title: t, questions: qs }
        }
    })
}

function appendTrivia() {

    let T = document.getElementById('trivias')

    let newT = document.createElement('div')
    newT.style.cursor = 'pointer'
    newT.id = 'T' + Date.now()
    newT.addEventListener('click', () => triviaSelected(newT.id))
    newT.classList.add('triviaCard')

    

    myTrivias.push({
        triviaId: newT.id,
        title: '',
        questions: [{
            question: '',
            points: '',
            paragraphs: []
        }]
    })

    let hrand = Math.floor(Math.random() * 360);
    let divColor = document.createElement("div")
    divColor.classList.add('color')
    divColor.style.background = `hsl( ${hrand},25%,40% )`

    newT.appendChild(divColor)

    newT.innerHTML +=
        `<div class="info">
        <div class="flex-row" id="lblTriviaName">
            Nombre:
        </div>
        <div class="flex-row" id="lblQuestionsCount">
            Preguntas:
        </div>
    </div>`

    T.appendChild(newT)


    if( myTrivias.length == 1 ){
        selectedTriviaId = newT.id
        triviaSelected(newT.id)
    }
}

/**
 * Pero es un poco mas dificil paar JSON a html xd
 */
function triviaSelected(id) {
    saveTrivia()
    
    query = '#'+selectedTriviaId
    if(selectedTriviaId!=null)
        document.getElementById('trivias').querySelector(query).classList.remove('triviaSelected')

    document.getElementById('trivias').querySelector(`#${id}`).classList.add('triviaSelected')

    selectedTriviaId = id
    let trivia = myTrivias.find((t) => {
        return t.triviaId === id
    })

    /**
     * Escribimos el cascaron de html en String
     * porque es mas rapido
     */
    let S = document.getElementById('section')
    S.innerHTML = `
    <input id="triviaName" type="text" placeholder="Nombre de la trivia" value="${trivia.title}">
    <div id="questions" class="questionsContainer">
        
    </div>
    <div class="button addButton" onclick="appendQuestion()" >
        Agregar Pregunta
    </div>
    <div class="button saveButton" onclick="saveTrivia()" >
        Guardar
    </div>
    `

    /**
     * Recorremos las trivias
     * para crear los elementos anidados
     */
    let Q = S.querySelector('#questions')
    trivia.questions.forEach((q, i) => {
        let newQ = document.createElement('div')
        newQ.id = 'Q' + (i + 1)
        newQ.classList.add('questionContainer')
        newQ.innerHTML = `
            <div class="flex-row pointsRow between">
                <div class="flex-row w-30" >
                    <p>Puntos: </p>
                    <input class="pointsInput" type="number" placeholder="Pts." value="${q.points}">
                </div>
                <button class="button deleteQuestion">X</button>
            </div>
            <div class="flex-row questionRow">
                <input class="questionText" type="text" placeholder="Pregunta" value="${q.question}">
            </div>
            <div id="paragraphs">
                
            </div>
        `
        /**
         * declaramos el evento del atributo
         * porque es la unica forma de hacerlo
         */
        newQ.querySelector('.deleteQuestion').addEventListener('click', deleteQuestion)

        let Pg = newQ.querySelector('#paragraphs')
        q.paragraphs.forEach((p, j) => {
            let newP = document.createElement('div')
            newP.classList.add('paragraphContainer')
            let checked = (p.isCorrect ? 'checked' : '')
            newP.innerHTML = `
                <input type="checkbox" name="" id="isCorrect" ${checked} >
                <input class="paragraphText" id="P${j + 1}" type="text" placeholder="Inciso ${j + 1}" value="${p.paragraph}" >
                <button class="button">
                    X
                </button>
            `
            newP.querySelector('.paragraphText').addEventListener('focus', handleFocus)
            newP.querySelector('.button').addEventListener('click', deleteParagraph)
            Pg.appendChild(newP)
        })

        let lastP = document.createElement('div')
        lastP.classList.add('paragraphContainer')
        lastP.innerHTML +=
            `
            <input type="checkbox" name="" id="isCorrect">
            <input class="paragraphText" id="P1" type="text" placeholder="Nuevo Inciso" >
            <button class="button" disabled>
                X
            </button>
        `
        lastP.querySelector('.paragraphText').addEventListener('focus', handleFocus)
        lastP.querySelector('.button').addEventListener('click', deleteParagraph)

        Pg.appendChild(lastP)
        Q.appendChild(newQ)
    })
}