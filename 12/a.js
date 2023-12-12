import { input_a_mini2 as input_a } from "./input.js";

const springs = input_a()
  .split("\n")
  .map((i) => i.split(" "))
  .map((i) => [i[0].split(""), i[1].split(",").map((i) => Number(i))]);

//генерируем все возможные варианты
const calc_all_comb = (_comb, _size) => {
  const all = [];
  const pos = [];

  //const pos = _comb.reduce((_p, i) => {  }, 0);
  let start_pos = 0;
  for (let i = 0; i < _comb.length && start_pos < _size; i++) {
    pos.push(start_pos);
    start_pos += _comb[i] + 1;
  }

  //pos.map((i, ind, arr)=>[i,])

  //for ( let pi = 0 )
  // for (let pi = 0; pi < pos.length; pi++) {
  //   for (
  //     let pp = pos[pos.length - pi - 1];
  //     pp < pos[pos.length - pi] ?? _size;
  //     pp++
  //   ) {

  let f = false;
  while (!f) {
    for (let pi = pos.length - 1; pi >= 0; pi--) {
      while (pos[pi] + _comb[pi] < (pos[pi + 1] ?? _size)) {
        let _c = Array(pos[0]).fill(".").join("");

        for (let ii = 0; ii < pos.length; ii++) {
          _c += Array(_comb[ii]).fill("#").join("");
          _c += Array((pos[ii + 1] ?? _size - 1) - (pos[ii] + _comb[ii]))
            .fill(".")
            .join("");
        }

        all.push(_c);
        pos[pi]++;
      }
    }

    f = true;
  }

  //   }
  // }

  // let f = false;
  // while (!f) {}

  return all;
};

const res = calc_all_comb([1, 1, 2, 2], 13);

const sol = [];
springs.map((spr) => {
  const row_sol = [];
  const row = spr[0];
  const map = spr[1];

  if (row.length == map.reduce((s, i) => (s += i), 0) + map.length - 1) {
    row_sol.push(map.map((i) => Array(i).fill("#")).join("."));
  } else {
  }

  sol.push(row_sol);
});

console.log("A");
