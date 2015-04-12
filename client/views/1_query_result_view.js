//Note about file names : meteor includes files automatically in the following order
// - files in subfolders first
// - then alphabetical order
// This filename begins with a 1 so that it is loaded before others

query_result_view = {

  ui_definition : function() {

    var queryresulttable = {
      view: 'datatable',
      id: 'queryresulttable',
      gravity:2,
      autoConfig: true, // infer columns from data
      select: true,
      sortable: true,
      editable: true,
      resizeColumn: true,
      scrollX:true,
      scrollY:true,
      //autowidth:false,
      //maxWidth:600,
      data: [ {content : "goes", here:"yes"} ]
    };
    return queryresulttable;
  }
};
