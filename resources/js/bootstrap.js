import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const api = axios.create({
    baseURL: 'http://homepage.test/api/',
    headers: {
        Accept: 'application/json',
        "Content-Type": 'application/json'
    }
});


