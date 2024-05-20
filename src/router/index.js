// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../components/HelloWorld.vue'; // Импортируйте ваш новый компонент

const routes = [
    {
        path: '/',
        name: 'Home',
        component: HelloWorld,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;