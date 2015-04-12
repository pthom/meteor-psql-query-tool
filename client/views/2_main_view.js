//Note about file names : meteor includes files automatically in the following order
// - files in subfolders first
// - then alphabetical order
// This filename begins with a 2 so that it is loaded after 1s


main_view = {
  on_document_ready : function() {
    query_edit_view.on_document_ready();
  },

  ui_definition: function() {
    /*
    var result = {
      container: "webix_content",
      view: "tabview",
      cells: [
        {
          header: "Run Queries",
          body: query_result_view.ui_definition(),
        },
        {
          header: "Definie Queries",
          body: query_edit_view.ui_definition(),
        }
      ]
    };
    */

    var result = {
      container: "webix_content",
      //rows: [ query_list_view.ui_definition(), query_result_view.ui_definition(), jsoneditor_wx_test ],
      rows: [ query_list_view.ui_definition(), query_result_view.ui_definition() ],
    };
    return result;
  }
};
