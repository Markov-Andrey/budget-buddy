<template>
    <div>
        <label :for="inputId">{{ label }}</label>
        <input :id="inputId" :type="type" :value="value === 'error' ? '' : value" @input="$emit('input', $event.target.value)">
        <div v-if="error" class="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">{{error}}</div>
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: ''
        },
        inputId: String,
        type: {
            type: String,
            default: 'text'
        },
        value: String,
        error: String
    }
}
</script>