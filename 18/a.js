console.time(1);
import { input_a as input_a } from "./input.js";

let steps = input_a()
  .split("\n")
  .map((i) => i.split(" "))
  .map((i) => [i[0], Number(i[1]), i[2].match(/\((#.*)\)/)[1]]);

const _m = [];
let points = [[0, 0]];

let max_r = 0,
  max_c = 0,
  min_r = 0,
  min_c = 0;

steps.map((i) => {
  points[points.length - 1] = [...points[points.length - 1], ...i];
  const p = [...points[points.length - 1]];

  if (i[0] == "R") {
    p[1] += i[1];
  } else if (i[0] == "L") {
    p[1] -= i[1];
  } else if (i[0] == "U") {
    p[0] -= i[1];
  } else if (i[0] == "D") {
    p[0] += i[1];
  }

  max_r = Math.max(max_r, p[0]);
  max_c = Math.max(max_c, p[1]);
  min_r = Math.min(min_r, p[0]);
  min_c = Math.min(min_c, p[1]);

  points.push([p[0], p[1]]);

  const t = 1;
});

points = points.map((i) => {
  i[0] -= min_r;
  i[1] -= min_c;

  return [i[0], i[1], i[2], i[3], i[4]];
});

max_r -= min_r;
max_c -= min_c;

for (let _r = 0; _r <= max_r; _r++) {
  _m[_r] = [...Array(max_c + 2).fill(".")];
}

for (let ind = 0; ind < points.length - 1; ind++) {
  const p = points[ind];
  const _direction = p[2];
  const len = p[3];

  if (_direction == "R") {
    for (let i = 0; i < len; i++) {
      _m[p[0]][p[1] + i] = "R";
    }
  } else if (_direction == "L") {
    for (let i = 0; i < len; i++) {
      _m[p[0]][p[1] - i] = "L";
    }
  } else if (_direction == "U") {
    for (let i = 0; i < len; i++) {
      _m[p[0] - i][p[1]] = "U";
    }
  } else if (_direction == "D") {
    for (let i = 0; i < len; i++) {
      _m[p[0] + i][p[1]] = "D";
    }
  }
}

let square = 0;
const ss = [];
for (let _r = 0; _r < _m.length; _r++) {
  const _row = _m[_r];

  let square_row = 0;
  for (let j = 0; j < _m[_r].length; j++) {
    if (_m[_r][j] != ".") square_row++;

    //левая граница
    if (
      _m[_r][j] == "U" ||
      (_m[_r][j] == "L" && (_m[_r + 1] ?? [])[j] == "U")
    ) {
      // Ищем правую границу
      for (let jp = j + 1; jp < _m[_r].length; jp++) {
        if (
          _m[_r][jp] == "D" ||
          (_m[_r][jp] == "L" && (_m[_r - 1] ?? [])[jp] == "D")
        ) {
          square_row += jp - j;
          j = jp;
          break;
        }
      }
    }
  }
  ss.push(square_row);
  square += square_row;
}

console.log("A", square);
