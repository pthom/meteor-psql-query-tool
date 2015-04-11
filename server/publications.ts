/// <reference path="../packages/typescript-libs/meteor.d.ts" />
/// <reference path="../lib/collections.ts" />

Meteor.publish('Queries', function() {
  return Queries.find();
});
