//https://www.eclipse.org/paho/clients/js/

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
  document.getElementById('estado').innerHTML='Prendido';
  document.getElementById('imagen').src='https://indiehoy.com/wp-content/uploads/2018/03/stewie-padre-de-familia.jpg'
  message = new Paho.MQTT.Message("ON");
    message.destinationName = "carloscalderon_@hotmail.es/t2";
    client.send(message);
  
}
function LED1_Off(){
  //alert("led off");
  console.log("led off");
  document.getElementById('estado').innerHTML='Apagado';
  document.getElementById('imagen').src='https://www.lavanguardia.com/files/image_449_220/uploads/2018/03/19/5fa436c7233b0.jpeg'
  message = new Paho.MQTT.Message("OFF");
    message.destinationName = "carloscalderon_@hotmail.es/t2";
    client.send(message);
}





// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

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
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "carloscalderon_@hotmail.es/t2";//añade el topico
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
	  document.getElementById("recibido").innerHTML=message.payloadString;//publica el mensaje al id asignado

    if (message.payloadString == ("ON")){
      document.getElementById('estado').innerHTML='Prendido';
      document.getElementById('imagen').src='https://indiehoy.com/wp-content/uploads/2018/03/stewie-padre-de-familia.jpg'
    }
    if (message.payloadString == "OFF"){
      document.getElementById('estado').innerHTML='Apagado';
      document.getElementById('imagen').src='https://www.lavanguardia.com/files/image_449_220/uploads/2018/03/19/5fa436c7233b0.jpeg'
    }
  }
  
