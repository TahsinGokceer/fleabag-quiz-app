const quizData = [
    {
        question: "Fleabag'in ölen arkadaşının ismi nedir?",
        a: "Lisa",
        b: "Helen",
        c: "Boo",
        d: "Stine",
        correct: "c",
        answer: ""
    },
    {
        question: "Fleabag'in kafesinin teması neydi?",
        a: "Kedi",
        b: "Gine Domuzu",
        c: "Tavşan",
        d: "Kuş",
        correct: "b",
        answer: ""
    },
    {
        question: "Fleabag'in üvey annesinden çaldığı şey neydi?",
        a: "Heykel",
        b: "Vazo",
        c: "Tablo",
        d: "Takı",
        correct: "a",
        answer: ""
    },
    {
        question: "Fleabag'in kardeşi iş için nereye gidecekti?",
        a: "Avusturya",
        b: "Rusya",
        c: "Finlandiya",
        d: "İzlanda",
        correct: "c",
        answer: ""
    },
    {
        question: "Fleabag ile Priest ilk nerede öpüştü?",
        a: "Ev",
        b: "Öpüşmedi",
        c: "Sokak",
        d: "Kilise",
        correct: "d",
        answer: ""
    },
    {
        question: "Fleabag'in eski sevgilisinin evden ayrılırken her seferinde unuttuğu eşyası neydi?",
        a: "Tişört",
        b: "Ayıcık",
        c: "Dinozor",
        d: "Kalemlik",
        correct: "c",
        answer: ""
    },
    {
        question: "Fleabag ile Priest ilk nerede karşılaştı?",
        a: "Kafe",
        b: "Kilise",
        c: "Banka",
        d: "Aile Yemeği",
        correct: "d",
        answer: ""
    },
    {
        question: "Fleabag ilk bölümde hangi amaçla bankaya gidiyordu?",
        a: "Kafesi için kredi almak",
        b: "Ev için kredi almak",
        c: "Borç ödemek için",
        d: "Hesap açmak için",
        correct: "a",
        answer: ""
    },
    {
        question: "Fleabag'in ilk bölümü ne zaman yayınlandı?",
        a: "2014",
        b: "2015",
        c: "2016",
        d: "2017",
        correct: "c",
        answer: ""
    },
    {
        question: "Fleabag'in eski sevgilisinin adı neydi?",
        a: "Sam",
        b: "Harry",
        c: "James",
        d: "Michael",
        correct: "b",
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
                    <button class="reload" onclick="location.reload()">Reload</button>                
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