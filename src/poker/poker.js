import _ from "lodash";

const Ranks = Object.freeze([
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "J",
  "Q",
  "K",
  "A",
]);

const Suits = Object.freeze(["hearts", "clubs", "diams", "spades"]);

const Cards = deepFreeze(
  Object.entries(Ranks).reduce(
    (cards, [weight, rank]) => [
      ...cards,
      ...Suits.map((suit) => ({ rank, suit, weight })),
    ],
    []
  )
);
