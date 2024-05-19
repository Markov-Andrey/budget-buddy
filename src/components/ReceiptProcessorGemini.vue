<template>
    <div>
        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Чек</label>
        <input @change="handleFileUpload" class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file">
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">PNG, JPG</p>
        <div v-if="imagePreview" class="flex">
            <div class="rounded-lg overflow-hidden w-auto mx-auto">
                <img :src="imagePreview" alt="Preview" class="max-w-[500px] h-auto" />
            </div>
        </div>
        <ButtonComponent @click="generateContent" :loading="loading" buttonText="Сгенерировать"/>
        <div v-if="Object.keys(jsonData).length">
            <InputComponent label="Организация" inputId="organization" :value="jsonData.organization" :error="jsonData.organization === 'error' ? jsonData.organization : ''"/>
            <InputComponent label="Адрес" inputId="address" :value="jsonData.address" :error="jsonData.address === 'error' ? jsonData.address : ''"/>
            <table>
                <tr>
                    <th>Наименование</th>
                    <th>Количество</th>
                    <th>Цена</th>
                </tr>
                <template v-if="jsonData.items && jsonData.items.length">
                    <tr v-for="(item, itemIndex) in jsonData.items" :key="itemIndex">
                        <td>
                            <InputComponent :inputId="'itemName' + itemIndex" :value="item.name" :error="item.name === 'error' ? item.name : ''"/>
                        </td>
                        <td>
                            <InputComponent :inputId="'itemQuantity' + itemIndex" :value="item.quantity" :error="item.quantity === 'error' ? item.quantity : ''"/>
                        </td>
                        <td>
                            <InputComponent :inputId="'itemPrice' + itemIndex" type="number" :value="item.price" :error="item.price === 'error' ? item.price : ''"/>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td colspan="3">Нет данных</td>
                    </tr>
                </template>
            </table>
            <button @click="addItem" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">+ Add</button>
            <InputComponent label="Скидка" inputId="discount" :type="'checkbox'" :value="jsonData.discount" :error="jsonData.discount === 'error' ? jsonData.discount : ''"/>
            <InputComponent label="Общая стоимость" inputId="totalPrice" :type="'number'" :value="jsonData.totalPrice" :error="jsonData.totalPrice === 'error' ? jsonData.totalPrice : ''"/>
        </div>
        <ButtonComponent buttonText="Сохранить данные"/>
    </div>
</template>

<script>
import { ref, reactive } from 'vue';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { promptText } from '/src/variables/prompt.js';
import InputComponent from "@/components/inputs/InputComponent.vue";
import ButtonComponent from "@/components/buttons/ButtonComponent.vue";

export default {
    components: { InputComponent, ButtonComponent },
    setup() {
        const file = ref(null);
        const imagePreview = ref(null);
        const jsonData = reactive({});
        const apiKey = process.env.VUE_APP_GEMINI_API_KEY;
        const genAI = new GoogleGenerativeAI(apiKey);
        const loading = ref(false);

        const handleFileUpload = (event) => {
            file.value = event.target.files[0];
            if (file.value) {
                const reader = new FileReader();
                reader.readAsDataURL(file.value);
                reader.onload = () => {
                    imagePreview.value = reader.result;
                };
            }
        };

        const generateContent = async () => {
            if (!file.value) return;
            loading.value = true;

            const reader = new FileReader();
            reader.readAsDataURL(file.value);
            reader.onload = async () => {
                const imageBase64 = reader.result.split(',')[1];
                const model = genAI.getGenerativeModel({
                    model: "gemini-1.5-flash-latest",
                });
                const image = {
                    inlineData: {
                        data: imageBase64,
                        mimeType: file.value.type,
                    },
                };

                try {
                    const result = await model.generateContent([promptText, image]);
                    const textResponse = await result.response.text();
                    console.log({ 'Чистый ответ сервера': textResponse });

                    // Очистка ответа перед парсингом JSON
                    const cleanedResponse = textResponse.replace(/```json|```/g, '').trim();
                    try {
                        const parsedData = JSON.parse(cleanedResponse);
                        Object.assign(jsonData, parsedData);
                    } catch (error) {
                        console.error("Invalid JSON response:", error);
                    }
                } catch (error) {
                    console.error("Error generating content:", error);
                } finally {
                    loading.value = false;
                }
            };
        };

        return {
            handleFileUpload,
            generateContent,
            jsonData,
            imagePreview,
            loading,
        };
    },
    methods: {
        addItem() {
            const newItem = { name: '', quantity: '', price: '' };
            this.jsonData.items.push(newItem);
        }
    }
};
</script>

<style scoped>
</style>
