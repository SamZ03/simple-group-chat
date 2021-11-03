const _chatContainer = document.getElementsByClassName("chat-container")[0];
const _userChat = document.getElementById("user-chat");
const _kirim = document.getElementById("kirim");

const socket = io();

_kirim.addEventListener("click", function () {
  const pesan = _userChat.value;
  socket.emit("pesan-baru", pesan);
  socket.on("pesan-diterima", () => {
    _userChat.value = "";
  });
});

socket.on("pesan-baru", data => {
  const pesan = htmlSanitize(data);
  const div = document.createElement("div");
  div.classList.add("chat");
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  div.style.backgroundColor = `rgba(${red}, ${green}, ${blue}, .3 )`;
  div.innerHTML = pesan;
  _chatContainer.appendChild(div);
});

/**
 * 
 * @param {String} pesan 
 */
function htmlSanitize(pesan) {
  const notAlowedChar = new Map();
  notAlowedChar.set("<", "&#60;")
  notAlowedChar.set(">", "&#62;");
  notAlowedChar.set("\"", "&#34;");
  notAlowedChar.set("\'", "&#39;");
  notAlowedChar.set("/", "&#47;");
  let sanitizeString = ""
  for (let i = 0; i < pesan.length; i++) {
    if (notAlowedChar.has(pesan[i])) {
      sanitizeString += notAlowedChar.get(pesan[i]);
    } else {
      sanitizeString += pesan[i];
    }
  }
  return sanitizeString;
}