	"use strict";
			
	console.log("running main course tree view script");
	
	function parentClickHandler(event) {
		console.log("click event: " + event);
		this.parentElement.querySelector(".nested").classList.toggle("active");
		this.classList.toggle("caret-down");
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
			
			if (stage.stageType == 'video') {
				console.log("video stage");
				tocItem.classList.add('caret');
				tocItem.addEventListener("click", parentClickHandler);
				
				// make video stages a parent in the hierarchy
				
				
				// add span
				var span = document.createElement('span');
// 				span.classList.add('caret');
				
				// add sublist
				var ul = document.createElement('ul');
				ul.classList.add('nested');
				ul.appendChild(span);
				
				tocItem.appendChild(ul);
				
				// add elements for each video
				for (var videoNumber in stage.videoList) {					
					var videoItem = document.createElement('li');
					videoItem.innerText = stage.videoList[ videoNumber ].title;
					ul.appendChild(videoItem);
				}
			}
			
			tocList.appendChild(tocItem);
		}
	}
	
	function initTree(courseConfig) {
		console.log("Initializing tree view");
		readConfigFromQueryString(initTOC);
	//	initTOC(courseConfig);
	}
	