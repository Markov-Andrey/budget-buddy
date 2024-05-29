<template>
    <div>Добавить новый чек</div>
    <div class="flex flex-col items-center p-4">
        <div class="flex gap-2.5">
            <input
                type="file"
                accept="image/*"
                multiple
                @change="onImageSelected"
                ref="fileInput"
                class="mb-4 border border-gray-300 rounded p-2"
            />
            <button
                v-if="!isMobileDevice"
                @click="openCamera"
                class="mb-4 bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600"
            >
                <IconCamera />
            </button>
        </div>

        <div v-for="(image, index) in imageUrls" :key="index" class="relative mt-4 inline-block">
            <img :src="image" alt="Image preview" class="max-w-xs rounded shadow-lg"/>
            <button @click="removeImage(index)" class="absolute top-0 right-0 mt-2 mr-2 p-2 text-red-700">X</button>
        </div>

        <div class="p-2" v-if="imageUrls.length > 0">
            <button @click="uploadImages" type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">
                Обработать
            </button>
        </div>
    </div>
</template>

<script>
import axiosInstance from '@/axios-instance';
import IconCamera from "@/components/svg-icons/IconCamera";

export default {
    name: "ReceiptInputComponent",
    components: { IconCamera },
    data() {
        return {
            imageUrls: [],
            imageFiles: [],
            isMobileDevice: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        };
    },
    methods: {
        onImageSelected(event) {
            const files = Array.from(event.target.files);
            files.forEach(file => {
                this.imageUrls.push(URL.createObjectURL(file));
                this.imageFiles.push(file);
            });
        },
        openCamera() {
            this.$refs.fileInput.click();
        },
        removeImage(index) {
            this.imageUrls.splice(index, 1);
            this.imageFiles.splice(index, 1);

            const dt = new DataTransfer();
            this.imageFiles.forEach(file => dt.items.add(file));
            this.$refs.fileInput.files = dt.files;
        },
        async uploadImages() {
            if (this.imageFiles.length === 0) {
                console.error("No images selected");
                return;
            }

            const formData = new FormData();
            this.imageFiles.forEach((file) => {
                formData.append('receipt[]', file);
            });

            try {
                const response = await axiosInstance.post('/receipts/add', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log('Images uploaded successfully:', response.data);
                this.imageUrls = [];
                this.imageFiles = [];
            } catch (error) {
                console.error('Error uploading images:', error);
            }
        }
    }
}
</script>

<style scoped>
</style>
