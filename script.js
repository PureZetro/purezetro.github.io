let currentUser = "";

function login() {

  let username = document.getElementById("username").value;

  if(username == "") {
    alert("Enter username");
    return;
  }

  currentUser = username;

  document.getElementById("login").style.display = "none";

  document.getElementById("app").style.display = "flex";

  document.getElementById("name").innerText = username;

}

function sendMessage() {

  let input = document.getElementById("messageInput");

  if(input.value == "") return;

  let messages = document.getElementById("messages");

  let div = document.createElement("div");

  div.className = "message";

  div.innerHTML = "<b>" + currentUser + "</b><br>" + input.value;

  messages.appendChild(div);

  input.value = "";

}
