/**
 *------
 * BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
 * ScovilleCjh implementation : © <Your name here> <Your email address here>
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 *
 * scovillecjh.js
 *
 * ScovilleCjh user interface script
 * 
 * In this file, you are describing the logic of your user interface, in Javascript language.
 *
 */

define([
    "dojo","dojo/_base/declare",
    "ebg/core/gamegui",
    "ebg/counter",
    "ebg/stock"
],
function (dojo, declare) {
    return declare("bgagame.scovillecjh", ebg.core.gamegui, {
        constructor: function(){
            console.log('scovillecjh constructor');
              
            // Here, you can init the global variables of your user interface
            // Example:
            // this.myGlobalValue = 0;
            this.pepperTokens = null;
            this.allPlayerColors = null;

            this.domFontSize = parseFloat(getComputedStyle(document.getElementsByTagName('html')[0]).fontSize)
            this.marketCardWidth = this.domFontSize * 5;
            this.marketCardHeight = this.domFontSize * 5;

            this.spriteInfo = {
                morningMarket: {
                    url: 'img/market/morning-market-sprite.png',
                    numberOfRows: 5,
                    numberOfColumns: 5,
                },
                afternoonMarket: {
                    url: 'img/market/afternoon-market-sprite.png',
                    numberOfRows: 5,
                    numberOfColumns: 5,
                },
                morningAuction: {
                    url: 'img/auction/auction-cards-morning.png',
                    numberOfRows: 3,
                    numberOfColumns: 5,
                },
                afternoonAuction: {
                    url: 'img/auction/auction-cards-afternoon.png',
                    numberOfRows: 5,
                    numberOfColumns: 3,
                },
                recipe: {
                    url: 'img/recipe-cards.png',
                    numberOfRows: 7,
                    numberOfColumns: 5,
                },
            }

            this.counterIcons = {
                'coins': {
                    iconClass: 'fa6-coins',
                },
                'pepper': {
                    iconClass: 'fa6-pepper-hot',
                },
            }
        },
        
        /*
            setup:
            
            This method must set up the game user interface according to current game situation specified
            in parameters.
            
            The method is called each time the game interface is displayed to a player, ie:
            _ when the game starts
            _ when a player refreshes the game page (F5)
            
            "gamedatas" argument contains all datas retrieved by your "getAllDatas" PHP method.
        */
        
        setup: function( gamedatas )
        {
            console.log( "Starting game setup", gamedatas );

            const { allPlayerColors, players, counters, won, pepperPlots, boardPaths, pepperTokens, cardsDescription, cardsOnBoard, gamestate, tablespeed, game_result_neutralized, neutralized_player_id, playerorder, gamestates, notifications, decision } = gamedatas;
            
            this.counter = {};
            this.yourPlayerColor = players[this.player_id].color;
            this.allPlayerColors = allPlayerColors;
            
            this.pepperTokens = pepperTokens;
            
            this.cardsOnBoard = cardsOnBoard;
            
            // Setting up Player Screen
            const playerCounters = counters[this.player_id];
            const player = players[this.player_id];
            this.counter[this.player_id] = {}

            document.getElementById('player_screen_name').innerText = player.name

            for (let screenCounter in playerCounters) {
                const explodedName = screenCounter.split('_');
                const counterIconKey = explodedName[0];
                const pepperColor = explodedName.length > 1 ? explodedName[1] : '';

                dojo.place(this.format_block('jstpl_screen_counter', {
                    id: this.player_id,
                    name: screenCounter,
                    cssClasses: `${this.counterIcons[counterIconKey].iconClass} ${pepperColor}`,
                }), `counter_container`);

                this.createCounter(this.player_id, screenCounter)

                this.addTooltip(`label_${screenCounter}_${this.player_id}`, dojo.string.substitute( _(`Number of ${pepperColor} ${counterIconKey} ${players[this.player_id].name} has.`), {
                    player_name: player.name }), "");
            }

            if (player['has_extra_step']) {
                dojo.place(this.format_block('jstpl_bonus_tile', {
                    tileId: 'has_extra_step',
                    text: 'Move 1 Extra Step'
                }), `bonus_tiles_container`);
            }
            
            if (player['has_extra_pepper']) {
                dojo.place(this.format_block('jstpl_bonus_tile', {
                    tileId: 'has_extra_pepper',
                    text: 'Plant 1 Extra Pepper'
                }), `bonus_tiles_container`);
            }
            
            if (player['has_double_back']) {
                dojo.place(this.format_block('jstpl_bonus_tile', {
                    tileId: 'has_double_back',
                    text: 'Double Back Once'
                }), `bonus_tiles_container`);
            }

            // Setting up ALL players
            for( let player_id in players )
            {
                let player = players[player_id];

                // let player_board_div = $('player_board_' + player_id);
                // dojo.place(this.format_block('jstpl_player_board', {id: player_id}), player_board_div);

                this.addTokenOnBoard(player, true)
                // this.addFarmerOnBoard(player)
            }
            
            // TODO: Set up your game interface here, according to "gamedatas"
            
            // Setup Player Card
            // document.getElementById('player-card').style.backgroundPositionY = -(this.allPlayerColors[this.yourPlayerColor].sprite_pos * 201) + 'px';

            for( $y=1; $y<=7; $y++ )
            {
                for( $x=1; $x<=10; $x++ )
                {
                    dojo.place(this.format_block('jstpl_pepper_plot', { x: $x, y: $y }), `pepper-container`);
                }        
            }
            
            // Setup initial pepper plots 5_4 and 6_4 are the starting plots
            for(let plotId in this.pepperPlots){ 
                
                const plot = this.pepperPlots[plotId]

                // Add pepper color to the plot
                if (plot.pepper != null) {
                    // document.getElementById(`pepper_plot_${plot.board_x}_${plot.board_y}`).style.backgroundColor = this.pepperTokens[plot.pepper].color;
                    dojo.place(this.format_block('jstpl_pepper', {color: this.pepperTokens[plot.pepper].color}), `pepper_plot_${plot.board_x}_${plot.board_y}`);
                }
            }

            // Setup board paths
            // TODO: Get spaces where a player exists
            // for (let pathId in this.boardPaths) {
            //     const path = this.boardPaths[pathId]

            //     dojo.place(this.format_block('jstpl_board_path', { id: pathId }), `board-path-container`);
            // }

            // Setup Market cards
            for (let cardId in cardsOnBoard.market) {
                const card = cardsOnBoard.market[cardId];
                const cardDesc = cardsDescription.morningMarketCards[card.type];

                const rowCol = this.getSpriteRowColumn(card.type, this.spriteInfo.morningMarket.numberOfColumns)

                dojo.place(this.format_block('jstpl_market_card', {morningAfternoon: 'morning', type: card.type, row: rowCol.row, col: rowCol.col}), 'market-cards-container');
            }
           
            // Setup Auction cards
            for (let cardId in cardsOnBoard.auction) {
                const card = cardsOnBoard.auction[cardId];
                const cardDesc = cardsDescription.morningAuctionCards[card.type];

                const rowCol = this.getSpriteRowColumn(card.type, this.spriteInfo.morningAuction.numberOfColumns)

                const keyIndex = Object.keys(cardsOnBoard.auction).findIndex(key => cardsOnBoard.auction[key].id === card.id);
                const leftVal = (keyIndex * 8.1) + 49.1;
                dojo.place(this.format_block('jstpl_auction_card', {morningAfternoon: 'morning', type: card.type, row: rowCol.row, col: rowCol.col, leftVal: leftVal}), 'board-top');
            }
            
            // Setup Recipe cards
            for (let cardId in cardsOnBoard.recipe) {
                const card = cardsOnBoard.recipe[cardId];
                const cardDesc = cardsDescription.recipeCards[card.type];

                const rowCol = this.getSpriteRowColumn(card.type, this.spriteInfo.recipe.numberOfColumns)

                dojo.place(this.format_block('jstpl_recipe_card', {type: card.type, row: rowCol.row, col: rowCol.col}), 'recipe-cards-container');
            }
            
            // Setup Award Plaques
            for (let cardId in cardsOnBoard.awards) {
                const card = cardsOnBoard.awards[cardId];
                const cardDesc = cardsDescription.awardPlaques[card.type];

                // const rowCol = this.getSpriteRowColumn(card.type, this.spriteInfo.recipe.numberOfColumns)

                dojo.place(this.format_block('jstpl_award_plaque', {type: card.type, vp: card.type_arg}), `award-${card.type}-box`);
            }
 
            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
        },
       

        ///////////////////////////////////////////////////
        //// Game & client states
        
        // onEnteringState: this method is called each time we are entering into a new game state.
        //                  You can use this method to perform some user interface changes at this moment.
        //
        onEnteringState: function( stateName, args )
        {
            console.log( 'Entering state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Show some HTML block at this game state
                dojo.style( 'my_html_block_id', 'display', 'block' );
                
                break;
           */

            case 'auctionBid':
                break;
           
           
            case 'dummmy':
                break;
            }
        },

        // onLeavingState: this method is called each time we are leaving a game state.
        //                 You can use this method to perform some user interface changes at this moment.
        //
        onLeavingState: function( stateName )
        {
            console.log( 'Leaving state: '+stateName );
            
            switch( stateName )
            {
            
            /* Example:
            
            case 'myGameState':
            
                // Hide the HTML block we are displaying only during this game state
                dojo.style( 'my_html_block_id', 'display', 'none' );
                
                break;
           */
           
           
            case 'dummmy':
                break;
            }               
        }, 

        // onUpdateActionButtons: in this method you can manage "action buttons" that are displayed in the
        //                        action status bar (ie: the HTML links in the status bar).
        //        
        onUpdateActionButtons: function( stateName, args )
        {
            console.log( 'onUpdateActionButtons: '+stateName );
                      
            if( this.isCurrentPlayerActive() )
            {            
                switch( stateName )
                {
/*               
                 Example:
 
                 case 'myGameState':
                    
                    // Add 3 action buttons in the action status bar:
                    
                    this.addActionButton( 'button_1_id', _('Button 1 label'), 'onMyMethodToCall1' ); 
                    this.addActionButton( 'button_2_id', _('Button 2 label'), 'onMyMethodToCall2' ); 
                    this.addActionButton( 'button_3_id', _('Button 3 label'), 'onMyMethodToCall3' ); 
                    break;
*/
                    case 'auctionBid':
                        this.addActionButton( 'button_bid', _('Bid'), 'onBid' );
                        break;
                }
            }
        },        

        ///////////////////////////////////////////////////
        //// Utility methods
        
        /*
        
            Here, you can defines some utility methods that you can use everywhere in your javascript
            script.
        
        */

        createCounter: function (player_id, name) {
            this.counter[player_id][name] = new ebg.counter();
            this.counter[player_id][name].create(`counter_${name}_${player_id}`);
            this.counter[player_id][name].setValue(this.gamedatas.counters[player_id][name]);
        },

        addTokenOnBoard: function( player, isTurnOrderTrack)
        {
            const topOrBottom = isTurnOrderTrack ? 'bottom' : 'top';

            dojo.place( this.format_block( 'jstpl_player_token', {
                playerId: player.id,
                color: this.getColorName(player.color)
            } ) , `${topOrBottom}-disc-${player.turn_order}`);
        },
        
        addFarmerOnBoard: function(player)
        {
            dojo.place( this.format_block( 'jstpl_player_farmer', {
                playerId: player.id,
                color: this.getColorName(player.color)
            } ) , `board-path-container`);
        },

        getColorName: function(colorHex) {
            switch(colorHex) {
                case '0093D0':
                    return 'blue';
                case '00A94D':
                    return 'green';
                case 'F68E1E':
                    return 'orange';
                case 'A54499':
                    return 'purple';
                case 'EE3F34':
                    return 'red';
                case 'FFEE01':
                    return 'yellow';
            }
        },

        getSpriteRowColumn: function(itemNum, itemsPerRow) {
            const parsedItemNum = parseInt(itemNum);

            // Calculate row
            const rowNumber = Math.ceil(parsedItemNum / itemsPerRow);

            // Calculate column n % itemsPerRow === 0 means it's in the last column
            const colNumber = parsedItemNum % itemsPerRow;

            return { row: rowNumber, col: colNumber === 0 ? itemsPerRow : colNumber };
        },

        // getAvailableFarmerPaths(currentPath, currentDir) {
            
        // },

        ///////////////////////////////////////////////////
        //// Player's action
        
        /*
        
            Here, you are defining methods to handle player's action (ex: results of mouse click on 
            game objects).
            
            Most of the time, these methods:
            _ check the action is possible at this game state.
            _ make a call to the game server
        
        */
        
        /* Example:
        
        onMyMethodToCall1: function( evt )
        {
            console.log( 'onMyMethodToCall1' );
            
            // Preventing default browser reaction
            dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if( ! this.checkAction( 'myAction' ) )
            {   return; }

            this.ajaxcall( "/scovillecjh/scovillecjh/myAction.html", { 
                                                                    lock: true, 
                                                                    myArgument1: arg1, 
                                                                    myArgument2: arg2,
                                                                    ...
                                                                 }, 
                         this, function( result ) {
                            
                            // What to do after the server call if it succeeded
                            // (most of the time: nothing)
                            
                         }, function( is_error) {

                            // What to do after the server call in anyway (success or failure)
                            // (most of the time: nothing)

                         } );        
        },        
        
        */
        onBid: function( evt ) {
            // Preventing default browser reaction
            // dojo.stopEvent( evt );

            // Check that this action is possible (see "possibleactions" in states.inc.php)
            if (this.checkAction('bid')) {
                this.ajaxcall( "/scovillecjh/scovillecjh/bidAction.html", {
                    lock: true,
                    bid_amount: 0,
                }, 
                this, 
                function(result) {
                    console.log(result);
                });
            }
        },
        // placeFarmer() {
            // Check that this action is possible
            // if (!this.checkAction('placeFarmer')) {
            //     return;
            // }

            // Make call to server
            // this.ajaxCall('/scovillecjh/placeFarmer.php', {
            //     playerId: this.currentPlayer.id
            // }, this, function(result) {

            // Update board state

            
        // },

        
        ///////////////////////////////////////////////////
        //// Reaction to cometD notifications

        /*
            setupNotifications:
            
            In this method, you associate each of your game notifications with your local method to handle it.
            
            Note: game notification names correspond to "notifyAllPlayers" and "notifyPlayer" calls in
                  your scovillecjh.game.php file.
        
        */
        setupNotifications: function()
        {
            console.log( 'notifications subscriptions setup' );
            
            // TODO: here, associate your game notifications with local methods
            
            // Example 1: standard notification handling
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            
            // Example 2: standard notification handling + tell the user interface to wait
            //            during 3 seconds after calling the method in order to let the players
            //            see what is happening in the game.
            // dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );
            // this.notifqueue.setSynchronous( 'cardPlayed', 3000 );
            // 
        },  
        
        // TODO: from this point and below, you can write your game notifications handling methods
        
        /*
        Example:
        
        notif_cardPlayed: function( notif )
        {
            console.log( 'notif_cardPlayed' );
            console.log( notif );
            
            // Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
            
            // TODO: play the card in the user interface.
        },    
        
        */
   });             
});
