/*
function nuevo() {
  console.log("Mensaje enviado");
  texto = document.getElementById('enviarmensaje').value;
  message = new Paho.MQTT.Message(texto);
  message.destinationName = "carloscalderon_@hotmail.es/t2";
  client.send(message);
}

function LED1_On() {
  //alert("led on");
  console.log("led on");
  //document.getElementById('estadoled1').innerHTML='Prendido';
  document.getElementById('imagen').src='https://indiehoy.com/wp-content/uploads/2018/03/stewie-padre-de-familia.jpg'
  message = new Paho.MQTT.Message("ON LED1");
  message.destinationName = "carloscalderon_@hotmail.es/t2";
  client.send(message);
}
function LED1_Off(){
  //alert("led off");
  console.log("led off");
  //document.getElementById('estadoled1').innerHTML='Apagado';
  document.getElementById('imagen').src='https://www.lavanguardia.com/files/image_449_220/uploads/2018/03/19/5fa436c7233b0.jpeg'
  message = new Paho.MQTT.Message("OFF LED1");
  message.destinationName = "carloscalderon_@hotmail.es/t2";
  client.send(message);
}

function LED2_On() {
  //alert("led on");
  console.log("led on");
  //document.getElementById('estadoled2').innerHTML='Prendido';
  document.getElementById('imagen').src='https://indiehoy.com/wp-content/uploads/2018/03/stewie-padre-de-familia.jpg'
  message = new Paho.MQTT.Message("ON LED2");
  message.destinationName = "carloscalderon_@hotmail.es/t2";
  client.send(message);
  
}
function LED2_Off(){
  //alert("led off");
  console.log("led off");
  //document.getElementById('estadoled2').innerHTML='Apagado';
  document.getElementById('imagen').src='https://www.lavanguardia.com/files/image_449_220/uploads/2018/03/19/5fa436c7233b0.jpeg'
  message = new Paho.MQTT.Message("OFF LED2");
  message.destinationName = "carloscalderon_@hotmail.es/t2";
  client.send(message);
}

function pulsacion(){
  //alert("led off");
  console.log("Pulsacion");
  //document.getElementById('estadoled2').innerHTML='Apagado';
  message = new Paho.MQTT.Message("Pulsacion");
  message.destinationName = "carloscalderon_@hotmail.es/t2";
  client.send(message);
}

// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
*/ 
//client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));
client = new Paho.MQTT.Client("broker.mqttdashboard.com", 8000, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost; //perdio conexion
  client.onMessageArrived = onMessageArrived; //llego mensaje
  var options = {
   useSSL: false,
    //userName: "carloscalderon_@hotmail.es",
    //password: "roberto51",
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

  var MensajeRecibido=message.payloadString;
  var Sensores=MensajeRecibido.split(' ; ');
  document.getElementById("Actual").innerHTML=MensajeRecibido;

  document.getElementById("sensor").innerHTML=Sensores[0];
  document.getElementById("sensor2").innerHTML=Sensores[1];

  }