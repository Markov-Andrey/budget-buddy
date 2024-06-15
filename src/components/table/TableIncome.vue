<template>
    <div>
        <!-- Форма для добавления новой записи -->
        <FormsIncomeAdd :subcategories="subcategories" @income-added="IncomeAdded"/>

        <!-- Таблица данных -->
        <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr class="px-6 py-3">
                <th class="px-6 py-3">Amount</th>
                <th class="px-6 py-3">User ID</th>
                <th class="px-6 py-3">Subcategory</th>
                <th class="px-6 py-3">Created At</th>
                <th class="px-6 py-3">-</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in incomeData"
                :key="item.id"
                class="transition-all overflow-hidden duration-75 h-auto"
                :class="{ 'bg-orange-300 collapsed h-0': deleteItems.includes(item.id) }
            ">
                <td class="px-6 py-4">{{ item.amount }}</td>
                <td class="px-6 py-4">{{ item.user_id }}</td>
                <td class="px-6 py-4">{{ getSubcategoryName(item.subcategory_id) }}</td>
                <td class="px-6 py-4">{{ formatRussianDate(item.created_at) }}</td>
                <td class="px-6 py-4 flex gap-1">
                    <div :id="`edit-${item.id}`">
                        <ButtonComponent icon="edit"/>
                    </div>
                    <div @mouseup="deleteItem(item.id)">
                        <ButtonComponent icon="delete"/>
                    </div>
                </td>
            </tr>
            </tbody>
        </table>

        <!-- Кнопка для загрузки следующей страницы -->
        <div class="flex justify-center mt-4" v-if="hasNextPage">
            <button @click="moreIncome" class="px-4 py-2 bg-gray-200 rounded">
                Load More
            </button>
        </div>
    </div>
</template>

<script>
import axiosInstance from "@/axios-instance";
import FormsIncomeAdd from "@/components/forms/FormsIncomeAdd.vue";
import ButtonComponent from "@/components/buttons/ButtonComponent.vue";

export default {
    name: "TableIncome",
    components: {ButtonComponent, FormsIncomeAdd },
    data() {
        return {
            incomeData: [],
            subcategories: [],
            totalItems: null,
            perPage: 5,
            deleteItems: [],
        };
    },
    computed: {
        hasNextPage() {
            return this.perPage < this.totalItems;
        }
    },
    methods: {
        IncomeAdded() {
            this.getIncome();
        },
        async deleteItem(item) {
            try {
                this.deleteItems.push(item);
                await axiosInstance.delete(`income/delete/${item}`);
                await this.getIncome();
            } catch (error) {
                console.error('Error getCategory:', error);
            }
        },
        async getCategory() {
            try {
                const response = await axiosInstance.get('/category/get-income');
                this.subcategories = response.data;
            } catch (error) {
                console.error('Error getCategory:', error);
            }
        },
        async getIncome() {
            try {
                const response = await axiosInstance.get(`/income/show/${this.perPage}`);

                this.incomeData = response.data.incomeData;
                this.totalItems = response.data.totalItems;
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching income:', error);
            }
        },
        async moreIncome() {
            this.perPage += this.perPage;
            await this.getIncome();
        },
        getSubcategoryName(subcategory_id) {
            const subcategory = this.subcategories.find(sub => sub.id === subcategory_id);
            return subcategory ? subcategory.name : '-';
        },
        formatRussianDate(dateString) {
            const date = new Date(dateString);
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const year = date.getFullYear();
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            const seconds = date.getSeconds().toString().padStart(2, '0');

            return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
        }
    },
    mounted() {
        this.getCategory();
        this.getIncome();
    }
};
</script>

<style scoped>

.collapsed {
    max-height: 0;
    opacity: 0;
    transition: max-height 0.5s ease-out, padding 0.5s ease-out, opacity 0.5s ease-out;
    td {
        overflow: hidden;
        max-height: 0;
        margin: 0;
        padding: 0;
        transition: max-height 0.5s ease-out, padding 0.5s ease-out, opacity 0.5s ease-out;
    }
}
</style>
