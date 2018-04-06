var numOfPlayers = 2;
var gGameState = {
    board: {
        deck: [],
        pile: [],
        leadingCard: null,
        direction: 'CLOCKWIZE'
    },
    currentPlayer: null,
    players: [],
    statistics: {
        turns: 0,
        gameTime: null,
        averageTime: null
    }
};

function initGame() {
    var menu = document.querySelector('.menu');
    menu.style.display = 'none';
    var gameArena = document.querySelector('.game-arena');
    gameArena.style.visibility = 'visible';
    gGameState.board.deck = createDeck();
    shuffleDeck(gGameState.board.deck);
    gGameState.players = createPlayers();

    dealHands();
    // dealing the pile the first card of the game
    gGameState.board.pile.push(gGameState.board.deck.pop());
    //deciding which player starts the game
//    pickFirstPlayer();

    startGame();
}

// card constructor
function CardConstructor(color, number, action) {
    this.color  = color;
    this.number = number;
    this.action = action;
}

// player constructor
function PlayerConstructor(name) {
    this.name = name;
    this.hand = [];
    this.singleCardCounter = 0;
}

function dealHands() {
    //dealing 8 cards to each player
    for (var i = 1; i <= 8; i++) {
        for (var j = 0; j < numOfPlayers; j++) {
            var card = gGameState.board.deck.pop();
            gGameState.players[j].hand.push(card);
        }
    }
}

function startGame() {

}
function shuffleDeck(deckOfCards) {
    var j, x, i;
    for (i = deckOfCards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = deckOfCards[i];
        deckOfCards[i] = deckOfCards[j];
        deckOfCards[j] = x;
    }
}

function createPlayers() {
    var players = [] ;
    players.push(new PlayerConstructor("Amit"));
    players.push(new PlayerConstructor("Computer"));
    return players;
}

function createDeck() {
    var deck = [];
    for (var number in CardNumberEnum) {
        if (number === 2) {
            continue;
        }
        for (var j = 1; j <= 2; j++) {
            for (var color in ColorEnum) {
                deck.push(new CardConstructor(ColorEnum[color], CardNumberEnum[number], null));
            }
        }
    }
    for (var action in ActionCardEnum) {
        if (action !== 'ChangeColor' ) {
            for (j = 1; j <= 2; j++) {

                for (color in ColorEnum) {
                    deck.push(new CardConstructor(ColorEnum[color], null, ActionCardEnum[action]));
                }
            }
        } else if (action === 'ChangeColor') {
            for (j = 1; j <= 4; j++) {
                deck.push(new CardConstructor(null, null, ActionCardEnum[action]));
            }
        }
    }
    shuffleDeck(deck);
    return deck;
}
/*
function renderDeck() {
    var htmlStr = '';
    = gGameState.board.deck.forEach(function (card) {
        htmlStr += '<div class="card">' + card.color + '</div>'
    });
    document.querySelector('.hand').innerHTML = htmlStr;
}

*/