/// <reference path="../../packages/typescript-libs/all-definitions.d.ts" />

//TRICK : pg_query_wrapAsync is a sync version of pg_query which is async@
//
//READ THE DOCS
//https://www.discovermeteor.com/blog/wrapping-npm-packages/
//http://stackoverflow.com/questions/26058205/meteor-wrapasync-syntax
//https://atmospherejs.com/meteorhacks/async


declare var pg;//kill typescript compile errors on pg

//meteor.d.ts does not include this (why ?)
declare module Meteor {
  function wrapAsync(func : Function) :Function;
}


console.log("Load pg_query.js");


function pg_query(sql_query, callback) {

    //Enter here your connection info
    var pg_connection_string = "postgres://northwind_user:thewindisblowing@127.0.0.1/northwind";

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
declare var pg_query_wrapAsync;
pg_query_wrapAsync = Meteor.wrapAsync(pg_query);
