import { input_a as input_a } from "./input.js";

const [B, C] = input_a()
  .split("\n")
  .map((i) => i.trim().split(":"))
  .map((i) =>
    i[1]
      .trim()
      .replace(/ +/g, "")
      .split(" ")
      .map((i) => Number(i))
  );

let res = 1;
for (let i = 0; i < B.length; i++) {
  const b = -B[i];
  const c = C[i];
  const d = b * b - 4 * c;
  const x1 = (-b + Math.sqrt(d)) / 2;
  const x2 = (-b - Math.sqrt(d)) / 2;

  let x_max = Math.max(x1, x2);
  let x_min = Math.min(x1, x2);

  x_max = x_max % 1 == 0 ? x_max - 1 : Math.floor(x_max);
  x_min = x_min % 1 == 0 ? x_min + 1 : Math.ceil(x_min);

  const count_x = x_max - x_min + 1;

  res *= count_x;
}

console.log("A", res);
//console.log("B", output_main[0][0]);
