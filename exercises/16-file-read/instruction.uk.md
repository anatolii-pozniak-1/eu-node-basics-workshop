# 16 - 6.1 FILE READ

Завантажте JSON із файлу та поверніть його через endpoint.

## ВИМОГИ

Ваша програма повинна:

* Прочитати `data.json`
* Обробляти `GET /data`
* Повернути вміст файлу як JSON-об'єкт
* Повернути статус `200`
* Встановити заголовок `Content-Type: application/json`
* Якщо `data.json` неможливо розпарсити, повернути статус `400` або `500`

## ПЕРЕВІРКА

```bash
eu-node-basics verify 16 file_read.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node file_read.js 3000
```
2. Створіть локальні тестові файли:
```bash
bash exercises/16-file-read/debug.sh
```
3. Перевірте успішний кейс (`data.json` валідний):
```bash
curl -i http://127.0.0.1:3000/data
```
4. Перевірте помилковий кейс (`data.json` невалідний):
```bash
cp data.invalid.json data.json
curl -i http://127.0.0.1:3000/data
```
5. Поверніть валідний файл і запустіть перевірку:
```bash
cp data.valid.json data.json
eu-node-basics verify 16 file_read.js
```
