import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import LandingPage from './components/LandingPage.vue'
import AdminConsole from './components/AdminConsole.vue'
import TeacherConsole from './components/TeacherConsole.vue'
import ChatBot from './components/ChatBot.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/landing', component: LandingPage },
  { path: '/admin', component: AdminConsole },
  { path: '/teacher', component: TeacherConsole },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router