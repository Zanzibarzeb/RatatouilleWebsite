"use strict";


function onendedHandler(event) {
	console.log("onendedHandler\n");
	this.videoController.goToNext();
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

	constructor(courseConfig, stageNumber) {
		console.log("initialize video player");
		this.contentArea = document.getElementById("contentArea");
		this.courseConfig = courseConfig;
		this.stageNumber = stageNumber;
		
		this.contentArea.innerHTML = '';
		
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

	playVideoFromStage(stageNumber, videoNumber) {
		console.log("\n\n***********play video\n\n");
	
		this.currentVideoIndex = videoNumber;
		this.stageNumber = stageNumber;
		
		console.log(this.courseConfig);
		console.log(this.stageNumber);
		console.log(this.currentVideoIndex);
	
		// get the video file name
		var videoFileName = this.courseConfig.stages[ stageNumber ].videoList[ videoNumber ].fileName;
		this.videoFrame.setAttribute("src", "./" + videoFileName);
	}
	
	// event handling
	goToNext() {
		this.currentVideoIndex++;	

		console.log('goToNext');
		console.log(this.courseConfig);
		console.log(this.stageNumber);
		if (this.currentVideoIndex >= this.courseConfig.stages[ this.stageNumber ].videoList.length) {
			console.log('done videos....');
			nextStage();
		} else {
			this.videoFrame.pause();
			this.playVideoFromStage(this.stageNumber, this.currentVideoIndex);
			setSubStage(this.currentVideoIndex);
		}
	}
	
	playVideo() {
		this.videoFrame.play();
	}
}
