const input = CodeMirror.fromTextArea(document.getElementById("input"), {
    theme: "default",
    lineWrapping: true,
    lineNumbers: true,
  });
  const output = CodeMirror.fromTextArea(document.getElementById("output"), {
    theme: "dracula",
    highlightFormatting: true,
    lineWrapping: true,
    lineNumbers: true,
    mode: 'markdown',
    readOnly: true
  });

input.on("change", (cm) => {
let lines = cm.getValue().split("\n");
let markdown = [];

lines.forEach((line) => {
let match = line.match(/(\d+:\d+)\s*(.*)/);
if (!match) {
  markdown.push(line);
  return;
}

let timestamp = match[1];
let sentence = match[2];

let minutes = parseInt(timestamp.split(":")[0]);
let seconds = parseInt(timestamp.split(":")[1]);

let hyperlink = minutes * 60 + seconds;

markdown.push(`[${timestamp}](#t=${hyperlink}) ${sentence}`);
});

output.setValue(markdown.join("\n\n"));
});