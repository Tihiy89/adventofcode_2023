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
  // [
  //   valid_top.includes(top) ? [_r - 1, _c] : undefined,
  //   valid_bottom.includes(bottom) ? [_r + 1, _c] : undefined,
  //   valid_left.includes(left) ? [_r, _c - 1] : undefined,
  //   valid_right.includes(right) ? [_r, _c + 1] : undefined,
  // ];
};

let finish = false;
let animal_roads = [];
animal_roads.push([[row, col, 0]]);
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
      new_road.push([...i, [...new_cells[j], step + 1]]);
    }
    i.push([...new_cells[0], step + 1]);
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

console.log("A", JSON.stringify(res[0]));
