import companiesIndexView from "@/views/companies/index.vue";
import companiesCreateView from "@/views/companies/create.vue";
import companiesEditView from "@/views/companies/edit.vue";
import companiesShowView from "@/views/companies/show.vue";
import companiesArchiveView from "@/views/companies/archive.vue";

export default [
    {
        path: '/companies',
        name: 'companies.index',
        component: companiesIndexView,
        meta: {
            auth: true
        }
    },
    {
        path: '/companies/archive',
        name: 'companies.archive',
        component: companiesArchiveView,
        meta: {
            auth: true
        }
    },
    {
        path: '/companies/create',
        name: 'companies.create',
        component: companiesCreateView,
        meta: {
            auth: true
        }
    },
    {
        path: '/companies/edit/:company',
        name: 'companies.edit',
        component: companiesEditView,
        meta: {
            auth: true
        }
    },
    {
        path: '/company/:company',
        name: 'companies.show',
        component: companiesShowView,
        meta: {
            auth: true
        }
    }
]
