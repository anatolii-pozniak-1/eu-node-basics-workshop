# 33 - 10.2 GITHUB ACTIONS

Налаштуйте CI workflow.

## ВИМОГИ

Створіть `.github/workflows/autograde.yml`, який:

* Запускається на push або pull_request
* Налаштовує Node.js
* Встановлює залежності
* Запускає тести (`npm test` або `node --test`)

## ПЕРЕВІРКА

Передайте шлях до workflow-файлу у verify:

```bash
eu-node-basics verify 33 .github/workflows/autograde.yml
```

## НАЛАГОДЖЕННЯ
Відкрийте workflow-файл і перевірте вручну, чи він:
* запускається на `push` або `pull_request`
* використовує `actions/setup-node`
* встановлює залежності
* запускає тести
