//declare var webix;


function PutSqlDataIntoTable(data, table)
{
  //debugger;
  table.clearAll();

  columnConfig = [];

  for (idx = 0; idx < data.fields.length; ++idx) {
    var field = data.fields[idx];
    var colname = field.name;
    columnConfig.push({id:colname, header:colname, sort:"string", adjust:"data"});
  }

  table.refreshColumns(columnConfig);
  table.parse(data.rows);

}

function MakeWebixUi_Queries() {
  var querytable = {
    //container:'webix_queries_div',
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
            PutSqlDataIntoTable(data, $$('queryresulttable'));
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
    container: 'webix_queries_div',
    rows: [toolbar, querytable, queryForm]
  };

  var webixContainer = webix.ui(panel);
  // The problem with mixing Webix components and non-Webix HTML markup is that Webix UI components won't resize
  // automatically if you place them in an HTML container. You have to resize them manually, like below.
  // Read more at http://forum.webix.com/discussion/comment/3650/#Comment_3650.
  webix.event(window, 'resize', function() {
    webixContainer.resize();
  });

  // http://docs.webix.com/desktop__data_binding.html
  $$('queryForm').bind($$('querytable'));

}


function MakeWebixUi_QueryResult() {
  var queryresulttable = {
    view: 'datatable',
    container: 'webix_queryresult_div',
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
  var webixContainer = webix.ui(queryresulttable);
  // The problem with mixing Webix components and non-Webix HTML markup is that Webix UI components won't resize
  // automatically if you place them in an HTML container. You have to resize them manually, like below.
  // Read more at http://forum.webix.com/discussion/comment/3650/#Comment_3650.
  webix.event(window, 'resize', function() {
    webixContainer.resize();
  });
}


Meteor.startup(function() {
  MakeWebixUi_Queries();
  MakeWebixUi_QueryResult();
});
