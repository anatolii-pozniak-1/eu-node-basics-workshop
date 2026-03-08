# Підказка - PARALLEL READS

* Запустіть таймер: `const t0 = Date.now()`.
* Використайте `Promise.all([...])` з 3 викликами `fs.promises.readFile`.
* Сформуйте `combined` з результатів у детермінованому порядку: a, b, c.
