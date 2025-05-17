import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '@/clients/supabase';

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
  if (to.meta.requiresAuth) {
    // recupera la sesión actual
    const { data: { session } } = await supabase.auth.getSession()

    // si no hay sesión, redirige a login
    if (!session) {
      return { name: 'login' }
    }
  }
  // si no requiere auth o hay sesión, sigue adelante
})

export default router
