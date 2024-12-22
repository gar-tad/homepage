<script setup>
import {onMounted, reactive} from "vue";
    import {useAuthStore} from "@/stores/auth.js";
    import {storeToRefs} from "pinia";

    const { authenticate, cleanError } = useAuthStore();
    const { errors } = storeToRefs(useAuthStore());

    const formData = reactive({
        email: 'user1@mail.ru',
        password: 'password',
        password_confirmation : 'password'
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
                        Create new profile
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="authenticate('register', formData)">
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
                            <div class="mb-3">
                                <label for="password_confirm" class="form-label">Confirm password</label>
                                <input type="password" class="form-control" id="password_confirm" v-model="formData.password_confirmation">
                            </div>
                            <button type="submit" class="btn btn-primary">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

