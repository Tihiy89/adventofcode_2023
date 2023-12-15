console.time(1);
import { input_a_mini as input_a } from "./input.js";

const calc_hash = (_m) => {
  return _m.reduce((acc, i) => {
    acc += i;
    acc = (acc * 17) % 256;
    return acc;
  }, 0);
};

let ss = input_a()
  .split(",")
  .map((i) => i.split(""))
  .map((s) => [s, s.map((_ch) => _ch.charCodeAt())])
  .map((s) => {
    const res = calc_hash(s[1]);

    return [s[0], s[1], res];
  });

const sum = ss.reduce((s, i) => (s += i[2]), 0);

console.log("A", sum);
