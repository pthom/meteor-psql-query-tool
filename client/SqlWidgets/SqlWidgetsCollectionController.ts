///<reference path="SqlWidgetController_Base.ts" />
///<reference path="SqlWidgetFactory.ts" />
///<reference path="../lib/ResponsiveHelper.ts" />

module SqlWidgets {
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
            /*
            var responsiveWidgetsColumns = ResponsiveHelper.MakeResponsiveRow(
                this.ViewDefinition_RunMode_WidgetsList(),
                this.idProvider.Id("View_RunMode_Content"));
                */

            var result =
            {
                view: 'form',
                borderless:true,
                id: this.idProvider.Id("View_RunMode_Content"),
                elements: [ this.ViewDefinition_RunMode_WidgetsList() ]
            };
            return result;
        }

        RefreshView_RunMode() {
            var parentElement = <webix.ui.scrollview>$$(this.idProvider.Id('View_RunMode_Content'));
            if (parentElement)
                webix.ui(this.ViewDefinition_RunMode_WidgetsList(), parentElement);
        }


        MainLayout_RunMode() : webix.ui.baselayout {
            var layout = <webix.ui.baselayout>$$(this.idProvider.Id("View_RunMode_Content"));
            return layout;
        }

        private ViewDefinition_RunMode_WidgetsList() {
            var widgetsList = [];
            this.sqlWidgetsControllers.forEach((widget) => {
                widgetsList.push(widget.ViewDefinition_RunMode())
            });
            return widgetsList;
        }

        TransformQuery(query:string) : string {
            var queryTransformed = query;
            this.sqlWidgetsControllers.forEach(widget => {
                queryTransformed = widget.TransformQuery(queryTransformed);
            });
            return queryTransformed;
        }
    }

}