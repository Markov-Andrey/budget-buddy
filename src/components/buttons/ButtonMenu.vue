<template>
    <RouterLink
        :to="route"
        class="flex items-center p-2 rounded-l-lg transition group"
        :class="{
            'bg-transparent': !isActive,
            'bg-white': isActive,
            'hover:bg-orange-400 hover:shadow-md': !isActive,
            'hover:text-white': !isActive
        }"
    >
        <component :is="iconComponent" :class="['w-5 h-5 transition duration-75', { 'group-hover:text-white': !isActive }]"/>
        <span :class="['ms-3 transition duration-75', { 'group-hover:text-white': !isActive }]">{{ buttonText }}</span>
    </RouterLink>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import IconMenuReceipt from "@/components/svg-icons/menu/IconMenuReceipt.vue";
import IconMenuDashboard from "@/components/svg-icons/menu/IconMenuDashboard.vue";
import IconMenuCamera from "@/components/svg-icons/menu/IconMenuCamera.vue";
import IconMenuDiscord from "@/components/svg-icons/menu/IconMenuDiscord.vue";
import IconMenuStatistics from "@/components/svg-icons/menu/IconMenuStatistics.vue";
import IconMenuChart from "@/components/svg-icons/menu/IconMenuChart.vue";

export default {
    name: "ButtonMenu",
    props: {
        route: {
            type: String,
            required: true
        },
        buttonText: {
            type: String,
            required: true
        },
        iconName: {
            type: String,
            default: null
        }
    },
    setup(props) {
        const route = useRoute();
        const isActive = computed(() => route.path === props.route);

        const iconComponent = computed(() => {
            return props.iconName ? iconMap[props.iconName] : null;
        });

        return { isActive, iconComponent };
    }
}

const iconMap = {
    IconMenuReceipt,
    IconMenuDashboard,
    IconMenuCamera,
    IconMenuDiscord,
    IconMenuStatistics,
    IconMenuChart,
};
</script>

<style scoped>
</style>
