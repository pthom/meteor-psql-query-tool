///<reference path="SqlWidgetController_Base.ts" />

declare var query_list_view;

module SqlWidgets {

    export class SqlWidgetController_Combo extends SqlWidgetController_Base {
        ViewDefinition_RunMode_Element():any {
            var comboParams = <any>this.modelQueryParam_EditMode;

            var comboOptions;
            if (comboParams.UseFixedList) {
                try {
                    comboOptions = JSON.parse(comboParams.FixedList);
                }
                catch(e) {
                    alert("Can not parse JSON for fixed query :" + comboParams.FixedList);
                    comboOptions = [];
                }
            }
            else {
                comboOptions = "/ComboQuery/" + query_list_view.selected_query()._id + "/" + comboParams._id;
            }

            var combo =
            { view:"combo",
                label:this.modelQueryParam_EditMode.label,
                labelWidth:150,
                inputWidth:260,
                maxWidth:260,
                id:this.idProvider.Id("comboChoice"),
                name:"comboChoice",
                value:this.modelQueryParam_EditMode.default,
                options:comboOptions
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

            var result ={
                css:"form-stacked",
                cols:[combo, eraser],
                width:300, maxWidth:300
            };
            return result;
        }

        TransformQueryWithParams(query:string, params:any) {
            var comboChoice = params.comboChoice;
            if (comboChoice === "")
                comboChoice = null;
            var comboParams = <any>this.modelQueryParam_EditMode;
            if (comboChoice) {
                if (comboParams.IsIdString)
                    comboChoice= "'" + comboChoice + "'";
            }

            var replace  = "";
            if (comboChoice)
                replace = comboParams.sqlfield + " = " + comboChoice;
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
                    + "1) add a combo parameter with '_supplierid_' as 'Sql Tag' <br/><br/>"
                    + "2) add 'supplierid' as 'Sql Field' <br/><br/>"
                    + "3) Either<br/>"
                    + "&nbsp;&nbsp&nbsp;i) Add a sql query in the 'Combo Query' field, such as <pre>SELECT supplierid as id, companyname as value FROM suppliers<br/> ORDER BY companyname</pre>"
                    + "Note:<br/>"
                    + "The 'Combo Query' shall return two columns : "
                    + "the first is the Id that will be used, and it shall be named 'id',"
                    + "the second is what will be shown in the combo box, and it shall be named 'value'<br/><br/>"
                    + "&nbsp;&nbsp&nbsp;ii) Or check 'Use Fixed List' and enter a fixed list such as<br/>"
                    + '[{ "id":1, "value":"Supplier 1"}, { "id":2, "value":"Supplier 2"}, { "id":3, "value":"Supplier 3"}]'
                    + "(make sure it is valid JSON !)<br/>"
                    + "<br/>"
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
                ;
            return help;
        }

        SpecificViewDefinition_EditMode():any {
            var row1 =
            {
                cols: [
                    {view: "text", label: "Sql Field", name: 'sqlfield'},
                    {view: "checkbox", gravity:0.2, label: "Id is string ?", name: 'IsIdString'},
                ]
            };
            var row2 = {
                cols: [
                    {view: "text", label: "Combo Query", name: 'ComboQuery'},
                ]
            }
            var row3 = {
                cols: [
                    {view: "text", label: "Fixed List", name: 'FixedList'},
                    {view: "checkbox", gravity:0.2, label: "Use fixed list ?", name: 'UseFixedList'},
                ]
            }
            var result = { rows:[row1, row2, row3]};
            return result;
        }

    }

}
