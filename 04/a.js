import { input_a as input_a } from "./input.js";

const cards = input_a()
  .split("\n")
  .map((i) => i.split(":"))
  .map((i, index) => {
    const r = i[1]
      .trim()
      .split("|")
      .map((i) =>
        i
          .trim()
          .replace(/  +/g, " ")
          .split(" ")
          .map((i) => Number(i))
          .sort((b, a) => b - a)
      );

    return [...r, [], index + 1];
  });

/* Solution A  */
let new_card = [];
let sum_point = 0;
for (let index_card = 0; index_card < cards.length; index_card++) {
  const card = cards[index_card];
  const win_num = card[0];
  const num_for_check = card[1];
  const num_card = index_card + 1;
  let count_win_num = 0;

  for (let i = 0, j = 0; i < win_num.length && j < num_for_check.length; i++) {
    while (win_num[i] > num_for_check[j]) {
      j++;
    }

    if (win_num[i] == num_for_check[j]) {
      count_win_num++;
    }
  }

  sum_point += count_win_num ? Math.pow(2, count_win_num - 1) : 0;

  card[2] = [];
  for (
    let ind_win_card = num_card + 1;
    ind_win_card <= num_card + count_win_num;
    ind_win_card++
  ) {
    card[2].push(ind_win_card);
  }
  new_card = [...new_card, ...card[2]];
}

console.log("A", sum_point);

/* Solution B  */
while (new_card.length) {
  const i_new = new_card.pop();
  const card1 = cards[i_new - 1];
  new_card.push(...card1[2]);
  cards.push(cards[i_new]);
}

const n = cards.sort((b, a) => b[3] - a[3]);

console.log("B", cards.length);
