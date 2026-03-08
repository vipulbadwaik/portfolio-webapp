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

  // Resize avatar to a circle-ready size
  const avatarSize = 200;
  const avatarBuf = await sharp(avatarPath)
    .resize(avatarSize, avatarSize, { fit: 'cover', position: 'top' })
    .png()
    .toBuffer();

  // Create circular mask
  const circleMask = Buffer.from(
    `<svg width="${avatarSize}" height="${avatarSize}">
      <circle cx="${avatarSize / 2}" cy="${avatarSize / 2}" r="${avatarSize / 2}" fill="white"/>
    </svg>`
  );

  const circularAvatar = await sharp(avatarBuf)
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Create OG image with gradient background + text + avatar
  const svgOverlay = `
    <svg width="${width}" height="${height}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0a0a0a"/>
          <stop offset="50%" style="stop-color:#111111"/>
          <stop offset="100%" style="stop-color:#0a0a0a"/>
        </linearGradient>
        <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.1"/>
          <stop offset="50%" style="stop-color:#ffffff;stop-opacity:0.05"/>
          <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0.1"/>
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${width}" height="${height}" fill="url(#bg)"/>

      <!-- Subtle grid pattern -->
      <line x1="0" y1="210" x2="${width}" y2="210" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      <line x1="0" y1="420" x2="${width}" y2="420" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      <line x1="400" y1="0" x2="400" y2="${height}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>
      <line x1="800" y1="0" x2="800" y2="${height}" stroke="rgba(255,255,255,0.04)" stroke-width="1"/>

      <!-- Border -->
      <rect x="0" y="0" width="${width}" height="${height}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="2"/>

      <!-- Top accent line -->
      <rect x="0" y="0" width="${width}" height="3" fill="url(#accent)"/>

      <!-- Name -->
      <text x="600" y="240" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="56" font-weight="700" fill="white">
        Vipul Badwaik
      </text>

      <!-- Title -->
      <text x="600" y="300" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="26" fill="rgba(255,255,255,0.6)">
        Full Stack Developer &amp; UI/UX Enthusiast
      </text>

      <!-- Skills -->
      <text x="600" y="360" text-anchor="middle" font-family="system-ui, monospace" font-size="16" fill="rgba(255,255,255,0.35)">
        React  ·  Next.js  ·  TypeScript  ·  Node.js  ·  Python  ·  AWS
      </text>

      <!-- Domain -->
      <text x="600" y="560" text-anchor="middle" font-family="system-ui, monospace" font-size="18" fill="rgba(255,255,255,0.3)">
        vipulbadwaik.in
      </text>
    </svg>
  `;

  await sharp(Buffer.from(svgOverlay))
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

await generateFavicon();
await generateAppleTouchIcon();
await generateOGImage();
await compressAvatar();
console.log('\nAll assets generated in public/');
