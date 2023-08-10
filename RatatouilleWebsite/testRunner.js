"use strict";

{
	var currentQuestionIndex = 0;
	var stageNumber;
	var courseConfig;
	var testConfig;
	var contentArea= document.getElementById("contentArea");
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
	const question = document.createElement("p");
	question.classList.add("question");
	question.innerText = currentQuestion.question;
	outerDiv.appendChild(question);
	
	// create form for answers
	const answerForm = document.createElement("form");
	answerForm.classList.add("question-container");
	outerDiv.appendChild(answerForm);
	
	// display answers
	for (var answerIndex in currentQuestion.answers) {
		var answer = currentQuestion.answers[answerIndex];
		
		// create elements for the answer
		const control = document.createElement('input');
		control.type = currentQuestion.controlType;
		
		const label = document.createElement('label');
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
	}
	
	var buttonDiv = document.createElement('div');
	
	var submitButton = document.createElement('button');
	submitButton.innerText = "Submit";
	buttonDiv.appendChild(submitButton);
	
	outerDiv.appendChild(buttonDiv);
	
	contentArea.appendChild(outerDiv);
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