# News Explorer API

Дипломная работа студента Яндекс Практикум. 2020

##Endpoints

https://www.api.chirikgaga.ga

- создаёт пользователя с переданными в теле email, password и name

    POST /signup

- проверяет переданные в теле почту и пароль и возвращает JWT

    POST /signin

- возвращает информацию о пользователе (email и имя):

    GET /users/me

- возвращает все сохранённые пользователем статьи:

    GET /articles

- создаёт статью с переданными в теле keyword, title, text, date, source, link и image:

    POST /articles

- удаляет сохранённую статью  по _id:

    DELETE /articles/articleId
