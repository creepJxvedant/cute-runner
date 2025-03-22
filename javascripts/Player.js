import {
  framesInfo as i,
  frames as t,
  keysArray as s,
  Kunais as h,
} from "./Data.js";
import e from "./Kunai.js";
import { updatePlayerSpeed as r } from "./script.js";

const gameOverImg = new Image();
gameOverImg.src = "./Background/game-over.png";


const knifeOut=new Audio('https://github.com/creepJxvedant/cute-runner/music/taking-out-knife.mp3');
const knifeDamage=new Audio('https://github.com/creepJxvedant/cute-runner/music/kunai-Damage.mp3');

class Player {
  constructor(i, t) {
    (this.width = 290),
      (this.height = 500),
      (this.yVelocity = 0),
      (this.jumpForce = -15),
      (this.gravity = 0.7),
      (this.frame = 0),
      (this.maxframes = 10),
      (this.x = this.width),
      (this.CANVASHEIGHT = t),
      (this.groundLevel = this.CANVASHEIGHT - this.width / 3 - 20),
      (this.y = this.groundLevel),
      (this.weight = 1),
      (this.onGround = !0),
      (this.counter = 0),
      (this.state = "idle"),
      (this.ctx = i),
      (this.kunaiDelay = 20),
      (this.direction = 0),
      (this.XPosition = 0),
      (this.MaxXposition = 0),
      (this.offet = -60),
      (this.health = 100),
      (this.isAlive = !0),
      (this.score = 0),
      (this.facingDirection = 1),
      (this.img = new Image()),
      (this.img.src = "./javascripts/Idle__000.png"),
      (this.gameOver = !1),
      (this.airResitance = 0),
      (this.isGliding = !1),
      (this.damageTaken = new Audio(
        "https://creepjxvedant.github.io/cute-runner/music/sufferingDamage.mp3"
      )),
      (this.damageTaken.volume = 0.4),
      (this.deadSound = new Audio(
        "https://creepjxvedant.github.io/cute-runner/music/game-over.mp3"
      )),
      (this.jumpSound = new Audio(
        "https://creepjxvedant.github.io/cute-runner/music/jumped.mp3"
      )),
      (this.jumpSound.volume = 0.3),
      (this.glidingAudio = new Audio(
        "https://creepjxvedant.github.io/cute-runner/music/gliding.mp3"
      )),
      (this.glidingAudio.volume = 1),
      (this.glidingAudio.loop = !0),
      (this.reverseAllowed = 200);
  }
  jump() {
    this.onGround &&
      ((this.yVelocity = this.jumpForce),
      (this.onGround = !1),
      this.jumpSound.play());
  }
  createKunai() {
    let i = new e(this.ctx, this.x, this.y, this.BackGroundSpeed,knifeOut,knifeDamage);
    i.kunaiAudio.play(), h.push(i);
  }
  throw() {
    this.kunaiDelay <= 0 && (this.createKunai(), (this.kunaiDelay = 20));
  }
  update() {
    if (this.gameOver) {
      return;
    }
    this.counter % i[this.getKeyState()].delay == 0 &&
      (this.isAlive || this.frame < 8
        ? (this.isAlive || 1 != this.frame || this.deadSound.play(),
          (this.frame = (this.frame + 1) % this.maxframes))
        : (this.gameOver = !0),
      this.isAlive &&
        this.state !== this.getKeyState() &&
        ((this.state = this.getKeyState()),
        (this.frame = 0),
        (this.counter = 0)),
      this.health <= 0 &&
        this.isAlive &&
        ((this.isAlive = !1), (this.state = "dead"), (this.frame = 0)),
      (this.width = i[this.state].x),
      (this.height = i[this.state].y)),
      this.isAlive &&
        (this.setDirection(),
        (this.XPosition += this.direction),
        (this.MaxXposition = Math.min(this.MaxXposition, this.XPosition)),
        r(10 * this.direction),
        !this.onGround && this.yVelocity > 0 && this.isGliding
          ? (this.glidingAudio.play(), (this.airResitance = -0.65))
          : ((this.airResitance = 0), this.glidingAudio.pause()),
        (this.yVelocity += this.gravity + this.airResitance),
        (this.y += this.yVelocity),
        this.y >= this.groundLevel &&
          ((this.y = this.groundLevel),
          (this.yVelocity = 0),
          (this.onGround = !0))),
      this.counter++,
      this.kunaiDelay--;
  }
  setDirection() {
    let i = this.MaxXposition - this.XPosition;
    Math.abs(i) < this.reverseAllowed && s.includes("ArrowLeft")
      ? ((this.direction = 1), (this.facingDirection = -1))
      : s.includes("ArrowRight")
      ? ((this.direction = -1), (this.facingDirection = 1))
      : (this.direction = 0);
  }
  getKeyState() {
    return ((this.offet = -60), this.isAlive)
      ? !this.onGround &&
        s.includes("ArrowUp") &&
        s.includes("Shift") &&
        this.yVelocity >= -2 &&
        (s.includes("ArrowLeft") || s.includes("ArrowRight"))
        ? ((this.isGliding = !0), "glide")
        : ((this.isGliding = !1), s.includes(" ") && s.includes("ArrowUp"))
        ? (this.jump(), this.throw(), "jump_throw")
        : this.onGround &&
          s.includes("ArrowDown") &&
          (s.includes("ArrowLeft") || s.includes("ArrowRight"))
        ? ((this.offet = -40), "slide")
        : this.onGround &&
          s.includes(" ") &&
          (s.includes("ArrowLeft") || s.includes("ArrowRight"))
        ? (this.throw(), "run")
        : s.includes("ArrowUp") &&
          (s.includes("ArrowLeft") || s.includes("ArrowRight"))
        ? (this.jump(), "jump")
        : s.includes(" ")
        ? (this.throw(), "throw")
        : s.includes("ArrowRight") || s.includes("ArrowLeft")
        ? "run"
        : s.includes("ArrowUp")
        ? (this.jump(), "idle")
        : s.includes(" ")
        ? "throw"
        : "idle"
      : "dead";
  }
  draw() {
    this.ctx.save(),
      -1 === this.facingDirection
        ? (this.ctx.scale(-1, 1),
          this.ctx.drawImage(
            t[this.state][this.frame],
            -this.x - this.width / 5,
            this.y + this.offet,
            this.width / 5,
            this.height / 5
          ))
        : this.ctx.drawImage(
            t[this.state][this.frame],
            this.x,
            this.y + this.offet,
            this.width / 5,
            this.height / 5
          ),
      this.ctx.restore(),
      h.forEach((i) => {
        i.update(), i.draw();
      }),
      this.ctx.drawImage(this.img, 10, 10, 40, 60),
      (this.ctx.fillStyle = "black"),
      this.ctx.fillRect(58, 38, 104, 24),
      (this.ctx.fillStyle = "red"),
      this.health && this.ctx.fillRect(60, 40, this.health, 20);

    if (!this.isAlive) {
      this.ctx.globalAlpha = 0.4;
      this.ctx.drawImage(gameOverImg, 450, 200, 650, 400);

      this.ctx.globalAlpha = 1;
    }
  }
}
export default Player;
