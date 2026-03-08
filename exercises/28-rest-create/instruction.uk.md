# 28 - 9.3 REST CREATE

Реалізуйте маршрут створення ресурсу.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `POST /items`
* Парсити JSON-тіло запиту
* Додати новий елемент у `data.json`
* Повернути статус `201`
* Повернути створений елемент як JSON
* Невідомі маршрути (або неправильний метод для цього маршруту) не повинні повертати `200`

## ПРИКЛАД `data.json` (до)

```json
[
  { "id": 1, "name": "Alpha" }
]
```

## ПРИКЛАД ЗАПИТУ

```http
POST /items
Content-Type: application/json

{ "id": 2, "name": "Beta" }
```

## ОЧІКУВАНА ВІДПОВІДЬ

Статус `201` і JSON:

```json
{ "id": 2, "name": "Beta" }
```

## ПЕРЕВІРКА

```bash
eu-node-basics verify 28 rest_create.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node rest_create.js 3000
```
2. Створіть локальний файл:
```bash
cat > data.json <<'JSON'
[
  { "id": 1, "name": "Alpha" }
]
JSON
```
3. Успішний кейс:
```bash
curl -i -X POST http://127.0.0.1:3000/items \
  -H "Content-Type: application/json" \
  --data-binary '{"id":2,"name":"Beta"}'
cat data.json
```
4. Негативні кейси:
```bash
curl -i http://127.0.0.1:3000/items
curl -i http://127.0.0.1:3000/nope
```
5. Запустіть перевірку:
```bash
eu-node-basics verify 28 rest_create.js
```
