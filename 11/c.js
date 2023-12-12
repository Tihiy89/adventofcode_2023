import { input_a as input_a } from "./input.js";

const smap = input_a()
  .split("\n")
  .map((i) => i.split(""));

// соберем строки и столбцы где точно есть галактики
let row_inlcuded = [];
let col_inlcuded = [];

for (let row = 0; row < smap.length; row++) {
  for (let col = 0; col < smap[row].length; col++) {
    if (smap[row][col] == "#") {
      row_inlcuded.push(row);
      col_inlcuded.push(col);
    }
  }
}
row_inlcuded = row_inlcuded
  .sort((a, b) => a - b)
  .filter((i, ind, arr) => {
    return i != arr[ind + 1];
  });
col_inlcuded = col_inlcuded
  .sort((a, b) => a - b)
  .filter((i, ind, arr) => i != arr[ind + 1]);

// строки и столбцы где галактик точно нет

const row_free = [];
const col_free = [];
for (let row = 0; row < smap.length; row++) {
  if (!row_inlcuded.includes(row)) {
    //сразу добавляем смещение на "количество вставляемых"
    row_free.push(row);
  }
}

for (let col = 0; col < smap[0].length; col++) {
  if (!col_inlcuded.includes(col)) {
    col_free.push(col);
  }
}

//собираем галактики
const galaxys = [];
for (let row = 0; row < smap.length; row++) {
  for (let col = 0; col < smap[row].length; col++) {
    if (smap[row][col] == "#") {
      galaxys.push([row, col, galaxys.length]);
    }
  }
}

// К - коэф.расширения галактики
const K = 999999;
const calc_k = (p1, p2, arr) => {
  const min = Math.min(p1, p2);
  const max = Math.max(p1, p2);
  return arr.filter((i) => min < i && i < max).length * K;
};

//собираем расстояния
const way_len = [];
for (let igl = 0; igl < galaxys.length; igl++) {
  for (let igr = igl + 1; igr < galaxys.length; igr++) {
    const gl = galaxys[igl],
      gr = galaxys[igr];

    const dx = Math.abs(gr[0] - gl[0]) + calc_k(gr[0], gl[0], row_free),
      dy = Math.abs(gr[1] - gl[1]) + calc_k(gr[1], gl[1], col_free);

    way_len.push([dx + dy, gl[2] + "_" + gr[2]]);
  }
}

const sum = way_len.reduce((s, i) => {
  s += i[0];
  return s;
}, 0);

console.log("A", sum);
