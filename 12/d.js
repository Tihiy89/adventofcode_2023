// часть 2
console.time(1);
import { input_a_mini2 as input_a } from "./input.js";

const copies = 3;

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

//
const compare_str_cart = (_s1, _cart) => {
  let ind_c = 0;

  const _cart_s = _s1.join("").replace(/\.+/g, " ").trim().split(" ");
  for (let i = 0; i < _cart_s.length; i++) {
    const pos_q = _cart_s[i].indexOf("?");
    if (pos_q == -1) {
      if (_cart_s[i].length != _cart[i]) {
        return false;
      }
    } else {
      if (pos_q > _cart[i]) {
        return false;
      }
      break;
    }
  }

  const _cart_s_rev = [..._s1]
    .reverse()
    .join("")
    .replace(/\.+/g, " ")
    .trim()
    .split(" ");
  const _cart_rev = [..._cart].reverse();
  for (let i = 0; i < _cart_s_rev.length; i++) {
    const pos_q = _cart_s_rev[i].indexOf("?");
    if (pos_q == -1) {
      if (_cart_s_rev[i].length != _cart_rev[i]) {
        return false;
      }
    } else {
      if (pos_q > _cart_rev[i]) {
        return false;
      }
      break;
    }
  }

  return true;
};

// посчитать маску для строки (готовой без ??)
const calc_cart = (_str) => {
  return _str
    .replace(/\.\.+/g, ".")
    .split(".")
    .map((i) => i.length)
    .filter((i) => i > 0)
    .join("_");
};

const calc_str = (_comb, _cart) => {
  // const t_deep = deep++;
  // if (t_deep % 10 == 0) {
  //   console.log(t_deep);
  // }
  const _comb_str = _comb.join("");
  const _cart_str = _cart.join("_");

  const res = [];

  const count_q = _comb.reduce((s, i) => (s += i == "?" ? 1 : 0), 0);
  const pos_q = _comb.reduce((p, i, ind) => {
    if (i == "?") {
      p.push(ind);
    }
    return p;
  }, []);

  if (pos_q.length > 0) {
    const n_1 = [..._comb],
      n_2 = [..._comb];
    n_1[pos_q[0]] = "#";
    n_2[pos_q[0]] = ".";

    const f1 = compare_str_cart(n_1, [..._cart]);
    const f2 = compare_str_cart(n_2, [..._cart]);

    if (f1) {
      const rrr = calc_str(n_1, _cart);
      res.push(...rrr);
      //const t = "";
    }

    if (f2) {
      const rrr = calc_str(n_2, _cart);
      res.push(...rrr);
    }
  } else {
    const n_cart = calc_cart(_comb_str);
    if (n_cart == _cart_str) {
      res.push(_comb_str);
    }
  }

  return res;
};

let deep = 0;

const calc_var = springs.map((ss, ind) => {
  const _comb = ss[0];
  const _cart = ss[1];
  const _comb_str = _comb.join("");
  const _cart_str = _cart.join("_");

  console.log("start", _comb_str, _cart_str);

  deep = 0;
  const _var = calc_str(_comb, _cart);

  console.timeLog(1, "end " + ind);
  return [_comb_str, _cart_str, _var.length, _var];
});

const sum = calc_var.reduce((s, i) => (s += i[2]), 0);

console.log("A", sum);
