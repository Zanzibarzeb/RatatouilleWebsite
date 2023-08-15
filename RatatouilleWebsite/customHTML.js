"use strict";

class customHTMLController {

	constructor(courseConfig, stageNumber, contentArea) {
		console.log("initialize custom html");
		this.contentArea = contentArea;
		this.courseConfig = courseConfig;
		this.stageNumber = stageNumber;
		
		this.contentArea.innerHTML = '';
		
		var fileName = this.courseConfig.stages[ this.stageNumber ].htmlFile;
		
		console.log(fileName);
		
		var iframe = document.createElement('iframe');
		iframe.src = fileName;
		iframe.style.height = "100%";
		iframe.style.width = "100%";
		
		this.contentArea.appendChild(iframe);
	}
}