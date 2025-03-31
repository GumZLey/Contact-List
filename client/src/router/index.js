import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ContactListView from '@/views/ContactListView.vue'

const isAuthenticated = () => {
  return !!localStorage.getItem('authToken')
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactListView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    localStorage.removeItem('authToken') 
  }
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ name: 'login' }) 
  } else {
    next() 
  }
})

export default router
