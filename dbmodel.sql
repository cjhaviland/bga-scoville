
-- ------
-- BGA framework: © Gregory Isabelli <gisabelli@boardgamearena.com> & Emmanuel Colin <ecolin@boardgamearena.com>
-- ScovilleCjh implementation : © <Your name here> <Your email address here>
-- 
-- This code has been produced on the BGA studio platform for use on http://boardgamearena.com.
-- See http://en.boardgamearena.com/#!doc/Studio for more information.
-- -----

-- dbmodel.sql

-- This is the file where you are describing the database schema of your game
-- Basically, you just have to export from PhpMyAdmin your table structure and copy/paste
-- this export here.
-- Note that the database itself and the standard tables ("global", "stats", "gamelog" and "player") are
-- already created and must not be created here

-- Note: The database schema is created from this file when the game starts. If you modify this file,
--       you have to restart a game to see your changes in database.

-- Example 1: create a standard "card" table to be used with the "Deck" tools (see example game "hearts"):

-- CREATE TABLE IF NOT EXISTS `card` (
--   `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `card_type` varchar(16) NOT NULL,
--   `card_type_arg` int(11) NOT NULL,
--   `card_location` varchar(16) NOT NULL,
--   `card_location_arg` int(11) NOT NULL,
--   PRIMARY KEY (`card_id`)
-- ) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


-- Example 2: add a custom field to the standard "player" table
ALTER TABLE `player` ADD `player_coins` INT UNSIGNED NOT NULL DEFAULT '10';

ALTER TABLE `player` ADD `pepper_red` INT UNSIGNED NOT NULL DEFAULT '1';
ALTER TABLE `player` ADD `pepper_yellow` INT UNSIGNED NOT NULL DEFAULT '1';
ALTER TABLE `player` ADD `pepper_blue` INT UNSIGNED NOT NULL DEFAULT '1';

ALTER TABLE `player` ADD `pepper_green` INT UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE `player` ADD `pepper_orange` INT UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE `player` ADD `pepper_purple` INT UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE `player` ADD `pepper_brown` INT UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE `player` ADD `pepper_white` INT UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE `player` ADD `pepper_black` INT UNSIGNED NOT NULL DEFAULT '0';
ALTER TABLE `player` ADD `pepper_phantom` INT UNSIGNED NOT NULL DEFAULT '0';

ALTER TABLE `player` ADD `has_double_back` BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE `player` ADD `has_extra_pepper` BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE `player` ADD `has_extra_step` BOOLEAN NOT NULL DEFAULT TRUE;

ALTER TABLE `player` ADD `last_bid` INT UNSIGNED NOT NULL DEFAULT '0';

CREATE TABLE IF NOT EXISTS `pepper_plot` (
   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `board_x` tinyint(2) unsigned NOT NULL,
   `board_y` tinyint(2) unsigned NOT NULL,
   `pepper` varchar(2) NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

-- Table to store board path positions
-- pos_1 will be either a N/E Direction and the corresponding pepper id
-- pos_2 will be either a S/W Direction and the corresponding pepper id
-- If either position is NULL that tells us it's an edge space
CREATE TABLE IF NOT EXISTS `board_path` (
   `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `pos_1` varchar(6) NULL,
   `pos_2` varchar(6) NULL,
   `player_id` int NULL,
   PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `morning_market_card` (
   `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `card_type` varchar(16) NOT NULL,
   `card_type_arg` int(11) NOT NULL,
   `card_location` varchar(16) NOT NULL,
   `card_location_arg` int(11) NOT NULL,
   PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `recipe_card` (
   `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `card_type` varchar(16) NOT NULL,
   `card_type_arg` int(11) NOT NULL,
   `card_location` varchar(16) NOT NULL,
   `card_location_arg` int(11) NOT NULL,
   PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `morning_auction_card` (
   `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `card_type` varchar(16) NOT NULL,
   `card_type_arg` int(11) NOT NULL,
   `card_location` varchar(16) NOT NULL,
   `card_location_arg` int(11) NOT NULL,
   PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;

CREATE TABLE IF NOT EXISTS `award_plaque_card` (
   `card_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
   `card_type` varchar(16) NOT NULL,
   `card_type_arg` int(11) NOT NULL,
   `card_location` varchar(16) NOT NULL,
   `card_location_arg` int(11) NOT NULL,
   PRIMARY KEY (`card_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;