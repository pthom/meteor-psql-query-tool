///<reference path="./SqlWidgetController_Base.ts" />
///<reference path="../base/EscapePostgresql.ts" />

module SqlWidgets {

    export class SqlWidgetController_Text extends SqlWidgetController_Base {
        ViewDefinition_RunMode_Element():any {
            return {
                view: "text",
                name: "value",
                label: this.modelQueryParam_EditMode.label,
                value: this.modelQueryParam_EditMode.default,
                css: "form-stacked",
                maxHeight:30,
                inputHeight:30,
                inputWidth:300,
                minWidth:150,
                labelWidth:150
            };
        }

        TransformQueryWithParams(query:string, params:any) {
            var replace = params.value ? params.value : "";
            //EscapePostgresql is called server-side, in order to protect from javascript kiddies
            replace = Postgres.EscapePostgresql(replace);
            query = query.replace(this.modelQueryParam_EditMode.sql_tag, replace);
            return query;
        }

        Help_EditMode():string {
            var help =
                "A simple text search field. <br/>"
                + "If you have a query like <br/><pre>"
                + "select * from orders\n where\n TRUE\n AND shipname like '%_shipname_%'"
                + "</pre><br/>"
                + "Then add a parameter with '_shipname_' as Sql Tag";
            return help;
        }

    }

}
