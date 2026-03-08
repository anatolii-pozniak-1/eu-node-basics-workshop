const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const renderMarkdown = require("./render-markdown");
const inquirerApi = inquirer.default || inquirer;

const LANG_LABELS = {
  en: "English",
  uk: "Українська",
};

const UI = {
  en: {
    choosePractice: "Choose a practice",
    help: "Help",
    exit: "Exit",
    back: "Back",
    invalidPractice: "Invalid practice selection.",
    invalidExercise: "Invalid selection. Please choose an exercise.",
    showHint: "Show hint",
    verify: "Verify",
    noHint: "No hint available for this exercise yet.",
    solutionPrompt: "Path to your solution file (relative or absolute):",
    fileNotFound: "File not found:",
    changeLanguage: "Language",
    chooseLanguage: "Choose language",
  },
  uk: {
    choosePractice: "Оберіть практику",
    help: "Допомога",
    exit: "Вихід",
    back: "Назад",
    invalidPractice: "Невірно вибрана практика.",
    invalidExercise: "Невірний вибір. Оберіть вправу.",
    showHint: "Показати підказку",
    verify: "Перевірити",
    noHint: "Для цієї вправи підказки поки немає.",
    solutionPrompt: "Шлях до файлу рішення (відносний або абсолютний):",
    fileNotFound: "Файл не знайдено:",
    changeLanguage: "Мова",
    chooseLanguage: "Оберіть мову",
  },
};

function text(lang, key) {
  return (UI[lang] && UI[lang][key]) || UI.en[key] || key;
}

function suggestSolutionPath(exercise) {
  const exerciseId = exercise && exercise.id ? exercise.id : "";
  const exerciseTitle = exercise && exercise.title ? exercise.title : "";
  const prefix = String(exerciseId || "").split("-")[0] || "";
  const numeric = String(Number(prefix));
  const titleSlug = String(exerciseTitle || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  const idSlug = String(exerciseId || "")
    .replace(/^\d+-/, "")
    .replace(/-/g, "_");
  const candidates = [
    path.join("solutions", `${titleSlug}.js`),
    path.join("solutions", `${idSlug}.js`),
    path.join("solutions", `${numeric}.js`),
    path.join("solutions", `${prefix}.js`),
    path.join("solutions", `solution${numeric}.js`),
    path.join("solutions", `solution-${numeric}.js`),
  ];

  for (const rel of candidates) {
    if (fs.existsSync(path.resolve(process.cwd(), rel))) {
      return rel;
    }
  }

  if (titleSlug) {
    return path.join("solutions", `${titleSlug}.js`);
  }
  return path.join("solutions", `${numeric}.js`);
}

function resolveExercise(selection, exercises) {
  if (selection && typeof selection === "string") {
    const byId = exercises.find((ex) => ex.id === selection);
    if (byId) return byId;

    if (/^\d+$/.test(selection)) {
      const idx = Number(selection) - 1;
      if (idx >= 0 && idx < exercises.length) {
        return exercises[idx];
      }
    }
  }
  return null;
}

function readLocalizedMarkdown(exerciseDir, baseName, lang) {
  const localizedPath = path.join(exerciseDir, `${baseName}.${lang}.md`);
  const fallbackPath = path.join(exerciseDir, `${baseName}.md`);

  if (fs.existsSync(localizedPath)) {
    return fs.readFileSync(localizedPath, "utf8");
  }
  if (fs.existsSync(fallbackPath)) {
    return fs.readFileSync(fallbackPath, "utf8");
  }

  throw new Error(`Missing content file: ${baseName}.md`);
}

function getExerciseNumber(exercise) {
  return Number(String(exercise.id).split("-")[0]);
}

function getExerciseDisplayIndex(exercise) {
  return exercise && exercise.displayIndex
    ? exercise.displayIndex
    : String(getExerciseNumber(exercise));
}

module.exports = async function inquirerStartMenu({
  practices,
  loadProgress,
  showHelp,
  verifyExercise,
}) {
  let lang = "en";

  while (true) {
    const progress = loadProgress();
    const practiceChoices = practices.map((practice, idx) => {
      const completedCount = practice.exercises.filter((ex) => progress.completed[ex.id]).length;
      const total = practice.exercises.length;
      return {
        name: `${String(idx + 1).padStart(2, " ")}. ${practice.title} (${completedCount}/${total})`,
        value: practice.id,
      };
    });

    practiceChoices.push(new inquirerApi.Separator());
    practiceChoices.push({
      name: `${text(lang, "changeLanguage")}: ${LANG_LABELS[lang]}`,
      value: "language",
    });
    practiceChoices.push({ name: text(lang, "help"), value: "help" });
    practiceChoices.push({ name: text(lang, "exit"), value: "exit" });

    const { practiceSelection } = await inquirerApi.prompt([
      {
        type: "rawlist",
        name: "practiceSelection",
        message: text(lang, "choosePractice"),
        choices: practiceChoices,
        pageSize: 10,
      },
    ]);

    if (practiceSelection === "exit") return;
    if (practiceSelection === "language") {
      const { selectedLang } = await inquirerApi.prompt([
        {
          type: "rawlist",
          name: "selectedLang",
          message: text(lang, "chooseLanguage"),
          choices: [
            { name: LANG_LABELS.en, value: "en" },
            { name: LANG_LABELS.uk, value: "uk" },
          ],
        },
      ]);
      lang = selectedLang;
      continue;
    }
    if (practiceSelection === "help") {
      showHelp();
      continue;
    }

    const selectedPractice = practices.find((p) => p.id === practiceSelection);
    if (!selectedPractice) {
      console.error(text(lang, "invalidPractice"));
      continue;
    }

    while (true) {
      const practiceProgress = loadProgress();
      const exercises = selectedPractice.exercises;
      const choices = exercises.map((ex) => {
        const done = practiceProgress.completed[ex.id] ? " [COMPLETED]" : "";
        return {
          name: `[${getExerciseDisplayIndex(ex)}] ${ex.title}${done}`,
          value: ex.id,
        };
      });

      choices.push(new inquirerApi.Separator());
      choices.push({ name: text(lang, "back"), value: "back-practices" });
      choices.push({ name: text(lang, "help"), value: "help" });
      choices.push({ name: text(lang, "exit"), value: "exit" });

      const { selection } = await inquirerApi.prompt([
        {
          type: "rawlist",
          name: "selection",
          message: selectedPractice.title,
          choices,
          pageSize: 12,
        },
      ]);

      if (selection === "exit") return;
      if (selection === "help") {
        showHelp();
        continue;
      }
      if (selection === "back-practices") {
        break;
      }

      const selectedExercise = resolveExercise(selection, exercises);
      if (!selectedExercise) {
        console.error(text(lang, "invalidExercise"));
        continue;
      }

      const instructionText = readLocalizedMarkdown(selectedExercise.dir, "instruction", lang);
      console.log("");
      console.log(renderMarkdown(instructionText));

      while (true) {
        const exerciseProgress = loadProgress();
        const completed = exerciseProgress.completed[selectedExercise.id] ? " [COMPLETED]" : "";
        const { action } = await inquirerApi.prompt([
          {
            type: "rawlist",
            name: "action",
            message: `${selectedExercise.title}${completed}`,
            choices: [
              { name: text(lang, "showHint"), value: "hint" },
              { name: text(lang, "verify"), value: "verify" },
              { name: text(lang, "back"), value: "back" },
              { name: text(lang, "exit"), value: "exit" },
            ],
          },
        ]);

        if (action === "back") break;
        if (action === "exit") return;

        if (action === "hint") {
          try {
            const hintText = readLocalizedMarkdown(selectedExercise.dir, "hint", lang);
            console.log("");
            console.log(renderMarkdown(hintText));
          } catch {
            console.log(`\n${text(lang, "noHint")}\n`);
          }
          continue;
        }

        if (action === "verify") {
          const defaultSolution = suggestSolutionPath(selectedExercise);
          const { solutionPath } = await inquirerApi.prompt([
            {
              type: "input",
              name: "solutionPath",
              message: text(lang, "solutionPrompt"),
              default: defaultSolution,
            },
          ]);

          const full = path.resolve(process.cwd(), String(solutionPath || "").trim());
          if (!fs.existsSync(full)) {
            console.error(`\n${text(lang, "fileNotFound")} ${full}\n`);
            continue;
          }

          await verifyExercise(selectedExercise, full);
        }
      }
    }
  }
};
