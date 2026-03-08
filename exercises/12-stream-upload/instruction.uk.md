# 12 - 8.2 STREAM UPLOAD

Збережіть тіло запиту у файл через writable stream.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `POST /upload`
* Використовувати `fs.createWriteStream()`
* Зберігати тіло запиту у `upload.txt`
* Вважати тіло HTTP-запиту вмістом файлу, який потрібно зберегти
* Повернути статус `200`
* Для будь-якого невідомого маршруту повертати статус `404`

## ПЕРЕВІРКА

```bash
eu-node-basics verify 12 stream_upload.js
```

## НАЛАГОДЖЕННЯ

Запустіть сервер вручну:

```bash
node stream_upload.js 3000
```

Передайте вміст файлу в тілі POST-запиту:

```bash
curl -i -X POST http://127.0.0.1:3000/upload \
  -H "Content-Type: text/plain" \
  --data-binary "uploaded via stream"
```

Потім перевірте, що записалося у файл:

```bash
cat upload.txt
```

Перевірте:
* статус відповіді `200`
* файл `upload.txt` створено
* вміст `upload.txt` точно збігається з тілом POST-запиту
