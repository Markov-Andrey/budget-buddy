<template>
    <button
        :data-tooltip-target="tooltipId"
        type="button"
        :data-tooltip-placement="validPlacement ? placement : ''"
        class="transition duration-200 font-bold text-[25px] text-white w-8 h-8 bg-orange-400 hover:bg-green-400 rounded-full text-sm text-center"
    >
        ?
    </button>
    <div
        :id="tooltipId"
        role="tooltip"
        class="w-[400px] absolute z-100 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-green-500 rounded-lg shadow-sm opacity-0 tooltip"
    >
        <p class="text-justify indent-6">
            {{ hint }}
        </p>
        <div class="tooltip-arrow z-100" data-popper-arrow></div>
    </div>
</template>

<script>
export default {
    name: "ElementHint",
    props: {
        hint: String,
        placement: String,
        tooltipId: {
            type: String,
            required: true
        },
    },
    computed: {
        validPlacement() {
            return ['top', 'right', 'bottom', 'left'].includes(this.placement);
        }
    }
}
</script>

<style scoped>
</style>
