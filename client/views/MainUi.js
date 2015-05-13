
var webixMainUi = null;
var webixQueryEditWindow = null;
var webix_json_export_view = null;

function DestroyWebixView(view) {
  for (var i = 0; i < view.getChildViews().length; i++) {
    DestroyWebixView(view.getChildViews[i]);
    view.destructor();
  }
}

function CleanPreviousUi() {
  if (webixMainUi) {
    DestroyWebixView(webixMainUi);
    webixMainUi = null;
  }
  if (webixQueryEditWindow) {
    DestroyWebixView(webixQueryEditWindow);
    webixQueryEditWindow = null;
  }
  if (webix_json_export_view) {
    DestroyWebixView(webix_json_export_view);
    webix_json_export_view = null;
  }
}


MainUi = function() {
  //debugger;
  CleanPreviousUi();

  var ui_def = main_view.ui_definition();
  webixMainUi = webix.ui(ui_def, webixMainUi);

  // The problem with mixing Webix components and non-Webix HTML markup is that Webix UI components won't resize
  // automatically if you place them in an HTML container. You have to resize them manually, like below.
  // Read more at http://forum.webix.com/discussion/comment/3650/#Comment_3650.
  webix.event(window, 'resize', function() {
    webixMainUi.resize();
  });
  webixQueryEditWindow = webix.ui(query_edit_view.ui_definition());
  webix_json_export_view = webix.ui(json_export_view.ui_definition());
  query_list_view.do_bind();
  main_view.on_document_ready();

}

