query_list_view = {

  selected_query_name : function() {
    var id = $$('querytable').getSelectedId();
    var query = Queries.findOne({_id: id});
    var result = query["name"];
    return result;
  },

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
      save: webix.proxy('meteor', Queries),
      on: {
        'onAfterSelect' : function UpdateLabelQueryHeading(){
          var labelElement = $$("LabelQueryHeading");
          labelElement.config.label = query_list_view.selected_query_name();
          labelElement.refresh();
        }
      }
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

    var clonequery_button =
    {
      view: "button",
      type:"icon",
      icon:"clipboard",
      label: 'Clone',
      click: function() {
        var id = $$('querytable').getSelectedId();
        if (id) {
          var src_query = Queries.findOne({_id:id});
          var dst_query = src_query;
          delete dst_query["_id"];
          dst_query["name"] = dst_query["name"] + " - Copy";
          Queries.insert(dst_query, function afterInsert(err, id){
            $$('querytable').select(id);
          });
        }
        else
          webix.message('Please select a query');
      }
    };

    var toolbarQueryList = {
      view: 'toolbar',
      cols: [
        {view:"label", label:"Query list"},
        {gravity: 0.5},
        editquery_button,
        addquery_button,
        clonequery_button,
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
          label:"Query Params",
          id: "LabelQueryHeading",
          name : "name"
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
      gravity:1.5,
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
