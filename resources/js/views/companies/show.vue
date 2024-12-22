<script setup>
import {onMounted, ref} from "vue";
    import {useCompaniesStore} from "@/stores/companies.js";
    import {storeToRefs} from "pinia";
    import {useRoute} from "vue-router";
    import Croppie from "croppie";

    const { getCompany, setLogo } = useCompaniesStore();
    const { company } = storeToRefs(useCompaniesStore());

    const route = useRoute();

    const uploadedLogo = ref(null);

    onMounted(async () => {
        await getCompany(route.params.company);
    });

    function setUploadedLogo(event) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);

        reader.onload = (event) => {
            if (uploadedLogo.value) uploadedLogo.value.destroy();

            uploadedLogo.value = new Croppie(document.getElementById('croppie_container'), {
                viewport: {
                    width: 200,
                    height: 200,
                    type: 'circle'
                },
                boundary: {
                    width: 500,
                    height: 500
                },
                mouseWheelZoom: false
            })

            uploadedLogo.value.bind({
                url: event.target.result,
            });
        }

    }

    function  saveUploadedLogo(remove = false) {
        if (remove) {
            setLogo(route.params.company, null);
            return;
        }

        uploadedLogo.value.result({
            type: 'blob'
        }).then(async function(blob) {
            await setLogo(route.params.company, blob);
            resetUpload();
        });
    }

    function resetUpload() {
        uploadedLogo.value.destroy();
        uploadedLogo.value = null;
    }
</script>
<template>
    <div v-if="company" class="container">
        <div class="row">
            <div class="col-lg-6 mx-auto py-4">
                <header class="py-4">
                    <h2 class="text-center">
                        {{ company.name }}
                    </h2>
                    <p>
                        <router-link :to="{ name: 'companies.index' }" class="btn btn-link">
                            <i class="bi bi-arrow-left"></i>
                            back
                        </router-link>
                    </p>
                </header>
                <div v-show="uploadedLogo">
                    <div id="croppie_container"></div>
                    <div class="text-center">
                        <button type="button" @click="saveUploadedLogo()" class="btn btn-primary me-1">
                            <i class="bi bi-floppy"></i>
                            Save
                        </button>
                        <button type="button" @click="resetUpload" class="btn btn-danger ms-1">
                            <i class="bi bi-x"></i>
                            Cancel
                        </button>
                    </div>
                </div>
                <div v-show="!uploadedLogo" class="text-center">
                    <img v-if="company.logo" :src="company.logo_url" alt="{{ company.name }}">
                    <div class="py-4">
                        <input type="file" id="logo_upload_input" @change="setUploadedLogo($event)" hidden="hidden" accept="image/*">
                        <label for="logo_upload_input" class="btn btn-secondary me-1">
                            <i class="bi bi-upload"></i>
                            Upload logo
                        </label>
                        <button type="button" @click="saveUploadedLogo(true)" class="btn btn-danger ms-1">
                            <i class="bi bi-x"></i>
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
