var startButton = document.querySelector("#startbtn");
var resetButton = document.querySelector("#resetbtn");
var highButton = document.querySelector(".highscores")
var timerEl = document.querySelector(".time");
var containerEL = document.querySelector('.container')
var bodyEL = document.querySelector('.main')
var questionSection = document.querySelector('#home')
var clear = document.getElementById('starter');
var timeLeft = 75;
var myStorage = window.localStorage;
var scoresObject = {}
console.log(localStorage);

highButton.addEventListener(
    'click', highScoresScreen = () => {
        containerEL.innerHTML = "";
        var questionsEL = document.createElement('div');
        questionsEL.className = 'flex-column flex-center template';
        containerEL.appendChild(questionsEL);
        var scores = JSON.parse(myStorage.getItem('') || '[]');
        scores.push();
        console.log(scores);
    })

//Questions
var questions = [
    {
        numb: 1,
        question: "Which of these won't make a function?",
        answer: "None of the above",
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
    timerEl.textContent = "Your score is " + timeLeft;
}

function setTime() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft == 0 || questions.length === 0) {
            clearInterval(timerInterval);
            displayScore()
            return null;
        }
        
    }, 1000); 
}

function displayScore() {
    containerEL.innerHTML = '';
    timerEl.textContent = '';
    
    var scoreContainer = document.createElement('h2');
    var questionsEL = document.createElement('div');
    var inputScore = document.createElement('input');
    var box = document.createElement('div');
    var form = document.createElement('form');
    var button = document.createElement('button');
    
    scoreContainer.innerHTML = `Your score is ${timeLeft}`;
    inputScore.placeholder = 'Enter Initials';
    questionsEL.className = 'flex-column flex-center template';
    inputScore.className = 'input_style'
    form.className = 'enter_btn';
    button.className = 'button_btn';
    button.innerHTML = 'ENTER'
    inputScore.maxLength = '3';
    
    containerEL.appendChild(questionsEL);
    questionsEL.appendChild(scoreContainer);
    questionsEL.appendChild(box);
    box.appendChild(form);
    form.appendChild(inputScore);
    form.appendChild(button);
    
    button.addEventListener('click', function (e) {
        e.preventDefault();

        scoresObject[`${inputScore.value}`] = timeLeft

        if (inputScore.value.length > 1) {
        myStorage.setItem(inputScore.value, JSON.stringify());
        questionsEL.innerHTML = '';
        window.location.reload()
        }
    })
}

function viewScores() {
    var scores = JSON.parse(myStorage.getItem('') || '[]');
    scores.push()
    console.log(scores)
    // for (i = 0; i < myStorage.length - 1; i++) {
    //     console.log(
    //         myStorage
    //     )
    // }
}

function next() {
    if (questions[0]) {
        displayQuestion();
    } else {
        displayScore();
    } 
    
    if (this.id != this.title) {
        timeLeft -= 10;
    } 
}

function displayQuestion() {
    containerEL.innerHTML = "";
    
    var questionsEL = document.createElement('div');
    var question = document.createElement('h2');
    
    questionsEL.className = 'flex-column flex-center template';
    question.textContent = questions[0].question;
    question.className = 'question';

    containerEL.appendChild(questionsEL);
    questionsEL.appendChild(question);
    
    for (i = 0; i < 4; i++) {
        var response = document.createElement('button');
        
        response.className = 'questionbtn'
        response.title = questions[0].answer 
        response.textContent = questions[0].options[i];
        
        questionsEL.appendChild(response);
        
        response.id = questions[0].options[i];
        response.addEventListener("click", next);
    }
    questions.shift()
}

function squizGame() {
    setTime();
    displayQuestion();
}



function startGame() {
    questionSection.innerHTML = '';
    
    var questionsEL = document.createElement('div');
    var header = document.createElement('h2');
    var body = document.createElement('h3');
    var start = document.createElement('button');
    var quit = document.createElement('button');
    
    questionsEL.className = 'flex-column flex-center';
    questionsEL.id = 'starter';
    body.className = 'bodytext';
    header.textContent = 'Some Rules of this Quiz';
    body.innerHTML = "1. Once you select your answer, it can't be undone \n2. You can't select any option once time goes off \n3. You can't exit from the Quiz while you're playing \n4. You'll lose points on the basis of your wrong answers";
    
    start.textContent = 'Start';
    quit.innerHTML = 'Quit';
    start.className = 'btn';
    quit.className = 'btn';
    
    containerEL.appendChild(questionsEL);
    questionsEL.appendChild(header);
    questionsEL.appendChild(body);
    questionsEL.appendChild(start);
    questionsEL.appendChild(quit);
    
    start.addEventListener('click', squizGame);
    quit.addEventListener('click', function() {
        window.location.reload();
    })
};