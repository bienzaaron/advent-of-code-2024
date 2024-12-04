// time complexity: O(n)
import fs from "node:fs";
import { join } from "node:path";

const input = fs.readFileSync(join(__dirname, "../input.txt")).toString("utf8");

let parsed = "";
let prevCursor = 0;
let cursor = 0;
while ((cursor = input.indexOf("don't()", cursor)) !== -1) {
  const enabled = input.substring(prevCursor, cursor);
  parsed += enabled;
  let nextDo = input.indexOf("do()", cursor);
  if (nextDo !== -1) {
    cursor = nextDo;
    prevCursor = cursor;
  } else {
    prevCursor = input.length;
    break;
  }
}
parsed += input.slice(prevCursor, input.length);

const matches = parsed.matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g);
console.log(
  Array.from(matches).reduce(
    (acc, match) => acc + parseInt(match[1], 10) * parseInt(match[2], 10),
    0,
  ),
);
