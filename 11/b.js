import { input_a_mini as input_a } from "./input.js";

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
// К - коэф.расширения галактики
const K = 9999;

const row_free = [];
const col_free = [];
for (let row = 0; row < smap.length; row++) {
  if (!row_inlcuded.includes(row)) {
    //сразу добавляем смещение на "количество вставляемых"
    row_free.push(row + row_free.length * K);
  }
}

for (let col = 0; col < smap[0].length; col++) {
  if (!col_inlcuded.includes(col)) {
    col_free.push(col + col_free.length * K);
  }
}

// расширяем галактику
for (let i = 0; i < row_free.length; i++) {
  smap.splice(
    row_free[i] + 1,
    0,
    ...Array.from({ length: K }, (f) => Array(smap[0].length).fill("."))
  );
}

for (let row = 0; row < smap.length; row++) {
  for (let i = 0; i < col_free.length; i++) {
    smap[row].splice(col_free[i] + 1, 0, ...Array(K).fill("."));
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

//собираем расстояния
const way_len = [];
for (let igl = 0; igl < galaxys.length; igl++) {
  for (let igr = igl + 1; igr < galaxys.length; igr++) {
    const gl = galaxys[igl],
      gr = galaxys[igr];
    const dx = Math.abs(gr[0] - gl[0]),
      dy = Math.abs(gr[1] - gl[1]);

    way_len.push([dx + dy, gl[2] + "_" + gr[2]]);
  }
}

const sum = way_len.reduce((s, i) => {
  s += i[0];
  return s;
}, 0);

console.log("A", sum);
