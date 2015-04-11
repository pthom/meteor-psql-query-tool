/// <reference path="../packages/typescript-libs/meteor.d.ts" />

//Queries is a MongoDB collection stored in the mongo database
declare var Queries; //:Mongo.Collection<...>;
Queries = new Meteor.Collection("queries");


//PsqlResults will be populated through postgresql
//It is given no name, so that it will *not* be synchronized : cf http://docs.meteor.com/#/full/mongo_collection
//Voir http://www.lshift.net/blog/2013/02/25/live-updates-to-meteor-from-postgres/
//pour savoir comment avoir des notifications sur l'insert/update de donnees psql
declare var PsqlResults;
PsqlResults = new Meteor.Collection("psqlresults");