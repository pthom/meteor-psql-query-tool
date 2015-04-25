
module SqlWidgets
{
    export class QueryParam {
        label:string;
        sql_tag:string;
        type:string;
        default:string;

        constructor() {
            this.label = "Edit label...";
            this.sql_tag = "";
            this.type = "";
            this.default = "";
        }
    }

}
