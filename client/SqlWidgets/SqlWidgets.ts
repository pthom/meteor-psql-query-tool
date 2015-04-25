///<reference path="../../typings/webix/webix.d.ts"/>
///<reference path="../../lib/ArrayUtils.ts" />
///<reference path="../../lib/HtmlElementIdProvider.ts" />
///<reference path="../../lib/date_expressive.ts" />
///<reference path="../lib/HelpPopup.ts" />
///<reference path="../lib/ResponsiveHelper.ts" />

module SqlWidgets {


  export class QueryParam {
    label:string;
    sql_tag:string;
    type:string;
    default:string;

    constructor() {
      this.label = "Edit label...";
      this.sql_tag = "";
      this.type = "";
      this.default = "";
    }
  }


  class SqlWidgetController_Base {

    modelQueryParam_EditMode:QueryParam;
    idProvider:HtmlElementIdProvider;
    parentSqlWidgetsCollection:SqlWidgetsCollectionController;


    constructor(params:QueryParam, parentSqlWidgetsCollection) {
      this.modelQueryParam_EditMode = params;
      this.idProvider = new HtmlElementIdProvider();
      this.parentSqlWidgetsCollection = parentSqlWidgetsCollection;
    }

    GetFormValues_EditMode():QueryParam {
      var form = <webix.ui.form>$$(this.idProvider.Id("formEdit"));
      var result = <QueryParam>form.getValues();
      return result;
    }

    UpdateModel_EditMode() {
      this.modelQueryParam_EditMode = this.GetFormValues_EditMode();
    }

    ViewDefinition_EditMode():any {
      var controller = this;

      var toolbar = {
        maxWidth : 50,
        borderless : true,
        rows: [
          {
            view: 'icon',
            type:"iconButton",
            icon:"arrow-up",
            click: () => {
              controller.UpdateModel_EditMode();
              this.parentSqlWidgetsCollection.sqlWidgetsControllers.moveUp(this);
              this.parentSqlWidgetsCollection.RefreshView_EditMode();
            }
          },
          {
            view: 'icon',
            //type:"iconButton",
            icon:"trash",
            click: () => {
              webix.confirm(
                "Are you sure to remove this parameter ?",
                function onConfirm(userConfirmation) {
                  if (userConfirmation) {
                    controller.UpdateModel_EditMode();
                    this.parentSqlWidgetsCollection.sqlWidgetsControllers.removeByValue(this);
                    this.parentSqlWidgetsCollection.RefreshView_EditMode();
                  }
              }.bind(this));
            }
          },
          {
            view: 'icon',
            type:"iconButton",
            icon:"arrow-down",
            click: () => {
              controller.UpdateModel_EditMode();
              this.parentSqlWidgetsCollection.sqlWidgetsControllers.moveDown(this);
              this.parentSqlWidgetsCollection.RefreshView_EditMode();
            }
          }
        ]
      };

      var widgetLabelName = "Widget " + this.modelQueryParam_EditMode.type;
      var helpPopup = new HelpPopup(this.Help_EditMode(), widgetLabelName);

      var stdFields =
      {
        view: "form",
        borderless : true,
        id: this.idProvider.Id("formEdit"),
        elementsConfig: {
          labelPosition: "top"
        },
        data: this.modelQueryParam_EditMode,
        elements: [
          {
            cols: [
              {view: "text", label: "Label", name: 'label'},
              {view: "text", label: "Sql Tag", name: 'sql_tag'},
              {view: "text", label: "Default value", name: 'default'},
                helpPopup.HelpButton()
            ]
          },
          this.SpecificViewDefinition_EditMode()
        ]
      };



      var result =
      {
        borderless : true,
        rows: [
          { view: "template", template: widgetLabelName, type: "section" },
          {
            cols:[stdFields, toolbar]
          }
        ]
      };


      return result;
    }

    Help_EditMode():string {
      return "";
    }

    SpecificViewDefinition_EditMode():any {
      return {};
    }


    ViewDefinition_RunMode():any {
      return {};
    }
  }


  class SqlWidgetController_Text extends SqlWidgetController_Base {
    ViewDefinition_RunMode():any {
      return {
        view: "text",
        label: this.modelQueryParam_EditMode.label,
        value: this.modelQueryParam_EditMode.default,
        maxHeight:30,
        inputHeight:30,
        inputWidth:300,
        minWidth:300,
        labelWidth:150
      };
    }

    Help_EditMode():string {
      var help =
            "A simple text search field. <br/>"
          + "If you have a query like <br/><pre>"
          + "select * from orders\n where\n TRUE\n AND shipname like '%_shipname_%'"
          + "</pre><br/>"
          + "Then add a parameter with '_shipname_' as Sql Tag";
      return help;
    }

  }


  class SqlWidgetController_Date extends SqlWidgetController_Base {
    ViewDefinition_RunMode():any {
      var date;
      try {
        date = DateExpressive.date_expressive(this.modelQueryParam_EditMode.default);
      }
      catch(e) {
        console.log("Can not parse date " + this.modelQueryParam_EditMode.default);
        date = DateExpressive.today_00AM();
      }
      var result =
      {
        view: "datepicker", label: this.modelQueryParam_EditMode.label,
        value: date,
        maxHeight:30,
        inputHeight:30,
        inputWidth:300,
        minWidth:300,
        labelWidth:150
      };
      return result;
    }

    Help_EditMode():string {
      var help =
          "Default date can be expressed expressively, such as <br/>" +
          "<em>now - 1d</em> (now minus 1 day), <em>now + 3m</em> (now + 3 months), <em>now - 2y</em> (now minus 2 years), <br/>" +
          "<em>this_monday</em>, <em>next_monday</em> (this_monday is today or in the past) , <br/>" +
          "<em>this_tuesday + 1m</em>, <em>last_wednesday + 1y</em> <br/>" +
          "<em>last_year - 2d </em>, <em>this_month</em>,  <em>next_month</em><br/>" +
          "<br/>" +
          "<b>(Spaces around '+' and '-' are required)</b>";
      return help;
    }
  }

  class SqlWidgetController_Bool extends SqlWidgetController_Base {
    ViewDefinition_RunMode():any {
      var result =
      { view:"radio",
        label:this.modelQueryParam_EditMode.label,
        labelWidth:150,
        minWidth:300,
        name:"bool_choice",
        value:this.modelQueryParam_EditMode.default,
        options:[
          { id:"all", value:"All" },
          { id:"yes", value:"Yes" },
          { id:"no", value:"No" }
        ]
      };

      return result;
    }

    Help_EditMode():string {
      var help =
          "A tri-state bool field. <br/>"
          + "Usage : write a query like <br/><pre>"
          + "SELECT * FROM products\n WHERE\nTRUE\n AND _discontinued_"
          + "</pre><br/>"
          + "add a bool parameter with '_discontinued_' as 'Sql Tag' <br/>"
          + "add 'discontinued' as 'Sql Field' <br/>"
          + "<br/>"
          + "The query will be then executed as :<br/>"
          + "<pre>"
          + "SELECT * FROM products\n WHERE\nTRUE\n AND discontinued=true"
          + "</pre><br>"
          + "or<br>"
          + "<pre>"
          + "SELECT * FROM products\n WHERE\nTRUE\n AND discontinued=false"
          + "</pre><br>"
          + "or<br>"
          + "<pre>"
          + "SELECT * FROM products\n WHERE\nTRUE\n AND TRUE"
          + "</pre><br>"
          + "Notes :<br>"
          + "If Type is set to '0 or 1', then 0 or 1 values will be used instead of true / false values.<br/>"
          + "Default value can be one of : all / yes / no"
      ;
      return help;
    }

    SpecificViewDefinition_EditMode():any {
      var result =
      {
        cols: [
          {view: "text", label: "Sql Field", name: 'sqlfield'},
          {view:"radio", label:"Type", name:"bool_type",  value:"bool", options:[
            { id:"bool", value:"Boolean" },
            { id:"int", value:"0 or 1" }
          ]}
        ]
      };
      return result;
    }

  }

  function SqlWidgetFactory(params:QueryParam, sqlWidgetsCollection:SqlWidgetsCollectionController):SqlWidgetController_Base {
    if (params.type === "text") {
      return new SqlWidgetController_Text(params, sqlWidgetsCollection);
    }
    else if (params.type === "date") {
      return new SqlWidgetController_Date(params, sqlWidgetsCollection);
    }
    else if (params.type === "bool") {
      return new SqlWidgetController_Bool(params, sqlWidgetsCollection);
    }
    return null;
  }


  export class SqlWidgetsCollectionController {
    sqlWidgetsControllers:Array<SqlWidgetController_Base>;
    idProvider:HtmlElementIdProvider;


    constructor(paramsList:Array<QueryParam>) {
      this.idProvider = new HtmlElementIdProvider()
      this.SetParams(paramsList);
    }


    MainLayout_EditMode() : webix.ui.baselayout {
      var layout = <webix.ui.baselayout>$$(this.idProvider.Id("View_EditMode"));
      return layout;
    }

    SetParams(paramsList:Array<QueryParam>) {
      this.sqlWidgetsControllers = [];
      if (paramsList) {
        paramsList.forEach(params => {
          this.sqlWidgetsControllers.push(SqlWidgetFactory(params, this));
        });
      }
    }


    ViewDefinition_EditMode() {

      var result =
      {
        view: 'layout',
        borderless : true,
        //container:"webix_content",
        id: this.idProvider.Id("View_EditMode"),
        //scrollable:true,
        //minWidth:'4000px',
        rows: [
          {
            borderless : true,
            view: "toolbar",
            cols: [
              {view: 'label', label: 'Query Params', gravity: 1.5},
              {
                view: 'button', label: 'Add Date Param', click: () => {
                this.UpdateModel_EditMode();
                this.AddParam_EditMode('date');
              }
              },
              {
                view: 'button', label: 'Add Text Param', click: () => {
                this.UpdateModel_EditMode();
                this.AddParam_EditMode('text');
              }
              },
              {
                view: 'button', label: 'Add Bool Param', click: () => {
                this.UpdateModel_EditMode();
                this.AddParam_EditMode('bool');
              }
              },
              {
                view: 'button', label: 'Values', click: () => {
                this.UpdateModel_EditMode();
                alert(JSON.stringify(this.GetModel_EditMode(), null, 2))
              }
              },
            ]
          },
          {
            view:"scrollview",
            id: this.idProvider.Id('widgetEditList'),
            body:{
              rows: this.ViewDefinition_EditMode_WidgetsList()
            }
          }
        ]
      };
      return result;
    }

    private ViewDefinition_EditMode_WidgetsList() {
      var widgetsList = [];
      this.sqlWidgetsControllers.forEach((widget) => {
        widgetsList.push(widget.ViewDefinition_EditMode())
      });
      return widgetsList;
    }

    RefreshView_EditMode() {
      var parentElement = <webix.ui.scrollview>$$(this.idProvider.Id('widgetEditList'));
      if (parentElement)
        webix.ui(this.ViewDefinition_EditMode_WidgetsList(), parentElement.getBody());
    }

    AddParam_EditMode(type:string) {
      var sqlParam = new QueryParam();
      sqlParam.type = type;
      var widgetController = SqlWidgetFactory(sqlParam, this);
      this.sqlWidgetsControllers.push(widgetController);
      this.RefreshView_EditMode();
    }


    UpdateModel_EditMode() {
      this.sqlWidgetsControllers.forEach(widget => {
        widget.UpdateModel_EditMode()
      });
    }

    GetModel_EditMode() {
      var result = [];
      this.sqlWidgetsControllers.forEach((widget) => {
        result.push(widget.modelQueryParam_EditMode)
      });
      return result;
    }


    ViewDefinition_RunMode() {

      var responsiveWidgetsColumns = ResponsiveHelper.MakeResponsiveRow(
          this.ViewDefinition_RunMode_WidgetsList(),
          this.idProvider.Id("View_RunMode_Content"));

      var result =
      {
        view: 'form',
        borderless:true,
        id: this.idProvider.Id("View_RunMode"),
        elements: [ responsiveWidgetsColumns ]
      };
      return result;
    }

    RefreshView_RunMode() {
      var parentElement = <webix.ui.scrollview>$$(this.idProvider.Id('View_RunMode_Content'));
      if (parentElement)
        webix.ui(this.ViewDefinition_RunMode_WidgetsList(), parentElement);
    }


    MainLayout_RunMode() : webix.ui.baselayout {
      var layout = <webix.ui.baselayout>$$(this.idProvider.Id("View_RunMode"));
      return layout;
    }

    private ViewDefinition_RunMode_WidgetsList() {
      var widgetsList = [];
      this.sqlWidgetsControllers.forEach((widget) => {
        widgetsList.push(widget.ViewDefinition_RunMode())
      });
      return widgetsList;
    }

  }

  var sqlQuery = "\
select * from orders\
where\
TRUE\
AND shipname like '%_shipname_%'\
AND orderdate > '_min_order_date_'\
AND orderdate < '_max_order_date_'\
AND freight > _minfreight\
-- Plus bool param\
";


}