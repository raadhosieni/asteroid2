EXPLOSION_PERIOD = 1.5; // time to show explosion in seconds

function Explosion(position, size, period) {
  GameObject.call(this);
  this.position = position || Vector2.zero;
  this.size = size || 0;
  this.period = period || EXPLOSION_PERIOD; // seconds
}

Explosion.prototype = Object.create(GameObject.prototype);

Explosion.prototype.update = function (delta) {
  if (this.period > 0) {
    this.period -= delta;
  } else {
    this.period = 0;
  }
};

Explosion.prototype.draw = function () {
  if (this.period === 0) return;
  Canvas2D.drawCircle(
    this.position,
    `rgba(255, 0, 0, ${this.period})`,
    this.size,
    false,
    this.period / EXPLOSION_PERIOD
  );
  Canvas2D.drawCircle(
    this.position,
    `rgba(255, 165, 0, ${this.period})`,
    this.size * 0.75,
    false,
    this.period / EXPLOSION_PERIOD
  );
  Canvas2D.drawCircle(
    this.position,
    `rgba(255, 255, 51, ${this.period})`,
    this.size * 0.5,
    false,
    this.period / EXPLOSION_PERIOD
  );
  Canvas2D.drawCircle(
    this.position,
    `rgba(255, 255, 255, ${this.period})`,
    this.size * 0.25,
    false,
    this.period / EXPLOSION_PERIOD
  );
};
