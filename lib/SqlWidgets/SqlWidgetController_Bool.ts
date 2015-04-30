///<reference path="SqlWidgetController_Base.ts" />

module SqlWidgets {

    export class SqlWidgetController_Bool extends SqlWidgetController_Base {
        ViewDefinition_RunMode_Element():any {
            var result =
            { view:"radio",
                label:this.modelQueryParam_EditMode.label,
                labelWidth:150,
                minWidth:150,
                name:"bool_choice",
                css: "form-stacked",
                value:this.modelQueryParam_EditMode.default,
                options:[
                    { id:"all", value:"All" },
                    { id:"yes", value:"Yes" },
                    { id:"no", value:"No" }
                ]
            };

            return result;
        }

        TransformQueryWithParams(query:string, params:any) {
            var bool_choice = params.bool_choice ? params.bool_choice : "All";
            if (bool_choice === "")
                bool_choice = "All";
            var boolParams = <any>this.modelQueryParam_EditMode;

            var bool_or_int = (value : boolean) : string => {
                if (boolParams.bool_type === "int") {
                    if (value)
                        return "1";
                    else
                        return "0";
                }
                else {
                    if (value)
                        return "TRUE";
                    else
                        return "FALSE";
                }
            };

            var replace  = "";
            if (bool_choice == "yes")
                replace = boolParams.sqlfield + " = " + bool_or_int(true);
            else if (bool_choice == "no")
                replace = boolParams.sqlfield + " = " + bool_or_int(false);
            else
                replace = "TRUE";

            var queryTransformed = query.replace(this.modelQueryParam_EditMode.sql_tag, replace);
            return queryTransformed;
        }

        Help_EditMode():string {
            var help =
                    "A tri-state bool field. <br/>"
                    + "Usage : write a query like <br/><pre>"
                    + "SELECT * FROM products\n WHERE\nTRUE\n AND _discontinued_"
                    + "</pre><br/>"
                    + "add a bool parameter with '_discontinued_' as 'Sql Tag' <br/>"
                    + "add 'discontinued' as 'Sql Field' <br/>"
                    + "<br/>"
                    + "The query will be then executed as :<br/>"
                    + "<pre>"
                    + "SELECT * FROM products\n WHERE\nTRUE\n AND discontinued=true"
                    + "</pre><br>"
                    + "or<br>"
                    + "<pre>"
                    + "SELECT * FROM products\n WHERE\nTRUE\n AND discontinued=false"
                    + "</pre><br>"
                    + "or<br>"
                    + "<pre>"
                    + "SELECT * FROM products\n WHERE\nTRUE\n AND TRUE"
                    + "</pre><br>"
                    + "Notes :<br>"
                    + "If Type is set to '0 or 1', then 0 or 1 values will be used instead of true / false values.<br/>"
                    + "Default value can be one of : all / yes / no"
                ;
            return help;
        }

        SpecificViewDefinition_EditMode():any {
            var result =
            {
                cols: [
                    {view: "text", label: "Sql Field", name: 'sqlfield'},
                    {view:"radio", label:"Type", name:"bool_type",  value:"bool", options:[
                        { id:"bool", value:"Boolean" },
                        { id:"int", value:"0 or 1" }
                    ]}
                ]
            };
            return result;
        }

    }

}
