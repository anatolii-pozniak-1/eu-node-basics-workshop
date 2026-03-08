# 24 - 7.3 HANDLE PARTIAL FAILURES

Обробляйте часткові помилки через `Promise.allSettled`.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `POST /error-handling`
* Брати імена файлів із JSON-масиву в тілі запиту, наприклад:
  * `["a.txt", "missing.txt", "c.txt"]`
* Використати `Promise.allSettled`
* Повернути JSON з полями:
  * `successes` (масив)
  * `failures` (масив)
  * `total` (число)
* Якщо JSON у запиті невалідний або це не масив, повернути статус `400`

## ОЧІКУВАНА ВІДПОВІДЬ

Статус `200`, навіть якщо одне читання файлу неуспішне.

Приклад запиту:

```http
POST /error-handling
Content-Type: application/json

["a.txt", "missing.txt", "c.txt"]
```

## ПЕРЕВІРКА

```bash
eu-node-basics verify 24 handle_partial_failures.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node handle_partial_failures.js 3000
```
2. Створіть локальні файли:
```bash
echo "A" > a.txt
echo "C" > c.txt
```
3. Успішний кейс (`200` із частковою помилкою):
```bash
curl -i -X POST http://127.0.0.1:3000/error-handling \
  -H "Content-Type: application/json" \
  --data-binary '["a.txt","missing.txt","c.txt"]'
```
4. Невалідний JSON (`400`):
```bash
curl -i -X POST http://127.0.0.1:3000/error-handling \
  -H "Content-Type: application/json" \
  --data-binary '{"files":'
```
5. Запустіть перевірку:
```bash
eu-node-basics verify 24 handle_partial_failures.js
```
