// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../pages/HelloWorld.vue';
import Layout from "@/components/Layout.vue";
import ReceiptsPage from "@/pages/ReceiptsPage";
import DiscordPage from "@/pages/DiscordPage.vue";
import PersonalInfoPage from "@/pages/PersonalInfoPage.vue";
import RunningCostsPage from "@/pages/RunningCostsPage.vue";

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
                name: 'Мои чеки',
                component: ReceiptsPage
            },
            {
                path: '/discord',
                name: 'Добавить чек',
                component: DiscordPage
            },
            {
                path: '/running-costs',
                name: 'Текучка',
                component: RunningCostsPage
            },
            {
                path: '/personal-info',
                name: 'Личная информация',
                component: PersonalInfoPage
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;