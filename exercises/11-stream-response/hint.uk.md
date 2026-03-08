# Підказка - STREAM FILE TO RESPONSE

* Зчитайте `fileName` з query-параметрів.
* Побудуйте локальний шлях до файлу з цього значення.
* Створіть readable stream через `fs.createReadStream(filePath)`.
* Перед `pipe` встановіть статус і заголовки відповіді.
* Використайте `readStream.pipe(res)`.
* Обробіть `error` у стрімі, щоб сервер не падав.
