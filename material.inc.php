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
if (!defined('PLAYER_RED')) {
  define('PLAYER_RED', 'EE3F34');
  define('PLAYER_YELLOW', 'FFEE01');
  define('PLAYER_BLUE', '0093D0');
  define('PLAYER_GREEN', '00A94D');
  define('PLAYER_ORANGE', 'F68E1E');
  define('PLAYER_PURPLE', 'A54499');
}

$this->player_colors = array(
  PLAYER_RED => 1,
  PLAYER_YELLOW => 2,
  PLAYER_BLUE => 3,
  PLAYER_GREEN => 4,
  PLAYER_ORANGE => 5,
  PLAYER_PURPLE => 6
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
  PEPPER_RED => array( 'name' => 'Red Pepper', 'color' => '#C13112ff' ),
  PEPPER_YELLOW => array( 'name' => 'Yellow Pepper', 'color' => '#FEE004ff' ),
  PEPPER_BLUE => array( 'name' => 'Blue Pepper', 'color' => '#009BCDff' ),
  PEPPER_GREEN => array( 'name' => 'Green Pepper', 'color' => '#8FC73Fff' ),
  PEPPER_ORANGE => array( 'name' => 'Orange Pepper', 'color' => '#F98526ff' ),
  PEPPER_PURPLE => array( 'name' => 'Purple Pepper', 'color' => '#720D6Fff' ),
  PEPPER_BROWN => array( 'name' => 'Brown Pepper', 'color' => '#9E610Dff' ),
  PEPPER_WHITE => array( 'name' => 'White Pepper', 'color' => '#FFFFFFff' ),
  PEPPER_BLACK => array( 'name' => 'Black Pepper', 'color' => '#393534ff' ),
  PEPPER_PHANTOM => array( 'name' => 'Phantom Pepper', 'color' => '#9AC1D0ff' )
);

$this->startingPeppers = array(PEPPER_RED, PEPPER_YELLOW, PEPPER_BLUE);
