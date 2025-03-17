export const BackgroundSpeeds = [0, 0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8];
export const Backgrounds = [];
export const frames = {
  dead: [],
  idle: [],
  jump: [],
  run: [],
  throw: [],
  jump_throw: [],
  slide: [],
  glide: [],
};
export const framesInfo = {
  dead: { x: 578, y: 599, delay: 5 },
  idle: { x: 290, y: 500, delay: 5 },
  jump: { x: 399, y: 543, delay: 4 },
  jump_attack: { x: 495, y: 583, delay: 4 },
  run: { x: 376, y: 520, delay: 1 },
  throw: { x: 383, y: 514, delay: 2 },
  jump_throw: { x: 383, y: 514, delay: 2 },
  slide: { x: 397, y: 401, delay: 4 },
  glide: { x: 505, y: 474, delay: 4 },
};
export const actions = [
  "dead",
  "idle",
  "jump",
  "run",
  "throw",
  "jump_throw",
  "slide",
  "glide",
];
export const layersArray = [];
export let keysArray = [];
export const Skelton_explode = {
  chase_idle: { frames: 11, width: 1215, height: 751, src: [] },
  chase_ready: { frames: 3, width: 1215, height: 751, src: [] },
  chase_start: { frames: 13, width: 1215, height: 751, src: [] },
  chase_end: { frames: 3, width: 1215, height: 751, src: [] },
  explode: { frames: 13, width: 1215, height: 751, src: [] },
};

export const Enemybee = { idle: { frames: 13, src: [] } };
export const EnemiesInfo = [
  ["chase_idle", "chase_ready", "chase_start", "chase_end", "explode"],
];
export const EnemiesImages = [];
export const Enemies = [];
export const Kunais = [];
export const Hearts = [];
