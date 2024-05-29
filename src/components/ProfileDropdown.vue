<template>
    <button id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownAvatar" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
        <span class="sr-only">Open user menu</span>
        <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
    </button>

    <!-- Dropdown menu -->
    <div id="dropdownAvatar" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
        <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div>Bonnie Green</div>
            <div class="font-medium truncate">name@flowbite.com</div>
        </div>
        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
            <li>
                <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Dashboard</a>
            </li>
        </ul>
        <div class="py-2">
            <a href="#" @click="logout" class="block px-4 py-2 hover:bg-gray-100">Sign out</a>
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
