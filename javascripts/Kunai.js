let image = new Image();
image.src = "./javascripts/Kunai.png";
import { Kunais as i } from "./Data.js";
import { getPlayerSpeed as t, player as s } from "./script.js";
class Kunai {
  constructor(i, t, e) {
    (this.x = t),
      (this.y = e),
      (this.ctx = i),
      (this.speed = 15),
      (this.image = image),
      (this.width = 80),
      (this.height = 16),
      (this.damage = 40),
      (this.decrementRate = 1),
      (this.counter = 0),
      (this.kunaiAudio = new Audio("../music/taking-out-knife.mp3")),
      (this.kunaiAudio.volume = 0.6),
      (this.damageDealt = new Audio("../music/kunaiDamage.mp3")),
      (this.damageDealt.volume = 0.1),
      this.kunaiAudio.play(),
      (this.dir = s.facingDirection);
  }
  update() {
    if (
      (this.damage > 0 &&
        this.counter % 5 == 0 &&
        (this.damage -= this.decrementRate),
      (this.x += this.speed * this.dir + t()),
      this.damage <= 0)
    ) {
      let s = i.indexOf(this);
      -1 !== s && i.splice(s, 1);
    }
    this.counter++;
  }
  draw() {
    -1 === this.dir
      ? (this.ctx.save(),
        this.ctx.scale(-1, 1),
        this.ctx.drawImage(
          this.image,
          -this.x - 50,
          this.y - 10,
          this.width,
          this.height
        ),
        this.ctx.restore())
      : this.ctx.drawImage(
          this.image,
          this.x,
          this.y - 10,
          this.width,
          this.height
        );
  }
}
export default Kunai;
