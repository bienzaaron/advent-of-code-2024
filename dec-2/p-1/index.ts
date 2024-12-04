// time complexity: O(n*log(n))
import fs from "node:fs";
import { join } from "node:path";

const input = fs.readFileSync(join(__dirname, "../input.txt")).toString("utf8");
// 2d-array containing levels
const reports = input
  .trim()
  .split("\n")
  .map((line) => line.split(/\s+/).map((level) => parseInt(level, 10)));

// for a report to be safe: all increasing or all decreasing levels, delta of 1, 2, or 3
function isReportSafe(report: number[]) {
  if (report.length < 2) {
    return true;
  }
  const first = report.at(0)!;
  const second = report.at(1)!;
  const isIncreasing = first < second;
  for (let i = 0; i < report.length - 1; i++) {
    const current = report.at(i)!;
    const next = report.at(i + 1)!;
    if (isIncreasing && current >= next) {
      return false;
    } else if (!isIncreasing && current <= next) {
      return false;
    }
    const diff = Math.abs(current - next);
    if (diff > 3) {
      return false;
    }
  }
  return true;
}

console.log(reports.filter((report) => isReportSafe(report)).length);
