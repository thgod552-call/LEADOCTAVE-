import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

const files = fs.readdirSync(publicDir).filter(f => f.endsWith('.jpg'));

console.log(`Found ${files.length} JPG files to compress...\n`);

Promise.all(
  files.map(file => {
    const filePath = path.join(publicDir, file);
    const originalSize = fs.statSync(filePath).size / (1024 * 1024);
    
    return sharp(filePath)
      .resize(1920, 1440, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 70, progressive: true })
      .toFile(filePath + '.tmp')
      .then(() => {
        fs.renameSync(filePath + '.tmp', filePath);
        const newSize = fs.statSync(filePath).size / (1024 * 1024);
        const reduction = Math.round((1 - newSize / originalSize) * 100);
        console.log(`✓ ${file}: ${originalSize.toFixed(2)}MB → ${newSize.toFixed(2)}MB (${reduction}% reduction)`);
      })
      .catch(err => console.error(`✗ Error compressing ${file}:`, err.message));
  })
).then(() => {
  console.log('\nAll images compressed!');
  process.exit(0);
}).catch(err => {
  console.error('Compression failed:', err);
  process.exit(1);
});
