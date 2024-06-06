<template>
    <nav class="fixed top-0 z-50 w-full border-b border-gray-200 bg-transparent">
        <div class="px-3 py-3 lg:px-5 lg:pl-3">
            <div class="flex items-center justify-between">
                <div class="flex items-center justify-start rtl:justify-end">
                    <button data-drawer-target="logo-sidebar" data-drawer-toggle="logo-sidebar" aria-controls="logo-sidebar"
                            type="button"
                            class="inline-flex items-center p-2 text-sm rounded-lg sm:hidden focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400">
                        <span class="sr-only">Open sidebar</span>
                        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                            <path clip-rule="evenodd" fill-rule="evenodd"
                                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                    <router-link to="/" class="flex ms-2 md:me-24">
                        <img src="/assets/logo.svg" class="w-10 h-12 me-3" alt="Owl-Logo"/>
                        <div class="flex flex-col">
                            <span class="text-2xl font-bold font-serif italic">Budget Buddy</span>
                        </div>
                    </router-link>
                </div>
                <div class="flex items-center">
                    <ElementBalance />
                    <div class="flex items-center ms-3">
                        <ProfileDropdown />
                        <div
                                class="z-50 hidden my-4 text-base list-none divide-y divide-gray-100 rounded shadow dark:divide-gray-600"
                                id="dropdown-user">
                            <div class="px-4 py-3" role="none">
                                <p class="text-sm" role="none">
                                    Neil Sims
                                </p>
                                <p class="text-sm font-medium truncate" role="none">
                                    neil.sims@flowbite.com
                                </p>
                            </div>
                            <ul class="py-1" role="none">
                                <li>
                                    <a href="#"
                                       class="block px-4 py-2 text-sm"
                                       role="menuitem">Dashboard</a>
                                </li>
                                <li>
                                    <a href="#"
                                       class="block px-4 py-2 text-sm"
                                       role="menuitem">Settings</a>
                                </li>
                                <li>
                                    <a href="#"
                                       class="block px-4 py-2 text-sm"
                                       role="menuitem">Earnings</a>
                                </li>
                                <li>
                                    <a href="#"
                                       class="block px-4 py-2 text-sm"
                                       role="menuitem">Sign out</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import ElementBalance from "@/components/element/ElementBalance.vue";
import ProfileDropdown from "@/components/ProfileDropdown.vue";

export default {
    name: "ElementTopNav",
    components: {ProfileDropdown, ElementBalance}
}
</script>

<style scoped>

</style>