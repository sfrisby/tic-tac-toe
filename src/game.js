var p1turn = true; // false for player 2 turn.

var concluded = 0;

let available_squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
let p1_squares = [];
let p2_squares = [];

var count = {
   'draws': 0,
   'p1wins': 0,
   'p2wins': 0
};

var winning_combos = [
   [2, 7, 6], [9, 5, 1], [4, 3, 8],
   [2, 9, 4], [7, 5, 3], [6, 1, 8],
   [2, 5, 8], [4, 5, 6]
];

function square_chosen(square) {

   if (concluded)
      return;

   var chosen = parseInt($(square).attr("id"));

   // Assign chosen square to players squares.
   // Remove the chosen square from available squares.
   if (available_squares.includes(chosen)) {
      $('#choice').text("")
      if (p1turn) {
         p1_squares.push(chosen)
         $(square).attr("src", p1_img);
      } else {
         p2_squares.push(chosen)
         $(square).attr("src", p2_img);
      }
      available_squares.splice(available_squares.indexOf(chosen), 1);
      update_turn();
   } else {
      $('#choice').text("You can't go there! Select an empty space.")
      return;
   }

   // Check for a winner.
   if (isWinner())
      return;

   // Check for a draw.
   if (isDraw()) {
      confirmedDraw();
      return;
   }

   // Computers turn (only IFF checked).
   if ($('input[type=radio][name=opponent][value=computer]').is(':checked')) {
      let search = get_computer_square(); // NOTE: splice happening in method call ~ available_squares.splice(available_squares.indexOf(search), 1);
      if (p1turn) {
         p1_squares.push(search)
         $("#" + search).attr("src", p1_img);
      } else {
         p2_squares.push(search)
         $("#" + search).attr("src", p2_img);
      }
      update_turn();
   }

   // Check for a winner.
   if (isWinner())
      return;

   // Check for a draw.
   if (isDraw()) {
      confirmedDraw();
      return;
   }

}

function update_turn() {
   p1turn = !p1turn;
}

function isDraw() {
   return (available_squares.length == 0)
}

function confirmedDraw() {
   concluded = 1;
   count.draws++;
   $('#draws').text(count.draws)
   $('#choice').text("The game has ended in a draw.");
   $('#playAgainBTN').removeAttr('hidden');
}

function isWinner() {
   let winner = get_winning_combo(p1_squares);
   if (winner >= 0) {
      concluded = 1;
      count.p1wins++;
      $('#p1wins').text(count.p1wins)
      $('#choice').text($('#player-one-name').val() + " won the match!")
      winner_display(winning_combos[winner]);
      $('#playAgainBTN').removeAttr('hidden');
      return true;
   }
   winner = get_winning_combo(p2_squares);
   if (winner >= 0) {
      concluded = 1;
      count.p2wins++;
      $('#p2wins').text(count.p2wins)
      $('#choice').text($('#player-two-name').val() + " won the match!")
      winner_display(winning_combos[winner]);
      $('#playAgainBTN').removeAttr('hidden');
      return true;
   }
   return false;
}

/**
 * Obtain the winning combination index.
 * @param {*} chosen Array of chosen squares.
 * @returns winning combination index or -1 winning combination wasn't found.
 */
function get_winning_combo(chosen) {
   if (chosen.length < 3) // Must have chosen at least 3 squares to win.
      return -1;
   for (i = 0; i < winning_combos.length; i++) {
      if (chosen.includes(winning_combos[i][0]) && chosen.includes(winning_combos[i][1]) && chosen.includes(winning_combos[i][2]))
         return i;
   }
   return -1;
}

/** Changing background color of winning squares. */
function winner_display(series) {
   for (var i = 0; i < series.length; i++)
      $('#' + series[i]).attr("style", "background-color:green;");
}

/**
 * Reset game board and square data.
 */
function reset() {
   if (p1turn)
      $('#choice').text("It is " + $('#player-one-name').val() + "'s turn.");
   else
      $('#choice').text("It is " + $('#player-two-name').val() + "'s turn.");

   $('#playAgainBTN').attr('hidden', true);

   $('table#gameboard td img').attr("src", blank_img);
   $('table#gameboard td img').attr("style", "background-color:none;");

   concluded = 0;
   available_squares = [1, 2, 3, 4, 5, 6, 7, 8, 9]
   p1_squares = [];
   p2_squares = [];
}

/**
 * Get a square to win or stop the player from winning or a 'tactical' square.
 * 
 * If the computer has any two of a winning combo the computer takes the remaining spot.
 * If the player has any two of a winning combo the computer takes that spot preventing player win.
 * 
 * @returns 
 */
function get_computer_square() {
   return get_last_available_square();
}

function get_first_available_square() {
   if (available_squares.length > 0)
      return available_squares.shift();
   else
      throw 'No squares are available! Failed to check availability before this point.';
}

function get_last_available_square() {
   if (available_squares.length > 0)
      return available_squares.pop();
   else
      throw 'No squares are available! Failed to check availability before this point.';
}