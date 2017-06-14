function cardIdGenerator(dataObject) {
    var cardIdArray = [];
    for (var i = 0; i < Object.keys(dataObject.boards).length; i++) {
        for (var j = 0; j < Object.keys(dataObject.boards[i].cards).length; j++) {
            cardIdArray.push(Number(dataObject.boards[i].cards[j].id));
        }
    }
    return Math.max.apply(Math, cardIdArray) + 1;
}

function cardOrderGenerator(dataObject, boardId) {
    var cardOrderArray = [];
    for (var j = 0; j < Object.keys(dataObject.boards[boardId].cards).length; j++) {
        cardOrderArray.push(Number(dataObject.boards[boardId].cards[j].order));
    }
    if (cardOrderArray.length === 0) {
        return 1;
    }
    return Math.max.apply(Math, cardOrderArray) + 1;
}