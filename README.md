# 📘 Account Form – Vue 3 + TypeScript

Интерактивная форма управления учетными записями, созданная на базе Vue 3 + Composition API с использованием Pinia для управления состоянием. Позволяет добавлять, редактировать и удалять учетные записи с динамической валидацией и сохранением данных между перезагрузками страницы.

## 🧰 Стек технологий

- [Vue.js 3](https://vuejs.org/) + Composition API
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) — state management
- [UI-фреймворк по выбору] — например, Element Plus, Vuetify, Naive UI

## ✨ Функциональность

- Добавление новой учетной записи
- Динамическая валидация обязательных полей
- Автосохранение данных в хранилище Pinia
- Сохранение между перезагрузками (через `localStorage`)
- Автоматическая обработка поля "Метка" (преобразование в массив объектов)
- Поддержка разных типов учетной записи: `LDAP` / `Локальная`
- Удаление любой записи из списка

## 📋 Структура формы

### Учетная запись содержит:

| Поле         | Тип        | Обязательное | Ограничения                                    | Поведение                                                       |
|--------------|------------|--------------|------------------------------------------------|------------------------------------------------------------------|
| Метка        | `string[]` | Нет          | До 50 символов, разделённые `;`                | Преобразуется в массив объектов: `{ text: '...' }`              |
| Тип записи   | `enum`     | Да           | `LDAP` или `Локальная`                         | При `LDAP` скрывается поле "Пароль"                             |
| Логин        | `string`   | Да           | До 100 символов                                |                                                                 |
| Пароль       | `string`   | Да (если Локальная) | До 100 символов                         | Только если выбран тип "Локальная"                             |

### Общая логика:

- Кнопка `+` добавляет новую пустую запись
- При потере фокуса или выборе значения – происходит валидация
- В случае ошибки – поля подсвечиваются красной рамкой
- Данные хранятся в Pinia и автоматически подгружаются при обновлении страницы
