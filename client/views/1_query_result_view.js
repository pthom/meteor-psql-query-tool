//Note about file names : meteor includes files automatically in the following order
// - files in subfolders first
// - then alphabetical order
// This filename begins with a 1 so that it is loaded before others

query_result_view = {

  ui_definition : function() {
/*
    var queryList = {
      view: 'form',
      id: 'queryList',
      elements: [{
        view: 'text',
        name: 'name',
        label: 'Query Name'
      }, {
        view: 'text',
        name: 'query',
        label: 'Query SQL'
      }, {
        view: 'layout',
        cols: [{
            view: 'button',
            label: 'Run',
            click: function() {
              var sql = $$('querytable').getSelectedItem().query;
              //alert("Run : " + sql);
              Meteor.call("runPostgresqlQuery", sql);
              var data = ServerSession.get("QueryResult");
              populate_datatable_psql_results(data, $$('queryresulttable'));
            },
          },
          {
            view: 'button',
            label: 'Save',
            type: 'form', // a Submit button; 'form' is an odd type name for buttons - http://docs.webix.com/api__ui.button_type_config.html#comment-1863007844
            click: function() {
              this.getFormView().save();
              this.getFormView().clear();
            },
          },
        ]
      }]
    };
*/


    var queryresulttable = {
      view: 'datatable',
      id: 'queryresulttable',
      gravity:2,
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
    return queryresulttable;
  }
};
