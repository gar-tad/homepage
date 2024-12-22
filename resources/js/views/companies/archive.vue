<script setup>
import {useCompaniesStore} from "@/stores/companies.js";
import {onMounted, ref} from 'vue';
import {storeToRefs} from "pinia";
import * as bootstrap from 'bootstrap'

const { getArchive } = useCompaniesStore();
const { companies } = storeToRefs(useCompaniesStore());

// let confirmDialog = null;

let selectedCompany = ref({
    id: '',
    name: ''
});

onMounted( () => {
    getArchive();
})

// function initRemoveConfirmation(company) {
//     selectedCompany.value = company;
//     confirmDialog = new bootstrap.Modal('#remove_company_dialogue');
//     confirmDialog.show();
// }

// async function destroy() {
//     await remove(selectedCompany.value.id);
//     confirmDialog.hide();
// }
</script>
<template>
    <div class="container py-4">
        <div class="row">
            <div class="col-lg-6 mx-auto">
                <div class="card">
                    <div class="card-body">
                        <h4 class="py-4 text-center">Archived companies</h4>
                        <div class="py-2">
                            <router-link :to="{ name: 'companies.index' }" class="btn btn-link">
                                <i class="bi bi-arrow-left"></i>
                                back
                            </router-link>
                        </div>
                        <div class="py-2">
                            <table class="table text-center">
                                <thead>
                                <tr>
                                    <th>Company name</th>
                                    <th>Company email</th>
<!--                                    <td>Actions</td>-->
                                </tr>
                                </thead>
                                <tbody v-if="companies.length > 0">
                                <tr v-for="company in companies" :key="`company_${company.id}`">
                                    <td>
                                        <router-link :to="{ name: 'companies.show', params: { company: company.id } }">
                                            {{ company.name }}
                                        </router-link>
                                    </td>
                                    <td>{{ company.email }}</td>
<!--                                    <td>-->
<!--                                        <div class="row">-->
<!--                                            <div class="col-6 text-center">-->
<!--                                                <router-link :to="{ name: 'companies.edit', params: {company: company.id} }" class="btn btn-sm btn-secondary">-->
<!--                                                    <i class="bi bi-pencil-square"></i>-->
<!--                                                </router-link>-->
<!--                                            </div>-->
<!--                                            <div class="col-6 text-center">-->
<!--                                                <button type="button" class="btn btn-sm btn-danger" @click="initRemoveConfirmation(company)">-->
<!--                                                    <i class="bi bi-trash3"></i>-->
<!--                                                </button>-->
<!--                                            </div>-->
<!--                                        </div>-->
<!--                                    </td>-->
                                </tr>
                                </tbody>
                                <tbody v-else>
                                <tr>
                                    <td colspan="3" class="text-center">No registered companies</td>
                                </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<!--    <div id="remove_company_dialogue" class="modal fade" tabindex="-1">-->
<!--        <div class="modal-dialog">-->
<!--            <div class="modal-content">-->
<!--                <div class="modal-body">-->
<!--                    <p>Are you sure you want to archive <span class="text-danger">{{selectedCompany.name}}</span></p>-->
<!--                    <div class="text-center">-->
<!--                        <button type="button" class="btn btn-secondary me-1" data-bs-dismiss="modal">-->
<!--                            <i class="bi bi-x"></i>-->
<!--                            Cancel-->
<!--                        </button>-->
<!--                        <button type="button" @click="destroy" class="btn btn-danger ms-1">Delete</button>-->
<!--                    </div>-->
<!--                </div>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
</template>
