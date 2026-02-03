import { createCanvas, registerFont } from 'canvas';
import fs from 'fs';

// Create 1200x630 OG image
const width = 1200;
const height = 630;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient (dark)
const gradient = ctx.createLinearGradient(0, 0, 0, height);
gradient.addColorStop(0, '#0f0f1a');
gradient.addColorStop(1, '#1a1a2e');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Add some visual interest - subtle grid lines
ctx.strokeStyle = 'rgba(249, 115, 22, 0.1)';
ctx.lineWidth = 1;
for (let i = 0; i < width; i += 60) {
  ctx.beginPath();
  ctx.moveTo(i, 0);
  ctx.lineTo(i, height);
  ctx.stroke();
}
for (let i = 0; i < height; i += 60) {
  ctx.beginPath();
  ctx.moveTo(0, i);
  ctx.lineTo(width, i);
  ctx.stroke();
}

// Glowing orb effect behind text
const orbGradient = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, 300);
orbGradient.addColorStop(0, 'rgba(249, 115, 22, 0.3)');
orbGradient.addColorStop(1, 'rgba(249, 115, 22, 0)');
ctx.fillStyle = orbGradient;
ctx.fillRect(0, 0, width, height);

// $CMEM title
ctx.font = 'bold 120px Arial, sans-serif';
ctx.fillStyle = '#f97316';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('$CMEM', width/2, height/2 - 60);

// Tagline
ctx.font = '36px Arial, sans-serif';
ctx.fillStyle = '#ffffff';
ctx.fillText('The Currency of the Agentic Economy', width/2, height/2 + 40);

// Subtitle
ctx.font = '28px Arial, sans-serif';
ctx.fillStyle = '#888888';
ctx.fillText('Live on Solana 🦀', width/2, height/2 + 100);

// Save
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('./og-image.png', buffer);
fs.writeFileSync('./assets/og-image.png', buffer);
console.log('OG images generated!');
