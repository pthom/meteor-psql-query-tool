
/*
widget_sql = function(params) {
  var that = this; //crockford's

  this.params = params;

};

widget_sql.prototype.ui_definition = function() {
  return "";
};


widget_sql.prototype.getValue = function() {
  return "";
};
*/
/*
select * from orders
where
TRUE
AND shipname like '%_shipname_%'
AND orderdate > '_min_order_date_'
AND orderdate < '_max_order_date_'
AND freight > _minfreight
-- Plus bool param

{
  "params": [
    {
      "label": "Ship Name",
      "sql_tag": "shipname",
      "type": "text",
      "size": 20,
      "default": ""
    },
    {
      "label": "Order Date Min",
      "sql_tag": "min_order_date",
      "type": "date",
      "default": "now() - 365d",
      "time":true
    },
    {
      "label": "Order Date Max",
      "sql_tag": "max_order_date",
      "type": "date",
      "default": "now()",
      "time":false
    },
    {
      "label": "Freight price Min",
      "sql_tag": "min_freight",
      "type": "float",
      "default": "0"
    },
    {
      "label": "Delivered",
      "sql_tag": "is_delivevered",
      "type": "bool",
      "default": "true"
    }
  ]
}
*/



///<reference path="../../typings/webix/webix.d.ts"/>
///<reference path="lib/ArrayUtils.ts" />
///<reference path="lib/HtmlElementIdProvider.ts" />

class QueryParam {
  label:string;
  sql_tag : string;
  type : string;
  default : string;

  specifics: any;

  constructor() {
    this.label = "Edit label...";
    this.sql_tag = "";
    this.type = "";
    this.default = "";
    this.specifics = {};
  }
}


class SqlWidgetController_Base {

  queryParams : QueryParam;
  idProvider : HtmlElementIdProvider;
  parentSqlWidgetsCollection : SqlWidgetsCollection;


  constructor(params:QueryParam, parentSqlWidgetsCollection) {
    this.queryParams = params;
    this.idProvider = new HtmlElementIdProvider();
    this.parentSqlWidgetsCollection = parentSqlWidgetsCollection;
  }

  GetFormEditValues() : QueryParam {
    var form = <webix.ui.form>$$(this.idProvider.Id("formEdit"));
    var result = <QueryParam>form.getValues();
    return result;
  }
  UpdateQueryParams() {
    this.queryParams = this.GetFormEditValues();
  }

  GuiDefinition_Edit() : any{
    var toolbar =         {
      id: this.idProvider.Id("GuiEdit"),
      view: 'toolbar',
      cols: [
        {
          view:'label',
          label: 'Widget ' + this.queryParams.type,
          gravity:6
        },
        {
          view:'button',
          label: 'remove',
          click: () => {
            this.parentSqlWidgetsCollection.widgetsControllers.removeByValue(this);
            this.parentSqlWidgetsCollection.ShowEditWidgets();
          }
        },
        {
          view:'button',
          label:'Move Up',
          click: () => {
            this.parentSqlWidgetsCollection.widgetsControllers.moveUp(this);
            this.parentSqlWidgetsCollection.ShowEditWidgets();
          }
        },
        {
          view:'button',
          label:'Move Down',
          click: () => {
            this.parentSqlWidgetsCollection.widgetsControllers.moveDown(this);
            this.parentSqlWidgetsCollection.ShowEditWidgets();
          }
        }
      ]
    };

    var parent = this;

    var onModified = {
      'onKeyPress': function() {
        parent.queryParams = <QueryParam>parent.GetFormEditValues();
      }
    };

    /*
     label:string;
     sql_tag : string;
     type : string;
     default : string;
     */
    var stdFields =
    {
      view:"form",
      id:this.idProvider.Id("formEdit"),
      elementsConfig:{
        labelPosition:"top"
      },
      data: this.queryParams,
      elements:[
        { cols: [
          { view:"text", label:"Label", name:'label', on:onModified},
          { view:"text", label:"Sql Tag", name: 'sql_tag', on:onModified},
          { view:"text", label:"Default value", name:'default', on:onModified},
        ]},
      ]
    };

    var result =
    {
      rows : [
        toolbar,
        stdFields,
        this.SpecificGuiDefinition_Edit()
      ]
    };

    return result;
  }

  SpecificGuiDefinition_Edit() : any {
    return {};
  }

  GuiDefinition_Use() : any {
    var result =
    {
      id: this.idProvider.Id("GuiUse"),
      view:'label',
      label: 'widget_' + this.queryParams.type
    };
    return result;
  }
  getValue() : string {
    return "";
  }
}


class SqlWidgetController_Text extends SqlWidgetController_Base {
}

class SqlWidgetController_Date extends SqlWidgetController_Base {
 }

class SqlWidgetController_Bool extends SqlWidgetController_Base {
}

function SqlWidgetFactory(params : QueryParam, sqlWidgetsCollection:SqlWidgetsCollection) : SqlWidgetController_Base {
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


class SqlWidgetsCollection {
  widgetsControllers : Array<SqlWidgetController_Base>;
  idProvider : HtmlElementIdProvider;


  constructor(sql_query : string, paramsList : Array<QueryParam>){
    this.idProvider = new HtmlElementIdProvider();
    this.widgetsControllers = [];

    paramsList.forEach( params => {
      this.widgetsControllers.push(SqlWidgetFactory(params, this));
    });
  }


  GuiDefinition_Edit() {

    var result =
    {
      view:'layout',
      container:"webix_content",
      id: this.idProvider.Id("GuiEdit"),
      scrollable:true,
      rows:
          [
            {
              view:"toolbar",
                cols: [
                        { view : 'label', label:'Query Params', gravity:1.5},
                        { view : 'button', label:'Add Date Param', click: () => { this.AddEditParam('date');} },
                        { view : 'button', label:'Add Text Param', click: () => { this.AddEditParam('text');} },
                        { view : 'button', label:'Add Bool Param', click: () => { this.AddEditParam('bool');} },
                        { view : 'button', label:'Values', click: () => { alert(JSON.stringify(this.GetFormEditValues(), null, 2)) } },
                      ]
            },
            {
              id: this.idProvider.Id('widgetEditList'),
              rows:this.GuiDefinition_WidgetEditList()
            }
          ]
    };
    return result;
  }

  GetFormEditValues() {
    var result= [];
    this.widgetsControllers.forEach( (widget) => { result.push( widget.GetFormEditValues() ) } );
    return result;
  }

  GuiDefinition_Use() {
    var result =
    {
      view:'layout',
      id: this.idProvider.Id("GuiUse"),
      rows:
          [
          ]
    };
    return result;
  }

  GetSqlQuery() : string {
    return "";
  }

  private GuiDefinition_WidgetEditList() {
    var widgetsList = [];
    this.widgetsControllers.forEach( (widget) => { widgetsList.push(widget.GuiDefinition_Edit()) } );
    return widgetsList;
  }

  ShowEditWidgets() {
    var parentElement = $$(this.idProvider.Id('widgetEditList'));
    webix.ui(this.GuiDefinition_WidgetEditList()  , parentElement);
  }


  AddEditParam(type:string){
    var sqlParam = new QueryParam();
    sqlParam.type = type;
    var widgetController = SqlWidgetFactory(sqlParam, this);
    this.widgetsControllers.push(widgetController);
    this.ShowEditWidgets();
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

declare var TestSqlWidgets;
TestSqlWidgets = function(){
  var sqlWidgetsCollection = new SqlWidgetsCollection(sqlQuery, []);
  webix.ui(sqlWidgetsCollection.GuiDefinition_Edit());
};
