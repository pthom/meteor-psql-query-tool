json_export_view = {

  copyToEditor : function(setNullOnError) {
    $$("jsonexport_jsonedit").fillFromTextWidget( $$("jsonexport_jsontext"), setNullOnError );
  },

  copyFromEditor: function() {
    $$("jsonexport_jsonedit").sendToTextWidget( $$("jsonexport_jsontext") );
  },


  ui_definition : function() {

    var jsonEditorAndTextArea =  {
      cols : [
      {
        view: 'textarea',
        id:'jsonexport_jsontext',
        height : 250,
        name: 'params',
        label: 'Query Params'
      },
      {
        width : 30,
        rows : [
          {
            view: 'button',
            label: '=>',
            click: this.copyToEditor
          },
          {
            view: 'button',
            label: '<=',
            click: this.copyFromEditor
          }
        ]
      },
      {
        view: 'jsoneditor_wx',
        id:'jsonexport_jsonedit',
        height : 250,
        label: 'Query Params',
        json: null
      },
      ]
    };


    var result_window =
    {
      view:"window",
      id : "json_export_view",
      on: {
          "onShow": function() {
          var json = ServerSession.get("QueryResult");
          var json_str = JSON.stringify(json.rows, null, 2);
          $$("jsonexport_jsontext").setValue( json_str );
          json_export_view.copyToEditor();
        }
      },
      height:'60%',
      width:'60%',
      position: 'center',
      move:true,
      head:{
        view:"toolbar", cols:[
          {view:"label", label: "Result as JSON" },
          { view:"button", label: 'Close', width: 100, align: 'right', click:"$$('json_export_view').hide();"}
          ]
      },
      body:jsonEditorAndTextArea
    };

    return result_window;
  },


};
