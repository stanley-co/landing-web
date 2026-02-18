/**
 * Генерирует favicon.ico и favicon-48x48.png из public/logo.svg
 * для отображения иконки в результатах поиска (Google, Yandex).
 * Запуск: node scripts/generate-favicon.cjs
 */
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const toIco = require('to-ico');

const publicDir = path.join(__dirname, '..', 'public');
const logoSvg = path.join(publicDir, 'logo.svg');

async function main() {
  if (!fs.existsSync(logoSvg)) {
    console.error('Файл public/logo.svg не найден.');
    process.exit(1);
  }

  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map((size) =>
      sharp(logoSvg)
        .resize(size, size)
        .png()
        .toBuffer()
    )
  );

  const ico = await toIco(pngBuffers);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);

  await sharp(logoSvg)
    .resize(48, 48)
    .png()
    .toFile(path.join(publicDir, 'favicon-48x48.png'));

  console.log('Сгенерированы: public/favicon.ico, public/favicon-48x48.png');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
