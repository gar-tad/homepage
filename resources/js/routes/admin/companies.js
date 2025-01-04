import companiesIndexView from "@/views/admin/companies/index.vue";
import companiesCreateView from "@/views/admin/companies/create.vue";
import companiesEditView from "@/views/admin/companies/edit.vue";
import companiesShowView from "@/views/admin/companies/show.vue";

export default [
    {
        path: 'companies',
        name: 'companies.index',
        component: companiesIndexView
    },
    {
        path: 'companies/create',
        name: 'companies.create',
        component: companiesCreateView
    },
    {
        path: 'companies/edit/:company',
        name: 'companies.edit',
        component: companiesEditView
    },
    {
        path: 'company/:company',
        name: 'companies.show',
        component: companiesShowView
    }
]
