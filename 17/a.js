console.time(1);
import { input_a_mini as input_a } from "./input.js";

let _m = input_a()
  .split("\n")
  .map((i) => i.split("").map((i) => Number(i)));

const len_r = _m.length;
const len_c = _m[0].length;

const _s = [0, 0];
const _f = [len_r - 1, len_c - 1];

const len_f = (_p) => {
  return Math.abs(_f[0] - _p[0]) + Math.abs(_f[1] - _p[1]);
};

const point2str = (_p) => {
  return _p[0] + "_" + _p[1];
};

// тут будем хранить оценку пути из точки, вида х_у, стоимость, prev.point
const _ways = [];

// просчитываем стоимость перехода в _p из окрестных точек
const calc_var_point = (_p) => {
  const _v = [];
  for (let _r = _p[0] - 3; _r <= _p[0] + 3; _r++) {
    for (let _c = _p[1] - 3; _c <= _p[1] + 3; _c++) {
      const pp = (_m[_r] ?? [])[_c];
      if (
        pp != undefined &&
        !(_r == _p[0] && _c == _p[1]) &&
        (_r == _p[0] || _c == _p[1])
      ) {
        // row, col, cost, prev.point
        const prev = [...(_p[3] ?? [])];
        prev.push(point2str(_p));
        _v.push([_r, _c, pp + (_p[2] ?? 0), prev, point2str([_r, _c])]);
      }
    }
  }

  // _v.sort((a, b) => len_f(a) - len_f(b));

  return _v;
};

const update_ways = (_v) => {
  _v.map((i) => {
    // i - row, col, cost, prev.point,point2str, del
    // ways - row_col, cost, prev.point

    const wi = _ways.findIndex((_w) => _w[0] == i[4]);
    if (wi == -1) {
      _ways.push([i[4], i[2], i[3]]);
    } else {
      if (_ways[wi][1] > i[2]) {
        _ways[wi][1] = i[2];
        _ways[wi][2] = [...i[3]];
      } else {
        i[5] = 1;
      }
    }

    return i;
  });

  return _v.filter((i) => i[5] != 1);
};

let _v = calc_var_point(_f);
update_ways(_v);
let f = 0;

while (!f) {
  _v.splice(100, _v.length);
  _v.map((i) => _v.push(...calc_var_point(i)));
  _v.sort((a, b) => len_f(b) - len_f(a));
  _v = update_ways(_v);
  const tt = 1;
  if (_v.length == 0) {
    f = 1;
  }
}

console.log("A");
