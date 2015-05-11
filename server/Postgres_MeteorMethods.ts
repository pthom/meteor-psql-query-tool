/// <reference path="../typings/typescript-libs/all-definitions.d.ts" />
/// <reference path="../lib/collections.ts" />
/// <reference path="Postgres/PostgresWrapper.ts" />
///<reference path="../lib/SqlWidgets/SqlWidgetsCollectionController.ts" />

console.log("Load server.js");

declare var ServerSession;


function DoRunQuery(sql_query) {
  ServerSession.set("QueryError", null);
  ServerSession.set("QueryRunning", "true");
  console.log("DoRunQuery : " + sql_query.replace(/\n/g, " "));

  try {
    //Query_WrapAsync and uses Fiber and can be used as a sync function (although it is not)
    var result  = PostgresWrapper.Query_WrapAsync(sql_query);
    ServerSession.set("QueryResult", result);
    ServerSession.set("QueryRunning", false);
  }
  catch(e) {
    console.log("Caught query error");
    ServerSession.set("QueryError", "Error during query, please consult server logs for more details");
    ServerSession.set("QueryRunning", false);
  }
}

Meteor.methods({
    runPostgresqlQuery: function(sql_query) {
      if ( ! Roles.userIsInRole(Meteor.userId(), ['manage-queries']) ) {
        console.log("runPostgresqlQuery ==> only accessible for user with role 'manage-queries' ")
        ServerSession.set("QueryError", "not authorized !");
        ServerSession.set("QueryRunning", false);
        return;
        //throw new Meteor.Error("not-authorized");
      }
      DoRunQuery(sql_query);
    },

    runStoredQuery : function(query_id, paramsRunMode) {
      var query = Queries.findOne({_id:query_id});
      if (query) {
        var sql = query.query;
        var paramsEditMode = query.params;
        //console.log("runStoredQuery ");
        //console.log("paramEditMode = " + JSON.stringify(paramsEditMode));
        //console.log("paramRunMode = " + JSON.stringify(paramsRunMode));
        var sqlWidgetsCollectionController = new SqlWidgets.SqlWidgetsCollectionController(paramsEditMode);
        var sqlTransformed = sqlWidgetsCollectionController.TransformQuery(sql, paramsRunMode);
        DoRunQuery(sqlTransformed);
      }
    }
});
