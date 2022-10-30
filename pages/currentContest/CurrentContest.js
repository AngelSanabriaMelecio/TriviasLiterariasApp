var questions = [
    { 
        question:'Cual era el nombre del protagonista de Hatty Potter?',
        points:200,
        paragraphs:[
            { paragraph:'Harry Styles', isCorrect:false },
            { paragraph:'Jorge Harrison', isCorrect:false },
            { paragraph:'Harry Potter', isCorrect:true },
        ]
    },
    { 
        question:'Cual era la casa del protagonista?',
        points:100,
        paragraphs:[
            { paragraph:'La casa blanca', isCorrect:false },
            { paragraph:'Griffindor', isCorrect:true },
            { paragraph:'Palacio Nacional', isCorrect:false },
        ]
    },
    { 
        question:'El verdadero nombre de voldemord?',
        points:500,
        paragraphs:[
            { paragraph:'Ramon Valdez', isCorrect:false },
            { paragraph:'Marvolo Riddle', isCorrect:true },
            { paragraph:'Marlvoro Rojo', isCorrect:false },
            { paragraph:'Ron Wisley', isCorrect:false },
        ]
    }
]

var score;

var data = [
    { id:0, name: 'los picateclas', points: 600 },
    { id:1, name: 'Javamonos', points: 640 },
    { id:2, name: 'Hugs for Bugs', points: 780 },
    { id:3, name: 'Teambiriche', points: 720 },
    { id:4, name: 'Krakatoa', points: 570 },
    { id:5, name: 'chicos que lloran', points: 60 },
    { id:6, name: 'To lazy to propagate', points: 150 },
]

function descending(a, b) { return a.points < b.points ? 1 : -1; }

function reposition() {
    var elements = document.querySelector('#scoreList')
    var height = elements.children[0].clientHeight;
    var y = height + 20;
    for (var i = 0; i < score.length; i++) {
        let id = score[i].id 
        let e = elements.querySelector(`#I${id}`)
        e.style["top"] = y+"px"

        e.querySelector(".rank").textContent = i+1
        e.querySelector(".points").textContent = score[i].points
        y += height;
    }
}

function updateBoard() {
    let newVal = Math.floor(Math.random() * 800 + 200)
    var list = document.querySelector('#scoreList')
    let pos = Math.floor(Math.random() * list.children.length)
    score[pos].points = newVal

    score.sort(descending);
    reposition();
}

function resetBoard() {
    var list = document.querySelector("#scoreList");
    list.innerHTML = ""
    score = [];

    for (let i = 0; i < 7; i++) {
        score.push(
            {
                id: data[i].id,
                name: data[i].name,
                points: data[i].points,
            }
        )
    }

    for (var i = 0; i < score.length; i++) {
        var item = document.createElement('tr')
        item.classList.add('score')
        item.id = "I"+i;
        item.innerHTML = 
            "<th class='rank'>" + (i + 1) + "</th>" +
            "<td class='name'>" + score[i].name + "</td>" +
            "<td class='points'>" + score[i].points + "</td>" 
        
        list.appendChild(item);
    }
    score.sort(descending);
    reposition();
}

function showRandomQuestion(){

    let pos = Math.floor(Math.random()*questions.length)
    let q = questions[pos]
    questions.splice(pos,1)

    document.querySelector('#currentQuestion').textContent = q.question+'';    
    document.querySelector('#currentPoints').textContent = 'Puntos: '+ q.points+'';

    console.log( q.points )

    currParagraphs = document.querySelector("#currentParagraphs");
    currParagraphs.innerHTML = ''
    q.paragraphs.forEach( (p,i) => {
        let classCorrect = ''
        if( p.isCorrect ) classCorrect = 'correct'
        currParagraphs.innerHTML += 
        `<h2 class="paragraph ${classCorrect}">
            ${String.fromCharCode(i+97)}) ${p.paragraph}        
        </h2>`
    })

}
function showCorrectAnswer(){
    let correct = document.querySelector(".correct")
    correct.style["transition"] = "1s"
    correct.style["font-size"] = "2.2rem"
    correct.style["color"] = "#45ff64"
}

resetBoard()
showRandomQuestion()