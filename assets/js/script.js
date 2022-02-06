var startButton = document.querySelector("#startbtn");
var resetButton = document.querySelector("#resetbtn");
var highScoreButton = document.querySelector(".highscores");
var timerEl = document.querySelector(".time");
var containerEL = document.querySelector('.container');
var bodyEL = document.querySelector('.main');
var questionSection = document.querySelector('#home');
var clear = document.getElementById('starter');
var timeLeft = 75;
let scores = (JSON.parse(localStorage.getItem('highscores')));

// Get's highscores
highScoreButton.addEventListener(
    'click', highScoresScreen = () => {
        containerEL.innerHTML = "";

        var scores = JSON.parse(localStorage.getItem('highscores'));
        var questionsEL = document.createElement('div');
        var scoreBoxEL = document.createElement('div');
        var headerScores = document.createElement('h2');
        var goBackButton = document.createElement('button');
        
        headerScores.textContent = "High Scores";
        goBackButton.textContent = 'Go Back'
        goBackButton.className = 'btn'
        questionsEL.className = 'flex-column flex-center template';
        scoreBoxEL.className = 'scorebox';
        
        containerEL.appendChild(questionsEL);
        questionsEL.appendChild(scoreBoxEL);
        questionsEL.appendChild(goBackButton);
        scoreBoxEL.appendChild(headerScores);

        
        scores.forEach(score => {
            var p = document.createElement('h2');
            p.className = 'scorey';
            p.textContent = score;
            scoreBoxEL.appendChild(p);
        });

        goBackButton.addEventListener('click', function() {
            location.reload()
        })
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
    }
];

// Initiates squiz game
startButton.addEventListener("click", startGame)

// Clears time and shows player his/ her/ their score
function sendMessage() {
    timerEl.textContent = " ";
    timerEl.textContent = "Your score is " + timeLeft;
}

// Initiates time.  If time equals 0 then game is over
function setTime() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft == 0) {
            clearInterval(timerInterval);
            displayScore()
            return null;
        }
        
    }, 1000); 
}

// Function that displays the score and gives the option to input initials in order to save it to high score
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
    var trees = inputScore.value;
    
    containerEL.appendChild(questionsEL);
    questionsEL.appendChild(scoreContainer);
    questionsEL.appendChild(box);
    box.appendChild(form);
    form.appendChild(inputScore);
    form.appendChild(button);
    
    button.addEventListener('click', function (e) {
        e.preventDefault();

        var record = `${inputScore.value} - ${timeLeft}`;
        
        Array.from(scores.push( record ))

        if (inputScore.value.length > 1) {
        myStorage.setItem("highscores", JSON.stringify(scores));
        location.reload();
        } 
    })
}

// Displays next question and subtracts time if the question is wrong
function next() {
    if (questions[0]) {
        displayQuestion();
    } 
    
    if (this.id != this.title) {
        timeLeft -= 10;
    } 
}

// Creates html that shows the question and its options
function displayQuestion() {
    containerEL.innerHTML = "";
    
    var questionsEL = document.createElement('div');
    var question = document.createElement('h2');
    
    questionsEL.className = 'flex-column flex-center template';
    question.textContent = questions[0].question;
    question.className = 'question';
    timerEl.className = 'timerEl'

    questionsEL.appendChild(timerEl);
    containerEL.appendChild(questionsEL);
    questionsEL.appendChild(question);
    
    for (i = 0; i < 4; i++) {
        var response = document.createElement('button');
        
        response.className = 'questionbtn'
        response.title = questions[0].answer 
        response.textContent = questions[0].options[i];
        
        questionsEL.appendChild(response);
        
        response.id = questions[0].options[i];
        response.addEventListener("click", function() {
            next()
            if (questions.length === 0 && 'click') {
                displayScore();
            }
        });
    }
    questions.shift()
}

// Let the games begin
function squizGame() {
    setTime();
    displayQuestion();
}


// Function that shows rules of the game and the option to start or quit and go back to the home page
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
        location.reload();
    })
};
