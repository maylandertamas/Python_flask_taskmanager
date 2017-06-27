function printBoards() {

    $.get("/get-boards", function(data) {
        $("#boards-container").empty();
        for (var i = 0; i < data.data.length; i++) {
            $("#boards-container").append("<div class='board-design'><span class='board' data-board-id='" + data.data[i][0] +
                                            "'>" + data.data[i][1] + "</span> <i class='fa fa-cog fa-3x fa-fw clog'></i>\
                                            <div class='panel'><button class='btn ok'>OK</button></div></div>");
        };
    });
    
}

function showCardPage(dataObject) {
    $(document).on("click" , ".board", function() {

        // Export JSON.
        var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(dataObject));
        $('footer').html('<a href="data:' + data + '" download="data.json">download JSON</a>')

        // Hide boards container and show cards container.
        $("#boards-container").css({"display": "none"});
        $("#boards-head").css({"display": "none"});
        $("#cards-head").css({"display": "block"});
        $('#cards-container').css({"display": "block"})

        // Get board id from html data.
        boardId = $(this).data("board-id");
        var boardTitle = dataObject.boards[boardId].title;
        $('#cards-head').append('<h1 id="board-title">' + boardTitle + '</h1>');
        $("#cards-head").append("<div class='card-input'><input id='card-input-field' type='text'\
                                 placeholder='Create new card'><span id='add-card-button' data-board-id='" + boardId + "'> +</span></div>");
        $("#cards-head").append("<button type='button' class='btn' id='back-button'>BACK</button>");

        // Append cards to the proper container
        for (var i = 0; i < Object.keys(dataObject.boards[boardId].cards).length; i++) {
            switch (dataObject.boards[boardId].cards[i].status) {
                case "in progress": $("#in-progress").append("<div class='card actual-cards' data-card-id='" + dataObject.boards[boardId].cards[i].id
                                                                + "' >" + dataObject.boards[boardId].cards[i].title + "</div>");
                    break;
                case "review": $("#review").append("<div class='card actual-cards' data-card-id='" + dataObject.boards[boardId].cards[i].id
                                                    + "' >" + dataObject.boards[boardId].cards[i].title + "</div>");
                    break;
                case "done": $("#done").append("<div class='card actual-cards' data-card-id='" + dataObject.boards[boardId].cards[i].id
                                                + "' >" + dataObject.boards[boardId].cards[i].title + "</div>");
                    break;
                default: $("#new").append("<div class='card actual-cards' data-card-id='" + dataObject.boards[boardId].cards[i].id
                                            + "' >" + dataObject.boards[boardId].cards[i].title + "</div>");
            }
        }   
    });
}

function addNewBoard() {
        $('#add-board-button').click(function() {

            // Get the new board title from impu.
            newBoardTitle = $(this).prev().val();
            
            $.ajax({
                url: '/new-board',
                data: {'title': $(this).prev().val()},
                type: 'POST',
            });
        printBoards();
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
        $("#new").append("<div class='card actual-cards' data-card-id='" + newCardId + "' >" + newCardTitle + "</div>");
        $("#card-input-field").val("");
    });
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
    });
}

function clogSpin(dataObject) {

    $(document).on({
        mouseenter: function () {
            $(this).addClass("fa-spin");
        },
        mouseleave: function () {
            $(this).removeClass("fa-spin");
        }
    }, ".clog");

    $(document).on( 'click', ".clog", function(){

        var boardId = $(this).prev().data("board-id");
        $( "#dialog" ).data('board_id', boardId).dialog();
        $("span.ui-dialog-title").text('Change board title');
        $(".ui-dialog-titlebar-close").hide();
        $( "#dialog" ).dialog( "option", "width", 250 );
        $("#change-title").val("");

        // Change title.
        changeTitle(dataObject, boardId);


    });

}

function changeTitle(dataObject, boardId) {
    $(document).on('click', '#submit-new-title', function () {

        var boardIdChange = $("#dialog").data('board_id')
        dataObject.boards[boardIdChange].title = $("#change-title").val();
        $( "#dialog" ).dialog( "close" );

        $("#boards-container").empty();
        return printBoards(dataObject);
    });
}

function cardDragger(dataObject) {
    $( function() {
        
        $( "#new" ).sortable({connectWith: ["#done", "#in-progress", "#review", "#new"],
        update: function(event, ui) {
            var newStatus = "new";
            changeCardStatus(dataObject, event, ui, newStatus, boardId);
        }});

        $( "#done" ).sortable({connectWith: ["#done", "#in-progress", "#review", "#new"],
        update: function(event, ui) {
            var newStatus = "done";
            changeCardStatus(dataObject, event, ui, newStatus, boardId);
        }});
        
        $( "#in-progress" ).sortable({connectWith: ["#done", "#in-progress", "#review", "#new"],
        update: function(event, ui) {
            var newStatus = "in progress";
            changeCardStatus(dataObject, event, ui, newStatus, boardId);
        }});
        
        $( "#review" ).sortable({connectWith: ["#done", "#in-progress", "#review", "#new"],
        update: function(event, ui) {
            var newStatus = "review";
            changeCardStatus(dataObject, event, ui, newStatus, boardId);
        }});
    });
}



function main() {
   

    // Create an object from local storage string.
    var boardId;

    // Print boards.
    printBoards();
    
    // Add create new board field.    
    addNewBoard()

    /*
    // Show the clicked board cards
    showCardPage(dataObject);

    cardDragger(dataObject);

    // Add new card to board.
    addNewCard(dataObject);

    // Back to the boards page.
    backToBoardPage(dataObject);

    // Clog spin.
    clogSpin(dataObject);
    */
}

$(document).ready(main);