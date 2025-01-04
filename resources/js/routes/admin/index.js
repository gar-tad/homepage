import companiesRoutes from './companies.js';
import productsRoutes from './products.js';
import AdminIndexView from '../../views/admin/index.vue';

export default [
    {
        path: '/admin',
        meta: {
            auth: true
        },
        children: [
            {
                path: '',
                component: AdminIndexView,
                name: 'admin.index'
            },
            ...companiesRoutes,
            ...productsRoutes,
        ]
    },
]
