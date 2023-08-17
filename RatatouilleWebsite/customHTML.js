"use strict";

class customHTMLController {

	constructor(courseConfig, stageNumber, contentArea) {
		console.log("initialize custom html");
		this.contentArea = contentArea;
		this.courseConfig = courseConfig;
		this.stageNumber = stageNumber;
		
		this.contentArea.innerHTML = '';
		
		var fileName = this.courseConfig.stages[ this.stageNumber ].htmlFile;
		
		// append url parms
		const queryString = window.location.search;
		const urlParms = new URLSearchParams(queryString);
		const configFileName = urlParms.get("config");
		
		fileName += '?' + 'config=' + configFileName + '&' + "stage=" + this.stageNumber;
		
		console.log(fileName);
		
		var iframe = document.createElement('iframe');
		iframe.src = fileName;
		iframe.style.height = "100%";
		iframe.style.width = "100%";
		
		this.contentArea.appendChild(iframe);
		
		setTimeout(function () {
			console.log('section timeout');
			nextStage();
		},
		4000);
	}
}