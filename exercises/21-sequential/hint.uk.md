# Підказка - SEQUENTIAL FILE READS

* Використовуйте `await` для кожного файлу по черзі.
* Запустіть таймер: `const t0 = Date.now()`.
* Формуйте `combined` у тому ж порядку.
* Поверніть `elapsedMs: Date.now() - t0`.
