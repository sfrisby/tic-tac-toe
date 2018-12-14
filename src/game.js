/**
* game.js - Spencer Frisby
*
* This script contains game logic for tic-tac-toe.
**/

var switcher = 1;

var debug_lvl = 0;
var cir_wins = 0;
var crs_wins = 0;

var blank_img = "../img/empty.png";
var cir_img = "../img/circle.png";
var crs_img = "../img/cross.png";

              // rows
var combos = [["#1_1", "#1_2", "#1_3"],
              ["#2_1", "#2_2", "#2_3"],
              ["#3_1", "#3_2", "#3_3"],
              // columns
              ["#1_1","#2_1","#3_1"],
              ["#1_2","#2_2","#3_2"],
              ["#1_3","#2_3","#3_3"],
              // diagonals
              ["#1_1","#2_2","#3_3"],
              ["#1_3","#2_2","#3_1"]];

/** This function changes the images for tic-tac-toe. */
function change_square (square) {
   // Stores image src that was clicked on.
   var current_img = $(square).attr("src");
   // Alternating between cross or circle depending on switcher.
   if (current_img == blank_img) {
      if (switcher % 2 == 0)
	 $(square).attr("src",cir_img);
      else
	 $(square).attr("src",crs_img);
      switcher++;
   }
   // Now check if a win or draw has occurred.
   // THIS EXECUTES BEFORE SEEING THE SQUARE IMAGE CHANGE!!!
   check_winner();
   if (debug_lvl > 0) {
      var msg = "Element " + square + " clicked. ~ " + current_img;
      document.getElementById("msg").innerHTML = msg;
   }
}

/** Show the number of wins. */
function update_th (msg) {
   document.getElementById("msg").innerHTML = msg;
}

/** This function checks all combinations to see if anyone has won. */
function check_winner () {
   var win_found = false;
   var amsg = "";
   var msg = "";

   // Check if a draw occurred, otherwise check if someone won.
   if (draw_occurred()) {
      alert("The game ended in a draw.");
      reset();
      return;
   }
   for (i=0; i<combos.length; i++) {
      if (cir_won(combos[i])) {
         win_found = true;
         cir_wins++;
         amsg = "Circle is the Winner!";
         msg = "Circle has won " + cir_wins + " and Cross has won " + crs_wins + " games.";
         break;
      }
      if (crs_won(combos[i])) {
         win_found = true;
         crs_wins++;
         amsg = "Cross is the Winner!";
         msg = "Circle has won " + cir_wins + " and Cross has won " + crs_wins + " games.";
         break;
      }
   }
   if (win_found) {
      winner_alert(amsg,msg);
      reset();
      return;
   }

   /******************* 
   * Helper functions *
   *******************/
   /** Alert the winner status of the match. */
   function winner_alert (amsg, msg) {
      alert(amsg);
      update_th(msg);
   }
   /** Returns true if circle won or false. */
   function cir_won (combo) {
      if ($(combo[0]).attr("src") == cir_img &&
          $(combo[1]).attr("src") == cir_img &&
          $(combo[2]).attr("src") == cir_img)
         return true;
      return false;
   }
   /** Returns true if circle won or false. */
   function crs_won (combo) {
      if ($(combo[0]).attr("src") == crs_img &&
          $(combo[1]).attr("src") == crs_img &&
          $(combo[2]).attr("src") == crs_img)
         return true;
      return false;
   }
   /** If no one won and no squares are blank, a draw has occurred." */
   function draw_occurred () {
      for (i=0; i<combos.length; i++) {
         for (j=0; j<combos[i].length; j++) {
            if ($(combos[i][j]).attr("src") == crs_img ||
                ($(combos[i][j]).attr("src") == cir_img))
               continue;
            else
               return false;
         }
      }
      return true;
   }
}

// Reset the game board images to all be blank.
function reset() {
   var rows = 3;
   var cols = 3;
   var cell_id = "#1_1";
   for (i=1; i<=rows; i++) {
      for (j=1; j<=cols; j++) {
         cell_id = "#"+i+"_"+j;
         $(cell_id).attr("src",blank_img);
      }
   }
}

function get_some() {
   var values = ['']
   var test = $('#gameboard td').toArray(); // grabbing all elements
   //         `- identical to $('#gameboard td').get();
   var tes1 = $('#gameboard td').get(8); // grab the td at index 8
   var tes2 = $('#gameboard td:lt(9)').get(); // grab the first 8 td
   var tes3 = $('#gameboard td:lt(9)').children('img'); // returning first 8 img
   var tes4 = $('#gameboard td').children('img').attr('id'); // returning first id

   return 0;
   //.filter(function() {
   //var testing = $.inArray($(this).data('src'), values) != blank_img;
   // });
}
