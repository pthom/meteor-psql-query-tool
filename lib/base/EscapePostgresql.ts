module Postgres {

    export function EscapePostgresql(s)
    {
        var escaped = s;
        escaped = escaped.replace(/\\/g, "\\\\")
        escaped = escaped.replace(/'/g, "''")
        return escaped;
    }

    //var str = "Hello\\you\\how\\are you I don't know you''' ";
    //var str2 = EscapePostgresql(str);
    //assert(str2=== "Hello\\you\\how\\are you I don''t know you'''''' ");
}
