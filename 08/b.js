import { input_a as input_a } from "./input.js";

let [map, data] = input_a().split("\n\n");
map = map.split("").map((i) => (i == "L" ? 0 : 1));
data = data
  .split("\n")
  .map((i) => {
    const arr = /(.{3}) = \((.{3}), (.{3})\)/.exec(i);
    return [arr[1], arr[2], arr[3]];
  })
  .sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (b < a) {
      return 1;
    } else {
      0;
    }
  });

let i = 0;
let finish = false;
let nodes = data.filter((i) => i[0][2] == "A");
const history_nodes = [];
while (!finish) {
  nodes = nodes.map((item, index) => {
    const next_addr = item[map[i % map.length] + 1];

    history_nodes[index] = history_nodes[index] ?? [];
    history_nodes[index].push([
      next_addr,
      next_addr[2] == "Z" ? 1 : 0,
      history_nodes[index].length,
    ]);
    return data.find((i1) => i1[0] == next_addr);
  });

  let print = false;

  const valid_nodes = nodes.map((i) => {
    if (i[0][2] == "Z") {
      print = true;
      return 1;
    } else {
      return 0;
    }
  });

  finish = nodes.reduce((f, i) => i[0][2] == "Z" && f, true);

  i++;
  if (print) console.log("Шаг ", i, " узлы ", valid_nodes);
  finish = i == 100000;
}

let an = history_nodes.map((i) => i.filter((i) => i[1] == 1));
an = an.map((node) =>
  node.map((item, index, arr) => {
    const prev = arr[index - 1] ?? [0, 0, 0];
    const delta = item[2] - prev[2];
    return [...item, delta];
  })
);

const nums = an.map((i) => i[2][3]).sort((a, b) => a - b);

const dels = nums.map((i) => {
  const d = [];
  for (let i1 = 0; i1 < i; i1++) {
    if (i % i1 == 0) {
      d.push(i1);
    }
  }
  return d;
});

console.log("Делители для чисел выглядят так: ", JSON.stringify(dels));
console.log(
  'Тут теперь автоматически подбирать сложно, умножаем только "различные" делители чисел '
);

const d_ident = dels.reduce((d, i) => {
  d = i.reduce((d1, i1) => {
    if (!d1.some((i2) => i2 == i1)) d1.push(i1);
    return d1;
  }, d);
  return d;
}, []);
console.log("Делители ", JSON.stringify(d_ident));

const res = d_ident.reduce((pow, i) => pow * i, 1);

console.log("A", res);
