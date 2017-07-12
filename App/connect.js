    var client = new Paho.MQTT.Client("diginet.mt.haw-hamburg.de", Number(8000), "/mqtt", "myclientid_" + parseInt(Math.random() * 100, 10));
 
    // set callback handlers
    client.onConnectionLost = onConnectionLost;
    //client.onMessageArrived = onMessageArrived;
	 

    var options = {
            useSSL: false,
            userName: "haw",
            password: "schuh+-0",
            cleanSession: true,
			keepAliveInterval: 300,
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
	  client.subscribe("itsdrummerbaby/disconnect");
     debugger;
      console.log("onConnect");
      // client.subscribe("outTopic");
      // message = new Paho.MQTT.Message("Well, hello there!");
      // message.destinationName = "itsdrummerbaby";
      // client.send(message);
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
		alert("Timeout - disconnected. Please reload.");
      }
    }

    // called when a message arrives
    client.onMessageArrived = function (message) {
	  //alert('message incoming');
      console.log("onMessageArrived:"+message.payloadString);
      var msg = message.payloadString;
	  //alert(msg);
	  if(msg === "disconnect"){
		client.disconnect();
		alert("Disconnected");
	  }
/* 	  $('#messages').append('<span> Yep </span><br/>');
	  $('#messages').append('<span> *Received* Topic: '+ msg + '</span><br/>'); */
      debugger;
    }
	
	 var publish = function (payload, topic, qos) {
     //Send your message (also possible to serialize it as JSON or protobuf or just use a string, no limitations)
     var message = new Paho.MQTT.Message(payload);
     message.destinationName = topic;
     message.qos = qos;
     client.send(message);
 }
 
 var playKick = function(){
	publish('1','itsdrummerbaby/kick',2);
 }
 var playTom1 = function(){
	publish('1','itsdrummerbaby/tom1',2);
 }
 var playTom2 = function(){
	publish('1','itsdrummerbaby/tom2',2);
 }
 var playSnare = function(){
	publish('1','itsdrummerbaby/snare',2);
 }
 var playBecken = function(){
	publish('1','itsdrummerbaby/becken',2);
 }
 var playHihat = function(){
	publish('1','itsdrummerbaby/hihat',2);
 }
 

 
 var stopDemo = function(){
	clearInterval(intervalInstrument);
 }
 
 
 // siehe https://www.w3schools.com/js/js_timing.asp
 var demoPlay = function(){
	//playKick();
	// setTimeout(playTom2(), 15000)
 	// setTimeout(playTom1(), 15000)
    // setTimeout(function, milliseconds)
    // Executes a function, after waiting a specified number of milliseconds.
	
	//intervalInstrument(playTom1(), 500);
	//intervalInstrument();
	var intervalInstrument1 = setInterval(playHihat, 15000);
	var intervalInstrument2 = setInterval(playKick, 7000);
	var intervalInstrument3 = setInterval(playSnare, 11000);
	var intervalInstrument4 = setInterval(playTom1, 3000);
	var intervalInstrument5 = setInterval(playTom2, 8000);
	var intervalInstrument6 = setInterval(playBecken, 21500);
	
	
	// startet immer sofort automatisch: ugh, aber lieﬂe sich vllt mit dem anderen verbinden...
	setTimeout(clearInterval(intervalInstrument1), 30000);
	
	var second = 1000;
	//clearInterval(inter
	//setTimeout(stopDemo, 360*second);
	 
/* 	playTom1();
	playTom2();
	playSnare();
	playBecken();
	playHihat(); */
}

 

 