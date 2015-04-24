///<reference path="../../typings/webix/webix.d.ts"/>
///<reference path="lib/ArrayUtils.ts" />
///<reference path="lib/HtmlElementIdProvider.ts" />
///<reference path="lib/date_expressive.ts" />

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
        id: this.idProvider.Id("View_EditMode"),
        view: 'toolbar',
        cols: [
          {
            view: 'label',
            label: 'Widget ' + this.modelQueryParam_EditMode.type,
            gravity: 6
          },
          {
            view: 'button',
            label: 'remove',
            click: () => {
              controller.UpdateModel_EditMode();
              this.parentSqlWidgetsCollection.sqlWidgetsControllers.removeByValue(this);
              this.parentSqlWidgetsCollection.RefreshView_EditMode();
            }
          },
          {
            view: 'button',
            label: 'Move Up',
            click: () => {
              controller.UpdateModel_EditMode();
              this.parentSqlWidgetsCollection.sqlWidgetsControllers.moveUp(this);
              this.parentSqlWidgetsCollection.RefreshView_EditMode();
            }
          },
          {
            view: 'button',
            label: 'Move Down',
            click: () => {
              controller.UpdateModel_EditMode();
              this.parentSqlWidgetsCollection.sqlWidgetsControllers.moveDown(this);
              this.parentSqlWidgetsCollection.RefreshView_EditMode();
            }
          }
        ]
      };


      var stdFields =
      {
        view: "form",
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
            ]
          },
          this.SpecificViewDefinition_EditMode()
        ]
      };

      var result =
      {
        rows: [
          toolbar,
          stdFields,
        ]
      };

      return result;
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
      return {view: "text", label: this.modelQueryParam_EditMode.label, value: this.modelQueryParam_EditMode.default};
    }
  }


  class SqlWidgetController_Date extends SqlWidgetController_Base {
    ViewDefinition_RunMode():any {
      var result =
      {
        view: "datepicker", label: this.modelQueryParam_EditMode.label,
        value: DateExpressive.date_expressive(this.modelQueryParam_EditMode.default)
      };
      return result;
    }

    SpecificViewDefinition_EditMode():any {
      var help =
          "<font size=-1>" +
          "Default date can be expressed expressively, such as :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
          "<em>now - 1d</em> (now minus 1 day), <em>now + 3m</em> (now + 3 months), <em>now - 2y</em> (now minus 2 years), <br/>" +
          "<em>this_monday</em>, <em>next_monday</em> (this_monday is today or in the past) , <em>this_tuesday + 1m</em>, <em>last_wednesday + 1y</em> <br/>" +
          "<em>last_year - 2d </em>, <em>this_month</em>,  <em>next_month</em>" +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>(Spaces around '+' and '-' are required)</b>" +
          "</font>";
      var result =
      {
        view: "template", template: help, height: 80
      }
      return result;
    }
  }

  class SqlWidgetController_Bool extends SqlWidgetController_Base {
    ViewDefinition_RunMode():any {
      var result =
      {
        view: "checkbox", label: this.modelQueryParam_EditMode.label,
        value: this.modelQueryParam_EditMode.default
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


    layout_EditMode() : webix.ui.baselayout {
      var layout = <webix.ui.baselayout>$$(this.idProvider.Id("View_EditMode"));
      return layout;
    }

    SetParams(paramsList:Array<QueryParam>) {
      this.sqlWidgetsControllers = [];

      paramsList.forEach(params => {
        this.sqlWidgetsControllers.push(SqlWidgetFactory(params, this));
      });
    }


    ViewDefinition_EditMode() {

      var result =
      {
        view: 'layout',
        //container:"webix_content",
        id: this.idProvider.Id("View_EditMode"),
        //scrollable:true,
        //minWidth:'4000px',
        rows: [
          {
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
      var result =
      {
        view: 'form',
        container: "webix_content",
        id: this.idProvider.Id("View_RunMode"),
        scrollable: true,
        rows: this.ViewDefinition_RunMode_WidgetsList()
      };
      return result;
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