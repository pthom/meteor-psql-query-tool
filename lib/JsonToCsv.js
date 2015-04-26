
_JsonToCsv = function (array, use_quotes, separator) {

    array = typeof array != 'object' ? JSON.parse(array) : array;
    var str = '';
    var line = '';

    //Headings
    {
        var head = array[0];
        if (use_quotes) {
            for (var index in array[0]) {
                var value = index + "";
                line += '"' + value.replace(/"/g, '""') + '"' + separator;
            }
        }
        else {
            for (var index in array[0]) {
                line += index + separator;
            }
        }

        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    for (var i = 0; i < array.length; i++) {
        var line = '';

        if (use_quotes) {
            for (var index in array[i]) {
                var value = array[i][index] + "";
                line += '"' + value.replace(/"/g, '""') + '"' + separator;
            }
        }
        else {
            for (var index in array[i]) {
                line += array[i][index] + separator;
            }
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
    }
    return str;
}

JsonToCsv_Comma = function(array) {
    return _JsonToCsv(array, true, ",");
}

JsonToCsv_Semicolon = function(array) {
    return _JsonToCsv(array, true, ";");
}
