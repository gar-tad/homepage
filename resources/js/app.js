import './bootstrap';
import {createApp, markRaw} from "vue";
import app from './views/app.vue';
import router from "./routes/index.js";
import { createPinia } from 'pinia';

const pinia = createPinia();
pinia.use(({store}) => {
    store.router = markRaw(router);
});

const proj = createApp(app);

proj.use(router);
proj.use(pinia);
proj.mount('#app_root');
