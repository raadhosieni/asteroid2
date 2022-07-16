function Vector2(x = 0, y = 0) {
  this.x = x;
  this.y = y;
}

Object.defineProperty(Vector2, "zero", {
  get: function () {
    return new Vector2();
  },
});

Vector2.prototype.copy = function () {
  return new Vector2(this.x, this.y);
};

Vector2.prototype.addTo = function (v) {
  if (v.constructor === Vector2) {
    this.x += v.x;
    this.y += v.y;
  } else if (v.constructor === Number) {
    this.x += v;
    this.y += v;
  }

  return this;
};

Vector2.prototype.add = function (v) {
  let result = this.copy();
  result.addTo(v);
  return result;
};

Vector2.prototype.subtractFrom = function (v) {
  if (v.constructor === Vector2) {
    this.x -= v.x;
    this.y -= v.y;
  } else if (v.constructor === Number) {
    this.x -= v;
    this.y -= v;
  }

  return this;
};

Vector2.prototype.subtract = function (v) {
  let result = this.copy();
  result.subtractFrom(v);
  return result;
};

Vector2.prototype.multiplyBy = function (v) {
  if (v.constructor === Vector2) {
    this.x *= v.x;
    this.y *= v.y;
  } else if (v.constructor === Number) {
    this.x *= v;
    this.y *= v;
  }

  return this;
};

Vector2.prototype.multiply = function (v) {
  let result = this.copy();
  result.multiplyBy(v);
  return result;
};

Vector2.prototype.divideWith = function (v) {
  if (v.constructor === Vector2) {
    this.x /= v.x;
    this.y /= v.y;
  } else if (v.constructor === Number) {
    this.x /= v;
    this.y /= v;
  }

  return this;
};

Vector2.prototype.divide = function (v) {
  let result = this.copy();
  result.divideWith(v);
  return result;
};
