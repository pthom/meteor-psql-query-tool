query_list_view = {
  ui_definition: function() {

    var styleTag = "width:100px;text-align:center;font-style:italic;float:right;background-color:#888;color:white;border-radius:3px;";

    var querytable = {
      view: 'list',
      id: 'querytable',
      gravity: 0.2,
      template:"#name# <div style='" + styleTag + "'>#tags#</div>",
      select: true,
      sortable: true,
      url: webix.proxy('meteor', Queries),
      save: webix.proxy('meteor', Queries) // Mongo.Collection
    };

    var addquery_button = {
      view: "button",
      type:"icon",
      icon:"plus-circle",
      label:"Add",
      click: function() {
        //var row = $$('querytable').add({name:'',query:''});
        var row = $$('querytable').add({name:'Edit me...', params:[]});
        $$('querytable').select(row);
        $$('querytable').editCell(row, 'name');
      }
    };

    var removequery_button =
    {
      view: "button",
      type:"icon",
      icon:"trash-o",
      label:"Remove",
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

    var editquery_button =
    {
      view: "button",
      type:"icon",
      icon:"code",
      label: 'Edit',
      align:"right",
      click: function() {
        var id = $$('querytable').getSelectedId();
        if (id) {
          $$('query_edit_view').show();
          query_edit_view.onShow();
        }
        else
          webix.message('Please select a query');
      }
    };


    var toolbarQueryList = {
      view: 'toolbar',
      cols: [
        {view:"label", label:"Query list"},
        {gravity: 1},
        editquery_button,
        addquery_button,
        removequery_button,
      ]
    };

    var runquery =  function() {
      var query = $$('querytable').getSelectedItem().query;
      var controller = currentSqlWidgetsCollectionController;
      var queryTransformed = currentSqlWidgetsCollectionController.TransformQuery(query);
      Meteor.call("runPostgresqlQuery", queryTransformed);
      SpinningWheel.show();
    };

    var runquery_button = {
      view: "button",
      type:"icon",
      icon:"filter",
      label:"Run",
      click : function() { runquery(); }
    };

    var toolbarQueryRun = {
      view: 'toolbar',
      cols: [
        {
          view:"label",
          label:"Query Params"
        },
        {gravity:1},
        runquery_button
        ]
    };

    var sqlParamsWidget = {
      view: "form",
      data: {params:[]},
      id: "sqlParamsWidget_form",
      rows: [
        { view: "SqlWidgetCollection_View_RunMode", name: "params"},
        { cols: [{gravity : 2}, { view:"button", type:"form", label:"Search", click : function() { runquery(); }  }] }
      ]
    };

    var panelQuery = {
      view: 'layout',
      gravity:1,
      rows: [toolbarQueryList, querytable]
    };
    var panelParams = {
      view: 'layout',
      gravity:2,
      rows: [toolbarQueryRun, sqlParamsWidget]
    };

    var panelComplete = {
      cols:[
        panelQuery,
        {view:'resizer'},
        panelParams]
    };

    return panelComplete;
  },

  do_bind : function() {
    var client = $$("sqlParamsWidget_form");
    var master = $$("querytable");
    client.bind(master);
  }
};
