"use strict";


function onendedHandler(event) {
	console.log("onendedHandler\n");
	nextStage();
}

function videoLoadedHandler(event) {
	console.log("videoLoadedHandler\n");
	this.videoController.playVideo();
}

function playClicked() {
	console.log("play");
	this.videoController.playVideo();
}

class videoController {

	constructor(courseConfig, stageNumber, contentArea) {
		console.log("initialize video player");
		console.log('content area: ' + contentArea);
		
		this.contentArea = contentArea;		
		this.courseConfig = courseConfig;
		this.stageNumber = stageNumber;
				
		this.currentVideoIndex = 0;
	
		var outerDiv = document.createElement('div');
		outerDiv.classList.add('video-player-container');
	
		var videoDiv = document.createElement('div');
	
		// add a video frame to the content area
		this.videoFrame = document.createElement('video');
		this.videoFrame.autoPlay = 'false';
		this.videoFrame.muted = 'false';
		this.videoFrame.classList.add('video-player-frame');
		this.videoFrame.videoController = this;

		// add video ended handler to the video frame
		this.videoFrame.addEventListener("ended", onendedHandler);
		this.videoFrame.addEventListener("loadeddata", videoLoadedHandler);
	
		videoDiv.appendChild(this.videoFrame);
	
		// add control buttons
		var buttonDiv = document.createElement('div');
		buttonDiv.classList.add('button-container');
	
		var button = document.createElement('button');
		button.type = 'button';
		button.innerText = '\u23f5'; // play button symbol
		button.addEventListener('click', playClicked);
		button.classList.add('button-video');
		button.videoController = this;
		this.playButton = button;
	
		buttonDiv.appendChild(button);
		
		outerDiv.appendChild(videoDiv);
		outerDiv.appendChild(buttonDiv);

		this.contentArea.appendChild(outerDiv);
	}
	
	cleanup() {
	}

	playVideoFromStage(stageNumber) {
		console.log("\n\n***********play video\n\n");
	
		this.stageNumber = stageNumber;
		
		console.log(this.courseConfig);
		console.log(this.stageNumber);
	
		// get the video file name
		var videoFileName = this.courseConfig.stages[ stageNumber ].fileName;
		this.videoFrame.setAttribute("src", "./" + videoFileName);
	}
	
	// event handling	
	playVideo() {
		this.videoFrame.play();
	}
}
