var unique = require('uniq');
    var client = new Paho.MQTT.Client("diginet.mt.haw-hamburg.de", Number(8000),  "/mqtt", "client_1");
    
	// set callback handlers
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // connect the client
    var options = {
            useSSL: false,
            userName: "haw",
            password: "schuh+-0",
            cleanSession: true,
            onSuccess:onConnect,
            onFailure:doFail
          }

    //client.connect({onSuccess:onConnect});
    client.connect(options);

    // called when the client connects
    function onConnect() {
      // Once a connection has been made, make a subscription and send a       message.
	  alert("Connected!");
     debugger;
        console.log("onConnect");
      client.subscribe("outTopic");
      message = new Paho.MQTT.Message("Hello");
      message.destinationName = "World";
      client.send(message);
    }

    function doFail(){
        debugger;
        console.log("dofail");
		alert("failure");
    }
    // called when the client loses its connection
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:"+responseObject.errorMessage);
      }
    }

    // called when a message arrives
    function onMessageArrived(message) {
      console.log("onMessageArrived:"+message.payloadString);
      var msg = message.payloadString;
      debugger;

    }