console.time(1);

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
while (!finish) {
  nodes = nodes.map((item, index) => {
    const ind = map[i % map.length] + 1;

    if (!item[ind + 3]) {
      const next_addr = item[map[i % map.length] + 1];
      const next_node = data.findIndex((i1) => i1[0] == next_addr);
      item[ind + 3] = next_node;
    }

    return data[item[ind + 3]];
  });

  finish = nodes.reduce((f, i) => i[0][2] == "Z" && f, true);

  i++;
  if (i % 10000000 == 0) console.timeLog(1, "Шаг ", i);
}

// 15 746 133 679 061
console.log("A", i);
