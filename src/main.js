// main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Import Vuetify
import { createVuetify } from 'vuetify';
import 'vuetify/styles'; // Global CSS for Vuetify
import '@mdi/font/css/materialdesignicons.css'; // Optional: Import Material Design Icons

// Create a Vuetify instance
const vuetify = createVuetify();

const app = createApp(App);

// Use the router and vuetify in your app
app.use(router);
app.use(vuetify);

app.mount('#app');
