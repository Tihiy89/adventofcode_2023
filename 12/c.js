// часть 2 работает медленно, чуть быстрее чем b, тупо перебор но по маскам из ???
console.time(1);
import { input_a_mini as input_a } from "./input.js";

const copies = 1;

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

const calc_var = springs.map((ss, ind) => {
  const _comb = ss[0];
  const _comb_str = _comb.join("");
  const _cart = ss[1];
  const _cart_str = _cart.join("_");

  const count_q = _comb.reduce((s, i) => (s += i == "?" ? 1 : 0), 0);
  const pos_q = _comb.reduce((p, i, ind) => {
    if (i == "?") {
      p.push(ind);
    }
    return p;
  }, []);
  const count_g = _comb.reduce((s, i) => (s += i == "#" ? 1 : 0), 0);
  const count_free = _cart.reduce((s, i) => (s += i), 0) - count_g;

  const _var = [];

  const size = 2 ** count_q;
  console.log("start", _comb_str, _cart_str, size);

  for (let i = 0; i < size; i++) {
    const del = 1000000;
    if (i % del == 0) {
      console.log("calc " + i / del + " of " + size / del);
    }

    const _s = lead_num(i.toString(2), count_q)
      .split("")
      .map((i) => Number(i));

    const sum = _s.reduce((s, i) => (s += i), 0);
    if (sum == count_free) {
      const _comb_new = pos_q.reduce(
        (ss, i, ind) => {
          ss[i] = _s[ind] == 1 ? "#" : ".";
          return ss;
        },
        [..._comb]
      );
      const comb_new_str = _comb_new.join("");
      const new_cart = calc_cart(comb_new_str);
      if (_cart_str == new_cart) {
        if (compare_str(comb_new_str, _comb_str)) {
          _var.push(comb_new_str);
        }
      }
    }
  }

  console.timeLog(1, "end " + ind);
  return [_comb, _cart, _var.length, _var];
});

const sum = calc_var.reduce((s, i) => (s += i[2]), 0);

console.log("A", sum);
