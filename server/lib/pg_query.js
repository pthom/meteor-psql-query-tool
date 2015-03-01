//TRICK : pg_query_wrapAsync is a sync version of pg_query which is async@
//
//READ THE DOCS
//https://www.discovermeteor.com/blog/wrapping-npm-packages/
//http://stackoverflow.com/questions/26058205/meteor-wrapasync-syntax
//https://atmospherejs.com/meteorhacks/async

console.log("Load pg_query.js");

//Enter here your connection info
var pg_connection_string = "postgres://pascal:asedr@192.168.1.15/northwind";

var pg_query = function(sql_query, callback) {
    console.log("About to run query:" + sql_query);

    pg.connect(pg_connection_string, function(err, psql_client, done) {
        if (err) {
            var msg  ="Error during connection : " + err;
            console.log(msg);
            callback(msg, null);
            return;
        }

        psql_client.query(sql_query, function(err, result) {
            if (err) {
                // An error occurred, remove the client from the connection pool.
                done(psql_client);
                callback("Error during query : " + err, null);
                return;
            }

            done();
            callback(null, result);
        });
    });
};

pg_query_wrapAsync = Meteor.wrapAsync(pg_query);

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
