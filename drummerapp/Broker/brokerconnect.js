 	
	var chosenMessage;
	var topic;

    var client = new Paho.MQTT.Client("diginet.mt.haw-hamburg.de", Number(8000),  "/mqtt", "myclientid_" + parseInt(Math.random() * 100, 10));
 
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    //client.onMessageArrived = onMessageArrived;


    var options = {
            useSSL: false,
            userName: "haw",
            password: "schuh+-0",
            cleanSession: true,
            onSuccess:onConnect,
            onFailure:doFail
          }

    //client.connect({onSuccess:onConnect});
    //client.connect(options);

    // called when the client connects
    function onConnect() {
      // Once a connection has been made, make a subscription and send a       message.
	  topic = document.getElementsByName("Topic")[0].value;
	  alert("Connected!");
	  alert(topic);
	  client.subscribe("itsdrummerbaby/#");
	  client.subscribe("itsdrummerbaby/tom1");
     debugger;
      console.log("onConnect");
      client.subscribe("outTopic");
	  //client.subscribe(topic);
      message = new Paho.MQTT.Message("Well, hello there!");
      message.destinationName = topic;
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
	  var msgTopic = message.destinationName;
	  $('#messages').append('<span> Yep </span><br/>');
	  $('#messages').append('<span> *Received* Topic: '+ msgTopic + ' Message: ' + msg + '</span><br/>');
      debugger;
    }
	
	 var publish = function (payload, topic, qos) {
     //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
     var message = new Paho.MQTT.Message(payload);
     message.destinationName = topic;
     message.qos = qos;
     client.send(message);
 }
 
 	 var publish2 = function (qos) {
	 var chosenMessage = document.getElementsByName("Message")[0].value; 
	 
     //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
     var message = new Paho.MQTT.Message(chosenMessage);
     message.destinationName = topic;
     message.qos = qos;
     client.send(message);
 }
 