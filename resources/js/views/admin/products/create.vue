<script setup>
import {onMounted, reactive} from "vue";
import { useProductsStore } from "@/stores/products.js";
import {storeToRefs} from "pinia";

const { create, cleanError } = useProductsStore();
const { errors } = storeToRefs(useProductsStore());

const formData = reactive({
    title: 'Product 1',
    base_price: 500
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
                        <router-link :to="{ name: 'products.index' }" class="btn btn-link">
                            <i class="bi bi-arrow-left"></i>
                            back
                        </router-link>
                        Create new product
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="create(formData)">
                            <div class="mb-3">
                                <label for="title" class="form-label">Product title</label>
                                <input
                                    type="text"
                                    class="form-control"
                                    id="title"
                                    v-model="formData.title"
                                    v-on:keyup="keyUpHandler('title', $event)"
                                >
                                <div v-if="errors.title" class="form-text text-danger">{{ errors.title[0] }}</div>
                            </div>
                            <div class="mb-3">
                                <label for="base_price" class="form-label">Product base price</label>
                                <input
                                    type="number"
                                    class="form-control"
                                    id="base_price"
                                    v-model="formData.base_price"
                                    v-on:keyup="keyUpHandler('base_price', $event)"
                                    v-on:change="keyUpHandler('base_price', $event)"
                                    step="50"
                                >
                                <div v-if="errors.base_price" class="form-text text-danger">{{ errors.base_price[0] }}</div>
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
