function GameObject() {
  this.position = Vector2.zero;
  this.velocity = Vector2.zero;
  this.rotation = 0;
  this.size = 0;
}

GameObject.prototype.handleEdge = function () {
  if (this.position.x < 0 - this.size) {
    this.position.x = Game.size.w + this.size;
  } else if (this.position.x > Game.size.w + this.size) {
    this.position.x = 0 - this.size;
  }

  if (this.position.y < 0 - this.size) {
    this.position.y = Game.size.h + this.size;
  } else if (this.position.y > Game.size.h + this.size) {
    this.position.y = 0 - this.size;
  }
};
