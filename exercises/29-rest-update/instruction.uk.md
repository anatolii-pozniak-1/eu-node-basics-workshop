# 29 - 9.4 REST UPDATE

Реалізуйте маршрут оновлення ресурсу за id.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `PUT /items/:id`
* Парсити JSON-тіло з оновленням
* Оновити відповідний елемент у `data.json`
* Повернути статус `200`
* Повернути оновлений елемент як JSON
* Повернути `404`, якщо елемент не знайдено
* Невідомі маршрути (або неправильний метод для цього маршруту) не повинні повертати `200`

## ПРИКЛАД `data.json` (до)

```json
[
  { "id": 1, "name": "Alpha" },
  { "id": 2, "name": "Beta" }
]
```

## ПРИКЛАД ЗАПИТУ

```http
PUT /items/2
Content-Type: application/json

{ "name": "Updated Beta" }
```

## ОЧІКУВАНА ВІДПОВІДЬ

Статус `200` і JSON:

```json
{ "id": 2, "name": "Updated Beta" }
```

## ПЕРЕВІРКА

```bash
eu-node-basics verify 29 rest_update.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node rest_update.js 3000
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
3. Успішний кейс (`200`):
```bash
curl -i -X PUT http://127.0.0.1:3000/items/2 \
  -H "Content-Type: application/json" \
  --data-binary '{"name":"Updated Beta"}'
cat data.json
```
4. Кейс `id` не знайдено (`404`):
```bash
curl -i -X PUT http://127.0.0.1:3000/items/999 \
  -H "Content-Type: application/json" \
  --data-binary '{"name":"Nope"}'
```
5. Запустіть перевірку:
```bash
eu-node-basics verify 29 rest_update.js
```
