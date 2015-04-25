///<reference path="../../typings/webix/webix.d.ts"/>
///<reference path="../lib/HelpPopup.ts" />

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

    var helpPopup = new HelpPopup("This is help, <b>do read it</b>", "this is title");
    var ui = {
        container: "webix_content",
        rows:[
            helpPopup.HelpButton()
        ]
    };
    webix.ui(ui);

    /*
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
    */



};