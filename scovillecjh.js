var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define("cookbook/common", ["require", "exports", "dojo"], function (require, exports, dojo) {
    "use strict";
    var CommonMixin = function (Base) { return (function (_super) {
        __extends(Common, _super);
        function Common() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Common.prototype.attachToNewParentNoDestroy = function (mobile_in, new_parent_in, relation, place_position) {
            var mobile = $(mobile_in);
            var new_parent = $(new_parent_in);
            if (!mobile || !new_parent) {
                console.error("attachToNewParentNoDestroy: mobile or new_parent was not found on dom.", mobile_in, new_parent_in);
                return { l: NaN, t: NaN, w: NaN, h: NaN };
            }
            var src = dojo.position(mobile);
            if (place_position)
                mobile.style.position = place_position;
            dojo.place(mobile, new_parent, relation);
            mobile.offsetTop;
            var tgt = dojo.position(mobile);
            var box = dojo.marginBox(mobile);
            var cbox = dojo.contentBox(mobile);
            if (!box.t || !box.l || !box.w || !box.h || !cbox.w || !cbox.h) {
                console.error("attachToNewParentNoDestroy: box or cbox has an undefined value (t-l-w-h). This should not happen.", box, cbox);
                return box;
            }
            var left = box.l + src.x - tgt.x;
            var top = box.t + src.y - tgt.y;
            mobile.style.position = "absolute";
            mobile.style.left = left + "px";
            mobile.style.top = top + "px";
            box.l += box.w - cbox.w;
            box.t += box.h - cbox.h;
            mobile.offsetTop;
            return box;
        };
        Common.prototype.ajaxAction = function (action, args, callback, ajax_method) {
            if (!this.checkAction(action))
                return false;
            if (!args)
                args = {};
            if (!args.lock)
                args.lock = true;
            this.ajaxcall("/".concat(this.game_name, "/").concat(this.game_name, "/").concat(action, ".html"), args, this, function () { }, callback, ajax_method);
            return true;
        };
        Common.prototype.subscribeNotif = function (event, callback) {
            return dojo.subscribe(event, this, callback);
        };
        Common.prototype.addImageActionButton = function (id, label, method, destination, blinking, color, tooltip) {
            if (!color)
                color = "gray";
            this.addActionButton(id, label, method, destination, blinking, color);
            var div = $(id);
            if (div === null) {
                console.error("addImageActionButton: id was not found on dom", id);
                return null;
            }
            if (!(div instanceof HTMLElement)) {
                console.error("addImageActionButton: id was not an HTMLElement", id, div);
                return null;
            }
            dojo.style(div, "border", "none");
            dojo.addClass(div, "shadow bgaimagebutton");
            if (tooltip) {
                dojo.attr(div, "title", tooltip);
            }
            return div;
        };
        Common.prototype.isReadOnly = function () {
            return this.isSpectator || typeof g_replayFrom !== 'undefined' || g_archive_mode;
        };
        Common.prototype.scrollIntoViewAfter = function (target, delay) {
            if (this.instantaneousMode)
                return;
            var target_div = $(target);
            if (target_div === null) {
                console.error("scrollIntoViewAfter: target was not found on dom", target);
                return;
            }
            if (typeof g_replayFrom != "undefined" || !delay || delay <= 0) {
                target_div.scrollIntoView();
                return;
            }
            setTimeout(function () {
                target_div === null || target_div === void 0 ? void 0 : target_div.scrollIntoView({ behavior: "smooth", block: "center" });
            }, delay);
        };
        Common.prototype.divYou = function () {
            return this.divColoredPlayer(this.player_id, __("lang_mainsite", "You"));
        };
        Common.prototype.divColoredPlayer = function (player_id, text) {
            var player = this.gamedatas.players[player_id];
            if (player === undefined)
                return "--unknown player--";
            return "<span style=\"color:".concat(player.color, ";background-color:#").concat(player.color_back, ";\">").concat(text !== null && text !== void 0 ? text : player.name, "</span>");
        };
        Common.prototype.setMainTitle = function (html) {
            $('pagemaintitletext').innerHTML = html;
        };
        Common.prototype.setDescriptionOnMyTurn = function (description) {
            this.gamedatas.gamestate.descriptionmyturn = description;
            var tpl = dojo.clone(this.gamedatas.gamestate.args);
            if (tpl === null)
                tpl = {};
            if (this.isCurrentPlayerActive() && description !== null)
                tpl.you = this.divYou();
            var title = this.format_string_recursive(description, tpl);
            this.setMainTitle(title !== null && title !== void 0 ? title : '');
        };
        Common.prototype.addPreferenceListener = function (callback) {
            var _this = this;
            dojo.query('.preference_control').on('change', function (e) {
                var _a;
                var target = e.target;
                if (!(target instanceof HTMLSelectElement)) {
                    console.error("Preference control class is not a valid element to be listening to events from. The target of the event does not have an id.", e.target);
                    return;
                }
                var match = (_a = target.id.match(/^preference_[cf]ontrol_(\d+)$/)) === null || _a === void 0 ? void 0 : _a[1];
                if (!match)
                    return;
                var matchId = parseInt(match);
                if (isNaN(matchId)) {
                    console.error("Preference control id was not a valid number.", match);
                    return;
                }
                var pref = _this.prefs[matchId];
                if (!pref) {
                    console.warn("Preference was changed but somehow the preference id was not found.", matchId, _this.prefs);
                    return;
                }
                var value = target.value;
                if (!pref.values[value]) {
                    console.warn("Preference value was changed but somehow the value is not a valid value.", value, pref.values);
                }
                pref.value = value;
                callback(matchId);
            });
        };
        Common.prototype.onScriptError = function (error, url, line) {
            if (this.page_is_unloading)
                return;
            console.error("Script error:", error);
            _super.prototype.onScriptError.call(this, error, url, line);
        };
        Common.prototype.showError = function (log, args) {
            if (args === void 0) { args = {}; }
            args['you'] = this.divYou();
            var message = this.format_string_recursive(log, args);
            this.showMessage(message, "error");
            console.error(message);
        };
        Common.prototype.getPlayerColor = function (player_id) {
            var _a, _b;
            return (_b = (_a = this.gamedatas.players[player_id]) === null || _a === void 0 ? void 0 : _a.color) !== null && _b !== void 0 ? _b : null;
        };
        Common.prototype.getPlayerName = function (player_id) {
            var _a, _b;
            return (_b = (_a = this.gamedatas.players[player_id]) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : null;
        };
        Common.prototype.getPlayerFromColor = function (color) {
            for (var id in this.gamedatas.players) {
                var player = this.gamedatas.players[id];
                if ((player === null || player === void 0 ? void 0 : player.color) === color)
                    return player;
            }
            return null;
        };
        Common.prototype.getPlayerFromName = function (name) {
            for (var id in this.gamedatas.players) {
                var player = this.gamedatas.players[id];
                if ((player === null || player === void 0 ? void 0 : player.name) === name)
                    return player;
            }
            return null;
        };
        return Common;
    }(Base)); };
    return CommonMixin;
});
define("bgagame/scovillecjh", ["require", "exports", "ebg/core/gamegui", "cookbook/common", "ebg/counter", "ebg/stock"], function (require, exports, Gamegui, CommonMixer) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ScovilleCjh = (function (_super) {
        __extends(ScovilleCjh, _super);
        function ScovilleCjh() {
            var _this = _super.call(this) || this;
            _this.domFontSize = 0;
            _this.marketCardWidth = 0;
            _this.marketCardHeight = 0;
            _this.spriteInfo = {
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
            };
            _this.playerScreenCounters = {};
            console.log('scovillecjh constructor');
            var domEl = document.getElementsByTagName('html')[0];
            if (domEl) {
                _this.domFontSize = parseFloat(getComputedStyle(domEl).fontSize);
                _this.marketCardWidth = _this.domFontSize * 5;
                _this.marketCardHeight = _this.domFontSize * 5;
            }
            return _this;
        }
        ScovilleCjh.prototype.setup = function (gamedatas) {
            var _a;
            console.log("Starting game setup", gamedatas);
            var allPlayerColors = gamedatas.allPlayerColors, players = gamedatas.players, won = gamedatas.won, pepperPlots = gamedatas.pepperPlots, boardPaths = gamedatas.boardPaths, pepperTokens = gamedatas.pepperTokens, cardsDescription = gamedatas.cardsDescription, cardsOnBoard = gamedatas.cardsOnBoard, gamestate = gamedatas.gamestate, tablespeed = gamedatas.tablespeed, game_result_neutralized = gamedatas.game_result_neutralized, neutralized_player_id = gamedatas.neutralized_player_id, playerorder = gamedatas.playerorder, gamestates = gamedatas.gamestates, notifications = gamedatas.notifications, decision = gamedatas.decision, playerCounterData = gamedatas.playerCounterData;
            if (!this.isSpectator) {
                var player = this.gamedatas.players[this.player_id];
                var playerScreenNameEl = document.getElementById('player_screen_name');
                if (playerScreenNameEl)
                    playerScreenNameEl.innerText = (_a = player.name) !== null && _a !== void 0 ? _a : '';
                var _loop_1 = function (counterData) {
                    var pepperToken = gamedatas.pepperTokens.find(function (p) { return p.name_id == counterData.counterId; });
                    var cssClasses = '';
                    if (counterData.counterId.includes('pepper')) {
                        cssClasses = "fa6-pepper-hot ".concat(pepperToken === null || pepperToken === void 0 ? void 0 : pepperToken.color);
                    }
                    else if (counterData.counterId.includes('coins')) {
                        cssClasses = 'fa6-coins';
                    }
                    else {
                        cssClasses = '';
                    }
                    dojo.place(this_1.format_block('jstpl_screen_counter', {
                        id: this_1.player_id,
                        name: counterData.counterId,
                        cssClasses: cssClasses,
                    }), "counter_container");
                    this_1.createCounter(this_1.player_id, counterData);
                    this_1.addTooltip("label_".concat(counterData.counterId, "_").concat(this_1.player_id), dojo.string.substitute(_("Number of ".concat(counterData.counterName, " ").concat(player.name, " has.")), {
                        player_name: player.name
                    }), "");
                };
                var this_1 = this;
                for (var _i = 0, _b = gamedatas.playerCounterData; _i < _b.length; _i++) {
                    var counterData = _b[_i];
                    _loop_1(counterData);
                }
                if (player === null || player === void 0 ? void 0 : player.has_extra_step) {
                    dojo.place(this.format_block('jstpl_bonus_tile', {
                        tileId: 'has_extra_step',
                        text: 'Move 1 Extra Step'
                    }), "bonus_tiles_container");
                }
                if (player === null || player === void 0 ? void 0 : player.has_extra_pepper) {
                    dojo.place(this.format_block('jstpl_bonus_tile', {
                        tileId: 'has_extra_pepper',
                        text: 'Plant 1 Extra Pepper'
                    }), "bonus_tiles_container");
                }
                if (player === null || player === void 0 ? void 0 : player.has_double_back) {
                    dojo.place(this.format_block('jstpl_bonus_tile', {
                        tileId: 'has_double_back',
                        text: 'Double Back Once'
                    }), "bonus_tiles_container");
                }
            }
            for (var player_id in players) {
                var player = players[player_id];
                this.addTokenOnBoard(player, true);
            }
            for (var y = 1; y <= 7; y++) {
                for (var x = 1; x <= 10; x++) {
                    dojo.place(this.format_block('jstpl_pepper_plot', { x: x, y: y }), "pepper-container");
                }
            }
            var plotPeppers = this.gamedatas.pepperPlots.filter(function (plot) { return plot.pepper != null; });
            var _loop_2 = function (plotPepper) {
                var pepperToken = this_2.gamedatas.pepperTokens.find(function (p) { return p.name_id == plotPepper.pepper; });
                if (pepperToken)
                    dojo.place(this_2.format_block('jstpl_pepper', { color: pepperToken.color }), "pepper_plot_".concat(plotPepper.board_x, "_").concat(plotPepper.board_y));
            };
            var this_2 = this;
            for (var _c = 0, plotPeppers_1 = plotPeppers; _c < plotPeppers_1.length; _c++) {
                var plotPepper = plotPeppers_1[_c];
                _loop_2(plotPepper);
            }
            for (var _d = 0, _e = cardsOnBoard.market; _d < _e.length; _d++) {
                var card = _e[_d];
                if (card) {
                    var rowCol = this.getSpriteRowColumn(card.type, this.spriteInfo.morningMarket.numberOfColumns);
                    dojo.place(this.format_block('jstpl_market_card', { morningAfternoon: 'morning', type: card.type, row: rowCol.row, col: rowCol.col }), 'market-cards-container');
                }
            }
            var _loop_3 = function (card) {
                if (card) {
                    var rowCol = this_3.getSpriteRowColumn(card.type, this_3.spriteInfo.morningAuction.numberOfColumns);
                    var keyIndex = Object.keys(cardsOnBoard.auction).findIndex(function (key) { var _a; return ((_a = cardsOnBoard.auction[parseInt(key)]) === null || _a === void 0 ? void 0 : _a.id) === card.id; });
                    var leftVal = (keyIndex * 8.1) + 49.1;
                    dojo.place(this_3.format_block('jstpl_auction_card', { morningAfternoon: 'morning', type: card.type, row: rowCol.row, col: rowCol.col, leftVal: leftVal }), 'board-top');
                }
            };
            var this_3 = this;
            for (var _f = 0, _g = cardsOnBoard.auction; _f < _g.length; _f++) {
                var card = _g[_f];
                _loop_3(card);
            }
            for (var _h = 0, _j = cardsOnBoard.recipe; _h < _j.length; _h++) {
                var card = _j[_h];
                if (card) {
                    var rowCol = this.getSpriteRowColumn(card.type, this.spriteInfo.recipe.numberOfColumns);
                    dojo.place(this.format_block('jstpl_recipe_card', { type: card.type, row: rowCol.row, col: rowCol.col }), 'recipe-cards-container');
                }
            }
            for (var _k = 0, _l = cardsOnBoard.awards; _k < _l.length; _k++) {
                var card = _l[_k];
                if (card) {
                    dojo.place(this.format_block('jstpl_award_plaque', { type: card.type, vp: card.type_arg }), "award-".concat(card.type, "-box"));
                }
            }
            this.setupNotifications();
            console.log("Ending game setup");
        };
        ScovilleCjh.prototype.onEnteringState = function (stateName, args) {
            console.log('Entering state: ' + stateName);
            switch (stateName) {
                case 'auctionBid':
                    break;
            }
        };
        ScovilleCjh.prototype.onLeavingState = function (stateName) {
            console.log('Leaving state: ' + stateName);
            switch (stateName) {
                case 'auctionBid':
                    break;
            }
        };
        ScovilleCjh.prototype.onUpdateActionButtons = function (stateName, args) {
            console.log('onUpdateActionButtons: ' + stateName, args);
            if (!this.isCurrentPlayerActive())
                return;
            switch (stateName) {
                case 'auctionBid':
                    this.addActionButton('button_bid', _("Bid coins"), 'onBid');
                    break;
            }
        };
        ScovilleCjh.prototype.createCounter = function (playerId, counterData) {
            var _a;
            try {
                var counter = new ebg.counter();
                counter.create("counter_".concat(counterData.counterId, "_").concat(playerId));
                counter.setValue((_a = counterData.counterValue) !== null && _a !== void 0 ? _a : 0);
                this.playerScreenCounters[counterData.counterId] = counter;
            }
            catch (error) {
                console.error(error);
            }
        };
        ScovilleCjh.prototype.addTokenOnBoard = function (player, isTurnOrderTrack) {
            var topOrBottom = isTurnOrderTrack ? 'bottom' : 'top';
            dojo.place(this.format_block('jstpl_player_token', {
                playerId: player.id,
                color: this.getColorName(player.color)
            }), "".concat(topOrBottom, "-disc-").concat(player.turn_order));
        };
        ScovilleCjh.prototype.addFarmerOnBoard = function (player) {
            dojo.place(this.format_block('jstpl_player_farmer', {
                playerId: player.id,
                color: this.getColorName(player.color)
            }), "board-path-container");
        };
        ScovilleCjh.prototype.getColorName = function (colorHex) {
            switch (colorHex) {
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
        };
        ScovilleCjh.prototype.getSpriteRowColumn = function (itemNum, itemsPerRow) {
            var parsedItemNum = parseInt(itemNum);
            var rowNumber = Math.ceil(parsedItemNum / itemsPerRow);
            var colNumber = parsedItemNum % itemsPerRow;
            return { row: rowNumber, col: colNumber === 0 ? itemsPerRow : colNumber };
        };
        ScovilleCjh.prototype.checkIfBidIsValid = function (bid) {
            var _a, _b;
            var playerCoins = (_b = (_a = this.gamedatas.players[this.player_id]) === null || _a === void 0 ? void 0 : _a.player_coins) !== null && _b !== void 0 ? _b : 0;
            if (bid > playerCoins || bid < 0) {
                return false;
            }
            return true;
        };
        ScovilleCjh.prototype.onBid = function (evt) {
            if (this.checkAction('actBid')) {
                var bidAmountEl = document.getElementById('player_bid_amount');
                if (bidAmountEl) {
                    if (!this.checkIfBidIsValid(parseInt(bidAmountEl.value))) {
                        this.showMessage(_('Please choose a valid bid amount!'), 'error');
                        return;
                    }
                    this.ajaxcall("/scovillecjh/scovillecjh/bidAction.html", {
                        lock: true,
                        bid_amount: bidAmountEl.value,
                    }, this, function (result) { return console.log(result); });
                }
            }
        };
        ScovilleCjh.prototype.setupNotifications = function () {
            console.log('notifications subscriptions setup');
        };
        return ScovilleCjh;
    }(CommonMixer(Gamegui)));
    dojo.setObject("bgagame.scovillecjh", ScovilleCjh);
});
