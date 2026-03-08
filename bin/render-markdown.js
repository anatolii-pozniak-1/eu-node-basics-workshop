const { marked } = require("marked");
const TerminalRenderer = require("marked-terminal").default;

const renderer = new TerminalRenderer({
  code: (code, language) => {
    const lang = language ? `${language}\n` : "";
    return `\n${lang}${code}\n`;
  },
  heading: (text, level) => {
    const prefix = "#".repeat(level);
    return `\n${prefix} ${text}\n`;
  },
});

marked.setOptions({ renderer });

module.exports = function renderMarkdown(markdownText) {
  return marked.parse(String(markdownText || ""));
};
