const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 1431; // Use the correct port here
app.use(bodyParser.text());
// CORS middleware to allow requests from http://127.0.0.1:1430
app.use(
  cors({
    origin: 'http://127.0.0.1:1430',
  })
);

// Handle preflight requests
app.options('/data', cors()); // Adjust the route to match your actual route

// Sample route to handle incoming data
// Sample route to handle incoming data
const CryptoJS = require("crypto-js");
app.post('/data', (req, res) => {
  res.json({ message: 'Data received successfully!' });
  const receivedDataString = req.body;
  fs.mkdir("./judemakes", { recursive: true }, (err) => {
    if (err) {
      console.error('Error creating folder:', err);
    } else {
      console.log('Folder created successfully!');
    }
  });
  app.get('/getData', (req, res) => {
    // Replace the following line with the actual data you want to send
    const responseData = { message: 'Hello from the server!' };
  
    res.json(responseData);
  });
  const filename = `./judemakes/data_${Date.now()}.txt`;
  const split = receivedDataString.split(" "); 
  const json = (JSON.stringify({ Username: split[0], Password: split[1] }));

  var encrypted = CryptoJS.AES.encrypt(json, "55uk8h3X").toString();

  fs.writeFile(filename, encrypted, (err) => {
    console.log('Ran')
    if (err) {
      console.error('Error writing to the file:', err);
    } else {
      console.log('Data successfully written to the file.');
    }
  });
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
