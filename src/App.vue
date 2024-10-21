<template>
  <div id="app">
    <router-view></router-view>
    <AskVishAi />
  </div>
</template>

<script>
import AskVishAi from './components/AskVishAi.vue';

export default {
  name: 'App',
  components: {
    AskVishAi,
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}
</style>