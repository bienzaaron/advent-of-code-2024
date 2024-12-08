import fs from "node:fs";
import { join } from "node:path";

const input = fs.readFileSync(join(__dirname, "./input.txt")).toString("utf8");

const grid: string[][] = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

// map each antinode frequency to the locations for each
// for each pair of nodes (Ax, Ay) and (Bx, By) of the same frequency
//   antinodes exist at (Ax + 2(Ax - Bx), Ay + 2(Ay - By)) and (Bx + 2(Bx - Ax), By + 2(By - Ay)).
//     per loop iteration, only calculate 1 anti node, because we will get the second when we get to node B later
//   record unique antinode locations.

const uniqueLocations = new Set<string>();
const frequencyToNodes = new Map<string, [number, number][]>();
for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    const frequency = grid[y][x]!;
    if (frequency === ".") {
      continue;
    }
    if (frequencyToNodes.has(frequency)) {
      frequencyToNodes.get(frequency)!.push([x, y]);
    } else {
      frequencyToNodes.set(frequency, [[x, y]]);
    }
  }
}

for (const locations of frequencyToNodes.values()) {
  for (const A of locations) {
    for (const B of locations) {
      if (A === B) {
        continue;
      }

      const distanceAtoB = subtractVectors(B, A);
      let antinode: readonly [number, number];
      // for p1, factor = 2 and while --> if
      let factor = 1;
      while (
        (antinode = [
          A[0] + factor * distanceAtoB[0],
          A[1] + factor * distanceAtoB[1],
        ] as const) &&
        !outOfBounds(antinode)
      ) {
        uniqueLocations.add(String(antinode));
        if (grid[antinode[1]][antinode[0]] === ".") {
          grid[antinode[1]][antinode[0]] = "#";
        }
        factor++;
      }
    }
  }
}

console.log(uniqueLocations.size);
console.log(grid.map((x) => x.join("")).join("\n"));

function subtractVectors(
  v1: readonly [number, number],
  v2: readonly [number, number]
): [number, number] {
  return [v1[0] - v2[0], v1[1] - v2[1]];
}

function outOfBounds(location: readonly [number, number]) {
  return (
    location[1] >= grid.length ||
    location[1] < 0 ||
    location[0] >= grid[location[1]].length ||
    location[0] < 0
  );
}
