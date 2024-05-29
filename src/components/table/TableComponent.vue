<template>

    <table class="w-full">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
            <th v-for="(header, index) in headers" :key="index" scope="col" class="px-6 py-3">
                {{ header }}
            </th>
        </tr>
        </thead>
    </table>
    <div v-for="(item, index) in data" :key="index" class="bg-white border-b hover:bg-gray-50">
        <div :id="`accordion-open-${item.id}`" data-accordion="open">
            <!-- Accordion header -->
            <div :id="`accordion-open-heading-${item.id}`">
                <button type="button"
                        class="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 hover:bg-gray-100 gap-3"
                        :data-accordion-target="`#accordion-open-body-${item.id}`"
                        :aria-controls="`accordion-open-body-${item.id}`">
                    <div class="flex justify-between items-stretch w-full">
                        <div class="px-6 py-4">
                            <!-- Modal toggle -->
                            <button data-modal-target="default-modal" data-modal-toggle="default-modal" type="button">
                                <img v-if="item.image_path" :src="`${url}/${item.image_path}`" alt="Image thumbnail"
                                     class="thumbnail w-16 h-16 object-cover rounded"/>
                            </button>

                            <!-- Main modal -->
                            <div id="default-modal" tabindex="-1" aria-hidden="true"
                                 class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                                <div class="relative p-4 w-full max-w-2xl max-h-full">
                                    <!-- Modal content -->
                                    <div class="relative bg-white rounded-lg shadow">
                                        <!-- Modal header -->
                                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                                            <button type="button"
                                                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                                    data-modal-hide="default-modal">
                                                <IconClose classes="w-3 h-3"/>
                                            </button>
                                        </div>
                                        <!-- Modal body -->
                                        <div class="p-4 md:p-5 space-y-4">
                                            <img v-if="item.image_path" :src="`${url}/${item.image_path}`"
                                                 alt="Image thumbnail"
                                                 class="thumbnail w-full h-full object-cover rounded"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="px-6 py-4">
                            <ElementBoolean :bool="item.processed"/>
                        </div>
                        <div class="px-6 py-4">
                            <ElementBoolean :bool="item.error"/>
                        </div>
                        <div class="px-6 py-4">
                            <ElementBoolean :bool="item.annulled"/>
                        </div>
                        <div class="px-6 py-4">
                            {{ item.amount }}
                        </div>
                        <div class="px-6 py-4">
                            {{ formatDate(item.datetime) }}
                        </div>
                        <div class="px-6 py-4">
                            <router-link v-if="isShow" :to="`/show/${item.id}`"
                                         class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Show
                            </router-link>
                            <router-link v-if="isEdit" :to="`/edit/${item.id}`"
                                         class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit
                            </router-link>
                            <router-link v-if="isDelete" :to="`/delete/${item.id}`"
                                         class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete
                            </router-link>
                        </div>
                    </div>
                    <IconAccordion v-if="item.data.length" :classes="`w-3 h-3 rotate-180 shrink-0`"/>
                </button>
            </div>
            <!-- Accordion body -->
            <div v-if="item.data" :id="`accordion-open-body-${item.id}`" class="hidden"
                 :aria-labelledby="`accordion-open-heading-${item.id}`">
                <table v-if="item.data.length" class="p-5 border border-t-0 border-gray-200 dark:border-gray-700 w-full">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 w-full">
                    <tr>
                        <th class="px-3 py-2" scope="col">№</th>
                        <th class="px-3 py-2" scope="col">Название</th>
                        <th class="px-3 py-2" scope="col">Кол-во</th>
                        <th class="px-3 py-2" scope="col">Вес/объем</th>
                        <th class="px-3 py-2" scope="col">Цена за 1 ед / полный вес</th>
                        <th class="px-3 py-2" scope="col">Субкатегория</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr class="bg-white w-full" v-for="(item, index) in item.data" :key="index">
                        <td class="px-3 py-2">{{ index + 1 }}</td>
                        <td class="px-3 py-2">{{ item.name }}</td>
                        <td class="px-3 py-2">{{ item.quantity }}</td>
                        <td class="px-3 py-2">{{ item.weight }}</td>
                        <td class="px-3 py-2">{{ item.price }}</td>
                        <td class="px-3 py-2">{{ item.subcategory ? item.subcategory.name : '-' }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
import {onMounted} from 'vue'
import {
    initAccordions,
    initModals
} from 'flowbite'
import IconClose from "@/components/svg-icons/IconClose.vue";
import ElementBoolean from "@/components/element/ElementBoolean.vue";
import {formatDate} from "@/services/dateFormatter";
import IconAccordion from "@/components/svg-icons/IconAccordion.vue";

onMounted(() => {
    initAccordions();
    initModals();
})
</script>

<style scoped>
</style>
