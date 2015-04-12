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

    var json_data = [
              {title:"My Fair Lady", year:1964, votes:533848, rating:8.9, rank:5},
            {title:"Apocalypse now", year:1979, votes:2533848, rating:8.5, rank:47}
          ];

    var jsoneditor_wx_test = {
      view:"jsoneditor_wx",
      container: "webix_content",
      id:'ed',
      height: 600,
      width:304,
      json:json_data
    };

    var result = {
      container: "webix_content",
      //rows: [ query_list_view.ui_definition(), query_result_view.ui_definition(), jsoneditor_wx_test ],
      rows: [ query_list_view.ui_definition(), query_result_view.ui_definition(), jsoneditor_wx_test ],
    };
    return result;

    //return jsoneditor_wx_test;
  }
};
