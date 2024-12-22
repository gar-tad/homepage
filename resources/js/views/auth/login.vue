<script setup>
    import {onMounted, reactive} from "vue";
    import {useAuthStore} from "@/stores/auth.js";
    import {storeToRefs} from "pinia";

    const { authenticate, cleanError } = useAuthStore();
    const { errors } = storeToRefs(useAuthStore());

    const formData = reactive({
        email: 'user1@mail.ru',
        password: 'password'
    });

    function keyUpHandler(action, event) {
        if (event.keyCode !== 13) cleanError(action);
    }

    onMounted(() => (errors.value = {}));
</script>
<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-6 mx-auto my-4">
                <div class="card">
                    <div class="card-header">
                        Log in to your profile
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="authenticate('login', formData)">
                            <div v-if="errors.credentials" class="mb-3">
                                <p class="text-danger">{{ errors.credentials[0] }}</p>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email address</label>
                                <input type="text" class="form-control" id="email" v-model="formData.email" v-on:keyup="keyUpHandler('email', $event)">
                                <div v-if="errors.email" class="form-text text-danger">{{ errors.email[0] }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" v-model="formData.password" v-on:keyup="cleanError('password')">
                                <div v-if="errors.password" class="form-text text-danger">{{ errors.password[0] }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <button type="submit" class="btn btn-primary">Log in</button>
                                </div>
                                <div class="col-lg-6 text-end">
                                    <span class="text-info">Doesn't have an account yet? Register</span>
                                    <router-link :to="{name: 'register'}" class="btn btn-link ms-auto">Register</router-link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
