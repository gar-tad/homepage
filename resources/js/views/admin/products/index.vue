<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-8 mx-auto">
                <div class="py-4">
                    <router-link :to="{name: 'products.create'}" class="btn btn-primary">
                        <i class="bi bi-plus"></i>
                        Create new product
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
