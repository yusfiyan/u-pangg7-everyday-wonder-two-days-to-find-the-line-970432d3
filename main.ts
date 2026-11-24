// Everyday Wonder, Two Days to Find the Line.
// Writes a single sentence of wonder to entry.txt: /output/entry.txt in
// the grader's sandbox (MAKEFUN_OUTPUT_DIR). Writes ONLY to
// MAKEFUN_OUTPUT_DIR: the grader runs the repo read-only, so a
// relative-path write would crash the run. Node 22 stdlib only,
// deterministic, no network, no assets.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The line: a lift mirror turns the most ordinary glance — catching
// yourself mid-yawn — into a stranger politely pretending not to know
// you. One small moment, one fresh angle, every word working.
const LINE =
  "The lift mirror caught me mid-yawn, and for one floor I was a stranger politely pretending not to know me.";

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate accepts 1-200 characters of a single line; fail loudly
// instead of writing an entry the house would refuse.
if (LINE.length < 1 || LINE.length > 200 || /[\r\n]/.test(LINE)) {
  console.error(
    `entry line must be one line of 1-200 characters, got ${LINE.length}`,
  );
  process.exit(1);
}

// The entry must be exactly one sentence: a single sentence-terminating
// character (., ! or ?) at the very end and no other sentence boundary
// inside.
const sentenceEnds = LINE.match(/[.!?](?=\s|$)/g) ?? [];
if (sentenceEnds.length !== 1 || !/[.!?]$/.test(LINE)) {
  console.error(
    "entry line must be exactly one sentence: one terminator (., ! or ?) at the end, none inside",
  );
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, "entry.txt"), LINE);

console.log(`wrote entry.txt (${LINE.length} chars) to ${OUTPUT_DIR}`);
