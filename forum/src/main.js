import { createApp } from 'vue'
import App from './App.vue'
import * as VueRouter from 'vue-router'

// Routing
import PageHome from '@/components/PageHome'

const routes = [
  { path: '/', component: PageHome },
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')
