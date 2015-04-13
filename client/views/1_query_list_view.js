query_list_view = {
  ui_definition: function() {

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

    var addquery_button = {
      view: 'button',
      value: 'Add',
      width: 100,
      click: function() {
        //var row = $$('querytable').add({name:'',query:''});
        var row = $$('querytable').add({name:'Edit me...', params:'{}'});
        $$('querytable').editCell(row, 'name');
      }
    };

    var removequery_button =
    {
      view: 'button',
      value: 'Remove',
      width: 100,
      click: function() {
        var id = $$('querytable').getSelectedId();
        if (id) {
          webix.confirm({
            title: "Please confirm",
            text: "Are you sure to remove this query ?",
            callback: function onConfirm(userConfirmation) {
              if (userConfirmation) {
                $$('querytable').remove(id);
              }
            }
          });
        }
        else
          webix.message('Please select a query to delete');
      }
    };

    var runquery_button = {
        view: 'button',
        label: 'Run',
        width:150,
        click: function() {
          var sql = $$('querytable').getSelectedItem().query;
          //alert("Run : " + sql);
          Meteor.call("runPostgresqlQuery", sql);
          SpinningWheel.show();
        },
    };

    var editquery_button =
    {
      view: 'button',
      value: 'Edit',
      width: 100,
      click: function() {
        var id = $$('querytable').getSelectedId();
        if (id) {
          $$('query_edit_view').show();
          query_edit_view.copyToEditor(true); //true <=> setNullOnError
        }
        else
          webix.message('Please select a query');
      }
    };


    var toolbar = {
      view: 'toolbar',
      elements: [
        runquery_button,
        editquery_button,
        addquery_button,
        removequery_button,
      ]
    };

    var panel = {
      view: 'layout',
      autoheight:true,
      height:'40%',

      rows: [querytable, toolbar]
    };

    return panel;

  }
};
