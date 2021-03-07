//set the array for the questions

var questions = [{
    title: "Inside which HTML element do we put the JavaScript?",
    choices: ["script", "scripting", "javascript", "js"],
    answer: "script"
},
{
    title: "Which event occurs when the user clicks on an HTML element?",
    choices: ["onmouseover", "onchange", "onclick", "onmouseclick"],
    answer: "onclick"
},
{
    title: "Which operator is used to assign a value to a variable?",
    choices: ["X", "=", "+", "-"],
    answer: "="
},
{
    title: "Which of the following function of an array object adds and/or removes elements from an array?",
    choices: ["toSource( )", "sort( )", "unshift( )", "splice( )"],
    answer: "splice( )"
},
{
    title: "Which of the following function of String object combines the text of two strings and returns a new string?",
    choices: ["add( )", "concat( )", " merge( )", "append( )"],
    answer: "concat( )"
}
]

//setting the numerical variables for the functions.. scores and timers.. 
var score = 0;

//set at -1 so we start with question 0 in the array
var currentQuestion = -1;
var timeLeft = 0;
var timer;

//starts the countdown timer once user clicks the 'start' button
function start() {

    timeLeft = 75;
    document.getElementById("time").innerHTML = timeLeft;


    timer = setInterval(function () {
        timeLeft--;
        document.getElementById("time").innerHTML = timeLeft;

        //proceed to end the game function when timer is below 0 at any time
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
    //the game fuction
    next();
}

//stop the timer to end the game 
function endGame() {
    clearInterval(timer);

    // reports score at the end 

    var quizContent =
        `<h2>Game over!</h2>
<h3>You got a ` + score + ` /100!</h3>
<h3>That means you got ` + score / 20 + ` questions correct!</h3>
<input type="text" id="name" placeholder="Initials"> 
<button onclick="setScore()">Set score!</button>`;


    document.getElementById("opening").innerHTML = quizContent;
}

//store the scores on local storage
function setScore() {
    localStorage.setItem("highscore", score);
    localStorage.setItem("highscoreName", document.getElementById('name').value);
    getScore();
}

// pulls score from local storage and rewrites HTML
function getScore() {
    var quizContent = `
<h2>` + localStorage.getItem("highscoreName") + `'s highscore is:</h2>
<h1>` + localStorage.getItem("highscore") + `</h1><br> 

<button onclick="clearScore()">Clear score!</button><button onclick="resetGame()">Play Again!</button>`;

    document.getElementById("opening").innerHTML = quizContent;
}

//clears the score name and value in the local storage if the user selects 'clear score'
function clearScore() {
    localStorage.setItem("highscore", "");
    localStorage.setItem("highscoreName", "");

    resetGame();
}

//reset the game 
function resetGame() {
    clearInterval(timer);
    score = 0;
    currentQuestion = -1;
    timeLeft = 0;
    timer = null;

    document.getElementById("time").innerHTML = timeLeft;

    var quizContent = `
<h1>
Coding Quiz
</h1>
<h3> Click Start to play again! <h3>

<button onclick="start()">Start!</button>`;

    document.getElementById("opening").innerHTML = quizContent;
}

//deduct 10 seconds from the timer if user chooses an incorrect answer
function incorrect() {
    timeLeft -= 10;
    next();
}

//increases the score by 20 points if the user chooses the correct answer
function correct() {
    score += 20;
    next();
}

//loops through the questions 
function next() {
    currentQuestion++;

    if (currentQuestion > questions.length - 1) {
        endGame();
        return;
    }

    var quizContent = "<h2>" + questions[currentQuestion].title + "</h2>"
// we are making a loop for the questions to be asked
// the choice arrays become buttons
// on the button click the Choice we click becomes the ANS
// if the ANS is correct we run the correct function
//if the ANS is incorrect we run the incorrect function
    for (var buttonLoop = 0; buttonLoop < questions[currentQuestion].choices.length; buttonLoop++) {
        var buttonCode = "<button onclick= [ANS]>[CHOICE]</button>";
        buttonCode = buttonCode.replace("[CHOICE]", questions[currentQuestion].choices[buttonLoop]);
        if (questions[currentQuestion].choices[buttonLoop] == questions[currentQuestion].answer) {
            buttonCode = buttonCode.replace("[ANS]", "correct()");
        } else {
            buttonCode = buttonCode.replace("[ANS]", "incorrect()");
        }
        
        quizContent += buttonCode
    }


    document.getElementById("opening").innerHTML = quizContent;
}