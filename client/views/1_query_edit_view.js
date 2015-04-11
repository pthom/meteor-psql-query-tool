//Note about file names : meteor includes files automatically in the following order
// - files in subfolders first
// - then alphabetical order
// This filename begins with a 1 so that it is loaded before others

query_edit_view = {

  on_document_ready : function() {
    // http://docs.webix.com/desktop__data_binding.html
    $$('queryForm').bind($$('querytable'));
  },

  ui_definition : function() {

    var querytable = {
      view: 'datatable',
      id: 'querytable',
      autoConfig: true, // infer columns from data
      columnWidth:500,
      select: true,
      sortable: true,
      editable: true,
      editaction: 'dblclick',
      resizeColumn: true,
      url: webix.proxy('meteor', Queries), // <-- this is it!
      save: webix.proxy('meteor', Queries) // Mongo.Collection
    };

    var toolbar = {
      view: 'toolbar',
      elements: [{
        view: 'label',
        label: 'Queries list'
      }, {
        view: 'button',
        value: 'Add',
        width: 100,
        click: function() {
          //var row = $$('querytable').add({name:'',query:''});
          var row = $$('querytable').add({});
          $$('querytable').editCell(row, 'name');
        }
      }, {
        view: 'button',
        value: 'Remove',
        width: 100,
        click: function() {
          var id = $$('querytable').getSelectedId();
          if (id)
            $$('querytable').remove(id);
          else
            webix.message('Please select a row to delete');
        }
      }]
    };

    var queryForm = {
      gravity:1,
      view: 'form',
      id: 'queryForm',
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


    var panel = {
      view: 'layout',
      autoheight:true,
      
      rows: [toolbar, querytable, queryForm]
    };

    return panel;
  },


};
