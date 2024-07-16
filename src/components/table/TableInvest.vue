<template>
    <div>
        <!-- Форма для добавления новой записи -->
        <!-- <FormsIncomeAdd :subcategories="subcategories" @income-added="IncomeAdded"/> -->

        <!-- Таблица данных -->
        <table class="w-full text-sm text-left">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
            <tr class="px-6 py-3">
                <th class="px-6 py-3">Total Amount</th>
                <th class="px-6 py-3">User ID</th>
                <th class="px-6 py-3">Created At</th>
                <th class="px-6 py-3">
                    <div>Detail</div>
                    <div>(Sign - Size - Cost per Unit)</div>
                </th>
                <th class="px-6 py-3">-</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in investData"
                :key="item.id"
                class="transition-all overflow-hidden duration-75 h-auto"
                :class="{ 'bg-orange-300 collapsed h-0': deleteItems.includes(item.id) }"
            >
                <td class="px-6 py-4">{{ item.total_amount }}</td>
                <td class="px-6 py-4">{{ item.user_id }}</td>
                <td class="px-6 py-4">{{ formatRussianDate(item.created_at) }}</td>
                <td class="px-6 py-4">
                    <div v-for="detail in item.investment_detail" :key="detail.id">
                        <div>{{ detail.investment_type_id }} - {{ trimTrailingZeros(detail.size) }} - {{ trimTrailingZeros(detail.cost_per_unit) }} $</div>
                    </div>
                </td>
                <td class="px-6 py-4 flex gap-1">
                    <div :id="`edit-${item.id}`"
                         @mouseup="openModal(item.id)">
                        <ButtonComponent icon="edit"/>
                    </div>
                    <div :id="`delete-${item.id}`"
                         @mouseup="openModalDelete(item.id)">
                        <ButtonComponent icon="delete"/>
                    </div>
                </td>
            </tr>
            </tbody>

            <!-- Модальное окно редактирование -->
            <!-- Выведи в компонент модалок, сделай инпуты, отправку формы, и клик вне формы -->
            <div v-if="selectedItemChange" aria-hidden="true" class="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div class="relative p-4 w-full max-w-2xl max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 class="text-xl font-semibold text-gray-900">
                                Изменить запись
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    @click="selectedItemChange = null">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="p-4 md:p-5 space-y-4">
                            <div>
                                <label for="amount" class="block text-base font-medium text-gray-700">Сумма</label>
                                <input type="text"
                                       id="amount"
                                       name="amount"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                       v-model="selectedItemChange.amount"
                                >
                            </div>
                            <div>
                                <label for="subcategory" class="block text-base font-medium text-gray-700">Подкатегория</label>
                                <select id="subcategory" v-model="selectedItemChange.subcategory_id" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                                    <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">
                                        {{ subcategory.name }}
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label for="created_at" class="block text-base font-medium text-gray-700">Дата</label>
                                <input type="date"
                                       id="created_at"
                                       name="created_at"
                                       class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                       v-model="formattedDate"
                                >
                            </div>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="button" @mouseup="update()"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Подтвердить
                            </button>
                            <button type="button" @mouseup="selectedItemChange = null"
                                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10">
                                Отменить
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Модальное окно удаление -->
            <!-- Выведи в компонент модалок, сделай инпуты, отправку формы, и клик вне формы -->
            <div v-if="selectedItemDelete" aria-hidden="true" class="fixed top-0 right-0 bottom-0 left-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                <div class="relative p-4 w-full max-w-2xl max-h-full">
                    <!-- Modal content -->
                    <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal header -->
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                            <h3 class="text-xl font-semibold text-gray-900">
                                Удалить запись
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                                    @click="selectedItemDelete = null">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>
                        <!-- Modal body -->
                        <div class="p-4">
                            <table>
                                <tr>
                                    <td class="text-base leading-relaxed p-1">Сумма</td>
                                    <td class="text-base leading-relaxed p-1">Категория</td>
                                    <td class="text-base leading-relaxed p-1">Дата</td>
                                </tr>
                                <tr>
                                    <td class="text-base leading-relaxed p-1">{{ selectedItemDelete.amount }}</td>
                                    <td class="text-base leading-relaxed p-1">{{ getSubcategoryName(selectedItemDelete.subcategory_id) }}</td>
                                    <td class="text-base leading-relaxed p-1">{{ formatRussianDate(selectedItemDelete.created_at) }}</td>
                                </tr>
                            </table>
                        </div>
                        <!-- Modal footer -->
                        <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button type="button" @mouseup="deleteItem(selectedItemDelete.id)"
                                    class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                Подтвердить
                            </button>
                            <button type="button" @click="selectedItemDelete = null"
                                    class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10">
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            </div>

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
// import FormsIncomeAdd from "@/components/forms/FormsIncomeAdd.vue";
import ButtonComponent from "@/components/buttons/ButtonComponent.vue";

export default {
    name: "TableInvest",
    components: {ButtonComponent, /* FormsIncomeAdd */ },
    data() {
        return {
            investData: [],
            subcategories: [],
            totalItems: null,
            perPage: 5,
            deleteItems: [],
            selectedItemChange: null,
            selectedItemDelete: null,
        };
    },
    computed: {
        hasNextPage() {
            return this.perPage < this.totalItems;
        },
        formattedDate: {
            get() {
                return this.selectedItemChange.created_at.split('T')[0];
            },
            set(newDate) {
                this.selectedItemChange.created_at = newDate + 'T00:00:00.000000Z';
            }
        },
    },
    methods: {
        trimTrailingZeros(value) {
            if (typeof value === 'number') {
                value = value.toString();
            }
            if (typeof value === 'string') {
                return value.replace(/\.?0+$/, '');
            }
            return value;
        },
        openModal(id) {
            this.selectedItemChange = this.investData.find(item => item.id === id);
            console.log(this.selectedItemChange);
        },
        openModalDelete(id) {
            this.selectedItemDelete = this.investData.find(item => item.id === id);
            console.log(this.selectedItemDelete);
        },
        IncomeAdded() {
            this.getInvest();
        },
        async update() {
            try {
                let id = this.selectedItemChange.id;
                let updatedItem = {
                    amount: this.selectedItemChange.amount,
                    created_at: this.selectedItemChange.created_at,
                    subcategory_id: this.selectedItemChange.subcategory_id
                };
                this.selectedItemChange = null;
                await axiosInstance.put(`income/update/${id}`, updatedItem);
            } catch (error) {
                console.error('Error Update:', error);
            }
        },
        async deleteItem(item) {
            try {
                this.selectedItemDelete = null;
                this.deleteItems.push(item);
                await axiosInstance.delete(`income/delete/${item}`);
                await this.getInvest();
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
        async getInvest() {
            try {
                const response = await axiosInstance.get(`/investment/get-invest/${this.perPage}`);

                this.investData = response.data.investData;
                this.totalItems = response.data.totalItems;
                console.log(response.data);
            } catch (error) {
                console.error('Error fetching invest:', error);
            }
        },
        async moreIncome() {
            this.perPage += this.perPage;
            await this.getInvest();
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

            return `${day}.${month}.${year}`;
        }
    },
    mounted() {
        this.getCategory();
        this.getInvest();
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
