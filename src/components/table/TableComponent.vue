<template>
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg flex justify-center">
        <table class="w-full">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
                <th v-for="(header, index) in headers" :key="index" scope="col" class="px-6 py-3">
                    {{ header }}
                </th>
                <th scope="col" class="px-6 py-3"><span class="sr-only">Edit</span></th>
            </tr>
            </thead>
            <tbody>
            <tr
                    v-for="(item, index) in data"
                    :key="index"
                    class="bg-white border-b hover:bg-gray-50"
            >
                <td class="px-6 py-4">
                    <!-- Modal toggle -->
                    <button data-modal-target="default-modal" data-modal-toggle="default-modal" class="" type="button">
                        <img v-if="item.image_path" :src="`${url}/${item.image_path}`" alt="Image thumbnail" class="thumbnail w-16 h-16 object-cover rounded" />
                    </button>

                    <!-- Main modal -->
                    <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-full max-w-2xl max-h-full">
                            <!-- Modal content -->
                            <div class="relative bg-white rounded-lg shadow">
                                <!-- Modal header -->
                                <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                    <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="default-modal">
                                        <IconClose classes="w-3 h-3"/>
                                    </button>
                                </div>
                                <!-- Modal body -->
                                <div class="p-4 md:p-5 space-y-4">
                                    <img v-if="item.image_path" :src="`${url}/${item.image_path}`" alt="Image thumbnail" class="thumbnail w-full h-full object-cover rounded" />
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4">{{ item.processed }}</td>
                <td class="px-6 py-4">{{ item.error }}</td>
                <td class="px-6 py-4">{{ item.annulled }}</td>
                <td class="px-6 py-4">{{ item.amount }}</td>
                <td class="px-6 py-4 text-right flex gap-2">
                    <router-link v-if="isShow" :to="`/show/${item.id}`"
                                 class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show
                    </router-link>
                    <router-link v-if="isEdit" :to="`/edit/${item.id}`"
                                 class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                    </router-link>
                    <router-link v-if="isDelete" :to="`/delete/${item.id}`"
                                 class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete
                    </router-link>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: "TableComponent",
    data() {
        return {
            url: process.env.VUE_APP_API_URL + 'storage/',
        };
    },
    props: {
        headers: {
            type: Array,
            default: () => []
        },
        data: {
            type: Array,
            default: () => []
        },
        isShow: {
            type: Boolean,
            default: false
        },
        isEdit: {
            type: Boolean,
            default: false
        },
        isDelete: {
            type: Boolean,
            default: false
        },
    }
}
</script>
<script setup>
import { onMounted } from 'vue'
import {
    initModals
} from 'flowbite'
import IconClose from "@/components/svg-icons/IconClose.vue";

onMounted(() => {
    initModals();
})
</script>

<style scoped>
</style>
