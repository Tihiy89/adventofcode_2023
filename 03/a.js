import { input_a as input_a } from "./input.js";

const re_digit = /[0-9]/;
const m1 = input_a()
  .split("\n")
  .map((i) => i.split(""));

const numbers = [];
const details = [];

for (let i = 0; i < m1.length; i++) {
  for (let j = 0; j < m1[i].length; j++) {
    let is_num = re_digit.test(m1[i][j]);
    if (is_num) {
      // индексы для поиска деталей
      const j_min = Math.max(j - 1, 0);
      const j_min_coord = j;
      let num_s = m1[i][j];
      while (is_num) {
        j++;
        is_num = re_digit.test(m1[i][j]);
        if (is_num) {
          num_s += m1[i][j];
        }
      }
      const j_max = Math.min(m1[i].length - 1, j);
      const j_max_coord = j - 1;

      // ищем детали рядом
      let f_valid = false;
      for (
        let i1 = Math.max(0, i - 1);
        i1 <= Math.min(m1.length - 1, i + 1) && !f_valid;
        i1++
      ) {
        for (let j1 = j_min; j1 <= j_max && !f_valid; j1++) {
          const sym = m1[i1][j1];
          if (!re_digit.test(sym) && sym != ".") {
            f_valid = true;
          }
        }
      }
      if (f_valid) {
        numbers.push({
          x_min: j_min_coord,
          x_max: j_max_coord,
          y: i,
          val: Number(num_s),
        });
      }
    }
    //
  }
}

/* solution A */
const sum1 = numbers.reduce((sum, i) => (sum += i.val), 0);
console.log("A", sum1);

/* solution B */
for (let i = 0; i < m1.length; i++) {
  for (let j = 0; j < m1[i].length; j++) {
    const sym = m1[i][j];
    if (!re_digit.test(sym) && sym != ".") {
      details.push({ type: sym, x: j, y: i });
    }
  }
}

let pow = 0;

const gears = details.filter((i) => i.type == "*");
for (const g of gears) {
  const num1 = numbers.filter(
    (i) =>
      g.x - 1 <= i.x_max &&
      g.x + 1 >= i.x_min &&
      g.y - 1 <= i.y &&
      g.y + 1 >= i.y
  );

  if (num1.length > 1) {
    pow += num1.reduce((p, i) => (p *= i.val), 1);
  }
}

console.log("B", pow);
