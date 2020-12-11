# Mern
Приложение для сокращения ссылок , с авторизацией / Mongo Express React Node

Этот проект создан при помощи [Create React App](https://github.com/facebook/create-react-app).

## Доступные скрипты

В папке проекта вы можете запустить:

### `npm run dev`

Запуск клиентской части и серверной одновременно при помощи пакет [concurrently][car]




## Что умеет это SPA ?

- Авторизация пользователя при помощи [JsonWebToken][jwt]
- Валидация при помощи Express-validator
- Пользователь может сокращать необходимую ему ссылку и получать в ответ shortId
- Для каждой ссылки присутствует счетчик кликов и дата создания
- Только пользователь имеет доступ к своим ссылкам


## Интерфейс 

Стилизация выполнена при помощи Materialize

Внешний вид приложения:

![gif]


## Использование 

Для корректной работы приложения вам необходимо иметь на компьютере [Mongodb][mongo]


Название базы данных mern

Вы можете изменить название на люое другое в файле db.js


## Технологии

- [React][react]
- [JsonWebToken][jwt]
- [Concurrently][car]
- [Materialize][mt]
- [Express][ex]



## Сотрудничество

Если вы нашли ошибку или хотите помочь сделать это SPA лучше,оптимизированней или добавить функционал, то свяжитесь со мной :)


[gif]:https://media.giphy.com/media/fJdqrrAJIoZ2h0zDkE/giphy.gif

[react]:https://ru.reactjs.org
[car]:https://www.npmjs.com/package/concurrently
[jwt]:https://jwt.io/
[mt]:https://materializecss.com/
[ex]:https://expressjs.com/ru/
[mongo]:https://www.mongodb.com/
