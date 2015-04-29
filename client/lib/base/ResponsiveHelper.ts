///<reference path="../../../typings/webix/webix.d.ts" />
///<reference path="../../../lib/base/HtmlElementIdProvider.ts" />

class ResponsiveHelper {
    static MakeResponsiveRow( widgetsArray : any, elementId?:string ) {
        var idProvider = new IdProvider();
        var responsiveColId = elementId ? elementId : idProvider.Id("responsive_col");
        var ui =
        {
            id: idProvider.Id("responsive_row"),
            type:"space",
            rows: [
                {
                    type:"space",
                    id: responsiveColId,
                    cols:widgetsArray,
                    responsive:idProvider.Id("responsive_row")
                }
            ]
        };
        return ui;
    }
}


