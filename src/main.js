import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'

const app = createApp(App)

app.use(router)
app.use(store)

const requireComponent = require.context('./components/base', true, /Base[A-Z]\w+\.(vue|js)$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
  const componentName = fileName.split('/').pop().replace(/\.\w+$/, '')
  app.component(componentName, componentConfig.default || componentConfig)
})

app.mount('#app')
