import { createApp } from 'vue'
import App from './App.vue'
import route from './router'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

createApp(App).use(route).mount('#app')
