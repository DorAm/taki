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

    toggleDisplay("main-menu");
    toggleDisplay("game-arena");    // todo: ask why i need here to run the command twice for it to work
    toggleDisplay("game-arena");

    // Deck
    gGameState.board.deck = createDeck();
    shuffleDeck(gGameState.board.deck);

    // Players:
    createPlayers();

    startGame();
}

function toggleDisplay(selector) {
    var x = document.getElementsByClassName(selector);
    x[0].style.display === "none" ? x[0].style.display = "block" : x[0].style.display = "none";
}

// TODO: each turn we need to check : if ( isDeckEmpty() ) restockDeck();

// card constructor
function Card(color, number, action, name) {
    this.color = color;
    this.number = number;
    this.action = action;
    this.name = name;
    this.isHidden = true;
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
            player === gGameState.players[0] ? card.isHidden=false : card.isHidden=true ;
            player.hand.push(card);
        });
    }
}

function startGame() {
    dealHands();
    // dealing the pile the first card of the game
    var card = gGameState.board.deck.pop();
    card.isHidden=false;
    gGameState.board.pile.push(card);

    //deciding which player starts the game
    pickFirstPlayer();

    showCards();
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
                deck.push(new Card(ColorEnum[color], CardNumberEnum[number], null,CardNameEnum[number]));
            }
        }
    }
    for (var action in CardActionEnum) {
        // if (action !== CardActionEnum.ChangeColor) {         TODO: find a way to use ENUM here
        if (action !== 'ChangeColor') {
            for (j = 1; j <= 2; j++) {

                for (color in ColorEnum) {
                    deck.push(new Card(ColorEnum[color], null, CardActionEnum[action], CardNameEnum[action]));
                }
            }
/*        } else if (action === CardActionEnum.ChangeColor) {*/
        } else if (action === 'ChangeColor') {
            for (j = 1; j <= 4; j++) {
                deck.push(new Card(null, null, CardActionEnum[action], CardNameEnum[action]));
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

function isDeckEmpty() {
    return gGameState.board.deck.length === 0;
}

function restockDeck() {
    // The leading card must stay in the pile
    while (gGameState.board.pile.length > 1) {
        var card = gGameState.board.pile.shift();
        card.isHidden=true;
        gGameState.board.deck.unshift(card);
    }
    shuffleDeck(gGameState.board.deck);
}

function createCard(owner ,card) {
    if ( card.isHidden ) {
        var cardOutline = document.createElement('div');
        cardOutline.classList.add('cardOutline', 'shadow', 'rounded');
        var cardBack = document.createElement('div');
        cardBack.classList.add('cardBack');
        cardOutline.appendChild(cardBack);

        var img = document.createElement('img');
        img.setAttribute('src', 'TAKI.jpg');
        img.setAttribute('alt', 'taki cover');
        img.setAttribute('style', 'width:100%;');
        cardBack.appendChild(img);

    } else {
        var cardOutline = document.createElement('div');
        cardOutline.classList.add('cardOutline', 'shadow', 'rounded');
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
            var text = document.createTextNode(card.name);
            /*       icon.style.color = card.color;*/
            card.color ? icon.style.color = card.color : icon.style.color = 'BLACK';
            icon.appendChild(text);
            cardTop.appendChild(icon);
        }
        var icon = document.createElement('div');
        var text = document.createTextNode(card.name);
        var icon = document.createElement('div');
        /*        icon.style.color = card.color;*/
        card.color ? icon.style.color = card.color : icon.style.color = 'BLACK';
        icon.appendChild(text);

        cardCenter.appendChild(icon);

        for (var i = 1; i <= 2; i++) {
            icon.style.color = card.color;
            var icon = document.createElement('div');
            var text = document.createTextNode(card.name);
            /*        icon.style.color = card.color;*/
            card.color ? icon.style.color = card.color : icon.style.color = 'BLACK';
            icon.appendChild(text);
            cardBottom.appendChild(icon);
        }
    }
        /*    debugger;*/
    switch ( owner ) {
        case 'deck': {
            var ownerCardsArea = document.querySelector('.deckCardsArea');
            break;
        }
        case 'pile': {
            var ownerCardsArea = document.querySelector('.pileCardsArea');
            break;
        }
        case 'player': {
            var ownerCardsArea = document.querySelector('.playerCardsArea');
            break;
        }
        case 'bot': {
            var ownerCardsArea = document.querySelector('.botCardsArea');
            break;
        }
        default: {
            break;
        }
    }
    ownerCardsArea.appendChild(cardOutline);
}

function showCards() {
    //display human player cards on screen
    gGameState.players[0].hand.forEach(function (card) {
        createCard('player', card);
    });

    //display Bot player cards on screen
    gGameState.players[1].hand.forEach(function (card) {
        createCard('bot', card);
    });
    //display pile cards on screen
    gGameState.board.pile.forEach(function (card) {
        createCard('pile', card);
    });
    //display deck cards on screen
    gGameState.board.deck.forEach(function (card) {
        createCard('deck', card);
    });

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