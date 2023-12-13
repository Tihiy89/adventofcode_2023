// часть 2 работает медленно, тупо перебор и валидация масок
console.time(1);
import { input_a_mini as input_a } from "./input.js";

const copies = 2;

const springs = input_a()
  .split("\n")
  .map((i) => i.split(" "))
  .map((i) => [
    Array(copies).fill(i[0]).join("?").split(""),
    Array(copies)
      .fill(i[1])
      .join(",")
      .split(",")
      .map((i) => Number(i)),
  ]);

const lead_num = (str, size) => {
  while (str.length < size) {
    str = "0" + str;
  }
  return str;
};

const calc_cart = (_str) => {
  return _str
    .replace(/\.\.+/g, ".")
    .split(".")
    .map((i) => i.length)
    .filter((i) => i > 0)
    .join("_");
};

const calc_item = (item, _cart) => {
  const iii = item.split("").map((i) => Number(i));
  let count_1 = 0;
  let res = "";
  for (let i = 0; i < iii.length; i++) {
    if (iii[i] === 0) {
      res += ".";
    } else {
      res += "#".repeat(_cart[count_1]);
      count_1++;
    }
  }

  return [item, res, iii, calc_cart(res)];
};

const compare_str = (_s1, _pattern) => {
  for (let i = 0; i < _s1.length; i++) {
    if (_pattern[i] == "?") {
      continue;
    } else if (_pattern[i] != _s1[i]) {
      return false;
    }
  }
  return true;
};

const calc_var = springs.map((ss, ind) => {
  const _comb = ss[0];
  const _comb_str = ss[0].join("");
  const _cart = ss[1];
  const _cart_str = _cart.join("_");

  const size =
    _comb.length - (_cart.reduce((s, i) => (s += i), 0) - _cart.length);
  const _var = [];
  for (let i = 0; i < 2 ** size; i++) {
    const del = 1000000;
    if (i % del == 0) {
      console.log("calc " + i / del + " of " + 2 ** size / del);
    }
    const _s = lead_num(i.toString(2), size);
    const sum = _s.split("").reduce((s, i) => (s += Number(i)), 0);
    if (sum == _cart.length) {
      const item = calc_item(_s, _cart);
      if (item[3] == _cart_str) {
        if (compare_str(item[1], _comb_str)) {
          _var.push(item);
        }
      }
    }
  }
  console.timeLog(1, "end " + ind);
  return [_comb, _cart, _var.length, _var];
});

const sum = calc_var.reduce((s, i) => (s += i[2]), 0);

console.timeEnd(1);
console.log("A", sum);
