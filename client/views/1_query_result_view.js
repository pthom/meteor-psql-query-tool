//Note about file names : meteor includes files automatically in the following order
// - files in subfolders first
// - then alphabetical order
// This filename begins with a 1 so that it is loaded before others

query_result_view = {

  ui_definition : function() {

    var queryresulttable = {
      view: 'datatable',
      id: 'queryresulttable',
      autoConfig: true, // infer columns from data
      select: true,
      sortable: true,
      editable: true,
      resizeColumn: true,
      scrollX:true,
      scrollY:true,
      //autowidth:false,
      //maxWidth:600,
      data: [ {content : "goes", here:"yes"} ]
    };

    var exportjson_button =
    {
      view: 'button',
      value: 'Show as Json',
      width: 100,
      click: function() {
        $$("json_export_view").show();
      }
    };

    var exportcsv_button =
    {
      view: 'button',
      value: 'CSV ,',
      width: 100,
      click: function() {
        var data = ServerSession.get("QueryResult");
        var csv = JsonToCsv_Comma(data.rows);
        var filename = query_list_view.selected_query_name();
        DownloadCsv(csv, filename);
      }
    };
    var exportcsv2_button =
    {
      view: 'button',
      value: 'CSV ;',
      width: 100,
      click: function() {
        var data = ServerSession.get("QueryResult");
        var csv = JsonToCsv_Semicolon(data.rows);
        var filename = query_list_view.selected_query_name();
        DownloadCsv(csv, filename);
      }
    };

    var nbresults = { view:'label', label:'Results : 0', id:'query_nb_results'};

    var toolbar = {
      view: 'toolbar',
      elements: [
        nbresults,
        {gravity:3},
        exportjson_button,
        exportcsv_button,
        exportcsv2_button
      ]
    };



    var panel = {
      view: 'layout',
      autoheight:true,
      gravity:2,
      rows: [toolbar, queryresulttable]
    };

    return panel;
  }
};
