import {defineStore} from "pinia";
import {client, api} from "@/bootstrap.js";

export const useAuthStore = defineStore('authStore', {
    state: () => {
        return {
            errors: {},
            user: null
        }
    },
    getters: {
        userName: (state) => { return state.user.username.length > 0 ? state.user.username : state.user.email },
    },
    actions: {
        async getUser() {
            if (this.user) return;

            const token = localStorage.getItem('token');

            if (!token) {
                this.user = null;
                return
            }

            api.defaults.headers['authorization'] = `Bearer ${token}`
            client.defaults.headers['authorization'] = `Bearer ${token}`

            try {
                const response = await client.get('user');
                this.user = response.data;
            } catch (error) {
                this.user = null;
            }
        },
        async authenticate(action, event) {
            try {
                const formData = new FormData(event.target);
                const response = await client.post(action,formData);

                localStorage.setItem('token', response.data.token);
                api.defaults.headers['authorization'] = `Bearer ${response.data.token}`
                client.defaults.headers['authorization'] = `Bearer ${response.data.token}`
                this.user = response.data.user;
                this.errors = {};
                const redirect = this.user.is_admin ? 'admin.index' : 'home';
                this.router.push({name: redirect});
            } catch (error) {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
            }
        },
        async logOut() {
            await client.post('logout');

            localStorage.removeItem('token');
            this.user = null;
            this.errors = {};
            api.defaults.headers['authorization'] = null;
            client.defaults.headers['authorization'] = null;
            this.router.push({name: 'home'});
        },
        cleanError(errorKey) {
            delete this.errors[errorKey];
            delete this.errors['credentials'];
        }
    }
})
