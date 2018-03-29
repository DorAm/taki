var gGameState = {
    board: {
        deck: [],
        pile: [],
        leadingCard: undefined,
        direction: 'CLOCKWIZE'
    },
    currentPlayer: undefined,
    players: [],
    statistics: {
        turns: 0,
        gameTime: undefined,
        averageTime: undefined,
    }
};

// Main

initGame();

// Color

var green = 'GREEN';
var red = 'RED';
var yellow = 'YELLOW';
var blue = 'BLUE';

// Action

var taki = 'TAKI';
var stop = 'STOP';
var changeColor = 'CHANGE_COLOR';

// Card constructor

function Card(color, number, action) {
    this.color = color;
    this.number = number;
    this.action = action;
}

// Player constructor

function Player(name, hand) {
    this.name = name;
    this.hand = hand;
    this.singleCardCounter = 0;
}

function initGame() {
    gameState.deck = createDeck();
    renderDeck();
    console.log(gameState.deck);
}

function setHand() {
    for (var i = 1; i <= 8; i++) {
        var card = gameState.deck.pop();
        gameState.players[0].hand.push(card);
    }
}

function shuffleDeck(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function createDeck() {
    var deck = [];
    for (var i = 1; i <= 9; i++) {
        if (i === 2) {
            continue;
        }
        for (var j = 1; j <= 2; j++) {
            deck.push(
                new Card('GREEN', i),
                new Card('RED', i),
                new Card('YELLOW', i),
                new Card('BLUE', i)
            );
        }
    }
    for (var j = 1; j <= 2; j++) {
        deck.push(
            new Card('GREEN', undefined, 'TAKI'),
            new Card('RED', undefined, 'TAKI'),
            new Card('YELLOW', undefined, 'TAKI'),
            new Card('BLUE', undefined, 'TAKI'),
            new Card('GREEN', undefined, 'STOP'),
            new Card('RED', undefined, 'STOP'),
            new Card('YELLOW', undefined, 'STOP'),
            new Card('BLUE', undefined, 'STOP'),
        )
    }
    deck.push(
        new Card('GREEN', undefined, 'CHANGE_COLOR'),
        new Card('RED', undefined, 'CHANGE_COLOR'),
        new Card('YELLOW', undefined, 'CHANGE_COLOR'),
        new Card('BLUE', undefined, 'CHANGE_COLOR')
    );
    shuffleDeck(deck);
    return deck;
}

function createPlayers() {

}

function renderDeck() {
    var htmlStr = '';
    gameState.deck.forEach(function (card) {
        htmlStr += '<div class="card">' + card.color + '</div>'
    });
    document.querySelector('.hand').innerHTML = htmlStr;
}


