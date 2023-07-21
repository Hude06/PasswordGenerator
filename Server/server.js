const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000; // You can change this to any available port you prefer

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sample route to handle incoming data
app.post('/data', (req, res) => {
  const receivedData = req.body;
  console.log('Received data:', receivedData);
  // Process the data as per your requirements

  res.json({ message: 'Data received successfully!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

