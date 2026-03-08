# 25 - 7.4 THREADPOOL LIMIT

Змоделюйте важкі асинхронні задачі та побачте вплив threadpool.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `GET /threadpool-limit`
* Запустити рівно 8 важких асинхронних задач паралельно через `crypto.pbkdf2`
* Повернути JSON з полями:
  * `tasks` (число)
  * `durationMs` (число)
* Встановити заголовок `Content-Type: application/json`
* Невідомі маршрути (або неправильний метод для цього маршруту) не повинні повертати `200`

## ПРИКЛАД ЗАПИТУ

```http
GET /threadpool-limit
```

## ОЧІКУВАНА ВІДПОВІДЬ

Статус `200` і JSON, наприклад:

```json
{
  "tasks": 8,
  "durationMs": 1234
}
```

## ПЕРЕВІРКА

```bash
eu-node-basics verify 25 threadpool_limit.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node threadpool_limit.js 3000
```
2. Викличте маршрут:
```bash
curl -i http://127.0.0.1:3000/threadpool-limit
```
3. Перевірте негативні кейси:
```bash
curl -i -X POST http://127.0.0.1:3000/threadpool-limit
curl -i http://127.0.0.1:3000/nope
```
4. Запустіть перевірку:
```bash
eu-node-basics verify 25 threadpool_limit.js
```
