let PassUnlocked = false;
let UserUnlocked = false;
let createdPassword = "";
let newpass = document.getElementById("newpass")
let passForm = document.getElementById("pwd")
let usserForm = document.getElementById("username")
let AddPassElement = document.getElementById("AddPass")
let AddNameElement = document.getElementById("PasswordName")
let passwordElement = document.getElementById("password")
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}
function generateRandomLetter() {
  const alphabet = "abcdefghijklmnopqrstuvwxyz"

  return alphabet[Math.floor(Math.random() * alphabet.length)]
}
function newpassword(length) {
  createdPassword = ""
  for (let i = 0; i < length/2; i++) {
    createdPassword += "" +(getRndInteger(0,9)) + generateRandomLetter()
  }
  passwordElement.innerHTML = createdPassword
}
class Passwords {
  constructor(name, password) {
    this.name = name
    this.password = password
  }
}
newpass.addEventListener("click", function() {
  document.getElementById("addPass").style.visibility = "visible"

});
passForm.addEventListener("change", function(e) {
  if (e.target.value.toLowerCase() === "r4e4ndk2k5") {
    PassUnlocked = true;
  }
  if (PassUnlocked && UserUnlocked) {
    document.getElementById("generator").style.visibility = "visible"
    document.getElementById("login").style.visibility = "hidden"
  }
});
usserForm.addEventListener("change", function(e) {
  console.log(e.target.value)
  if (e.target.value.toLowerCase() === "judemakes") {
    UserUnlocked = true;
  }
  if (PassUnlocked && UserUnlocked) {
    document.getElementById("generator").style.visibility = "visible"
    document.getElementById("login").style.visibility = "hidden"
  }
});
let CurrentPassName = ""
let passwords = []
AddNameElement.addEventListener("change", function(e) {
  CurrentPassName = e.target.value;
});
AddPassElement.addEventListener("change", function(e) {
  passwords.push(new Passwords(CurrentPassName, e.target.value))
  addPasswordToList(passwords.length-1);
  document.getElementById("form").reset();

});
function addPasswordToList(num) {
  var displayPassword = document.createElement('div');
  displayPassword.innerHTML = passwords[num].name + " " + passwords[num].password
  sendDataToServer(passwords[num].name + " " + passwords[num].password)
  document.getElementById('messages').appendChild(displayPassword);
  document.getElementById("addPass").style.visibility = "hidden"

}
function loop() {
  requestAnimationFrame(loop)
}

loop();


function sendDataToServer(data) {
  console.log(data)
  const url = 'http://localhost:3000/data';
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'text/plain' // Use text/plain for a simple string
      },
      body: data // Send the string directly without JSON.stringify
  })
  .then(response => response.text()) // Use response.text() to get the server's response as a string
  .then(responseData => {
      console.log('Server response:', responseData);
  })
  .catch(error => {
      console.error('Error sending data:', error);
  });
}