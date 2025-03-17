import { Kunais as e, Enemies as t } from "./Data.js";
class CollisionChecker {
  update() {
    for (let i = e.length - 1; i >= 0; i--)
      for (let l = t.length - 1; l >= 0; l--) {
        let h = e[i],
          a = t[l],
          o = h.x + (2 * h.width) / 3.5,
          s = h.y - 10,
          d = h.width / 3,
          r = h.height,
          g = a.xPosition + 30,
          n = a.yPosition + 10,
          $ = a.width / 40,
          C = a.height / 15;
        if (a.health > 0 && this.isColliding(o, s, d, r, g, n, $, C)) {
          (a.health = a.health <= h.damage ? 0 : a.health - h.damage),
            h.damageDealt.play(),
            (a.lastHit = -100),
            e.splice(i, 1);
          break;
        }
      }
  }
  isColliding(e, t, i, l, h, a, o, s) {
    return e < h + o && e + i > h && t < a + s && t + l > a;
  }
}
export default CollisionChecker;
