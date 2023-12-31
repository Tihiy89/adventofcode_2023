import { input_a as input_a } from "./input.js";

const rank = ["J", "2", "3", "4", "5", "6", "7", "8", "9", "T", "Q", "K", "A"];
//23456789TJQKA

const cards = input_a()
  .split("\n")
  .map((i) => i.split(" "))
  .map((i) => [i[0], Number(i[1])])
  .map((i) => {
    let j_size = 0;
    const power = i[0].split("").reduce((res, i) => {
      if (i != "J") {
        res[i] = (res[i] | 0) + 1;
      } else {
        j_size++;
      }
      return res;
    }, {});
    // размер массива
    // 5 - старшая карта
    // 4 - пара
    // 3 - 2 пары или тройка
    // 2 - каре или фул-хаус
    // 1 - пятерка
    let size = Object.keys(power).length;
    let arr_size = Object.values(power).sort((a, b) => b - a);
    if (j_size == 5) {
      arr_size[0] = j_size;
      size = 1;
    } else if (j_size) {
      arr_size[0] += j_size;
      power["J"] = 0;
    }

    let cards_power = 0;
    if (size == 4) {
      cards_power = 1;
    }

    if (size == 3) {
      if (arr_size[0] == 2) {
        cards_power = 2;
      } else {
        cards_power = 3;
      }
    }
    if (size == 2) {
      if (arr_size[0] == 3) {
        cards_power = 4;
      } else {
        cards_power = 5;
      }
    }
    if (size == 1) {
      cards_power = 6;
    }

    return [i[0], i[1], cards_power];
  })
  .sort((b, a) => {
    if (b[2] != a[2]) {
      return b[2] - a[2];
    } else {
      const bi = b[0].split("").map((i) => rank.findIndex((i1) => i1 == i));
      const ai = a[0].split("").map((i) => rank.findIndex((i1) => i1 == i));
      let ind = 0,
        d = 0;

      while (d == 0) {
        d = bi[ind] - ai[ind];
        ind++;
      }
      return d;
    }
    return 0;
  });

const sum = cards.reduce((sum, item, ind) => {
  sum += item[1] * (ind + 1);
  return sum;
}, 0);

console.log("A", sum);
