
$.getJSON("/static/database/sample_data.json", function(json){
    // console.log(json.boards[1].title);
    var jsonLength = json.boards.length;
    for (i = 0; i < jsonLength; i++) {
        console.log(json.boards[i].title);
        $("#boards").append("<div>" + json.boards[i].title + "</div>");    
    }
});
