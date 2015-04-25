///<reference path="../../typings/webix/webix.d.ts"/>

declare var TestSqlWidgets;

TestSqlWidgets = function () {
    var paramsList = [
        {
            "label": "Date Prod",
            "sql_tag": "date_prod",
            "type": "date",
            "default": "now - 3y"
        },
        {
            "label": "Company",
            "sql_tag": "company",
            "type": "text",
            "default": ""
        },
        {
            "label": "Product",
            "sql_tag": "product",
            "type": "text",
            "default": ""
        }
    ];


    //var sqlWidgetsCollectionController = new SqlWidgetsCollectionController(paramsList);
    //var ui = { view:"form", container:"webix_content", id:"myform", elements:[ sqlWidgetsCollectionController.ViewDefinition_EditMode() ]};
    //webix.ui( ui );

    //webix.ui(sqlWidgetsCollectionController.ViewDefinition_RunMode());

    var data = {zorro: paramsList};
    var ui = {
        view: "form",
        data: data,
        container: "webix_content",
        id: "myform",
        //elements: [{view: "SqlWidgetCollection_View_EditMode", name: "zorro"}]
        elements: [{view: "SqlWidgetCollection_View_RunMode", name: "zorro"}]
    };
    webix.ui(ui);

};