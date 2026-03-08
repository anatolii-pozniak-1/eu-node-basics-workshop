# Підказка - STREAM COUNTER

* Слухайте події `data` на `req`.
* Збільшуйте `chunks` для кожного чанка.
* Додавайте `chunk.length` до загальної кількості `bytes`.
* На `end` поверніть JSON.
