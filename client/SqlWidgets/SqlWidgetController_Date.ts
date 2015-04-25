///<reference path="../../lib/date_expressive.ts" />
///<reference path="SqlWidgetController_Base.ts" />

module SqlWidgets {

    export class SqlWidgetController_Date extends SqlWidgetController_Base {
        ViewDefinition_RunMode_Element():any {
            var date;
            try {
                date = DateExpressive.date_expressive(this.modelQueryParam_EditMode.default);
            }
            catch(e) {
                console.log("Can not parse date " + this.modelQueryParam_EditMode.default);
                date = DateExpressive.today_00AM();
            }
            var result =
            {
                view: "datepicker", label: this.modelQueryParam_EditMode.label,
                value: date,
                name: "value",
                maxHeight:30,
                inputHeight:30,
                inputWidth:150,
                minWidth:150,
                labelWidth:150
            };
            return result;
        }

        TransformQueryWithParams(query:string, params:any) {
            var date = params.value ? <Date>params.value : DateExpressive.today_00AM();
            var date_sqlstring = DateExpressive.dateToSqlString(date);

            query = query.replace(this.modelQueryParam_EditMode.sql_tag, date_sqlstring);
            return query;
        }


        Help_EditMode():string {
            var help =
                "Default date can be expressed expressively, such as <br/>" +
                "<em>now - 1d</em> (now minus 1 day), <em>now + 3m</em> (now + 3 months), <em>now - 2y</em> (now minus 2 years), <br/>" +
                "<em>this_monday</em>, <em>next_monday</em> (this_monday is today or in the past) , <br/>" +
                "<em>this_tuesday + 1m</em>, <em>last_wednesday + 1y</em> <br/>" +
                "<em>last_year - 2d </em>, <em>this_month</em>,  <em>next_month</em><br/>" +
                "<br/>" +
                "<b>(Spaces around '+' and '-' are required)</b>";
            return help;
        }
    }

}
