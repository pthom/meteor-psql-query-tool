//Sample postgresql code that is run at server startup...
//useless on the client side


console.log("Load pg_sample");

var pg_ShowQueryResult_CSV = function(result) {
    var firstRow = result.rows[0];

    //Show columns names
    var str = "";
    for(var columnName in firstRow) {
        str = str + columnName + ", ";
    }
    console.log(str);


    result.rows.forEach( function(row) { //iterate on each row
        str = "";
        for(columnName in row) {
            str = str + row[columnName] + ", ";
        }
        console.log(str );
    });
    console.log("\n");
};


var myPostgresSample = function() {
    var sql_query = "select * from suppliers LIMIT 4";
    var result = pg_query_wrapAsync(sql_query);
    pg_ShowQueryResult_CSV(result);
};

if (Meteor.isServer) {
    Meteor.startup(function() {
        myPostgresSample();
    });
}
