'use strict';
const express = require('express');
const mongoose = require('mongoose');

const mongoUser = process.env.MONGO_USERNAME || 'admin';
const mongoPass = process.env.MONGO_PASSWORD || 'password';
const mongoHost = process.env.MONGO_HOST || 'mongo-svc';
const mongoPort = process.env.MONGO_PORT || '27017';

const mongoURI = `mongodb://${mongoUser}:${mongoPass}@${mongoHost}:${mongoPort}/?authSource=admin`;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const app = express();
app.use(express.json());

// Sample schema for future CRUD testing (used in Step 7)
const Item = mongoose.model('Item', new mongoose.Schema({ name: String }));

app.get('/', (req, res) => {
  res.send('✅ Node.js App connected to MongoDB');
});

const PORT = 8080;
app.listen(PORT, () => console.log(`🟢 App listening on http://localhost:${PORT}`));
