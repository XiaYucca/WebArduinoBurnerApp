chrome.app.runtime.onLaunched.addListener(function() {
  chrome.app.window.create('STK500.html', {
    bounds: {
      width: 800,
      height: 500
    }
  });
});

var _port = null;
chrome.runtime.onConnect.addListener(function(port) {
                                     _port = port;
                                     console.assert(port.name == "chrome.js");
                                     port.onMessage.addListener(function(msg){
                                                                console.log(msg);
                                                                })
                                     
                                     });

chrome.runtime.onMessageExternal.addListener(
                                             function(request, sender, sendResponse) {
                                             console.log("sender" + sender.url + "openUrlInEditor" + request.content);
                                             
                                             _port.postMessage(request.content);
                                             
                                             });


