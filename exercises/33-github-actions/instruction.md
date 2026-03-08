# 33 - 10.2 GITHUB ACTIONS

Set up a CI workflow.

## REQUIREMENTS

Create `.github/workflows/autograde.yml` that:

* Runs on push or pull_request
* Sets up Node.js
* Installs dependencies
* Runs tests (`npm test` or `node --test`)

## VERIFY

Pass the workflow file path to verify:

```bash
eu-node-basics verify 33 .github/workflows/autograde.yml
```

## Debug
Open the workflow file and manually confirm it:
* runs on `push` or `pull_request`
* uses `actions/setup-node`
* installs dependencies
* runs tests
