import {
  BackgroundSpeeds as e,
  Backgrounds as t,
  frames as l,
  actions as n,
  layersArray as r,
  keysArray as o,
  Enemies as a,
  Skelton_explode as i,
  EnemiesInfo as s,
  Enemybee as p,
  Hearts,
  keysArray,
} from "./Data.js";
import c from "./Layer.js";
import $ from "./Player.js";
import f from "./Enemy.js";
import u from "./CollisionChecker.js";
import d from "./Plant.js";

export let totalPlant = 0;
export let player = null;
let PlayerSpeed = 0;
export const speed = 10;
let MAX_ENEMIES = 20;
const enemyblast = new Audio("https://creepjxvedant.github.io/cute-runner/music/enemyblast.mp3");

export function updatePlayerSpeed(e) {
  PlayerSpeed = e;
}

export function getPlayerSpeed() {
  return PlayerSpeed;
}

export function totalPlantDecrement() {
  totalPlant--;
}

let music = new Audio();
music.src = "./music/suspence-background-25609.mp3";
music.volume = 1;
music.loop = true;

let assetsToLoad = 0;
let assetsLoaded = 0;

function startGame() {
  let canvas = document.querySelector(".canvas");
  canvas.width = 0.98 * window.innerWidth;
  canvas.height = window.innerHeight;
  let ctx = canvas.getContext("2d");

  ctx.font = "22px Arial";

  let collisionChecker = new u();
  player = new $(ctx, canvas.height, PlayerSpeed);

  function spawnEntities() {
    if (a.length < MAX_ENEMIES) {
      let enemy = new f(ctx, i, 80, enemyblast);
      a.push(enemy);
    }
    if (totalPlant < 3) {
      let plant = new d(ctx);
      a.push(plant);
      totalPlant++;
    }
  }

  let enemySpawner = setInterval(spawnEntities, 1000);

  function gameLoop() {
    if (player.isAlive) {
      if (music.paused) music.play().catch(() => {});

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      r.forEach((layer) => {
        if (player.isAlive) layer.update();
        layer.draw();
      });

      Hearts.forEach((heart) => {
        heart.update();
        heart.draw();
      });

      if (a.length === 0) spawnEntities();

      a.forEach((entity) => {
        entity.update();
        entity.draw();
      });

      if (player.isAlive) {
        drawEnemyCount();
        drawScore();
        collisionChecker.update(ctx);
      } else {
        clearInterval(enemySpawner);
      }

      player.update();
      player.draw();

      requestAnimationFrame(gameLoop);
    }
  }

  function drawEnemyCount() {
    ctx.fillStyle = "#f04";
    ctx.fillText(`EnemyCount : ${a.length}`, window.innerWidth - 198, 102, 200);
    ctx.fillStyle = "black";
    ctx.fillText(`EnemyCount : ${a.length}`, window.innerWidth - 200, 100, 200);
  }

  function drawScore() {
    ctx.fillStyle = "#f04";
    ctx.fillText(`score : ${player.score}`, 60, 100, 200);
    ctx.fillStyle = "#000";
    ctx.fillText(`score : ${player.score}`, 58, 98, 200);
  }

  gameLoop();
}

function preloadAssets() {
  window.addEventListener("keydown", (e) => {
    if (!keysArray.includes(e.key)) {
      keysArray.push(e.key);
    }
  });

  window.addEventListener("keyup", (e) => {
    if (keysArray.includes(e.key)) {
      keysArray.splice(keysArray.indexOf(e.key), 1);
    }
  });

  n.forEach((action) => {
    l[action] = [];
    for (let t = 0; t < 10; t++) {
      let img = new Image();
      img.src = `./player_sprites/${action}/${t}.png`;
      l[action].push(img);
    }
  });

  s.forEach((enemyList) => {
    enemyList.forEach((enemy) => {
      i[enemy].src = [];
      for (let t = 0; t < i[enemy].frames; t++) {
        let img = new Image();
        img.src = `./Enemies/skelton_explode/${enemy}/${t}.png`;
        i[enemy].src.push(img);
      }
    });
  });

  for (let u = 0; u < e.length; u++) {
    let img = new Image();
    img.src = `./Background/Layer_${u}.png`;
    t.push(img);
  }

  t.reverse();
  t.forEach((bg) => {
    r.push(new c(bg, document.querySelector(".canvas").getContext("2d")));
  });

  setTimeout(startGame, 5000);
}

window.addEventListener("load", () => {
  preloadAssets();

  window.addEventListener("resize", () => {
    let canvas = document.querySelector(".canvas");
    canvas.width = 0.98 * window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
