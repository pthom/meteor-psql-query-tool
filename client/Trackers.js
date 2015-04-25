//Magic ! ShowQueryResults function is called automatically
//whenever ServerSession.get("QueryResult") changes !
function ShowQueryResults() {
  var data = ServerSession.get("QueryResult");
  if (! data)
    return;
  var widget = $$('queryresulttable');
  if ( !  widget )
    return;
  DatatableUtils.PopulateWithSqlResult(data, widget);
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
    webix.alert("Query error : " + error);
}
Tracker.autorun(AlertQueryError);
