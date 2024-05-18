<template>
    <div>
        <label :for="inputId">{{ label }}</label>
        <input :id="inputId" :type="type" :value="value === 'error' ? '' : value" @input="$emit('input', $event.target.value)">
        <div v-if="error">{{ error }}</div>
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