const questions = [
    {
        question: "Text für die Frage?",
        answers: [
            {"text":"Antwort 1", correct:false},
            {"text":"Antwort 2", correct:true},
            {"text":"Antwort 3", correct:false},
            {"text":"Antwort 4", correct:false},
        ]
    },
    {
        question: "Text für die Frage2?",
        answers:[
            {"text":"Antwort 1", correct:true},
            {"text":"Antwort 2", correct:false},
            {"text":"Antwort 3", correct:false},
            {"text":"Antwort 4", correct:false},
        ]
    },
    {
        question: "Text für die Frage3?",
        answers:[
            {"text":"Antwort 1", correct:false},
            {"text":"Antwort 2", correct:false},
            {"text":"Antwort 3", correct:true},
            {"text":"Antwort 4", correct:false},
        ]
    },
    {
        question: "Text für die Frage4?",
        answers:[
            {"text":"Antwort 1", correct:false},
            {"text":"Antwort 2", correct:true},
            {"text":"Antwort 3", correct:false},
            {"text":"Antwort 4", correct:false},
        ]
    },
    {
        question: "Text für die Frage5?",
        answers:[
            {"text":"Antwort 1", correct:false},
            {"text":"Antwort 2", correct:false},
            {"text":"Antwort 3", correct:false},
            {"text":"Antwort 4", correct:true},
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