const LAZER_MAX_DISTANCE = 500; // in pixel
const LAZER_SPEED = 600; // lazer velocity in pixels per seconds
const SHIP_DEAD_TIME = 3; // time the ship take when hitted by a roid in seconds
const SHIP_BLINK_FRAMES_NUM = 280; // 30 frames the ship will blink before collide with roids

function Ship(position) {
  GameObject.call(this);
  this.position = position || new Vector2(Game.size.w / 2, Game.size.h / 2);
  this.thrust = Vector2.zero;
  this.thrusting = false;
  this.size = 20;
  this.rotation = Math.PI / 2;
  this.rotationSpeed = 0;
  this.canShoot = false;
  this.lazers = [];
  this.dead = false;
  this.deadTime = 0;
  this.blinkFramesNum = 0;
}

Ship.prototype = Object.create(GameObject.prototype);

Ship.prototype.handleInput = function (delta) {
  // add thrusting
  if (Keyboard.keyDown === Keys.UP) {
    this.thrusting = true;
  }

  // rotate ship left
  if (Keyboard.keyDown === Keys.LEFT) {
    this.rotationSpeed = Math.PI * 2;
  }

  // rotate ship right
  if (Keyboard.keyDown === Keys.RIGHT) {
    this.rotationSpeed = -Math.PI * 2;
  }

  if (Keyboard.keyUp === Keys.LEFT || Keyboard.keyUp === Keys.RIGHT) {
    this.rotationSpeed = 0;
  }

  // handle shooting
  if (Keyboard.keyDown === Keys.SPACE) {
    this.canShoot = true;
  }

  if (Keyboard.keyUp === Keys.UP) {
    this.thrusting = false;
  }
};

Ship.prototype.update = function (delta) {
  if (!this.dead) {
    // update position
    let v = new Vector2(Math.cos(this.rotation), Math.sin(this.rotation));
    this.position.addTo(this.thrust.multiply(delta).multiply(v));

    // update rotation
    this.rotation += this.rotationSpeed * delta;

    // update thrusting
    if (this.thrusting) {
      let v = new Vector2(15, -15);
      this.thrust.addTo(v);
    } else {
      this.thrust.subtractFrom(
        this.thrust.multiply(Game.gameWorld.friction * delta)
      );
    }
  } else {
    this.deadTime -= delta;
    if (this.deadTime <= 0) {
      this.reset();
      this.blinkFramesNum = SHIP_BLINK_FRAMES_NUM;
    }
  }

  // shoot
  if (this.canShoot && this.lazers.length <= 20 && !this.dead) {
    let v = new Vector2(Math.cos(this.rotation), -Math.sin(this.rotation));

    let lazerVeclocity = v.multiply(LAZER_SPEED);

    v.multiplyBy(this.size);

    let lazerPosition = this.position.add(v);

    this.lazers.push(new Lazer(lazerPosition, lazerVeclocity));

    sounds.shootFx.play();

    this.canShoot = false;
  }

  // update lazers
  this.lazers.forEach((lazer) => {
    lazer.update(delta);
  });

  // remove lazer after some distance
  if (this.lazers.length > 0) {
    for (let i = this.lazers.length - 1; i >= 0; i--) {
      if (this.lazers[i].travelledDistance > LAZER_MAX_DISTANCE) {
        this.lazers.splice(i, 1);
      }
    }
  }

  // check if ship hitted by a roid
  if (!this.dead && this.blinkFramesNum <= 0) {
    Game.gameWorld.roids.forEach((roid) => {
      if (Game.gameWorld.checkCollision(this, roid)) {
        this.dead = true;
        this.deadTime = SHIP_DEAD_TIME;
        roid.hitted = true;
        // add explosion in the same position of the ship
        Game.gameWorld.explosions.push(
          new Explosion(this.position.copy(), this.size)
        );
        // decrease lives by one
        Game.gameWorld.lives--;

        if (Game.gameWorld.lives === 0) {
          Game.gameWorld.gameOver();
        }
      }
    });
  } else {
    if (this.blinkFramesNum > 0) this.blinkFramesNum--;
  }
};

Ship.prototype.draw = function () {
  const isBlinkOn = this.blinkFramesNum % 7 === 0;
  // draw lazers
  this.lazers.forEach((lazer) => {
    lazer.draw();
  });

  if (this.dead) return;

  if (isBlinkOn) {
    this.drawShip();

    if (this.thrusting) {
      this.drawThrust();
    }
  }

  if (Game.gameWorld.drawBoundries) {
    Canvas2D.drawCenter(this.position);
  }
};

Ship.prototype.drawShip = function () {
  const poinst = [
    {
      x: this.position.x + Math.cos(this.rotation) * this.size * (7 / 6),
      y: this.position.y - Math.sin(this.rotation) * this.size * (7 / 6),
    },
    {
      x:
        this.position.x -
        (Math.cos(this.rotation) + Math.sin(this.rotation)) *
          this.size *
          (4 / 6),
      y:
        this.position.y +
        (Math.sin(this.rotation) - Math.cos(this.rotation)) *
          this.size *
          (4 / 6),
    },

    {
      x:
        this.position.x -
        (Math.cos(this.rotation) - Math.sin(this.rotation)) *
          this.size *
          (4 / 6),
      y:
        this.position.y +
        (Math.sin(this.rotation) + Math.cos(this.rotation)) *
          this.size *
          (4 / 6),
    },
  ];

  Canvas2D.drawShape(poinst);
};

Ship.prototype.drawThrust = function () {
  const outerThrustPoints = [
    {
      x: this.position.x - Math.cos(this.rotation) * this.size * (9 / 6),
      y: this.position.y + Math.sin(this.rotation) * this.size * (9 / 6),
    },
    {
      x:
        this.position.x -
        (Math.cos(this.rotation) + Math.sin(this.rotation) * (2 / 3)) *
          this.size *
          (4 / 6),
      y:
        this.position.y +
        (Math.sin(this.rotation) - Math.cos(this.rotation) * (2 / 3)) *
          this.size *
          (4 / 6),
    },

    {
      x:
        this.position.x -
        (Math.cos(this.rotation) - Math.sin(this.rotation) * (2 / 3)) *
          this.size *
          (4 / 6),
      y:
        this.position.y +
        (Math.sin(this.rotation) + Math.cos(this.rotation) * (2 / 3)) *
          this.size *
          (4 / 6),
    },
  ];

  const innerThrustPoints = [
    {
      x: this.position.x - Math.cos(this.rotation) * this.size * (7 / 6),
      y: this.position.y + Math.sin(this.rotation) * this.size * (7 / 6),
    },
    {
      x:
        this.position.x -
        (Math.cos(this.rotation) + Math.sin(this.rotation) * (2 / 4)) *
          this.size *
          (4 / 6),
      y:
        this.position.y +
        (Math.sin(this.rotation) - Math.cos(this.rotation) * (2 / 4)) *
          this.size *
          (4 / 6),
    },

    {
      x:
        this.position.x -
        (Math.cos(this.rotation) - Math.sin(this.rotation) * (2 / 4)) *
          this.size *
          (4 / 6),
      y:
        this.position.y +
        (Math.sin(this.rotation) + Math.cos(this.rotation) * (2 / 4)) *
          this.size *
          (4 / 6),
    },
  ];

  Canvas2D.drawShape(outerThrustPoints, "red", false);
  Canvas2D.drawShape(innerThrustPoints, "yellow", false);
};

Ship.prototype.handleEdge = function () {
  GameObject.prototype.handleEdge.call(this);

  this.lazers.forEach((lazer) => {
    lazer.handleEdge();
  });
};

Ship.prototype.reset = function () {
  this.position = new Vector2(Game.size.w / 2, Game.size.h / 2);
  this.thrust = Vector2.zero;
  this.thrusting = false;
  this.size = 20;
  this.rotation = Math.PI / 2;
  this.rotationSpeed = 0;
  this.canShoot = false;
  this.lazers = [];
  this.dead = false;
  this.deadTime = 0;
};
