

var _interface = {
isChrome:{info:"ISCHROME"},
getDevices:{info:"GETDEVICES"},
connectDevice:{info:""},
connected:{connected:'', status:false}
}

var _response = {
isChrome:{info:"CHROME"},
getDevices:{devices:[]},
//connectDevice:{connected:"",status:""}
}

var htmlPlug = {
    port:{},
    shortReceive:function(request, sender, sendResponse){
        console.log(request);
        console.log(sender);
        console.log(sendResponse);
    },
    
    longReceive:function(msg){
        console.log(msg);
    },
    
    postMessage:function(msg){
        !this.port&&console.log("port is null please wait connect");
        
        this.port&&this.port.postMessage(msg);
    },
    
    addShortListener : function(callback){
        if(callback){
            this.shortReceive = callback
        }
        chrome.runtime.onMessageExternal.addListener(this.shortReceive);
    }.bind(this),
    addLongListener: function(callback){

        if(callback){
            chrome.runtime.onConnectExternal.addListener(function (port){
                                                         console.log("have connect request");
                                                         console.log(port);
                                                         this.port = port;
                                                         this.longReceive = callback;
                                                         port.onMessage.addListener(this.longReceive);
                                                         }.bind(this));
        }
    }
}

htmlPlug.addLongListener(function(msg){
                         
                         console.log('custom long listerner');
                         console.log(msg);
                         
                         progressMsg(msg);
                         
                         htmlPlug.postMessage("plug sendlongMessage");
                         htmlPlug.postMessage("plug sendlongMessage");
                         htmlPlug.postMessage("plug sendlongMessage");
                         
                         
                         
                         
                         });


function progressMsg(msg){
    if(msg.info == _interface.isChrome.info){
       // htmlPlug.postMessage(_response.isChrome);
    }
    if(msg.info == _interface.getDevices.info){
        serial.getDevices(function(plist){
                          console.log(plist);
                          _response.getDevices.devices = plist
                          htmlPlug.postMessage(_response.getDevices);
                          });
        
        htmlPlug.postMessage()
    }
    
    if(msg.connectDeviceId){

        _hex_ = msg.data || '';
        
        var path = serial.connect(msg.connectDeviceId,function(result){
                                  if(result){
                                  
                                  _interface.connected.connected = msg.connectDeviceId;
                                  _interface.connected.status = true;
                                  htmlPlug.postMessage(_interface.connected);
                                  
                                  time.base = 0;
                                  setTimeout(function(){
                                             serialStartBurner()
                                             },250)
                                  }else{
                                  htmlPlug.postMessage({connected:"",status:false})
                                  }
                                  
                                  
                                  })
    }
    
}


htmlPlug.addShortListener(function(request,sender,sendResponse){
                          console.log(request);
                          sendResponse(_response.isChrome);
                          
                          });











//
//chrome.runtime.onMessageExternal.addListener(
//                                             function(request, sender, sendResponse) {
//                                             console.log("sender" + sender.url + "openUrlInEditor" + request.content);
//                                             _hex_ = request.content;
//                                             burner();
//                                             time.base = 0;
//                                             });
//
//
//
//
//var portExtension = null;
//chrome.runtime.onConnectExternal.addListener(function (port){
//                                             portExtension = port;
//                                             console.log(port.name);
//                                             // port.postMessage({answer:"background send message to html"});
//                                             
//                                             port.onMessage.addListener(function(msg)
//                                                                        {
//                                                             
//                                                                        
//                                                                        });
//                                             });
