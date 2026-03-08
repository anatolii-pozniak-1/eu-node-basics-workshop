# 21 - 7.1 SEQUENTIAL FILE READS

Прочитайте 3 файли послідовно.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `GET /sequential`
* Прочитати `a.txt`, потім `b.txt`, потім `c.txt` у суворій послідовності
* Повернути JSON з полями:
  * `combined` (рядок)
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
GET /sequential
```

## ОЧІКУВАНА ВІДПОВІДЬ

Статус `200` і JSON:

```json
{
  "combined": "ABC",
  "elapsedMs": 123
}
```

## ПЕРЕВІРКА

```bash
eu-node-basics verify 21 sequential_file_reads.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node sequential_file_reads.js 3000
```
2. Створіть локальні файли:
```bash
echo "A" > a.txt
echo "B" > b.txt
echo "C" > c.txt
```
3. Перевірте успішну відповідь:
```bash
curl -i http://127.0.0.1:3000/sequential
```
4. Перевірте негативні кейси:
```bash
curl -i -X POST http://127.0.0.1:3000/sequential
curl -i http://127.0.0.1:3000/nope
```
5. Запустіть перевірку:
```bash
eu-node-basics verify 21 sequential_file_reads.js
```
