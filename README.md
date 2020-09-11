# news-explorer-api

Яндекс.Практикум, дипломная работа, бэкенд

## Описание

все ошибки обрабатываются централизованно;

тела запросов и, где необходимо, заголовки и параметры, валидируются по определённым схемам. Если запрос не соответствует схеме, обработка не передаётся контроллеру и клиент получает ошибку валидации;

все запросы и ответы записываются в файл request.log;

все ошибки записываются в файл error.log;

## Backend запросы

<http://api.diploma.ml/signup> - регистрация нового пользователя (POST)

<http://api.diploma.ml/signin> - авторизация (POST)

<http://api.diploma.ml/articles> - получить все сохраненные пользователем статьи (GET)

<http://api.diploma.ml/articles> - сохранить (создать) статью (POST)

<http://api.diploma.ml/users/me> - получить информацию о пользователе (GET)

<http://api.diploma.ml/articles/:articleId> - удалить статью (DELETE)
