/** 
* logic.js
*
* Spencer Frisby
*
* This script contains logic for the computer 'player'.
**/

/* Check all series a player may be close to winning, return the empty square. */
function get_player_win_serie() {
   // look at all series for one a player may be close to winning
   // return empty square not occupied by player.
   // if (2/3 squares occupied by player) return the empty square.
   var count = 0;
   var empty_square = null;
   for (i=0; i<series.length; i++) {
      if (!all_squares_used_in_series(series[i])) {
         for (j=0; j<series[i].length; j++) {
            if ($(series[i][j]).attr("src") == crs_img) // TODO: crs_img is taken as 'player' piece, need variable.
               count++;
            if ($(series[i][j]).attr("src") == blank_img)
               empty_square = series[i][j];
         }
         if (count == 2)
            return empty_square;
         else {
            count = 0;
            empty_sqaure = null;
         }
      }
   }
   return empty_sqaure;
}

function get_computer_win_serie() {
   var count = 0;
   var empty_square = null;
   for (var i=0; i<series.length; i++) {
      if (!all_squares_used_in_series(series[i])) {
         for (var j=0; j<series[i].length; j++) {
            if ($(series[i][j]).attr("src") == cir_img) // TODO: more relatabel variable for computer piece.
               count++;
            if ($(series[i][j]).attr("src") == blank_img)
               empty_square = series[i][j];
         }
         if (count == 2)
            return empty_square;
         else {
            count = 0;
            empty_sqaure = null;
         }
      }
   }
   return empty_sqaure;
}

/* Given 3 square IDs, provide a blank square ID if found.  */
function get_empty_square(series) {
   var img_src = "";
   var used_square = 0;
   var square = null;
   for (var i=0; i<series.length; i++) {
      img_src = $(series).attr("src");
      if (img_src == blank_img)
         return square = series[i];
   }
   return square; /* null if none found. */
}

/* Return true if there are no empty squares in the provided series. */
function all_squares_used_in_series(series) {
   var img_src = "";
    for (var i=0; i<series.length; i++) {
      img_src = $(series[i]).attr("src");
      if (img_src == blank_img)
         return false;
   }
   return true;
}

/* Serially looking for empty square. */
function get_empty_square() {
   for (var i=0; i<series.length; i++) {
      for (var j=0; j<series[i].length; j++) {
         if ($(series[i][j]).attr("src") == blank_img)
            return series[i][j];
      }
   }
}

/* Choose what empty square to take. */
function computer_choice()
{
   var check = get_computer_win_serie();
   if (check != null) {
      return check;
   }

   check = get_player_win_serie(); 
   if (check != null) {
      return check;
   }

   return get_empty_square();
}
