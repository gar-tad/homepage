<script setup>
    import {useAuthStore} from "@/stores/auth.js";

    const authStore = useAuthStore();
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body" data-bs-theme="dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">[project_name]</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#page_main_navbar" aria-controls="page_main_navbar" aria-expanded="true" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="navbar-collapse collapse" id="page_main_navbar">
                <ul class="navbar-nav mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link :to="{name: 'home'}" class="nav-link" activeClass="active">Home</router-link>
                    </li>
                </ul>
                <ul v-if="authStore.user" class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            {{ authStore.userName }}
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="#" @click.prevent="authStore.logOut">Log out</a></li>
                        </ul>
                    </li>
                </ul>
                <router-link v-else :to="{name: 'login'}" class="btn btn-outline-success ms-auto">Login</router-link>
            </div>
        </div>
    </nav>
</template>
