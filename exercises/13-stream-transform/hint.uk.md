# Підказка - STREAM TRANSFORM

* Зчитайте `fileName` з query-параметрів.
* Побудуйте локальний шлях до файлу з цього значення.
* Використайте `fs.createReadStream(filePath)` для вихідного файлу.
* Створіть власний `Transform` stream.
* У `transform(chunk, encoding, callback)` повертайте `chunk.toString().toUpperCase()`.
