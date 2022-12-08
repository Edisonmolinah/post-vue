import { createApp } from 'vue'
import App from './App.vue'
import route from '../routes/router.js';
import 'bootstrap/dist/css/bootstrap.css'
import bootstrap from 'bootstrap/dist/js/bootstrap.bundle.js'

createApp(App).use(bootstrap).use(route).mount('#app')
