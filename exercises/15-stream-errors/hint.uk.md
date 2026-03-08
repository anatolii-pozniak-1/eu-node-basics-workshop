# Підказка - STREAM ERRORS

* Зчитайте `fileName` з query-параметрів.
* Створіть read stream до виклику `pipe`.
* Підпишіться на подію `error`.
* У разі помилки поверніть `500` і безпечне повідомлення, наприклад `Internal Server Error`.
