<template>
    <div class="chatbot-container">
      <!-- Chatbot Popup -->
      <div v-if="isOpen" class="chatbot-popup">
        <div class="chatbot-header">
          <div class="chatbot-title">
            <img src="https://cdn-icons-png.flaticon.com/512/1024/1024608.png" alt="Chatbot Logo" class="chatbot-logo" />
            <span>Eduplus Ai Assistant</span>
          </div>
          <div class="header-buttons">
            <button class="clear-chat-btn" @click="clearChat">🗑️ Clear</button>
            <button class="close-btn" @click="toggleChatbot">×</button>
          </div>
        </div>
        <div class="chatbot-body">
          <div class="messages">
            <div
              v-for="(message, index) in messages"
              :key="index"
              :class="['message', message.sender === 'bot' ? 'bot-message' : 'user-message']"
            >
              <p>{{ message.text }}</p>
            </div>
          </div>
          <div class="input-area">
            <input
              type="text"
              v-model="userMessage"
              placeholder="Type your message..."
              @keyup.enter="sendMessage"
            />
            <button @click="sendMessage">
              <img src="https://cdn-icons-png.flaticon.com/512/786/786205.png" alt="Send Icon" />
            </button>
          </div>
        </div>
      </div>
  
      <!-- Chatbot Button -->
      <button class="chatbot-button" @click="toggleChatbot">
        <img
          :src="isOpen
            ? 'https://cdn-icons-png.flaticon.com/512/463/463612.png' 
            : 'https://cdn-icons-png.flaticon.com/512/2331/2331946.png'"
          alt="Chat Icon"
        />
      </button>
    </div>
  </template>
  
  <script>
import axios from "axios";

export default {
  name: "ChatBot",
  data() {
    return {
      isOpen: false,
      userMessage: "",
      messages: [
        { text: "Hi! How can I assist you today?", sender: "bot" },
      ],
      apiUrl: "https://773b-34-16-233-139.ngrok-free.app/ask", // Backend API endpoint
    };
  },
  methods: {
    toggleChatbot() {
      this.isOpen = !this.isOpen;
    },
    async sendMessage() {
      if (this.userMessage.trim()) {
        // Add user message to the chat
        this.messages.push({ text: this.userMessage, sender: "user" });
        const userQuestion = this.userMessage; // Save the user message before resetting
        this.userMessage = "";

        // Display a loading message
        this.messages.push({ text: "Typing...", sender: "bot" });

        try {
          // Send POST request to the backend API
          const response = await axios.post(this.apiUrl, { question: userQuestion });
          // Extract the bot's response from the API response
          const botResponse = response.data.answer;

          // Replace the loading message with the bot's response
          this.messages.pop(); // Remove "Typing..." message
          this.messages.push({ text: botResponse, sender: "bot" });
        } catch (error) {
          console.error("Error communicating with the chatbot API:", error);
          // Replace the loading message with an error message
          this.messages.pop();
          this.messages.push({ text: "Sorry, I couldn't process your query. Please try again later.", sender: "bot" });
        }
      }
    },
    clearChat() {
      this.messages = [{ text: "Hi! How can I assist you today?", sender: "bot" }];
    },
  },
};
</script>

  
  <style scoped>
  .chatbot-container {
    position: fixed;
    bottom: 30px;
    left: 30px;
    z-index: 1000;
  }
  
  /* Chatbot Button */
  .chatbot-button {
    background: linear-gradient(135deg, #1b93fb, #81c0c7);;
    border: none;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    position: relative;
  }

  .chatbot-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: calc(100% - 60px); /* Adjust height considering header space */
}


/* 
.messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9f9f9;
  max-height: calc(100% - 70px);
} 
*/

.messages {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9f9f9;
  max-height: calc(100% - 70px); /* Ensures input area does not overlap */
  height: 100%; /* Add this */
}


.input-area {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #ffffff;
  border-top: 1px solid #ddd;
  position: sticky;
  bottom: 0;
}

  
  .chatbot-button img {
    width: 40px;
    height: 40px;
    transition: transform 0.3s ease-in-out;
  }
  
  .chatbot-button:hover {
    transform: scale(1);
  }
  
  /* Chatbot Popup */
  .chatbot-popup {
  width: 400px;
  height: 600px; /* Ensure fixed height */
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
}

  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Header */
  .chatbot-header {
    background: linear-gradient(135deg, #1b93fb, #81c784);
    color: #fff;
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .chatbot-title {
    display: flex;
    align-items: center;
  }
  
  .chatbot-logo {
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  
  .header-buttons {
    display: flex;
    align-items: center;
  }
  
  .clear-chat-btn {
    background: #f44336;
    color: #fff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 10px;
    font-size: 14px;
  }
  
  .clear-chat-btn:hover {
    background: #d32f2f;
  }
  
  .close-btn {
    background: none;
    border: none;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: color 0.3s;
  }
  
  .close-btn:hover {
    color: #f44336;
  }
  

  
  .message {
    margin: 10px 0;
    max-width: 80%;
    word-wrap: break-word;
    padding: 10px 15px;
    border-radius: 10px;
    font-size: 14px;
    line-height: 1.5;
  }
  
  .user-message {
    align-self: flex-end;
    background-color: #1b93fb;
    color: #fff;
  }
  
  .bot-message {
    align-self: flex-start;
    background-color: #e0e0e0;
    color: #333;
  }
  
  .input-area input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 25px;
    outline: none;
    font-size: 14px;
  }
  
  .input-area button {
    background: none;
    border: none;
    margin-left: 10px;
    cursor: pointer;
  }
  
  .input-area button img {
    width: 30px;
    height: 30px;
    transition: transform 0.2s;
  }
  
  .input-area button:hover img {
    transform: scale(1.2);
  }
  </style>
  