// アプリのアイコン（icon-192.png・icon-512.png）を作る。紺の地に、大人と子どもの2つの丸（家族）と、決まりの印のチェック。
// 使い方: node tools/make-icons.cjs（qa/ の playwright を使う）
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "qa", "node_modules", "playwright"));
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const s of [192, 512]) {
    const p = await b.newPage({ viewport: { width: s, height: s } });
    await p.setContent(`<body style="margin:0"><svg width="${s}" height="${s}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect width="100" height="100" fill="#123554"/>
      <circle cx="36" cy="34" r="12" fill="#fffdf7"/><path d="M16 74 Q36 44 56 74 Z" fill="#fffdf7"/>
      <circle cx="62" cy="50" r="8" fill="#f6d77a"/><path d="M50 76 Q62 56 74 76 Z" fill="#f6d77a"/>
      <polyline points="70,30 78,38 92,20" fill="none" stroke="#f6d77a" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/></svg></body>`);
    await p.screenshot({ path: path.join(__dirname, "..", `icon-${s}.png`), clip: { x: 0, y: 0, width: s, height: s } });
  }
  await b.close();
})();
