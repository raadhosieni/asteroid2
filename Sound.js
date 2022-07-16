function Sound(src, volume, streamNum = 1) {
  this.streams = [];
  this.index = 0;
  this.streamNum = streamNum;
  this.src = src;
  this.snd = new Audio(src);
  for (let i = 0; i < this.streamNum; i++) {
    this.streams.push(new Audio(this.src));
    this.streams[i].volume = volume;
  }
}

Sound.prototype.play = function () {
  this.index = (this.index + 1) % this.streams.length;
  this.streams[this.index].play();
};
