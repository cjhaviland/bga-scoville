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
  <div class="board-container whiteblock">
    <div class="board">
      <div id="board-top"></div>
      <div id="board-middle">
        <!-- BEGIN pepperplot -->
        <div class="pepper-plot" id="pepper_plot_{X}_{Y}" style="left: {LEFT}%; top: {TOP}%;"></div>
        <!-- END pepperplot -->
      </div>
      <div id="board-bottom">
        <div id="awards-container"></div>
        <div id="turn-track-container">
          <div id="turn-track-top">
            <div id="top-disc-1" class="player-disc-container player-disc-top"></div>
            <div id="top-disc-2" class="player-disc-container player-disc-top"></div>
            <div id="top-disc-3" class="player-disc-container player-disc-top"></div>
            <div id="top-disc-4" class="player-disc-container player-disc-top"></div>
            <div id="top-disc-5" class="player-disc-container player-disc-top"></div>
            <div id="top-disc-6" class="player-disc-container player-disc-top"></div>
          </div>
          <div id="turn-track-bottom">
            <div id="bottom-disc-1" class="player-disc-container player-disc-bottom"></div>
            <div id="bottom-disc-2" class="player-disc-container player-disc-bottom"></div>
            <div id="bottom-disc-3" class="player-disc-container player-disc-bottom"></div>
            <div id="bottom-disc-4" class="player-disc-container player-disc-bottom"></div>
            <div id="bottom-disc-5" class="player-disc-container player-disc-bottom"></div>
            <div id="bottom-disc-6" class="player-disc-container player-disc-bottom"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div id="market-cards-container" class="whiteblock">
    <h3 style="width: 100%">Market</h3>
  </div>
  <div id="recipe-cards-container" class="whiteblock">
    <h3 style="width: 100%">Chili Cookoff</h3>
  </div>
</div>

<div class="player-container">
  <div id="player-card"></div>
</div>

<script type="text/javascript">

// Javascript HTML templates

let jstpl_player_board = '<div class="scoville_deck_board">\
  <div class="scoville_label_line">\
    <div class="label scoville_label" id="label_coins_${id}">\
      <i class="fa6 fa6-solid fa6-coins"></i>\
    </div>\
    <div id="coins_${id}">0</div></div>\
  </div>';

let jstpl_pepper = '<div class="pepper pepper-${color}"></div>';

let jstpl_player_token = '<div class="player-token bg-${COLOR}" id="player-${PLAYER_ID}-token"></div>';

let jstpl_market_card = '<div id="market-card-${morningAfternoon}_${type}" class="market-card-box"><div class="market-card market-card-${morningAfternoon}" data-row="${row}" data-col="${col}"></div></div>';

let jstpl_recipe_card = '<div id="recipe-${type}" class="recipe-card-box"><div class="recipe-card" data-row="${row}" data-col="${col}"></div></div>';

</script>  

{OVERALL_GAME_FOOTER}
