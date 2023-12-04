import { input_a as input_a } from "./input.js";

function findDigit(str) {
  let res = [];

  [
    ["[\\d]", -1],
    ["one", 1],
    ["two", 2],
    ["three", 3],
    ["four", 4],
    ["five", 5],
    ["six", 6],
    ["seven", 7],
    ["eight", 8],
    ["nine", 9],
  ].forEach((i) => {
    res = [
      ...res,
      ...Array.from(str.matchAll(RegExp(i[0], "g"))).map((item) => {
        const t = [item.index, i[1] == -1 ? "" + item[0] : "" + i[1]];
        return t;
      }),
    ];
  });

  res.sort((b, a) => b[0] - a[0]);
  return res;
}

const m1 = input_a().split("\n");
const m2 = m1.map((str) => findDigit(str));
const m3 = m2.map((arr) =>
  arr.length > 0 ? arr[0][1] + arr[arr.length - 1][1] : 0
);
const res = m3.reduce((sum, item) => (sum += Number(item)), 0);

console.log(m1);
console.log(m2);
console.log(m3);
console.log(res);

// solution a
// console.log(
//   input_a()
//     .split("\n")
//     .map((str) => str.match(/\d/g))
//     .map((arr) => (arr.length > 0 ? arr[0] + arr[arr.length - 1] : 0))
//     .reduce((sum, item) => (sum += Number(item)), 0)
// );

// solution b
// console.log(
//   input_a()
//     .split("\n")
//     .map((str) =>
//       str.match(
//         RegExp(
//           [
//             "[\\d]",
//             "one",
//             "two",
//             "three",
//             "four",
//             "five",
//             "six",
//             "seven",
//             "eight",
//             "nine",
//           ].join("|"),
//           "g"
//         )
//       )
//     )
//     .map((arr) =>
//       arr.length > 0 ? findDigit(arr[0]) + findDigit(arr[arr.length - 1]) : 0
//     )
//     .reduce((sum, item) => (sum += Number(item)), 0)
// );
