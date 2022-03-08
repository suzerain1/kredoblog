require('./bootstrap');

import { createApp } from 'vue';
import router from './router'
import Home from './components/Home.vue';
import axios from "axios";

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

createApp({
    components: {
        Home
    }
}).use(router).mount('#app');
