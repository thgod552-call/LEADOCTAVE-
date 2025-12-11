import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

// Process JPG files
const jpgFiles = fs.readdirSync(publicDir).filter(f => f.toLowerCase().endsWith('.jpg'));
const pngFiles = fs.readdirSync(publicDir).filter(f => f.toLowerCase().endsWith('.png') && !f.includes('logo'));

console.log(`Found ${jpgFiles.length} JPG files and ${pngFiles.length} PNG files to compress...\n`);

// Compress JPG files
Promise.all(
  jpgFiles.map(file => {
    const filePath = path.join(publicDir, file);
    const originalSize = fs.statSync(filePath).size / (1024 * 1024);
    
    return sharp(filePath)
      .resize(1920, 1440, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 65, progressive: true, mozjpeg: true })
      .toFile(filePath + '.tmp')
      .then(() => {
        fs.renameSync(filePath + '.tmp', filePath);
        const newSize = fs.statSync(filePath).size / (1024 * 1024);
        const reduction = Math.round((1 - newSize / originalSize) * 100);
        console.log(`✓ JPG ${file}: ${originalSize.toFixed(2)}MB → ${newSize.toFixed(2)}MB (${reduction}% reduction)`);
      })
      .catch(err => console.error(`✗ Error compressing ${file}:`, err.message));
  })
).then(() => {
  // Convert PNG files to WebP for better compression
  return Promise.all(
    pngFiles.map(file => {
      const filePath = path.join(publicDir, file);
      const originalSize = fs.statSync(filePath).size / (1024 * 1024);
      const webpPath = filePath.replace(/\.png$/i, '.webp');
      
      return sharp(filePath)
        .resize(1280, 960, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .webp({ quality: 75 })
        .toFile(webpPath)
        .then(() => {
          const newSize = fs.statSync(webpPath).size / (1024 * 1024);
          const reduction = Math.round((1 - newSize / originalSize) * 100);
          console.log(`✓ WEBP ${file}: ${originalSize.toFixed(2)}MB → ${newSize.toFixed(2)}MB (${reduction}% reduction)`);
          
          // Keep original PNG as fallback, but you can delete it to save more space
          console.log(`  → Created ${path.basename(webpPath)} (use this instead of PNG for better performance)`);
        })
        .catch(err => console.error(`✗ Error converting ${file} to WebP:`, err.message));
    })
  );
}).then(() => {
  console.log('\n✅ All images compressed and optimized!');
  console.log('\n📝 Next steps:');
  console.log('  1. Update your HTML to use .webp files for team images');
  console.log('  2. Remove original .png files from public folder (team-*.png)');
  console.log('  3. Run: npm run build');
  process.exit(0);
}).catch(err => {
  console.error('Compression failed:', err);
  process.exit(1);
});
