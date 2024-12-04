import fs from "node:fs";
import { join } from "node:path";

const input = fs.readFileSync(join(__dirname, "../input.txt")).toString("utf8");

const grid = input
  .trim()
  .split("\n")
  .map((row) => row.split(""));

function findXHypenMas(x: number, y: number) {
  // we need padding of 1 char on all sides to have an X-mas
  if (x < 1 || x >= grid.length - 1 || y < 1 || y >= grid[0].length - 1) {
    return false;
  }
  if (grid[x][y] !== "A") {
    return false;
  }
  // top left to bottom right M-A-S or S-A-M
  if (
    (grid[x - 1][y - 1] === "M" && grid[x + 1][y + 1] === "S") ||
    (grid[x - 1][y - 1] === "S" && grid[x + 1][y + 1] === "M")
  ) {
    // bottom left to top right M-A-S or S-A-M
    if (
      (grid[x - 1][y + 1] === "M" && grid[x + 1][y - 1] === "S") ||
      (grid[x - 1][y + 1] === "S" && grid[x + 1][y - 1] === "M")
    ) {
      return true;
    }
  }
  return false;
}

let counter = 0;
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid.length; j++) {
    if (findXHypenMas(i, j)) {
      counter++;
    }
  }
}
console.log(counter);
