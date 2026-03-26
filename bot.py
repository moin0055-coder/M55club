<!DOCTYPE html>
<html>
<head>
<title>Instagram Hack Tool</title>
<style>
body {
  background: black;
  color: #00ff00;
  font-family: monospace;
  text-align: center;
}
input {
  padding: 10px;
  margin: 10px;
}
button {
  padding: 10px;
}
#bar {
  width: 0%;
  height: 20px;
  background: green;
}
#progress {
  width: 100%;
  background: #333;
}
</style>
</head>
<body>

<h1>🔐 Instagram Hack Tool</h1>

<input type="text" id="user" placeholder="Enter username">
<button onclick="startHack()">Start</button>

<div id="progress"><div id="bar"></div></div>
<p id="text"></p>

<script>
function randomPass() {
  return Math.random().toString(36).slice(-8);
}

function startHack() {
  let i = 0;
  let bar = document.getElementById("bar");
  let text = document.getElementById("text");

  let interval = setInterval(() => {
    i += 10;
    bar.style.width = i + "%";
    text.innerText = "🔐 Hacking... " + i + "%";

    if (i >= 100) {
      clearInterval(interval);
      text.innerText = "Password: " + randomPass() + " 😂 (Prank)";
    }
  }, 500);
}
</script>

</body>
</html>
