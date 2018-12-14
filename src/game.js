/**
* game.js - Spencer Frisby
*
* This script contains game logic for tic-tac-toe.
*
**/

var switcher = 1;

var debug_lvl = 0;
var circle_wins = 0;
var cross_wins = 0;

var blank_img = "../img/empty.png";
var circle_img = "../img/circle.png";
var cross_img = "../img/cross.png";

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

// This function changes the images for tic-tac-toe
function change_img (ele_id) {
   // stores image src that was clicked on
   var current_img = $(ele_id).attr("src");
   
   if (debug_lvl > 0)
      document.getElementById("msg").innerHTML = "Element " + ele_id + " clicked. ~ " + current_img;
   
   // Alternating between cross or circle depending on switcher.
   if (current_img == blank_img) {
      if (switcher % 2 == 0)
	 $(ele_id).attr("src",circle_img);
      else
	 $(ele_id).attr("src",cross_img);
      switcher++;
   }
   $(document).ready(function(){check_winner();});
}

function update_th (msg)
{
   document.getElementById("msg").innerHTML = msg;
}

function check_td (player, first, second, third) {
   if (player == "circle") {
      if ($(first).attr("src") == circle_img &&
          $(second).attr("src") == circle_img &&
          $(third).attr("src") == circle_img)
         return true
      else
         return false
   }
   else
   {
      if ($(first).attr("src") == cross_img &&
          $(second).attr("src") == cross_img &&
          $(third).attr("src") == cross_img)
         return true
      else
         return false
   }
}

function check_draw ()
{
   var blank_found = false;
   for (i=0; i<combos.length; i++)
   {
      for (j=0; j<combos[i].length; j++)
      {
         if ($(combos[i][j]).attr("src") == cross_img ||
             ($(combos[i][j]).attr("src") == circle_img))
            continue;
         else {
            blank_found = true;
            return blank_found;
         }
      }
   }
   return blank_found;
}

// This function checks to see if anyone has won
function check_winner () {
   for (i=0; i<combos.length; i++) {
      // Checking if circle is the winner
      if (check_td("circle", combos[i][0], combos[i][1], combos[i][2])) {
         circle_wins++;
         update_th("Circle has won " + circle_wins + " and Cross has won " + cross_wins + " games.");
         alert("Circle is the Winner!");
         reset();
         return;
      }
      // Checking if cross is the winner.
      if (check_td("cross", combos[i][0], combos[i][1], combos[i][2])) {
         cross_wins++;
         update_th("Circle has won " + circle_wins + " and Cross has won " + cross_wins + " games.");
         alert("Cross is the Winner!");
         reset();
         return;
      }
   }
   // Checking if the match was a draw.
   if (!check_draw()) {
      alert("The game ended in a draw.");
      reset();
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
