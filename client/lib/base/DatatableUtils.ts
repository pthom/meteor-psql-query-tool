///<reference path="../../../typings/webix/webix.d.ts" />
///<reference path="../../../lib/base/DateExpressive.ts" />


//Helper function in order to populate a datatable with psql results
module DatatableUtils {


  export function PopulateWithSqlResult(data:any, table:webix.ui.datatable) {
    table.clearAll();

    var columnConfig = [];

    for (var idx = 0; idx < data.fields.length; ++idx) {
      var field = data.fields[idx];
      var colname = field.name;
      columnConfig.push({id: colname, header: colname, sort: "string", adjust: "data"});
    }

    table.refreshColumns(columnConfig);

    var rows_DateShortened = shortenDates(data.rows);
    table.parse(rows_DateShortened, "json");

  };

  function isDate(obj) {
    return Object.prototype.toString.call(obj) === '[object Date]';
  }

  function shortenDates(rows:Array<any>) {
    var newRows = [];

    rows.forEach((row) => {
      var newRow = {};
      for (var key in row) {
        if (isDate(row[key])) {
          newRow[key] = DateExpressive.dateToSqlString(row[key]);
        }
        else {
          newRow[key] = row[key];
        }
      }
      newRows.push(newRow);
    });

    return newRows;
  }
}