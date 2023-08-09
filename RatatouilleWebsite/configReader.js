 	
  		{
  			var courseConfig;
  			var stageNumber;
  		}
  					
		async function readConfigFromQueryString(callback) {
			console.log("readConfigFromQueryString");
		
			// read REST parameters
			const queryString = window.location.search;
			console.log("queryString: "+queryString);
			const urlParms = new URLSearchParams(queryString);
			console.log("urlParms: "+urlParms);

			// read course config file name and stage to execute
			const configFileName = urlParms.get("config");
			console.log("configFileName: "+configFileName);
			stageNumber = urlParms.get("stage");
		
			let url = "./" + configFileName;
			
			let response = await fetch(url);
	
			if (response.ok) { // if HTTP-status is 200-299
				courseConfig = await response.json();
			} else {
				alert("HTTP Error while retrieving the course configuration.\n" + response.status);
			}
			
			console.log("JSON from config file:\n");
			console.log(courseConfig);
			
			callback(courseConfig);
		}
