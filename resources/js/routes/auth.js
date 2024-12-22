import loginView from "@/views/auth/login.vue";
import registerView from "@/views/auth/register.vue";

export default [
    {
        path: '/login',
        name: 'login',
        component: loginView,
        meta: {
            guest: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: registerView,
        meta: {
            guest: true
        }
    },
]
