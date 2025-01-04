import {createRouter, createWebHistory} from "vue-router";
import homeView from '../views/homepage.vue';
import authRoutes from './auth.js';
import adminRoutes from './admin/index.js';


import {useAuthStore} from "@/stores/auth.js";

const routes = [
    {
        path: '/',
        name: 'home',
        component: homeView
    },
    ...authRoutes,
    ...adminRoutes
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore();
    await authStore.getUser();

    if (authStore.user && to.meta.guest) return { name: 'home' };
    if (!authStore.user && to.meta.auth) return { name: 'login' };
    if (authStore.user && !authStore.user.is_admin && to.meta.admin) return { name: 'home' };
})

export default router;
