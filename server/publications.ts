/// <reference path="../packages/typescript-libs/meteor.d.ts" />

Meteor.publish('queries', function() {
  return Queries.find();
});

Meteor.publish('psqlresults', function() {
  return PsqlResults.find();
});
