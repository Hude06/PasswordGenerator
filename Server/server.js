const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const CryptoJS = require("crypto-js");


const app = express();
const port = 1431; // Use the correct port here
app.use(bodyParser.text());
// CORS middleware to allow requests from http://127.0.0.1:1430
app.use(
  cors({
    origin: 'http://apps.hude.earth:1431/data',
  })
);

// Handle preflight requests
app.options('/data', cors()); // Adjust the route to match your actual route

// Sample route to handle incoming data
// Sample route to handle incoming data

app.post('/data', (req, res) => {
  fs.readFile('./judemakes/data.txt', 'utf8', (err, data) => {
    var bytes  = CryptoJS.AES.decrypt(data, '55uk8h3X');
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    res.json({ message: decryptedData });
  });
  const receivedDataString = req.body;
  if (receivedDataString === "") {
    console.log("Ruturning")
    return
  } else {
    console.log("We are runniing the loop")
    fs.mkdir("./judemakes", { recursive: true }, (err) => {
      if (err) {
        console.error('Error creating folder:', err);
      } else {
      }
    });
    const filename = `./judemakes/data.txt`;
    const split = receivedDataString.split(" "); 
    const json = (JSON.stringify({ Username: split[0], Password: split[1] }));
  
    var encrypted = CryptoJS.AES.encrypt(json, "55uk8h3X");
  
    fs.writeFile(filename, encrypted.toString(), (err) => {
      if (err) {
        console.error('Error writing to the file:', err);
      } else {
      }
    });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
