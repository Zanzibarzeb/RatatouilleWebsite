"use strict";
		
console.log("running main course tree view script");

const viewAttributeName = 'sidebarItemView';

class sideBarTree {

	constructor(courseConfig, contentArea) {
		console.log("sideBarTree constructor");
		
		this.courseConfig = courseConfig;
		this.stageNumber = 0;
		this.contentArea = contentArea;
		this.currentItem = null;
	
		var tocUL = document.createElement('ul');
		tocUL.style.padding = 0;
		tocUL.classList.add('mainTreeUL');
		tocUL.classList.add('fill-container');
		this.stageNumber = 0;
		
		this.addItemsToParent(tocUL, 0);
		
		this.contentArea.appendChild(tocUL);
	}

	setCurrentItem(stageNumber) {
		// find the item in the model
		console.log("setCurrentItem");
		console.log('stageNumber: ' + stageNumber);
		var stage = courseConfig.stages[ stageNumber ];
		var item = stage;
	
		// remove highlight from old item
		if (this.currentItem != null) {
 			this.currentItem.sidebarView.classList.remove('currentItem');
		}
	
		// make new view current item
		this.currentItem = item;
		this.currentItem.sidebarView.classList.add('currentItem');
	}

	addItemsToParent(parentUL, currentLevel) {
		console.log('addItemsToParent');
		
		// create list items for each item at this level
		var stage = this.courseConfig.stages[this.stageNumber];
		var level = currentLevel;
		
		while ((stage != null) & (level >= currentLevel)) {
							
			console.log('Creating tree item for stage: ' + this.stageNumber);

			// add an appropriate item for this stage
			var tocItem = document.createElement('li');
			stage.sidebarView = tocItem;  // model - view association
			
			if (stage.level == currentLevel) {
				// add item to current list
				
				tocItem.classList.add('treeItem');
				tocItem.innerText = stage.title;
				tocItem.addEventListener('click', treeItemClicked);
				tocItem.stageNumber = this.stageNumber;
			
			} else if (stage.level > currentLevel) {
				// new level in the hierarchy
				console.log('****** adding new level');
				// make current item a parent
				tocItem.onClick = parentClickHandler;  // replace handler
			
				// add span and sublist
				var span = document.createElement('span');
				var ul = document.createElement('ul');
// 				ul.classList.add('nested');
				ul.classList.add('fill-container');
				ul.appendChild(span);
				tocItem.appendChild(ul);
				
				this.addItemsToParent(ul, stage.level);
			};
			
			parentUL.appendChild(tocItem);
			
			this.stageNumber++;
			stage = this.courseConfig.stages[this.stageNumber];
			if (stage != null) {
				level = stage.level;
			}	
		} ;
		
	}
}

function parentClickHandler(event) {
	console.log("click event: " + event);
	this.parentElement.querySelector(".nested").classList.toggle("active");
	this.classList.toggle("caret-down");
}

function treeItemClicked(event) {
	event.stopPropagation();
	console.log('Tree item clicked.  stage: ' + this.stageNumber);

	playStage(this.stageNumber);
};

// 
// function initTOC(courseConfig) {
// 	console.log("initTOC");
// 	
// 	var tocList = document.getElementById('tableOfContents');
// 	tocList.style.padding = 0;
// 			
// 	// create list item for each stage of course
// 	for (var stageNumber in courseConfig.stages) {
// 		var tocItem = document.createElement('li');
// 		var stage = courseConfig.stages[ stageNumber ];
// 		tocItem.innerText = stage.title;
// 		tocItem.style.cursor = 'pointer';
// 		tocItem.style.listStyleType = 'none';
// 		tocItem.classList.add('treeItem');
// 		tocItem.addEventListener('click', treeItemClicked);
// 		tocItem.stageNumber = stageNumber;
// 		tocItem.videoNumber = videoNumber;
// 		
// 		// maintain association between model and view
// 		stage.sidebarView = tocItem;
// 					
// 		if (stage.stageType == 'video') {
// 			console.log("video stage");
// 			tocItem.classList.add('caret');
// 			tocItem.addEventListener("click", parentClickHandler);
// 			
// 			// make video stage a parent in the hierarchy
// 			
// 			// add span and sublist
// 			var span = document.createElement('span');
// 			var ul = document.createElement('ul');
// 			ul.classList.add('nested');
// 			ul.appendChild(span);
// 			
// 			tocItem.appendChild(ul);
// 			
// 			// add elements for each video
// 			for (var videoNumber in stage.videoList) {					
// 				var videoItem = document.createElement('li');
// 				var videoModel = stage.videoList[ videoNumber ];
// 				videoItem.classList.add('treeItem');
// 				videoItem.innerText = videoModel.title;
// 				ul.appendChild(videoItem);
// 				videoItem.stageNumber = stageNumber;
// 				videoItem.videoNumber = videoNumber;
// 				
// 				videoItem.addEventListener('click', treeItemClicked);
// 				
// 				// maintain association between model and view
// 				videoModel.sidebarView = videoItem;
// 			}
// 		}
// 
// 		tocList.appendChild(tocItem);
// 	}
// }
