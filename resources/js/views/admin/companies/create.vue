<script setup>
    import {onMounted, reactive} from "vue";
    import { useCompaniesStore } from "@/stores/companies.js";
    import {storeToRefs} from "pinia";

    const { create, cleanError } = useCompaniesStore();
    const { errors } = storeToRefs(useCompaniesStore());

    const formData = reactive({
        name: 'Company 1',
        email: 'mail1@mail.ru'
    });

    function keyUpHandler(action, event) {
        if (event.keyCode !== 13) cleanError(action);
    }

    onMounted(() => (errors.value = {}));
</script>
<template>
    <div class="container py-4">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <div class="card">
                    <div class="card-header">
                        <router-link :to="{ name: 'companies.index' }" class="btn btn-link">
                            <i class="bi bi-arrow-left"></i>
                            back
                        </router-link>
                        Create new company
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="create(formData)">
                            <div class="mb-3">
                                <label for="name" class="form-label">Company name</label>
                                <input type="text" class="form-control" id="name" v-model="formData.name" v-on:keyup="keyUpHandler('name', $event)">
                                <div v-if="errors.name" class="form-text text-danger">{{ errors.name[0] }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Company e-mail address</label>
                                <input type="text" class="form-control" id="email" v-model="formData.email" v-on:keyup="keyUpHandler('email', $event)">
                                <div v-if="errors.email" class="form-text text-danger">{{ errors.email[0] }}</div>
                            </div>
                            <div class="row">
                                <div class="col-lg-6">
                                    <button type="submit" class="btn btn-primary">
                                        <i class="bi bi-floppy"></i>
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
