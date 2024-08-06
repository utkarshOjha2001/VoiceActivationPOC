const express = require('express');
const bodyParser = require('body-parser');
const nlp = require('compromise');

const app = express();
const port = 8000;

app.use(bodyParser.json());

app.post('/api', (req, res) => {
  const message = req.body.message;
  let response = processMessage(message);
  res.json({ response });
});

function processMessage(message) {
  const doc = nlp(message);

  if (doc.has('changing status') || doc.has('charging status') || doc.has('current charging status')) {
    return "chargingStatus";
  }
  if (doc.has('cable connection') || doc.has('cable is connected') || doc.has('cable status')) {
    return "cableConnection";
  }
  if (doc.has('weather') || doc.has('current weather') || doc.has('weather forecast')) {
    return "weather";
  }
  if (doc.has('max battery range') || doc.has('maximum battery range') || doc.has('battery range')) {
    return "maxBatteryRange";
  }
  if (doc.has('max speed') || doc.has('maximum speed') || doc.has('top speed')) {
    return "maxSpeed";
  }
  if (doc.has('maintenance') || doc.has('maintenance status') || doc.has('service required')) {
    return "maintenance";
  }
  if (doc.has('flashlight') || doc.has('flash light') || doc.has('turn on flashlight')) {
    return "flashlight";
  }
  if (doc.has('tire pressure') || doc.has('tyre pressure') || doc.has('current tire pressure') || doc.has('front tire')) {
    return "TirePressure";
  }
  
  return "I don't understand your question.";
}

app.listen(port, () => {
  console.log(`NLP API listening on ${port}`);
});
