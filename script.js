// Connect to MQTT broker and subscribe to the PM 2.5 topic
<script src="https://cdnjs.cloudflare.com/ajax/libs/paho-mqtt/1.0.1/mqttws31.min.js" type="text/javascript"></script>

<script>

client = new Paho.MQTT.Client(location.hostname, Number(location.port), "clientId");

// set callback handlers
client.onConnectionLost = onConnectionLost;
client.onMessageArrived = onMessageArrived;

// connect the client
client.connect({onSuccess:onConnect});


// called when the client connects
function onConnect() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("onConnect");
  client.subscribe("World");
  message = new Paho.MQTT.Message("Hello");
  message.destinationName = "World";
  client.send(message);
}

// called when the client loses its connection
function onConnectionLost(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
}
  
mqttClient.onMessageArrived = function (message) {
  const data = JSON.parse(message.payloadString);

  // Assuming data format: { pm25: value }
  const pm25Value = data.pm25;
  document.getElementById("pm25-level").innerText = pm25Value;

  // Perform logic to determine status and set explanation based on USAQI standards
  let status = "";
  let explanation = "";

  // Example logic - please replace with your own USAQI standards logic
  if (pm25Value <= 50) {
    status = "Good";
    explanation = "Air quality is considered satisfactory, and air pollution poses little or no risk.";
  } else if (pm25Value <= 100) {
    status = "Moderate";
    explanation = "Air quality is acceptable; however, there may be a moderate health concern for a very small number of people who are unusually sensitive to air pollution.";
  } else {
    status = "Unhealthy";
    explanation = "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
  }

  document.getElementById("status").innerText = status;
  document.getElementById("explanation").innerText = explanation;
};

</script>
