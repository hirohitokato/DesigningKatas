const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const inputFilePath = 'README.md';
const outputDir = './gen';
const outputFilePath = path.join(outputDir, 'index.html');

// Markdown-itのインスタンスを作成
const md = new markdownIt();

// README.mdを読み込む
const markdown = fs.readFileSync(inputFilePath, 'utf8');

// .md を .html に置換
let updatedMarkdown = markdown.replace(/\.md/g, '.html');

// HTMLコメントを除去
updatedMarkdown = updatedMarkdown.replace(/<!--.*?-->/gs, '');

// MarkdownをHTMLに変換
const result = md.render(updatedMarkdown);

// 出力ディレクトリが存在しない場合は作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// HTMLをファイルに書き込む
fs.writeFileSync(outputFilePath, result);

console.log(`Converted ${inputFilePath} to ${outputFilePath}`);
