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
    var menu = document.querySelector('.main-menu');
    menu.style.display = 'none';
    var gameArena = document.querySelector('.game-arena');
    gameArena.style.display = 'block';
    // Deck
    gGameState.board.deck = createDeck();
    shuffleDeck(gGameState.board.deck);
    gGameState.board.deck.forEach(function (card) {
        createCard(card);
    });

    // Players:
    createPlayers();

    startGame();
}


// function toggleDisplay(selector) {
//     debugger;
//     var element = document.querySelector(selector);
//     console.log(selector);
//     console.log('element.style.display = ', element.style.display);
//     element.style.display = (element.style.display === 'none') ? 'block' : 'none';
// }

//each turn we need to check : if ( isDeckEmpty() ) restockDeck();


// card constructor
function Card(color, number, action) {
    this.color = color;
    this.number = number;
    this.action = action;
}

// player constructor
function Player(name) {
    this.name = name;
    this.hand = [];
    this.singleCardCounter = 0;
}

function dealHands() {
    for (var i = 1; i <= 8; i++) {
        gGameState.players.forEach(function (player) {
            var card = gGameState.board.deck.pop();
            player.hand.push(card);
        });
    }
}

function startGame() {
    dealHands();
    // dealing the pile the first card of the game
    gGameState.board.pile.push(gGameState.board.deck.pop());
    //deciding which player starts the game
    pickFirstPlayer();
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
    // var numOfPlayers = prompt('Pick the number of players');
    var players = [];
    // for (var i = 0; i < numOfPlayers; i++) {
    //     players.push(new Player(prompt('Enter player' + i + 's name:')));
    // }
    players.push(new Player('Amit Hagever'));
    players.push(new Player('Computer'));
    gGameState.players = players;
}

function createDeck() {
    var deck = [];
    for (var number in CardNumberEnum) {
        if (number === 2) {
            continue;
        }
        for (var j = 1; j <= 2; j++) {
            for (var color in ColorEnum) {
                deck.push(new Card(ColorEnum[color], CardNumberEnum[number], null));
            }
        }
    }
    for (var action in ActionCardEnum) {
        if (action !== ActionCardEnum.ChangeColor) {
            for (j = 1; j <= 2; j++) {

                for (color in ColorEnum) {
                    deck.push(new Card(ColorEnum[color], null, ActionCardEnum[action]));
                }
            }
        } else if (action === ActionCardEnum.ChangeColor) {
            for (j = 1; j <= 4; j++) {
                deck.push(new Card(null, null, ActionCardEnum[action]));
            }
        }
    }
    return deck;
}

function pickFirstPlayer() {
    var randomNumber = getRandomInt(0, gGameState.players.length);
    gGameState.currentPlayer = gGameState.players[randomNumber];
}

function pickNextPlayer() {
    var currentPlayerIndex = gGameState.players.indexOf(gGameState.currentPlayer);
    var nextPlayerIndex = (currentPlayerIndex + isClockwize() ? 1 : -1) % gGameState.players.length;
    gGameState.currentPlayer = gGameState.players[nextPlayerIndex];
}

function isClockwize() {
    return gGameState.board.direction === 'CLOCKWIZE';
}

// BOT rules of playing
// function botMind() {
//
//     var lCard = gGameState.board.leadingCard;
//
//     if ((lCard.color number === 2
// ) &&
//     (player.hand.find(card.number))
//
// }


function isDeckEmpty() {
    return gGameState.board.deck.length === 0;
}

function restockDeck() {
    // The leading card must stay in the pile
    while (gGameState.board.pile.length > 1) {
        gGameState.board.deck.unshift(gGameState.board.pile.shift());
    }
    shuffleDeck(gGameState.board.deck);
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

function createCard(card) {
    var cardOutline = document.createElement('div');
    cardOutline.classList.add('cardOutline');
    var cardTop = document.createElement('div');
    cardTop.classList.add('cardTop');
    var cardCenter = document.createElement('div');
    cardCenter.classList.add('cardCenter');
    var cardBottom = document.createElement('div');
    cardBottom.classList.add('cardBottom');
    cardOutline.appendChild(cardTop);
    cardOutline.appendChild(cardCenter);
    cardOutline.appendChild(cardBottom);


    for (var i = 1; i <= 2; i++) {
        var icon = document.createElement('div');
        var text = document.createTextNode(card.number);
        icon.style.color = card.color;
        icon.appendChild(text);
        cardTop.appendChild(icon);
    }

    var icon = document.createElement('div');
    var text = document.createTextNode(card.number);
    var icon = document.createElement('div');

    icon.appendChild(text);
    cardCenter.appendChild(icon);

    for (var i = 1; i <= 2; i++) {
        icon.style.color = card.color;
        var icon = document.createElement('div');
        var text = document.createTextNode(card.number);
        icon.appendChild(text);
        cardBottom.appendChild(icon);
    }

    var cardsArea = document.querySelector('.cardsArea');
    cardsArea.appendChild(cardOutline);
}

// function cardDisplay(card) {
//     return card.number ? card.number : card.action;
// }