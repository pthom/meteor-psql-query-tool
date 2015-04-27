///<reference path="../../typings/webix/webix.d.ts" />
///<reference path="../app_config/Subscriptions.ts" />

//declare var Collection_Crud;

Collection_Crud = function() {

    console.log("Collection_Crud");
    webix.ui(Query_Datatable_Crud());
}


function Query_Datatable_Crud() {
    var querytable = {
        view: 'datatable',
        id: 'querytable',
        select: true,
        sortable: true,
        //editable:true,
        //autoconfig:true,
        columns:[
            {id:"name", header:"Name", width:200},
            {id:"comment", header:"Comment", width:200},
            {id:"tag", header:"Tag", width:200},
        ],
        url: webix.proxy('meteor', Queries),
        save: webix.proxy('meteor', Queries)
    };

    return querytable;
}