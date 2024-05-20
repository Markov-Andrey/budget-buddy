import { createApp } from 'vue';
import App from './App.vue';
import './assets/tailwind.css';
import 'flowbite';
import router from './router';

createApp(App).use(router).mount('#app');
