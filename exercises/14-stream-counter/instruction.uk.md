# 14 - 8.4 STREAM COUNTER

Порахуйте байти та чанки у стрімінговому тілі запиту.

## ВИМОГИ

Ваша програма повинна:

* Обробляти `POST /count`
* Читати тіло запиту як стрім
* Повернути JSON з полями:
  * `bytes`
  * `chunks`

## ПЕРЕВІРКА

```bash
eu-node-basics verify 14 stream_counter.js
```
