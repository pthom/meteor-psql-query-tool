/// <reference path="../typings/typescript-libs/meteor.d.ts" />
/// <reference path="../typings/typescript-libs/ironrouter.d.ts" />
///<reference path="../lib/SqlWidgets/SqlWidgetsInit.ts" />

declare var Roles;
declare var MainUi;
declare var TestWidgets;


Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    waitOn: function() {
        return Meteor.subscribe('Queries');
    }
});

Router.route("/", function() {
    console.log ("Route /");
    this.render("home");
    Session.set("Queries_LimitToTag", null);
    MainUi();
});

Router.route("/tag/:tagId", function() {
    console.log ("Route tag " + this.params.tagId);
    this.render("home");
    Session.set("Queries_LimitToTag", this.params.tagId);
    MainUi();
});

Router.route("/test", function() {
    console.log ("Route /");
    this.render("home");
    TestWidgets();
});


Meteor.startup(function() {
    SqlWidgets.InitSqlWidgets();
});

