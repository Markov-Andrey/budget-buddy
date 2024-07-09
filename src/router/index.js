// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HelloWorld from '../pages/HelloWorld.vue';
import Layout from "@/components/Layout.vue";
import ReceiptsPage from "@/pages/ReceiptsPage";
import DiscordPage from "@/pages/DiscordPage.vue";
import PersonalInfoPage from "@/pages/PersonalInfoPage.vue";
import RunningCostsPage from "@/pages/RunningCostsPage.vue";
import InvestmentPage from "@/pages/InvestmentPage.vue";

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
                name: 'Дискорд',
                component: DiscordPage
            },
            {
                path: '/running-costs',
                name: 'Текущая информация',
                component: RunningCostsPage
            },
            {
                path: '/personal-info',
                name: 'Личная информация',
                component: PersonalInfoPage
            },
            {
                path: '/investment',
                name: 'Инвестиции',
                component: InvestmentPage
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});
router.beforeEach((to, from, next) => {
    document.title = to.name + ' - OwlBudget' || 'OwlBudget';
    next();
});

export default router;