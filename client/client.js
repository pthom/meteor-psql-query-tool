


function SetupUi() {
  if ( ! Meteor.userId())
    return;

  var ui_def = main_view.ui_definition();
  var webixContainer = webix.ui(ui_def);
  // The problem with mixing Webix components and non-Webix HTML markup is that Webix UI components won't resize
  // automatically if you place them in an HTML container. You have to resize them manually, like below.
  // Read more at http://forum.webix.com/discussion/comment/3650/#Comment_3650.
  webix.event(window, 'resize', function() {
    webixContainer.resize();
  });

  webix.ui(query_edit_view.ui_definition());  
}

Accounts.onLogin(function() {
  SetupUi();
});

Accounts.onLogout(function() {
  window.location.reload(false);
});

Meteor.startup(function() {
  SetupUi();

  main_view.on_document_ready();
});
