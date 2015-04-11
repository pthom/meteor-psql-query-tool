Template.home.helpers({
  queries: function () {
      return Queries.find({}, {});
  },
  QueryResultRows: function() {
      return ServerSession.get("QueryResult").rows;
  }
});

Template.home.events({
});
