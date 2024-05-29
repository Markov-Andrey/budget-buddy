import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import 'flowbite';
import router from './router';
import {formatDate} from "@/services/dateFormatter";

const app = createApp(App);

app.config.globalProperties.$formatDate = formatDate;
app.use(router).mount('#app');