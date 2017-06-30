function printBoards() {

    $("#boards-container").empty();

    // For to get boards.
    $.get("/get-boards", function(data) {
        if (data !== "") {
        $("#boards-container").empty();
        for (var i = 0; i < data.data.length; i++) {
            $("#boards-container").append("<div class='board-design'><span class='board' data-board-id='" + data.data[i][0] +
                                            "'>" + data.data[i][1] + "</span> <i class='fa fa-cog fa-3x fa-fw clog'></i>\
                                            <div class='panel'><button class='btn ok'>OK</button></div></div>");
        }
        }
    });

}

function showCardPage() {
    $(document).on("click" , ".board", function() {

        // Hide boards container and show cards container.
        $("#boards-container").css({"display": "none"});
        $("#boards-head").css({"display": "none"});
        $("#cards-head").css({"display": "block"});
        $('#cards-container').css({"display": "block"})

        // Get board id from html data.
        boardId = $(this).data("board-id");
        
        $.get("/get-boards", function(data) {
            for (var i = 0; i < data.data.length; i++) {
                if (data.data[i][0] === boardId) {
                    var boardDataWithCards = data.data[i];
                }
            }
            $('#cards-head').append('<h1 id="board-title">' + boardDataWithCards[1] + '</h1>');
            $("#cards-head").append("<div class='card-input'><input id='card-input-field' type='text'\
                                    placeholder='Create new card'><span id='add-card-button' data-board-id='" + boardId + "'> +</span></div>");
            $("#cards-head").append("<button type='button' class='btn' id='back-button'>BACK</button>");
            var cardsData = boardDataWithCards[3];
            // Append cards to the proper container
            for (var i = 0; i < cardsData.length; i++) {
                switch (cardsData[i][2]) {
                    case "in-progress": $("#in-progress").append("<div class='card actual-cards' data-card-id='" + cardsData[i][0]
                                                                    + "' >" + cardsData[i][1] + "</div>");
                        break;
                    case "review": $("#review").append("<div class='card actual-cards' data-card-id='" + cardsData[i][0]
                                                        + "' >" + cardsData[i][1] + "</div>");
                        break;
                    case "done": $("#done").append("<div class='card actual-cards' data-card-id='" + cardsData[i][0]
                                                    + "' >" + cardsData[i][1] + "</div>");
                        break;
                    default: $("#new").append("<div class='card actual-cards' data-card-id='" + cardsData[i][0]
                                                + "' >" + cardsData[i][1] + "</div>");
                }
            }   

        });
       
    });
}

function addNewBoard() {
        $('#add-board-button').click(function() {

            // Get the new board title from impu.
            var newBoardTitle = $(this).prev().val();
            if (newBoardTitle.length > 60) {
                alert("Board title is too long!");
                $("#input-field").val('');
            } else {
                $.ajax({
                url: '/new-board',
                data: {'title': $(this).prev().val()},
                type: 'POST',
                });
            }
        printBoards();
    });
}


function addNewCard() {
    $(document).on('click', '#add-card-button', function () {
        var boardId = $(this).data("board-id");
        var cardTitle = $(this).prev().val();
        
            $.post("/add-new-card", {title: cardTitle, board_id: boardId}, function(data) {
                if (cardTitle.length > 80) {
                    alert("Card title is too long!")
                    $("#card-input-field").val('');
                } else {
                    $("#new").append("<div class='card actual-cards' data-card-id='" + data.data[0][0] + "' >" + cardTitle + "</div>");
                }
            });                                                       
    });
}


function backToBoardPage() {
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

function clogSpin() {

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
        changeTitle(boardId);


    });

}

function changeTitle(boardId) {
    $("#submit-new-title").unbind().click(function() {

        var boardIdChange = $("#dialog").data('board_id')
        var newBoardTitle = $("#change-title").val();
        if (newBoardTitle.length > 60) {
            alert("New board title is too long");
            $("#change-title").val('');
        } else {
            $.ajax({
                url: "/change-board-title",
                data: {'title': newBoardTitle, 'boardId': boardId},
                type: 'POST'
            });
        
            $( "#dialog" ).dialog( "close" );

            $("#boards-container").empty();
        }
        return printBoards();
    });
}

function cardDragger() {
    $( function() {
        
        $( "#new" ).sortable({connectWith: ["#done", "#in-progress", "#review", "#new"],
        update: function(event, ui) {
            var newStatus = "new";
            changeCardStatus(ui, newStatus);
        }})

        $( "#done" ).sortable({connectWith: ["#done", "#in-progress", "#review", "#new"],
        update: function(event, ui) {
            var newStatus = "done";
            changeCardStatus(ui, newStatus);
        }})
        
        $( "#in-progress" ).sortable({connectWith: ["#done", "#in-progress", "#review", "#new"],
        update: function(event, ui) {
            var newStatus = "in-progress";
            changeCardStatus(ui, newStatus);
        }})
        
        $( "#review" ).sortable({connectWith: ["#done", "#in-progress", "#review", "#new"],
        update: function(event, ui) {
            var newStatus = "review";
            changeCardStatus(ui, newStatus);
        }})
    });
}

function loginAndRegistration() {
    $('#loginModal').on('show.bs.modal', function (event) {
        console.log("login/reg button pressed");
    var button = $(event.relatedTarget);
    var buttonData = button.attr('id');
    if (buttonData == 'registration') {
        console.log("registerbutton");
        $("#login-modal").hide();
        $("#registration-modal").show();
    } else if (buttonData == 'login') {
        console.log("loginshit");
        $("#login-modal").show();
        $("#registration-modal").hide();
    }
});
}

function dract() {
    $('#dract').click(function(){
        $('#mr-dract').animate({left: "+=300"}, 2000, function(){
            $('#mr-dract').addClass('flipped');
            $('#mr-dract').animate({left: "-=1"}, 500, function(){
                $('#mr-dract').removeClass('flipped');
                $('#mr-dract').animate({left: "-=299"}, 2000);
            });    
        });
    });
}


function main() {
   
    // Print boards.
    printBoards();
    
    // Add create new board field.    
    addNewBoard();

    // Show the clicked board cards
    showCardPage();

    cardDragger();
    // Add new card to board.
    addNewCard();

    // Back to the boards page.
    backToBoardPage();

    // Clog spin.
    clogSpin();
    loginAndRegistration();
    dract();
}

$(document).ready(main);