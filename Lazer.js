function Lazer(position, velocity) {
  GameObject.call(this);
  this.position = position || Vector2.zero;
  this.velocity = velocity || Vector2.zero;

  this.size = 4; // size of lazer in pixles
  this.travelledDistance = 0;
}

Lazer.prototype = Object.create(GameObject.prototype);

Lazer.prototype.update = function (delta) {
  this.position.addTo(this.velocity.multiply(delta));
  this.travelledDistance +=
    Math.sqrt(Math.pow(this.velocity.x, 2) + Math.pow(this.velocity.y, 2)) *
    delta;
};

Lazer.prototype.draw = function () {
  Canvas2D.drawRect(this.position, "red", this.size);
};
