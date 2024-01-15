const questions = [
    {
        question: "Wie viele Smartphones werden jährlich hergestellet?",
        answers: [
            {"text":"1.37 Millarden", correct:false},
            {"text":"1.21 Millarden", correct:true},
            {"text":"1.45 Millarden", correct:false},
            {"text":"1.98 Millarden", correct:false},
        ]
    },
    {
        question: "Welcher Faktor ist entscheidend für die Umweltfreundlichkeit von Elektronikgeräten?",
        answers:[
            {"text":"Höchtmögliche Verpackungsdichte", correct:false},
            {"text":"Geplante Obsolenz", correct:false},
            {"text":"Niedriger Energieverbrauch", correct:true},
            {"text":"Verwendung nicht recyclebarer Materialien", correct:false},
        ]
    },
    {
        question: "Wie können Unternehmen dazu beitragen, den CO2-Fußabruck ihrer IT-Infrakstruktur zu minimieren?",
        answers:[
            {"text":"Einsatz von energieeffizienten Geräten", correct:true},
            {"text":"Verzicht auf Recyclingprogramme", correct:false},
            {"text":"Verwendung von Einwegplastikverpackungen", correct:false},
            {"text":"Intensivierung von Papierdokumenten", correct:false},
        ]
    },
    {
        question: "Welche Rolle spielt die Cloud-Computing-Technologie bei der Förderung von GreenIT?",
        answers:[
            {"text":"Sie trägt zur Energieeffizienz bei", correct:true},
            {"text":"Sie erhöht den Bedarf an physischen Servern", correct:false},
            {"text":"Sie fördert den Einsatz von Einwegspeichermedien", correct:false},
            {"text":"Sie führt zu einer Verringerung der Recylingmöglichkeiten", correct:false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");


let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const seletectBtn = e.target;
    const isCorrect = seletectBtn.dataset.correct === "true";
    if(isCorrect){
        seletectBtn.classList.add("correct");
        score++;
    }else{
        seletectBtn.classList.add("wrong");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

// Add this event listener for the "Play Again" button
nextButton.addEventListener("click", startQuiz);

startQuiz();