<template>
    <div class="relative w-full group">
        <div class="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
            <IconMoney :path-classes="'stroke-gray-400 transition duration-200 ' + (isInputFocused ? 'group-focus-within:stroke-orange-400' : 'group-hover:stroke-green-400')" />
        </div>
        <input type="number" id="currency-input"
               class="block p-2.5 w-full z-20 ps-10 text-sm text-gray-900 bg-gray-50 rounded-lg
                          transition duration-200
                          border border-gray-300
                          hover:border-green-300
                          focus:ring-orange-300 focus:border-orange-300
                   "
               placeholder="Введите сумму"
               required
               step="0.01"
               @input="updateValue($event.target.value)"
               @focus="isInputFocused = true"
               @blur="isInputFocused = false"
        />
    </div>
</template>

<script>
import IconMoney from "@/components/svg-icons/IconMoney.vue";

export default {
    name: "InputMoney",
    components: {IconMoney},
    data() {
        return {
            isInputFocused: false,
            value: {
                type: [Number],
            }
        };
    },
    methods: {
        updateValue(newValue) {
            const parsedValue = parseFloat(newValue);
            this.$emit('amount', parsedValue);
        }
    }
}
</script>

<style scoped>

</style>
