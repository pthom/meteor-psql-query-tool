///<reference path="../../typings/webix/webix.d.ts"/>
///<reference path="../../lib/HtmlElementIdProvider.ts" />
///<reference path="../../lib/ArrayUtils.ts" />
///<reference path="../lib/HelpPopup.ts" />
///<reference path="./QueryParam.ts" />
///<reference path="SqlWidgetsCollectionController" />

module SqlWidgets {

    export class SqlWidgetController_Base {

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
            var result =
            {
                view: "form",
                borderless: true,
                elementsConfig: {
                    labelPosition: "top"
                },
                id: this.idProvider.Id("formRun"),
                elements: [ this.ViewDefinition_RunMode_Element() ]
            };
            return result;
        }

        ViewDefinition_RunMode_Element() {
            return {};
        }

        TransformQuery(query:string) : string {
            //return query;
            var form = <webix.ui.form>$$(this.idProvider.Id("formRun"));
            var params = form.getValues();
            return this.TransformQueryWithParams(query, params);
        }

        TransformQueryWithParams(query:string, params:any) {
            return query;
        }
    }

}
