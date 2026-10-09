import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const avatarPath = path.join(publicDir, 'avatar.png');

// --- Favicon (32x32) ---
async function generateFavicon() {
  await sharp(avatarPath)
    .resize(32, 32, { fit: 'cover', position: 'top' })
    .png()
    .toFile(path.join(publicDir, 'favicon.png'));

  // ICO-compatible 32x32 PNG (browsers accept favicon.ico as PNG)
  await sharp(avatarPath)
    .resize(32, 32, { fit: 'cover', position: 'top' })
    .png()
    .toFile(path.join(publicDir, 'favicon.ico'));

  console.log('favicon.png + favicon.ico generated');
}

// --- Apple Touch Icon (180x180) ---
async function generateAppleTouchIcon() {
  await sharp(avatarPath)
    .resize(180, 180, { fit: 'cover', position: 'top' })
    .png()
    .toFile(path.join(publicDir, 'apple-touch-icon.png'));

  console.log('apple-touch-icon.png generated');
}

// --- OG Image (1200x630) ---
async function generateOGImage() {
  const width = 1200;
  const height = 630;

  // Photo: rounded square on the right with a violet ring
  const size = 320;
  const photoX = 770;
  const photoY = Math.round((height - size) / 2);
  const radius = 40;
  const photoMask = Buffer.from(
    `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" fill="white"/></svg>`
  );
  const photo = await sharp(path.join(publicDir, 'vipul-optimized.jpg'))
    .resize(size, size, { fit: 'cover', position: 'top' })
    .composite([{ input: photoMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow" cx="50%" cy="0%" r="75%">
          <stop offset="0%" stop-color="#8f8bff" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#8f8bff" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glow2" cx="85%" cy="80%" r="40%">
          <stop offset="0%" stop-color="#8f8bff" stop-opacity="0.14"/>
          <stop offset="100%" stop-color="#8f8bff" stop-opacity="0"/>
        </radialGradient>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="rgba(255,255,255,0.045)" stroke-width="1"/>
        </pattern>
      </defs>
      <rect width="${width}" height="${height}" fill="#0a0a0a"/>
      <rect width="${width}" height="${height}" fill="url(#grid)"/>
      <rect width="${width}" height="${height}" fill="url(#glow)"/>
      <rect width="${width}" height="${height}" fill="url(#glow2)"/>
      <rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>

      <!-- Photo ring -->
      <rect x="${photoX - 8}" y="${photoY - 8}" width="${size + 16}" height="${size + 16}" rx="${radius + 8}" fill="none" stroke="#8f8bff" stroke-opacity="0.55" stroke-width="2"/>

      <text x="80" y="255" font-family="system-ui, -apple-system, sans-serif" font-size="84" font-weight="700" fill="white">Vipul <tspan fill="#8f8bff">Badwaik</tspan></text>
      <text x="82" y="322" font-family="system-ui, -apple-system, sans-serif" font-size="36" fill="rgba(255,255,255,0.82)">AI-Native Software Engineer</text>
      <text x="82" y="376" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="rgba(255,255,255,0.5)">React  ·  TypeScript  ·  Java  ·  Fintech</text>

      <rect x="82" y="520" width="8" height="8" rx="4" fill="#8f8bff"/>
      <text x="104" y="529" font-family="ui-monospace, Menlo, monospace" font-size="22" fill="rgba(255,255,255,0.55)">vipulbadwaik.in</text>
    </svg>
  `;

  await sharp(Buffer.from(svg))
    .composite([{ input: photo, left: photoX, top: photoY }])
    .png()
    .toFile(path.join(publicDir, 'og-image.png'));

  console.log('og-image.png generated (1200x630)');
}

// --- Compressed avatar ---
async function compressAvatar() {
  const info = await sharp(avatarPath).metadata();
  console.log(`Original avatar: ${info.width}x${info.height}, ${info.format}`);

  await sharp(avatarPath)
    .resize(600, 600, { fit: 'cover', position: 'top' })
    .jpeg({ quality: 85 })
    .toFile(path.join(publicDir, 'avatar-optimized.jpg'));

  const origSize = (await sharp(avatarPath).toBuffer()).length;
  const newSize = (await sharp(path.join(publicDir, 'avatar-optimized.jpg')).toBuffer()).length;
  console.log(`avatar-optimized.jpg: ${(origSize / 1024).toFixed(0)}KB → ${(newSize / 1024).toFixed(0)}KB`);
}

// Usage: `node scripts/generate-assets.mjs` (everything) or `node scripts/generate-assets.mjs og` (share image only)
const only = process.argv[2];
if (!only || only === 'all') {
  await generateFavicon();
  await generateAppleTouchIcon();
  await generateOGImage();
  await compressAvatar();
  console.log('\nAll assets generated in public/');
} else if (only === 'og') {
  await generateOGImage();
} else {
  console.error(`Unknown target "${only}". Use "og" or "all".`);
  process.exit(1);
}
