/// <reference path="../../typings/typescript-libs/meteor.d.ts" />
/// <reference path="../Routes_Client.ts" />

declare var MyOnStartup;
declare var Queries : Mongo.Collection<any>//Meteor.Collection<any>;

Meteor.subscribe('Queries', () => {
    MyOnStartup();
});
