// time complexity: O(n*m) where n is # of reports, m is worst case length of report
import fs from "node:fs";
import { join } from "node:path";

const input = fs.readFileSync(join(__dirname, "../input.txt")).toString("utf8");
// 2d-array containing levels
const reports = input
  .trim()
  .split("\n")
  .map((line) => line.split(/\s+/).map((level) => parseInt(level, 10)));

// for a report to be safe: all increasing or all decreasing levels, delta of 1, 2, or 3
function isReportSafe(report: number[], skipUsed = false): boolean {
  if (report.length < 2) {
    return true;
  }
  const first = report.at(0)!;
  const second = report.at(1)!;
  const isIncreasing = first < second;

  function checkLevels(i1: number, i2: number) {
    const current = report.at(i1)!;
    const next = report.at(i2)!;
    if (current === undefined || next === undefined) return false;
    if (isIncreasing && current >= next) {
      return false;
    } else if (!isIncreasing && current <= next) {
      return false;
    }
    const diff = Math.abs(current - next);
    if (diff > 3) {
      return false;
    }
    return true;
  }

  for (let i = 0; i < report.length - 1; i++) {
    const safe = checkLevels(i, i + 1);
    if (!safe) {
      if (!skipUsed) {
        for (let j = 0; j < report.length; j++) {
          const newReport = [...report];
          newReport.splice(j, 1);
          const safe2 = isReportSafe(newReport, true);
          if (safe2) return true;
        }
        return false;
      } else {
        return false;
      }
    }
  }
  return true;
}

console.log(reports.filter((report) => isReportSafe(report)).length);
