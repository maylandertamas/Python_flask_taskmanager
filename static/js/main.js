function printBoards(dataObject) {
    for (var i = 0; i < Object.keys(dataObject.boards).length; i++) {
        console.log(i);
        $("#boards-container").append("<div class='col-md-3 board'>" + dataObject.boards[i].title + "</div>");
    }
}


function main() {
    setupJson();
    var dataObject = readFromJson();
    
    printBoards(dataObject);
}



$(document).ready(main);