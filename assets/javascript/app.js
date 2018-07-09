var currentQuestion;
var correctAnswer;
var incorrectAnswer;
var unanswered;
var seconds;
var time;
var answered;
var userSelect;


var triviaQuestions = [{
		question: "How many kindoms are in Westeros?",
		answerList: ["3", "7", "10"],
		answer: 1
	}, {
		question: "Whos said, 'When you play the game of thrones, you win or you die?'",
		answerList: ["Cercie", "Tyrion", "Little Finger"],
		answer: 0
	}, {
		question: "Who is known as 'The-King-Beyond-the-Wall?",
		answerList: ["Mance Rayder", "Tormund Giantsbane", "The Night King"],
		answer: 0
	}, {
		question: "Who is known as the Young Wolf?",
		answerList: ["Bran Stark", "Rob Stark", "John Snow"],
		answer: 1
	}, {
		question: "Fill in the blank: The night is dark and full of ________.",
		answerList:["Blood", "Evil", "Terrors"],
		answer: 2
	}, {
		question: "Where is the Iron Bank?",
		answerList: ["Braavos", "Dorne", "Highgarden"],
		answer: 0
	}, {
		question: "Who gives Daenerys Targaryen her dragon eggs?",
		answerList: ["Illyrio Mopatis", "Viserys Targeryen", "Khal Drogo"],
		answer: 0
	}, {
		question: "What is the name of Arya Stark's sword?",
		answerList: ["Icicle", "Needle", "Lioin's Bane"],
		answer: 1
	}, {
		question: "What does Khal Drogo call ships?",
		answerList: ["Evil Magic", "Moving Cities", "Wooden Horses"],
		answer: 2
	}, {
		question: "Who is Joffrey Baratheon's father?",
		answerList: ["Tyrion Lannister", "Robert Baratheon", " Jamie Lannister"],
		answer: 2
	},
];

var gifArray = ['question1', 'question2', 'question3'];
var messages = {
	correct: "You are correct, one step closer to the throne you are!",
	incorrect: "Woops, lets hope you win the next battle!",
	endTime: "Time has passed....",
	finished: "Do you deserve to sit on the throne?"
}

var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10'];


$('#startBtn').on('click', function () {
	$(this).hide();
	newGame();
});

$('#startOverBtn').on('click', function () {
	$(this).hide();
	newGame();
});

function newGame() {
	$('#finalMessage').empty();
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}

function newQuestion() {
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;

	//sets up new questions & answerList
	$('#currentQuestion').html('Question #' + (currentQuestion + 1) + '/' + triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for (var i = 0; i < 4; i++) {
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({
			'data-index': i
		});
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click', function () {
		userSelect = $(this).data('index');
		clearInterval(time);
		answerPage();
	});
}

function countdown() {
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
	time = setInterval(showCountdown, 1000);
}

function showCountdown() {
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if (seconds < 1) {
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage() {
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#gif').html('<img src = "assets/images/gifs/' + gifArray[currentQuestion] + '.gif" width = "400px">');
	//checks to see correct, incorrect, or unanswered
	if ((userSelect == rightAnswerIndex) && (answered == true)) {
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if ((userSelect != rightAnswerIndex) && (answered == true)) {
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else {
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}

	if (currentQuestion == (triviaQuestions.length - 1)) {
		setTimeout(scoreboard, 5000)
	} else {
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}
}

function scoreboard() {
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}