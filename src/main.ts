import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

import App from './App.vue'
import router from './router'

import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min'

import './assets/main.styl'

import { messagePlugin } from '@/utils/message/messages-plugin'

const fbApp = initializeApp({
  apiKey: 'AIzaSyDKSCQVK0bmzJi3bR_cLnWqq3Gsd1Q1Vqs',
  authDomain: 'crm-budget-e096a.firebaseapp.com',
  projectId: 'crm-budget-e096a',
  storageBucket: 'crm-budget-e096a.appspot.com',
  messagingSenderId: '959958285881',
  appId: '1:959958285881:web:6a8f4330f48a3dc6b957e8',
})
const auth = getAuth(fbApp)

let app: any = null
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App)
    app.use(messagePlugin)
    app.use(createPinia())
    app.use(router)
    app.mount('#app')
  }
})
