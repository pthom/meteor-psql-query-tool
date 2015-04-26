//See http://fgnass.github.io/spin.js/#!

SpinningWheel = {

  _spinner : null,

  show : function() {
    var div = document.getElementById('spinwheel');
    if ( ! this._spinner)
      this._spinner = new Spinner();
    this._spinner.spin(div);
  },

  hide : function() {
    if (this._spinner) {
      this._spinner.stop();
    }
  }
};
