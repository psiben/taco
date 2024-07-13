const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost/corndog_tracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const LocationSchema = new mongoose.Schema({
  name: String,
  lat: Number,
  lng: Number,
  rating: Number,
});

const Location = mongoose.model('Location', LocationSchema);

app.get('/api/locations', async (req, res) => {
  const locations = await Location.find();
  res.json(locations);
});

app.post('/api/locations', async (req, res) => {
  const newLocation = new Location(req.body);
  await newLocation.save();
  res.json(newLocation);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
