# 30 - 9.5 REST DELETE

Реалізуйте маршрут видалення ресурсу за id.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `DELETE /items/:id`
* Видалити відповідний елемент із `data.json`
* Повернути статус `200`
* Повернути `404`, якщо елемент не знайдено
* Невідомі маршрути (або неправильний метод для цього маршруту) не повинні повертати `200`

## ПРИКЛАД `data.json` (до)

```json
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" },
  { "id": 3, "name": "Gamma" }
]
```

## ПРИКЛАД ЗАПИТУ

```http
DELETE /items/2
```

## ОЧІКУВАНА ВІДПОВІДЬ

Статус `200`.

## ПЕРЕВІРКА

```bash
eu-node-basics verify 30 rest_delete.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node rest_delete.js 3000
```
2. Створіть локальний файл:
```bash
cat > data.json <<'JSON'
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" },
  { "id": 3, "name": "Gamma" }
]
JSON
```
3. Успішний кейс (`200`):
```bash
curl -i -X DELETE http://127.0.0.1:3000/items/2
cat data.json
```
4. Кейс `id` не знайдено (`404`):
```bash
curl -i -X DELETE http://127.0.0.1:3000/items/999
```
5. Запустіть перевірку:
```bash
eu-node-basics verify 30 rest_delete.js
```
