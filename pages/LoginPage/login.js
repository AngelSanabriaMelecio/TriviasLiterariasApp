
var frmLogin = document.getElementById("frmLogin")
var inpUser = document.getElementsByName('inpUser')[0]
var inpPass = document.getElementsByName('inpPass')[0]
var lblUser = document.getElementById('lblUser')
var lblPass = document.getElementById('lblPass')


window.addEventListener('DOMContentLoaded', (event) => {
    var lbox = document.getElementById("theLoginBox");
    lbox.style['opacity'] = '100%';
    lbox.style['transform'] = 'translateY(-30px)';
});

frmLogin.addEventListener('submit', (e)=>{
    if( inpUser.value == ''  ){
        inpUser.classList.add('required');
        lblUser.innerText = "Usuario*"
        e.preventDefault();
    }
    if( inpPass.value == '' ){
        inpPass.classList.add('required');
        lblPass.innerText = "Contraseña*"
        e.preventDefault();
    }
})

inpUser.addEventListener('keypress', () => {

    if(inpUser.classList.contains('required')){
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
let triv =
{
    "title":"Harry Potter",
    "triviaId":"T1669484509674",
    "questions":[
        {
            "triviaId":"T1669484509674",
            "questionId":396,
            "question":"Quien es harry",
            "points":1000,
            "paragraphs":[
                {
                    "triviaId":null,
                    "questionId":null,
                    "paragraphId":null,
                    "paragraph":null,
                    "isCorrect":null
                },
                {
                    "triviaId":null,
                    "questionId":null,
                    "paragraphId":null,
                    "paragraph":null,
                    "isCorrect":null
                },
                {
                    "triviaId":null,
                    "questionId":null,
                    "paragraphId":null,
                    "paragraph":null,
                    "isCorrect":null
                }
            ]
        },
        {
            "triviaId":"T1669484509674",
            "questionId":397,
            "question":"Quien es voldemod",
            "points":200,
            "paragraphs":[
                {
                    "triviaId":null,
                    "questionId":null,
                    "paragraphId":null,
                    "paragraph":null,
                    "isCorrect":null
                },
                {
                    "triviaId":null,
                    "questionId":null,
                    "paragraphId":null,
                    "paragraph":null,
                    "isCorrect":null
                },
                {
                    "triviaId":null,
                    "questionId":null,
                    "paragraphId":null,
                    "paragraph":null,
                    "isCorrect":null
                }
            ]
        }
    ]
}