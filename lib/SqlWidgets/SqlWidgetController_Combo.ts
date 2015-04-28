///<reference path="SqlWidgetController_Base.ts" />

declare var query_list_view;

module SqlWidgets {

    export class SqlWidgetController_Combo extends SqlWidgetController_Base {
        ViewDefinition_RunMode_Element():any {
            var combo =
            { view:"combo",
                label:this.modelQueryParam_EditMode.label,
                labelWidth:150,
                inputWidth:260,
                maxWidth:260,
                id:this.idProvider.Id("comboChoice"),
                name:"comboChoice",
                value:this.modelQueryParam_EditMode.default,
                options:"/ComboQuery/" + query_list_view.selected_query()._id + "/5" //Donner un id aux widgets !!!
            };

            var eraser =
            {
                view:"button",
                icon:"eraser",
                type:"iconButton",
                gravity:0.1,
                maxWidth:40,
                minWidth:40,
                click : () => {
                    var combo = <webix.ui.combo>$$(this.idProvider.Id("comboChoice"));
                    combo.setValue("");
                }
            };

            var result ={cols:[combo, eraser], width:300, maxWidth:300};
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
                    "A combo box based on a query. <br/>"
                    + "Usage : write a query like <br/><pre>"
                    + "SELECT * FROM products\n WHERE\nTRUE\n AND _supplierid_"
                    + "</pre><br/>"
                    + "add a combo parameter with '_supplierid_' as 'Sql Tag' <br/>"
                    + "add 'supplierid' as 'Sql Field' <br/>"
                    + "add 'SELECT supplierid, companyname FROM suppliers ORDER BY companyname' as 'Combo Query' <br/>"

                    + "<br/>"
                    + "The query will be then executed as :<br/>"
                    + "<pre>"
                    + "SELECT * FROM products\n WHERE\nTRUE\n AND supplierid=xxx"
                    + "</pre><br>"
                    + "or<br>"
                    + "<pre>"
                    + "SELECT * FROM products\n WHERE\nTRUE\n AND TRUE"
                    + "</pre><br>"
                    + "<br/>"
                    + "Note:<br/>"
                    + "The 'Combo Query' shall return two fields : the first is the Id that will be used (and it will not be shown)<br/>"
                    + "The second is what will be shown in the combo box"
                ;
            return help;
        }

        SpecificViewDefinition_EditMode():any {
            var result =
            {
                cols: [
                    {view: "text", label: "Sql Field", name: 'sqlfield'},
                    {view: "text", label: "Combo Query", name: 'ComboQuery'},
                ]
            };
            return result;
        }

    }

}
