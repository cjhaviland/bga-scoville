<?php
/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * ScovilleCjh implementation : © <Your name here> <Your email address here>
 * 
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * material.inc.php
 *
 * ScovilleCjh game material description
 *
 * Here, you can describe the material of your game with PHP variables.
 *   
 * This file is loaded in your game logic class constructor, ie these variables
 * are available everywhere in your game logic code.
 *
 */


/*

Example:

$this->card_types = array(
    1 => array( "card_name" => ...,
                ...
              )
);

*/
$this->playerNumOptions = array(
  2 => array(
    'marketCards' => 7,
    'recipeCards' => 8,
    'auctionCards' => 2,
    'lessRewardPlaques' => true
  ),
  3 => array(
    'marketCards' => 9,
    'recipeCards' => 12,
    'auctionCards' => 3,
    'lessRewardPlaques' => true
  ),
  4 => array(
    'marketCards' => 11,
    'recipeCards' => 16,
    'auctionCards' => 4,
    'lessRewardPlaques' => false
  ),
  5 => array(
    'marketCards' => 13,
    'recipeCards' => 20,
    'auctionCards' => 5,
    'lessRewardPlaques' => false
  ),
  6 => array(
    'marketCards' => 15,
    'recipeCards' => 24,
    'auctionCards' => 6,
    'lessRewardPlaques' => false
  )
);

if (!defined('PLAYER_RED')) {
  define('PLAYER_BLUE', '0093D0');
  define('PLAYER_GREEN', '00A94D');
  define('PLAYER_ORANGE', 'F68E1E');
  define('PLAYER_PURPLE', 'A54499');
  define('PLAYER_RED', 'EE3F34');
  define('PLAYER_YELLOW', 'FFEE01');
}

$this->player_colors = array(
  PLAYER_BLUE => array("sprite_pos" => 0, "color_name" => "blue"),
  PLAYER_GREEN => array("sprite_pos" => 1, "color_name" => "green"),
  PLAYER_ORANGE => array("sprite_pos" => 2, "color_name" => "orange"),
  PLAYER_PURPLE => array("sprite_pos" => 3, "color_name" => "purple"),
  PLAYER_RED => array("sprite_pos" => 4, "color_name" => "red"),
  PLAYER_YELLOW => array("sprite_pos" => 5, "color_name" => "yellow")
);

if (!defined('PEPPER_RED')) { // ensure this block is only invoked once, since it is included multiple times
  define('PEPPER_RED', 1);
  define('PEPPER_YELLOW', 2);
  define('PEPPER_BLUE', 3);
  define('PEPPER_GREEN', 4);
  define('PEPPER_ORANGE', 5);
  define('PEPPER_PURPLE', 6);
  define('PEPPER_BROWN', 7);
  define('PEPPER_WHITE', 8);
  define('PEPPER_BLACK', 9);
  define('PEPPER_PHANTOM', 10);
}

$this->pepper_tokens = array(
  PEPPER_RED => array( 'name' => 'Red Pepper', 'color' => 'red', 'color_code' => '#C13112' ),
  PEPPER_YELLOW => array( 'name' => 'Yellow Pepper', 'color' => 'yellow', 'color_code' => '#FEE004' ),
  PEPPER_BLUE => array( 'name' => 'Blue Pepper', 'color' => 'blue', 'color_code' => '#009BCD' ),
  PEPPER_GREEN => array( 'name' => 'Green Pepper', 'color' => 'green', 'color_code' => '#8FC73F' ),
  PEPPER_ORANGE => array( 'name' => 'Orange Pepper', 'color' => 'orange', 'color_code' => '#F98526' ),
  PEPPER_PURPLE => array( 'name' => 'Purple Pepper', 'color' => 'purple', 'color_code' => '#720D6F' ),
  PEPPER_BROWN => array( 'name' => 'Brown Pepper', 'color' => 'brown', 'color_code' => '#9E610D' ),
  PEPPER_WHITE => array( 'name' => 'White Pepper', 'color' => 'white', 'color_code' => '#FFFFFF' ),
  PEPPER_BLACK => array( 'name' => 'Black Pepper', 'color' => 'black', 'color_code' => '#393534' ),
  PEPPER_PHANTOM => array( 'name' => 'Phantom Pepper', 'color' => 'phantom', 'color_code' => '#9AC1D0' )
);

$this->startingPeppers = array(PEPPER_RED, PEPPER_YELLOW, PEPPER_BLUE);

$MORNING = "morning";
$AFTERNOON = "afternoon";

$this->morningMarketCards = array (
  1 => array(
    'nameId' => 1,
    'wanted' => array(PEPPER_BLUE, PEPPER_PURPLE),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 1,
    'spriteColumn' => 1
  ),
  2 => array(
    'nameId' => 2,
    'wanted' => array(PEPPER_BLUE),
    'pepperRewards' => array(),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 1,
    'spriteColumn' => 2
  ),
  3 => array(
    'nameId' => 3,
    'wanted' => array(PEPPER_RED, PEPPER_PURPLE),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 1,
    'spriteColumn' => 3
  ),
  4 => array(
    'nameId' => 4,
    'wanted' => array(PEPPER_RED, PEPPER_YELLOW),
    'pepperRewards' => array(PEPPER_ORANGE),
    'coinRewards' => 0,
    'vpRewards' => 1,
    'spriteRow' => 1,
    'spriteColumn' => 4
  ),
  5 => array(
    'nameId' => 5,
    'wanted' => array(PEPPER_RED, PEPPER_RED),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 2,
    'vpRewards' => 0,
    'spriteRow' => 1,
    'spriteColumn' => 5
  ),
  6 => array(
    'nameId' => 6,
    'wanted' => array(PEPPER_YELLOW),
    'pepperRewards' => array(),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 2,
    'spriteColumn' => 1
  ),
  7 => array(
    'nameId' => 7,
    'wanted' => array(PEPPER_RED),
    'pepperRewards' => array(),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 2,
    'spriteColumn' => 2
  ),
  8 => array(
    'nameId' => 8,
    'wanted' => array(PEPPER_RED, PEPPER_ORANGE),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 2,
    'spriteColumn' => 3
  ),
  9 => array(
    'nameId' => 9,
    'wanted' => array(PEPPER_BLUE, PEPPER_BLUE, PEPPER_BLUE),
    'pepperRewards' => array(PEPPER_PURPLE, PEPPER_PURPLE),
    'coinRewards' => 2,
    'vpRewards' => 1,
    'spriteRow' => 2,
    'spriteColumn' => 4
  ),
  10 => array(
    'nameId' => 10,
    'wanted' => array(PEPPER_BLUE, PEPPER_GREEN),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 2,
    'spriteColumn' => 5
  ),
  11 => array(
    'nameId' => 11,
    'wanted' => array(PEPPER_RED, PEPPER_GREEN),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 3,
    'spriteColumn' => 1
  ),
  12 => array(
    'nameId' => 12,
    'wanted' => array(PEPPER_YELLOW, PEPPER_BLUE),
    'pepperRewards' => array(PEPPER_GREEN),
    'coinRewards' => 0,
    'vpRewards' => 1,
    'spriteRow' => 3,
    'spriteColumn' => 2
  ),
  13 => array(
    'nameId' => 13,
    'wanted' => array(PEPPER_RED, PEPPER_BLUE),
    'pepperRewards' => array(PEPPER_PURPLE),
    'coinRewards' => 0,
    'vpRewards' => 1,
    'spriteRow' => 3,
    'spriteColumn' => 3
  ),
  14 => array(
    'nameId' => 14,
    'wanted' => array(PEPPER_BLUE, PEPPER_ORANGE),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 3,
    'spriteColumn' => 4
  ),
  15 => array(
    'nameId' => 15,
    'wanted' => array(PEPPER_PURPLE),
    'pepperRewards' => array(),
    'coinRewards' => 5,
    'vpRewards' => 0,
    'spriteRow' => 3,
    'spriteColumn' => 5
  ),
  16 => array(
    'nameId' => 16,
    'wanted' => array(PEPPER_YELLOW, PEPPER_YELLOW, PEPPER_YELLOW),
    'pepperRewards' => array(PEPPER_GREEN, PEPPER_GREEN),
    'coinRewards' => 2,
    'vpRewards' => 1,
    'spriteRow' => 4,
    'spriteColumn' => 1
  ),
  17 => array(
    'nameId' => 17,
    'wanted' => array(PEPPER_RED, PEPPER_RED, PEPPER_RED),
    'pepperRewards' => array(PEPPER_ORANGE, PEPPER_ORANGE),
    'coinRewards' => 2,
    'vpRewards' => 1,
    'spriteRow' => 4,
    'spriteColumn' => 2
  ),
  18 => array(
    'nameId' => 18,
    'wanted' => array(PEPPER_BLUE, PEPPER_BLUE),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 2,
    'vpRewards' => 0,
    'spriteRow' => 4,
    'spriteColumn' => 3
  ),
  19 => array(
    'nameId' => 19,
    'wanted' => array(PEPPER_YELLOW, PEPPER_YELLOW),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 2,
    'vpRewards' => 0,
    'spriteRow' => 4,
    'spriteColumn' => 4
  ),
  20 => array(
    'nameId' => 20,
    'wanted' => array(PEPPER_ORANGE),
    'pepperRewards' => array(),
    'coinRewards' => 5,
    'vpRewards' => 0,
    'spriteRow' => 4,
    'spriteColumn' => 5
  ),
  21 => array(
    'nameId' => 21,
    'wanted' => array(PEPPER_GREEN),
    'pepperRewards' => array(),
    'coinRewards' => 5,
    'vpRewards' => 0,
    'spriteRow' => 5,
    'spriteColumn' => 1
  ),
  22 => array(
    'nameId' => 22,
    'wanted' => array(PEPPER_YELLOW, PEPPER_PURPLE),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 5,
    'spriteColumn' => 2
  ),
  23 => array(
    'nameId' => 23,
    'wanted' => array(PEPPER_YELLOW, PEPPER_ORANGE),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 5,
    'spriteColumn' => 3
  ),
  24 => array(
    'nameId' => 24,
    'wanted' => array(PEPPER_YELLOW, PEPPER_GREEN),
    'pepperRewards' => array(PEPPER_BROWN),
    'coinRewards' => 3,
    'vpRewards' => 1,
    'spriteRow' => 5,
    'spriteColumn' => 4
  )
);