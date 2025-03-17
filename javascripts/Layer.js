import { getPlayerSpeed as t } from "./script.js";
class Layer {
  constructor(t, i) {
    (this.ImageWidth = 928),
      (this.Imageheight = 793),
      (this.x = 0),
      (this.y = 0),
      (this.IMAGE = t),
      (this.ctx = i);
  }
  update() {
    this.x < -1 * this.ImageWidth && (this.x = 0), (this.x += t());
  }
  draw() {
    this.ctx.drawImage(this.IMAGE, this.x - 3 * this.ImageWidth, this.y - 80),
      this.ctx.drawImage(this.IMAGE, this.x - 2 * this.ImageWidth, this.y - 80),
      this.ctx.drawImage(this.IMAGE, this.x - this.ImageWidth, this.y - 80),
      this.ctx.drawImage(this.IMAGE, this.x, this.y - 80),
      this.ctx.drawImage(this.IMAGE, this.x + this.ImageWidth, this.y - 80),
      this.ctx.drawImage(this.IMAGE, this.x + 2 * this.ImageWidth, this.y - 80);
  }
}
export default Layer;
