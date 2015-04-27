///<reference path="SqlWidgetsCollection_View_EditMode.ts" />
///<reference path="SqlWidgetsCollection_View_RunMode.ts" />

module SqlWidgets {

    export function InitSqlWidgets() {
        SqlWidgets.SqlWidgetsCollection_View_EditMode_Init();
        SqlWidgets.SqlWidgetsCollection_View_RunMode_Init();
    }
}