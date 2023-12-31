"use strict";

class testRunner {

	constructor (contentArea) {
		this.contentArea = contentArea;

		this.currentQuestionIndex = 0;
		this.testConfig = null;
		this.questionDiv = null;
		this.answerForm = null;
		this.buttonDiv = null;
		this.overlayDiv = null;
		this.tryAgainButton = null;
		this.continueButton = null;
		this.testConfig = null; // set from framework
	}
	
	cleanup() {
	}
	
	/******
	 Display the question on the screen with appropriate buttons
	*******/

	displayCurrentQuestion() {
		console.log("displayCurrentQuestion");

		const currentQuestion = this.testConfig.questions[this.currentQuestionIndex];
		
		var outerDiv = document.createElement('div');
		outerDiv.height = '100%';
		outerDiv.width = '100%';

		// display question
		this.questionDiv = document.createElement('div');
		this.questionDiv.classList.add("question-container");
		outerDiv.appendChild(this.questionDiv);
	
		const question = document.createElement("p");
		question.classList.add("question");
		question.innerText = currentQuestion.question;
		this.questionDiv.appendChild(question);
	
		// create form for answers
		this.answerForm = document.createElement("div");
		this.answerForm.classList.add('answer-container');
		this.questionDiv.appendChild(this.answerForm);
	
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
			this.answerForm.appendChild(control);
			this.answerForm.appendChild(label);
		
			// break
			this.answerForm.appendChild( document.createElement('br') );
		
			// associate answer with view
			answer.controlView = control;
		}
	
		this.buttonDiv = document.createElement('div');
	
		var submitButton = this.addButton("Submit");
		submitButton.onclick = submitClicked;
	
		this.tryAgainButton = this.addButton("Try again");
		this.tryAgainButton.onclick = tryAgainClicked;
		this.tryAgainButton.style.display = 'none';

		this.continueButton = this.addButton("Continue");
		this.continueButton.onclick = continueClicked;
		this.continueButton.style.display = 'none';
	
		outerDiv.appendChild(this.buttonDiv);
	
		this.contentArea.appendChild(outerDiv);
	}

	continue() {
		this.currentQuestionIndex++;
	
		if (this.currentQuestionIndex < this.testConfig.questions.length) {
			this.contentArea.innerHTML = '';
			this.displayCurrentQuestion();
		} else {
			nextStage();
		}
	}

	tryAgain() {
		console.log('tryAgainClicked');
		this.overlayDiv.remove();
	
		this.answerForm.style.opacity = '100%';
	
		this.tryAgainButton.style.animationName = 'fadeOut';
		this.tryAgainButton.style.animationDuration = '1s';
		this.tryAgainButton.style.opacity = '0%';

		// uncheck all items
		var answers = this.testConfig.questions[this.currentQuestionIndex].answers;
		for (var answerIndex in answers) {
			answers[answerIndex].controlView.checked = false;
		}
	}

	addButton(label) {	
		var button = document.createElement('button');
		button.classList.add('test-button');
		button.innerText = label;
		this.buttonDiv.appendChild(button);
		button.testController = this;
		return button;
	}

	displayCheckOrX(check) {
		var imageFile;
		if (check) {
			imageFile = './assets/checkMark.png';
		} else {
			imageFile = './assets/X.png';
		}
	
		var image = new Image();
		image.src = imageFile;
		image.style.animationName = 'fadeIn';
		image.style.animationDuration = '1s';		
		image.style.opacity = '100%';

		image.classList.add('checkOrX');
	
		this.overlayDiv = document.createElement('div');
		this.overlayDiv.classList.add('overlayPanel');
	
		this.overlayDiv.appendChild(image);
	
		this.questionDiv.appendChild(this.overlayDiv);
	
		image.style.animationName = 'fadeIn';
		image.style.animationDuration = '1s';		
		image.style.opacity = '100%';
	}

	evaluateResponse() {
		console.log("evaluateResponse");
		console.log(this);
		console.log(this.testConfig);
		console.log(this.testConfig.questions);
		console.log('index = ' + this.currentQuestionIndex);
		console.log(this.testConfig.questions[this.currentQuestionIndex].answers);
	
		var correct = true;
		
		var answers = this.testConfig.questions[this.currentQuestionIndex].answers;
		for (var answerIndex in answers) {
			var currentAnswer = answers[answerIndex];
			correct = correct && (currentAnswer.correctChoice === currentAnswer.controlView.checked);
		};
	
		this.continueButton.style.display = 'none';
		this.tryAgainButton.style.display = 'none';
	
		this.answerForm.style.opacity = '40%';
	
		if (correct) {
			console.log("correct");
			this.continueButton.style.display = 'inline';
			this.continueButton.style.animationName = 'fadeIn';
			this.continueButton.style.animationDuration = '1s';		
			this.continueButton.style.opacity = '100%';
		} else {
			console.log("wrong");
			this.tryAgainButton.style.display = 'inline';
			this.tryAgainButton.style.animationName = 'fadeIn';
			this.tryAgainButton.style.animationDuration = '1s';	
			this.tryAgainButton.style.opacity = '100%';
		}
	
		this.displayCheckOrX(correct);
	}
			
	showResult() {
		console.log("showResult");
	}
}

function submitClicked() {
	this.testController.evaluateResponse();
}

function tryAgainClicked() {
	this.testController.tryAgain();
}

function continueClicked() {
	this.testController.continue();
}
