// time complexity: O(n*log(n))
import fs from "node:fs";
import { join } from "node:path";

const input = fs.readFileSync(join(__dirname, "../input.txt")).toString("utf8");
const lines = input.trim().split("\n");

const arr1: number[] = [],
  arr2: number[] = [];
lines.forEach((line) => {
  const [val1, val2] = line.split(/\s+/);
  arr1.push(parseInt(val1, 10));
  arr2.push(parseInt(val2, 10));
});
arr1.sort();
arr2.sort();

let diff = 0;
for (let i = 0; i < arr1.length; i++) {
  diff += Math.abs(arr1.at(i)! - arr2.at(i)!);
}
console.log(diff);
