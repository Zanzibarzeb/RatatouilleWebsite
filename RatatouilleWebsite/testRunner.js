"use strict";

{
	var currentQuestionIndex = 0;
	var testConfig;
	var contentArea = document.getElementById("contentArea");
	var questionDiv = null;
	var answerForm = null;
	var buttonDiv = null;
	var overlayDiv = null;
	var tryAgainButton = null;
	var continueButton = null;
}

/******
 Display the question on the screen with appropriate buttons
*******/

function displayCurrentQuestion() {
	console.log("displayCurrentQuestion");

	const currentQuestion = testConfig.questions[currentQuestionIndex];
	
	// clear previous contents 
	contentArea.innerHTML = '';
	
	var outerDiv = document.createElement('div');
	outerDiv.height = '100%';
	outerDiv.width = '100%';

	// display question
	questionDiv = document.createElement('div');
	questionDiv.classList.add("question-container");
	outerDiv.appendChild(questionDiv);
	
	const question = document.createElement("p");
	question.classList.add("question");
	question.innerText = currentQuestion.question;
	questionDiv.appendChild(question);
	
	// create form for answers
	answerForm = document.createElement("div");
	answerForm.classList.add('answer-container');
	questionDiv.appendChild(answerForm);
	
	// display answers
	for (var answerIndex in currentQuestion.answers) {
		var answer = currentQuestion.answers[answerIndex];
		
		// create elements for the answer
		var control = document.createElement('input');
		control.type = currentQuestion.controlType;
		control.name = "choice"; // correlates radio buttons
		
		var label = document.createElement('label');
		label.classList.add("answer");
		label.innerText = answer.text;
		
		// correlate control to text
		control.id = "answer" + answerIndex;
		label.for = control.id;
		
		// insert
		answerForm.appendChild(control);
		answerForm.appendChild(label);
		
		// break
		answerForm.appendChild( document.createElement('br') );
		
		// associate answer with view
		answer.controlView = control;
	}
	
	buttonDiv = document.createElement('div');
	
	var submitButton = addButton("Submit");
	submitButton.onclick = evaluateResponse;
	
	tryAgainButton = addButton("Try again");
	tryAgainButton.onclick = tryAgainClicked;
	tryAgainButton.style.display = 'none';

	continueButton = addButton("Continue");
	continueButton.onclick = continueClicked;
	continueButton.style.display = 'none';
	
	outerDiv.appendChild(buttonDiv);
	
	contentArea.appendChild(outerDiv);
}

function continueClicked() {
	currentQuestionIndex++;
	
	if (currentQuestionIndex < testConfig.questions.length) {
		displayCurrentQuestion();
	} else {
		nextStage();
	}
}

function tryAgainClicked() {
	console.log('tryAgainClicked');
	overlayDiv.remove();
	
	answerForm.style.opacity = '100%';
	
	tryAgainButton.style.animationName = 'fadeOut';
	tryAgainButton.style.animationDuration = '1s';
	tryAgainButton.style.opacity = '0%';

	// uncheck all items
	var answers = testConfig.questions[currentQuestionIndex].answers;
	for (var answerIndex in answers) {
		answers[answerIndex].controlView.checked = false;
	}
}

function addButton(label) {	
	var button = document.createElement('button');
	button.classList.add('test-button');
	button.innerText = label;
	buttonDiv.appendChild(button);
	return button;
}

function displayCheckOrX(check) {
	var imageFile;
	if (check) {
		imageFile = './assets/checkMark.png';
	} else {
		imageFile = './assets/X.png';
	}
	
	var image = new Image();
	image.src = imageFile;
 	image.classList.add('checkOrX');
	
	overlayDiv = document.createElement('div');
	overlayDiv.classList.add('overlayPanel');
	
	overlayDiv.appendChild(image);
	
	questionDiv.appendChild(overlayDiv);
}

function evaluateResponse() {
	console.log("evaluateResponse");
	
	var correct = true;
	for (var answerIndex in testConfig.questions[currentQuestionIndex].answers) {
		var currentAnswer = testConfig.questions[currentQuestionIndex].answers[answerIndex];
		correct = correct && (currentAnswer.correctChoice === currentAnswer.controlView.checked);
	};
	
	continueButton.style.display = 'none';
	tryAgainButton.style.display = 'none';
	
	answerForm.style.opacity = '40%';
	
	if (correct) {
		console.log("correct");
		continueButton.style.display = 'inline';
		continueButton.style.animationName = 'fadeIn';
		continueButton.style.animationDuration = '1s';		
		continueButton.style.opacity = '100%';
	} else {
		console.log("wrong");
		tryAgainButton.style.display = 'inline';
		tryAgainButton.style.animationName = 'fadeIn';
		tryAgainButton.style.animationDuration = '1s';	
		tryAgainButton.style.opacity = '100%';
	}
	
	displayCheckOrX(correct);
}

async function readTestQuestions(fileName, callback) {
	let url = "./" + fileName;
	
	let response = await fetch(url);

	if (response.ok) {
		testConfig = await response.json();
	} else {
		alert("HTTP Error while retrieving the course configuration.\n" + response.status);
	}
	
	console.log("JSON from test file:\n");
	console.log(testConfig);
	
	callback();
}
			
function showResult() {
	console.log("showResult");
}
			
function initializeTest(courseConfig, stage) {
	console.log("initialize Test");
	readTestQuestions(courseConfig.stages[ stage ].testFile, displayCurrentQuestion);
};