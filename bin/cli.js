#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

const ROOT = path.resolve(__dirname, "..");
const PROGRESS_PATH = path.join(ROOT, ".progress.json");

const exercises = [
  {
    id: "01-root",
    title: "ROOT ROUTE",
    dir: path.join(ROOT, "exercises", "01-root"),
  },
  {
    id: "02-time",
    title: "TIME ROUTE",
    dir: path.join(ROOT, "exercises", "02-time"),
  },
  {
    id: "03-echo",
    title: "ECHO ROUTE",
    dir: path.join(ROOT, "exercises", "03-echo"),
  },
  {
    id: "04-sum",
    title: "SUM ROUTE",
    dir: path.join(ROOT, "exercises", "04-sum"),
  },
  {
    id: "05-404",
    title: "NOT FOUND ROUTE",
    dir: path.join(ROOT, "exercises", "05-404"),
  },
];

function loadProgress() {
  try {
    const raw = fs.readFileSync(PROGRESS_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return { completed: {} };
  }
}

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2));
}

function showList(progress) {
  console.log("LEARN YOU THE NODE.JS FOR MUCH WIN!\n");
  exercises.forEach((ex, idx) => {
    const done = progress.completed[ex.id] ? "[COMPLETED]" : "";
    const num = String(idx + 1).padStart(2, " ");
    console.log(` ${num}. ${ex.title} ${done}`);
  });
  console.log("\nHELP\nEXIT\n");
}

function showHelp() {
  console.log("Commands:");
  console.log("  manual-http-router         Start the menu");
  console.log("  manual-http-router list    Show exercise list");
  console.log("  manual-http-router select <number>  Show instructions");
  console.log("  manual-http-router verify <number> <path>  Verify a solution");
  console.log("  manual-http-router help    Show help\n");
}

function showInstructions(ex) {
  const file = path.join(ex.dir, "instruction.md");
  const text = fs.readFileSync(file, "utf8");
  console.log(text);
}

async function verifySolution(ex, solutionPath) {
  const progress = loadProgress();
  const verifyPath = path.join(ex.dir, "verify.js");
  const verify = require(verifyPath);
  try {
    await verify(solutionPath);
    progress.completed[ex.id] = true;
    saveProgress(progress);
    console.log("\nPASS\n");
    console.log("Next commands:");
    console.log("  manual-http-router list");
    console.log("  manual-http-router select <number>");
    console.log(`  manual-http-router verify <number> ${solutionPath}\n`);
  } catch (err) {
    console.error("\nFAIL\n");
    console.error(err && err.message ? err.message : err);
    process.exitCode = 1;
  }
}

function startMenu() {
  const progress = loadProgress();
  showList(progress);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Select an exercise number (or 'help', 'exit'): ", (answer) => {
    const trimmed = answer.trim().toLowerCase();
    if (trimmed === "exit" || trimmed === "quit") {
      rl.close();
      return;
    }
    if (trimmed === "help") {
      showHelp();
      rl.close();
      return;
    }

    const num = Number(trimmed);
    if (!Number.isInteger(num) || num < 1 || num > exercises.length) {
      console.error("Invalid selection.");
      rl.close();
      return;
    }

    const ex = exercises[num - 1];
    showInstructions(ex);
    rl.close();
  });
}

function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (!cmd) {
    return startMenu();
  }

  if (cmd === "help") return showHelp();
  if (cmd === "list") return showList(loadProgress());
  if (cmd === "select") {
    const num = Number(args[1]);
    if (!Number.isInteger(num)) {
      console.error("select requires a number");
      process.exit(1);
    }
    const ex = exercises[num - 1];
    if (!ex) {
      console.error("Unknown exercise number");
      process.exit(1);
    }
    return showInstructions(ex);
  }
  if (cmd === "verify") {
    const num = Number(args[1]);
    const target = args[2];
    if (!Number.isInteger(num) || !target) {
      console.error("verify requires an exercise number and path to solution");
      process.exit(1);
    }
    const ex = exercises[num - 1];
    if (!ex) {
      console.error("Unknown exercise number");
      process.exit(1);
    }
    const full = path.resolve(process.cwd(), target);
    if (!fs.existsSync(full)) {
      console.error("File not found:", full);
      process.exit(1);
    }
    return verifySolution(ex, full);
  }

  console.error("Unknown command. Use 'help'.");
  process.exit(1);
}

main();
