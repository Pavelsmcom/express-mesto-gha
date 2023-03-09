[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)
# Проект Mesto фронтенд + бэкенд

## 13 Проект на курсе "Веб-разработчик" в Яндекс-Практикуме

### Обзор

Бэкенд для интерактивной страницы "Mesto"

- реализован GET запрос по адресу /user - возврат всех пользователей;
- реализован POST запрос по адресу /user - создание пользователя;
- реализован GET запрос по /users/:userId - возврат пользователя;
- реализован PATCH запрос по /users/me - обновление данных пользователя;
- реализован PATCH запрос по /users/me/avatar - обновление аватара пользователя;

- реализован GET запрос по адресу /cards - возврат всех карточек;
- реализован POST запрос по адресу /cards - создание карточки;
- реализован DELETE запрос по адресу /cards/:cardId - удаление карточки;
- реализован PUT запрос по адресу /cards/:cardId/likes - лайк карточки;
- реализован DELETE запрос по адресу /cards/:cardId/likes - удаление лайка карточки;

- реализована функция обработки ошибок (400, 404 и 500).

### Технологии:
- JS;
- Express;
- MongoDB;
- ESlint.

### Запуск проекта

`npm run start` — запускает сервер
`npm run dev` — запускает сервер с hot-reload


[Ссылка на github](https://github.com/Pavelsmcom/express-mesto-gha)
