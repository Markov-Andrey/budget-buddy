<template>
    <div>
        <div
            :class="[
        'inline-flex items-center justify-center w-4 h-4 rounded-full shadow-md animated',
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
.animated {
    animation: pulse 2s infinite alternate;
}

@keyframes pulse {
    0% {
        transform: scale(1);
    }
    100% {
        transform: scale(1.2);
    }
}
</style>
