<template>
    <div>
        <div
            :class="[
        'inline-flex items-center justify-center w-6 h-6 rounded-full shadow-md'
      ]"
            :style="gradientStyle"
        />
    </div>
</template>

<script>
export default {
    name: "ElementBoolean",
    props: {
        bool: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        gradientStyle() {
            return {
                backgroundImage: this.bool
                    ? 'radial-gradient(circle, #00e829, #27b000)'
                    : 'radial-gradient(circle, #ff0000, #d70000)'
            };
        }
    }
}
</script>

<style scoped>
</style>
