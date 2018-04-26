var GameState = {
    board: {
        deck: [],
        pile: [],
        leadingCard: null,
        activeCard: null,
        endTurnButtonEnabled: false // when this is enabled. the ent turn button will work otherwise it will give an error massage
    },
    currentPlayer: null,
    // startingTime: null,
    currentTurnNumber: null,
    // currentTurnTime: null,
    // isTurnEnded: false,
    // isGameAborted: false,
    twoPlusInvoked: 0,
    takiInvoked: false,

    players: [],
    statistics: {
        gameId: 0,
        gameTurns: 0,
        gameTime: null,
        averageTime: null,
        gameWinner: null,
        gameLog: [] // each line consists of :
                    // turn number, date&time,turn duration, player name, card name, color, action,
        // card description, Number of cards taken from deck
        // p1CardsNumber , pl2CardsNumber , leading card, of cards
    }
};