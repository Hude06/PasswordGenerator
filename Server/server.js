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
    origin: 'http://localhost:3000',
  })
);

// Handle preflight requests
app.options('/data', cors()); // Adjust the route to match your actual route

// Sample route to handle incoming data
// Sample route to handle incoming data
const CryptoJS = require("crypto-js");


app.post('/data', (req, res) => {
  const receivedDataString = req.body;
  fs.mkdir("./judemakes", { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating folder:', err);
    } else {
      console.log('Folder created successfully!');
    }
  });
  const filename = `./judemakes/data_${Date.now()}.txt`;
  var encrypted = CryptoJS.AES.encrypt(receivedDataString, "55uk8h3X").toString();

  fs.writeFile(filename, encrypted, (err) => {
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
// var decrypted = CryptoJS.AES.decrypt(encrypted, "55uk8h3X");
// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
