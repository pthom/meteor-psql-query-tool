//Note about file names : meteor includes files automatically in the following order
// - files in subfolders first
// - then alphabetical order
// This filename begins with a 1 so that it is loaded before others

query_edit_view = {

  on_document_ready : function() {
    // http://docs.webix.com/desktop__data_binding.html
    $$('queryForm').bind($$('querytable'));
  },

  onShow: function() {
  },


  ui_definition : function() {

    var savequery_button =
    {
      view: 'button',
      label: 'Save',
      maxWidth:150,
      //type: 'form', // a Submit button; 'form' is an odd type name for buttons - http://docs.webix.com/api__ui.button_type_config.html#comment-1863007844
      click: function() {
        var formValues = $$("queryForm").getValues();
        $$("queryForm").save();

        //La sauvegarde est immédiate, mais comme on s'en aperçoit pas, on affiche un spin wheel
        //pour faire comprendre que c'est bon...
        SpinningWheel.show();
        setTimeout(function() { SpinningWheel.hide()} , 500);
      }.bind(this)
    };


    var queryForm = {
      gravity:1,
      view: 'form',
      id: 'queryForm',
      elements: [
        { view: 'text', name: 'name', label: 'Name'},
        { view: 'text', name: 'tags', label: 'Tags'},
        { view: 'textarea', height : 150, name: 'query',label: 'SQL', css:'fixedFont'},
        { view:'resizer'},
        { view: 'SqlWidgetCollection_View_EditMode', name:'params'}
      ]
    };

    var edit_window =
    {
      view:"window",
      id : "query_edit_view",
      height:'60%',
      width:'60%',
      position: 'center',
      move:true,
      head:{
        view:"toolbar", cols:[
          {view:"label", label: "Edit Query" },
          savequery_button,
          { view:"button", label: 'Close', width: 100, align: 'right', click:"$$('query_edit_view').hide();"}
          ]
      },
      body:queryForm
    };

    return edit_window;
  }


};
