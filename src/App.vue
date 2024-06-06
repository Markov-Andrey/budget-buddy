<template>
    <div id="app">
        <Layout v-if="isAuthenticated" />
        <LoginForm v-else />
    </div>
</template>

<script>
import axiosInstance from '@/axios-instance';
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
            const response = await axiosInstance.get('/auth/user');
            if (response.status === 200) {
                this.isAuthenticated = true;
            }
        } catch (error) {
            this.isAuthenticated = false;
        }
    }
};
</script>

<style scoped>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    margin-top: 60px;
}
</style>
