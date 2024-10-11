import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: import('../views/HomeView.vue'),
        },
        {
            path: '/a-propos',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
        },
        {
            path: '/contribuer',
            name: 'contribute',
            component: () => import('../views/ContributeView.vue'),
        },
        {
            path: '/definition',
            name: 'about',
            component: () => import('../views/DefinitionView.vue'),
        },
        {
            path: '/data-page',
            name: 'data-page',
            component: () => import('../views/DataPageView.vue'),
        },
        {
            path: '/mon-compte',
            name: 'dashboard',
            component: () => import('../views/DashboardView.vue'),
        }
    ],
});

export default router;
