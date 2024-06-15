<template>
    <svg :class="classes" class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
        <path :class="pathClasses" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1M2 5h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm8 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"/>
    </svg>
</template>

<script>
export default {
    name: "IconMoney",
    props: {
        classes: {
            type: [String, Object, Array],
            default: () => ''
        },
        pathClasses: {
            type: [String, Object, Array],
            default: () => ''
        }
    }
}
</script>

<style scoped>

</style>