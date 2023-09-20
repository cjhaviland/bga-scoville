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
        <div id="pepper-container"></div>
      </div>
      <div id="board-bottom">
        <div id="awards-container">
          <div id="award-1-box" class="award-box"></div>
          <div id="award-2-box" class="award-box"></div>
          <div id="award-3-box" class="award-box"></div>
          <div id="award-4-box" class="award-box"></div>
          <div id="award-5-box" class="award-box"></div>
        </div>
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
    <h3 class="container-label">Market</h3>
  </div>
  <div id="recipe-cards-container" class="whiteblock">
    <h3 class="container-label">Chili Cookoff</h3>
  </div>
  <div id="player_screen" class="whiteblock">
    <h3 id="player_screen_name" class="container-label"></h3>
    <div id="counter_container">
    </div>
  </div>
</div>


<script type="text/javascript">

// Javascript HTML templates

const jstpl_pepper = '<div class="pepper pepper-${color}"></div>';

const jstpl_pepper_plot = '<div class="pepper-plot" id="pepper_plot_${x}_${y}"></div>';

const jstpl_board_path = '<div class="board-path" id="board_path_${id}"></div>';

const jstpl_player_token = '<div id="player-${playerId}-token" class="player-token bg-${color}"></div>';

const jstpl_player_farmer = '<div id="farmer-${playerId}" class="farmer-container bg-${color}">\
          <div class="farmer"></div>\
          <div class="board-path board-path-12"></div>\
          <div class="board-path board-path-2"></div>\
          <div class="board-path board-path-4"></div>\
          <div class="board-path board-path-6"></div>\
          <div class="board-path board-path-8"></div>\
          <div class="board-path board-path-10"></div>\
        </div>';

const jstpl_market_card = '<div id="market-card-${morningAfternoon}_${type}" class="market-card-box"><div class="market-card market-card-${morningAfternoon}" data-row="${row}" data-col="${col}"></div></div>';

const jstpl_recipe_card = '<div id="recipe-${type}" class="recipe-card-box"><div class="recipe-card" data-row="${row}" data-col="${col}"></div></div>';

const jstpl_auction_card = '<div id="auction-card-${morningAfternoon}_${type}" class="auction-card-box" style="left: ${leftVal}%"><div class="auction-card" data-row="${row}" data-col="${col}"></div></div>';

const jstpl_award_plaque = '<div id="award_plaque_${type}_${vp}" class="award-plaque" style="z-index: ${vp};"><span>${vp}</span></div>';

const jstpl_screen_counter = '<div id="label_${name}_${id}"><i class="fa6 fa6-solid ${cssClasses}"></i><span id="counter_${name}_${id}">0</span></div>';
</script>  

{OVERALL_GAME_FOOTER}
