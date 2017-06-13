


$.getJSON("/static/database/sample_data.json", function(json){
    /* var jsonLength = json.boards.length;
    for (i = 0; i < jsonLength; i++) {
        console.log(json.boards[i].title);
        $("#boards").append("<div>" + json.boards[i].title + "</div>");
    } */
    callBack(json);
});

var myJson;

function callBack(json) {
    strJson = JSON.stringify(json);
    localStorage.setItem("localData", strJson);
}

var localData = JSON.parse(localStorage.localData);
