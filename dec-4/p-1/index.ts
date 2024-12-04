import fs from "node:fs";
import { join } from "node:path";

const input = fs.readFileSync(join(__dirname, "../input.txt")).toString("utf8");

const grid = input
  .trim()
  .split("\n")
  .map((row) => row.split(""));

const searchString = "XMAS";
function findXmas(x: number, y: number, xDelta: number, yDelta: number) {
  for (let c = 0; c < searchString.length; c++, x += xDelta, y += yDelta) {
    if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
      return false;
    }
    if (grid[x][y] !== searchString.at(c)) {
      return false;
    }
  }
  return true;
}

let counter = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid.length; j++) {
    [
      [-1, 0], // left
      [-1, -1], // left up
      [0, -1], // up
      [1, -1], // right up
      [1, 0], // right
      [1, 1], // right down
      [0, 1], // down
      [-1, 1], // left down
    ].forEach(([xDelta, yDelta]) => {
      if (findXmas(i, j, xDelta, yDelta)) {
        counter++;
      }
    });
  }
}
console.log(counter);
