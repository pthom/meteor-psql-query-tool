var Queries_Filtered;

function UpdateQueries_Filtered() {
  var tag = Session.get("QueryTagSearch");
  if (Session.get("Queries_LimitToTag"))
    tag = Session.get("Queries_LimitToTag");

  Queries_Filtered = Queries.find({tags: new RegExp(tag)});
  var querytable = $$("querytable");
  if (querytable) {
    querytable.clearAll();
    querytable.load(webix.proxy("meteor", Queries_Filtered));
  }
}
Tracker.autorun(UpdateQueries_Filtered);

function ShowHideToolbarEditQuery() {
  var userId = Meteor.userId();
  var canManageQueries = Roles.userIsInRole(Meteor.userId(), "manage-queries");
  console.log("userId = " + userId);
  console.log("canManageQueries = " + canManageQueries);
  var toolbar = $$("toolbarEditQuery");
  if (toolbar) {
    if ( ! canManageQueries)
      toolbar.hide();
    else
      toolbar.show();
  }
}
Tracker.autorun(ShowHideToolbarEditQuery);

query_list_view = {

  selected_query : function() {
    var id = $$('querytable').getSelectedId();
    var query = Queries.findOne({_id: id});
    return query;
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
      //url: webix.proxy('meteor', Queries_Filtered),
      save: webix.proxy('meteor', Queries),
      on: {
        'onAfterSelect' : function UpdateLabelQueryHeading(){

          ShowHideToolbarEditQuery();

          var labelElement = $$("LabelQueryHeading");
          labelElement.config.label = query_list_view.selected_query().name;
          labelElement.refresh();

          var commentElement = /*<webux.ui.template>*/$$("CurrentQueryComments");
          commentElement.setHTML(query_list_view.selected_query().comment);
        }
      }
    };

    var querySearchPanel = {
      type:"clear",
      cols:[
        { view:"combo", id:"QueryTagSearch", options:"/tags", yCount:10, label: "Filter", editable:false,
          on: {
            onChange : function() {
              var filter = $$("QueryTagSearch").getValue();
              Session.set("QueryTagSearch", filter);
            }
          }
        },
        {
          view:"button",
          icon:"eraser",
          type:"iconButton",
          width:40,
          click : function() {
            $$("QueryTagSearch").setValue("");
            Session.set("QueryTagSearch", "");
          }
        }
      ]
    };

    var queryTablePanel;
    if (Session.get("Queries_LimitToTag"))
      queryTablePanel = querytable;
    else {
      queryTablePanel = {
        rows: [
          Session.get("Queries_LimitToTag") ? {cols: []} : querySearchPanel,
          querytable
        ]
      }
    }


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

    var toolbarEditQuery = {
      id : "toolbarEditQuery",
      hidden:true,
      cols:[
        editquery_button,
        addquery_button,
        clonequery_button,
        removequery_button
      ]
    };

    var toolbarQueryList = {
      view: 'toolbar',
      cols: [
        {view:"label", label:"Queries", gravity:0.3},
        //{gravity: 0.1},
        toolbarEditQuery
      ]
    };



    var runquery =  function() {
      var queryId = $$('querytable').getSelectedItem().id;
      /*
      var controller = currentSqlWidgetsCollectionController;
      var queryTransformed = currentSqlWidgetsCollectionController.TransformQuery(query);
      Meteor.call("runPostgresqlQuery", queryTransformed);
      */

      var params_RunMode = currentSqlWidgetsCollectionController.GetFormValues_RunMode();
      Meteor.call("runStoredQuery", queryId, params_RunMode);
      SpinningWheel.show();
    };

    var toolbarQueryRun = {
      view: 'toolbar',
      cols: [
        {
          view:"label",
          label:"Query Params",
          id: "LabelQueryHeading",
          name : "name"
        }
        ]
    };

    var sqlParamsWidget_form = {
      view: "form",
      data: {params:[]},
      id: "sqlParamsWidget_form",
      rows: [
        { view: "SqlWidgetCollection_View_RunMode", name: "params"},
        { cols: [{gravity : 2}, { view:"button", type:"form", label:"Search", click : function() { runquery(); }  }] }
      ]
    };

    var sqlParamsWidget = {
      cols:[
        sqlParamsWidget_form,
        {id:"CurrentQueryComments", gravity:0.3, view: "template", template: "", borderless:true, type: "body"},
      ]
    };



    var panelQuery = {
      view: 'layout',
      gravity:1,
      rows: [toolbarQueryList, queryTablePanel]
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
