import { getPlayerSpeed, player } from "./script.js";
import { Hearts } from "./Data.js";
class Heart {
  constructor(ctx, xPosition) {
    this.width = 16;
    this.height = 16;
    this.health = 30;
    this.xPosition = xPosition;
    this.yPosition = 610;
    this.ctx = ctx;
    this.frameX = 0;
    this.frameY = 0;
    this.counter = 0;
    this.range = 40;
    this.img = new Image();
    this.img.src = "./HeartPickup.png";
    this.availableTime = 1e3;
  }

  update() {
    const dist = this.getDistance();

    if (this.counter % 8 === 0) {
      this.frameY = this.frameX % 3 == 0 ? 1 - this.frameY : this.frameY;
      this.frameX = this.frameX % 3;

      this.frameX++;
    }

    if (player.isAlive && dist < this.range) {
      player.health =
        player.health + this.health > 100 ? 100 : this.health + player.health;
      Hearts.splice(Hearts.indexOf(this), 1);
    }

    if (this.availableTime <= 0) {
      Hearts.splice(Hearts.indexOf(this), 1);
    }

    this.xPosition += getPlayerSpeed();
    this.counter++;
    this.availableTime--;
  }

  getDistance() {
    const dx = player.x + 5 - this.xPosition + 8;
    const dy = player.y - 50 - this.yPosition + 8;
    return Math.sqrt(dx * dx + dy * dy);
  }

  draw() {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(this.xPosition - 5, this.yPosition, 50, 3);

    /*
      
    (50)=5000
          40=4000
          10=1000
          1=100
    */
    this.ctx.fillStyle = "purple";

    this.ctx.fillRect(
      this.xPosition - 5,
      this.yPosition,
      this.availableTime / 20,
      3
    );

    this.ctx.fillStyle = "#000";

    this.ctx.drawImage(
      this.img,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.xPosition,
      this.yPosition,
      this.width * 2.5,
      this.height * 2.5
    );
  }
}

export default Heart;
