<template>
    <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" class="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
    </button>

    <!-- Dropdown menu -->
    <div id="dropdownAvatar" class="z-10 hidden divide-y divide-gray-100 rounded-lg shadow w-44 dark:divide-gray-600">
        <div class="px-4 py-3 text-sm dark:text-white">
            <div>Bonnie Green</div>
            <div class="font-medium truncate">name@flowbite.com</div>
        </div>
        <ul class="py-2 text-sm" aria-labelledby="dropdownUserAvatarButton">
            <li>
                <a href="#" class="block px-4 py-2">Dashboard</a>
            </li>
        </ul>
        <div class="py-2">
            <a href="#" @click="logout" class="block px-4 py-2">Sign out</a>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/axios-instance';

export default {
    name: "ProfileDropdown",
    data() {
        return {};
    },
    methods: {
        logout() {
            axiosInstance.post('/auth/logout')
                .then(response => {
                    console.log('Logout success:', response.data);
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error('Logout error:', error);
                });
        }
    }
}
</script>

<style scoped>
</style>
