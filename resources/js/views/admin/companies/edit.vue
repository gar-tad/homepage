<script setup>
    import {onMounted} from "vue";
    import { useCompaniesStore } from "@/stores/companies.js";
    import {storeToRefs} from "pinia";
    import { useRoute } from 'vue-router';

    const { getCompany, edit, cleanError } = useCompaniesStore();
    const { company, errors } = storeToRefs(useCompaniesStore());

    const route = useRoute();

    function keyUpHandler(action, event) {
        if (event.keyCode !== 13) cleanError(action);
    }

    onMounted(async () => {
        errors.value = {};
        await getCompany(route.params.company);
    });
</script>
<template>
    <div v-if="company" class="container py-4">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <div class="card">
                    <div class="card-header">
                        <router-link :to="{ name: 'companies.index' }" class="btn btn-link">
                            <i class="bi bi-arrow-left"></i>
                            back
                        </router-link>
                        Edit company
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="edit(route.params.company, company)">
                            <div class="mb-3">
                                <label for="name" class="form-label">Company name</label>
                                <input type="text" class="form-control" id="name" v-model="company.name" v-on:keyup="keyUpHandler('name', $event)">
                                <div v-if="errors.name" class="form-text text-danger">{{ errors.name[0] }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="email" class="form-label">Company e-mail address</label>
                                <input type="text" class="form-control" id="email" v-model="company.email" v-on:keyup="keyUpHandler('email', $event)">
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
