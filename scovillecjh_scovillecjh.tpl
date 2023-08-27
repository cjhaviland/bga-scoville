{OVERALL_GAME_HEADER}

<!-- 
--------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- ScovilleCjh implementation : © <Your name here> <Your email address here>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-------

    scovillecjh_scovillecjh.tpl
    
    This is the HTML template of your game.
    
    Everything you are writing in this file will be displayed in the HTML page of your game user interface,
    in the "main game zone" of the screen.
    
    You can use in this template:
    _ variables, with the format {MY_VARIABLE_ELEMENT}.
    _ HTML block, with the BEGIN/END format
    
    See your "view" PHP file to check how to set variables and control blocks
    
    Please REMOVE this comment before publishing your game on BGA
-->

<div class="table-container">
  <div class="market-cards-container whiteblock">
    <h3>Market</h3>
  </div>
  <div class="board-container">
    <div class="board">
      <div id="board-top"></div>
      <div id="board-middle">
        <!-- BEGIN pepperplot -->
        <div class="pepper-plot" id="pepper_plot_{X}_{Y}" style="left: {LEFT}%; top: {TOP}%;"></div>
        <!-- END pepperplot -->
      </div>
      <div id="board-bottom"></div>
    </div>
  </div>
  <div class="auction-cards-container whitespace"></div>
</div>

<div class="player-container">
  <div id="player-card"></div>
</div>

<script type="text/javascript">

// Javascript HTML templates

/*
// Example:
var jstpl_some_game_item='<div class="my_game_item" id="my_game_item_${MY_ITEM_ID}"></div>';

*/

let jstpl_player_board = '<div class="scoville_deck_board">\
  <div class="scoville_label_line">\
    <div class="label scoville_label" id="label_coins_${id}">\
      <i class="fa6 fa6-solid fa6-coins"></i>\
    </div>\
    <div id="coins_${id}">0</div></div>\
  </div>';

</script>  

{OVERALL_GAME_FOOTER}
