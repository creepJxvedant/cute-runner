import { getPlayerSpeed, player, totalPlantDecrement } from "./script.js";
import { Enemies } from "./Data.js";

class Plant {
  constructor(ctx) {
    this.width = 120;
    this.height = 87;
    this.health = Infinity;
    this.xPosition = player.x + Math.random() * 400 + Math.random() * 600 + 100;
    this.yPosition = 575;
    this.ctx = ctx;
    this.frame = 0;
    this.counter = 0;
    this.damage = Math.round(1 + Math.random() * 10);
    this.range = 50;
    this.img = new Image();
    this.img.src = "./cute-runner/Enemies/enemy_plant.png";
    this.timer = 500;
    this.damageCooldown = 0;
    this.cooldownTime = 0.5;
  }

  update() {
    if (this.counter % 5 === 0) {
      this.frame = 1 - this.frame;
    }

    if (this.damageCooldown > 0) {
      this.damageCooldown -= 1;
    }

    const dist = this.getDistance();

    if (dist < this.range && this.damageCooldown <= 0) {
      player.health -= player.health - this.damage < 0 ? 0 : this.damage;
      player.damageTaken.play();
      this.damageCooldown = this.cooldownTime * 60;
    }

    if (this.counter >= this.timer) {
      Enemies.splice(Enemies.indexOf(this), 1);
      totalPlantDecrement();
    }

    this.xPosition += getPlayerSpeed();
    this.xPosition < 0 ? 0 : this.xPosition;

    this.counter++;
  }

  getDistance() {
    const dx = 40 + player.x - this.xPosition;
    const dy = player.y - this.yPosition;
    return Math.sqrt(dx * dx + dy * dy);
  }

  draw() {
    this.ctx.drawImage(
      this.img,
      this.frame * 60,
      0,
      this.width / 2,
      this.height,
      this.xPosition,
      this.yPosition,
      this.width / 2,
      this.height
    );
  }
}

export default Plant;
