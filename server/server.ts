/// <reference path="../packages/typescript-libs/all-definitions.d.ts" />
/// <reference path="../lib/collections.ts" />

console.log("Load server.js");

declare var ServerSession;

Meteor.methods({
    addQuery: function() {
        Queries.insert({
            name: "New Query",
            query: "",
        });
    },
    deleteQuery: function(id) {
        Queries.remove(id);
    },
    saveQuery: function(id, name, query) {
        Queries.update(id, {
            $set: {
                name: name,
                query: query
            }
        });
    },

    //this will update the Meteor|Mongo.Collection PsqlResult
    runPostgresqlQuery: function(sql_query) {
        console.log("runPostgresqlQuery : " + sql_query);
        //pg_query is async, but pg_query_wrapAsync is sync,
        //and uses futures ()
        var result  = pg_query_wrapAsync(sql_query);
        ServerSession.set("QueryResult", result);
    }
});
