<template>
    <div class="h-full relative group" ref="dropdown">
        <div class="relative group h-full">
            <input
                ref="input"
                type="text"
                readonly
                @click="toggleDropdown"
                :value="selectedOption.name"
                class="block appearance-none w-full h-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg leading-tight focus:outline-none
                focus:ring-orange-300 focus:border-orange-300
                hover:border-green-300
                cursor-pointer"
            />
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg
                    class="h-4 w-4 text-gray-700 transform transition-transform"
                    :class="{ 'rotate-180': dropdownOpen }"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M9.293 13.707a1 1 0 001.414 0l5-5a1 1 0 00-1.414-1.414L10 11.586 4.707 6.293a1 1 0 00-1.414 1.414l5 5z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
        </div>

        <div v-show="dropdownOpen" class="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 overflow-hidden">
            <ul>
                <li
                    v-for="option in options"
                    :key="option.id"
                    @click="selectOption(option)"
                    @blur="closeDropdown"
                    :class="{ 'bg-orange-400 text-white': isSelected(option) }"
                    class="cursor-pointer px-4 py-2 transition duration-200
                        hover:bg-green-400 hover:text-white
                        active:bg-orange-400 active:duration-0
                    "
                >
                    {{ option.name }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "CustomSelect",
    props: {
        value: {
            type: String,
            default: ""
        },
        options: {
            type: Array,
            required: true
        }
    },
    data() {
        return {
            dropdownOpen: false,
            selectedOption: { id: 0, name: "Выберите опцию" }
        };
    },
    mounted() {
        this.selectedOption = this.findSelectedOption();
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeUnmount() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        findSelectedOption() {
            return this.options.find(option => option.id === parseInt(this.value)) || {
                id: 0,
                name: "Выберите опцию"
            };
        },
        toggleDropdown() {
            this.dropdownOpen = !this.dropdownOpen;
        },
        closeDropdown() {
            this.dropdownOpen = false;
        },
        selectOption(option) {
            this.$emit("update:subcategory", option.id);
            this.selectedOption = option;
            this.closeDropdown();
        },
        isSelected(option) {
            return option.id === this.selectedOption.id;
        },
        handleClickOutside(event) {
            const dropdown = this.$refs.dropdown;
            const input = this.$refs.input;

            if (!dropdown.contains(event.target) && !input.contains(event.target)) {
                this.closeDropdown();
            }
        },
    }
};
</script>

<style scoped>
</style>
