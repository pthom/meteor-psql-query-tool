///<reference path="./SqlWidgets.ts"/>
///<reference path="../../typings/webix/webix.d.ts"/>

declare var currentSqlWidgetsCollectionController;

webix.protoUI({

    name: "SqlWidgetCollection_View_RunMode",
    sqlWidgetsCollectionController:new  SqlWidgets.SqlWidgetsCollectionController([]),

    setupUi : function() {
        webix.ui( this.sqlWidgetsCollectionController.ViewDefinition_RunMode(), this.$view );
        this.sqlWidgetsCollectionController.RefreshView_RunMode();
    },


    $init: function(config) {
        currentSqlWidgetsCollectionController = this.sqlWidgetsCollectionController;
        this.$view.className = "SqlWidgetCollection_View_RunMode";
        this.setupUi();
    },

    getValue : function() {
        //console.log("getValue SqlWidgetCollection_View_RunMode => not implemented!");
        return [];
    },

    setValue : function(value) {
        //console.log("setvalue " + JSON.stringify(value));
        this.sqlWidgetsCollectionController.SetParams(value);
        this.sqlWidgetsCollectionController.RefreshView_RunMode();
    },

    getController : function() {
        return this.sqlWidgetsCollectionController;
    },

    /*
     The returning array contains 5 sizes of the components:
     min width
     max width
     min height
     max height
     gravity
     */
    $getSize : function() {
        return [200, 2000, 50, 2000, 1];
    },

    $setSize:function(x,y){
        if (webix.ui.view.prototype.$setSize.call(this,x,y)) {
            //console.log("setSize " + x+","+y);
            var layout  = this.sqlWidgetsCollectionController.MainLayout_RunMode();

            layout.config.height = y;
            layout.config.width = x;
            layout.resize();
            layout.resizeChildren();
        }
    }

    }, webix.ui.view, webix.DataValue);

