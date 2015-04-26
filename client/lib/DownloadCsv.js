/*
Sample usage :
 var data = ServerSession.get("QueryResult");
 var csv = JsonToCsv_Semicolon(data.rows);
 DownloadCsv(csv, "data.csv");
 */
DownloadCsv = function(csvContent, filename) {
    var csvContentAndHead= "data:text/csv;charset=utf-8," + csvContent;
    var encodedUri = encodeURI(csvContentAndHead);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    link.click();
}