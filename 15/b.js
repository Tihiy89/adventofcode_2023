console.time(1);
import { input_a as input_a } from "./input.js";

const calc_hash = (_str) => {
  const _m = _str.split("").map((i) => i.charCodeAt());
  return _m.reduce((acc, i) => {
    acc += i;
    acc = (acc * 17) % 256;
    return acc;
  }, 0);
};

const reg = /(.*)([=|-])(.*)/g;

const box = [];
for (let i = 0; i < 256; i++) {
  box.push([]);
}

let ss = input_a()
  .split(",")
  .map((i) => {
    //
    const arr = Array.from(i.matchAll(reg));
    return [i, calc_hash(arr[0][1]), arr[0][1], arr[0][2], Number(arr[0][3])];
  })
  .map((i) => {
    //
    let b = box[i[1]];
    if (i[3] == "-") {
      box[i[1]] = b.filter((item) => item[0] != i[2]);
      const t = "";
    } else if (i[3] == "=") {
      const elem = b.find((item) => item[0] == i[2]);
      if (elem == undefined) {
        b.push([i[2], i[4]]);
      } else {
        elem[1] = i[4];
      }
    }

    return i;
  });

const sum = box.reduce((s, i, ind) => {
  //(s += i[2])
  s += i.reduce((s1, i1, ind1) => {
    s1 += (ind + 1) * (ind1 + 1) * i1[1];
    return s1;
  }, 0);
  return s;
}, 0);

console.log("A", sum);
