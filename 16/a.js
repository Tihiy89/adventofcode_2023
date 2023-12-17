console.time(1);
import { input_a as input_a } from "./input.js";

const _map = input_a()
  .split("\n")
  .map((i) => i.replace(/#/g, `\\`).split(""));

const _ways = [];

const rva = { "0_1": [1, 0], "1_0": [0, -1], "0_-1": [-1, 0], "-1_0": [0, 1] };
const rvr = { "0_1": [-1, 0], "-1_0": [0, -1], "0_-1": [1, 0], "1_0": [0, 1] };
const rot_r = (_v) => rva[_v[0] + "_" + _v[1]];
const rot_l = (_v) => rvr[_v[0] + "_" + _v[1]];
const vec_is_v = (_v) => _v[0] != 0 && _v[1] == 0;
const vec_is_h = (_v) => _v[0] == 0 && _v[1] != 0;
const find_node = (_n) => {
  return (
    _ways.findIndex(
      (i1) =>
        i1.findIndex(
          (i) =>
            _n[0] == i[0] && _n[1] == i[1] && _n[2] == i[2] && _n[3] == i[3]
        ) != -1
    ) != -1
  );
};
const node_isvalid = (_n) => {
  return (
    0 <= _n[0] && _n[0] < _map.length && 0 <= _n[1] && _n[1] < _map[0].length
  );
};

const calc_count = (_ways) => {
  const node_indentity = [];
  _ways.map((w) => {
    w.map((n) => {
      if (node_indentity.findIndex((i) => i[0] == n[0] && i[1] == n[1]) == -1) {
        node_indentity.push(n);
      }
    });
    return w;
  });
  return node_indentity.length;
};

const calc_road = (_n) => {
  if (find_node([..._n])) {
    return [];
  }

  const w = [];
  let f = false;
  let node = [..._n];

  while (!f) {
    if (node_isvalid(node)) {
      w.push(node);
    }

    const nx = node[0] + node[2],
      ny = node[1] + node[3];
    const cell = (_map[nx] ?? [])[ny];
    const _v = [node[2], node[3]];
    if (cell == undefined) {
      _ways.push(w);
      f = true;
    } else if (cell == ".") {
      node = [nx, ny, node[2], node[3]];
    } else if (["-", "|"].includes(cell)) {
      if ((cell == "-" && vec_is_v(_v)) || (cell == "|" && vec_is_h(_v))) {
        f = true;

        const v1 = rot_r(_v);
        const v2 = rot_l(_v);
        _ways.push(w);
        calc_road([nx, ny, ...v1]);
        calc_road([nx, ny, ...v2]);
      } else {
        node = [nx, ny, node[2], node[3]];
      }
    } else if (["/", "\\"].includes(cell)) {
      if ((cell == "/" && vec_is_v(_v)) || (cell == "\\" && vec_is_h(_v))) {
        _ways.push(w);

        const v1 = rot_r(_v);
        calc_road([nx, ny, ...v1]);
      } else if (
        (cell == "\\" && vec_is_v(_v)) ||
        (cell == "/" && vec_is_h(_v))
      ) {
        _ways.push(w);
        const v1 = rot_l(_v);
        calc_road([nx, ny, ...v1]);
      }
      f = true;
    } else {
      _ways.push(w);
      f = true;
    }
  }

  return w;
};

// шаг координаты и направление, например [5,5,0,1] из [5,5] глядим в [5,6]
const node = [0, -1, 0, 1];

calc_road(node);
const _count = calc_count(_ways);

console.log("A", _count);
