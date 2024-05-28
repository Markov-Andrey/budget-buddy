<template>
    <div class="login-form">
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Login</button>
            <div v-if="error" class="error">{{ error }}</div>
        </form>
    </div>
</template>

<script>
import axiosInstance from '@/axios-instance';

export default {
    data() {
        return {
            email: '',
            password: '',
            error: null
        };
    },
    methods: {
        async login() {
            try {
                const response = await axiosInstance.post('/auth/login', {
                    email: this.email,
                    password: this.password,
                    remember: true
                });

                if (response.status === 200) {
                    localStorage.setItem('token', response.data.token);
                    this.$emit('authenticated');
                }
            } catch (error) {
                if (error.response) {
                    console.log('Error response:', error.response);
                    this.error = error.response.data.message || 'Invalid credentials';
                } else {
                    console.log('Error message:', error.message);
                    this.error = 'Request setup error';
                }
            }
        }
    }
};
</script>

<style scoped>
.login-form {
    /* добавьте стили для вашей формы */
}
.error {
    color: red;
}
</style>
