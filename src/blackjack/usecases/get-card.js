export const getCard = (deck) => {
  if (deck.length === 0) {
    throw "No more cards available";
  }
  let card = deck.pop();
  return card;
};
