<!-- src/components/HelloWorld.vue -->
<template>
    <div class="p-4 sm:ml-64">
        <div>hello</div>
    </div>
</template>

<script>
// import axios from "../axios-instance.js";

export default {
    name: 'HelloWorld',
    data() {
        return {
            message: null,
        };
    },
    methods: {
        async fetchMessage() {

        },
    },
};
</script>

<style scoped>
/* Добавьте стили для компонента здесь */
</style>
