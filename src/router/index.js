// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../pages/HelloWorld.vue';
import Layout from "@/components/Layout.vue";

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Home',
                component: HelloWorld
            }
            // Добавьте другие маршруты здесь
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;