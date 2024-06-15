<template>
    <button type="submit"
            class="px-2 py-2 rounded-lg
            flex justify-center
            w-full h-full
            text-white
            transition duration-200
            bg-orange-400
            hover:bg-orange-300
            active:bg-green-300 active:duration-0
            ">
        <svg v-if="icon === 'delete'" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
        <svg v-else-if="icon === 'edit'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.414 2.586a2 2 0 010 2.828l-12 12a2 2 0 01-.878.516l-5 1a1 1 0 01-1.292-1.292l1-5a2 2 0 01.516-.878l12-12a2 2 0 012.828 0zm-2.828 0L4 13.172l-.586 2.586 2.586-.586L15.586 4a1 1 0 00-1.414-1.414L4 12.586 2.414 14 4 12.414l10.172-10.172a1 1 0 00-1.414-1.414z"/>
        </svg>
        {{ text }}
    </button>
</template>

<script>
export default {
    name: "ButtonComponent",
    props: {
        text: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
    },
}
</script>

<style scoped>
</style>
