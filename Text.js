function Text(position, text, showTime) {
  GameObject.call(this);
  this.position = position || Vector2.zero;
  this.text = text || "new text";
  this.showTime = showTime || 3;
  this.alpha = 1;
  this.color = undefined;
}

Text.prototype = Object.create(GameObject.prototype);

Text.prototype.draw = function () {
  if (this.alpha <= 0) return;
  this.color = `rgba(255, 255, 255, ${this.alpha})`;
  Canvas2D.drawText(this.text, this.position, this.color);
};

Text.prototype.update = function (delta) {
  if (this.alpha > 0) {
    this.alpha -= delta / this.showTime;
  }
};
