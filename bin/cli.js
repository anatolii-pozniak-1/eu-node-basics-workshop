#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const renderMarkdown = require("./render-markdown");
let inquirerStartMenu;

const ROOT = path.resolve(__dirname, "..");
const PROGRESS_PATH = path.join(ROOT, ".progress.json");
const EXERCISES_DIR = path.join(ROOT, "exercises");
const PRACTICE_DEFINITIONS = [
  {
    id: "manual-http-router",
    title: "Practice 4 - Manual HTTP Router",
    match: (exerciseNumber) => exerciseNumber >= 1 && exerciseNumber <= 5,
  },
  {
    id: "json-processing",
    title: "Practice 5 - JSON Processing Exercise Series",
    match: (exerciseNumber) => exerciseNumber >= 6 && exerciseNumber <= 10,
  },
  {
    id: "file-persistence",
    title: "Practice 6 - File-Based Persistence",
    match: (exerciseNumber) => exerciseNumber >= 16 && exerciseNumber <= 20,
  },
  {
    id: "async-control",
    title: "Practice 7 - Parallel vs Sequential I/O",
    match: (exerciseNumber) => exerciseNumber >= 21 && exerciseNumber <= 25,
  },
  {
    id: "streams",
    title: "Practice 8 - Streams in Node.js",
    match: (exerciseNumber) => exerciseNumber >= 11 && exerciseNumber <= 15,
  },
  {
    id: "mini-rest-api",
    title: "Practice 9 - Mini REST API (Pure Node.js)",
    match: (exerciseNumber) => exerciseNumber >= 26 && exerciseNumber <= 30,
  },
  {
    id: "ci-deployment",
    title: "Practice 10 - CI + Deployment",
    match: (exerciseNumber) => exerciseNumber >= 31 && exerciseNumber <= 35,
  },
];

function extractPracticeNumber(title) {
  const match = String(title || "").match(/Practice\s+(\d+)/i);
  return match ? Number(match[1]) : null;
}

function handleStdIoError(err) {
  if (err && err.code === "EPIPE") {
    process.exit(0);
  }
  throw err;
}

process.stdout.on("error", handleStdIoError);
process.stderr.on("error", handleStdIoError);

function loadProgress() {
  try {
    const raw = fs.readFileSync(PROGRESS_PATH, "utf8");
    return JSON.parse(raw);
  } catch {
    return { completed: {} };
  }
}

function formatTitleFromId(id) {
  return id
    .replace(/^\d+-/, "")
    .replace(/-/g, " ")
    .toUpperCase();
}

function readTitleFromInstruction(exDir, fallbackTitle) {
  const instructionPath = path.join(exDir, "instruction.md");
  try {
    const text = fs.readFileSync(instructionPath, "utf8");
    const firstLine = text.split(/\r?\n/).find(Boolean) || "";
    const match = firstLine.match(/^#\s+\d+\s*-\s*(.+)$/);
    if (match && match[1]) {
      return match[1].trim().replace(/^\d+\.\d+\s+/, "");
    }
  } catch {
    // Fallback handled below.
  }
  return fallbackTitle;
}

function loadExercises() {
  const entries = fs.readdirSync(EXERCISES_DIR, { withFileTypes: true });
  const dirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => /^\d{2}-/.test(name));

  const loaded = dirs
    .map((id) => {
      const dir = path.join(EXERCISES_DIR, id);
      const instructionPath = path.join(dir, "instruction.md");
      const verifyPath = path.join(dir, "verify.js");
      if (!fs.existsSync(instructionPath) || !fs.existsSync(verifyPath)) {
        return null;
      }
      const fallbackTitle = formatTitleFromId(id);
      return {
        id,
        title: readTitleFromInstruction(dir, fallbackTitle),
        dir,
      };
    })
    .filter(Boolean);

  loaded.sort((a, b) => a.id.localeCompare(b.id));
  return loaded;
}

const exercises = loadExercises();

function getExerciseNumber(exercise) {
  return Number(String(exercise.id).split("-")[0]);
}

function findExerciseByNumber(number) {
  return exercises.find((exercise) => getExerciseNumber(exercise) === number);
}

function buildDisplayIndexMap(allExercises) {
  const map = new Map();

  PRACTICE_DEFINITIONS.forEach((def) => {
    const practiceNumber = extractPracticeNumber(def.title);
    if (!practiceNumber) return;

    const matched = allExercises
      .filter((ex) => def.match(getExerciseNumber(ex)))
      .sort((a, b) => a.id.localeCompare(b.id));

    matched.forEach((ex, idx) => {
      map.set(ex.id, `${practiceNumber}.${idx + 1}`);
    });
  });

  return map;
}

const DISPLAY_INDEX_BY_ID = buildDisplayIndexMap(exercises);

function getDisplayIndex(exercise) {
  return DISPLAY_INDEX_BY_ID.get(exercise.id) || String(getExerciseNumber(exercise));
}

exercises.forEach((ex) => {
  ex.displayIndex = getDisplayIndex(ex);
});

function loadPractices(allExercises) {
  const grouped = PRACTICE_DEFINITIONS.map((def) => ({
    id: def.id,
    title: def.title,
    exercises: [],
  }));
  const fallback = {
    id: "other",
    title: "Other Exercises",
    exercises: [],
  };

  allExercises.forEach((ex) => {
    const exerciseNumber = Number(ex.id.split("-")[0]);
    const matchIndex = PRACTICE_DEFINITIONS.findIndex((def) => def.match(exerciseNumber));
    if (matchIndex >= 0) {
      grouped[matchIndex].exercises.push(ex);
      return;
    }
    fallback.exercises.push(ex);
  });

  const practices = grouped.filter((practice) => practice.exercises.length > 0);
  if (fallback.exercises.length > 0) {
    practices.push(fallback);
  }
  return practices;
}

const practices = loadPractices(exercises);

function saveProgress(progress) {
  fs.writeFileSync(PROGRESS_PATH, JSON.stringify(progress, null, 2));
}

function showList(progress) {
  console.log("LEARN YOU THE NODE.JS FOR MUCH WIN!\n");
  exercises.forEach((ex) => {
    const done = progress.completed[ex.id] ? "[COMPLETED]" : "";
    const num = String(getExerciseNumber(ex)).padStart(2, " ");
    const displayIndex = ex.displayIndex || getDisplayIndex(ex);
    console.log(` ${num}. [${displayIndex}] ${ex.title} ${done}`);
  });
  console.log("\nHELP\nEXIT\n");
}

function showHelp() {
  console.log("Commands:");
  console.log("  eu-node-basics         Start the interactive menu");
  console.log("  eu-node-basics help    Show help\n");
}

function showInstructions(ex) {
  const file = path.join(ex.dir, "instruction.md");
  const text = fs.readFileSync(file, "utf8");
  console.log(renderMarkdown(text));
}

async function verifySolution(ex, solutionPath, options = {}) {
  const { interactive = false } = options;
  const progress = loadProgress();
  const verifyPath = path.join(ex.dir, "verify.js");
  const verify = require(verifyPath);
  try {
    await verify(solutionPath);
    progress.completed[ex.id] = true;
    saveProgress(progress);
    console.log("\nPASS\n");
    return true;
  } catch (err) {
    console.error("\nFAIL\n");
    console.error(err && err.message ? err.message : err);
    if (!interactive) {
      process.exitCode = 1;
    }
    return false;
  }
}

async function startMenu() {
  if (!inquirerStartMenu) {
    inquirerStartMenu = require("./inquirer-menu");
  }
  await inquirerStartMenu({
    practices,
    loadProgress,
    showHelp,
    verifyExercise: async (exercise, solutionPath) =>
      verifySolution(exercise, solutionPath, { interactive: true }),
  });
}

async function main() {
  const args = process.argv.slice(2);
  const cmd = args[0];

  if (cmd === "help") {
    showHelp();
    return;
  }

  if (cmd) {
    console.error("Interactive mode only. Run: eu-node-basics");
    process.exit(1);
  }

  if (!process.stdin.isTTY || !process.stdout.isTTY) {
    console.error("Interactive TTY is required. Run this command in a terminal.");
    process.exit(1);
  }

  await startMenu();
}

main().catch((err) => {
  console.error(err && err.message ? err.message : err);
  process.exit(1);
});
