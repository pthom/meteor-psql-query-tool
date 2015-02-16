Template.home.helpers({
  queries: function () {
      return Queries.find({}, {});
  },
});

Template.home.events({
    "click #btn_save_query" : function(event) {
        alert("save (todo)");
    }
});
