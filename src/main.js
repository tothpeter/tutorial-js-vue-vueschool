import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import AppDate from '@/components/AppDate'

const app = createApp(App)

app.use(router)

app.component('AppDate', AppDate)

app.mount('#app')
