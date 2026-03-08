# 35 - 10.3 PRODUCTION HARDENING

Зробіть ваш Node.js сервер безпечнішим для умов production.

## ВИМОГИ

Ваша програма повинна:

* Запускати сервер через `process.env.PORT`
* Обробляти `GET /health` і повертати JSON:
  * `{ "ok": true }`
* Обробляти `GET /boom`, генеруючи (або імітуючи) внутрішню помилку, і повертати:
  * статус `500`
  * тіло з текстом `Internal Server Error`
* Після `/boom` сервер повинен залишатися працездатним
* Додавати security-заголовки у відповіді:
  * `X-Content-Type-Options: nosniff`
  * `X-Frame-Options: DENY`
  * `Referrer-Policy: no-referrer`
* Додати підтримку CORS:
  * `Access-Control-Allow-Origin` у звичайних відповідях
  * Обробка `OPTIONS /health` зі статусом `204`

## ПЕРЕВІРКА

Передайте шлях до вашого файлу сервера у verify:

```bash
eu-node-basics verify 35 production_hardening.js
```

## НАЛАГОДЖЕННЯ
1. Запустіть рішення вручну:
```bash
node production_hardening.js 3000
```
2. Відкрийте відповідний `verify.js` для цієї вправи і подивіться, які саме запити/перевірки він виконує.
3. Повторіть ці запити вручну через `curl` або браузер.
4. Додайте тимчасові `console.log(...)`, якщо потрібно перевірити маршрут, метод, тіло запиту або дані відповіді.
5. Після локальної перевірки знову запустіть `eu-node-basics verify ...`.
