
			
async function readConfigFromQueryString(callback) {

	// read REST parameters
	const queryString = window.location.search;
	const urlParms = new URLSearchParams(queryString);

	// read course config file name and stage to execute
	const configFileName = urlParms.get("config");
	stageNumber = urlParms.get("stage");

	let url = "./" + configFileName;
	
	let response = await fetch(url);

	if (response.ok) { // if HTTP-status is 200-299
		courseConfig = await response.json();
	} else {
		alert("HTTP Error while retrieving the course configuration.\n" + response.status);
	}
		
	callback(courseConfig);
}
			
async function readTestFromFile(fileName, callback) {
		
	let url = "./" + fileName;
	
	let response = await fetch(url);

	if (response.ok) { // if HTTP-status is 200-299
		testConfig = await response.json();
	} else {
		alert("HTTP Error while retrieving the course configuration.\n" + response.status);
	}
		
	callback(testConfig);
}
