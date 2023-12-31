let PassUnlocked = false;
let UserUnlocked = false;
let createdPassword = "";
let newpass = document.getElementById("newpass")
let passForm = document.getElementById("pwd")
let usserForm = document.getElementById("username")
let AddPassElement = document.getElementById("AddPass")
let AddNameElement = document.getElementById("PasswordName")
let passwordElement = document.getElementById("password")
let user = "judemakes"
let password = "r4e4ndk2k5"
document.getElementById("RandomPassword").addEventListener("click", function(e) {
  console.log("Clicked on")
  document.getElementById("randompass").innerHTML = (newpassword(10))
});
document.getElementById("SecurePassword").addEventListener("change", function(e) {
  password = e.target.value.toLowerCase()
  document.getElementById("newLoginWindow").style.visibility = "hidden"

});
document.getElementById("NewUsernameLogin").addEventListener("change", function(e) {
  user = e.target.value.toLowerCase()

});
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
  return(createdPassword)
}
class Passwords {
  constructor(name, password) {
    this.name = name
    this.password = password
  }
}
newpass.addEventListener("click", function() {
  document.getElementById("addPass").style.visibility = "visible"
  document.getElementById("newpass").style.visibility = "hidden"

});
let newLoginVisible = false;
document.getElementById("newLogin").addEventListener("click", function() {
  console.log("Div element is clicked!");
  newLoginVisible = !newLoginVisible
  console.log(newLoginVisible)
  if (newLoginVisible) {
    document.getElementById("newLoginWindow").style.visibility = "visible"
  } else {
    document.getElementById("newLoginWindow").style.visibility = "hidden"
  }
});
passForm.addEventListener("change", function(e) {
  if ((e.target.value.toLowerCase()) === password) {
    PassUnlocked = true;
  }
  if (PassUnlocked && UserUnlocked) {
    document.getElementById("generator").style.visibility = "visible"
    document.getElementById("login").style.visibility = "hidden"
    document.getElementById("messages").style.visibility = "visible"
  }
});
usserForm.addEventListener("change", function(e) {
  if (e.target.value.toLowerCase() === user) {
    UserUnlocked = true;
  }
});
let CurrentPassName = ""
let passwords = []
AddNameElement.addEventListener("change", function(e) {
  CurrentPassName = e.target.value;
});
AddPassElement.addEventListener("change", function(e) {
  passwords.push(new Passwords(CurrentPassName, e.target.value))
  addPasswordToList(passwords.length-1,true);
  document.getElementById("form").reset();

});
function addPasswordToList(num,server) {
  var displayPassword = document.createElement('div');
  displayPassword.innerHTML = passwords[num].name + " " + passwords[num].password
  if (server) {
    sendDataToServer(passwords[num].name + " " + passwords[num].password)
  }
  document.getElementById('messages').appendChild(displayPassword);
  document.getElementById("addPass").style.visibility = "hidden"
}
function sendDataToServer(data) {
  console.log("Sending Data is " + data)
  const url = 'http://127.0.0.1:1431/data';
  fetch(url, {
      method: 'POST',
      headers: {
          'Content-Type': 'text/plain' // Use text/plain for a simple string
      },
      body: data // Send the string directly without JSON.stringify
  })

  .then(response => response.json()) // Use response.text() to get the server's response as a string
  .then(responseData => {
    console.log("Data",responseData)
    if (responseData !== "undefined") {
      console.log(responseData)
      let ParsedJSON = JSON.parse(responseData.message)
      passwords.push(new Passwords(ParsedJSON.Username,ParsedJSON.Password))
      addPasswordToList(passwords.length-1,false);
    }
  })
  .catch(error => {
      console.error('Error sending data:', error);
  });

}
function loop() {
  if (PassUnlocked && UserUnlocked) {
    document.getElementById("generator").style.visibility = "visible"
    document.getElementById("login").style.visibility = "hidden"
  }
  requestAnimationFrame(loop)
}
function init() {
  sendDataToServer();
  loop();
}
init();