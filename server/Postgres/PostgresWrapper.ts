/// <reference path="../../typings/typescript-libs/all-definitions.d.ts" />
///<reference path="Postgres_ConnectionString.ts" />

//TRICK : pg_query_wrapAsync is a sync version of pg_query which is async@
//
//READ THE DOCS
//https://www.discovermeteor.com/blog/wrapping-npm-packages/
//http://stackoverflow.com/questions/26058205/meteor-wrapasync-syntax
//https://atmospherejs.com/meteorhacks/async


declare var pg;//kill typescript compile errors on pg

module PostgresWrapper {

    function Query(sql_query, callback) {

        if ( ! sql_query ) {
            callback("sql_query is null", null);
        }


        //console.log("About to run query:" + sql_query);

        pg.connect(PostgresWrapper.pg_connection_string, function(err, psql_client, done) {
            if (err) {
                var msg  ="Error during connection : " + err;
                console.log(msg);
                callback(msg, null);
                return;
            }

            psql_client.query(sql_query, function(err, result) {
                if (err) {
                    // An error occurred, remove the client from the connection pool.
                    var msg = "Error during query : ";
                    console.log(msg);
                    done(psql_client);
                    callback(msg, null);
                    return;
                }

                done();
                callback(null, result);
            });
        });
    };

    //With typescript, global vars need to be declared as globals : read https://atmospherejs.com/meteortypescript/typescript-libs
    //declare var pg_query_wrapAsync;
    export var Query_WrapAsync = Meteor.wrapAsync(Query);
}


