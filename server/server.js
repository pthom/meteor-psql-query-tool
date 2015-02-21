Meteor.methods({
    addQuery: function () {
      Queries.insert({
        name: "New Query",
        query: "",
      });
    },
    deleteQuery: function (id) {
      Queries.remove(id);
    },
    saveQuery: function (id, name, query) {
      Queries.update(id, { $set: { name: name, query : query} });
    }
});
