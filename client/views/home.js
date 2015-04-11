Template.home.helpers({
  queries: function () {
      return Queries.find({}, {});
  },
  selected_query: function() {
      return Queries.findOne( Session.get("currentQueryId") );
  },
  QueryResultRows: function() {
      return ServerSession.get("QueryResult").rows;
  }
});

Template.home.events({
    "click #btn_save_query" : function(event) {
        var name = $("#txt_name").val();
        var query = $("#txt_query").val();
        Meteor.call("saveQuery", this._id, name, query);
    },
    "click #btn_new_query" : function(event) {
        Meteor.call("addQuery");
    },
    "click #btn_delete_query" : function(event) {
        console.log("about to delete");
        Meteor.call("deleteQuery", this._id);
    },
    "click #btn_select_query" : function(event) {
        Session.set("currentQueryId", this._id);
    },
    "click #btn_run_query" : function(event) {
        console.log("about to run");
        Meteor.call("runPostgresqlQuery", this.query);
    },

});
