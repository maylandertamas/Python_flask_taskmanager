function setupJson() {
    $.getJSON("/static/database/sample_data.json", function(json){
        var strJson = JSON.stringify(json);
        localStorage.setItem("localData", strJson);
    });
}

function readFromJson() {
    var localData = JSON.parse(localStorage.localData);
    return localData;
}

function writeToLocalStorage(data) {
    var strData = JSON.stringify(data);
    localStorage.setItem("localData", strData);
}