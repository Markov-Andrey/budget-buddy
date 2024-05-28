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
import axios from '/src/axios';

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
                const response = await axios.post('/auth/login', {
                    email: this.email,
                    password: this.password,
                    remember: true,
                });
                console.log(response);

                if (response.status === 200) {
                    this.$emit('authenticated');
                }
            } catch (error) {
                console.log(error);
                this.error = 'Invalid credentials';
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
