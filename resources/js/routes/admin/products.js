import productsIndexView from "@/views/admin/products/index.vue";
import productsCreateView from "@/views/admin/products/create.vue";

export default [
    {
        path: 'products',
        name: 'products.index',
        component: productsIndexView
    },
    {
        path: 'products/create',
        name: 'products.create',
        component: productsCreateView
    },
]
