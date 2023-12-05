import { input_a as input_a } from "./input.js";

console.time("solution");

const data = input_a()
  .split("\n\n")
  .map((i) => i.trim().split(":"));

let [seeds, ...maps] = data;

seeds = seeds[1]
  .trim()
  .split(" ")
  .map((i) => Number(i));

const seeds2 = [];
for (let i = 0; i < seeds.length; i = i + 2) {
  seeds2.push([seeds[i], seeds[i + 1]]);
}

// for (let i = 0; i < seeds.length; i = i + 2) {
//   for (let j = 0; j < seeds[i + 1]; j++) {
//     seeds2.push(seeds[i] + j);
//   }

//   //
// }

maps = maps.map((i) =>
  i[1]
    .trim()
    .split("\n")
    .map((i) => i.split(" ").map((i) => Number(i)))
    .sort((b, a) => b[0] - a[0])
);

const seeds_locations = seeds.map((s) => {
  const res = maps.reduce((val, map) => {
    const m_valid = map.find((mi) => mi[1] <= val && val <= mi[1] + mi[2]);
    if (m_valid) {
      val = val - m_valid[1] + m_valid[0];
    }

    return val;
  }, s);
  return res;
});

let output_main = [...seeds2];
for (let map_i = 0; map_i < maps.length; map_i++) {
  const output = [];
  for (let seed_i = 0; seed_i < output_main.length; seed_i++) {
    const map = maps[map_i];
    const seed = output_main[seed_i];

    const m_valid = map.filter(
      (mi) => mi[1] <= seed[0] + seed[1] && seed[0] <= mi[1] + mi[2]
    );
    if (m_valid.length == 0) {
      output.push(seed);
    } else {
      // внутри s - это уже массив диапазонов, т.к. пересечения могут быть частичные
      const remainder_seeds = m_valid.reduce(
        (s, mi) => {
          const new_s = [];
          for (let i = 0; i < s.length; i++) {
            const b = Math.max(mi[1], s[i][0]);
            const e = Math.min(mi[1] + mi[2], s[i][0] + s[i][1]);
            // есть пересечение
            if (b <= e) {
              output.push([b - mi[1] + mi[0], e - b]);

              // если есть пересечение, добавим "остатки"
              if (s[i][0] < mi[1]) {
                new_s.push([s[i][0], mi[1] - s[i][0]]);
              }
              if (mi[1] + mi[2] < s[i][0] + s[i][1]) {
                new_s.push([
                  mi[1] + mi[2] + 1,
                  s[i][0] + s[i][1] - (mi[1] + mi[2] + 1),
                ]);
              }
            } else {
              // нет пересечения
              new_s.push(s[i]);
            }
          }

          return new_s;
        },
        [seed]
      );
      output.push(...remainder_seeds);
    }
  }
  output_main = [...output];
}

seeds_locations.sort((b, a) => b - a);
output_main.sort((b, a) => b[0] - a[0]);

console.log("A", seeds_locations[0]);
console.log("B", output_main[0][0]);

console.timeLog("solution");
