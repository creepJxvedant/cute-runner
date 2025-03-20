import { getPlayerSpeed as t } from "./script.js";
import { Enemies as i } from "./Data.js";
import { player as s } from "./script.js";
import { Hearts } from "./Data.js";
import Heart from "./Heart.js";
class Enemy {
  constructor(t, i, e) {
    (this.state = "chase_idle"),
      (this.willheartDrop =
        Hearts.length < 3 && Math.round(Math.random() * 5) == 1);
    (this.object = i),
      (this.isAlive = !0),
      (this.width = this.object[this.state].width),
      (this.height = this.object[this.state].height),
      (this.MAX_HEALTH = e),
      (this.health = e),
      (this.facingDirection = 0.5 > Math.random() ? 1 : -1),
      (this.xPosition =
        s.x + this.facingDirection * (500 + 500 * Math.random())),
      (this.yPosition = 585),
      (this.speed = 5 * Math.random() + 2),
      (this.ctx = t),
      (this.frame = 0),
      (this.counter = 0),
      (this.chaseDirection = 0),
      (this.damage = 500),
      (this.damageDealt = !1),
      (this.range = 700 + 300 * Math.random()),
      (this.lastHit = 0),
      (this.deadSound = new Audio("./cute-runner/music/enemyblast.mp3")),
      (this.duration = 1e3);
  }

  addHeart() {
    const newHeart = new Heart(this.ctx, this.xPosition);
    Hearts.push(newHeart);
  }

  update() {
    if (this.lastHit < 0) this.lastHit++;

    if (
      this.willheartDrop &&
      this.health < this.MAX_HEALTH &&
      this.counter % 100 === 0
    ) {
      this.health++;
    }

    if (this.getDistance() > 1e3 + 200) {
      this.duration--;
      if (this.duration <= 0) {
        let e = i.indexOf(this);
        -1 !== e && i.splice(e, 1);
        return;
      }
    }
    if (this.isAlive) {
      let h = this.getDistance(),
        a = this.state;
      (this.chaseDirection = 0),
        this.health <= 0
          ? ((this.state = "explode"), (this.isAlive = !1))
          : h > this.range
          ? (this.state = "chase_idle")
          : ((this.state = "chase_ready"),
            h < 100
              ? (this.state = "explode")
              : ((this.state = "chase_start"),
                (this.chaseDirection = this.xPosition > s.x - 40 ? -1 : 1))),
        (this.frame = this.state !== a ? 0 : this.frame),
        0 !== this.chaseDirection &&
          (this.facingDirection = this.chaseDirection);
    } else {
      1 === this.frame && this.deadSound.play();
      let o = (this.range - this.getDistance()) * 0.001;
      (this.deadSound.volume = Math.max(0, 0.2 + o > 0.8 ? 0.8 : o)),
        this.frame >= 12 && (i.splice(i.indexOf(this), 1), (s.score += 1));
    }

    if (this.counter % 5 == 0) {
      if ("explode" === this.state) {
        if (8 === this.frame && this.willheartDrop && this.health <= 0) {
          this.addHeart();
        }
        if (
          this.frame > 2 &&
          this.frame < 6 &&
          120 >= this.getDistance() &&
          !this.damageDealt
        ) {
          let c = Math.floor(this.damage / Math.abs(this.getDistance() - 30)),
            n = Math.abs(s.y - this.yPosition);
          n > 80 && (c = Math.max(0, c - 100)),
            (s.health = s.health - c <= 0 ? 0 : s.health - c),
            c > 0 && s.damageTaken.play(),
            (this.damageDealt = !0);
        }
        this.isAlive = !1;
      }
      this.frame = (this.frame + 1) % this.object[this.state].frames;
    }
    (this.xPosition += this.speed * this.chaseDirection + t()), this.counter++;
  }
  getDistance() {
    let t = -40 + s.x - this.xPosition,
      i = s.y - this.yPosition;
    return Math.sqrt(t * t + i * i);
  }
  draw() {
    this.ctx.save(),
      -1 === this.facingDirection
        ? this.ctx.drawImage(
            this.object[this.state].src[this.frame],
            this.xPosition,
            this.yPosition - 20,
            this.width / 8,
            this.height / 8
          )
        : (this.ctx.translate(this.xPosition + this.width / 8, 0),
          this.ctx.scale(-1, 1),
          this.ctx.drawImage(
            this.object[this.state].src[this.frame],
            0,
            this.yPosition - 20,
            this.width / 8,
            this.height / 8
          )),
      this.ctx.restore(),
      (this.ctx.fillStyle = "#000");

    if (this.lastHit < 0) {
      this.ctx.fillRect(this.xPosition + 30, this.yPosition, 100, 3),
        (this.ctx.fillStyle = "red"),
        this.ctx.fillRect(
          this.xPosition + 30,
          this.yPosition,
          (this.health / 80) * 100,
          3
        );
    }
  }
}
export default Enemy;
