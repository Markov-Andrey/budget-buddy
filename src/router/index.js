// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../pages/HelloWorld.vue';
import Layout from "@/components/Layout.vue";
import ReceiptsPage from "@/pages/ReceiptsPage";
import DiscordPage from "@/pages/DiscordPage.vue";

const routes = [
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                name: 'Home',
                component: HelloWorld
            },
            {
                path: '/receipts',
                name: 'Добавить чек',
                component: ReceiptsPage
            },
            {
                path: '/discord',
                name: 'Добавить чек',
                component: DiscordPage
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;