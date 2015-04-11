//Note about file names : meteor includes files automatically in the following order
// - files in subfolders first
// - then alphabetical order
// This filename begins with a 1 so that it is loaded before others

query_edit_view = {

  on_document_ready : function() {
    // http://docs.webix.com/desktop__data_binding.html
    $$('queryForm').bind($$('querytable'));
  },

  ui_definition : function() {

    var savequery_button =
    {
      view: 'button',
      label: 'Save',
      type: 'form', // a Submit button; 'form' is an odd type name for buttons - http://docs.webix.com/api__ui.button_type_config.html#comment-1863007844
      click: function() {
        this.getFormView().save();
      },
    };


    var queryForm = {
      gravity:1,
      view: 'form',
      id: 'queryForm',
      elements: [{
        view: 'text',
        name: 'name',
        label: 'Query Name'
      }, {
        view: 'text',
        name: 'query',
        label: 'Query SQL'
      },
      savequery_button
      ]
    };

    var edit_window =
    {
      view:"window",
      id : "query_edit_view",
      height:700,
      width:1000,
      left:50, top:50,
      move:true,
      head:{
        view:"toolbar", cols:[
          {view:"label", label: "Edit Query" },
          { view:"button", label: 'Close', width: 100, align: 'right', click:"$$('query_edit_view').hide();"}
          ]
      },
      body:queryForm
    };

    return edit_window;
  },


};
