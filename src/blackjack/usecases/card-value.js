export const cardValue = (card, specials) => {
  let number = card.substring(0, card.length - 1);
  return !specials.includes(number) ? number * 1 : card[0] == "A" ? 11 : 10;
};
