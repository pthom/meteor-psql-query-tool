///<reference path="./SqlWidgets.ts"/>
///<reference path="../../typings/webix/webix.d.ts"/>

//declare var webix.ui.view;

webix.protoUI({

    name: "sqlwidgets_wx",
    sqlWidgetsCollection:new  SqlWidgets.SqlWidgetsCollectionController([]),

    setupUi : function() {
        webix.ui( this.sqlWidgetsCollection.ViewDefinition_EditMode(), this.$view );
        this.sqlWidgetsCollection.RefreshView_EditMode();
    },


    $init: function(config) {
        this.$view.className = "sqlwidgets_wx";
        this.setupUi();
    },

    getValue : function() {
        return this.sqlWidgetsCollection.GetModel_EditMode();
    },

    setValue : function(value) {
        var params = [];
        if (typeof(value) == "string") {
            try {
                params = JSON.parse(value);
            }
            catch(e) {
                params = [];
            }
        }
        else if (typeof(value) == "object")
            params = value;

        this.sqlWidgetsCollection.SetParams(params);
        this.sqlWidgetsCollection.RefreshView_EditMode();
    }

}, webix.ui.view, webix.DataValue);

