import './assets/main.css'

import { initializeApp } from 'firebase/app'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


const firebaseConfig = {
  apiKey: 'AIzaSyCc0LjApiF2KwKGAcegm6PjrJZ5wu-FLYg',
  authDomain: 'contactlist-egco427.firebaseapp.com',
  projectId: 'contactlist-egco427',
  storageBucket: 'contactlist-egco427.firebasestorage.app',
  messagingSenderId: '118454446582',
  appId: '1:118454446582:web:9e33ce92539d4764eaffd7',
}


initializeApp(firebaseConfig)
const app = createApp(App)



app.use(router)
app.use(store)

app.mount('#app')
