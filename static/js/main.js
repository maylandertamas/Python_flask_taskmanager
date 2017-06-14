function printBoards(dataObject) {
    for (var i = 0; i < Object.keys(dataObject.boards).length; i++) {
    $("#boards-container").append("<div class='board' data-board-id='" + i + "'>" 
    + dataObject.boards[i].title + "</div>");
    }
}

function showCardPage(dataObject) {
    $(document).on("click" , ".board", function(){
        // Hide boards container and show cards container
        $("#boards-container").css({"display": "none"});
        $("#boards-head").css({"display": "none"});
        $("#cards-head").css({"display": "block"});
        $('#cards-container').css({"display": "block"})

        $("#cards-head").append("<button type='button' class='btn' id='back-button'>BACK</button>");
        // Get board id from html data.
        boardId = $(this).data("board-id");
        var boardTitle = dataObject.boards[boardId].title;
        $('#cards-head').append('<h1 id="board-title">' + boardTitle + '</h1>');
        $("#cards-head").append("<div class='card-input'><input id='card-input-field' type='text' placeholder='New card'><span id='add-card-button' data-board-id='" + boardId + "'> +</span></div>");
        // Append cards container with cards
        for (var i = 0; i < Object.keys(dataObject.boards[boardId].cards).length; i++) {
            $("#new").append("<div class='card actual-cards'>" + dataObject.boards[boardId].cards[i].title + "</div>");
        }
        /*
        for (var i = 0; i < Object.keys(dataObject.boards[boardId].cards).length; i++) {
        $("#cards-container").append("<div class='col-md-3 card'>" + dataObject.boards[boardId].cards[i].title + "</div>");
    }
    */
    
    });
}

function addBoard(dataObject) {
     // $("#new-board").append("<div class='board-input'><input id='input-field' type='text' placeholder='New board'><span id='add-board-button'> +</span></div>");
     $('#add-board-button').click(function(){

            // Get the new board title from impu.
            newBoardTitle = $(this).prev().val();

            var newObject =  {
                "id": Object.keys(dataObject.boards).length,
                "title": newBoardTitle,
                "state": "active",
                "cards": []
            }
            dataObject.boards.push(newObject);
            $("#boards-container").append("<div class='board' data-board-id='" + newObject.id + "'>" + newBoardTitle + "</div>");
        });
}

function addNewCard(dataObject) {

        $(document).on('click', '#add-card-button', function () {
        boardId = $(this).data("board-id");
        var newCardTitle = $(this).prev().val();
        var newCardId = cardIdGenerator(dataObject).toString();
        
        var newObject =  {
                "id": newCardId,
                "title": newCardTitle,
                "status": "new",
                "order": cardOrderGenerator(dataObject, boardId).toString()
         } 
         dataObject.boards[boardId].cards.push(newObject);
         console.log(newObject);
         $("#new").append("<div class='card actual-cards'>" + newObject.title + "</div>");
         // printCards(dataObject, boardId);
        });
}

function printCards(dataObject, boardId) {
    // $("#prog-container").css({"display": "block"});
    $(".actual-cards").remove();
    // $("#cards-container").append("<button type='button' class='btn' id='back-button'>BACK</button>");
    // $("#cards-container").append("<div class='card-input'><input id='card-input-field' type='text' placeholder='New card'><span id='add-card-button'> +</span></div>")
    for (var i = 0; i < Object.keys(dataObject.boards[boardId].cards).length; i++) {
            $("#new").append("<div class='card actual-cards'>" + dataObject.boards[boardId].cards[i].title + "</div>");
    }
}


function backToBoardPage(dataObject) {
    $(document).on('click', '#back-button', function() {
        $("#cards-container").css({"display": "none"});
        $("#cards-head").css({"display": "none"});
        $("#cards-head").empty();
        $("#boards-head").css({"display": "block"});
        $("#boards-container").css({"display": "block"});
        $(".actual-cards").remove();
        $("#board-title").remove();
        $("#input-field").val("");
        // $('#header-container').css({"display": "none"})

    });
}

function main() {
 
    // Read JSON to get initial data.
    setupJson();

    // Create an object from local storage string.
    var dataObject = readFromJson();
    var boardId;
    // Print boards.
    printBoards(dataObject);

    // Add create new board field.
    
    addBoard(dataObject);

    // Show the clicked board cards
    showCardPage(dataObject);
    addNewCard(dataObject);
    backToBoardPage(dataObject);
}

$(document).ready(main);