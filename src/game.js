/** 
* game.js
* 
* Spencer Frisby
*
* This script contains game operations for tic-tac-toe.
**/

var debug = 0;

var record_id = "record";
var match_id = "match-results";
var new_match_msg = "Waiting to see what happens ...";

var switcher = 1;
var match_complete = 0;

var cir_wins = 0;
var crs_wins = 0;

var blank_img = "../img/empty.png";
var cir_img = "../img/circle.png";
var crs_img = "../img/cross.png";

              // rows
var series = [["#1_1", "#1_2", "#1_3"],
              ["#2_1", "#2_2", "#2_3"],
              ["#3_1", "#3_2", "#3_3"],
              // columns
              ["#1_1","#2_1","#3_1"],
              ["#1_2","#2_2","#3_2"],
              ["#1_3","#2_3","#3_3"],
              // diagonals
              ["#1_1","#2_2","#3_3"],
              ["#1_3","#2_2","#3_1"]];

/** 
 change_square changes a blank image into a cross or circle depending on the
 switcher value. It simply alternates between cross and circle.
 
 If a match has completed, and another sqaure is chosen, the game board will be
 reset.
*/
function change_square (square) {
   if (match_complete) {
      reset();
   }
   else {
      // Alternating between cross or circle depending on switcher.
      if ($(square).attr("src") == blank_img) {
	 $(square).attr("src",crs_img); // TODO: change to player piece variable.
         if (check_winner()) return;
         
         // Now the computer makes a choice.
         computers_choice();
         if (check_winner()) return;
      }
   }
}

function match_turn()
{
   // player plays
   // check for winner
   // computer goes next
   // check for player
   // repeat
}


function computers_choice() {
   $(computer_choice()).attr("src",cir_img);
}

/** 
 This function checks all combinations to see if anyone has won. 

 A draw occurs if no winner is found.
*/
function check_winner () {
   var win_found = false;
   var match_results = "";
   var match_record = "";

   for (i=0; i<series.length; i++) {
      if (cir_won(series[i])) {
         win_found = true;
         cir_wins++;
         match_results = "Circle was the winner!";
         match_record = "Circle has won " + cir_wins + " and Cross has won " + crs_wins + " games.";
         break;
      }
      if (crs_won(series[i])) {
         win_found = true;
         crs_wins++;
         match_results = "Cross was the winner!";
         match_record = "Circle has won " + cir_wins + " and Cross has won " + crs_wins + " games.";
         break;
      }
   }
   if (win_found) {
      winner_alert(match_results, match_record);
      match_complete = 1;
      return true;
   }
   else {
      if (draw_occurred()) {
         update_info(match_id,"The game ended in a draw.");
         match_complete = 1;
         return;
      }
   }

   /******************* 
   * Helper functions *
   *******************/
   /** Alert the winner status of the match. */
   function winner_alert (match_results, match_record) {
      update_info(record_id,match_record);
      update_info(match_id,match_results);
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
   /** All squres must be filled for a draw to occur. */
   function draw_occurred () {
      var sources = [];
      var squares = $('#gameboard td:lt(9)').children('img'); // The first 8 image elements.
      for (i=0; i<squares.length; i++)
         if ($(squares[i]).attr("src") == blank_img)
            return false;
      return true;
   }
}

// Reset the game board images to all be blank.
function reset() {
   match_complete = 0;
   update_info(match_id, new_match_msg);
   var rows = 3;
   var cols = 3;
   var cell_id = "";
   for (i=1; i<=rows; i++) {
      for (j=1; j<=cols; j++) {
         cell_id = "#"+i+"_"+j;
         $(cell_id).attr("src",blank_img);
      }
   }
}

/* Given any 'id', update the html to display the message 'msg' */
function update_info (id, msg) {
   document.getElementById(id).innerHTML = msg;
}
