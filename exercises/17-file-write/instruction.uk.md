# 17 - 6.2 FILE WRITE

Збережіть вхідний JSON у `data.json`.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `POST /data`
* Парсити JSON-тіло запиту
* Зберігати тіло в `data.json`
* Повернути статус `200`
* Якщо тіло запиту невалідний JSON, повернути статус `400`

## ПЕРЕВІРКА

```bash
eu-node-basics verify 17 file_write.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node file_write.js 3000
```
2. Створіть локальні тестові файли:
```bash
bash exercises/17-file-write/debug.sh
```
3. Надішліть POST-запит із JSON-тілом:
```bash
curl -i -X POST http://127.0.0.1:3000/data \
  -H "Content-Type: application/json" \
  --data-binary @request.body.json
```
4. Перевірте записаний файл:
```bash
cat data.json
```
5. Запустіть перевірку:
```bash
eu-node-basics verify 17 file_write.js
```
