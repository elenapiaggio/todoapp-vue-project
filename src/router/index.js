import { createRouter, createWebHistory } from 'vue-router'

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
    },
  ],
})

export default router
