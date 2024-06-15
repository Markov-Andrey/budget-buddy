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
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in incomes" :key="item.id" class="bg-white border-b">
                <td class="px-6 py-4">{{ item.amount }}</td>
                <td class="px-6 py-4">{{ item.user_id }}</td>
                <td class="px-6 py-4">{{ getSubcategoryName(item.subcategory_id) }}</td>
                <td class="px-6 py-4">{{ formatRussianDate(item.created_at) }}</td>
            </tr>
            </tbody>
        </table>

        <!-- Кнопка для загрузки следующей страницы -->
        <div class="flex justify-center mt-4" v-if="hasNextPage">
            <button @click="fetchNextPage" class="px-4 py-2 bg-gray-200 rounded">
                Load More
            </button>
        </div>
    </div>
</template>

<script>
import axiosInstance from "@/axios-instance";
import FormsIncomeAdd from "@/components/forms/FormsIncomeAdd.vue";

export default {
    name: "TableIncome",
    components: { FormsIncomeAdd },
    data() {
        return {
            income: [],
            subcategories: [],
            currentPage: 1,
            perPage: 10,
            totalPages: 1
        };
    },
    computed: {
        incomes() {
            return this.income;
        },
        hasNextPage() {
            return this.currentPage < this.totalPages;
        }
    },
    methods: {
        IncomeAdded() {
            this.fetchIncome();
        },
        async fetchIncome() {
            try {
                const response = await axiosInstance.get('/income/index', {
                    params: {
                        page: this.currentPage,
                        per_page: this.perPage
                    }
                });
                if (response && response.data && response.data.incomes) {
                    this.income = [...this.income, ...response.data.incomes.data];
                    this.subcategories = response.data.subcategories;
                    this.totalPages = response.data.incomes.last_page;
                    console.log(response.data);
                } else {
                    console.error('Invalid response format:', response);
                }
            } catch (error) {
                console.error('Error fetching income:', error);
            }
        },
        async fetchNextPage() {
            if (this.hasNextPage) {
                this.currentPage++;
                await this.fetchIncome();
            }
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
        this.fetchIncome();
    }
};
</script>

<style scoped>
/* Ваши стили */
</style>
