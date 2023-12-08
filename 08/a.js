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
let node = data.find((i) => i[0] == "AAA");
while (!finish && node) {
  const next_addr = node[map[i % map.length] + 1];
  node = data.find((i) => i[0] == next_addr);
  finish = next_addr == "ZZZ";

  i++;
  // if (i >= map.length) {
  //   i = 0;
  // }
}

console.log("A", i);
