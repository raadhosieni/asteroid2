function Canvas2d_Singleton() {
  this._canvas = null;
  this._canvasContext = null;
}

Canvas2d_Singleton.prototype.initialize = function (canvasName) {
  this._canvas = document.getElementById(canvasName);
  this._canvasContext = this._canvas.getContext("2d");
};

Canvas2d_Singleton.prototype.clear = function () {
  this._canvasContext.fillStyle = "black";
  this._canvasContext.fillRect(0, 0, this._canvas.width, this._canvas.height);
};

Canvas2d_Singleton.prototype.drawRect = function (
  position,
  color,
  size,
  stroke = false
) {
  if (stroke) {
    this._canvasContext.strokeStyle = color;
  } else {
    this._canvasContext.fillStyle = color;
  }

  this._canvasContext.beginPath();

  this._canvasContext.rect(
    position.x - size / 2,
    position.y - size / 2,
    size,
    size
  );

  this._canvasContext.closePath();

  if (stroke) {
    this._canvasContext.stroke();
  } else {
    this._canvasContext.fill();
  }
};

Canvas2d_Singleton.prototype.drawCircle = function (
  position,
  color,
  size,
  stroke = false,
  alpha
) {
  if (stroke) {
    this._canvasContext.strokeStyle = color;
  } else {
    this._canvasContext.fillStyle = color;
  }

  this._canvasContext.beginPath();

  this._canvasContext.arc(position.x, position.y, size, 0, Math.PI * 2);

  this._canvasContext.closePath();

  if (stroke) {
    this._canvasContext.stroke();
  } else {
    this._canvasContext.fill();
  }
};

Canvas2d_Singleton.prototype.drawShape = function (
  points,
  color = "white",
  stroke = true,
  offset = Vector2.zero
) {
  if (points.length === 0) return;
  if (stroke) {
    this._canvasContext.strokeStyle = color;
  } else {
    this._canvasContext.fillStyle = color;
  }
  this._canvasContext.beginPath();
  this._canvasContext.moveTo(points[0].x + offset.x, points[0].y + offset.y);
  for (let i = 1; i < points.length; i++) {
    this._canvasContext.lineTo(points[i].x + offset.x, points[i].y + offset.y);
  }
  this._canvasContext.closePath();
  if (stroke) {
    this._canvasContext.stroke();
  } else {
    this._canvasContext.fill();
  }
};

Canvas2d_Singleton.prototype.drawCenter = function (position) {
  this._canvasContext.fillStyle = "red";
  this._canvasContext.fillRect(position.x - 2, position.y - 2, 4, 4);
};

Canvas2d_Singleton.prototype.drawText = function (
  text,
  position = { x: 200, y: 0 },
  color = "white",
  fontName = "Courier New",
  fontSize = "40px",
  textAlign = "center"
) {
  this.position = position;
  this.color = color;
  this.fontName = fontName;
  this.fontSize = fontSize;
  this.textAlign = textAlign;

  this._canvasContext.save();
  this._canvasContext.translate(position.x, position.y);
  this._canvasContext.fillStyle = color;
  this._canvasContext.font = `${this.fontSize} ${this.fontName}`;
  this._canvasContext.textAlign = this.textAlign;
  this._canvasContext.textBaseline = "top";
  this._canvasContext.fillText(text, 0, 0);
  this._canvasContext.restore();
};

const Canvas2D = new Canvas2d_Singleton();
