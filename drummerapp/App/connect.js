    var client = new Paho.MQTT.Client("m20.cloudmqtt.com", Number(38316), "client_1");
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    //client.onMessageArrived = onMessageArrived;


    // connect the client
    var options = {
            useSSL: true,
            userName: "bfxnalwu",
            password: "9ObBXGyvlQm1",
            cleanSession: true,
            onSuccess:onConnect,
            onFailure:doFail
          }

    //client.connect({onSuccess:onConnect});
    //client.connect(options);

    // called when the client connects
    function onConnect() {
      // Once a connection has been made, make a subscription and send a       message.
	  alert("Connected!");
	  client.subscribe("itsdrummerbaby");
     debugger;
      console.log("onConnect");
      client.subscribe("outTopic");
      message = new Paho.MQTT.Message("Well, hello there!");
      message.destinationName = "itsdrummerbaby";
      client.send(message);
	  $('#messages').append('<span> *Send* Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>');
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
    client.onMessageArrived = function (message) {
	  alert('message incoming');
      console.log("onMessageArrived:"+message.payloadString);
      var msg = message.payloadString;
	  $('#messages').append('<span> Yep </span><br/>');
	  $('#messages').append('<span> *Received* Topic: '+ msg + '</span><br/>');
      debugger;
    }
	
	 var publish = function (payload, topic, qos) {
     //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
     var message = new Paho.MQTT.Message(payload);
     message.destinationName = topic;
     message.qos = qos;
     client.send(message);
 }