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
import c from "../javascripts/Layer.js";
import $ from "../javascripts/Player.js";
import f from "../javascripts/Enemy.js";
import u from "../javascripts/CollisionChecker.js";
import d from "../javascripts/Plant.js";
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
let music = null;
window.addEventListener("DOMContentLoaded", () => {
  let h = document.querySelector(".canvas"),
    y = (h.width = 0.98 * window.innerWidth),
    m = (h.height = window.innerHeight),
    g = h.getContext("2d");
  function w() {
    (g.font = "25px impact"),
      ((music = new Audio()).src =
        "../cute-runner/music/suspence-background-25609.mp3"),
      (music.volume = 1),
      window.addEventListener("keydown", (e) => {
        (player.isAlive && o.includes(e.key)) || o.push(e.key);
      }),
      window.addEventListener("keyup", (e) => {
        let t = o.indexOf(e.key);
        -1 != t && o.splice(t, 1);
      }),
      n.forEach((e) => {
        for (let t = 0; t < 10; t++) {
          let n = new Image(),
            r = `./cute-runner/player_sprites/${e}/${t}.png`;
          (n.src = r), l[e].push(n);
        }
      }),
      s.forEach((e) => {
        e.forEach((e) => {
          for (let t = 0; t < i[e].frames; t++) {
            let l = new Image();
            (l.src = `./cute-runner/Enemies/skelton_explode/${e}/${t}.png`),
              i[e].src.push(l);
          }
        });
      });

    for (let u = 0; u < e.length; u++) {
      let d = new Image(),
        h = `./cute-runner/Background/Layer_${u}.png`;
      (d.src = h), t.push(d);
    }
    t.reverse(),
      t.forEach((e) => {
        r.push(new c(e, g));
      });
  }
  function E() {
    if (a.length < MAX_ENEMIES) {
      let e = new f(g, i, 80);
      a.push(e);
    }
    if (totalPlant < 3) {
      let t = new d(g);
      a.push(t), totalPlant++;
    }
  }
  let _ = new u(),
    x = new $(g, m, PlayerSpeed);
  player = x;
  let P = setInterval(E, 1e3, []);

  function S() {
    player.isAlive && music.play(),
      g.clearRect(0, 0, y, m),
      r.forEach((e) => {
        player.isAlive && e.update(), e.draw();
      }),
      Hearts.forEach((heart) => {
        heart.update();
        heart.draw();
      }),
      0 === a.length && E(),
      a.forEach((e) => {
        e.update(), e.draw();
      }),
      player.isAlive ? (k(), v(), _.update(g)) : clearInterval(P);
    x.update(), x.draw(), requestAnimationFrame(S);
  }
  function k() {
    (g.fillStyle = "#f04"),
      g.fillText(`EnemyCount : ${a.length}`, window.innerWidth - 198, 102, 100),
      (g.fillStyle = "black"),
      g.fillText(`EnemyCount : ${a.length}`, window.innerWidth - 200, 100, 100);
  }
  function v() {
    (g.fillStyle = "#f04"),
      g.fillText(`score : ${x.score}`, 60, 100, 100),
      (g.fillStyle = "#000"),
      g.fillText(`score : ${x.score}`, 58, 98, 100);
  }

  window.addEventListener("load", () => {
    w();
    S();
  });
});
