<?php
/*
 * THIS FILE HAS BEEN AUTOMATICALLY GENERATED. ANY CHANGES MADE DIRECTLY MAY BE OVERWRITTEN.
 *------
 * BGA framework: Gregory Isabelli & Emmanuel Colin & BoardGameArena
 * ScovilleCjh implementation : © CJ Haviland plaidhappiness@gmail.com
 *
 * This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
 * See http://en.boardgamearena.com/#!doc/Studio for more information.
 * -----
 */

class action_scovillecjh extends APP_GameAction
{
	/** @var scovillecjh $game */
	protected $game; // Enforces functions exist on Table class

	// Constructor: please do not modify
	public function __default()
	{
		if (self::isArg('notifwindow')) {
			$this->view = "common_notifwindow";
			$this->viewArgs['table'] = self::getArg("table", AT_posint, true);
		} else {
			$this->view = "scovillecjh_scovillecjh";
			self::trace("Complete reinitialization of board game");
		}
	}

	public function actBid()
	{
		self::setAjaxMode();

		/** @var int $bid_amount */
		$bid_amount = self::getArg('bid_amount', AT_int, true);

		$this->game->actBid( $bid_amount );
		self::ajaxResponse();
	}
}