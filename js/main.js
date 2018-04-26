// TODO: start clock (time) startTime();

function initGame() {
    hideElement('.main-menu');
    showElement('.game-arena');

    // Players:            // TODO: in near future we would register our player info here.
    createPlayers();
    startGame();
}

function startGame() {

    createDeckCards();
    displayDeckCards();
    shuffleDeckCards();
    pickFirstPlayer();
    // displayCurrentPlayerName();
    // displaying deck of cards on screen

    // dealing cards for our players
    dealHands();

    // dealing the pile the first card of the game
    drawStartingCard();

    //stamping game starting time       //TODO:
    GameState.startingTime = new Date().getTime();
    //setting game turn counter to 1
    GameState.currentTurnNumber = 1;
    // display game status on screen
    displayGameStatus();

    while ((!gameOver) && (!gameAborted) && (TurnTime < maxTurnTimeAllowed)) {

        //restarting current turn time counter to 0;

        //wait until current player end turn or abort button was activated ;

        //logging current : game, turnNum , turn time, playerName, index of action, playerAction,

        // Check if current player won and if so update gameOver variable to TRUE

        // update the current player according to rules and direction
    }

    // pop up a window/event  declaring the game is over due to human player decided to abort game
    if (gameAborted) {

    }
    // Show winning picture/event : announce who won and show statistics
    if ((!gameAborted) && (gameOver)) {

    }

    //end program : show options to play a new game or close window

}

function dealHands() {
    for (var i = 1; i <= 8; i++) {
        GameState.players.forEach(function (player) {
            moveCard('deck', player.name);
        });
    }
}

function drawStartingCard() {
    var isCardLegal = false;
    var tmpCard;
    do {

        tmpCard = moveCard('deck', 'pile');
        // todo: check if card is legal and if so change isCardLegal to TRUE
        if (tmpCard.name !== 'CC') {
            isCardLegal = true;
        }
        else {
            alert('CC was dealt');
        }
        // todo : add to readme file that the first card of the game cannot be CC and therefor another card is drawn from the deck.

    } while (!isCardLegal);
    /*
        var card = GameState.board.deck.pop();
        card.isHidden=false;
        GameState.board.pile.push(card);
    */
}

function shuffleDeckCards() {
    var randomCardIndex;
    var deckOfCards = GameState.board.deck;
    var length = deckOfCards.length;
    for (i = 0; i < length - 1; i++) {
        randomCardIndex = getRandomInt(0, length);
        swapCards(i, randomCardIndex);
        debugger;
        swapCardsInDOM(i, randomCardIndex);
    }
}

function swapCards(firstCard, secondCard) {
    swap(firstCard, secondCard, GameState.board.deck);
}

function swapCardsInDOM(firstCard, secondCard) {
    var container = document.querySelector('.deckCardsArea');
    swapInDOM(container.childNodes[firstCard], container.childNodes[secondCard], container);
}

function createPlayers() {
    GameState.players = [
        new Player('human'),
        new Player('bot')
    ];
}

function createDeckCards() {
    var deck = [];
    var cardId = 1;
    for (var number in CardNumberEnum) {
        if (number === 2) {
            continue;
        }
        for (var j = 1; j <= 2; j++) {
            for (var color in ColorEnum) {
                deck.push(new Card(cardId++, ColorEnum[color], CardNumberEnum[number], null, CardNameEnum[number]));
            }
        }
    }
    for (var action in CardActionEnum) {
        // if (action !== CardActionEnum.ChangeColor) {         TODO: find a way to use ENUM here
        if (action !== 'ChangeColor') {
            for (j = 1; j <= 2; j++) {

                for (color in ColorEnum) {
                    deck.push(new Card(cardId++, ColorEnum[color], null, CardActionEnum[action], CardNameEnum[action]));
                }
            }
            /*        } else if (action === CardActionEnum.ChangeColor) {*/
        } else if (action === 'ChangeColor') {
            for (j = 1; j <= 4; j++) {
                deck.push(new Card(cardId++, null, null, CardActionEnum[action], CardNameEnum[action]));
            }
        }
    }
    GameState.board.deck = deck;
}

function pickFirstPlayer() {
    var randomNumber = getRandomInt(0, GameState.players.length);
    GameState.currentPlayer = GameState.players[randomNumber];
}

function pickNextPlayer() {
    var currentPlayerIndex = GameState.players.indexOf(GameState.currentPlayer);
    var nextPlayerIndex = (currentPlayerIndex + isClockwize() ? 1 : -1) % GameState.players.length;
    GameState.currentPlayer = GameState.players[nextPlayerIndex];
    // displayCurrentPlayerName();
}

function isClockwize() {
    return GameState.board.direction === 'CLOCKWIZE';
}

function isDeckEmpty() {
    return GameState.board.deck.length === 0;
}

function restockDeck() {

    while (GameState.board.pile.length > 1) {
        moveCard('pile', 'deck');


    }
    shuffleDeckCards();
}

function createCardElement(owner, currentCard) {

    var cardContainer = document.createElement('div');
    cardContainer.classList.add('cardContainer');
    cardContainer.setAttribute('id', 'game' + currentCard.gameOwner + 'card' + currentCard.id);

    var card = document.createElement('div');
    card.classList.add('card', 'shadow', 'rounded');
//  cardOutline.setAttribute('onclick',"activatingCard(currentCard)");
//  card.setAttribute('ondblclick','dblclickfunction()');

    var frontCard = document.createElement(('div'));
    frontCard.classList.add('frontCard', 'shadow', 'rounded');


    currentCard.color ? frontCard.style.color = currentCard.color : frontCard.style.color = 'BLACK';
    var backCard = document.createElement(('div'));
    backCard.classList.add('backCard', 'shadow', 'rounded');

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
        //    currentCard.color ? icon.style.color = currentCard.color : icon.style.color = 'BLACK';
        icon.appendChild(text);
        cardTop.appendChild(icon);
    }
    var icon = document.createElement('div');
    var text = document.createTextNode(currentCard.name);
    var icon = document.createElement('div');
    /*        icon.style.color = currentCard.color;*/
    //currentCard.color ? icon.style.color = currentCard.color : icon.style.color = 'BLACK';
    icon.appendChild(text);

    cardCenter.appendChild(icon);

    for (var i = 1; i <= 2; i++) {
        icon.style.color = card.color;
        var icon = document.createElement('div');
        var text = document.createTextNode(currentCard.name);
        /*        icon.style.color = currentCard.color;*/
        //currentCard.color ? icon.style.color = currentCard.color : icon.style.color = 'BLACK';
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

    if (!currentCard.isHidden) {
        //backCard.setAttribute('style','top: 0%');
        backCard.style.top = '0%';
        //frontCard.setAttribute('style', 'top: -100%');
        frontCard.style.top = '-100%';

        backCard.parentNode.insertBefore(backCard, frontCard);
        /*
                //the opposite:
                backCard.setAttribute('style','top: -100%');
                frontCard.setAttribute('style', 'top: 0%');
                backCard.parentNode.insertBefore(backCard, frontCard);
        */
    }

    var ownerCardsArea;
    switch (owner) {
        case 'deck': {
            ownerCardsArea = document.querySelector('.deckCardsArea');
            if (GameState.board.deck[GameState.board.deck.length - 1] === currentCard) {
                // cardContainer.removeAttribute('ondblclick'); TODO:delete line
                //cardContainer.setAttribute('ondblclick', 'moveCard("deck", "human",' + currentCard.id + ')');

                cardContainer.setAttribute('ondblclick', 'playMove("human", "getCard",' + currentCard.id + ')');

            }
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

function displayDeckCards() {
    /*
        //display human player cards on screen
        GameState.players[0].hand.forEach(function (card) {
            createCardElement('player', card);
        });

        //display Bot player cards on screen
        GameState.players[1].hand.forEach(function (card) {
            createCardElement('bot', card);
        });

        //display pile cards on screen
        GameState.board.pile.forEach(function (card) {
            createCardElement('pile', card);
        });
    */
    //display deck cards on screen
    GameState.board.deck.forEach(function (card) {
        createCardElement('deck', card);
    });

}

//  searching for cards in a player's hand that their "key" property equals the value of "value".
//  Function returns an array that its properties are the indexes of the cards that their key=value are matched.
//  if none were found the array will be empty.
function findInHand(playerName, key, value) {
    var hand;
    // playerName === GameState.players[0].name ? hand = GameState.players[0].hand : hand = GameState.players[1].hand;
    if (playerName === GameState.players[0].name) {
        hand = GameState.players[0].hand
    } else if (playerName === GameState.players[1].name) {
        hand = GameState.players[1].hand;
    } else return "Error: wrongNamePlayer";        //TODO : what kind of errors we should present ?
    var result = [];

    hand.forEach(function (card, index) {
        if (card [key] === value) {
            result.push(index)
        }
    });
    return result;
}

function rollOverCard(card, cardElement) {
    var backCard;
    var frontCard;
    var tmpCardElem;
    if (!card.isHidden) {
        // if the card front side is visible (not hidden). hide it.
        card.isHidden = true;

        backCard = cardElement.firstChild.firstChild;
        frontCard = cardElement.firstChild.lastChild;
        //backCard.setAttribute('style', 'top: -100%');
        backCard.style.top = '-100%';
        //frontCard.setAttribute('style', 'top: 0%');
        frontCard.style.top = '0%';
        tmpCardElem = backCard.parentNode.removeChild(frontCard);
        backCard.parentNode.insertBefore(tmpCardElem, cardElement.firstChild.lastChild);
        // insertBefore(backCard, frontCard);
    } else {
        // if card is hidden. un hide it and display it
        card.isHidden = false;

        frontCard = cardElement.firstChild.firstChild;
        backCard = cardElement.firstChild.lastChild;
        //backCard.setAttribute('style', 'top: 0%');
        backCard.style.top = '0%';
        //frontCard.setAttribute('style', 'top: -100%');
        frontCard.style.top = '-100%';
        tmpCardElem = backCard.parentNode.removeChild(frontCard);
        backCard.parentNode.appendChild(tmpCardElem);
    }
}

// functions that moves a card with id=cardId from cardOwner to cardReceiver
function moveCard(cardOwner, cardReceiver, cardId) {
    var tmpCard;
    var ownerCardsArea;
    var tmpCardElement;
    var receiverCardsArea;
    switch (cardOwner) {
        case 'deck': {
            // take card from deck
            tmpCard = GameState.board.deck.pop();
            // find card old location on the DOM
            ownerCardsArea = document.querySelector('.deckCardsArea');
            // remove wanted card (last child) element from old location in the DOM
            tmpCardElement = ownerCardsArea.removeChild(ownerCardsArea.lastChild);
            // disable onclick function on current card
            tmpCardElement.removeAttribute('ondblclick');
            // only if deck isn't empty we are enabling onclick function on the new card at the top of the deck
            if (ownerCardsArea.lastElementChild !== null) {

                //ownerCardsArea.lastElementChild.setAttribute('ondblclick','moveCard("deck", "human",'+ GameState.board.deck[GameState.board.deck.length-1].id + ')');
                ownerCardsArea.lastElementChild.setAttribute('ondblclick', 'playMove("human", "getCard",' + GameState.board.deck[GameState.board.deck.length - 1].id + ')');

            }
            switch (cardReceiver) {
                case 'human': {
                    // enable onDoubleClick function on current card

                    // tmpCardElement.setAttribute('ondblclick','moveCard("human", "pile",'+ tmpCard.id + ')');
                    tmpCardElement.setAttribute('ondblclick', 'playMove("human", "putCard", ' + tmpCard.id + ')');
                    // add card to human player hand
                    GameState.players[0].hand.push(tmpCard);
                    //add cardElement to the correct DOM location
                    receiverCardsArea = document.querySelector('.playerCardsArea');
                    receiverCardsArea.appendChild(tmpCardElement);
                    // refresh the card looks as a visible card instead of hidden card
                    rollOverCard(tmpCard, tmpCardElement);
                    break;
                }
                case 'bot': {
                    // add card to bot player hand
                    GameState.players[1].hand.push(tmpCard);
                    //add cardElement to the correct DOM location
                    receiverCardsArea = document.querySelector('.botCardsArea');
                    receiverCardsArea.appendChild(tmpCardElement);
                    break;
                }
                case 'pile': {
                    // add card to pile
                    GameState.board.pile.push(tmpCard);
                    // update the board pile leading card
                    GameState.board.leadingCard = tmpCard;
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
        case 'human': {

            // TODO: ---------------------------code is missing here ------------------------
            // take chosen card from player and put it in tmpCard
            var cardIndexInHand = (findInHand(cardOwner, 'id', cardId))[0];
            tmpCard = GameState.players[0].hand.splice(cardIndexInHand, 1)[0];

            // find chosen card old location Area on the DOM
            ownerCardsArea = document.querySelector('.playerCardsArea');
            var tmpCardElement2 = document.getElementById('game1' /*+ tmpCard.gameOwner*/ + 'card' + cardId);

            // remove chosen card element from old location in the DOM
            tmpCardElement = ownerCardsArea.removeChild(ownerCardsArea.childNodes[cardIndexInHand + 1]);
            // verification check if we have the correct card Element
            if (tmpCardElement !== tmpCardElement2) {
                alert('problem with tmpCardElement');
            }
            // add chosen card to pile
            GameState.board.pile.push(tmpCard);
            // update the board pile leading card
            GameState.board.leadingCard = tmpCard;
            //add cardElement to the correct DOM location
            receiverCardsArea = document.querySelector('.pileCardsArea');
            receiverCardsArea.appendChild(tmpCardElement);
            break;
        }
        case 'bot': {
            // TODO: ---------------------------code is missing here ------------------------
            // take chosen card from bot

            // find chosen card old location on the DOM

            // remove chosen card element from old location in the DOM


            // add chosen card to pile
            GameState.board.pile.push(tmpCard);
            // update the board pile leading card
            GameState.board.leadingCard = tmpCard;
            //add cardElement to the correct DOM location
            receiverCardsArea = document.querySelector('.pileCardsArea');
            receiverCardsArea.appendChild(tmpCardElement);
            // refresh the card looks as a visible card instead of hidden card
            rollOverCard(tmpCard, tmpCardElement);
            break;
        }
        case 'pile': {
            // The leading card must stay in the pile
            // if this is the last card on the pile it cannot be moved
            if (GameState.board.pile.length === 1) {
                break;
            }
            // The only place a card can go from the pile is to the deckOfCards

            // take the bottom card from pile
            tmpCard = GameState.board.pile.shift();
            // find card old location on the DOM
            ownerCardsArea = document.querySelector('.pileCardsArea');
            // remove wanted card (first child) element from old location in the DOM
            tmpCardElement = ownerCardsArea.removeChild(ownerCardsArea.firstChild);

            //if the card that is being moved is ChangeColor we need to change its color back to black/null
            changeCardColor(tmpCard, 'BLACK');
            // add card to bottom of deck for the purpose of restocking the deck
            GameState.board.deck.unshift(tmpCard);
            //add cardElement to the correct DOM location
            receiverCardsArea = document.querySelector('.deckCardsArea');
            receiverCardsArea.insertBefore(tmpCardElement, receiverCardsArea.firstChild);
            // roll  over the card so it would be hidden
            rollOverCard(tmpCard, tmpCardElement);

            break;
        }
        default: {
            break;
        }
    }
    if (GameState.board.deck.length === 0) {
        restockDeck();
    }
    return tmpCard;
}

function dblclickfunction() {
    alert('clicked');
}

function endTurn() {
    isTurnEnded = true;
    alert('turn ended');
}

function abortGame() {
    isGameAborted = true;
    alert('Game Aborted');

}


function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    var d = today.getDay();
    var weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    var day = weekday[d];
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('day&Time').innerHTML =
        day + " " + h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }
    ;  // add zero in front of numbers < 10
    return i;
}

// function displayCurrentPlayerName() {
//     document.getElementById('currentPlayer').innerHTML = GameState.currentPlayer.name;
// }

function displayGameStatus() {
    document.getElementById('turnNumber').innerHTML = GameState.currentTurnNumber;

    document.getElementById('gameTime').innerHTML = timeCounter('gameTime');
    document.getElementById('turnTime').innerHTML = timeCounter('turnTime');

    document.getElementById('currentPlayer').innerHTML = GameState.currentPlayer.name;

    // var t = setTimeout(displayCurrentPlayerName, 500);
}


/*
// Set the date we're counting down to
var countDownDate = new Date("Sep 5, 2018 15:37:25").getTime();
*/


function timeCounter(gameTime) {

    //set starting date
    var startingDate = new Date().getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now an the starting date
        var distance = now - startingDate;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        hours = checkTime(hours);
        minutes = checkTime(minutes);
        seconds = checkTime(seconds);

        // Display the result in the element with id=[gameTime]
        if (gameTime === 'turnTime') {
            document.getElementById(gameTime).innerHTML = minutes + ':' + seconds;
        } else {
            document.getElementById(gameTime).innerHTML = hours + ':' + minutes + ':' + seconds;
        }

        // If the count down is finished, write some text
        if (distance > (1000 * 60 * 5)) {
            clearInterval(x);
            document.getElementById(gameTime).innerHTML = "EXPIRED";
        }
    }, 500);
}

// function that receives: player's name(human or bot), the type of action that is being performed(getCard from deck or
// putCard in pile), the id of the card that is being getting/putting
// It checks if the requested move is legal or not. if its illegal it shows a message and asks for a different
// move. if its legal several steps are being performed
// 1. The move is being implemented.
// 2.
function playMove(currentPlayer, playerAction, cardId) {
    var playerHand, playerCard, lCard;

    // determine player's hand and card
    if (currentPlayer === 'human') {
        playerHand = GameState.players[0].hand;
        playerCard = playerHand[(findInHand(currentPlayer, 'id', cardId))[0]];
    }
    else if (currentPlayer === 'bot') {
        playerHand = GameState.players[1].hand;
        playerCard = playerHand[(findInHand(currentPlayer, 'id', cardId))[0]];
    }
    // determine leading card
    lCard = GameState.board.leadingCard;

    //if the requested action is to put a card in the pile :
    if (playerAction === 'putCard') {
        // check if moving the playerCard on the leading Card is legal according to game rules
        // if move illegal abort move and put alert on screen
        if (!isMoveLegal(playerCard, lCard, false)) {
            alert('this move is illegal!!! \n Please try a different one');
        } else {
            // if move is legal execute the following steps :
            // 1. implement move
            moveCard(currentPlayer, 'pile', cardId);

        }
    } else if (playerAction === 'getCard') {
        // getting\taking card from deck is only legal if there is no move available for the player.
        // only than can he take card from deck
        // so first we check if there is an available move to make

        if (availableMoveExist(playerHand, lCard)) {
            alert('cannot take card from deck because possible legal move exist. \n Please find and implement it');
        } else {
            moveCard('deck', currentPlayer, cardId);
        }
    }
    // 2.timestamp and log move.

    // 3. if turn not over ask for next move
    if (!isTurnEnded(playerAction, playerCard, lCard)) {


    } else {
        // (turn is over):
        // end turn and log turnTime and other stats that are needed

        //save turn time
        GameState.currentTurnTime =

            //increment game turn index
            GameState.currentTurnNumber++;

        /*
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

        */


    }
}

// this function is checking if a card move is legal to put playerCard on the leadCard, when isJustChecking
// =true it means the function is called just for a checking a theoretical move but when it is
// =FALSE it means its checking right before an actual move is about to happen
function isMoveLegal(playerCard, leadCard, isJustChecking) {

    /*
        // אם הבנתי נכון את תשובת המרצה צעד כזה איננו נחשב לחוקי לכן הוא הפך להערה//
        if ( (leadCard.action === playerCard.action) && (playerCard.action !==null) && (playerCard.color !==null) ) {
            // להניח קלף בעל צבע מוגדר שפעולתו זהה לקלף העליון בערמה המרכזית

            return true;
        }
    */
    if ((leadCard.color === playerCard.color) && (playerCard.color !== null)) {
        if (playerCard.action !== null) {
            // להניח קלף פעולה שצבעו זהה לקלף העליון בערימה המרכזית

            return true;
        } else {
            // להניח קלף שצבעו זהה לקלף העליון בערימה המרכזית

            return true;
        }
    }
    if ((leadCard.number === playerCard.number) && (playerCard.number !== null)) {
        // להניח קלף שמספרו זהה לקלף העליון בערמה המרכזית

        return true;
    }
    if ((playerCard.action !== null) && (playerCard.color === null)) {
        // להניח קלף פעולה ללא צבע

        // להניח קלף משנה צבע
        if (playerCard.action === 'CC') {
            if (!isJustChecking) {
                askPlayer2ChooseColor(playerCard);
            }
            return true;
        }

        return true;        //TODO: might need to delete this line
    }
    return false;
}

//TODO: need to complete function
function isTurnEnded(playerAction, playerCard, leadCard) {
    if (playerAction === 'putCard') {


    } else if (playerAction === 'getCard') {

        return true;
    }

}

// function that is being implemented when a player chose to put the card ChangeColor.
// it asks the player to choose a color between 4 colors
function askPlayer2ChooseColor(playerCard) {
    var chosenColor;
    //verify that playerCard is of action type "Change Color"
    if (playerCard.action !== 'CC') {
        alert('Error!!! \n you used askPlayer2ChooseColor function with a card that isnt Change Color')
    } else {
        //ask player to choose a color and put the answer in chosenColor
        chosenColor = 'BLUE';

        // Announce the color that where chosen

        // visibly change the card colors to the chosen color temporarily
        changeCardColor(playerCard, chosenColor);

    }
    //

}


function changeCardColor(playerCard, chosenColor) {

    chosenColor !== 'BLACK' ? playerCard.color = chosenColor : playerCard.color = null;
    var cardElement = document.getElementById('game1card' + playerCard.id);

    //change color for frontCard and below
    var tmpElement = cardElement.firstElementChild.lastElementChild;
    tmpElement.style.color = chosenColor;


}

// TODO : implement this function
// check if a player has no available card to put in a legal move
function availableMoveExist(playerHand, leadCard) {
    var result = [];
    playerHand.forEach(function (card, index) {
        if (isMoveLegal(card, leadCard, true)) {
            result.push(index);
        }
    });
    if (result.length != 0) {
        return true;
    } else {
        return false;
    }
}

// this function determines BOT's next move according to leading card and the hand it has.
function botMind() {
    var lCard = GameState.board.leadingCard;
    var res2Plus = [];
    var resColor = [];
    var resCC = [];
    var resStop = [];
    var resTaki = [];
    var res2PlusSameColorIndex, resTakiSameColorIndex;
    resColor = findInHand('bot', 'color', lCard.color);

    // קיים (לפחות) קלף +2 אחד פעיל
    if (GameState.twoPlusInvoked) {
        if ((res2Plus = findInHand('bot', 'action', 'TWO_PLUS')).length !== 0) {
            // אם יש למחשב +2 אז הוא שם אחד מהם - הראשון שנמצא ביד שלו
            playMove('bot', 'putCard', GameState.players[1].hand[res2Plus[0]].id);

        }
        else if (!res2Plus) {
            // אם למחשב אין +2 אז לקחת כמה קלפים שצריך מהקופה  מהקופה
            while (GameState.twoPlusInvoked) {
                take2Cards('bot');
            }
        }
    }
    // 4.2.  במידה ולשחקן הממוחשב יש קלף 2+ שצבעו זהה לקלף העליון בערימה המרכזית יניח קלף זה בערימה המרכזית

    if (res2Plus.length !== 0) {
        // מחפש עם קיים +2 באותו הצבע של הקלף המוביל. אם כן, המשתנה res2PlusSameColorIndex
        // מקבל את ערך האינדקס שלו ביד של השחקן אחרת למשתנה ערך UNDEFINED
        res2Plus.forEach(function (res2PlusItem) {
            if (res2PlusSameColorIndex === undefined) {
                res2PlusSameColorIndex = resColor.find(res2PlusItem);
            }
        });
        // במקרה שמצאנו 2+ באותו צבע, אנחנו מניחים אות
        if (res2PlusSameColorIndex !== undefined) {
            playMove('bot', 'putCard', GameState.players[1].hand[res2PlusSameColorIndex].id);
        }
    }
    // 4.3. במידה ולשחקן הממוחשב יש קלף שנה צבע – יניח אותו בערימה המרכזית ויבחר צבע בצורה אקראית
    if ((resCC = findInHand('bot', 'action', 'CC')).length !== 0) {
        playMove('bot', 'putCard', GameState.players[1].hand[resCC[0]].id);
        // TODO: need to choose color randomly here

    }
    // 4.4. במידה ולשחקן הממוחשב יש קלף עצור שצבעו זהה לקלף העליון בערימה המרכזית – יניח קלף זה בערימה המרכזית
    if ((resStop = findInHand('bot', 'action', 'STOP')).length !== 0) {
        playMove('bot', 'putCard', GameState.players[1].hand[resStop[0]].id);

    }
    // 4.5. במידה ולשחקן הממוחשב יש קלף פלוס (+) שצבעו זהה לקלף העליון בערימה המרכזית – יניח קלף זה בערימה המרכזית
    //  TODO: here we should add the PLUS Card check


    // 4.6. במידה ולשחקן הממוחשב יש קלף סופר טאקי– יניח קלף זה בערימה המרכזית ולאחר מכן את כל הקלפים בצבע הטאקי בצורה כלשהי
    //  TODO: here we should add the SUPER TAKI Card check


    // 4.7. במידה ולשחקן הממוחשב יש קלף טאקי (+) שצבעו זהה לקלף העליון בערימה המרכזית – יניח קלף זה בערימה המרכזית
    // ו לאחר מכן את כל הקלפים בצבע הטאקי בצורה כלשהי
    if ((resTaki = findInHand('bot', 'action', 'TAKI')).length !== 0) {
        // מחפש עם קיים טאקי באותו הצבע של הקלף המוביל. אם כן, המשתנה resTakiSameColorIndex
        // מקבל את ערך האינדקס שלו ביד של השחקן אחרת למשתנה ערך UNDEFINED
        resTaki.forEach(function (resTakiItem) {
            if (resTakiSameColorIndex === undefined) {
                resTakiSameColorIndex = resColor.find(resTakiItem);
            }
        });
        // במקרה שמצאנו TAKI באותו צבע, אנחנו מניחים אותו
        if (resTakiSameColorIndex !== undefined) {
            playMove('bot', 'putCard', GameState.players[1].hand[resTakiSameColorIndex].id);
        }
    }
}


// taking 2 cards from deck
function take2Cards(playerName) {
    playMove('deck', 'getCard');
    playMove('deck', 'getCard');
    decrease2PlusInvoked(2);
}

// subtract twoPlusInvoked with number
function decrease2PlusInvoked(number) {
    var i = number;
    while (i > 0) {
        GameState.twoPlusInvoked--;
        i--;
    }
}


/*
function outer() {
    var funs = [];
    for (var k=0 ; k<3 ; k++)   {
        funs[k] = (function inner(x) {

            return function(){alert(x)}})(k);
    }
    return funs;
}

var example = outer();

console.log(example[0]());
console.log(example[1]());
console.log(example[2]());

(function b() {
    console.log('called b!');
})();

b();
console.log(a);

*/

//**************************************

/*
// needed functions
function isTakiInvoked() {

}
function twoPlusActiveCards()

// BOT engagement rules :
{
    if (leadingCard === isActive2Plus) {
        if (has2Plus()) {
            put2PlusFromHand();
        } else {
            drawFromDeck();
        }
    }
    if ( ( numOf2Plus.length !==0 ) && twoPlusFounded.color ===





*/