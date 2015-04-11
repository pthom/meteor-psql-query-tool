//Helper function in order to populate a datatable with psql results
populate_datatable_psql_results = function(data, table)
{
  table.clearAll();

  columnConfig = [];

  for (idx = 0; idx < data.fields.length; ++idx) {
    var field = data.fields[idx];
    var colname = field.name;
    columnConfig.push({id:colname, header:colname, sort:"string", adjust:"data"});
  }

  table.refreshColumns(columnConfig);
  table.parse(data.rows);

};
