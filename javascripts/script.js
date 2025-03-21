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
  Enemies,
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

// Asset loading tracking
let assetsToLoad = 0;
let assetsLoaded = 0;

function startGame() {
  let canvas = document.querySelector(".canvas"),
    canvasWidth = (canvas.width = 0.98 * window.innerWidth),
    canvasHeight = (canvas.height = window.innerHeight),
    ctx = canvas.getContext("2d");

  let collisionChecker = new u();
  let playerInstance = new $(ctx, canvasHeight, PlayerSpeed);
  player = playerInstance;

  function spawnEntities() {
    if (a.length < MAX_ENEMIES) {
      let enemy = new f(ctx, i, 80);
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
      // Start music once when the game is ready
      if (music.paused) music.play();

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Update backgrounds
      r.forEach((layer) => {
        player.isAlive && layer.update();
        layer.draw();
      });

      // Update and draw hearts
      Hearts.forEach((heart) => {
        heart.update();
        heart.draw();
      });

      // Ensure at least one enemy is present
      if (a.length === 0) spawnEntities();

      // Update and draw enemies and plants
      a.forEach((entity) => {
        entity.update();
        entity.draw();
      });

      // Update collision checker
      if (player.isAlive) {
        drawEnemyCount();
        drawScore();
        collisionChecker.update(ctx);
      } else {
        clearInterval(enemySpawner);
      }

      // Update and draw player
      player.update();
      player.draw();

      requestAnimationFrame(gameLoop);
    }
  }

  function drawEnemyCount() {
    ctx.fillStyle = "#f04";
    ctx.fillText(`EnemyCount : ${a.length}`, window.innerWidth - 198, 102, 100);
    ctx.fillStyle = "black";
    ctx.fillText(`EnemyCount : ${a.length}`, window.innerWidth - 200, 100, 100);
  }

  function drawScore() {
    ctx.fillStyle = "#f04";
    ctx.fillText(`score : ${player.score}`, 60, 100, 100);
    ctx.fillStyle = "#000";
    ctx.fillText(`score : ${player.score}`, 58, 98, 100);
  }

  gameLoop();
}

function trackAssetLoad() {
  assetsLoaded++;
  if (assetsLoaded === assetsToLoad) {
    startGame();
  }
}

function preloadAssets() {
  assetsToLoad = 1; // Music counts as one asset

  // Preload player sprites
  n.forEach((action) => {
    l[action] = [];
    for (let t = 0; t < 10; t++) {
      let img = new Image();
      img.src = `./player_sprites/${action}/${t}.png`;
      img.onload = trackAssetLoad;
      assetsToLoad++;
      l[action].push(img);
    }
  });

  // Preload enemy explosion sprites
  s.forEach((enemyList) => {
    enemyList.forEach((enemy) => {
      i[enemy].src = [];
      for (let t = 0; t < i[enemy].frames; t++) {
        let img = new Image();
        img.src = `./Enemies/skelton_explode/${enemy}/${t}.png`;
        img.onload = trackAssetLoad;
        assetsToLoad++;
        i[enemy].src.push(img);
      }
    });
  });

  // Preload background layers
  for (let u = 0; u < e.length; u++) {
    let img = new Image();
    img.src = `./Background/Layer_${u}.png`;
    img.onload = trackAssetLoad;
    assetsToLoad++;
    t.push(img);
  }

  t.reverse();
  t.forEach((bg) => {
    r.push(new c(bg, document.querySelector(".canvas").getContext("2d")));
  });

  // Preload music
  music.oncanplaythrough = trackAssetLoad;
}

window.addEventListener("load", () => {
  preloadAssets();

  // Handle window resizing
  window.addEventListener("resize", () => {
    let canvas = document.querySelector(".canvas");
    canvas.width = 0.98 * window.innerWidth;
    canvas.height = window.innerHeight;
  });
});
