## Проект `Mesto`

Бэкенд для интерактивной страницы "Mesto"
Фронтенд часть вы можете посмотреть [Mesto](https://github.com/Pavelsmcom/react-mesto-api-full-gha)

## Ссылка на проект: 

[Mesto](https://pavelsmcom.github.io/mesto/)

## Скриншоты:

<details><summary><b>Развернуть</b></summary>

[![movies-explorer-frontend](https://pavelsm.com/GitPic/mesto.png)
</details>

## Используемые технологии:

* JavaScript;
* Express;
* MongoDB;
* ESlint.

## Возможности приложения:

- [x] GET запрос по адресу /user - возврат всех пользователей;
- [x] POST запрос по адресу /user - создание пользователя;
- [x] GET запрос по /users/:userId - возврат пользователя;
- [x] PATCH запрос по /users/me - обновление данных пользователя;
- [x] PATCH запрос по /users/me/avatar - обновление аватара пользователя;
- [x] GET запрос по адресу /cards - возврат всех карточек;
- [x] POST запрос по адресу /cards - создание карточки;
- [x] DELETE запрос по адресу /cards/:cardId - удаление карточки;
- [x] PUT запрос по адресу /cards/:cardId/likes - лайк карточки;
- [x] DELETE запрос по адресу /cards/:cardId/likes - удаление лайка карточки;
- [x] POST запрос по адресу /signin - регистрация пользователя
- [x] POST запрос по адресу /signup - вход пользователя;
- [x] функция обработки ошибок (400, 401, 403, 404, 409 и 500);
- [x] API защищено от неавторизированных пользователей;
- [x] данные валидируются на уровне запросов и на уровне схемы;
- [x] реализованна централизованная обработка ошибок.



## Установка и запуск проекта:

Клонировать репозиторий:

    git clone https://github.com/Pavelsmcom/express-mesto-gha.git

Установить зависимости:

    npm i

Запустить проект:

    npm run start
