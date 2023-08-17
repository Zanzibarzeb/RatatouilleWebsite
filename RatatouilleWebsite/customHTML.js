"use strict";

class customHTMLController {

	constructor(courseConfig, stageNumber, contentArea) {
		console.log("initialize custom html");
		this.contentArea = contentArea;
		this.courseConfig = courseConfig;
		this.stageNumber = stageNumber;
		
		this.contentArea.innerHTML = '';
		
		var stage = this.courseConfig.stages[ this.stageNumber ];
		var fileName = stage.htmlFile;
		var timeout = stage.timeout;

		
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
		
		if (timeout != null) {
			this.timerId = setTimeout(
							function () {
								console.log('section timeout');
				
								if (this.contentArea.parentElement != null) {
									if (this.contentArea.parentElement.contains(contentArea)) {
										nextStage();
									}
								}
							},
						timeout);
						}
	}
		
	cleanup() {
		if (this.timerId != null) {
			clearTimeout(this.timerId);
		}
	}

}