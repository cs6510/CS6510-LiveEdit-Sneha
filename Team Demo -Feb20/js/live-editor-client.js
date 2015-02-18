// live editor client
// this client is for inter window/tab communication on the same browser
// it has to be used with the appropriate implementation of live-editor.js
//
// implementation depends on postMessage
var liveEditorClient = (function(){

  // string identifier for live editor window
  liveEditorWindowIdentifier = "LiveEditor";
  //url for live editor webpage
  liveEditorUrl = "http://localhost:3002/static2/live_editor.html";
  //object reference to live editor window
  liveEditorWindow = null;
  //object reference to live editor listener function
  liveEditorListener = null;


  executor = function(event){
    console.log(event.data + " via client executor");
    liveEditorListener(event);
  }


  initateLiveEditor = function(){
    liveEditorWindow = window.open(liveEditorUrl,liveEditorWindowIdentifier);
  };

  addListener = function(listener){
    liveEditorListener = listener;
    window.addEventListener("message", executor, false);
  }

  sendMessage = function(data){
    liveEditorWindow.postMessage(data,liveEditorUrl);
  }

  return self;

})();
