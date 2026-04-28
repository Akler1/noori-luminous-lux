// Batch-converts source PNGs to optimized WebP at multiple sizes for srcset.
// Run with: node scripts/convert-images.mjs
// Pass --force to re-encode existing outputs.

import { readFile, writeFile, stat } from "node:fs/promises";
import { dirname, resolve, basename } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ASSETS = resolve(__dirname, "..", "src", "assets");
const FORCE = process.argv.includes("--force");
const DEFAULT_QUALITY = 85;
const HERO_QUALITY = 92; // visually pristine for the LCP hero set
const EFFORT = 6; // 0-6, higher = slower encode + smaller file

// [sourceFile, [outputWidths], quality?] — see plan for tier rationale
const JOBS = [
  // Tier A: viewport-sized hero/content — hero set bumped to quality 92 so the
  // LCP image is visually indistinguishable from the source PNG
  ["hero-real.png", [640, 1280, 1920], HERO_QUALITY],
  ["hero-sketch.png", [640, 1280, 1920], HERO_QUALITY],
  ["cvd-diamonds.png", [640, 1280, 1920]],
  ["our-story-purse.png", [640, 1280, 1920]],
  // Tier B: mobile-only hero — also bumped to high quality
  ["hero-real-mobile.png", [480, 960], HERO_QUALITY],
  ["hero-sketch-mobile.png", [480, 960], HERO_QUALITY],
  // Tier C: card-sized content
  ["hero-lifestyle.png", [1280]],
  ["hero-product-shot.png", [1280]],
  // Tier D: tiny UI swatches (96px = 3x retina at 32px display)
  ["metal-gold.png", [96]],
  ["metal-silver.png", [96]],
  ["metal-rose.png", [96]],
];

const exists = async (p) => {
  try { await stat(p); return true; } catch { return false; }
};

const fmt = (n) => {
  if (n >= 1024 * 1024) return `${(n / 1024 / 1024).toFixed(2)} MB`;
  if (n >= 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${n} B`;
};

async function convertOne(filename, widths, quality = DEFAULT_QUALITY) {
  const srcPath = resolve(ASSETS, filename);
  const srcExists = await exists(srcPath);
  if (!srcExists) {
    console.warn(`  ⚠ skip ${filename} (source missing)`);
    return { saved: 0, skipped: true };
  }

  const srcBuf = await readFile(srcPath);
  const meta = await sharp(srcBuf).metadata();
  const baseName = basename(filename, ".png");

  let totalOut = 0;
  const outputs = [];
  for (const w of widths) {
    const outName = `${baseName}-${w}.webp`;
    const outPath = resolve(ASSETS, outName);

    if (!FORCE && await exists(outPath)) {
      const s = await stat(outPath);
      outputs.push(`${outName}: ${fmt(s.size)} (cached)`);
      totalOut += s.size;
      continue;
    }

    // Don't upscale — if source width < target width, keep at source size
    const targetWidth = Math.min(w, meta.width || w);

    const outBuf = await sharp(srcBuf)
      .resize({ width: targetWidth, withoutEnlargement: true })
      .webp({ quality, effort: EFFORT })
      .toBuffer();

    await writeFile(outPath, outBuf);
    outputs.push(`${outName}: ${fmt(outBuf.length)} @q${quality}`);
    totalOut += outBuf.length;
  }

  const savings = srcBuf.length - totalOut;
  console.log(`✓ ${filename} (${fmt(srcBuf.length)})`);
  for (const o of outputs) console.log(`    ${o}`);
  console.log(`    saved: ${fmt(savings)} (${((savings / srcBuf.length) * 100).toFixed(0)}%)`);
  return { saved: savings, skipped: false };
}

async function main() {
  console.log(`Converting ${JOBS.length} images, effort ${EFFORT}${FORCE ? " (force)" : ""}\n`);
  let totalSaved = 0;
  for (const [filename, widths, quality] of JOBS) {
    const { saved } = await convertOne(filename, widths, quality);
    totalSaved += saved;
  }
  console.log(`\nTotal saved: ${fmt(totalSaved)}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
