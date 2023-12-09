import { input_a as input_a } from "./input.js";

const calc_arr = (arr) => {
  const res = [];
  for (let i = 1; i < arr.length; i++) {
    res.push(arr[i] - arr[i - 1]);
  }
  return res;
};

const test_arr = (arr) => {
  return arr.findIndex((i) => i != 0) == -1 ? true : false;
};

const data = input_a()
  .split("\n")
  .map((i) =>
    i
      .split(" ")
      .map((i) => Number(i))
      //commment - solution A
      //uncomment - solution B
      .reverse()
  );

const res = data
  .map((i) => {
    const seq = [];
    seq.push(i);
    let f = false;

    let completed = test_arr(seq[seq.length - 1]);
    while (!completed) {
      let temp_arr = seq[seq.length - 1];
      const new_seq = calc_arr(temp_arr);
      seq.push(new_seq);
      completed = test_arr(new_seq);
    }

    for (let i1 = 1; i1 < seq.length; i1++) {
      const arr_to = seq[seq.length - 1 - i1];
      const arr_from = seq[seq.length - i1];
      arr_to.push(arr_to[arr_to.length - 1] + arr_from[arr_from.length - 1]);
    }

    return seq;
  })
  .reduce((sum, i) => {
    sum += i[0][i[0].length - 1];
    return sum;
  }, 0);

console.log("A", res);
