"use strict";

{
	var currentQuestionIndex = 0;
	var testConfig;
	var contentArea = document.getElementById("contentArea");
	var questionDiv = null;
}

function displayCurrentQuestion() {
	console.log("displayCurrentQuestion");

	const currentQuestion = testConfig.questions[currentQuestionIndex];
	
	// clear previous contents 
	contentArea.innerHTML = '';
	
	var outerDiv = document.createElement('div');
	outerDiv.style.backgroundColor = 'lightblue';
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
	const answerForm = document.createElement("form");
	answerForm.classList.add('answer-container');
	questionDiv.appendChild(answerForm);
	
	// display answers
	for (var answerIndex in currentQuestion.answers) {
		var answer = currentQuestion.answers[answerIndex];
		
		// create elements for the answer
		var control = document.createElement('input');
		control.type = currentQuestion.controlType;
		control.checked = answer.correctChoice;
		
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
	
	var buttonDiv = document.createElement('div');
	
	var submitButton = document.createElement('button');
	submitButton.innerText = "Submit";
	submitButton.onclick = evaluateResponse;
	buttonDiv.appendChild(submitButton);
	
	outerDiv.appendChild(buttonDiv);
	
	contentArea.appendChild(outerDiv);
}

function displayCheckOrX(check) {
	var imageFile;
	if (check) {
		imageFile = './assets/checkMark.png';
	} else {
		imageFile = './assets/X.png';
	}
	
// 	var image = document.createElement('div');
	var image = new Image();
	
// 	image.onload = (event) => {
// 		console.log('image loaded ...');
// 	}
	image.src = imageFile;
 	image.classList.add('checkOrX');
	
	var div = document.createElement('div');
	div.classList.add('overlayPanel');
	div.appendChild(image);
	
// 	contentArea.innerHTML = '';
	questionDiv.appendChild(div);
}

function evaluateResponse() {
	console.log("evaluateResponse");
	
	var correct = true;
	for (var answerIndex in testConfig.questions[currentQuestionIndex].answers) {
		var currentAnswer = testConfig.questions[currentQuestionIndex].answers[answerIndex];
				
		correct = correct && (currentAnswer.correctChoice === currentAnswer.controlView.checked);
	}
	
	if (correct) {
		console.log("correct");
	} else {
		console.log("wrong");
	}
	
	displayCheckOrX(correct);
}

async function readTestQuestions(fileName, callback) {
	let url = "./" + fileName;
	
	let response = await fetch(url);

	if (response.ok) { // if HTTP-status is 200-299
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