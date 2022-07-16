const handleKeyUp = function (e) {
  Keyboard.keyDown = -1;
  Keyboard.keyUp = e.keyCode;
};

const handleKeyDown = function (e) {
  Keyboard.keyDown = e.keyCode;
  Keyboard.keyUp = -1;
};

function Keyboard_Singleton() {
  this.keyDown = -1;
  this.keyUp = -1;
  document.onkeydown = handleKeyDown;
  document.onkeyup = handleKeyUp;
}

const Keyboard = new Keyboard_Singleton();
