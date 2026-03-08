# 26 - 9.1 REST LIST

Реалізуйте маршрут для отримання списку ресурсів.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `GET /items`
* Читати елементи з `data.json` (масив)
* Повернути статус `200`
* Повернути JSON-масив
* Встановити `Content-Type: application/json`
* Невідомі маршрути (або неправильний метод для цього маршруту) не повинні повертати `200`

## ПРИКЛАД `data.json`

```json
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" }
]
```

## ПРИКЛАД ЗАПИТУ

```http
GET /items
```

## ОЧІКУВАНА ВІДПОВІДЬ

Статус `200` і JSON:

```json
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" }
]
```

## ПЕРЕВІРКА

```bash
eu-node-basics verify 26 rest_list.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node rest_list.js 3000
```
2. Створіть локальний файл:
```bash
cat > data.json <<'JSON'
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" }
]
JSON
```
3. Успішний кейс:
```bash
curl -i http://127.0.0.1:3000/items
```
4. Негативні кейси:
```bash
curl -i -X POST http://127.0.0.1:3000/items
curl -i http://127.0.0.1:3000/nope
```
5. Запустіть перевірку:
```bash
eu-node-basics verify 26 rest_list.js
```
