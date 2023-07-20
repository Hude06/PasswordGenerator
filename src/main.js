let PassUnlocked = false;
let UserUnlocked = false;

let createdPassword = "";
let newpass = document.getElementById("newpass")
let SavePass = document.getElementById("SavePass")
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
  console.log(passwords)
});

function loop() {
  for (let i = 0; i < passwords.length; i++) {
    var displayPassword = document.createElement('div');
    displayPassword.innerHTML = passwords[i].name + " " + passwords[i].password
    document.getElementById('messages').appendChild(displayPassword);
    console.log(displayPassword)
  }
  requestAnimationFrame(loop)
}
loop();
