//Magic ! ShowQueryResults function is called automatically
//whenever ServerSession.get("QueryResult") changes !
function ShowQueryResults() {
  var data = ServerSession.get("QueryResult");
  if (! data)
    return;
  var widget = $$('queryresulttable');
  if ( !  widget )
    return;
  populate_datatable_psql_results(data, widget);
}

Tracker.autorun(ShowQueryResults);


function ShowSpinningWheelDuringQueries() {
  if (ServerSession.get("QueryRunning"))
    SpinningWheel.show();
  else
  SpinningWheel.hide();
}
Tracker.autorun(ShowSpinningWheelDuringQueries);
