const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000; // Use the correct port here
app.use(bodyParser.text());
// CORS middleware to allow requests from http://127.0.0.1:1430
app.use(
  cors({
    origin: 'http://apps.hude.earth/3000',
  })
);

// Handle preflight requests
app.options('/data', cors()); // Adjust the route to match your actual route

// Sample route to handle incoming data
// Sample route to handle incoming data
app.post('/data', (req, res) => {
  const receivedDataString = req.body;
  const filename = `./data_${Date.now()}.txt`;
  fs.writeFile(filename, receivedDataString, (err) => {
    console.log('Ran')
    if (err) {
      console.error('Error writing to the file:', err);
    } else {
      console.log('Data successfully written to the file.');
    }
  });
  // Process the data as per your requirements

  // Send a response back if needed
  res.json({ message: 'Data received successfully!' });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
