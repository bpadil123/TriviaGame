// var correctAnswer = 0;
// var inCorrectAnswer = 0;
// var unAnswered = 0;
// var counter = 5;


// Need some kind of onload to show the start button here and begin countdown

// $('#startGame').click(function () {
//     setInterval(function () {
//         counter--;
//         if (counter >= 0) {
//             span = document.getElementById("count");
//             span.innerHTML = counter;
//             //Need HTML questions to appear 
//         }
//         if (counter === 0) {
//             alert('sorry, out of time');
//             //    Need to add for the score to be tallied up and to write to HTML

//             clearInterval(counter);
//             correctAnswer = 0;
//             inCorrectAnswer = 0
//             unAnswered = 0
//         }
//     }, 1000);

// });

var quizContainer = document.getElementById('#quiz');
var resultsContainer = document.getElementById('#results');
var submitButton = document.getElementById('#Submit');

// $(document).ready(function(){
//     $("button").click(function(){
//         $("p").slideToggle();
//     });
// });

var myQuestions = [
    {
        question: "When you play the game of thrones, you wine or you die?",
        answers: {
            a: 'Cercie',
            b: 'Tyrion',
            c: 'LittleFinger'
        },
        correctAnswer: 'a'
    },
    {
        question:  "How many kindoms are in Westeros?",
        answers: {
            a: '3',
            b: '7',
            c: '10'
        },
        correctAnswer: 'b'
    }
];

// var startPage = document.getElementById('start');
var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        // we'll need a place to store the output and the answer choices
        var output = [];
        var answers;

        // for each question...
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            // for each available answer...
            for(letter in questions[i].answers){

                // ...add an html radio button
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+letter+'">'
                        + letter + ': '
                        + questions[i].answers[letter]
                    + '</label>'
                );
            }

            // add this question and its answers to the output
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        // finally combine our output list into one string of html and put it on the page
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        // gather answer containers from our quiz
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of user's answers
        var userAnswer = '';
        var numCorrect = 0;
        
        // for each question...
        for(var i=0; i<questions.length; i++){

            // find selected answer
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            // if answer is correct
            if(userAnswer===questions[i].correctAnswer){
                // add to the number of correct answers
                numCorrect++;
                
                // color the answers green
                answerContainers[i].style.color = 'lightgreen';
            }
            // if answer is wrong or blank
            else{
                // color the answers red
                answerContainers[i].style.color = 'red';
            }
        }

        // show number of correct answers out of total
        resultsContainer.innerHTML = numCorrect + ' out of ' + questions.length;
    }

    // show questions right away
    showQuestions(questions, quizContainer);
    
    // on submit, show results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}
