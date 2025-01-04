import {defineStore} from "pinia";
import {api} from "@/bootstrap.js";

export const useProductsStore = defineStore('productsStore', {
    state: () => {
        return {
            products: [],
            errors: {},
            product: null
        }
    },
    actions: {
        // async getAll(params) {
        //     params = JSON.stringify(params);
        //     const response = await api.get('companies', {
        //         params: {
        //             search: params
        //         }
        //     });
        //     this.companies = response.data;
        // },
        // async getArchive() {
        //     const response = await api.get('companies/archive');
        //     this.companies = response.data;
        // },
        // async getCompany(companyId) {
        //     try {
        //         const response = await api.get(`/companies/${companyId}`);
        //         this.company = response.data;
        //     } catch (error) {
        //         // todo redirect to 404
        //         console.log(error.status);
        //         if (error.status === 404 || error.status === 403) this.router.push({name: 'companies.index'});
        //     }
        // },
        async create(formData) {
            try {
                await api.post('products',formData);
                // this.router.push({name: 'products.index'});
            } catch (error) {
                if (error.response) {
                    this.errors = error.response.data.errors;
                }
            }
        },
        // async edit(companyId, formData) {
        //     try {
        //         const response = await api.put(`/companies/${companyId}`, formData);
        //         this.router.push({name: 'companies.index'});
        //     }  catch (error) {
        //         if (error.status === 404 || error.status === 403) this.router.push({name: 'companies.index'});
        //
        //         if (error.response) {
        //             this.errors = error.response.data.errors;
        //         }
        //     }
        // },
        // async remove(companyId) {
        //     try {
        //         await api.delete(`companies/${companyId}`);
        //         this.companies = this.companies.filter((company) => company.id !== companyId);
        //     } catch (error) {
        //         return false;
        //     }
        // },
        // async setLogo(companyId, uploadedFile) {
        //     const formData = new FormData();
        //     formData.append('logo', uploadedFile);
        //
        //     const response = await api.post(`/companies/${companyId}/set-logo`, formData, {
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         }
        //     });
        //
        //     this.company = response.data;
        // },
        cleanError(errorKey) {
            delete this.errors[errorKey];
        }
    }
})
