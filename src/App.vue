<template>
    <div id="app">
        <Layout v-if="isAuthenticated" />
        <LoginForm v-else />
    </div>
</template>

<script>
import axios from './axios';
import Layout from "@/components/Layout.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
    name: 'App',
    components: {
        Layout,
        LoginForm
    },
    data() {
        return {
            isAuthenticated: false
        };
    },
    async created() {
        try {
            const response = await axios.get('/user');

            if (response.status === 200) {
                this.isAuthenticated = true;
            }
        } catch (error) {
            this.isAuthenticated = false;
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
