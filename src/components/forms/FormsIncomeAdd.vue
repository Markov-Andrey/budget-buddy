<template>
    <form @submit.prevent="addIncome" class="flex gap-3 justify-center p-3">

        <div>
            <InputMoney @amount="updAmount"/>
        </div>

        <div>
            <InputSelect :options="subcategories" @subcategory="updSubcategoryId"/>
        </div>

        <button type="submit"
                class="bg-orange-400 text-white px-4 py-2 rounded-lg hover:bg-orange-300 transition duration-200 active:bg-green-300">
            Добавить
        </button>

    </form>
</template>

<script>
import InputSelect from "@/components/inputs/InputSelect.vue";
import InputMoney from "@/components/inputs/InputMoney.vue";

export default {
    name: "FormsIncomeAdd",
    components: {InputMoney, InputSelect},
    props: {
        subcategories: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            newIncome: {
                amount: null,
                subcategory_id: null
            },
        };
    },
    methods: {
        addIncome() {
            console.log(this.newIncome);
        },
        updAmount(value) {
            this.newIncome.amount = value;
        },
        updSubcategoryId(value) {
            this.newIncome.subcategory_id = value;
        }
    }
}
</script>

<style scoped>

</style>