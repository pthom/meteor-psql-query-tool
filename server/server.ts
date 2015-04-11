/// <reference path="../packages/typescript-libs/all-definitions.d.ts" />
/// <reference path="../lib/collections.ts" />

console.log("Load server.js");

declare var ServerSession;

Meteor.methods({
    runPostgresqlQuery: function(sql_query) {
        if (! Meteor.userId()) {
          throw new Meteor.Error("not-authorized");
        }
        console.log("runPostgresqlQuery : " + sql_query);
        //pg_query is async, but pg_query_wrapAsync is sync,
        //and uses futures ()
        var result  = pg_query_wrapAsync(sql_query);
        ServerSession.set("QueryResult", result);
    }
});
