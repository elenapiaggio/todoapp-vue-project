import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.store'

import Login from '@/views/LoginView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login,
    },
    {
      path: '/tasks',
      name: 'Tasks',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TasksView.vue'),
      meta: { requiresAuth: true }
    },
  ],
})


router.beforeEach(async (to) => {
  const auth = useAuthStore()

  // Si accede a la raíz "/", lo redirigimos a /tasks si ya está logado
  if (to.path === '/') {
    if (!auth.user) {
      try {
        await auth.loadCurrentUser()
      } catch {
        return { name: 'login' }
      }
    }

    if (auth.user) {
      return { name: 'Tasks' }
    }
  }

  // Si la ruta requiere auth (como /tasks)
  if (to.meta.requiresAuth) {
    if (!auth.user) {
      try {
        await auth.loadCurrentUser()
      } catch {
        return { name: 'login' }
      }
    }

    if (!auth.user) {
      return { name: 'login' }
    }
  }
})


export default router
