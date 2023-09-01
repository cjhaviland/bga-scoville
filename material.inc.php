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

$MORNING = "morning";
$AFTERNOON = "afternoon";

$this->player_num_options = array(
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

$this->starting_peppers = array(PEPPER_RED, PEPPER_YELLOW, PEPPER_BLUE);

$this->morning_market_cards = array (
  1 => array(
    'nameId' => 1,
    'wanted' => array(PEPPER_BLUE, PEPPER_PURPLE),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 3,
      'vp' => 1
    )
  ),
  2 => array(
    'nameId' => 2,
    'wanted' => array(PEPPER_BLUE),
    'rewards' => array(
      'pepper' => array(),
      'coin' => 3,
      'vp' => 1
    )
  ),
  3 => array(
    'nameId' => 3,
    'wanted' => array(PEPPER_RED, PEPPER_PURPLE),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 3,
      'vp' => 1
    )
  ),
  4 => array(
    'nameId' => 4,
    'wanted' => array(PEPPER_RED, PEPPER_YELLOW),
    'rewards' => array(
      'pepper' => array(PEPPER_ORANGE),
      'coin' => 0,
      'vp' => 1
    )
  ),
  5 => array(
    'nameId' => 5,
    'wanted' => array(PEPPER_RED, PEPPER_RED),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 2,
      'vp' => 0
    )
  ),
  6 => array(
    'nameId' => 6,
    'wanted' => array(PEPPER_YELLOW),
    'rewards' => array(
      'pepper' => array(),
      'coin' => 3,
      'vp' => 1
    )
  ),
  7 => array(
    'nameId' => 7,
    'wanted' => array(PEPPER_RED),
    'rewards' => array(
      'pepper' => array(),
      'coin' => 3,
      'vp' => 1
    )
  ),
  8 => array(
    'nameId' => 8,
    'wanted' => array(PEPPER_RED, PEPPER_ORANGE),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 3,
      'vp' => 1
    )
  ),
  9 => array(
    'nameId' => 9,
    'wanted' => array(PEPPER_BLUE, PEPPER_BLUE, PEPPER_BLUE),
    'rewards' => array(
      'pepper' => array(PEPPER_PURPLE, PEPPER_PURPLE),
      'coin' => 2,
      'vp' => 1
    )
  ),
  10 => array(
    'nameId' => 10,
    'wanted' => array(PEPPER_BLUE, PEPPER_GREEN),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 3,
      'vp' => 1
    )
  ),
  11 => array(
    'nameId' => 11,
    'wanted' => array(PEPPER_RED, PEPPER_GREEN),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 3,
      'vp' => 1
    )
  ),
  12 => array(
    'nameId' => 12,
    'wanted' => array(PEPPER_YELLOW, PEPPER_BLUE),
    'rewards' => array(
      'pepper' => array(PEPPER_GREEN),
      'coin' => 0,
      'vp' => 1
    )
  ),
  13 => array(
    'nameId' => 13,
    'wanted' => array(PEPPER_RED, PEPPER_BLUE),
    'rewards' => array(
      'pepper' => array(PEPPER_PURPLE),
      'coin' => 0,
      'vp' => 1
    )
  ),
  14 => array(
    'nameId' => 14,
    'wanted' => array(PEPPER_BLUE, PEPPER_ORANGE),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 3,
      'vp' => 1
    )
  ),
  15 => array(
    'nameId' => 15,
    'wanted' => array(PEPPER_PURPLE),
    'rewards' => array(
      'pepper' => array(),
      'coin' => 5,
      'vp' => 0
    )
  ),
  16 => array(
    'nameId' => 16,
    'wanted' => array(PEPPER_YELLOW, PEPPER_YELLOW, PEPPER_YELLOW),
    'rewards' => array(
      'pepper' => array(PEPPER_GREEN, PEPPER_GREEN),
      'coin' => 2,
      'vp' => 1
    )
  ),
  17 => array(
    'nameId' => 17,
    'wanted' => array(PEPPER_RED, PEPPER_RED, PEPPER_RED),
    'rewards' => array(
      'pepper' => array(PEPPER_ORANGE, PEPPER_ORANGE),
      'coin' => 2,
      'vp' => 1
    )
  ),
  18 => array(
    'nameId' => 18,
    'wanted' => array(PEPPER_BLUE, PEPPER_BLUE),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 2,
      'vp' => 0
    )
  ),
  19 => array(
    'nameId' => 19,
    'wanted' => array(PEPPER_YELLOW, PEPPER_YELLOW),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 2,
      'vp' => 0
    )
  ),
  20 => array(
    'nameId' => 20,
    'wanted' => array(PEPPER_ORANGE),
    'rewards' => array(
      'pepper' => array(),
      'coin' => 5,
      'vp' => 0
    )
  ),
  21 => array(
    'nameId' => 21,
    'wanted' => array(PEPPER_GREEN),
    'rewards' => array(
      'pepper' => array(),
      'coin' => 5,
      'vp' => 0
    )
  ),
  22 => array(
    'nameId' => 22,
    'wanted' => array(PEPPER_YELLOW, PEPPER_PURPLE),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 3,
      'vp' => 1
    )
  ),
  23 => array(
    'nameId' => 23,
    'wanted' => array(PEPPER_YELLOW, PEPPER_ORANGE),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 3,
      'vp' => 1
    )
  ),
  24 => array(
    'nameId' => 24,
    'wanted' => array(PEPPER_YELLOW, PEPPER_GREEN),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN),
      'coin' => 3,
      'vp' => 1
    )
  )
);

$this->recipe_cards = array(
  1 => array(
    'nameId' => 'WILBURS_LAST_STAND',
    'name' => "Wilbur's Last Stand",
    'nametr' => self::_("Wilbur's Last Stand"),
    'rewards' => array(
      'pepper' => array(PEPPER_PHANTOM, PEPPER_PHANTOM, PEPPER_PHANTOM, PEPPER_PHANTOM),
      'vp' => 24
    )
  ),
  2 => array(
    'nameId' => 'PHANT_OM_NOM_NOM',
    'name' => "Phant-om-nom-nom",
    'nametr' => self::_("Phant-om-nom-nom"),
    'rewards' => array(
      'pepper' => array(PEPPER_PHANTOM, PEPPER_PHANTOM, PEPPER_PHANTOM, PEPPER_BROWN, PEPPER_BROWN),
      'vp' => 24
    )
  ),
  3 => array(
    'nameId' => 'THE_80K_BURNER',
    'name' => "The 80k Burner",
    'nametr' => self::_("The 80k Burner"),
    'rewards' => array(
      'pepper' => array(PEPPER_BLACK, PEPPER_BLACK, PEPPER_WHITE, PEPPER_WHITE, PEPPER_GREEN, PEPPER_ORANGE, PEPPER_PURPLE),
      'vp' => 22
    )
  ),
  4 => array(
    'nameId' => 'FOUR_SORE_AND_SEVEN_TEARS_AGO',
    'name' => "Four Sore and Seven Tears Ago",
    'nametr' => self::_("Four Sore and Seven Tears Ago"),
    'rewards' => array(
      'pepper' => array(PEPPER_BLACK, PEPPER_WHITE, PEPPER_BROWN, PEPPER_ORANGE),
      'vp' => 13
    )
  ),
  5 => array(
    'nameId' => 'BABY_STEPS',
    'name' => "Baby Steps",
    'nametr' => self::_("Baby Steps"),
    'rewards' => array(
      'pepper' => array(PEPPER_BLACK, PEPPER_BROWN, PEPPER_YELLOW),
      'vp' => 8
    )
  ),
  6 => array(
    'nameId' => 'THE_FLUX_CAPSAICINATOR',
    'name' => "The Flux Capsaicinator",
    'nametr' => self::_("The Flux Capsaicinator"),
    'rewards' => array(
      'pepper' => array(PEPPER_PHANTOM, PEPPER_PHANTOM, PEPPER_BLACK, PEPPER_WHITE, PEPPER_RED, PEPPER_YELLOW, PEPPER_BLUE),
      'vp' => 23
    )
  ),
  7 => array(
    'nameId' => 'BUMP_IN_THE_NIGHT',
    'name' => "Bump in the Night",
    'nametr' => self::_("Bump in the Night"),
    'rewards' => array(
      'pepper' => array(PEPPER_PHANTOM, PEPPER_PHANTOM, PEPPER_BROWN, PEPPER_BROWN, PEPPER_GREEN, PEPPER_GREEN),
      'vp' => 22
    )
  ),
  8 => array(
    'nameId' => 'C18_H27_N_O3',
    'name' => "C18H27NO3",
    'nametr' => self::_("C18H27NO3"),
    'rewards' => array(
      'pepper' => array(PEPPER_PHANTOM, PEPPER_PHANTOM, PEPPER_BLACK, PEPPER_WHITE),
      'vp' => 20
    )
  ),
  9 => array(
    'nameId' => 'DUDE_WHERES_MY_TONGUE',
    'name' => '"Dude Where\'s My Tongue?"',
    'nametr' => self::_('"Dude Where\'s My Tongue?"'),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN, PEPPER_GREEN, PEPPER_ORANGE, PEPPER_PURPLE, PEPPER_RED, PEPPER_YELLOW, PEPPER_BLUE),
      'vp' => 12
    )
  ),
  10 => array(
    'nameId' => 'JAL_AP_ENO_BUSINESS',
    'name' => "Jal Ap Eño Business",
    'nametr' => self::_("Jal Ap Eño Business"),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN, PEPPER_ORANGE, PEPPER_YELLOW, PEPPER_BLUE),
      'vp' => 7
    )
  ),
  11 => array(
    'nameId' => 'VOLCAN_OW',
    'name' => "Volcan-ow!",
    'nametr' => self::_("Volcan-ow!"),
    'rewards' => array(
      'pepper' => array(PEPPER_PHANTOM, PEPPER_BLACK, PEPPER_BLACK, PEPPER_BLACK),
      'vp' => 18
    )
  ),
  12 => array(
    'nameId' => 'THE_SPIRIT_OF_SCOVILLE',
    'name' => "The Spirit of Scoville",
    'nametr' => self::_("The Spirit of Scoville"),
    'rewards' => array(
      'pepper' => array(PEPPER_PHANTOM, PEPPER_WHITE, PEPPER_WHITE, PEPPER_WHITE),
      'vp' => 18
    )
  ),
  13 => array(
    'nameId' => 'THIS_ONE_GOES_TO_ELEVENT',
    'name' => "This One Goes to Eleven",
    'nametr' => self::_("This One Goes to Eleven"),
    'rewards' => array(
      'pepper' => array(PEPPER_PHANTOM, PEPPER_BLACK, PEPPER_WHITE, PEPPER_BROWN),
      'vp' => 17
    )
  ),
  14 => array(
    'nameId' => 'THE_SPICE_MUST_FLOW',
    'name' => "The Spice Must Flow",
    'nametr' => self::_("The Spice Must Flow"),
    'rewards' => array(
      'pepper' => array(PEPPER_BLACK, PEPPER_WHITE, PEPPER_PURPLE, PEPPER_RED, PEPPER_BLUE),
      'vp' => 12
    )
  ),
  15 => array(
    'nameId' => 'CHUCKS_BREAKFAST',
    'name' => "Chuck's Breakfast",
    'nametr' => self::_("Chuck's Breakfast"),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN, PEPPER_ORANGE, PEPPER_YELLOW),
      'vp' => 6
    )
  ),
  16 => array(
    'nameId' => 'FIRE_IN_THE_BOWL',
    'name' => "Fire in the Bowl",
    'nametr' => self::_("Fire in the Bowl"),
    'rewards' => array(
      'pepper' => array(PEPPER_BLACK, PEPPER_BLACK, PEPPER_BROWN, PEPPER_BROWN, PEPPER_RED, PEPPER_RED),
      'vp' => 16
    )
  ),
  17 => array(
    'nameId' => 'THE_BELFORT_BLAST_FURNACE',
    'name' => "The Belfort Blast Furnace",
    'nametr' => self::_("The Belfort Blast Furnace"),
    'rewards' => array(
      'pepper' => array(PEPPER_WHITE, PEPPER_WHITE, PEPPER_BROWN, PEPPER_BROWN, PEPPER_RED, PEPPER_RED),
      'vp' => 16
    )
  ),
  18 => array(
    'nameId' => 'APPALACHIAN_JEBS_RUSTIC_HEAT',
    'name' => "Appalachian Jeb's Rustic Heat",
    'nametr' => self::_("Appalachian Jeb's Rustic Heat"),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN, PEPPER_BROWN, PEPPER_BROWN, PEPPER_BROWN, PEPPER_BROWN),
      'vp' => 15
    )
  ),
  19 => array(
    'nameId' => 'BOSUN_KNOWS_BEST',
    'name' => "Bosun Knows Best",
    'nametr' => self::_("Bosun Knows Best"),
    'rewards' => array(
      'pepper' => array(PEPPER_BLACK, PEPPER_GREEN, PEPPER_ORANGE, PEPPER_PURPLE),
      'vp' => 10
    )
  ),
  20 => array(
    'nameId' => 'CHILI_CHILI_BANG_BANG',
    'name' => "Chili Chili Bang Bang",
    'nametr' => self::_("Chili Chili Bang Bang"),
    'rewards' => array(
      'pepper' => array(PEPPER_BROWN, PEPPER_RED, PEPPER_YELLOW, PEPPER_BLUE),
      'vp' => 6
    )
  ),
  21 => array(
    'nameId' => 'THE_BUCK_STOPS_HERE',
    'name' => "The Buck Stops Here",
    'nametr' => self::_("The Buck Stops Here"),
    'rewards' => array(
      'pepper' => array(PEPPER_WHITE, PEPPER_GREEN, PEPPER_ORANGE, PEPPER_PURPLE),
      'vp' => 10
    )
  ),
  22 => array(
    'nameId' => 'JS_JUICY_MORSEL_CHILI',
    'name' => "J's Juicy Morsel Chili",
    'nametr' => self::_("J's Juicy Morsel Chili"),
    'rewards' => array(
      'pepper' => array(PEPPER_WHITE, PEPPER_GREEN, PEPPER_GREEN, PEPPER_BLUE, PEPPER_BLUE),
      'vp' => 10
    )
  ),
  23 => array(
    'nameId' => 'UNCLE_ZEKES_5_ALARM_BELLYWARMER',
    'name' => "Uncle Zeke's 5 Alarm Bellywarmer",
    'nametr' => self::_("Uncle Zeke's 5 Alarm Bellywarmer"),
    'rewards' => array(
      'pepper' => array(PEPPER_WHITE, PEPPER_BROWN, PEPPER_PURPLE, PEPPER_BLUE),
      'vp' => 10
    )
  ),
  24 => array(
    'nameId' => '106_DIASTOLIC',
    'name' => "106 Diastolic",
    'nametr' => self::_("106 Diastolic"),
    'rewards' => array(
      'pepper' => array(PEPPER_BLACK, PEPPER_PURPLE, PEPPER_PURPLE, PEPPER_YELLOW),
      'vp' => 9
    )
  ),
  25 => array(
    'nameId' => 'MINSTREL_MOLTEN_MOUTH',
    'name' => "Minstrel Molten Mouth",
    'nametr' => self::_("Minstrel Molten Mouth"),
    'rewards' => array(
      'pepper' => array(PEPPER_GREEN, PEPPER_ORANGE, PEPPER_YELLOW),
      'vp' => 5
    )
  ),
  26 => array(
    'nameId' => 'TWO_ALARM_TOPS',
    'name' => "Two Alarm, Tops",
    'nametr' => self::_("Two Alarm, Tops"),
    'rewards' => array(
      'pepper' => array(PEPPER_GREEN, PEPPER_PURPLE, PEPPER_RED),
      'vp' => 5
    )
  ),
  27 => array(
    'nameId' => 'FAIR_TO_MIDDLIN',
    'name' => "Fair to Middlin'",
    'nametr' => self::_("Fair to Middlin'"),
    'rewards' => array(
      'pepper' => array(PEPPER_PURPLE, PEPPER_ORANGE, PEPPER_BLUE),
      'vp' => 5
    )
  ),
  28 => array(
    'nameId' => 'BELL_WETHER_PEPPER',
    'name' => "Bell Wether Pepper",
    'nametr' => self::_("Bell Wether Pepper"),
    'rewards' => array(
      'pepper' => array(PEPPER_GREEN, PEPPER_RED, PEPPER_YELLOW),
      'vp' => 4
    )
  ),
  29 => array(
    'nameId' => 'NO_MILD_LEFT_BEHIND',
    'name' => "No Mild Left Behind",
    'nametr' => self::_("No Mild Left Behind"),
    'rewards' => array(
      'pepper' => array(PEPPER_ORANGE, PEPPER_BLUE),
      'vp' => 3
    )
  ),
  30 => array(
    'nameId' => 'BORN_TO_BE_MILD',
    'name' => "Born to be Mild",
    'nametr' => self::_("Born to be Mild"),
    'rewards' => array(
      'pepper' => array(PEPPER_PURPLE, PEPPER_YELLOW),
      'vp' => 3
    )
  ),
);