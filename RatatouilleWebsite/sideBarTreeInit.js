"use strict";
		
console.log("running main course tree view script");

var currentItem = null;

const viewAttributeName = 'sidebarItemView';

function parentClickHandler(event) {
	console.log("click event: " + event);
	this.parentElement.querySelector(".nested").classList.toggle("active");
	this.classList.toggle("caret-down");
}

function setCurrentItem(stageNumber, subNumber=null) {
	// find the item in the model
	var stage = courseConfig.stages[ stageNumber ];
	var item = stage;
	if (subNumber != null && stage.stageType == 'video') {
		item = stage.videoList[subNumber];
		
		// open up the parent menu
		item.sidebarView.parentElement.classList.add("active");
		stage.sidebarView.classList.add("caret-down");
	}
	
	// remove highlight from old item
	if (currentItem != null) {
		currentItem.sidebarView.classList.remove('currentItem');
	}
	
	// make new view current item
	currentItem = item;		
	currentItem.sidebarView.classList.add('currentItem');
}

function initTOC(courseConfig) {
	console.log("initTOC");
	
	var tocList = document.getElementById('tableOfContents');
	tocList.style.padding = 0;
			
	// create list item for each stage of course
	for (var stageNumber in courseConfig.stages) {
		var tocItem = document.createElement('li');
		var stage = courseConfig.stages[ stageNumber ];
		tocItem.innerText = stage.title;
		tocItem.style.cursor = 'pointer';
		tocItem.style.listStyleType = 'none';
		
		// maintain association between model and view
		stage.sidebarView = tocItem;
					
		if (stage.stageType == 'video') {
			console.log("video stage");
			tocItem.classList.add('caret');
			tocItem.addEventListener("click", parentClickHandler);
			
			// make video stage a parent in the hierarchy
			
			// add span and sublist
			var span = document.createElement('span');
			var ul = document.createElement('ul');
			ul.classList.add('nested');
			ul.appendChild(span);
			
			tocItem.appendChild(ul);
			
			// add elements for each video
			for (var videoNumber in stage.videoList) {					
				var videoItem = document.createElement('li');
				var videoModel = stage.videoList[ videoNumber ];
				videoItem.innerText = videoModel.title;
				ul.appendChild(videoItem);
				
				// maintain association between model and view
				videoModel.sidebarView = videoItem;
			}
		}

		tocList.appendChild(tocItem);
	}
}
