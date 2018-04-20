var gGameState = {
    board: {
        deck: [],
        pile: [],
        leadingCard: null,
        activeCard: null,
        direction: 'CLOCKWIZE',
        twoPlusActiveCards: 0,
        takiInvoked: false,
        owedCards2Take: 0       // number of cards the player is obligated to take from deck.every turn it sets on 1 unless 2+ are involved :-)
    },
    currentPlayer: null,
    // currentNumber: null,
    // currentAction: null,

    players: [],
    statistics: {
        gameId: 0,
        gameTurns: 0,
        gameTime: null,
        averageTime: null,
        gameWinner : null,
        gameLog: [] // each line consists of :
                    // turn number, date&time,turn duration, player name, card name, color, action,
                                    // card description, Number of cards taken from deck
                    // p1CardsNumber , pl2CardsNumber , leading card, of cards
    }
};

function initGame() {

    toggleDisplay("main-menu");
    toggleDisplay("game-arena");    // todo: ask why i need here to run the command twice for it to work
    toggleDisplay("game-arena");

    // Deck
    gGameState.board.deck = createDeck();
    shuffleDeck(false);

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
    this.isActive = false;  // isActive FALSE means that this card obligations toward its competitor player that was handed this card were
                            // already met.
                            // TRUE means they have not been met yet and the competitor player need to respond to it.
                            // TODO: it should only be changed when the card is the leading card.
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
    // updating the board leading card
    gGameState.board.leadingCard = card;
    //deciding which player starts the game
    pickFirstPlayer();

    showCards();
}

function shuffleDeck(withHtmlElements) {
    // if the parameter withHtmlElements is false the function only shuffle the deck cards in the global board deck
    // if its true than also the html elements on screen are being shuffled
    var j, x, i, xElement;
    var deckOfCards = gGameState.board.deck;
    var deckCardsElement = document.querySelector('.deckCardsArea')
    for (i = deckOfCards.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = deckOfCards[i];
        deckOfCards[i] = deckOfCards[j];
        deckOfCards[j] = x;

        if (withHtmlElements) {
            //implementing "x = deckOfCards[i];" on xElement
            xElement = deckCardsElement.childNodes[i].cloneNode(true);
            // implementing : deckOfCards[i] = deckOfCards[j];
            deckCardsElement.replaceChild(deckCardsElement.childNodes[j].cloneNode(true), deckCardsElement.childNodes[i]);
            // implementing : deckOfCards[j] = x;
            deckCardsElement.replaceChild(xElement, deckCardsElement.childNodes[j]);
        }
    }
}
function createPlayers() {
    // var numOfPlayers = prompt('Pick the number of players');
    var players = [];
    // for (var i = 0; i < numOfPlayers; i++) {
    //     players.push(new Player(prompt('Enter player' + i + 's name:')));
    // }
    players.push(new Player('human'));
    players.push(new Player('bot'));
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

    while (gGameState.board.pile.length > 1) {
        moveCard('pile', 'deck');
    }
    shuffleDeck(true);
}

function createCard(owner ,currentCard) {

    var cardContainer = document.createElement('div');
    cardContainer.classList.add('cardContainer');

    var card = document.createElement('div');
    card.classList.add('card', 'shadow', 'rounded');
//  cardOutline.setAttribute('onclick',"activatingCard(currentCard)");
    card.setAttribute('ondblclick','dblclickfunction()');

    var frontCard = document.createElement(('div'));
    frontCard.classList.add('frontCard','shadow','rounded');
    var backCard = document.createElement(('div'));
    backCard.classList.add('backCard','shadow','rounded');

    cardContainer.appendChild(card);
    card.appendChild(frontCard);
    card.appendChild(backCard);

    var cardTop = document.createElement('div');
    cardTop.classList.add('cardTop');
    var cardCenter = document.createElement('div');
    cardCenter.classList.add('cardCenter');
    var cardBottom = document.createElement('div');
    cardBottom.classList.add('cardBottom');
    frontCard.appendChild(cardTop);
    frontCard.appendChild(cardCenter);
    frontCard.appendChild(cardBottom);

    for (var i = 1; i <= 2; i++) {
        var icon = document.createElement('div');
        var text = document.createTextNode(currentCard.name);
        /*       icon.style.color = card.color;*/
        currentCard.color ? icon.style.color = currentCard.color : icon.style.color = 'BLACK';
        icon.appendChild(text);
        cardTop.appendChild(icon);
    }
    var icon = document.createElement('div');
    var text = document.createTextNode(currentCard.name);
    var icon = document.createElement('div');
    /*        icon.style.color = currentCard.color;*/
    currentCard.color ? icon.style.color = currentCard.color : icon.style.color = 'BLACK';
    icon.appendChild(text);

    cardCenter.appendChild(icon);

    for (var i = 1; i <= 2; i++) {
        icon.style.color = card.color;
        var icon = document.createElement('div');
        var text = document.createTextNode(currentCard.name);
        /*        icon.style.color = currentCard.color;*/
        currentCard.color ? icon.style.color = currentCard.color : icon.style.color = 'BLACK';
        icon.appendChild(text);
        cardBottom.appendChild(icon);
    }

    var cardCover = document.createElement('div');
    cardCover.classList.add('cardCover');
    backCard.appendChild(cardCover);

    var img = document.createElement('img');
    img.setAttribute('src', 'TAKI.jpg');
    img.setAttribute('alt', 'taki cover');
    // img.setAttribute('style', 'width:100%;');
    cardCover.appendChild(img);

    if ( !currentCard.isHidden ) {
        backCard.setAttribute('style','top: 0%');
        frontCard.setAttribute('style', 'top: -100%');
        backCard.parentNode.insertBefore(backCard, frontCard);
/*
        //the opposite:
        backCard.setAttribute('style','top: -100%');
        frontCard.setAttribute('style', 'top: 0%');
        backCard.parentNode.insertBefore(backCard, frontCard);
*/
    }

    var ownerCardsArea;
    switch ( owner ) {
        case 'deck': {
            ownerCardsArea = document.querySelector('.deckCardsArea');
            break;
        }
        case 'pile': {
            ownerCardsArea = document.querySelector('.pileCardsArea');
            break;
        }
        case 'player': {
            ownerCardsArea = document.querySelector('.playerCardsArea');
            break;
        }
        case 'bot': {
            ownerCardsArea = document.querySelector('.botCardsArea');
            break;
        }
        default: {
            break;
        }
    }
    ownerCardsArea.appendChild(cardContainer);
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
function findInHand(playerName, key, value ) {
    var hand;
    // playerName === gGameState.players[0].name ? hand = gGameState.players[0].hand : hand = gGameState.players[1].hand;
    if ( playerName === gGameState.players[0].name) {
        hand = gGameState.players[0].hand
    } else if ( playerName === gGameState.players[1].name) {
        hand = gGameState.players[1].hand;
    } else return "Error: wrongNamePlayer" ;        //TODO : what kind of errors we should present ?
    var result = [];
    hand.forEach(function (card, index) {
        if (card [key] === value) {
            result.push(index)
        }
    });
    return result;
}

function rollOverCard( card, cardElement) {
    var backCard ;
    var frontCard ;
    var tmpCardElem;
    if ( !card.isHidden ) {
        // if the card front side is visible (not hidden). hide it.
        card.isHidden = true;

        backCard  = cardElement.firstChild.firstChild;
        frontCard = cardElement.firstChild.lastChild;
        backCard.setAttribute('style', 'top: -100%');
        frontCard.setAttribute('style', 'top: 0%');
        tmpCardElem = backCard.parentNode.removeChild(frontCard);
        backCard.parentNode.insertBefore(tmpCardElem ,cardElement.firstChild.lastChild);
        // insertBefore(backCard, frontCard);
    } else {
        // if card is hidden. un hide it and display it
        card.isHidden = false;

        frontCard = cardElement.firstChild.firstChild;
        backCard  = cardElement.firstChild.lastChild;
        backCard.setAttribute('style', 'top: 0%');
        frontCard.setAttribute('style', 'top: -100%');
        tmpCardElem = backCard.parentNode.removeChild(frontCard);
        backCard.parentNode.appendChild(tmpCardElem);
    }
}

function moveCard( cardOwner , cardReceiver, card) {
    var tmpCard ;
    var ownerCardsArea ;
    var tmpCardElement ;
    var receiverCardsArea ;
    switch (cardOwner) {
        case 'deck': {
            // take card from deck
            tmpCard = gGameState.board.deck.pop();
            // find card old location on the DOM
            ownerCardsArea = document.querySelector('.deckCardsArea');
            // remove wanted card (last child) element from old location in the DOM
            tmpCardElement = ownerCardsArea.removeChild(ownerCardsArea.lastChild);
            switch (cardReceiver) {
                case 'player': {
                    // add card to human player hand
                    gGameState.players[0].hand.push(tmpCard);
                    //add cardElement to the correct DOM location
                    receiverCardsArea = document.querySelector('.playerCardsArea');
                    receiverCardsArea.appendChild(tmpCardElement);
                    // refresh the card looks as a visible card instead of hidden card
                    rollOverCard(tmpCard, tmpCardElement);
                    break;
                }
                case 'bot': {
                    // add card to bot player hand
                    gGameState.players[1].hand.push(tmpCard);
                    //add cardElement to the correct DOM location
                    receiverCardsArea = document.querySelector('.botCardsArea');
                    receiverCardsArea.appendChild(tmpCardElement);
                    break;
                }
                case 'pile': {
                    // add card to pile
                    gGameState.board.pile.push(tmpCard);
                    // update the board pile leading card
                    gGameState.board.leadingCard = tmpCard;
                    //add cardElement to the correct DOM location
                    receiverCardsArea = document.querySelector('.pileCardsArea');
                    receiverCardsArea.appendChild(tmpCardElement);
                    // refresh the card looks as a visible card instead of hidden card
                    rollOverCard(tmpCard, tmpCardElement);
                    break;
                }
                default: {
                    break;
                }
            }
            break;
        }
        case 'player': {
            // ---------------------------code is missing here ------------------------

            // add card to pile
            gGameState.board.pile.push(tmpCard);
            //add cardElement to the correct DOM location
            receiverCardsArea = document.querySelector('.pileCardsArea');
            receiverCardsArea.appendChild(tmpCardElement);
            break;
        }
        case 'bot':{
            // ---------------------------code is missing here ------------------------
            // add card to pile
            gGameState.board.pile.push(tmpCard);
            //add cardElement to the correct DOM location
            receiverCardsArea = document.querySelector('.pileCardsArea');
            receiverCardsArea.appendChild(tmpCardElement);
            // refresh the card looks as a visible card instead of hidden card
            rollOverCard(tmpCard, tmpCardElement);
            break;
        }
        case 'pile':{
            // The leading card must stay in the pile
            // if this is the last card on the pile it cannot move it
            if ( gGameState.board.pile.length === 1 ) {
                break;
            }
            // The only place a card can go from the pile is to the deckOfCards

            // take the bottom card from pile
            tmpCard = gGameState.board.pile.shift();
            // find card old location on the DOM
            ownerCardsArea = document.querySelector('.pileCardsArea');
            // remove wanted card (first child) element from old location in the DOM
            tmpCardElement = ownerCardsArea.removeChild(ownerCardsArea.firstChild);

            // add card to bottom of deck for the purpose of restocking the deck
            gGameState.board.deck.unshift(tmpCard);
            //add cardElement to the correct DOM location
            receiverCardsArea = document.querySelector('.deckCardsArea');
            receiverCardsArea.insertBefore(tmpCardElement,receiverCardsArea.firstChild );
            // roll  over the card so it would be hidden
            rollOverCard(tmpCard, tmpCardElement);

            break;
        }
        default: {
            break;
        }
    }
    if ( gGameState.board.deck.length === 0 ) {
        restockDeck();
    }
}

function dblclickfunction() {
     alert('clicked');
}