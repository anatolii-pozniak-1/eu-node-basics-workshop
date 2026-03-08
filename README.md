# EU Node Basics Workshop

A learnyounode-style interactive workshop for Node.js backend fundamentals.

## Install

```
npm install
```

Then start the interactive menu:

```
npm start
```

Interactive flow:
- Choose a practice.
- Choose an exercise (displayed with module index like `4.1`, `5.3`, `8.2`).
- Read instructions, show a hint, or verify your solution.
- Use `Back` to navigate and `Exit` to close the app.
- After successful verification, exercise is marked `[COMPLETED]`.

## Commands

```
npm start                                         # interactive menu
eu-node-basics                                    # interactive menu (if linked globally)
eu-node-basics help                               # command help
```

## Practices
- Practice 4: Manual HTTP Router
- Practice 5: JSON Processing
- Practice 6: File-Based Persistence
- Practice 7: Parallel vs Sequential I/O
- Practice 8: Streams in Node.js
- Practice 9: Mini REST API (Pure Node.js)
- Practice 10: CI + Deployment

## Notes
- Uses `inquirer` for the interactive terminal menu.
- Progress is stored in `.progress.json`.
- CLI is interactive-only (no separate `list/select/verify` command mode).
