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
  * scovillecjh.game.php
  *
  * This is the main file for your game logic.
  *
  * In this PHP file, you are going to defines the rules of the game.
  *
  */


require_once( APP_GAMEMODULE_PATH.'module/table/table.game.php' );

if (!defined('DECK_LOC_DECK')) {
    // constants for deck locations
    define("DECK_LOC_DECK", "deck");
    define("DECK_LOC_BOX", "box");
    define("DECK_LOC_BOARD", "board");
    define("DECK_LOC_WON", "won");
}

class ScovilleCjh extends Table
{
	function __construct( )
	{
        // Your global variables labels:
        //  Here, you can assign labels to global variables you are using for this game.
        //  You can use any number of global variables with IDs between 10 and 99.
        //  If your game has options (variants), you also have to associate here a label to
        //  the corresponding ID in gameoptions.inc.php.
        // Note: afterwards, you can get/set the global variables with getGameStateValue/setGameStateInitialValue/setGameStateValue
        parent::__construct();
        
        self::initGameStateLabels( array( 
            //    "my_first_global_variable" => 10,
            //    "my_second_global_variable" => 11,
            //      ...
            //    "my_first_game_variant" => 100,
            //    "my_second_game_variant" => 101,
            //      ...
        ) );

        $this->morning_market_deck = self::getNew("module.common.deck");
        $this->morning_market_deck->init("morning_market_card");
        
        $this->recipe_deck = self::getNew("module.common.deck");
        $this->recipe_deck->init("recipe_card");
        
        $this->morning_auction_deck = self::getNew("module.common.deck");
        $this->morning_auction_deck->init("morning_auction_card");
        
        $this->award_plaque_deck = self::getNew("module.common.deck");
        $this->award_plaque_deck->init("award_plaque_card");
        
	}
	
    protected function getGameName( )
    {
		// Used for translations and stuff. Please do not modify.
        return "scovillecjh";
    }	

    /*
        setupNewGame:
        
        This method is called only once, when a new game is launched.
        In this method, you must setup the game according to the game rules, so that
        the game is ready to be played.
    */
    protected function setupNewGame( $players, $options = array() )
    {    
        // Set the colors of the players with HTML color code
        // The default below is red/green/blue/orange/brown
        // The number of colors defined here must correspond to the maximum number of players allowed for the gams
        $gameinfos = self::getGameinfos();
        
        $default_colors = $gameinfos['player_colors'];

        // Create players
        // Note: if you added some extra field on "player" table in the database (dbmodel.sql), you can initialize it there.
        $sql = "INSERT INTO player (player_id, player_color, player_canal, player_name, player_avatar) VALUES ";
        $values = array();
        foreach( $players as $player_id => $player )
        {
            $color = array_shift( $default_colors );
            $setupCoinAmount = 10;
            $values[]= "('".$player_id."','$color','".$player['player_canal']."','".addslashes( $player['player_name'] )."','".addslashes( $player['player_avatar'] )."')";
        }
        $sql .= implode( ',', $values );
        self::DbQuery( $sql );
        self::reattributeColorsBasedOnPreferences( $players, $gameinfos['player_colors'] );
        self::reloadPlayersBasicInfos();
        
        /************ Start the game initialization *****/

        // Init global values with their initial values
        //self::setGameStateInitialValue( 'my_first_global_variable', 0 );
        
        // Init game statistics
        // (note: statistics used in this file must be defined in your stats.inc.php file)
        //self::initStat( 'table', 'table_teststat1', 0 );    // Init a table statistics
        //self::initStat( 'player', 'player_teststat1', 0 );  // Init a player statistics (for all players)

        // TODO: setup the initial game situation here

        // Insert (empty) pepper plots into database
        $startingPepperIdxs = array_rand($this->starting_peppers, 2);

        $sql = "INSERT INTO pepper_plot (board_x, board_y, pepper) VALUES ";
        $xyValues = array();
        for ($x = 1; $x <= 10; $x++) {
            for ($y = 1; $y <= 7; $y++) {
                // Setup initial pepper plots 5_4 and 6_4 are the starting plots
                if ($x == 5 && $y == 4) {
                    // Take the first random starting pepper
                    $leftPepper = $this->starting_peppers[$startingPepperIdxs[0]];

                    $xyValues[] = "($x, $y, $leftPepper)";
                }
                else if ($x == 6 && $y == 4) {
                    // Take the second random starting pepper
                    $rightPepper = $this->starting_peppers[$startingPepperIdxs[1]];

                    $xyValues[] = "($x, $y, $rightPepper)"; 
                }
                else {
                    $xyValues[] = "($x, $y, null)"; 
                }
            }
        }
        $sql .= implode( ',', $xyValues );
        self::DbQuery( $sql );
       
        self::setupMorningMarketDeck($players);
        self::setupRecipeDeck($players);
        self::setupMorningAuctionDeck($players);
        self::setupAwardPlaqueDeck($players);

        // Activate first player (which is in general a good idea :) )
        $this->activeNextPlayer();

        /************ End of the game initialization *****/
    }

    /*
        getAllDatas: 
        
        Gather all informations about current game situation (visible by the current player).
        
        The method is called each time the game interface is displayed to a player, ie:
        _ when the game starts
        _ when a player refreshes the game page (F5)
    */
    protected function getAllDatas()
    {
        $result = array();
        
        // Constants
    
        $current_player_id = self::getCurrentPlayerId();    // !! We must only return informations visible by this player !!

        $gameinfos = self::getGameinfos();
        $result['allPlayerColors'] = $this->player_colors;
    
        // Get information about players
        // Note: you can retrieve some extra field you added for "player" table in "dbmodel.sql" if you need it.
        $sql = "SELECT player_id id, player_no turn_order, player_score score, player_coins coins FROM player ";
        $result['players'] = self::getCollectionFromDb( $sql );
  
        $players = self::loadPlayersBasicInfos();

        $result['counters'] = array();

        foreach ($players as $player) {
            $playerId = $player["player_id"];
            $result['counters'][$playerId] = $this->get_counters($result['players'][$playerId]);
            $result['won'][$playerId] = $this->morning_market_deck->getCardsInLocation(DECK_LOC_WON, $playerId);
        }

        // Pepper Plots
        $sql = "SELECT id, board_x, board_y, pepper FROM pepper_plot ";
        $result['pepperPlots'] = self::getCollectionFromDb( $sql );

        // TODO: Gather all information about current game situation (visible by player $current_player_id).
        $result['pepperTokens'] = $this->pepper_tokens;
        $result['cardsDescription'] = $this->getCardsDescription();
        $result['cardsOnBoard'] = $this->getCardsOnBoard();

        return $result;
    }

    /*
        getGameProgression:
        
        Compute and return the current game progression.
        The number returned must be an integer beween 0 (=the game just started) and
        100 (= the game is finished or almost finished).
    
        This method is called each time we are in a game state with the "updateGameProgression" property set to true 
        (see states.inc.php)
    */
    function getGameProgression()
    {
        // TODO: compute and return the game progression

        return 0;
    }


//////////////////////////////////////////////////////////////////////////////
//////////// Utility functions
////////////    

    /*
        In this space, you can put any utility methods useful for your game logic
    */
    function get_counters($player) {
        // $result = array(
        //     'deck' => $this->cards->countCardInLocation($this->player_deck($player_id)),
        //     'hand' => $this->cards->countCardInLocation(STOCK_HAND, $player_id) + $this->cards->countCardInLocation(STOCK_LIMBO, $player_id),
        //     'discard' => $this->cards->countCardInLocation($this->player_discard($player_id)),
        // );
        // if (self::getGameStateValue(GAME_STATE_ARTICHOKE_COUNTS) > 0) {
        //     $counts = $this->count_cards_and_artichokes($player_id);
        //     $result['artichokes'] = $counts['artichoke_count'];
        // }
        $result = array(
            'coins' => (int)$player['coins']
        );
        
        return $result;
    }

    function setupMorningMarketDeck($players)
    {
        $cards = array();

        foreach ($this->getCardsCount()["morning_market"] as $range) {
            for ($i = $range["from"]; $i <= $range["to"]; $i++) {
                $morningMarket = $this->morning_market_cards[$i];
                $cards[] = array('type' => $morningMarket["nameId"], 'type_arg' => $i, 'nbr' => 1);
            }
        }

        $this->morning_market_deck->createCards($cards, DECK_LOC_DECK);
        $this->morning_market_deck->shuffle(DECK_LOC_DECK);

        // Get the number of cards to draw
        $nbrPlayers = count($players);
        $nbrMarketCardsToDraw = $this->player_num_options[$nbrPlayers]["marketCards"];
        $this->morning_market_deck->pickCardsForLocation($nbrMarketCardsToDraw, DECK_LOC_DECK, DECK_LOC_BOARD);

        // Put all other cards "Back in the Box"
        $this->morning_market_deck->moveAllCardsInLocation(DECK_LOC_DECK, DECK_LOC_BOX);
    }
    
    function setupRecipeDeck($players)
    {
        $cards = array();

        /**
         * type: The nameId of the recipe card
         * type_arg: The VP value for "ranking" the card 
         */
        foreach ($this->getCardsCount()["recipe"] as $range) {
            for ($i = $range["from"]; $i <= $range["to"]; $i++) {
                $recipes = $this->recipe_cards[$i];
                $cards[] = array('type' => $i, 'type_arg' => $recipes["rewards"]["vp"], 'nbr' => 1);
            }
        }

        $this->recipe_deck->createCards($cards, DECK_LOC_DECK);
        $this->recipe_deck->shuffle(DECK_LOC_DECK);

        // Get the number of cards to draw
        $nbrPlayers = count($players);
        $nbrRecipeCardsToDraw = $this->player_num_options[$nbrPlayers]["recipeCards"];
        $this->recipe_deck->pickCardsForLocation($nbrRecipeCardsToDraw, DECK_LOC_DECK, DECK_LOC_BOARD);

        
        // Put all other cards "Back in the Box"
        $this->recipe_deck->moveAllCardsInLocation(DECK_LOC_DECK, DECK_LOC_BOX);
    }
    
    function setupMorningAuctionDeck($players)
    {
        $cards = array();

        foreach ($this->getCardsCount()["morning_auction"] as $range) {
            for ($i = $range["from"]; $i <= $range["to"]; $i++) {
                $morningMarket = $this->morning_auction_cards[$i];
                $cards[] = array('type' => $morningMarket["nameId"], 'type_arg' => $i, 'nbr' => $morningMarket["nbr"]);
            }
        }

        $this->morning_auction_deck->createCards($cards, DECK_LOC_DECK);
        $this->morning_auction_deck->shuffle(DECK_LOC_DECK);

        // Get the number of cards to draw
        $nbrPlayers = count($players);
        $nbrAuctionToDraw = $this->player_num_options[$nbrPlayers]["auctionCards"];
        $this->morning_auction_deck->pickCardsForLocation($nbrAuctionToDraw, DECK_LOC_DECK, DECK_LOC_BOARD);
    }
    
    function setupAwardPlaqueDeck($players)
    {
        $cards = array();
        $nbrPlayers = count($players);
        $limitPlaqueNbr = $this->player_num_options[$nbrPlayers]["lessRewardPlaques"] ? 1 : 0;

        foreach ($this->getCardsCount()["award_plaques"] as $range) {
            // For each type of Award Plaque...
            for ($i = $range["from"]; $i <= $range["to"]; $i++) {
                // Get the Award Plaque info from the Material file
                $awardPlaque = $this->award_plaques[$i];

                // Get how many of that type of plaque needs to be added to the deck
                $awardTypeCount = $awardPlaque["nbr"] - $limitPlaqueNbr;

                for ($j = 0; $j < $awardTypeCount; $j++) {
                    // type_arg is the "Rank" in this case or the amount of VP
                    // card_location_arg is used a ranking, supposedly the highest number is pulled first which is what we want
                    $cards[] = array('type' => $awardPlaque["nameId"], 'type_arg' => $awardPlaque["vp"][$j], 'nbr' => 1);
                }
            }
        }

        $this->award_plaque_deck->createCards($cards, DECK_LOC_DECK);

        // "Draw" the cards and set the location_arg to be the VP value so they are ordered from highest to lowest
        foreach ($this->award_plaque_deck->getCardsInLocation(DECK_LOC_DECK, null, "card_type_arg") as $card) {
            $this->award_plaque_deck->insertCardOnExtremePosition($card["id"], DECK_LOC_BOARD, true);
        }
    }

    function getCardsCount()
    {
        $cardsAvailable = array();

        $cardsAvailable["morning_market"] = array(
            array(
                "from" => 1,
                "to" => 24,
            ),
        );
        
        $cardsAvailable["afternoon_market"] = array(
            array(
                "from" => 1,
                "to" => 24,
            ),
        );
        
        $cardsAvailable["morning_auction"] = array(
            array(
                "from" => 1,
                "to" => 12,
            ),
        );
        
        $cardsAvailable["afternoon_auction"] = array(
            array(
                "from" => 1,
                "to" => 12,
            ),
        );
        
        $cardsAvailable["recipe"] = array(
            array(
                "from" => 1,
                "to" => 30,
            ),
        );
        
        $cardsAvailable["award_plaques"] = array(
            array(
                "from" => 1,
                "to" => 5,
            ),
        );

        return $cardsAvailable;
    }

    function getCardsDescription() {
        $desc = array(
            'morningMarketCards' => $this->morning_market_cards,
            'recipeCards' => $this->recipe_cards,
            'morningAuctionCards' => $this->morning_auction_cards,
            'afternoonAuctionCards' => $this->afternoon_auction_cards,
            'awardPlaques' => $this->award_plaques
        );

        return $desc;
    }
    
    function getCardsOnBoard() {
        // TODO: Add Morning/Afternoon switch so player cannot see what the upcoming afternoon cards are
        $onBoard = array(
            'market' => $this->morning_market_deck->getCardsInLocation(DECK_LOC_BOARD),
            'recipe' => $this->recipe_deck->getCardsInLocation(DECK_LOC_BOARD),
            'auction' => $this->morning_auction_deck->getCardsInLocation(DECK_LOC_BOARD),
            'awards' => $this->award_plaque_deck->getCardsInLocation(DECK_LOC_BOARD)
        );

        return $onBoard;
    }

    /**
     * Find an array item's Row (X) and Column (Y) coordinates in a grid given it's item number and the grid size
     */
    function getSpriteRowColumn($item_num, $num_of_rows, $num_of_cols) {
        $row_number = floor($item_num / $num_of_rows);
        $col_number = ($item_num % $num_of_cols) + 1;
        return array($row_number, $col_number);
    }

//////////////////////////////////////////////////////////////////////////////
//////////// Player actions
//////////// 

    /*
        Each time a player is doing some game action, one of the methods below is called.
        (note: each method below must match an input method in scovillecjh.action.php)
    */

    /*
    
    Example:

    function playCard( $card_id )
    {
        // Check that this is the player's turn and that it is a "possible action" at this game state (see states.inc.php)
        self::checkAction( 'playCard' ); 
        
        $player_id = self::getActivePlayerId();
        
        // Add your game logic to play a card there 
        ...
        
        // Notify all players about the card played
        self::notifyAllPlayers( "cardPlayed", clienttranslate( '${player_name} plays ${card_name}' ), array(
            'player_id' => $player_id,
            'player_name' => self::getActivePlayerName(),
            'card_name' => $card_name,
            'card_id' => $card_id
        ) );
          
    }
    
    */

    
//////////////////////////////////////////////////////////////////////////////
//////////// Game state arguments
////////////

    /*
        Here, you can create methods defined as "game state arguments" (see "args" property in states.inc.php).
        These methods function is to return some additional information that is specific to the current
        game state.
    */

    /*
    
    Example for game state "MyGameState":
    
    function argMyGameState()
    {
        // Get some values from the current game situation in database...
    
        // return values:
        return array(
            'variable1' => $value1,
            'variable2' => $value2,
            ...
        );
    }    
    */

//////////////////////////////////////////////////////////////////////////////
//////////// Game state actions
////////////

    /*
        Here, you can create methods defined as "game state actions" (see "action" property in states.inc.php).
        The action method of state X is called everytime the current game state is set to X.
    */
    
    /*
    
    Example for game state "MyGameState":

    function stMyGameState()
    {
        // Do some stuff ...
        
        // (very often) go to another gamestate
        $this->gamestate->nextState( 'some_gamestate_transition' );
    }    
    */

//////////////////////////////////////////////////////////////////////////////
//////////// Zombie
////////////

    /*
        zombieTurn:
        
        This method is called each time it is the turn of a player who has quit the game (= "zombie" player).
        You can do whatever you want in order to make sure the turn of this player ends appropriately
        (ex: pass).
        
        Important: your zombie code will be called when the player leaves the game. This action is triggered
        from the main site and propagated to the gameserver from a server, not from a browser.
        As a consequence, there is no current player associated to this action. In your zombieTurn function,
        you must _never_ use getCurrentPlayerId() or getCurrentPlayerName(), otherwise it will fail with a "Not logged" error message. 
    */

    function zombieTurn( $state, $active_player )
    {
    	$statename = $state['name'];
    	
        if ($state['type'] === "activeplayer") {
            switch ($statename) {
                default:
                    $this->gamestate->nextState( "zombiePass" );
                	break;
            }

            return;
        }

        if ($state['type'] === "multipleactiveplayer") {
            // Make sure player is in a non blocking status for role turn
            $this->gamestate->setPlayerNonMultiactive( $active_player, '' );
            
            return;
        }

        throw new feException( "Zombie mode not supported at this game state: ".$statename );
    }
    
///////////////////////////////////////////////////////////////////////////////////:
////////// DB upgrade
//////////

    /*
        upgradeTableDb:
        
        You don't have to care about this until your game has been published on BGA.
        Once your game is on BGA, this method is called everytime the system detects a game running with your old
        Database scheme.
        In this case, if you change your Database scheme, you just have to apply the needed changes in order to
        update the game database and allow the game to continue to run with your new version.
    
    */
    
    function upgradeTableDb( $from_version )
    {
        // $from_version is the current version of this game database, in numerical form.
        // For example, if the game was running with a release of your game named "140430-1345",
        // $from_version is equal to 1404301345
        
        // Example:
//        if( $from_version <= 1404301345 )
//        {
//            // ! important ! Use DBPREFIX_<table_name> for all tables
//
//            $sql = "ALTER TABLE DBPREFIX_xxxxxxx ....";
//            self::applyDbUpgradeToAllDB( $sql );
//        }
//        if( $from_version <= 1405061421 )
//        {
//            // ! important ! Use DBPREFIX_<table_name> for all tables
//
//            $sql = "CREATE TABLE DBPREFIX_xxxxxxx ....";
//            self::applyDbUpgradeToAllDB( $sql );
//        }
//        // Please add your future database scheme changes here
//
//


    }    
}
