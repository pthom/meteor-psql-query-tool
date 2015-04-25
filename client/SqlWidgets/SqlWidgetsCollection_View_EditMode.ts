///<reference path="./SqlWidgets.ts"/>
///<reference path="../../typings/webix/webix.d.ts"/>


webix.protoUI({

    name: "SqlWidgetCollection_View_EditMode",
    sqlWidgetsCollectionController:new  SqlWidgets.SqlWidgetsCollectionController([]),

    setupUi : function() {
        webix.ui( this.sqlWidgetsCollectionController.ViewDefinition_EditMode(), this.$view );
        this.sqlWidgetsCollectionController.RefreshView_EditMode();
    },


    $init: function(config) {
        this.$view.className = "SqlWidgetCollection_View_EditMode";
        this.setupUi();
    },

    getValue : function() {
        this.sqlWidgetsCollectionController.UpdateModel_EditMode();
        return this.sqlWidgetsCollectionController.GetModel_EditMode();
    },

    setValue : function(value) {
        this.sqlWidgetsCollectionController.SetParams(value);
        this.sqlWidgetsCollectionController.RefreshView_EditMode();
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
        return [200, 2000, 200, 2000, 1];
    },

    $setSize:function(x,y){
        if (webix.ui.view.prototype.$setSize.call(this,x,y)) {

            var layout  = this.sqlWidgetsCollectionController.MainLayout_EditMode();

            layout.config.height = y;
            layout.config.width = x;
            layout.resize();
            layout.resizeChildren();
        }
    }

    }, webix.ui.view, webix.DataValue);

