<script setup>
    import {useAuthStore} from "@/stores/auth.js";
    import AdminTemplate from "@/views/admin/adminTemplate.vue";
    import GuestTemplate from "@/views/guestTemplate.vue";

    const authStore = useAuthStore();
</script>
<template>
    <header>
        <AdminTemplate v-if="authStore.user && authStore.user.is_admin"/>
        <GuestTemplate v-else/>
    </header>
    <main><router-view/></main>
</template>
