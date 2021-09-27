
client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));
//client = new Paho.MQTT.Client("broker.mqttdashboard.com", 8000, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost; //perdio conexion
  client.onMessageArrived = onMessageArrived; //llego mensaje
  var options = {
   useSSL: false,
    userName: "carloscalderon_@hotmail.es",
    password: "roberto51",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
    client.subscribe("carloscalderon_@hotmail.es/t1");
    //client.subscribe("topicRob1");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "carloscalderon_@hotmail.es/t2";//añade el topico
    //message.destinationName = "topicRob2";//añade el topico
    client.send(message);// envia el mensaje
  
  }

  function doFail(e){
    console.log(e);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);// concatena el mensaje recibido
    //document.getElementById("recibido").innerHTML=message.payloadString;//publica el mensaje al id asignado
    
  if (message.payloadString == ("000")){
      document.getElementById('recibido').innerHTML='Conectado con la tarjeta ESP32';
    }

  Recibido=message.payloadString;
  Sensores=Recibido.split(' ; ');
  document.getElementById("Actual").innerHTML=message.payloadString;

  document.getElementById("sensor1").innerHTML=Sensores[0];
  document.getElementById("sensor2").innerHTML=Sensores[1];

  }