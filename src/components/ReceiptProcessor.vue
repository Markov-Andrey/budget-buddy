<template>
    <div>
        <h1>Загрузите чек</h1>
        <input type="file" @change="onFileChange">
        <img :src="image" v-if="image">
        <div v-for="(line, index) in textLines" :key="index">
            <p>{{ line }}</p>
        </div>
        <textarea v-model="jsonInput" placeholder="Введите JSON текст"></textarea>
        <div v-if="jsonData">
            <InputComponent label="Организация" inputId="organization" :value="jsonData.organization" :error="jsonData.organization === 'error' ? jsonData.organization : ''"/>
            <InputComponent label="Адрес" inputId="address" :value="jsonData.address" :error="jsonData.address === 'error' ? jsonData.address : ''"/>
            <table>
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
            </table>
            <InputComponent label="Скидка" inputId="discount" :type="'checkbox'" :value="jsonData.discount" :error="jsonData.discount === 'error' ? jsonData.discount : ''"/>
            <InputComponent label="Общая стоимость" inputId="totalPrice" :type="'number'" :value="jsonData.totalPrice" :error="jsonData.totalPrice === 'error' ? jsonData.totalPrice : ''"/>
        </div>
    </div>
</template>

<script>
import Tesseract from "tesseract.js";
import InputComponent from "@/components/inputs/InputComponent.vue";

export default {
    components: {InputComponent},
    data() {
        return {
            image: null,
            text: '',
            textLines: [],
            jsonInput: '',
            jsonData: null,
        };
    },
    computed: {
        isJsonValid() {
            try {
                JSON.parse(this.jsonInput);
                return true;
            } catch (error) {
                return false;
            }
        },
    },
    watch: {
        jsonInput: function(newValue) {
            if (this.isJsonValid) {
                this.jsonData = JSON.parse(newValue); // Преобразование введенного JSON в объект
            } else {
                this.jsonData = null; // Если введенный JSON невалиден, устанавливаем jsonData в null
            }
        }
    },
    methods: {
        async onFileChange(e) {
            const file = e.target.files[0];
            if (!file || !file.type.startsWith('image/')) {
                console.error('Выберите изображение');
                return;
            }
            this.image = URL.createObjectURL(file);

            try {
                const { data } = await Tesseract.recognize(file, 'rus');
                const lines = data.text.trim().split('\n');
                console.log(lines);
                this.textLines = lines;
            } catch (error) {
                console.error('Ошибка при распознавании текста:', error);
            }
        },
    }
};
</script>

<style scoped>
img {
    max-width: 100%;
    height: auto;
}
</style>
