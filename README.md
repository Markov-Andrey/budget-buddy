🇺🇸 English Version
# 💰 Вudget-Вuddy
A project for those who manage their cash flows and want precision in budget planning

## 🌟 Features
- 📜 **Receipt Conversion**: Transform paper and electronic receipts into text data processed by a neural network for subsequent database upload.
- 📊 **Expense Analysis**: Accumulate and analyze data to build monthly expense graphs by spending categories.
- 🗓️ **Long-term Planning**: Use long-term data to meticulously plan and develop family budget strategies.

## ⚠️ Drawbacks
- 💸 **ChatGPT API Costs**: The ChatGPT API is currently paid and is a bottleneck for the project.
- 🔄 **Manual Data Transfer**: Data copying to and from ChatGPT must be done manually. We will strive to make this process as easy as possible.

## 🛠️ Feature Testing
1. 📄 **Upload Receipt**: Upload a receipt with text properly oriented into the form.
2. 💬 **Using ChatGPT**: Copy the task from the `text.txt` file into your ChatGPT, and also copy the resulting text from processing the receipt photo, then execute the request.
3. 🔄 **Copy the Result**: Copy the processed result from ChatGPT into the empty JSON field.
4. ✔️ **Data Verification**: If everything is done correctly, a set of fields with data for subsequent database upload will be created. Before uploading, you can review and check for any errors or inaccuracies.
5. 🚧 **Work in Progress**: This project is still under development, and some features may be unavailable or not work correctly.

---

🇷🇺 Русская версия
# 💰 Бюджетный Приятель
Проект для тех, кто управляет своими денежными потоками и хочет ювелирной точности в планировании бюджета

## 🌟 Особенности
- 📜 **Преобразование чеков**: Превращение бумажных и электронных чеков в текстовые данные, которые обрабатываются нейросетью для последующей загрузки в базу данных.
- 📊 **Анализ расходов**: Полученные данные будут накапливаться и в последующем анализироваться, выстраивая графики расходов за месяц по категориям трат.
- 🗓️ **Долгосрочное планирование**: На долгосрочных данных можно более тщательно планировать и выстраивать долгосрочные стратегии семейного бюджета.

## ⚠️ Недостатки
- 💸 **Стоимость API ChatGPT**: API ChatGPT на данный момент платный и на данном этапе является бутылочным горлышком для проекта.
- 🔄 **Ручной перенос данных**: Копирование данных в ChatGPT и назад должно происходить в ручном режиме. Постараемся максимально облегчить данный процесс.

## 🛠️ Тест фич
1. 📄 **Загрузите чек**: Загрузите в форму чек с текстом, расположенным в правильной ориентации.
2. 💬 **Использование ChatGPT**: Скопируйте задание из файла `text.txt` в ваш ChatGPT, также скопируйте полученный текст в результате обработки фото чека, выполните запрос.
3. 🔄 **Скопируйте результат**: Полученный результат обработки скопируйте из ChatGPT в пустое поле JSON.
4. ✔️ **Проверка данных**: Если вы все верно сделали - построится набор полей с данными для последующей отправки в базу данных. Перед отправкой вы можете свериться и проверить возникшие ошибки или неточности.
5. 🚧 **Работа в процессе**: Этот проект все еще находится в разработке, и некоторые функции могут быть недоступны или работать некорректно.

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


