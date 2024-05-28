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
    <div v-if="imageUrl" class="relative mt-4 inline-block">
        <img :src="imageUrl" alt="Image preview" class="max-w-xs rounded shadow-lg"/>
        <button @click="removeImage" class="absolute top-0 right-0 mt-2 mr-2 p-2 text-red-700">X</button>
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
    },
    removeImage() {
        this.imageUrl = null;
        this.$refs.fileInput.value = null;
    },
  }
}
</script>

<style scoped>
</style>
