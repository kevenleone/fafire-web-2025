setInterval(() => {
  document.getElementById("date-time").innerText = new Date().toISOString();
}, 1000);
