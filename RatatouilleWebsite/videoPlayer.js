"use strict";

{
	var currentVideoIndex = 0;
	var videoList;
	var videoFrame = null;
	var contentArea = document.getElementById("contentArea");
}

function onendedHandler(event) {
	console.log("onendedHandler\n");

	currentVideoIndex++;

	if (currentVideoIndex >= videoList.length) {
		console.log('done videos....');
	} else {
		videoFrame.pause();
		playVideo(stageNumber, currentVideoIndex);
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

function play() {
	console.log("play");
	videoFrame.play();
}

function initializeVideoPlayer(courseConfig, stageNumber) {
	console.log("initialize video player");
	
	var outerDiv = document.createElement('div');
	outerDiv.backgroundColor = 'blue';
	outerDiv.classList.add('video-player-container');
	
	// add a video frame to the content area
	videoFrame = document.createElement('video');
	videoFrame.autoPlay = 'false';
	videoFrame.muted = 'false';
	videoFrame.classList.add('video-player-frame');
	outerDiv.appendChild(videoFrame);

	// add video ended handler to the video frame
	videoFrame.addEventListener("ended", onendedHandler);
	videoFrame.addEventListener("loadeddata", videoLoadedHandler);
	
	// add control buttons
	var div = document.createElement('div');
	div.classList.add('button-container');
	var button = document.createElement('button');
	button.innerText = 'Play';
	button.addEventListener('click', play);
	button.classList.add('button-video');
	div.appendChild(button);
	
	outerDiv.appendChild(div);
	
	contentArea.appendChild(outerDiv);
};

function playVideo() {
	videoFrame.play();
};