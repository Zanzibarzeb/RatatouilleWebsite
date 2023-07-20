   
   	import(onendedHandler) from "./coursewareUtilities.js";
   	
    console.log("External module running\n");
    const utilities = {};

    function init() {

      console.log("initialize");
      videoFrame = document.getElementById("mainVideoFrame");
      console.log(videoFrame);
      console.log("utilities:");
      console.log(utilities);      
      console.log("utilities.init:");
      console.log(utilities.init);
      console.log("window:");
      console.log(window);
      console.log("window.onendedHandler:");
      console.log(window.onendedHandler);
      
	  utilities.init = initialize;
  	  utilities.onendedHandler = onendedHandler;
      utilities.init(videoFrame);
    }

    init();

