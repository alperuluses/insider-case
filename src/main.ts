import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { store } from './stores'
import '@/assets/styles/reset.scss'
import '@/assets/styles/global.scss'
createApp(App).use(store).mount('#app')
