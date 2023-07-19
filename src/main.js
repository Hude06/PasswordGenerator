let PassUnlocked = false;
let UserUnlocked = false;

let createdPassword = "";
let newpass = document.getElementById("newpass")
let SavePass = document.getElementById("SavePass")
let passForm = document.getElementById("pwd")
let usserForm = document.getElementById("username")


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
newpass.addEventListener("click", function() {
  newpassword(10)
});
passForm.addEventListener("change", function(e) {
  if (e.target.value === "r4e4ndk2k5") {
    PassUnlocked = true;
  }
  if (PassUnlocked && UserUnlocked) {
    document.getElementById("generator").style.visibility = "visible"
    document.getElementById("login").style.visibility = "hidden"
  }
});
usserForm.addEventListener("change", function(e) {
  console.log(e.target.value)
  if (e.target.value === "Judemakes") {
    UserUnlocked = true;
  }
  if (PassUnlocked && UserUnlocked) {
    document.getElementById("generator").style.visibility = "visible"
    document.getElementById("login").style.visibility = "hidden"
  }
});
