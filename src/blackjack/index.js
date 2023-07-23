import _ from "underscore";
import { createDeck, getCard, cardValue } from "./usecases";
/**
 * 2C = Two of Clubs
 * 2D = Two of Diamonds
 * 2H = Two of Hearts
 * 2S = Two of Spades
 */

(() => {
  "use strict";
  let deck = [];
  const types = ["C", "D", "H", "S"];
  const specials = ["A", "Q", "J", "K"];
  let playerScores = [];

  const btnGetCard = document.querySelector("#get-card"),
    btnStartGame = document.querySelector("#start-game"),
    btnStop = document.querySelector("#stop"),
    viewScores = document.querySelectorAll("small"),
    playersCards = document.querySelectorAll(".divCards");

  const initializeGame = (numPlayers = 2) => {
    deck = createDeck(types, specials);
    for (let i = 0; i < numPlayers; i++) {
      playerScores.push(0);
    }
  };

  const updateScores = (player, card) => {
    playerScores[player] = playerScores[player] + cardValue(card, specials);
    viewScores[player].innerText = playerScores[player];
    return playerScores[player];
  };

  const showCards = (card, player) => {
    const imageCard = document.createElement("img");
    imageCard.src = `assets/cartas/${card}.png`;
    imageCard.classList.add("cards");
    playersCards[player].append(imageCard);
  };

  const computerTurn = (minimumScore) => {
    let computerScore;
    do {
      let card = getCard(deck);
      computerScore = updateScores(playerScores.length - 1, card);
      showCards(card, playerScores.length - 1);
    } while (computerScore < minimumScore && minimumScore <= 21);
    decideWinner(computerScore, minimumScore);
  };

  const decideWinner = (computerScore, minimumScore) => {
    setTimeout(() => {
      if (computerScore > 21) {
        alert("Player 1 has won!");
      } else if (computerScore === 21 && minimumScore === 21) {
        alert("Draw");
      } else {
        alert("Player 2 has won!");
      }
    }, 50);
  };

  btnGetCard.addEventListener("click", () => {
    let card = getCard(deck);
    let playerScore = updateScores(0, card);
    showCards(card, 0);
    if (playerScore >= 21) {
      btnGetCard.disabled = true;
      btnStop.disabled = true;
      computerTurn(playerScore);
    }
  });

  btnStop.addEventListener("click", () => {
    btnGetCard.disabled = true;
    btnStop.disabled = true;
    computerTurn(playerScores[0]);
  });

  btnStartGame.addEventListener("click", () => {
    playerScores = [];
    initializeGame();
    viewScores.forEach((elem) => (elem.innerText = 0));
    btnGetCard.disabled = false;
    btnStop.disabled = false;
    playersCards.forEach((elem) => (elem.innerHTML = ""));
  });
})();
