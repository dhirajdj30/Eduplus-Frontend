<template>
    <div :class="['message', isUser ? 'user' : 'bot']">
      <div class="avatar">{{ isUser ? 'U' : 'B' }}</div>
      <div class="content">{{ content }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      content: { type: String, required: true },
      isUser: { type: Boolean, default: false },
    },
  };
  </script>
  
  <style scoped>
  .message {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .message.bot {
    justify-content: flex-start;
  }
  .message.user {
    justify-content: flex-end;
  }
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #0078d7;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
  }
  .content {
    max-width: 70%;
    padding: 10px;
    border-radius: 10px;
    background: #e0e0e0;
  }
  .message.user .content {
    background: #0078d7;
    color: white;
  }
  </style>
  