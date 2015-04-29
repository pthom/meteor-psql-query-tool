/// <reference path="../typings/typescript-libs/meteor.d.ts" />
/// <reference path="../typings/typescript-libs/ironrouter.d.ts" />
///<reference path="../lib/SqlWidgets/SqlWidgetsInit.ts" />

Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home'
  });
});

Router.map(function() {
  this.route('test', {
    path: '/test',
    template: 'home'
  });
});

Router.map(function() {
  this.route('tag', {
    path: '/tag/:idTag',
    template: 'home'
  });
});

declare var MainUi;
declare var TestWidgets;


Accounts.onLogin(function() {
  BrokenRoute_AccordingToUrl_RepairMe();
});

(<any>Accounts).onLogout(function() {
  window.location.reload(false);
});

Meteor.startup(function() {
  SqlWidgets.InitSqlWidgets();

  BrokenRoute_AccordingToUrl_RepairMe();
});


function BrokenRoute_AccordingToUrl_RepairMe() {
  var href = window.location.href;
  console.log("window.location.href=" + href);
  if (href.indexOf("/test") >= 0) {
    TestWidgets();
  } else {
    var tagToken = "/tag/";
    var tagTokenPos = href.indexOf(tagToken);
    if ( tagTokenPos >= 0)
    {
      var tag = href.substring(tagTokenPos + tagToken.length);
      Session.set("Queries_LimitToTag", tag);
    } else {
      Session.set("Queries_LimitToTag", null);
    }
    MainUi();
  }
}