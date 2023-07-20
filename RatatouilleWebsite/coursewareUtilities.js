/*!
 * Copyright (c) 2023, Brent Marshall
 * All rights reserved.
 *
 * This file contains utility functions for courseware.
 *
*/

// getting URL parameters
//const myUrl = new URL(window.location.toLocaleString());
//const courseFileName = urlParams.get('courseFileName');
// const searchString = window.location.search;
// console.log(queryString);

urlParams = {};
courseData = {};
var courseFileName;


function onendedHandler(event) {
      console.log("onendedHandler\n")
   //   window.location = "play.html"
// 	videoFrame = document.getElementById("mainVideoFrame");      
// 	videoFrame.	stop();
      
};

//******** Read the course structure from the server ***********


// called when the page has finished loading
async function onloadHandler() {

	// build the url to retrieve the  course file
	//var baseUrl = window.location.href.split("?")[0]; // remove parameters
	//var url = new URL(window.location.href);
	var urlString = window.location.href;
	var baseUrl = urlString.slice(0,  urlString.lastIndexOf('/') );
	
	var httpUrl = baseUrl + "/" + courseFileName;
	console.log("getting file");
	console.log("httpUrl = " + httpUrl);

	let response = await fetch(httpUrl);
	
	var json;

	if (response.ok) { // if HTTP-status is 200-299
		json = await response.json();
	} else {
		alert("HTTP Error: " + response.status);
	}

	courseData = json;
	
	console.log("File content:");
	console.log(courseData);
}

function initCourse() {
	// get the course file name from the URL
	searchString = window.location.search;
	console.log(searchString);
	urlParams = new URLSearchParams(searchString);
	console.log(urlParams);
	courseFileName = urlParams.get("courseFileName")

	console.log("Getting file: ");
	console.log(courseFileName);
	
	window.addEventListener("load", onloadHandler)
	
	// async call to retrieve file, parse when loaded
	
	//courseData = JSON.parse();
}

function triggerDownload(fileName) {
	console.log("triggerDownload");
	window.open(fileName);
}

function initDownload() {
	console.log("initDownload");
	downloadButton = document.getElementById("DownloadButton");      
	downloadButton.addEventListener("click", triggerDownload);
}

    
function init() {
	console.log("init");
	videoFrame = document.getElementById("mainVideoFrame");      
//	videoFrame.addEventListener("ended",onendedHandler);
	
	initCourse();
	initDownload();
};

console.log("External module running\n");

//init();

