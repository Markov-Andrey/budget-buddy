🇺🇸 English Version
## 💰 Budget Buddy
A project for those who manage their financial flows and want pinpoint accuracy in budget planning.

## 🌟 Features
- 📜 **Receipt Conversion**: Transforming paper and electronic receipts into data processed by a neural network for subsequent loading into a database.
- 📊 **Expense Analysis**: The obtained data will accumulate and subsequently be analyzed, building expense charts by categories for the month.
- 🗓️ **Long-term Planning**: With long-term data, it's possible to plan and develop long-term family budget strategies more carefully.

## ⚠️ Downsides
- 💸 **ChatGPT API**:
    - The ChatGPT API is currently paid and at this stage serves as a bottleneck for the project.
    - Manual data transfer: Copying data to ChatGPT and back must be done manually.

- 💸 **Gemini API**:
    - Requests must be made via VPN from a region corresponding to the list without the notation '[1]' [Available Regions](https://ai.google.dev/gemini-api/docs/available-regions?hl=ru#available_regions).

## 🚧 Work in Progress
- This project is still in development, and some features may be unavailable or work incorrectly.

## 🛠️ Manual Feature Testing (ChatGPT)
1. 📄 **Upload Receipt**: Upload a receipt with text correctly oriented.
2. 💬 **Using ChatGPT**: Copy the task from the `text.txt` file to your ChatGPT, also copy the resulting text from processing the receipt photo, and make a request.
3. 🔄 **Copy the Result**: Copy the processing result from ChatGPT to an empty JSON field.
4. ✔️ **Data Verification**: If you have done everything correctly, a set of fields with data for subsequent submission to the database will be built. Before submission, you can check for any errors or inaccuracies.

## 🛠️ Automated Feature Testing (Gemini API)
1. 📄 **Upload Receipt**: Upload a receipt with text correctly oriented.
2. ⚠️ **IMPORTANT**: Requests must be made via VPN from a region corresponding to the list without the notation [1] [Available Regions](https://ai.google.dev/gemini-api/docs/available-regions?hl=ru#available_regions).
3. ✔️ **Data Verification**: A set of fields with data for subsequent submission to the database will be built. Before submission, you can check for any errors or inaccuracies.

---

🇷🇺 Русская версия
# 💰 Бюджетный Приятель
Проект для тех, кто управляет своими денежными потоками и хочет ювелирной точности в планировании бюджета

## 🌟 Особенности
- 📜 **Преобразование чеков**: Превращение бумажных и электронных чеков в данные, которые обрабатываются нейросетью для последующей загрузки в базу данных.
- 📊 **Анализ расходов**: Полученные данные будут накапливаться и в последующем анализироваться, выстраивая графики расходов за месяц по категориям трат.
- 🗓️ **Долгосрочное планирование**: На долгосрочных данных можно более тщательно планировать и выстраивать долгосрочные стратегии семейного бюджета.

## ⚠️ Недостатки
- 💸 **API ChatGPT**:
    - API ChatGPT на данный момент платный и на данном этапе является бутылочным горлышком для проекта.
    - Ручной перенос данных: Копирование данных в ChatGPT и назад должно происходить в ручном режиме.

- 💸 **Gemini API**:
    - Запрос должен быть выполнен через VPN из региона соответствующей списку и без пометки '[1]' https://ai.google.dev/gemini-api/docs/available-regions?hl=ru#available_regions.

## 🚧 Работа в процессе
- Этот проект все еще находится в разработке, и некоторые функции могут быть недоступны или работать некорректно.

## 🛠️ Тест фич вручную (ChatGPT)
1. 📄 **Загрузите чек**: Загрузите в форму чек с текстом, расположенным в правильной ориентации.
2. 💬 **Использование ChatGPT**: Скопируйте задание из файла `text.txt` в ваш ChatGPT, также скопируйте полученный текст в результате обработки фото чека, выполните запрос.
3. 🔄 **Скопируйте результат**: Полученный результат обработки скопируйте из ChatGPT в пустое поле JSON.
4. ✔️ **Проверка данных**: Если вы все верно сделали - построится набор полей с данными для последующей отправки в базу данных. Перед отправкой вы можете свериться и проверить возникшие ошибки или неточности.

## 🛠️ Тест фич автоматизировано (Gemini API)
1. 📄 **Загрузите чек**: Загрузите в форму чек с текстом, расположенным в правильной ориентации.
2. ⚠️ **ВАЖНО**: Запрос должен быть выполнен через VPN из региона соотвествующей списку без пометки [1] https://ai.google.dev/gemini-api/docs/available-regions?hl=ru#available_regions.
3. ✔️ **Проверка данных**: Построится набор полей с данными для последующей отправки в базу данных. Перед отправкой вы можете свериться и проверить возникшие ошибки или неточности.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```


