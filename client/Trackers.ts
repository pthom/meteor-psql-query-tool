/// <reference path="../packages/typescript-libs/meteor.d.ts" />
/// <reference path="../typings/webix/webix.d.ts" />
/// <reference path="lib/DatatableUtils.ts" />

declare var SpinningWheel;
declare var ServerSession;
declare var Tracker;

//Magic ! ShowQueryResults function is called automatically
//whenever ServerSession.get("QueryResult") changes !
function ShowQueryResults() {
  var data = ServerSession.get("QueryResult");
  if (! data)
    return;
  var widget = <webix.ui.datatable>$$('queryresulttable');
  if ( !  widget )
    return;
  DatatableUtils.PopulateWithSqlResult(data, widget);

  var widgetNbResult = <webix.ui.label>$$("query_nb_results");
  widgetNbResult.config.label = "Results : " + data.rows.length;
  widgetNbResult.refresh();
}

Tracker.autorun(ShowQueryResults);


function ShowSpinningWheelDuringQueries() {
  if (ServerSession.get("QueryRunning"))
    SpinningWheel.show();
  else
    SpinningWheel.hide();
}
Tracker.autorun(ShowSpinningWheelDuringQueries);

function AlertQueryError() {
  var error = ServerSession.get("QueryError");
  if ( error )
    webix.alert("Query error : " + error, () => { });
}
Tracker.autorun(AlertQueryError);
