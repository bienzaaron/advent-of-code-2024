// time complexity: O(n*m + p), where n is the number of page sets, m is the worst case number of pages, and p is the number of rules, or O(n + p) where n is the total number of page numbers and p is the number of rules
import fs from "node:fs";
import { join } from "node:path";

const parseDecimal = (val: string) => parseInt(val, 10);
const input = fs.readFileSync(join(__dirname, "./input.txt")).toString("utf8");

const [orderingRulesInput, pageSetsInput] = input.split("\n\n");

const illegalSuceedingValues = new Map<number, Set<number>>();
const illegalPrecedingValues = new Map<number, Set<number>>();
for (const rule of orderingRulesInput.split("\n")) {
  const [before, value] = rule.split("|").map(parseDecimal);
  if (!illegalSuceedingValues.has(value)) {
    illegalSuceedingValues.set(value, new Set([before]));
  } else {
    illegalSuceedingValues.get(value)!.add(before);
  }
  if (!illegalPrecedingValues.has(before)) {
    illegalPrecedingValues.set(before, new Set([value]));
  } else {
    illegalPrecedingValues.get(before)!.add(value);
  }
}

let sum = 0;
let incorrectSum = 0;
for (const pageSet of pageSetsInput.split("\n")) {
  const illegalSucceedingValuesForPageSet = new Set();
  let corrected = false;
  const pageNumbers = pageSet.split(",").map(parseDecimal);
  for (let i = 0; i < pageNumbers.length; i++) {
    const pageNumber = pageNumbers[i];
    if (illegalSucceedingValuesForPageSet.has(pageNumber)) {
      const illegalPrecedingValuesForPageNumber =
        illegalPrecedingValues.get(pageNumber)!;
      for (let j = i - 1; j >= 0; j--) {
        if (illegalPrecedingValuesForPageNumber.has(pageNumbers[j])) {
          pageNumbers.splice(i--, 0, pageNumbers.splice(j, 1)[0]);
        }
      }

      corrected = true;
    }
    if (illegalSuceedingValues.has(pageNumber)) {
      for (const illegalValue of illegalSuceedingValues.get(pageNumber)!) {
        illegalSucceedingValuesForPageSet.add(illegalValue);
      }
    }
  }
  if (!corrected) {
    sum += pageNumbers.at(pageNumbers.length / 2)!;
  } else {
    incorrectSum += pageNumbers.at(pageNumbers.length / 2)!;
  }
}

console.log(sum);
console.log(incorrectSum);
