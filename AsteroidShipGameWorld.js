INITIAL_ROID_SIZE = 50;
const ROID_POINTS_LG = 20;
const ROID_POINTS_MD = 50;
const ROID_POINTS_SM = 100;

function AsteroidShipGameWorld() {
  this.ship = new Ship();
  this.roids = [];
  this.explosions = [];

  this.ship1 = new Ship(new Vector2(this.ship.size, this.ship.size));

  this.friction = 0.5; // friction as a fraction of object velocity
  this.numOfRoids = 1;

  this.drawBoundries = false;

  this.initialRoidSize = INITIAL_ROID_SIZE;
  this.level = 0;
  this.score = 0;
  this.lives = 3;
  this.text = null;
  this.scoreText = null;
}

AsteroidShipGameWorld.prototype.initialize = function () {
  this.newLevel();
};

AsteroidShipGameWorld.prototype.newLevel = function () {
  this.text = new Text(
    new Vector2(Game.size.w / 2, Game.size.h - 100),
    `LEVEL ${this.level + 1}`
  );

  this.createRoidBilt(this.level);
};

AsteroidShipGameWorld.prototype.createRoidBilt = function () {
  this.roids = [];
  for (let i = 0; i < this.numOfRoids + this.level; i++) {
    let position = new Vector2(
      Math.random() * Game.size.w,
      Math.random() * Game.size.h
    );
    // leave buffer between roid position and ship position
    do {
      position = new Vector2(
        Math.random() * Game.size.w,
        Math.random() * Game.size.h
      );
    } while (
      distanceBetweenTwoPoints(position, this.ship.position) <
      this.ship.size + 200
    );

    this.roids.push(new Roid(position.copy()));
  }
};

AsteroidShipGameWorld.prototype.update = function (delta) {
  if (this.lives > 0) {
    this.ship.update(delta);

    this.roids.forEach((roid) => {
      roid.update(delta);
    });

    this.explosions.forEach((explosion) => {
      explosion.update(delta);
    });

    // check for hitted
    this.checkHittedRoids();

    this.text.update(delta);

    // update score text
    this.scoreText = new Text(
      new Vector2(Game.size.w / 2, this.ship.size),
      `SCORE: ${this.score}`
    );
  } else {
    this.text.update(delta);
  }
};

AsteroidShipGameWorld.prototype.checkHittedRoids = function () {
  for (let i = this.roids.length - 1; i >= 0; i--) {
    let roid = this.roids[i];

    // split hitted enough big roid into two smaller roids
    if (roid.hitted) {
      sounds.hitFx.play();
      this.splitRoid(roid, i);
    }
  }
};

AsteroidShipGameWorld.prototype.splitRoid = function (roid, i) {
  if (roid.size > Game.gameWorld.initialRoidSize / 4) {
    for (let j = 0; j < 2; j++) {
      this.roids.push(new Roid(roid.position.copy(), roid.size / 2));
    }
  }
  // update score
  if (roid.size === Game.gameWorld.initialRoidSize) {
    this.score += ROID_POINTS_LG;
  } else if (roid.size === Game.gameWorld.initialRoidSize / 2) {
    this.score += ROID_POINTS_MD;
  } else {
    this.score += ROID_POINTS_SM;
  }

  this.roids.splice(i, 1);

  if (this.roids.length === 0) {
    this.level++;
    this.newLevel();
  }
};

AsteroidShipGameWorld.prototype.handleEdge = function (delta) {
  this.ship.handleEdge(delta);
  this.roids.forEach((roid) => {
    roid.handleEdge();
  });
};

AsteroidShipGameWorld.prototype.draw = function () {
  if (this.lives > 0) {
    this.ship.draw();
    this.roids.forEach((roid) => {
      roid.draw();
    });
    this.explosions.forEach((explosion) => {
      explosion.draw();
    });
    this.text.draw();
    this.scoreText.draw();
    for (let i = 0; i < this.lives; i++) {
      this.ship1.position = new Vector2(
        this.ship1.size * i * 2 + this.ship1.size * 2,
        40
      );
      this.ship1.draw();
    }
  } else {
    this.text.draw();
  }
};

AsteroidShipGameWorld.prototype.handleInput = function (delta) {
  if (this.lives === 0) return;
  this.ship.handleInput(delta);
};

AsteroidShipGameWorld.prototype.reset = function () {
  this.score = 0;
  this.lives = 3;
  this.level = 0;
  this.ship.reset();
  this.newLevel();
};

AsteroidShipGameWorld.prototype.checkCollision = function (object1, object2) {
  if (
    distanceBetweenTwoPoints(object1.position, object2.position) <
    object1.size + object2.size
  ) {
    return true;
  }

  return false;
};

AsteroidShipGameWorld.prototype.gameOver = function () {
  this.text = new Text(
    new Vector2(Game.size.w / 2, Game.size.h / 2),
    "GAME OVER"
  );

  setTimeout(() => {
    Game.gameWorld.reset();
  }, 3100);
};
