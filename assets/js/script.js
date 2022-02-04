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