import _ from "underscore";
/**
 *
 * @param {Array<string>} cardTypes
 * @param {Array<string>} specialCards
 * @returns {Array<string>}
 */
export const createDeck = (cardTypes, specialCards) => {
  let deck = [];
  for (let i = 2; i <= 10; i++) {
    for (let type of cardTypes) {
      deck.push(i + type);
    }
  }
  for (let special of specialCards) {
    for (let type of cardTypes) {
      deck.push(special + type);
    }
  }
  deck = _.shuffle(deck);
  return deck;
};
