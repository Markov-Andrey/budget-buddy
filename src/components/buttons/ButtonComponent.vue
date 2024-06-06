<template>
    <button
            :disabled="loading"
            class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium rounded-lg group group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
            :class="{ 'cursor-wait': loading }"
    >
      <span class="flex items-center space-x-2 relative px-5 py-2.5 transition-all ease-in duration-75 rounded-md">
        {{ loading ? 'Loading' : buttonText }}
      </span>
    </button>
</template>

<script>
export default {
    name: "ButtonComponent",
    props: {
        buttonText: {
            type: String,
            required: true,
            default: ''
        },
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style scoped>
</style>

