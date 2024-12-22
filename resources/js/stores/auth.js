import {defineStore} from "pinia";
import {api} from "@/bootstrap.js";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            errors: {},
            user: null
        }
    },
    getters: {
        userName: (state) => { return state.user.username ?? state.user.email },
    },
    actions: {
        async getUser() {
            const token = localStorage.getItem('token');
            if (!token) return null;

            api.defaults.headers['authorization'] = `Bearer ${token}`

            try {
                const response = await api.get('user');
                this.user = response.data;
            } catch (error) {
                this.user = null;
            }
        },
        async authenticate(action, formData) {
            try {
                const response = await api.post(action,formData);

                localStorage.setItem('token', response.data.token);
                api.defaults.headers['authorization'] = `Bearer ${response.data.token}`
                this.user = response.data.user;
                this.errors = {};
                this.router.push({name: 'home'});
            } catch (error) {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
            }
        },
        async logOut() {
            await api.post('logout');

            localStorage.removeItem('token');
            this.user = null;
            this.errors = {};
            delete api.defaults.headers['authorization'];
            this.router.push({name: 'home'});
        },
        cleanError(errorKey) {
            delete this.errors[errorKey];
            delete this.errors['credentials'];
        }
    }
})
