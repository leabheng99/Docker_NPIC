import Signin from '@/components/auth/Signin.vue';
import Signout from '@/components/auth/Signout.vue';
import Signup from '@/components/auth/Signup.vue';
import Dashboard from '@/components/pages/Dashboard.vue';
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'auth.signin',
      component: Signin,
      meta: { requiresGuest: true }
    },
    {
      path: '/signout',
      name: 'auth.signout',
      component: Signout,
    },
    {
      path: '/signup',
      name: 'auth.signup',
      component: Signup,
      meta: { requiresGuest: true }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: { requiresAuth: true }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard',
    }
  ],
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next({ name: 'auth.signin' });
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next({ name: 'dashboard' });
  } else {
    next();
  }
});

export default router
