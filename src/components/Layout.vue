<template>
    <ElementTopNav/>

    <aside id="logo-sidebar"
           class="complex-bg-green fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full sm:translate-x-0"
           aria-label="Sidebar">
        <div class="h-full pb-4 overflow-y-auto font-medium">
            <ButtonMenu route="/" buttonText="Dashboard" iconName="IconMenuDashboard"/>
            <ButtonMenu route="/discord" buttonText="Discord" iconName="IconMenuDiscord"/>
            <ButtonMenu route="/receipts" buttonText="Мои чеки" iconName="IconMenuReceipt"/>
            <ButtonMenu route="/running-costs" buttonText="Текущие расходы" iconName="IconMenuStatistics"/>
            <ButtonMenu route="/personal-info" buttonText="Личная статистика" iconName="IconMenuChart"/>
            <ButtonMenu route="/investment" buttonText="Инвестиции" iconName="IconMenuStatistics"/>
        </div>
    </aside>

    <main>
        <router-view/>
    </main>
</template>

<script>
import ElementTopNav from "@/components/element/ElementTopNav.vue";
import ButtonMenu from "@/components/buttons/ButtonMenu.vue";

export default {
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Layout",
    components: {ElementTopNav, ButtonMenu}
}
</script>
<script setup>
// Макет для использования индивидуально в компонентах
import {onMounted} from 'vue'
import {
    initAccordions,
    initCarousels,
    initCollapses,
    initDials,
    initDismisses,
    initDrawers,
    initDropdowns,
    initModals,
    initPopovers,
    initTabs,
    initTooltips
} from 'flowbite'

// Инициализация всех flowbite компонентов
onMounted(() => {
    initAccordions();
    initCarousels();
    initCollapses();
    initDials();
    initDismisses();
    initDrawers();
    initDropdowns();
    initModals();
    initPopovers();
    initTabs();
    initTooltips();
})
</script>

<style scoped>

</style>