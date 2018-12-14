//$(document).ready(function(){

// globals
var debug_lvl = 0;
var switcher = 1;
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

// This function checks to see if anyone has won
function check_winner () {

   
   // checking if circle is the winner
   for (i=0; i<combos.length; i++) {
      // alert(combos[i]);
      if (check_td("circle", combos[i][0], combos[i][1], combos[i][2])) {
         circle_wins++;
         update_th("Circle has won " + circle_wins + " and Cross has won " + cross_wins + " games.");
         alert("Circle is the Winner!");
         reset();
      }
   }
   // checking if cross is the winner
   for (i=0; i<combos.length; i++) {
      // cross_wins++;
      // document.getElementById("msg").innerHTML = "Circle has won " + circle_wins + " and Cross has won " + cross_wins + " games.";
      // alert("Cross is the Winner!");
      // reset();
   }
   // checking if it was a tie
   if (($("#1_1").attr("src") == cross_img || ($("#1_1").attr("src") == circle_img)) &&
       ($("#1_2").attr("src") == cross_img || ($("#1_2").attr("src") == circle_img)) &&
       ($("#1_3").attr("src") == cross_img || ($("#1_3").attr("src") == circle_img)) &&
       ($("#2_1").attr("src") == cross_img || ($("#2_1").attr("src") == circle_img)) &&
       ($("#2_2").attr("src") == cross_img || ($("#2_2").attr("src") == circle_img)) &&
       ($("#2_3").attr("src") == cross_img || ($("#2_3").attr("src") == circle_img)) &&
       ($("#3_1").attr("src") == cross_img || ($("#3_1").attr("src") == circle_img)) &&
       ($("#3_2").attr("src") == cross_img || ($("#3_2").attr("src") == circle_img)) &&
       ($("#3_3").attr("src") == cross_img || ($("#3_3").attr("src") == circle_img))) 
   {
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

//});
