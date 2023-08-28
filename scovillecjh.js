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
            this.player_colors = null;
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
            
            this.counter = {};
            this.pepperTokens = gamedatas.pepperTokens;
            this.player_colors = gamedatas.player_colors;
            this.yourPlayerColor = gamedatas.players[this.player_id].color; 

            // Setting up player boards
            for( let player_id in gamedatas.players )
            {
                let player = gamedatas.players[player_id];
                const playerOrder = gamedatas.playerorder.indexOf(player_id) + 1;

                let player_board_div = $('player_board_' + player_id);
                dojo.place(this.format_block('jstpl_player_board', {id: player_id}), player_board_div);
                         
                this.counter[player_id] = {}
                this.createCounter(player_id, 'coins')

                this.addTooltip('label_coins_' + player_id, dojo.string.substitute( _("Number of coins ${player_name} has."), {
                    player_name: player.name }), "");

                this.addTokenOnBoard(player, true)
            }
            
            // TODO: Set up your game interface here, according to "gamedatas"
            
            // Setup Player Card
            document.getElementById('player-card').style.backgroundPositionY = -(this.player_colors[this.yourPlayerColor].sprite_pos * 201) + 'px';

            // Setup initial pepper plots 5_4 and 6_4 are the starting plots
            for(let plotId in this.gamedatas.pepperPlots){ 
                
                const plot = this.gamedatas.pepperPlots[plotId]

                // Add pepper color to the plot
                if (plot.pepper != null) {
                    document.getElementById(`pepper_plot_${plot.board_x}_${plot.board_y}`).style.backgroundColor = this.pepperTokens[plot.pepper].color;
                }
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
            this.counter[player_id][name].create(name + "_" + player_id);
            this.counter[player_id][name].setValue(this.gamedatas.counters[player_id][name]);
        },

        addTokenOnBoard: function( player, isTurnOrderTrack)
        {
            console.log(`addTokenOnBoard for ${player.id}`)
            const topOrBottom = isTurnOrderTrack ? 'bottom' : 'top';

            dojo.place( this.format_block( 'jstpl_player_token', {
                PLAYER_ID: player.id,
                COLOR: this.getColorName(player.color)
            } ) , `${topOrBottom}-disc-${player.turn_order}`);
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
