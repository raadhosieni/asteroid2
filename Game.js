const sounds = {};

function Game_Singleton() {
  this.gameWorld = null;
}

Game_Singleton.prototype.start = function (canvasName, gameSize) {
  this.size = gameSize;
  this.initialize();
  Canvas2D.initialize(canvasName);
  this.loadAssets();
  this.mainLoop();
};

Game_Singleton.prototype.mainLoop = function () {
  const delta = 1 / 60;
  Game.gameWorld.handleInput(delta);
  Game.gameWorld.update(delta);
  Game.gameWorld.handleEdge(delta);
  Canvas2D.clear();
  Game.gameWorld.draw();
  Keyboard.reset();
  requestAnimationFrame(Game.mainLoop);
};

Game_Singleton.prototype.initialize = function () {
  this.gameWorld = new AsteroidShipGameWorld();
  this.gameWorld.initialize();
};

Game_Singleton.prototype.loadAssets = function () {
  sounds.shootFx = new Sound("./sounds/laser.m4a", 0.5, 10);
  sounds.hitFx = new Sound("./sounds/hit.m4a", 0.5, 10);
};

const Game = new Game_Singleton();
