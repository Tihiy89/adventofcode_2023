import { input_a as input_a } from "./input.js";

/* solution A */
const m1 = input_a()
  .split("\n")
  .map((i) => i.split(":"))
  .map((i) => {
    return {
      game_num: i[0].split(" ")[1],
      comb: i[1]
        .trim()
        .split(";")
        .map((i) =>
          i
            .trim()
            .split(",")
            .map((i) => i.trim().split(" "))
        ),
    };
  });

let sum_good_game = 0;
const coub = { red: 12, green: 13, blue: 14 };

m1.forEach((game) => {
  let game_good = true;
  game.comb.forEach((selections) => {
    selections.forEach((it) => {
      const color = it[1];
      const num = Number(it[0]);
      if (coub[color] && coub[color] < num) {
        game_good = false;
      }
    });
  });
  sum_good_game += game_good ? Number(game.game_num) : 0;
});

console.log("A ", sum_good_game);

/* solution B */

let sum_game_pow = 0;
m1.forEach((game) => {
  let game_pow = 0;
  const min_coub = { red: 0, green: 0, blue: 0 };
  game.comb.forEach((selections) => {
    selections.forEach((it) => {
      const color = it[1];
      const num = Number(it[0]);
      if (min_coub[color] < num) {
        min_coub[color] = num;
      }
    });
  });
  game_pow = min_coub.red * min_coub.green * min_coub.blue;
  sum_game_pow += game_pow;
});

console.log("B ", sum_game_pow);
