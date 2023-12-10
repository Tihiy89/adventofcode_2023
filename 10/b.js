import { input_a as input_a } from "./input.js";

const map = input_a()
  .split("\n")
  .map((i) => i.split(""));

const find_start = () => {
  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[row].length; col++) {
      if (map[row][col] == "S") {
        return [row, col];
      }
    }
  }
};

const [row, col] = find_start(map);

const valid_top = ["|", "7", "F", "S"];
const valid_bottom = ["|", "L", "J", "S"];
const valid_left = ["-", "L", "F", "S"];
const valid_right = ["-", "J", "7", "S"];
const check_cell = (_r, _c) => {
  const this_cell = map[_r][_c];

  const top =
    ["|", "L", "J", "S"].includes(this_cell) && _r > 0
      ? map[_r - 1][_c]
      : undefined;
  const bottom =
    ["|", "F", "7", "S"].includes(this_cell) && _r < map.length - 1
      ? map[_r + 1][_c]
      : undefined;
  const left =
    ["-", "7", "J", "S"].includes(this_cell) && _c > 0
      ? map[_r][_c - 1]
      : undefined;
  const right =
    ["-", "F", "L", "S"].includes(this_cell) && _c < map[_r].length - 1
      ? map[_r][_c + 1]
      : undefined;

  const res = [];
  if (valid_top.includes(top)) res.push([_r - 1, _c]);
  if (valid_bottom.includes(bottom)) res.push([_r + 1, _c]);
  if (valid_left.includes(left)) res.push([_r, _c - 1]);
  if (valid_right.includes(right)) res.push([_r, _c + 1]);

  return res;
};

let finish = false;
let animal_roads = [];
animal_roads.push([[row, col, 0, map[row][col]]]);
let step = 0;
while (!finish) {
  const new_road = [];
  animal_roads.map((i) => {
    const prev_cells = i[i.length - 2];
    const new_cells = check_cell(...i[i.length - 1]).filter(
      (item) =>
        prev_cells == undefined ||
        item[0] != prev_cells[0] ||
        item[1] != prev_cells[1]
    );

    for (let j = 1; j < new_cells.length; j++) {
      new_road.push([
        ...i,
        [...new_cells[j], step + 1, map[new_cells[j][0]][new_cells[j][1]]],
      ]);
    }
    i.push([...new_cells[0], step + 1, map[new_cells[0][0]][new_cells[0][1]]]);
    return i;
  });

  animal_roads = [...animal_roads, ...new_road];
  step++;
  finish = animal_roads.reduce((f, i) => {
    const last_node = i[i.length - 1];
    const res = f || map[last_node[0]][last_node[1]] == "S";
    return res;
  }, false);
}

const res = animal_roads.map((i) => Math.floor(i.length / 2));
const ar = animal_roads[0];

const map_2 = [];
for (let row = 0; row < map.length; row++) {
  for (let col = 0; col < map[row].length; col++) {
    if (!map_2[row]) {
      map_2[row] = [];
    }
    map_2[row][col] = ".";
  }
}

ar.map((i) => {
  map_2[i[0]][i[1]] = i[3];
});

const point_l = [],
  point_r = [];
const mask_r = {
  "1_0": [0, -1],
  "0_1": [1, 0],
  "0_-1": [-1, 0],
  "-1_0": [0, 1],
};
const mask_l = {
  "1_0": [0, 1],
  "0_1": [-1, 0],
  "0_-1": [1, 0],
  "-1_0": [0, -1],
};

const check_add_point = (_p, _mask_l, _mask_r, _d) => {
  const xl = _p[0] + _mask_l[_d][0],
    yl = _p[1] + _mask_l[_d][1],
    xr = _p[0] + _mask_r[_d][0],
    yr = _p[1] + _mask_r[_d][1];

  const p_l = (map_2[xl] ?? [])[yl];
  const p_r = (map_2[xr] ?? [])[yr];

  if (
    p_l &&
    p_l == "." &&
    point_l.findIndex((i) => i[0] == xl && i[1] == yl) == -1
  ) {
    point_l.push([xl, yl]);
  }
  if (
    p_r &&
    p_r == "." &&
    point_r.findIndex((i) => i[0] == xr && i[1] == yr) == -1
  ) {
    point_r.push([xr, yr]);
  }
};

for (let i = 1; i < ar.length; i++) {
  const p = ar[i - 1];
  const p_next = ar[i];
  const d = [p_next[0] - p[0] + "_" + (p_next[1] - p[1])];

  check_add_point(p, mask_l, mask_r, d);
  check_add_point(p_next, mask_l, mask_r, d);

  // const xl = p[0] + mask_l[d][0],
  //   yl = p[1] + mask_l[d][1],
  //   xr = p[0] + mask_r[d][0],
  //   yr = p[1] + mask_r[d][1];

  // const p_l = (map_2[xl] ?? [])[yl];
  // const p_r = (map_2[xr] ?? [])[yr];

  // if (
  //   p_l &&
  //   p_l == "." &&
  //   point_l.findIndex((i) => i[0] == xl && i[1] == yl) == -1
  // ) {
  //   point_l.push([xl, yl]);
  // }
  // if (
  //   p_r &&
  //   p_r == "." &&
  //   point_r.findIndex((i) => i[0] == xr && i[1] == yr) == -1
  // ) {
  //   point_r.push([xr, yr]);
  // }
}

const find_cells = (_m, _example) => {
  const res = [];
  for (let node of _m) {
    const cell = (map_2[node[0]] ?? [])[node[1]];
    if (cell == ".") {
      res.push(node);
      (map_2[node[0]] ?? [])[node[1]] = _example;
    }
  }
  return res;
};

const find_cells_arr = (arr, _exm) => {
  let i = 0;
  while (i < arr.length) {
    const x = arr[i][0];
    const y = arr[i][1];
    // map_2[x][y] = _exm;
    const point_new = find_cells(
      [
        [x - 1, y - 1],
        [x, y - 1],
        [x + 1, y - 1],
        [x - 1, y],
        [x, y],
        [x + 1, y],
        [x - 1, y + 1],
        [x, y + 1],
        [x + 1, y + 1],
      ],
      _exm
    );

    arr.push(
      ...point_new.filter(
        (i) => arr.findIndex((it) => it[0] == i[0] && it[1] == i[1]) == -1
      )
    );
    i++;
  }
};

find_cells_arr(point_l, "o");
find_cells_arr(point_r, "I");

const no_valid = [];
for (let row = 0; row < map_2.length; row++) {
  for (let col = 0; col < map_2[row].length; col++) {
    if (map_2[row][col] == ".") {
      no_valid.push([row, col]);
    }
  }
}

console.log("B", point_l.length, point_r.length);
