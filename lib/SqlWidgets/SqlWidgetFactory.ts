///<reference path="SqlWidgetController_Base.ts" />
///<reference path="SqlWidgetController_Bool.ts" />
///<reference path="SqlWidgetController_Date.ts" />
///<reference path="SqlWidgetController_Text.ts" />
///<reference path="SqlWidgetController_Combo.ts" />


module SqlWidgets {
    export function SqlWidgetFactory(params:QueryParam, sqlWidgetsCollection:SqlWidgetsCollectionController):SqlWidgetController_Base {
        if (params.type === "text") {
            return new SqlWidgetController_Text(params, sqlWidgetsCollection);
        }
        else if (params.type === "date") {
            return new SqlWidgetController_Date(params, sqlWidgetsCollection);
        }
        else if (params.type === "bool") {
            return new SqlWidgetController_Bool(params, sqlWidgetsCollection);
        }
        else if (params.type === "combo") {
            return new SqlWidgetController_Combo(params, sqlWidgetsCollection);
        }
        return null;
    }

}
