var correctAnswer = 0;
var inCorrectAnswer = 0;
var unAnswered = 0;
var userGuess = "";
var counter = 0;

var myQuestions = [{
        question: "Whos said, 'When you play the game of thrones, you wine or you die?'",
        answers: {
            a: 'Cercie',
            b: 'Tyrion',
            c: 'LittleFinger'
        },
        correctAnswer: 'Cercie'
    },
    {
        question: "How many kindoms are in Westeros?",
        answers: {
            a: '3',
            b: '7',
            c: '10'
        },
        correctAnswer: '7'
    },
    {
        question: "Who is known as 'The-King-Beyond-the-Wall?",
        answers: {
            a: 'Mance Rayder',
            b: 'Tormund Giantsbane',
            c: 'The Night King'
        },
        correctAnswer: 'Mance Rayder'
    },
];

// var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];

var messages = {
    correct: "Yes, that's right!",
    incorrect: "No, that's not it.  --Once you've accepted your flaws, no one can use them against you",
    endTime: "Out of time!",
    finished: "Alright! Let's see how well you did."
}
// Call a new game once results are shown
// function newGame(){
// 	$('#').empty();
// 	$('#').empty();
// 	$('#').empty();
// 	$('#unanswered').empty();
// 	currentQuestion = 0;
// 	correctAnswer = 0;
// 	incorrectAnswer = 0;
// 	unanswered = 0;
// 	newQuestion();
// }

function displayQuestion() {
    $("#quest").empty();
    $("#scoreboard").html("Correct Guesses: " + correctAnswer + "<br>" + "Incorrect Gesses: " + inCorrectAnswer + "<br>" + "No Answered: " + unAnswered);

    $("#quest").append("<h1>" + myQuestions[counter].question + "<h1>");
    $("#quest").append(`<div class="answ">${myQuestions[counter].answers.a}</div>`);
    $("#quest").append(`<div class="answ">${myQuestions[counter].answers.b}</div>`);
    $("#quest").append(`<div class="answ">${myQuestions[counter].answers.c}</div>`);

    countdown();
    //clicking an answer will pause the time and setup answerPage
    $('.thisChoice').on('click', function () {
        userSelect = $(this).data('index');
        clearInterval(time);
        answerPage();
    });
}

function displayResults() {
    $("#quest").empty();
    $("#timer").empty();
    $("#scoreboard").html("Correct Guesses: " + correctAnswer + "<br>" + "Incorrect Gesses: " + inCorrectAnswer + "<br>" + "No Answered: " + unAnswered);


}

function countdown() {
    seconds = 15;
    $('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
    answered = true;
    //sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown() {
    seconds--;
    $('#timer').html('<h3>Time Remaining: ' + seconds + '</h3>');
    if (seconds < 1) {
        clearInterval(time);
        answered = false;
        answerPage();
    }
}

$(document).ready(function () {
    // console.log("document loaded");

    $("#start").click(function () {
        // console.log("click-worked");
        $("#start").hide();
        // Write question and answers to div, questions can be written as strings, answers will be kept in an array

        displayQuestion();



    });


    $(document).on("click", ".answ", function (event) {
        // console.log($(this).text());
        if ($(this).text() === myQuestions[counter].correctAnswer) {
            correctAnswer++;
            counter++;
            if (counter < myQuestions.length) {
                displayQuestion();
            } else {
                displayResults()
            }
        }
        //throw in GIF
        else {
            inCorrectAnswer++;
            counter++;
            if (counter < myQuestions.length) {
                displayQuestion();
            } else {
                displayResults()
            }
        }
    });
    if (time <= 0) {
        unAnswered++;

        clearInterval(time);

        displayQuestion()
    }

    // displayQuestion();
    // });
});


//LAST QUESTION