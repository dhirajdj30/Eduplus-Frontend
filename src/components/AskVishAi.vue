<template>
  <div class="ask-vishai">
    <div v-if="showChat" class="chat-container" id="fastbots-chat"></div>
  </div>
</template>

<script>
export default {
  name: 'AskVishAi',
  data() {
    return {
      showChat: false,
    };
  },
  methods: {
    toggleChat() {
      this.showChat = !this.showChat;
      this.$nextTick(() => {
        if (this.showChat) {
          this.loadFastBotsChat();
        }
      });
    },
    loadFastBotsChat() {
      if (window.FastBots) {
        window.FastBots.init({ botId: 'clz867b1g0191nibcmbrlgint' });
      }
    }
  },
};
</script>

<style scoped>
.ask-vishai {
  position: fixed;
  bottom: 1px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.ask-vishai-button {
  background-color: #25d366;
  color: #fff;
  border: none;
  padding: 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.chat-icon {
  width: 30px;
  height: 30px;
}

.chat-container {
  width: 350px;
  height: 500px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
}
</style>
