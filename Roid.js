ROID_MAX_SPEED = 100; // 200 pixel per second
ROID_MIN_SPEED = 10; // 10 pixel per second
BUFFER = 300; // buffer distance between initial position of roid and the ship

function Roid(position, size) {
  GameObject.call(this);
  this.size = size || Game.gameWorld.initialRoidSize;
  this.position = position || Vector2.zero;
  this.velocity = new Vector2(
    Math.random() * ROID_MAX_SPEED + ROID_MIN_SPEED,
    Math.random() * ROID_MAX_SPEED + ROID_MIN_SPEED
  );
  this.numOfPoints = Math.floor(Math.random() * 10 + 5);

  this.rotation = Math.random() * Math.PI * 2;
  this.points = [];
  this.distortion = 0.7; // as a fraction of size
  this.hitted = false;

  this.initialize();
}

Roid.prototype = Object.create(GameObject.prototype);

Roid.prototype.initialize = function () {
  let angle = (Math.PI * 2) / this.numOfPoints;
  for (let i = 0; i < this.numOfPoints; i++) {
    this.points.push({
      x:
        this.size *
        (1 + (Math.random() - 0.5) * this.distortion) *
        Math.cos(angle * i),
      y:
        this.size *
        (1 + (Math.random() - 0.5) * this.distortion) *
        Math.sin(angle * i),
    });
  }
};

Roid.prototype.update = function (delta) {
  let v = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation));

  this.position.addTo(this.velocity.multiply(v).multiply(delta));

  // check if roid hitted by a lazer
  Game.gameWorld.ship.lazers.forEach((lazer) => {
    if (Game.gameWorld.checkCollision(this, lazer)) {
      this.hitted = true;
      Game.gameWorld.explosions.push(
        new Explosion(lazer.position.copy(), lazer.size, 0.4)
      );
    }
  });
};

Roid.prototype.draw = function () {
  Canvas2D.drawShape(this.points, "white", true, this.position);
};
