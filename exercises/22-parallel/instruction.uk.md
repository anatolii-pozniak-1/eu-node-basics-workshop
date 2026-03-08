# 22 - 7.2 PARALLEL READS

Прочитайте файли паралельно за допомогою `Promise.all`.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `GET /parallel`
* Прочитати `a.txt`, `b.txt`, `c.txt` паралельно
* Використати `Promise.all(...)`, щоб читання виконувалися паралельно
* Повернути JSON з полями:
  * `combined` (рядок: `a.txt + b.txt + c.txt`)
  * `elapsedMs` (число)
* Встановити заголовок `Content-Type: application/json`
* Невідомі маршрути (або неправильний метод для цього маршруту) не повинні повертати `200`

## ПРИКЛАД ВХІДНИХ ФАЙЛІВ

```txt
a.txt -> A
b.txt -> B
c.txt -> C
```

## ПРИКЛАД ЗАПИТУ

```http
GET /parallel
```

## ОЧІКУВАНА ВІДПОВІДЬ

Статус `200` і JSON, наприклад:

```json
{
  "combined": "ABC",
  "elapsedMs": 123
}
```

## ПЕРЕВІРКА

```bash
eu-node-basics verify 22 parallel_reads.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node parallel_reads.js 3000
```
2. Створіть локальні файли:
```bash
echo "A" > a.txt
echo "B" > b.txt
echo "C" > c.txt
```
3. Перевірте успішну відповідь:
```bash
curl -i http://127.0.0.1:3000/parallel
```
4. Перевірте негативні кейси:
```bash
curl -i -X POST http://127.0.0.1:3000/parallel
curl -i http://127.0.0.1:3000/nope
```
5. Запустіть перевірку:
```bash
eu-node-basics verify 22 parallel_reads.js
```
