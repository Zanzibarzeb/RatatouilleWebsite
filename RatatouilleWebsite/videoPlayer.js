"use strict";

{
	var currentVideoIndex = 0;
	var videoList;
	var videoFrame = null;
	var contentArea = document.getElementById("contentArea");
	var playButton;
}

function onendedHandler(event) {
	console.log("onendedHandler\n");

	currentVideoIndex++;	

	console.log(courseConfig);
	console.log(stageNumber);
	if (currentVideoIndex >= courseConfig.stages[ stageNumber ].videoList.length) {
		console.log('done videos....');
		nextStage();
	} else {
		videoFrame.pause();
		playVideo(stageNumber, currentVideoIndex);
		setSubStage(currentVideoIndex);
	}
}

function videoLoadedHandler(event) {
	console.log("videoLoadedHandler\n");
	if (currentVideoIndex > 0) {
		play();
	}
}

function playVideoFromStage(stageNumber, videoNumber) {
	console.log("\n\n***********play video\n\n");
	
	currentVideoIndex = videoNumber;
	
	// get the video file name
	var videoFileName = courseConfig.stages[ stageNumber ].videoList[ videoNumber].fileName;
	videoFrame.setAttribute("src", "./" + videoFileName);
}

function playClicked() {
	console.log("play");
	videoFrame.play();
}

function initializeVideoPlayer(courseConfig, stageNumber) {
	console.log("initialize video player");
	
	videoList = courseConfig.stages[ stageNumber ].videoList;

	var outerDiv = document.createElement('div');
	outerDiv.classList.add('video-player-container');
	
	var videoDiv = document.createElement('div');
	
	// add a video frame to the content area
	videoFrame = document.createElement('video');
 	videoFrame.autoPlay = 'false';
 	videoFrame.muted = 'false';
	videoFrame.classList.add('video-player-frame');

 	// add video ended handler to the video frame
	videoFrame.addEventListener("ended", onendedHandler);
	videoFrame.addEventListener("loadeddata", videoLoadedHandler);
	
 	videoDiv.appendChild(videoFrame);
	
	// add control buttons
	var buttonDiv = document.createElement('div');
	buttonDiv.classList.add('button-container');
	
	var button = document.createElement('button');
	button.type = 'button';
	button.innerText = 'Play';
	button.addEventListener('click', playClicked);
	button.classList.add('button-video');
	playButton = button;
	
	buttonDiv.appendChild(button);
		
	outerDiv.appendChild(videoDiv);
	outerDiv.appendChild(buttonDiv);

	contentArea.appendChild(outerDiv);
};

function playVideo() {
	videoFrame.play();
};