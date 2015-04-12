//Un composant custom webix qui affiche un json editor !
//cf http://jsbin.com/zaseyi/1/edit?js,output
//et http://docs.webix.com/samples/80_docs/new.html
//webix.debug_size = true;
webix.protoUI({
  name: "jsoneditor_wx",
  _editor: null,
  $init: function(config) {
    this.$view.className = "my_control";
    this.$view.innerHTML = "<div class='jsedit' style='background:white'></div>";

    var container = this.$view.childNodes[0];
    this._editor = new JSONEditor(container);
  },
  defaults: {
  },
  json_setter: function(value) {
    if (value)
    //this.$view.childNodes[0].innerHTML = value;
      this._editor.set(value);
    return value;
  },
  json: function() {
    return this._editor.get();
  },
  $getSize: function() {
    return [1, 100000, 1, 100000, 1];
  },

  $setSize: function(x, y) {
    console.log("setSize: " + x + ", " + y);
    if (webix.ui.view.prototype.$setSize.call(this, x, y)) {
      this.$view.childNodes[0].style.width = this.$width + "px";
      this.$view.childNodes[0].style.height = this.$height + "px";
    }
  },
}, webix.MouseEvents, webix.EventSystem, webix.ui.view);
