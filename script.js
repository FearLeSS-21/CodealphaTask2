const messageBar = document.querySelector(".bar-wrapper input");
const sendBtn = document.querySelector(".bar-wrapper button");
const messageBox = document.querySelector(".message-box");
const deleteBtn = document.querySelector(".delete-btn"); // New delete button

let API_URL = "https://api.openai.com/v1/chat/completions";
let API_KEY = "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";

// Function to send message
const sendMessage = () => {
  if (messageBar.value.length > 0) {
    const UserTypedMessage = messageBar.value;
    messageBar.value = "";

    let message =
      `<div class="chat message">
        <img src="YOU.jpeg">
        <span>
          ${UserTypedMessage}
        </span>
      </div>`;

    let response =
      `<div class="chat response">
        <img src="Zicon.png">
        <span class= "new">...
        </span>
      </div>`

    messageBox.insertAdjacentHTML("beforeend", message);

    setTimeout(() => {
      messageBox.insertAdjacentHTML("beforeend", response);

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          "model": "gpt-3.5-turbo",
          "messages": [{ "role": "user", "content": UserTypedMessage }]
        })
      }

      fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
          const ChatBotResponse = document.querySelector(".response .new");
          ChatBotResponse.innerHTML = data.choices[0].message.content;
          ChatBotResponse.classList.remove("new");
        })
        .catch((error) => {
          ChatBotResponse.innerHTML = "Oops! An error occurred. Please try again";
        })
    }, 100);
  }
};

// Event listener for send button click
sendBtn.onclick = sendMessage;

// Event listener for Enter key press
messageBar.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault(); // Prevent default behavior of Enter key (submitting form)
    sendMessage(); // Call sendMessage function
  }
});

// Event listener for delete button click
deleteBtn.onclick = function () {
  messageBox.innerHTML = ""; 

  const helloMessage =
    `<div class="chat response">
      <img src="Zicon.png">
      <span>Hello there! <br> How can I help you today.</span>
    </div>`;
  messageBox.insertAdjacentHTML("beforeend", helloMessage);
};
