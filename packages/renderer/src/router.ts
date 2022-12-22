import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [{ path: '/', component: () => import('./components/HelloWorld.vue') }];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
