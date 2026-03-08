# 11 - 8.1 STREAM FILE TO RESPONSE

Передайте локальний файл у HTTP-відповідь через стрім.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `GET /file?fileName=<name>`
* Використовувати `fs.createReadStream()`
* Читати файл з локального диска (поточна робоча директорія)
* Передавати вміст файлу у HTTP-відповідь через `pipe`
* Повернути статус `200`
* Встановити заголовок відповіді `Content-Type: text/plain; charset=utf-8`
* Якщо `fileName` відсутній або файл не існує, повернути статус `400`

## ПЕРЕВІРКА

```bash
eu-node-basics verify 11 stream_response.js
```

## НАЛАГОДЖЕННЯ

Запустіть сервер вручну:

```bash
echo "Hello stream response" > file.txt
node stream_response.js 3000
curl -i "http://127.0.0.1:3000/file?fileName=file.txt"
```

Перевірте:
* статус відповіді `200`
* тіло відповіді збігається з вмістом `file.txt`
