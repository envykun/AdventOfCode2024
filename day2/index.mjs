import { readFile } from "fs";

function util(data) {
    const lines = data.split("\n");

    return lines.map((line) => line.trim().split(/\s+/));
  }

function isSafe(report) {
    for (let i = 1; i < report.length; i++) {
        const diff = report[i] - report[i - 1];
        if (Math.abs(diff) < 1 || Math.abs(diff) > 3) return false;
    }
    const isIncreasing = report.every((v, i, arr) => i === 0 || arr[i] >= arr[i - 1]);
    const isDecreasing = report.every((v, i, arr) => i === 0 || arr[i] <= arr[i - 1]);
    return isIncreasing || isDecreasing;
}

function isSafeWithOneRemoval(report) {
    for (let i = 0; i < report.length; i++) {
        const modifiedReport = report.slice(0, i).concat(report.slice(i + 1));
        if (isSafe(modifiedReport)) return true;
    }
    return false;
}

function countSafeReports(input, allowRemoval = false) {
    const reports = input.map((line) => line.map(Number));
    let safeCount = 0;

    for (const report of reports) {
        if (isSafe(report) || (allowRemoval && isSafeWithOneRemoval(report))) {
            safeCount++;
        }
    }

    return safeCount;
}




// Main
readFile("./day2/input.txt", "utf-8", (error, data) => {
    if (error) {
        console.log("Error:", error);
        return;
    }

    const d = util(data);
    console.log("Part 1:", countSafeReports(d));
    console.log("Part 2:", countSafeReports(d, true));
  });