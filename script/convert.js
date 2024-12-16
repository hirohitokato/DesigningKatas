/**
 * ルートディレクトリにあるMarkdownファイルをHTMLファイルに変換する。
 * 
 * - ファイル内でリンク先に定義している.mdファイルへのリンクは拡張子をhtmlに変えるのみ
 */
const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it');
const outputDir = './public';

// コマンドライン引数をパース
if (process.argv.length != 4) {
  console.error("Invalid arguments.");
  process.exit(1);
}
const inputFilePath = process.argv[2];
const outputFilePath = path.join(outputDir, process.argv[3]);

// Markdown-itのインスタンスを作成
const md = new markdownIt();

// HTMLのテンプレートを読み込む
const template = fs.readFileSync('script/template.html', 'utf-8');

// README.mdを読み込む
const markdown = fs.readFileSync(inputFilePath, 'utf8');

// .md を .html に置換
let updatedMarkdown = markdown.replace(/\.md/g, '.html');

// HTMLコメントを除去
updatedMarkdown = updatedMarkdown.replace(/<!--.*?-->/gs, '');

// MarkdownをHTMLに変換
const htmlbody = md.render(updatedMarkdown);

// テンプレートに変換したHTMLを埋め込む
const result = template.replace('<!-- CONTENT WILL BE INSERTED HERE -->', htmlbody);

// 出力ディレクトリが存在しない場合は作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// HTMLをファイルに書き込む
fs.writeFileSync(outputFilePath, result);

console.log(`Converted ${inputFilePath} to ${outputFilePath}`);
