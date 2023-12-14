console.time(1);
import { input_a as input_a } from "./input.js";

let _m = input_a()
  .split("\n")
  .map((i) => i.split(""));

const rotation = (_m) => {
  const res = [];
  const s_v = _m.length;
  const s_h = _m[0].length;
  for (let i = 0; i < s_v; i++) {
    for (let j = 0; j < s_h; j++) {
      if (res[j] == undefined) {
        res[j] = [];
      }
      res[j][s_v - i - 1] = _m[i][j];

      //
      const s = "";
    }
  }

  return res;
};

const tilt_north = (_m) => {
  // тут будут позиции квадратных камней по колонкам
  const coub = [];
  // тут будут позиции круглых
  const ball = [];

  // // Для расчета нагрузки
  const size_r = _m.length;
  // // тут будет вес
  let sum = 0;

  for (let _r = 0; _r < _m.length; _r++) {
    for (let _c = 0; _c < _m[_r].length; _c++) {
      if (coub[_c] == undefined) {
        coub[_c] = [];
      }
      if (ball[_c] == undefined) {
        ball[_c] = -1;
      }
      if (_m[_r][_c] == "#") {
        coub[_c].push(_r);
        ball[_c] = _r;
      }
      if (_m[_r][_c] == "O") {
        const _row = ball[_c] + 1 ?? 0;
        if (_row != _r) {
          _m[_row][_c] = "O";
          _m[_r][_c] = ".";
          ball[_c]++;
        } else {
          ball[_c] = _r;
        }
        sum += size_r - _row;
      }
    }
  }

  return sum;
};

const calc_load = (_m) => {
  // // Для расчета нагрузки
  const size_r = _m.length;
  // // тут будет вес
  let sum = 0;

  for (let _r = 0; _r < _m.length; _r++) {
    for (let _c = 0; _c < _m[_r].length; _c++) {
      if (_m[_r][_c] == "O") {
        sum += size_r - _r;
      }
    }
  }
  return sum;
};

let sum = 0;

const w = [];
w.push(calc_load(_m));

for (let i = 0; i < 1000000000; i++) {
  tilt_north(_m);
  _m = rotation(_m);

  const iw = (i + 1) % 4;
  if (iw == 0) {
    const sum = calc_load(_m);
    w.push(sum);
  }

  if (i % 100000 == 0) {
    console.timeLog(1, "Шаг", i, "вес", w[w.length - 1]);
  }
}

// стопаем цикл где-нибудь
// длина цикла 84
// если посчитать какой элемент в цикле попадает на 1000000000 - получаетя 76 (индекс - 75)
// прибавляем к 75  84 (можно несоклько раз), чтобы точно попасть в "устоявшийся" цикл получаем например 159
// это и будет ответ

console.log("A", sum);
