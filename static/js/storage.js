function readFromDatabase() {
    var localData = JSON.parse(localStorage.localData);
    return localData;
}

function writeToDatabase(data) {
    var strData = JSON.stringify(data);
    localStorage.setItem("localData", strData);
}