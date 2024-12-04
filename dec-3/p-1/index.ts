// time complexity: O(n)
import fs from "node:fs";
import { join } from "node:path";

const input = fs.readFileSync(join(__dirname, "../input.txt")).toString("utf8");

const matches = input.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
console.log(
  Array.from(matches).reduce(
    (acc, match) => acc + parseInt(match[1], 10) * parseInt(match[2], 10),
    0,
  ),
);
