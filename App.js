const express = require('express');
const bodyParser = require('body-parser');
const natural = require('natural');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

const classifier = new natural.BayesClassifier();

// Training data
const trainingData = [
  // for charging status
  { text: 'What is my charging status', label: 'chargingStatus' },
  { text: 'current charging status', label: 'chargingStatus' },
  { text: 'charging status now', label: 'chargingStatus' },
  { text: 'is my device charging', label: 'chargingStatus' },
  { text: 'status of charging', label: 'chargingStatus' },
  { text: 'how is the charging going', label: 'chargingStatus' },
  
  // for cable connection
  { text: 'cable connection', label: 'cableConnection' },
  { text: 'cable is connected', label: 'cableConnection' },
  { text: 'cable status', label: 'cableConnection' },
  { text: 'is the cable connected', label: 'cableConnection' },
  { text: 'check cable connection', label: 'cableConnection' },
  { text: 'status of the cable', label: 'cableConnection' },

  // for weather status
  { text: 'weather', label: 'weather' },
  { text: 'current weather', label: 'weather' },
  { text: 'weather forecast', label: 'weather' },
  { text: 'how is the weather', label: 'weather' },
  { text: 'what is the weather like', label: 'weather' },
  { text: 'weather conditions', label: 'weather' },

  // for battery range
  { text: 'max battery range', label: 'maxBatteryRange' },
  { text: 'maximum battery range', label: 'maxBatteryRange' },
  { text: 'battery range', label: 'maxBatteryRange' },
  { text: 'range of battery', label: 'maxBatteryRange' },
  { text: 'how far can the battery go', label: 'maxBatteryRange' },
  { text: 'battery distance', label: 'maxBatteryRange' },
  { text: "how far i can go with this charging", label: 'maxBatteryRange' },
  { text: "how far i can go", label: 'maxBatteryRange' },
  { text: "how far i can go with current charge", label: 'maxBatteryRange' },
  // for max speed
  { text: 'max speed', label: 'maxSpeed' },
  { text: 'maximum speed', label: 'maxSpeed' },
  { text: 'top speed', label: 'maxSpeed' },
  { text: 'highest speed', label: 'maxSpeed' },
  { text: 'what is the max speed', label: 'maxSpeed' },
  { text: 'speed limit', label: 'maxSpeed' },

  // for maintenance
  { text: 'maintenance', label: 'maintenance' },
  { text: 'maintenance status', label: 'maintenance' },
  { text: 'service required', label: 'maintenance' },
  { text: 'is maintenance needed', label: 'maintenance' },
  { text: 'maintenance check', label: 'maintenance' },
  { text: 'maintenance update', label: 'maintenance' },

  // for flashlight
  { text: 'flashlight', label: 'flashlight' },
  { text: 'flash light', label: 'flashlight' },
  { text: 'turn on flashlight', label: 'flashlight' },
  { text: 'activate flashlight', label: 'flashlight' },
  { text: 'flashlight status', label: 'flashlight' },
  { text: 'is the flashlight on', label: 'flashlight' },

  // for tire pressure
  { text: 'tire pressure', label: 'TirePressure' },
  { text: 'tyre pressure', label: 'TirePressure' },
  { text: 'current tire pressure', label: 'TirePressure' },
  { text: 'pressure in tires', label: 'TirePressure' },
  { text: 'how much pressure in tires', label: 'TirePressure' },
  { text: 'check tire pressure', label: 'TirePressure' }
];


// Train the classifier
trainingData.forEach(item => {
  classifier.addDocument(item.text, item.label);
});
classifier.train();
console.log("Classifier has been trained.")

app.post('/api', (req, res) => {
  const message = req.body.message;
  const label = classifier.classify(message);
  res.json({ response: label });
});

app.listen(port, () => {
  console.log(`NLP API listening on ${port}`);
});
