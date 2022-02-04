var startButton = document.querySelector("#startbtn");
var resetButton = document.querySelector("#resetbtn");
var highButton = document.querySelector(".highscores")
var timerEl = document.querySelector(".time");
var containerEL = document.querySelector('.container')
var bodyEL = document.querySelector('.main')
var questionSection = document.querySelector('#home')
var clear = document.getElementById('starter');
var timeLeft = 75;
var score = 0;

//Questions
var questions = [
    {
        numb: 1,
        question: "Which of these won't make a function?",
        answer: "resetTime = () => {}",
        options: [
            "function resetTime() {}",
            "var resetTime = function () {}",
            "resetTime = () => {}",
            "None of the above"
        ]
    },
    {
        numb: 2,
        question: "Which language is used to design the appearance of a website?",
        answer: "CSS",
        options: [
            "CSS",
            "HTML",
            "Javascript",
            "XML"
        ]
    },
    {
        numb: 3,
        question: "What language deals with the functionality of a website?",
        answer: "Javascript",
        options: [
            "HTML",
            "CSS",
            "Javascript",
            "XML"
        ]
    },
    {
        numb: 4,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
            "Common Style Sheet",
            "Cascading Style Sheet",
            "Computer Style Sheet",
            "Color Style Sheet"
        ]
    },
    {
        numb: 5,
        question: "Which of these languages is considered the skeleton of a webpage",
        answer: "HTML",
        options: [
            "CSS",
            "Javascript",
            "English",
            "HTML"
        ]
    },
];

startButton.addEventListener("click", startGame)

function sendMessage() {
    timerEl.textContent = " ";
    timerEl.textContent = "Your score is " + (timeLeft + score);
}

function setTime() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft == 0) {
            clearInterval(timerInterval);
            sendMessage();
            return null;
        }
        
    }, 1000); 
}


function next() {
    if (questions[0]) {
        displayQuestion()
    } else {
        displayScore()
    }
}

// function wrongOrRight() {
//     if ()
// }

function displayQuestion() {
    questionSection.innerHTML = "";
    containerEL.innerHTML = "";
    var questionsEL = document.createElement('div');
    questionsEL.className = 'flex-column flex-center template';
    var question = document.createElement('h2');
    question.textContent = questions[0].question;
    question.className = 'question'
    containerEL.appendChild(questionsEL);
    questionsEL.appendChild(question);
    for (i = 0; i < 4; i++) {
        var response = document.createElement('button');
        response.className = 'questionbtn'
        response.textContent = questions[0].options[i];
        response.id = questions[0].options[i];
        response.addEventListener("click", next);
        questionsEL.appendChild(response);
    }
    
    console.log(score)
    // Implement 
    questions.shift()
}

function squizGame() {
    setTime();
    //  Display question function
    displayQuestion();
}



function startGame() {
    questionSection.innerHTML = '';
    var questionsEL = document.createElement('div');
    questionsEL.className = 'flex-column flex-center';
    questionsEL.id = 'starter';
    var header = document.createElement('h2');
    header.textContent = 'Some Rules of this Quiz';
    var body = document.createElement('h3');
    body.className = 'bodytext';
    body.innerHTML = "1. You will have only 15 seconds per each question. \n 2. Once you select your answer, it can't be undone \n 3. You can't select any option once time goes off \n 4. You can't exit from the Quiz while you're playing \n 5. You'll get points on the basis of your correct answers";
    containerEL.appendChild(questionsEL);
    questionsEL.appendChild(header);
    questionsEL.appendChild(body);
    var start = document.createElement('button');
    var quit = document.createElement('button');
    start.textContent = 'Start';
    quit.innerHTML = 'Quit';
    start.className = 'btn';
    quit.className = 'btn';
    questionsEL.appendChild(start);
    questionsEL.appendChild(quit);
    start.addEventListener('click', squizGame);
    quit.addEventListener('click', function() {
        window.location.reload();
    })
};