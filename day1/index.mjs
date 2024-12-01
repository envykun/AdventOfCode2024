import { readFile } from "fs";

function util(data) {
  const lines = data.split("\n");
  const left = [];
  const right = [];

  lines.forEach((line) => {
    const [first, second] = line.trim().split(/\s+/);
    left.push(first);
    right.push(second);
  });

  left.sort();
  right.sort();

  return { left, right };
}

// First part
function compare(data) {
  const { left, right } = util(data);

  return left
    .map((value, index) => {
      return Math.abs(value - right[index]);
    })
    .reduce((acc, curr) => acc + curr, 0);
}

// Second part
function similarity(data) {
  const { left, right } = util(data);

  return left
    .map(
      (value) =>
        value * right.filter((rightValue) => value === rightValue).length
    )
    .reduce((acc, curr) => acc + curr, 0);
}

// Main
readFile("input.txt", "utf-8", (error, data) => {
  if (error) {
    console.log("Error:", error);
    return;
  }

  const sum1 = compare(data);
  console.log("Ergebnis 1:", sum1);

  const sum2 = similarity(data);
  console.log("Ergebnis 2:", sum2);
});
