// time complexity: O(n). scan array twice, amortized constant time look ups w/ map
import fs from "node:fs";
import { join } from "node:path";

const input = fs.readFileSync(join(__dirname, "../input.txt")).toString("utf8");
const lines = input.trim().split("\n");

const arr1: number[] = [];
const freq2 = new Map<number, number>();
lines.forEach((line) => {
  const [sval1, sval2] = line.split(/\s+/);
  const val2 = parseInt(sval2, 10);
  arr1.push(parseInt(sval1, 10));

  if (freq2.has(val2)) {
    freq2.set(val2, freq2.get(val2)! + 1);
  } else {
    freq2.set(val2, 1);
  }
});

let similarity = 0;
arr1.forEach((val) => {
  if (freq2.has(val)) {
    const freq = freq2.get(val)!;
    similarity += freq * val;
  }
});

console.log(similarity);
