import fs from "node:fs";
import { join } from "node:path";

const input = fs.readFileSync(join(__dirname, "./input.txt")).toString("utf8");
const grid: (string | [number, number][])[][] = input
  .trim()
  .split("\n")
  .map((line) => line.split(""));

const OPEN = ".";
const VISITED = "X";
const IMPASSABLE = "#";
const GUARD = "^";
// track direction as a vector of the current movement direction.
// to turn right 90 deg, swap x/y and multiply x by -1.
// start facing up.
let guardDirection: [number, number] = [0, -1];

// find the current guard position.
let guardPosition: [number, number] = [0, 0];
outer: for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (atLocation([x, y]) === GUARD) {
      guardPosition = [x, y];
      break outer;
    }
  }
}

const positions: [number, number][] = [];
const guardStartingPosition: [number, number] = [...guardPosition];
visitLocation(guardPosition);
let uniqueLocations = 1;
while (true) {
  const { location: positionToEvaluate, direction } = nextPosition(
    guardPosition,
    guardDirection
  );
  guardDirection = direction;

  if (outOfBounds(positionToEvaluate)) {
    break;
  }
  if (atLocation(positionToEvaluate) === OPEN) {
    uniqueLocations++;
    positions.push(positionToEvaluate);
  }

  visitLocation(positionToEvaluate);
  guardPosition = positionToEvaluate;
}

const obstacles: string[] = [];
positions.forEach((obstaclePosition) => {
  const originalValue = grid[obstaclePosition[1]][obstaclePosition[0]];
  grid[obstaclePosition[1]][obstaclePosition[0]] = IMPASSABLE;
  let loopPosition = guardStartingPosition,
    loopDirection = [0, -1] as [number, number];
  const seen = new Set();
  while (
    ({ location: loopPosition, direction: loopDirection } = nextPosition(
      loopPosition,
      loopDirection
    )) &&
    !outOfBounds(loopPosition)
  ) {
    const positionDirection = String(loopPosition) + String(loopDirection);
    if (seen.has(positionDirection)) {
      obstacles.push(String(obstaclePosition));
      break;
    }
    seen.add(positionDirection);
  }
  grid[obstaclePosition[1]][obstaclePosition[0]] = originalValue;
});

console.log(positions.length);
console.log(obstacles.length);

function nextPosition(location: [number, number], direction: [number, number]) {
  let newLocation = addVectors(location, direction);
  while (!outOfBounds(newLocation) && atLocation(newLocation) === IMPASSABLE) {
    direction = turnRight(direction);
    newLocation = addVectors(location, direction);
  }
  return {
    direction,
    location: newLocation,
  };
}

function turnRight(vector: [number, number]): [number, number] {
  return [vector[1] * -1, vector[0]];
}

function addVectors(
  v1: [number, number],
  v2: [number, number]
): [number, number] {
  return [v1[0] + v2[0], v1[1] + v2[1]];
}

function atLocation(location: [number, number]) {
  return grid[location[1]][location[0]];
}

function outOfBounds(location: [number, number]) {
  return (
    location[1] >= grid.length ||
    location[1] < 0 ||
    location[0] >= grid[location[1]].length ||
    location[0] < 0
  );
}

function visitLocation(location: [number, number]) {
  grid[location[1]][location[0]] = VISITED;
}
