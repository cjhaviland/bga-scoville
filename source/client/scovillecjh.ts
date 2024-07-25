/*
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * ScovilleCjh implementation : © CJ Haviland plaidhappiness@gmail.com
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */
/// <amd-module name="bgagame/scovillecjh"/>

import Gamegui = require('ebg/core/gamegui');
import CommonMixer = require("cookbook/common");
import "ebg/counter";
import "ebg/stock";
import Counter = require('ebg/counter');

/** The root for all of your game code. */
class ScovilleCjh extends CommonMixer(Gamegui)
{
	// myGlobalValue: number = 0;
	// myGlobalArray: string[] = [];
	
            // Here, you can init the global variables of your user interface
            // Example:
            // this.myGlobalValue = 0;

            domFontSize: number = 0;
            marketCardWidth: number = 0;
            marketCardHeight: number = 0;

            spriteInfo = {
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

			playerScreenCounters: Record<string, Counter> = {};

	/** @gameSpecific See {@link Gamegui} for more information. */
	constructor(){
		super();
		console.log('scovillecjh constructor');

		const domEl = document.getElementsByTagName('html')[0]
		if (domEl) {
			this.domFontSize = parseFloat(getComputedStyle(domEl).fontSize)
			this.marketCardWidth = this.domFontSize * 5;
            this.marketCardHeight = this.domFontSize * 5;
		}
	}

	/** @gameSpecific See {@link Gamegui.setup} for more information. */
	override setup(gamedatas: Gamedatas): void
	{
		console.log("Starting game setup", gamedatas );

            const { allPlayerColors, players, won, pepperPlots, boardPaths, pepperTokens, cardsDescription, cardsOnBoard, gamestate, tablespeed, game_result_neutralized, neutralized_player_id, playerorder, gamestates, notifications, decision, playerCounterData, currentRound } = gamedatas;

			if (!this.isSpectator) {
				/**
				 * B. Players
				 *  Give each player a Screen and the farmer and disc in their color, 
				 *  one of each Bonus Action tile, $10 worth of coins, 
				 *  and three peppers: red, yellow, and blue. 
				 *  Players should set up their screens to hide their stuff behind them during play.
				 */
				
				// Setting up Player Screen
				const player = this.gamedatas.players[this.player_id] as Player;

				// Add player's name to the screen container
				const playerScreenNameEl = document.getElementById('player_screen_name')
				if (playerScreenNameEl)
					playerScreenNameEl.innerText = player.name ?? ''
				
				// Get piece counters for player
				
				/** Player Screen Counters */
				for (let counterData of gamedatas.playerCounterData) {
					const pepperToken = gamedatas.pepperTokens.find(p => p.name_id == counterData.counterId)
					let cssClasses = ''

					if (counterData.counterId.includes('pepper')) {
						cssClasses = `fa6-pepper-hot ${pepperToken?.color}`
					}
					else if (counterData.counterId.includes('coins')) {
						cssClasses = 'fa6-coins'
					}
					else {
						cssClasses = ''
					}
	
					// Place counter element into container
				    dojo.place(this.format_block('jstpl_screen_counter', {
				        id: this.player_id,
				        name: counterData.counterId,
				        cssClasses: cssClasses,
				    }), `counter_container`);
	
					// Create counter
				    this.createCounter(this.player_id, counterData)
	
				    this.addTooltip(`label_${counterData.counterId}_${this.player_id}`, dojo.string.substitute( _(`Number of ${counterData.counterName} ${player.name} has.`), {
				        player_name: player.name }), "");
				}
				
				if (player?.has_extra_step) {
					dojo.place(this.format_block('jstpl_bonus_tile', {
						tileId: 'has_extra_step',
						text: 'Move 1 Extra Step'
					}), `bonus_tiles_container`);
				}
				
				if (player?.has_extra_pepper) {
					dojo.place(this.format_block('jstpl_bonus_tile', {
						tileId: 'has_extra_pepper',
						text: 'Plant 1 Extra Pepper'
					}), `bonus_tiles_container`);
				}
				
				if (player?.has_double_back) {
					dojo.place(this.format_block('jstpl_bonus_tile', {
						tileId: 'has_double_back',
						text: 'Double Back Once'
					}), `bonus_tiles_container`);
				}
			}

            // Setting up ALL players
            for(let player_id in players)
            {
                const player = players[player_id] as Player;

                // let player_board_div = $('player_board_' + player_id);
                // dojo.place(this.format_block('jstpl_player_board', {id: player_id}), player_board_div);

                this.addTokenOnBoard(player, true)
                // this.addFarmerOnBoard(player)
            }
            
            // Setup Player Card
            // document.getElementById('player-card').style.backgroundPositionY = -(this.allPlayerColors[this.yourPlayerColor].sprite_pos * 201) + 'px';

			/** Setup Pepper Plots */ 
            for( let y = 1; y <= 7; y++ )
            {
                for( let x = 1; x <= 10; x++ )
                {
                    dojo.place(this.format_block('jstpl_pepper_plot', { x: x, y: y }), `pepper-container`);
                }        
            }

			/** Add Peppers to the Plots */
			const plotPeppers = this.gamedatas.pepperPlots.filter(plot => plot.pepper != null)
			for (let plotPepper of plotPeppers) {
				const pepperToken = this.gamedatas.pepperTokens.find(p => p.name_id == plotPepper.pepper)

				if (pepperToken)
					dojo.place(this.format_block('jstpl_pepper', {color: pepperToken.color}), `pepper_plot_${plotPepper.board_x}_${plotPepper.board_y}`);
			}

            /** Setup board paths */
			// TODO: Why is this missing?
            // for (let boardPath of this.gamedatas.boardPaths) {
            //     dojo.place(this.format_block('jstpl_board_path', { id: boardPath.id }), `board-path-container`);
            // }
			
			// TODO: Get spaces where a player exists

            // Setup Market cards
            for (let card of cardsOnBoard.market) {
				if (card) {
					// const cardDesc = cardsDescription.morningMarketCards.find(x => x.nameId == parseInt(card.type));
	
					const rowCol = this.getSpriteRowColumn(card.type, this.spriteInfo.morningMarket.numberOfColumns)
	
					dojo.place(this.format_block('jstpl_market_card', {morningAfternoon: 'morning', type: card.type, row: rowCol.row, col: rowCol.col}), 'market-cards-container');
				}
            }
           
            // Setup Auction cards
            for (let card of cardsOnBoard.auction) {
				if(card) {
					// const cardDesc = cardsDescription.morningAuctionCards.find(x => x.nameId == parseInt(card.type));
	
					const rowCol = this.getSpriteRowColumn(card.type, this.spriteInfo.morningAuction.numberOfColumns)
	
					const keyIndex = Object.keys(cardsOnBoard.auction).findIndex(key => cardsOnBoard.auction[parseInt(key)]?.id === card.id);
					const leftVal = (keyIndex * 8.1) + 49.1;
					dojo.place(this.format_block('jstpl_auction_card', {morningAfternoon: 'morning', type: card.type, row: rowCol.row, col: rowCol.col, leftVal: leftVal}), 'board-top');
				}
            }
            
            // Setup Recipe cards
            for (let card of cardsOnBoard.recipe) {
				if (card) {
					// const cardDesc = cardsDescription.recipeCards.find(x => x.nameId == card.type);
	
					const rowCol = this.getSpriteRowColumn(card.type, this.spriteInfo.recipe.numberOfColumns)
	
					dojo.place(this.format_block('jstpl_recipe_card', {type: card.type, row: rowCol.row, col: rowCol.col}), 'recipe-cards-container');
				}
            }
            
            // Setup Award Plaques
            for (let card of cardsOnBoard.awards) {
				if (card) {
					// const cardDesc = cardsDescription.awardPlaques.find(x => x.nameId == parseInt(card.type));
	
					// const rowCol = this.getSpriteRowColumn(card.type, this.spriteInfo.recipe.numberOfColumns)
	
					dojo.place(this.format_block('jstpl_award_plaque', {type: card.type, vp: card.type_arg}), `award-${card.type}-box`);
				}
            }
 
            // Setup game notifications to handle (see "setupNotifications" method below)
            this.setupNotifications();

            console.log( "Ending game setup" );
	}

	///////////////////////////////////////////////////
	//// Game & client states
	
	/** @gameSpecific See {@link Gamegui.onEnteringState} for more information. */
	override onEnteringState(stateName: GameStateName, args: CurrentStateArgs): void
	{
		console.log( 'Entering state: '+stateName );
		
		switch( stateName )
		{
			case 'gameNewRound':
				console.log(`New round: ${this.gamedatas.currentRound}`);
                break;
			case 'auctionBid':
				this.slideAllTokensToTop()
				this.addAuctionBidInput();
                break;
		}
	}

	/** @gameSpecific See {@link Gamegui.onLeavingState} for more information. */
	override onLeavingState(stateName: GameStateName): void
	{
		console.log( 'Leaving state: '+stateName );
		
		switch( stateName )
		{
			case 'auctionBid':
				break;
		}
	}

	/** @gameSpecific See {@link Gamegui.onUpdateActionButtons} for more information. */
	override onUpdateActionButtons(stateName: GameStateName, args: AnyGameStateArgs | null): void
	{
		console.log( 'onUpdateActionButtons: ' + stateName, args );

		if(!this.isCurrentPlayerActive())
			return;

		switch( stateName )
		{
			case 'auctionBid':
				this.addActionButton( 'button_bid', _(`Bid coins`), 'onBid' );
				break;
		}
	}

	///////////////////////////////////////////////////
	//// Utility methods
	
	/*
		Here, you can defines some utility methods that you can use everywhere in your typescript
		script.
	*/
	createCounter (playerId: number, counterData: PlayerCounterData) {
		try {
			let counter = new ebg.counter()
			
			counter.create(`counter_${counterData.counterId}_${playerId}`);
			
			counter.setValue(counterData.counterValue ?? 0);
	
			this.playerScreenCounters[counterData.counterId] = counter
		}
		catch (error) {
			console.error(error)
		}
	}

	addTokenOnBoard(player: Player, isTurnOrderTrack: boolean)
	{
		const topOrBottom = isTurnOrderTrack ? 'bottom' : 'top';

		dojo.place( this.format_block( 'jstpl_player_token', {
			playerId: player.id,
			color: this.getColorName(player.color)
		} ) , `${topOrBottom}-disc-${player.turn_order}`);
	}

	moveToken(player: Player, newPosition: string) {
		this.attachToNewParent(`player-${player.id}-token`, `${newPosition}-disc-${player.turn_order}`, 0);
	}

	slideAllTokensToTop() {
		for (let playerId in this.gamedatas.players) {
			const player = this.gamedatas.players[playerId] as Player
			this.moveToken(player, 'top');
		}
	}
	
	addFarmerOnBoard(player: Player)
	{
		dojo.place( this.format_block( 'jstpl_player_farmer', {
			playerId: player.id,
			color: this.getColorName(player.color)
		} ) , `board-path-container`);
	}

	getColorName(colorHex: string) {
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
			default:
				return '';
		}
	}

	getSpriteRowColumn(itemNum: string, itemsPerRow: number) {
		const parsedItemNum = parseInt(itemNum);

		// Calculate row
		const rowNumber = Math.ceil(parsedItemNum / itemsPerRow);

		// Calculate column n % itemsPerRow === 0 means it's in the last column
		const colNumber = parsedItemNum % itemsPerRow;

		return { row: rowNumber, col: colNumber === 0 ? itemsPerRow : colNumber };
	}

	checkIfBidIsValid(bid: number) {
		const playerCoins = this.gamedatas.players[this.player_id]?.player_coins ?? 0

		if (bid > playerCoins || bid < 0) {
			return false;
		}
		
		return true;
	}

	addAuctionBidInput() {
		dojo.place( this.format_block( 'jstpl_bid_input', {
			max_bid: this.getPlayerCoins()
		} ) , `pagemaintitletext`);
	}

	getPlayerCoins() {
		const coinCounter = this.gamedatas.playerCounterData.find(x => x.counterId === 'player_coins');

		return coinCounter?.counterValue ?? 0;
	}

	///////////////////////////////////////////////////
	//// Player's action
	
	/*
		Here, you are defining methods to handle player's action (ex: results of mouse click on game objects).
		
		Most of the time, these methods:
		- check the action is possible at this game state.
		- make a call to the game server
	*/
	
	/*
	Example:
	onMyMethodToCall1( evt: Event )
	{
		console.log( 'onMyMethodToCall1' );

		// Preventing default browser reaction
		evt.preventDefault();

		//	With base Gamegui class...

		// Check that this action is possible (see "possibleactions" in states.inc.php)
		if(!this.checkAction( 'myAction' ))
			return;

		this.ajaxcall( "/yourgamename/yourgamename/myAction.html", { 
			lock: true, 
			myArgument1: arg1,
			myArgument2: arg2,
		}, this, function( result ) {
			// What to do after the server call if it succeeded
			// (most of the time: nothing)
		}, function( is_error) {

			// What to do after the server call in anyway (success or failure)
			// (most of the time: nothing)
		} );


		//	With GameguiCookbook::Common...
		this.ajaxAction( 'myAction', { myArgument1: arg1, myArgument2: arg2 }, (is_error) => {} );
	}
	*/

	onBid( evt: Event ) {
		// Preventing default browser reaction
		evt.preventDefault();

		// Check that this action is possible (see "possibleactions" in states.inc.php)
		if (this.checkAction('actBid')) {
			const bidAmountEl = document.getElementById('player_bid_amount') as HTMLInputElement;

			if (bidAmountEl) {
				this.bgaPerformAction('actBid', { 
					bid_amount: bidAmountEl.value
				}).then((result) => {
					console.log(`then`, result)
				}).catch((error) => {
					console.log(`Error:`, error)
				})
			}
		}
	}

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

		
	// }

	///////////////////////////////////////////////////
	//// Reaction to cometD notifications

	/** @gameSpecific See {@link Gamegui.setupNotifications} for more information. */
	override setupNotifications()
	{
		console.log( 'notifications subscriptions setup' );
		
		// TODO: here, associate your game notifications with local methods
		
		// With base Gamegui class...
		// dojo.subscribe( 'cardPlayed', this, "notif_cardPlayed" );

		// With GameguiCookbook::Common class...
		// Adds type safety to the subscription
		this.subscribeNotif( 'invalidBid', this.notif_invalidBid );
	}

	/*
	Example:
	
	// The argument here should be one of there things:
	// - `Notif`: A notification with all possible arguments defined by the NotifTypes interface. See {@link Notif}.
	// - `NotifFrom<'cardPlayed'>`: A notification matching any other notification with the same arguments as 'cardPlayed' (A type can be used here instead). See {@link NotifFrom}.
	// - `NotifAs<'cardPlayed'>`: A notification that is explicitly a 'cardPlayed' Notif. See {@link NotifAs}.
	notif_cardPlayed( notif: NotifFrom<'cardPlayed'> )
	{
		console.log( 'notif_cardPlayed', notif );
		// Note: notif.args contains the arguments specified during you "notifyAllPlayers" / "notifyPlayer" PHP call
	}
	*/
	notif_invalidBid( notif: NotifAs<'invalidBid'> ) {
		if (!g_archive_mode) {
        	const message = this.format_string_recursive(notif.log, notif.args);
			this.showMessage(`${message}`, 'error');		
		}

		console.log( 'notif_invalidBid', notif );
	}
}


// The global 'bgagame.scovillecjh' class is instantiated when the page is loaded. The following code sets this variable to your game class.
dojo.setObject( "bgagame.scovillecjh", ScovilleCjh );
// Same as: (window.bgagame ??= {}).scovillecjh = ScovilleCjh;