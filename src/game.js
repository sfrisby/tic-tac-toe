let playerOneTurn = true; // p2turn when p1turn === false.
let whoPlayedFirst = 1;
let matchOver = false;
let squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let playerOneSquares = [];
let playerTwoSquares = [];

var count = {
   'draws': 0,
   'p1wins': 0,
   'p2wins': 0
};

const winningCombos = [
   [2, 7, 6], [9, 5, 1], [4, 3, 8],
   [2, 9, 4], [7, 5, 3], [6, 1, 8],
   [2, 5, 8], [4, 5, 6]
];

/**
 * The chosen or searched for square is added to the players data model and 
 * removed from the available_squares.
 * 
 * If the player went first then the computer should go first in the next round.
 * If the computer went first then the player should go first in the next found.
 * 
 * @param {*} square clicked on by user.
 * @returns null.
 */
function chosen(square) {

   if (matchOver) {
      $('#choice').text("The match is over. Click play again!");
      return;
   } else
      $('#choice').text("");

   const chosen = parseInt(square.children[0].id);

   // Player 1 or 2 (i.e. Computer IFF checked).
   if (squares.includes(chosen)) {
      if (playerOneTurn) {
         playerOneSquares.push(chosen);
         $("#" + chosen).attr("src", playerOnePiece);
         if (isComputerPlaying()) {
            // Completing Player One's turn.
            squares.splice(squares.indexOf(chosen), 1);
            nextPlayerTurn();
            if (matchIsWonOrDrawn())
               return;
            // Start of the computer's turn.
            let search = getComputerSquare();
            playerTwoSquares.push(search)
            $("#" + search).attr("src", playerTwoPiece);
            squares.splice(squares.indexOf(search), 1);
            nextPlayerTurn(); // Resetting to player one's turn.
            if (matchIsWonOrDrawn())
               return;
            // Return back to Player one.
            return;
         }
      } else {
         playerTwoSquares.push(chosen)
         $("#" + chosen).attr("src", playerTwoPiece);
      }
      squares.splice(squares.indexOf(chosen), 1);
      nextPlayerTurn();
   } else {
      $('#choice').text("You can't go there! Please pick an empty square.")
      return;
   }

   if (matchIsWonOrDrawn())
      return;
}

function matchIsWonOrDrawn() {
   if (matchIsWon())
      return true;
   if (matchIsDrawn()) {
      confirmedDraw();
      return true;
   }
   return false;
}

function nextPlayerTurn() {
   playerOneTurn = !playerOneTurn;
}

function matchIsDrawn() {
   return (squares.length == 0)
}

function confirmedDraw() {
   matchOver = true;
   count.draws++;
   $('#draws').text(count.draws)
   $('#choice').text("The game has ended in a draw.");
   $('#playAgainBTN').removeAttr('hidden');
}

function confirmedWinner(pid, wins, pname, index) {
   $(pid).text(wins)
   $('#choice').text($(pname).val() + " won the match!")
   setBackgroundGreen(winningCombos[index]);
   $('#playAgainBTN').removeAttr('hidden');
}

function matchIsWon() {
   let index = getWinningComboIndex(playerOneSquares);
   if (index >= 0) {
      matchOver = true;
      count.p1wins++;
      confirmedWinner('#p1wins', count.p1wins, '#player-one-name', index);
      return true;
   }
   index = getWinningComboIndex(playerTwoSquares);
   if (index >= 0) {
      matchOver = true;
      count.p2wins++;
      confirmedWinner('#p2wins', count.p2wins, '#player-two-name', index);
      return true;
   }
   return false;
}

/**
 * Obtain the winning combination index.
 * 
 * @param {*} chosen Array of chosen squares. Returns -1 when length is LT 3.
 * @returns winning combination index or -1 winning combination wasn't found.
 */
function getWinningComboIndex(chosen) {
   if (chosen.length < 3)
      return -1;
   for (i = 0; i < winningCombos.length; i++) {
      if (
         chosen.includes(winningCombos[i][0]) &&
         chosen.includes(winningCombos[i][1]) &&
         chosen.includes(winningCombos[i][2])
      )
         return i;
   }
   return -1;
}

/** Changing background color of winning squares. */
function setBackgroundGreen(series) {
   for (var i = 0; i < series.length; i++)
      $('#' + series[i]).attr("style", "background-color:green;");
}

/** 
 * Play a turn for the computer
 * 
 * Ensures it is the players turn next.
 */
function computerGoesFirst() {
   let search = getComputerSquare();
   playerTwoSquares.push(search)
   $("#" + search).attr("src", playerTwoPiece);
   squares.splice(squares.indexOf(search), 1);
   if (!playerOneTurn)
      nextPlayerTurn();
}

/**
 * Reset game board and square data.
 * 
 * IFF p1 turn and p1 went first: make it p2 turn.
 * IFF p1 turn and p2 went first: it is still p1 turn.
 * IFF p2 turn and p1 went first: it is still p2 turn.
 * IFF p2 turn and p2 went first: make it p1 turn.
 */
function reset() {

   matchOver = false;
   squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
   playerOneSquares = [];
   playerTwoSquares = [];

   $('#playAgainBTN').attr('hidden', true);

   $('table#gameboard td img').attr("src", "");
   $('table#gameboard td img').attr("style", "background-color:none;");

   if (playerOneTurn && whoPlayedFirst === 1) {
      whoPlayedFirst = 2;
      if (isComputerPlaying())
         computerGoesFirst();
      else
         nextPlayerTurn; // Changing to p2's turn.
   } else if (playerOneTurn && whoPlayedFirst === 2) {
      whoPlayedFirst = 1;
      // Already p1's turn.
   } else if (!playerOneTurn && whoPlayedFirst === 1) {
      whoPlayedFirst = 2;
      if (isComputerPlaying())
         computerGoesFirst();
      // Already p2's turn.
   } else if (!playerOneTurn && whoPlayedFirst === 2) {
      whoPlayedFirst = 1;
      nextPlayerTurn(); // Changing to p1's turn.
   } else {
      throw "Failed to determine who's turn it is and or who goes first."
   }

   if (playerOneTurn) {
      $('#choice').text("It is " + $('#player-one-name').val() + "'s turn.")
   } else {
      $('#choice').text("It is " + $('#player-two-name').val() + "'s turn.")
   }
}

function isComputerPlaying() {
   return $('input[type=radio][name=opponent][value=computer]').is(':checked');
}

/**
 * Get a square to win or stop the player from winning or a 'tactical' square.
 * 
 * If the computer has any two of a winning combo the computer takes the remaining spot.
 * 
 * If the player has any two of a winning combo the computer takes that spot preventing player win.
 * 
 * Take the middle when available.
 * 
 * Take the opposite corner when available.
 * 
 * @returns 
 */
function getComputerSquare() {

   // Win
   let tmp = getWinningSquare(playerTwoSquares);
   if (tmp > 0)
      return tmp;

   // Stop player from winning
   tmp = getWinningSquare(playerOneSquares);
   if (tmp > 0)
      return tmp;

   // Middle
   if (squares.includes(5))
      return 5;

   // Corners
   if (!squares.includes(2) && squares.includes(8)) return 8;
   if (!squares.includes(8) && squares.includes(2)) return 2;
   if (!squares.includes(4) && squares.includes(6)) return 6;
   if (!squares.includes(6) && squares.includes(4)) return 4;

   // Take whatever is left.
   return squares[0];
}

function getWinningSquare(who) {
   if (who.length < 2)
      return -1;
   for (i = 0; i < winningCombos.length; i++) {
      if (squares.includes(winningCombos[i][0]) &&
         who.includes(winningCombos[i][1]) &&
         who.includes(winningCombos[i][2])) {
         return winningCombos[i][0];
      } else if (who.includes(winningCombos[i][0]) &&
         squares.includes(winningCombos[i][1]) &&
         who.includes(winningCombos[i][2])) {
         return winningCombos[i][1];
      } else if (who.includes(winningCombos[i][0]) &&
         who.includes(winningCombos[i][1]) &&
         squares.includes(winningCombos[i][2])) {
         return winningCombos[i][2];
      }
   }
   return -1;
}