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
  console.log("window.location.href=" + window.location.href);
  if (window.location.href.indexOf("test") >= 0) {
    TestWidgets();
  } else {
    MainUi();
  }
}