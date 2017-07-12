 	
	var chosenMessage;
	var topic;
	var intervalInstrument1;
	var intervalInstrument2;
	var intervalInstrument3;
	var intervalInstrument4;
	var intervalInstrument5;
	var intervalInstrument6;
	
	var intervalBeats1;
	var intervalBeats2;
	var intervalBeats3;
	var intervalBeats4;
	var intervalBeats5;
	var intervalBeats6;
	
	var hihatBeat;
	var kickBeat;
	var snareBeat;
	var tom1Beat;
	var tom2Beat;
	var beckenBeat;
	
	
    var client = new Paho.MQTT.Client("diginet.mt.haw-hamburg.de", Number(8000), "/mqtt", "myclientid_" + parseInt(Math.random() * 100, 10));
 
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
		  
/* 	    var client = new Paho.MQTT.Client("m20.cloudmqtt.com", Number(38316), "client_1");
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
          } */

    //client.connect({onSuccess:onConnect});
    //client.connect(options);

    // called when the client connects
    function onConnect() {
      // Once a connection has been made, make a subscription and send a       message.
	  //topic = document.getElementsByName("Topic")[0].value;
	  alert("Connected!");
	  //alert(topic);
	  client.subscribe("itsdrummerbaby/#");
	  //client.subscribe("itsdrummerbaby/tom1");
     debugger;
      console.log("onConnect");
      client.subscribe("outTopic");
	  //client.subscribe(topic);
      message = new Paho.MQTT.Message("Well, hello there!");
      //message.destinationName = topic;
      //client.send(message);
	  //$('#messages').append('<span> *Send* Topic: ' + message.destinationName + '  | ' + message.payloadString + '</span><br/>');
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
	  //alert('message incoming');
      console.log("onMessageArrived:"+message.payloadString);
      var msg = message.payloadString;
	  var msgTopic = message.destinationName;
	  //var d = new Date(year, month, day, hours, minutes, seconds, milliseconds); 
	  var incomingMsg = "Topic: " +  msgTopic + " Message: " + msg + "\n";
	  document.getElementById("incomingmessages").value += incomingMsg;
	  //document.getElementById("incomingmessages").append(incomingMsg);
	  //$('#messages').append('<span> *Received* Topic: ' +  msgTopic + ' Message: ' + msg + '</span><br/>');
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
	 
     var message = new Paho.MQTT.Message(chosenMessage);
     message.destinationName = topic;
     message.qos = qos;
     client.send(message);
 }
 
 // um alle auf einmal rauszuwerfen
   var disconnectAll = function () {
	 //alert("disconnecting");

     var message = new Paho.MQTT.Message("disconnect");
	 //var disconnectTopic = "itsdrummerbaby/disconnect";
     //message.destinationName = disconnectTopic;
	 message.destinationName = "itsdrummerbaby";
     message.qos = 2;
     client.send(message);
 }
 
 var clearTextarea = function(){
  document.getElementById("incomingmessages").value = "";
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
 
// Instrument wird in einem bestimmten Intervall abgespielt
/*   var intervalInstrument = function(instrument, interval){
	var thisInstrument = instrument;
	var thisInterval = interval;
	setInterval(thisInstrument, thisInterval);
 } */
 

 
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
	intervalInstrument1 = setInterval(playHihat, 15000);
	intervalInstrument2 = setInterval(playKick, 7000);
	intervalInstrument3 = setInterval(playSnare, 11000);
    intervalInstrument4 = setInterval(playTom1, 3000);
	intervalInstrument5 = setInterval(playTom2, 8000);
	intervalInstrument6 = setInterval(playBecken, 21500);
	
	
	var second = 1000;
	//setTimeout(stopDemo, 360*second);

}

 var beatsPlay = function(){

	var hihatBeat = parseInt(document.getElementById('hihatBeats').value,10);
	var kickBeat = parseInt(document.getElementById('kickBeats').value,10);
	var snareBeat = parseInt(document.getElementById('snareBeats').value,10);
	var tom1Beat = parseInt(document.getElementById('tom1Beats').value,10);
	var tom2Beat = parseInt(document.getElementById('tom2Beats').value,10);
	var beckenBeat = parseInt(document.getElementById('beckenBeats').value,10);
 
 // per hundertstel Sekunde, also 10=1 Sekunde
 
	if(hihatBeat > 0){
	intervalBeats1 = setInterval(playHihat, hihatBeat*100);
	}
	if(kickBeat > 0){
	intervalBeats2 = setInterval(playKick, kickBeat*100);
	}
	if(snareBeat > 0){
	intervalBeats3 = setInterval(playSnare, snareBeat*100);
	}
	if(tom1Beat > 0){
    intervalBeats4 = setInterval(playTom1, tom1Beat*100);
	}
	if(tom2Beat > 0){
	intervalBeats5 = setInterval(playTom2, tom2Beat*100);
	}
	if(beckenBeat > 0){
	intervalBeats6 = setInterval(playBecken, beckenBeat*100);
	}
	
}

var stopDemo = function(){
	setTimeout(clearInterval(intervalInstrument1), 30000);
	setTimeout(clearInterval(intervalInstrument2), 30000);
	setTimeout(clearInterval(intervalInstrument3), 30000);
	setTimeout(clearInterval(intervalInstrument4), 30000);
	setTimeout(clearInterval(intervalInstrument5), 30000);
	setTimeout(clearInterval(intervalInstrument6), 30000);

}

var stopBeats = function(){
	setTimeout(clearInterval(intervalBeats1), 30000);
	setTimeout(clearInterval(intervalBeats2), 30000);
	setTimeout(clearInterval(intervalBeats3), 30000);
	setTimeout(clearInterval(intervalBeats4), 30000);
	setTimeout(clearInterval(intervalBeats5), 30000);
	setTimeout(clearInterval(intervalBeats6), 30000);

}

 
 