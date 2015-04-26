/// <reference path="../../packages/typescript-libs/meteor.d.ts" />

declare var Router;//kill compilation errors about Router

Router.configure({
  layoutTemplate: 'layout'
});

Router.map(function() {
  this.route('home', {
    path: '/',
    template: 'home'
  });
});
