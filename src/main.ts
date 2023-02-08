import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'

import './assets/main.styl'
import { myPlugin } from '@/utils/message/messages-plugin'

const app = createApp(App)

app.use(myPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
