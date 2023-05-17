import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Routing
import PageHome from '@/components/PageHome'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: PageHome,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
