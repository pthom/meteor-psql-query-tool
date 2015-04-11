//declare var webix;

function MakeWebixUi() {
  querytable_uidef = {
        //container:'webix_queries_div',
        view: 'datatable',
        id: 'querytable',
        autoConfig: true,  // infer columns from data
        select: true,
        sortable: true,
        editable: true, editaction: 'dblclick',
        resizeColumn: true,
        url:  webix.proxy('meteor', Queries),  // <-- this is it!
        save: webix.proxy('meteor', Queries)   // Mongo.Collection
    };

    var toolbar = {
      view: 'toolbar',
      elements: [
        { view: 'label', label: 'Queries list' },
        { view: 'button', value: 'Add', width: 100,
          click: function () {
            //var row = $$('querytable').add({name:'',query:''});
            var row = $$('querytable').add({});
            $$('querytable').editCell(row, 'name');
          }
        },
        { view: 'button', value: 'Remove', width: 100,
          click: function () {
            var id = $$('querytable').getSelectedId();
            if (id)
              $$('querytable').remove(id);
            else
              webix.message('Please select a row to delete');
          }}
      ]
    };

    var panel = {
      container:'webix_queries_div',
      view:'layout',
      rows:[toolbar, querytable_uidef]
    };


  var webixContainer = webix.ui( panel );
  //webixContainer.resize();

}


Meteor.startup(function () {
  MakeWebixUi();


  // The problem with mixing Webix components and non-Webix HTML markup is that Webix UI components won't resize
  // automatically if you place them in an HTML container. You have to resize them manually, like below.
  // Read more at http://forum.webix.com/discussion/comment/3650/#Comment_3650.
  webix.event(window, 'resize', function(){
    webixContainer.resize();
  });
});
