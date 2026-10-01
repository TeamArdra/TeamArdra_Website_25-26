#!/usr/bin/env node
/**
 * Convert raw PNG/JPEG uploads into web-optimised WebP.
 *
 *   npm run optimize-images -- [--width=1600] [--quality=80] [--lossless] [--replace] <file|folder> ...
 *
 *   --width     maximum output width in px (never upscales). Default 1600.
 *               Rough guide: board photos 800, event photos 1280, logos 600.
 *   --quality   WebP quality 1-100. Default 80 (photos); use ~90 for logos.
 *   --lossless  lossless WebP (flat-colour logos sometimes come out smaller).
 *   --replace   delete the original after a successful conversion.
 *
 * Each image is written next to its source as <name>.webp, EXIF rotation is
 * applied, and transparency is kept only if the image actually uses it.
 * Afterwards point the component at the new path, e.g. "/team/captain.webp".
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const RASTER = /\.(png|jpe?g)$/i;

function parseArgs(argv) {
  const opts = { width: 1600, quality: 80, lossless: false, replace: false, inputs: [] };
  for (const arg of argv) {
    const m = arg.match(/^--([a-z]+)(?:=(.*))?$/);
    if (!m) {
      opts.inputs.push(arg);
      continue;
    }
    const [, key, value] = m;
    if (key === "width") opts.width = Number(value);
    else if (key === "quality") opts.quality = Number(value);
    else if (key === "lossless") opts.lossless = true;
    else if (key === "replace") opts.replace = true;
    else throw new Error(`Unknown option --${key}`);
  }
  if (!opts.inputs.length) {
    throw new Error("Pass at least one image file or folder (see the header of this script).");
  }
  return opts;
}

async function collect(input) {
  const stat = await fs.stat(input);
  if (stat.isFile()) return RASTER.test(input) ? [input] : [];
  const entries = await fs.readdir(input, { withFileTypes: true });
  const nested = await Promise.all(entries.map((e) => collect(path.join(input, e.name))));
  return nested.flat();
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function convert(file, { width, quality, lossless, replace }) {
  const out = file.replace(RASTER, ".webp");
  const { isOpaque } = await sharp(file).stats();

  let pipeline = sharp(file).rotate().resize({ width, withoutEnlargement: true });
  if (isOpaque) pipeline = pipeline.removeAlpha();
  const info = await pipeline
    .webp({ quality, lossless, alphaQuality: 90, effort: 6, smartSubsample: true })
    .toFile(out);

  const before = (await fs.stat(file)).size;
  console.log(
    `${file}  ${kb(before)}  ->  ${path.basename(out)}  ${info.width}x${info.height}  ${kb(info.size)}`
  );
  if (replace) await fs.unlink(file);
  return { before, after: info.size };
}

const opts = parseArgs(process.argv.slice(2));
const files = (await Promise.all(opts.inputs.map(collect))).flat();
let before = 0;
let after = 0;
for (const file of files) {
  const r = await convert(file, opts);
  before += r.before;
  after += r.after;
}
console.log(`\n${files.length} image(s): ${kb(before)} -> ${kb(after)}`);
