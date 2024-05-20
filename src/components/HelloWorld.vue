<!-- src/components/HelloWorld.vue -->
<template>
    <div>
        <h1>Hello World</h1>
        <p>Welcome to the Home page.</p>
        <button @click="fetchMessage">Fetch Message</button>
        <div v-if="message">
            <p>Message from API: {{ message }}</p>
        </div>
    </div>
</template>

<script>
import axios from "../axios.js";

export default {
    name: 'HelloWorld',
    data() {
        return {
            message: null,
        };
    },
    methods: {
        async fetchMessage() {
            try {
                const response = await axios.get('/hello');
                this.message = response.data.message;
            } catch (error) {
                console.error('Error fetching message:', error);
            }
        },
    },
};
</script>

<style scoped>
/* Добавьте стили для компонента здесь */
</style>
