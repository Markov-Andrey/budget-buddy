<template>
    <div class="p-4 sm:ml-64 relative">
        <div class="flex gap-5">
            <img class="max-h-[300px]" src="/assets/owl_hd.png" alt="Owl Image"/>
            <div class="grid text-left indent-6 px-3 py-2 text-sm font-medium complex-bg-green rounded-lg shadow-sm tooltip relative">
                <p>
                    Привет, давай знакомиться!
                </p>
                <p>
                    Я <b>Афи</b> - личный дискорд-бот, помощник для обработки сообщений при подключении сервера.
                </p>
                <p>
                    При запуске я подключаюсь к чату и собираю последние 25 сообщений.
                </p>
                <p>
                    Просмотренные сообщения я помечаю.
                </p>
                <p>
                    Если нужно - зови меня по имени и ключевой команде, порядок слов не важен.
                </p>
                <div class="tooltip-arrow absolute -left-6 top-1/2 transform -translate-y-1/2 bg-gray-900 w-6 h-6 rounded-full"></div>
            </div>
        </div>
        <div class="p-4 text-left">
            <div class="font-bold">Команды:</div>
            <div class="mt-4">
                <div v-for="(command, index) in commands" :key="index" class="mb-6">
                    <div class="text-2xl mb-2">{{ command.name }}</div>
                    <div class="ml-4">{{ command.description }}</div>
                    <div class="ml-4 mb-2">
                        <div class="font-semibold">Схема</div>
                        <div class="ml-4">
                            <table class="border-collapse border">
                                <tbody>
                                <template v-for="(field, fieldName, index) in command.schema" :key="index">
                                    <tr>
                                        <td class="border border-gray-400 px-2 py-1">&lt;{{ fieldName }}&gt;</td>
                                        <td class="border border-gray-400 px-2 py-1" style="white-space: pre-line"><span>{{ field.description }}</span></td>
                                    </tr>
                                </template>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div v-if="command.examples" class="ml-4 mb-2">
                        <div v-for="(example, exIndex) in command.examples" :key="exIndex" class="ml-4 mb-2">
                            <div v-if="example.type === 'text'" style="white-space: pre-line">
                                <div class="font-semibold">Пример:</div>
                                {{ example.content }}
                            </div>
                            <div v-else-if="example.type === 'image'">
                                <div class="font-semibold">
                                    Пример:
                                    <img class="h-[400px]" :src="example.content" alt="Example Image">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DiscordPage',
    data() {
        return {
            commands: [
                {
                    id: 1,
                    name: '1. Афи, чек',
                    description: 'Можно прикрепить 1 или несколько фото чека или написать сообщение в формате, через запятую!',
                    schema: {
                        'наименование': { description: 'обязательно' },
                        'цена': { description: 'обязательно, ключевое слово "руб" является ключом к поиску цены в сообщении' },
                        'количество': { description: 'не обязательно, в случае отсутствия = 1, ключ - "шт"' },
                        'вес/объем': { description: 'не обязательно, в случае отсутствия = 0, ключ - "л" или "кг"' }
                    },
                    examples: [
                        { type: 'text', content: 'Афи, чек\nKFC, 1 шт, 38 руб\nАИ 92, 15 л, 25 руб' },
                        { type: 'image', content: '/assets/discord_example_image.jpg' }
                    ]
                },
                {
                    id: 2,
                    name: '2. Афи, доход',
                    description: 'Можно внести 1 запись со статьей дохода.',
                    schema: {
                        'наименование категории': { description: 'обязательно.\n' +
                                'Допустимые категории:\n' +
                                'Заработная плата\n' +
                                'Подработка\n' +
                                'Пассивный доход\n' +
                                'Сдача в аренду\n' +
                                'Разовый доход\n' +
                                'Продажа б/у' },
                        'цена': { description: 'обязательно, ключевое слово "руб" является ключом к поиску цены в сообщении' }
                    },
                    examples: [
                        { type: 'text', content: 'Афи, доход\nРазовый доход, 1500 руб' }
                    ]
                }
            ]
        }
    },
    methods: {
        async fetchMessage() {
            // Ваши методы
        },
    },
};
</script>

<style scoped>
.tooltip-arrow {
    position: absolute;
    z-index: -1;
    bottom: -12px;
}

.tooltip-arrow:before {
    content: '';
    position: absolute;
    border: 0;
    width: 25px;
    height: 25px;
    left: 50%;
    transform: translateY(-50%) rotate(45deg);
    background: #4dd7b8;
    z-index: -1;
}
</style>