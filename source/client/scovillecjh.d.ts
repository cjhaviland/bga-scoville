/*
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * ScovilleCjh implementation : © CJ Haviland plaidhappiness@gmail.com
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */

// If you have any imports/exports in this file, 'declare global' is access/merge your game specific types with framework types. 'export {};' is used to avoid possible confusion with imports/exports.
declare global {

	/** @gameSpecific Add game specific notifications / arguments here. See {@link NotifTypes} for more information. */
	interface NotifTypes {
		// [name: string]: any; // Uncomment to remove type safety on notification names and arguments
	}

	/** @gameSpecific Add game specific gamedatas arguments here. See {@link Gamedatas} for more information. */
	interface Gamedatas {
		// [key: string | number]: Record<keyof any, any>; // Uncomment to remove type safety on game state arguments
		playerCounterData: PlayerCounterData[]
		allPlayerColors: Record<string, PlayerColor>
		boardPaths: Record<number, BoardPath>
		cardsDescription: {
			morningAuctionCards: Record<number,AuctionCard>
			afternoonAuctionCards: Record<number,AuctionCard>
			awardPlaques: Record<number, AwardPlaque>
			morningMarketCards: Record<number, MarketCard>
			afternoonMarketCards: Record<number, MarketCard>
			recipeCards: Record<number, RecipeCard>
		}, 
		cardsOnBoard: CardsOnBoard 
		pepperPlots: PepperPlot[],
		pepperTokens: Record<number, PepperToken>
		// counters: Record<number, Counter>
		won: Record<number, unknown> 
	}

	//
	// When gamestates.jsonc is enabled in the config, the following types are automatically generated. And you should not add to anything to 'GameStates' or 'PlayerActions'. If gamestates.jsonc is enabled, 'GameStates' and 'PlayerActions' can be removed from this file.
	//

	interface GameStates {
		// [id: number]: string | { name: string, argsType: object} | any; // Uncomment to remove type safety with ids, names, and arguments for game states
	}

	/** @gameSpecific Add game specific player actions / arguments here. See {@link PlayerActions} for more information. */
	interface PlayerActions {
		// [action: string]: Record<keyof any, any>; // Uncomment to remove type safety on player action names and arguments
	}

	interface PlayerColor { sprite_pos: number, color_name: string }

	interface Player {
		player_coins: number
		pepper_red: number
		pepper_yellow: number
		pepper_blue: number
		pepper_green: number
		pepper_orange: number
		pepper_purple: number
		pepper_brown: number
		pepper_white: number
		pepper_black: number
		pepper_phantom: number

		has_double_back: boolean
		has_extra_pepper: boolean
		has_extra_step: boolean

		last_bid: number
		turn_order: any
	}

	interface BoardPath {
		id: number
		pos_1: string | null
		pos_2: string | null
	}

	interface PepperPlot {
		id: number
		board_x: number
		board_y: number
		pepper: string | null
	}

	interface PepperToken {
		name: string
		color: string
		color_code: string
	}

	interface AuctionCard {
		nameId: number
		peppers: number[]
		nbr: number
	}

	interface AwardPlaque {
		nameId: number
		peppers: number[]
		vp: number[],
		nbr: number
	}

	interface MarketCard {
		nameId: number
		wanted: number[]
		rewards: {
			coin: number
			pepper: number[]
			vp: number
		}
	}

	interface RecipeCard {
		nameId: string
		name: string
		nametr: string
		rewards: {
			pepper: number[]
			vp: number
		}
	}

	interface CardsOnBoard {
		auction: Record<number, DeckItem>
		awards: Record<number, DeckItem>
		market: Record<number, DeckItem>
		recipe: Record<number, DeckItem>
	}

	interface PlayerCounterData { 
		id: number
		playerId: string
		counterId: string
		counterName: string
		counterValue: number
		displayOrder: number
	}
}

export {}; // Force this file to be a module.