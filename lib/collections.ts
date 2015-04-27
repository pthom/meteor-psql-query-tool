/// <reference path="../packages/typescript-libs/meteor.d.ts" />

//Queries is a MongoDB collection stored in the mongo database
declare var Queries; //:Mongo.Collection<...>;
Queries = new Meteor.Collection("Queries");

Queries.allow({
  insert: function (userId, doc) {
    //A safer alternative would be :
    //return (userId && doc.owner === userId);
    return true;
  },
  update: function (userId, doc, fields, modifier) {
    //A safer alternative would be :
    //return doc.owner === userId;
    return true;
  },
  remove: function (userId, doc) {
    //A safer alternative would be :
    //return doc.owner === userId;
    return true;
  },
  fetch: ['owner']
});

