# 19 - 6.4 FILE DELETE

Видаліть елемент із `data.json` за id.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `DELETE /data/:id`
* Видаляти об'єкт із відповідним id з `data.json`
* Повернути статус `200`
* Якщо об'єкт із вказаним id не знайдено, повернути статус `404`
* Якщо вміст `data.json` є невалідним JSON, повернути статус `400`
* Якщо `data.json` не існує, повернути статус `500`

Приклад `data.json`:

```json
[
  { "id": 1, "name": "One" },
  { "id": 2, "name": "Two" },
  { "id": 3, "name": "Three" }
]
```

Приклад запиту:

```http
DELETE /data/2
```

## ПЕРЕВІРКА

```bash
eu-node-basics verify 19 file_delete.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node file_delete.js 3000
```
2. Створіть локальні тестові файли:
```bash
bash exercises/19-file-delete/debug.sh
```
3. Успішний кейс (`200`):
```bash
curl -i -X DELETE http://127.0.0.1:3000/data/2
cat data.json
```
4. Кейс `id` не знайдено (`404`):
```bash
curl -i -X DELETE http://127.0.0.1:3000/data/999
```
5. Невалідний `data.json` (`400`):
```bash
cp data.malformed.json data.json
curl -i -X DELETE http://127.0.0.1:3000/data/2
```
6. Відсутній файл (`500`):
```bash
rm data.json
curl -i -X DELETE http://127.0.0.1:3000/data/2
```
7. Запустіть перевірку:
```bash
eu-node-basics verify 19 file_delete.js
```
