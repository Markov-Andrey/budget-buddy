<template>
    <div>
        <button @click="toggleMenu" id="dropdownUserAvatarButton" data-dropdown-toggle="dropdownProfile" class="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300" type="button">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="user photo">
        </button>

        <div id="dropdownProfile" class="z-80 top-0 right-0 absolute hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 right-0 mt-12"> <!-- Обновлено -->
            <div class="px-4 py-3 text-sm text-gray-900">
                <div>Bonnie Green</div>
                <div class="font-medium truncate">name@flowbite.com</div>
            </div>
            <ul class="py-2 text-sm text-gray-700" aria-labelledby="dropdownUserAvatarButton">
                <li>
                    <a href="#" class="block px-4 py-2 hover:bg-gray-100">Dashboard</a>
                </li>
                <li>
                    <a href="#" @click="logout" class="block px-4 py-2 hover:bg-gray-100">Sign out</a> <!-- Обновлено -->
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/axios-instance';

export default {
    name: "ProfileDropdown",
    methods: {
        toggleMenu() {
            const dropdown = document.getElementById('dropdownProfile');
            dropdown.classList.toggle('hidden');
        },
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
