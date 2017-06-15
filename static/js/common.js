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

function changeCardStatus(dataObject, event, ui, newStatus, boardId) {
    var draggedObject = ui.item[0];
            var cardId = $(draggedObject).data("cardId");
            console.log($(draggedObject).text());
            console.log(dataObject.boards[boardId].cards[0].status);

            for (i = 0; i < dataObject.boards[boardId].cards.length; i++) {
                if (dataObject.boards[boardId].cards[i].id == cardId) {
                    dataObject.boards[boardId].cards[i].status = newStatus;
                    console.log(dataObject.boards[boardId].cards);
                }
            }
}