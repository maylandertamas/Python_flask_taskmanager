function printBoards(dataObject) {
    for (var i = 0; i < Object.keys(dataObject.boards).length; i++) {
        $("#boards-container").append("<div class='col-md-3 board'>" + dataObject.boards[i].title + "</div>");
    }
    $("#boards-container").append("<div class='col-md-3 board' id='new-board'>" + "New" + "</div>");
    $("#boards-container").append("<div class='board'><input id='input-field' type='text'><span id='add-button'> +</span></div>");
    $('#input-field').hide();
}

function createNewBoard(dataObject) {
    $("#new-board").click(function() {
        $(this).hide();
        $('#input-field').show();
        $('#add-button').click(function(){
            var newBoardTitle = $(this).prev().val();
            var newObject =  {
                "id": 3,
                "title": newBoardTitle,
                "state": "active",
                "cards": []
            }
            dataObject.boards.push(newObject);
            $('#boards-container').empty();
            return printBoards(dataObject);
        $(this).show();
        });
    });
    
}

function main() {
    setupJson();
    var dataObject = readFromJson();
    printBoards(dataObject);
    createNewBoard(dataObject);
    
}



$(document).ready(main);