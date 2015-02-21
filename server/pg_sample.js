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
    //Enter here your connection info
    var connectionString = "postgres://pascal:asedr@192.168.1.15/northwind";

    pg.connect(connectionString, function(err, psql_client, done) {
        if (err) {
            console.log("Error during connection : " + err);
            return;
        }
        var handleError = function(err) {
            // no error occurred, continue with the request
            if (!err) return false;
            // An error occurred, remove the client from the connection pool.
            done(psql_client);
            return true;
        };

        var sql_query = "select * from suppliers LIMIT 10";

        psql_client.query(sql_query, function (err, result) {
            if (handleError(err))
                return;
            //console.log("result " + JSON.stringify(result));

            pg_ShowQueryResult_CSV(result);
        });

        done();
    });
};

if (Meteor.isServer) {
    Meteor.startup(function() {
        myPostgresSample();
    });
}
