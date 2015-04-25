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
      value: 'Export as CSV',
      width: 100,
      click: function() {
      }
    };

    var nbresults = { view:'label', label:'Results : 0', id:'query_nb_results'};

    var toolbar = {
      view: 'toolbar',
      elements: [
        exportjson_button,
        exportcsv_button,
        nbresults
      ]
    };



    var panel = {
      view: 'layout',
      autoheight:true,
      gravity:2,
      rows: [queryresulttable, toolbar]
    };

    return panel;
  }
};
