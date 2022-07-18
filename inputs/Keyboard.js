const handleKeyDown = function (e) {
  const code = e.keyCode;

  if (code < 0 || code > 255) return;

  if (!Keyboard._keyStates[code].down) Keyboard._keyStates[code].pressed = true;
  Keyboard._keyStates[code].down = true;
};

const handleKeyUp = function (e) {
  const code = e.keyCode;

  if (code < 0 || code > 255) return;

  Keyboard._keyStates[code].down = false;
};

function Keyboard_Singleton() {
  this._keyStates = [];
  for (let i = 0; i < 256; i++) {
    this._keyStates.push(new ButtonState());
  }
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
}

Keyboard_Singleton.prototype.reset = function () {
  for (let i = 0; i < 256; i++) {
    this._keyStates[i].pressed = false;
  }
};

Keyboard_Singleton.prototype.pressed = function (key) {
  return this._keyStates[key].pressed;
};

Keyboard_Singleton.prototype.down = function (key) {
  return this._keyStates[key].down;
};

const Keyboard = new Keyboard_Singleton();
