# 18 - 6.3 FILE UPDATE

Оновіть елемент у `data.json` за id.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `PUT /data/:id`
* Читати `data.json` (масив об'єктів)
* Оновлювати об'єкт із відповідним id
* Інші об'єкти мають залишитися без змін
* Повернути статус `200`
* Якщо об'єкт із вказаним id не знайдено, повернути статус `404`
* Якщо JSON у тілі запиту невалідний, повернути статус `400`
* Якщо `data.json` не існує, повернути статус `500`

Приклад `data.json`:

```json
[
  { "id": 1, "name": "One" },
  { "id": 2, "name": "Two" }
]
```

Приклад запиту:

```http
PUT /data/2
Content-Type: application/json

{ "name": "Updated Two" }
```

## ПЕРЕВІРКА

```bash
eu-node-basics verify 18 file_update.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node file_update.js 3000
```
2. Створіть локальні тестові файли:
```bash
bash exercises/18-file-update/debug.sh
```
3. Успішний кейс (`200`):
```bash
curl -i -X PUT http://127.0.0.1:3000/data/2 \
  -H "Content-Type: application/json" \
  --data-binary '{"name":"Updated Two"}'
cat data.json
```
4. Невалідний JSON (`400`):
```bash
curl -i -X PUT http://127.0.0.1:3000/data/2 \
  -H "Content-Type: application/json" \
  --data-binary '{"name": '
```
5. Відсутній файл (`500`):
```bash
rm data.json
curl -i -X PUT http://127.0.0.1:3000/data/2 \
  -H "Content-Type: application/json" \
  --data-binary '{"name":"Another Name"}'
```
6. Відсутній id (`404`):
```bash
bash exercises/18-file-update/debug.sh
curl -i -X PUT http://127.0.0.1:3000/data/999 \
  -H "Content-Type: application/json" \
  --data-binary '{"name":"Missing"}'
```
7. Запустіть перевірку:
```bash
eu-node-basics verify 18 file_update.js
```
