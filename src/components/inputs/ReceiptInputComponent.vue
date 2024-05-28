<template>
  <div class="flex flex-col items-center p-4">
    <div class="flex gap-2.5">
      <input
          type="file"
          accept="image/*"
          @change="onImageSelected"
          ref="fileInput"
          class="mb-4 border border-gray-300 rounded p-2"
      />
      <!-- TODO isMobileDevice убери "!" -->
      <button
          v-if="!isMobileDevice"
          @click="openCamera"
          class="mb-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
      >
        <IconCamera />
      </button>
    </div>
    <div v-if="imageUrl" class="mt-4">
      <img :src="imageUrl" alt="Image preview" class="max-w-xs rounded shadow-lg"/>
    </div>
  </div>
</template>

<script>
import IconCamera from "@/components/svg-icons/IconCamera";
export default {
  name: "ReceiptInputComponent",
  components: {IconCamera},
  data() {
    return {
      imageUrl: null,
      isMobileDevice: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
  },
  methods: {
    onImageSelected(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file);
      }
    },
    openCamera() {
      this.$refs.fileInput.click();
    }
  }
}
</script>

<style scoped>
</style>
