/// <reference path="../packages/typescript-libs/meteor.d.ts" />
/// <reference path="../lib/collections.ts" />

Meteor.publish('Queries', function() {
  if (! this.userId )
    return {};
  return Queries.find();
});


Queries.allow({
  insert: function (userId, doc) {
    return Roles.userIsInRole(userId, ['manage-queries']);
  },
  update: function (userId, doc, fields, modifier) {
    return Roles.userIsInRole(userId, ['manage-queries']);
  },
  remove: function (userId, doc) {
    return Roles.userIsInRole(userId, ['manage-queries']);
  }
});