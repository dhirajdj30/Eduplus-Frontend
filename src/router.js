import { createRouter, createWebHistory } from 'vue-router'
import Login from './components/Login.vue'
import LandingPage from './components/LandingPage.vue'
import AdminConsole from './components/AdminConsole.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/landing', component: LandingPage },
  { path: '/admin', component: AdminConsole },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router