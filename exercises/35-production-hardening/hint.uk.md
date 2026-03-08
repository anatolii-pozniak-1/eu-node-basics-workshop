# Підказка - PRODUCTION HARDENING

* Створіть helper для встановлення заголовків для кожної відповіді.
* Обгорніть обробку маршрутів у `try/catch`.
* Для `/boom` кидайте помилку та повертайте узагальнену відповідь.
* Не віддавайте клієнту stack trace; використовуйте `Internal Server Error`.
* Для CORS preflight:
  * якщо `req.method === "OPTIONS"`, швидко поверніть `204`.
* Для порту використовуйте:
  * `const port = Number(process.env.PORT || 3000)`
