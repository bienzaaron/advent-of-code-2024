import fs from "node:fs";
import { join } from "node:path";

const parseDecimal = (val: string) => parseInt(val, 10);
const input = fs.readFileSync(join(__dirname, "./input2.txt")).toString("utf8");

const values = input.split("\n").map((line) => {
  const split = line.split(":");
  return [parseDecimal(split[0]), split[1].trim().split(" ").map(parseDecimal)];
}) as unknown as readonly [number, number[]];

function doesCalibrationMatch(
  targetValue: number,
  currentValue: number,
  remainingValues: number[]
): boolean {
  // if no remaining values, check if current = target
  if (remainingValues.length === 0) {
    return targetValue === currentValue;
  }
  // if we have remaining values and we're already above currentValue,
  // this set of operations does not work
  if (currentValue > targetValue) {
    return false;
  }

  const nextValue = remainingValues.at(0)!;
  return (
    doesCalibrationMatch(
      targetValue,
      currentValue + nextValue,
      remainingValues.slice(1)
    ) ||
    doesCalibrationMatch(
      targetValue,
      currentValue * nextValue,
      remainingValues.slice(1)
      // comment below or condition for solution to p1
    ) ||
    doesCalibrationMatch(
      targetValue,
      parseDecimal(`${currentValue}${nextValue}`),
      remainingValues.slice(1)
    )
  );
}

const sum = values
  // @ts-expect-error don't feel like fixing
  .map(([testValue, calibrationValues]) => {
    const val = doesCalibrationMatch(
      testValue,
      calibrationValues.shift(),
      calibrationValues
    )
      ? testValue
      : 0;
    return val;
  })
  .reduce((acc, cur) => {
    return acc + cur;
  }, 0);

console.log(sum);
