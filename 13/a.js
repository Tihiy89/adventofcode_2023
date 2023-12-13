import { input_a as input_a } from "./input.js";

const _carts_h = input_a()
  .split("\n\n")
  .map((i) => i.split("\n"));

const _carts_tmp = _carts_h.map((_m) => _m.map((row) => row.split("")));

let _carts_v = [];
//разворачиваем линии вертикально
for (let _num = 0; _num < _carts_tmp.length; _num++) {
  for (let i = 0; i < _carts_tmp[_num].length; i++) {
    for (let j = 0; j < _carts_tmp[_num][i].length; j++) {
      if (!_carts_v[_num]) {
        _carts_v[_num] = [];
      }
      if (!_carts_v[_num][j]) {
        _carts_v[_num][j] = [];
      }

      _carts_v[_num][j][i] = _carts_tmp[_num][i][j];
    }
  }
}

_carts_v = _carts_v.map((_m) => _m.map((r) => r.join("")));

const search_refl_check_row = (_m, _row) => {
  for (let i = 0; _row - i >= 0 && _row + 1 + i < _m.length; i++) {
    const r_l = _row - i;
    const r_r = _row + 1 + i;

    if (_m[r_l] != _m[r_r]) {
      return false;
    }
  }
  return true;
};

const search_reflection = (_m) => {
  const res = [];
  const _size = _m.length;
  for (let i = 0; i < _m.length - 1; i++) {
    if (search_refl_check_row(_m, i)) {
      res.push(i);
    }
  }

  return res;
};

const res = [];
for (let mi = 0; mi < _carts_h.length; mi++) {
  const rh = search_reflection(_carts_h[mi]);
  const rv = search_reflection(_carts_v[mi]);

  const h = rh.reduce((s, i) => (s += 100 * (i + 1)), 0);
  const v = rv.reduce((s, i) => (s += i + 1), 0);
  res.push(h + v);
}

const sum = res.reduce((s, i) => (s += i), 0);

console.log("A", sum);
