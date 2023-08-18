const quizData = [
    {
        question: "Cebinde 11 TL'si olan Aslı 7.5 TL ekmeğe verirse kaç TL'si kalır?",
        a: "4 TL",
        b: "3.5 TL",
        c: "5 TL",
        d: "4.5 TL",
        correct: "b",
        answer: ""
    },
    {
        question: "Dolapta 13 yumurta vardı. 5 tanesi kahvaltıda yenildi sonra 24 yeni yumurta alındı. Dolapta kaç yumurta var?",
        a: "33",
        b: "29",
        c: "32",
        d: "22",
        correct: "c",
        answer: ""
    },
    {
        question: "15 tane okunacak kitabı olan Betül 6 tanesini okumuş ve 4 yeni kitap almış. Kaç tane okunacak kitabı var?",
        a: "12",
        b: "10",
        c: "11",
        d: "13",
        correct: "d",
        answer: ""
    },
    {
        question: "İçinde 27 yolcunun olduğu otobüsten 1. durakta 5 yolcu inmiş, 2. durakta 9 yolcu inmiş 5 yolcu binmiş. Kaç yolcu var?",
        a: "18",
        b: "19",
        c: "21",
        d: "22",
        correct: "a",
        answer: ""
    },
    {
        question: "120 TL parası olan Ayşe 240 TL harçlık alırsa kaç TL'si olur?",
        a: "350 TL",
        b: "380 TL",
        c: "340 TL",
        d: "360 TL",
        correct: "d",
        answer: ""
    },
    {
        question: "Kalemliğinde 14 kalemi olan Esra 3 kalemini arkadaşına vermiş ve 2 kalemi kırılmış. Kaç kalem kaldı?",
        a: "11",
        b: "9",
        c: "10",
        d: "8",
        correct: "b",
        answer: ""
    },
    {
        question: "Sabah 2 saat öğlen 1 buçuk saat akşam 2 saat kitap okuyan Furkan toplam kaç saat kitap okumuş olur?",
        a: "4.5 saat",
        b: "5 saat",
        c: "5.5 saat",
        d: "6.5 saat",
        correct: "c",
        answer: ""
    },
    {
        question: "13. kattaki asansör önce 7 kat aşağı sonra 5 kat yukarı sonra yine 4 kat aşağı inerse kaçıncı katta olur?",
        a: "7. kat",
        b: "8. kat",
        c: "6. kat",
        d: "5. kat",
        correct: "a",
        answer: ""
    },
    {
        question: "29 TL parası olan Alper 13 TL'ye dondurma 11TL'ye çikolata almış. Alperin ne kadar parası kalır?",
        a: "6 TL",
        b: "10 TL",
        c: "5 TL",
        d: "9 TL",
        correct: "c",
        answer: ""
    },
    {
        question: "24 tane ekmek olan fırında sırasıyla 4, 6, 3 ekmek satılmış. Fırında kaç ekmek kalır?",
        a: "9",
        b: "14",
        c: "13",
        d: "11",
        correct: "d",
        answer: ""
    }
]

const container = document.querySelector('.container')
const questionText = document.getElementById('question_text')
const answers = document.querySelectorAll('.answer')
const aText = document.getElementById('a_text')
const bText = document.getElementById('b_text')
const cText = document.getElementById('c_text')
const dText = document.getElementById('d_text')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')

let currentQuestion = 0

loadQuiz()

function loadQuiz(){
    deselectAnswers()
    const currentQuestionData = quizData[currentQuestion]
    questionText.innerHTML = currentQuestionData.question
    aText.innerHTML = currentQuestionData.a
    bText.innerHTML = currentQuestionData.b
    cText.innerHTML = currentQuestionData.c
    dText.innerHTML = currentQuestionData.d
}

function getSelected(){
    let answer = undefined

    answers.forEach(ans => {
        if(ans.checked){
            answer = ans.id
        }
    })

    quizData[currentQuestion].answer = answer
    return answer
}

function deselectAnswers(){
    answers.forEach(ans => {
        ans.checked = false
    })
}

nextBtn.addEventListener('click', () => {
    const answer = getSelected()

    if(answer){
        currentQuestion++
        
        if(currentQuestion < quizData.length){
            loadQuiz()
        }else{
            let score = 0
            const cards = document.createElement("div")
            cards.classList.add("cards")

            for(let i = 0; i < quizData.length; i++){
                const card = document.createElement("div")
                card.classList.add("card")

                card.innerHTML = `
                    <div class="question-number">
                        <h4>${i+1}.</h4>
                    </div>
                    <div class="info">
                        <p>Your Answer : ${(quizData[i].answer).toUpperCase()}</p>
                        <p>Correct Answer : ${(quizData[i].correct).toUpperCase()}</p>
                    </div>                
                `
                card.style.height = `${248 / Math.ceil(quizData.length / 3)}px`
                if(quizData[i].answer === quizData[i].correct){
                    score++
                    card.classList.add("true")
                }

                cards.appendChild(card)
            }

            container.innerHTML = 
            `
                <h2 class="final">You finished the quiz.</h2>
                <h5>Correct Answer: ${score}</h5>
                <div class="cards">
                    ${cards.innerHTML}                
                </div>
                <div class="buttons">
                    <button class="reload" onclick="location.reload()">Tekrar Çöz</button>                
                </div>
            `
        }        
    }    
})

prevBtn.addEventListener('click', () => {
    currentQuestion--

    if(currentQuestion < 0){
        currentQuestion = 0
    }

    loadQuiz()
})