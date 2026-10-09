// Rig + behaviour for the little person who wanders along the bottom of the viewport.
// Pure DOM/JS (no React/GSAP) so it can be tested standalone. See components/Walker.jsx.

const D = Math.PI / 180;
const GROUND = 92.5;
const HIP_STAND = 56;
const LEG = 17;
const ARM_U = 13;
const ARM_L = 12;
const WALK_SPEED = 62; // px / second
const SMOOTH = 16; // pose blending rate

// Angles are in degrees measured from "straight down"; positive swings forward (facing direction).
export const BASE = {
  lean: 0, tilt: 0, hipY: HIP_STAND,
  aFu: 6, aFl: 14, aBu: -4, aBl: 6,
  lFt: 2, lFs: 0, lBt: -2, lBs: 0,
  phone: 0, bike: 0,
};
const CHANNELS = Object.keys(BASE);

const dirDown = (a, len) => [Math.sin(a * D) * len, Math.cos(a * D) * len];
// Bicycle geometry (viewBox units; the rider's hip stays at x=40).
const BIKE = {
  rearWheel: [28, 79.5], frontWheel: [66, 79.5], wheelR: 12.5,
  crank: [46, 78], crankLen: 7, grip: [62, 56], hipY: 54,
};

/** Two-bone IK in the rig's "angle from straight down" convention. bend=+1 → joint bends forward. */
function ik(S, T, l1, l2, bend) {
  const dx = T[0] - S[0];
  const dy = T[1] - S[1];
  const d = Math.min(l1 + l2 - 0.01, Math.max(Math.abs(l1 - l2) + 0.01, Math.hypot(dx, dy)));
  const base = Math.atan2(dx, dy);
  const A = Math.acos(Math.max(-1, Math.min(1, (l1 * l1 + d * d - l2 * l2) / (2 * l1 * d))));
  const a1 = base + bend * A;
  const E = [S[0] + Math.sin(a1) * l1, S[1] + Math.cos(a1) * l1];
  const a2 = Math.atan2(T[0] - E[0], T[1] - E[1]);
  return [a1 / D, a2 / D];
}

const pts = (...p) => p.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' ');

/** Draw the figure for a pose. `svg` must contain elements marked with data-p. */
export function renderPose(svg, p, parts = svg.__parts, extra = { wheel: 0, pedal: 0 }) {
  const q = parts;
  const hx = 40;
  const hy = p.hipY;
  const up = [Math.sin(p.lean * D), -Math.cos(p.lean * D)];
  const neck = [hx + up[0] * 22, hy + up[1] * 22];
  const shoulder = [hx + up[0] * 18, hy + up[1] * 18];

  const limb = (start, a1, l1, a2, l2) => {
    const mid = [start[0] + dirDown(a1, l1)[0], start[1] + dirDown(a1, l1)[1]];
    const end = [mid[0] + dirDown(a2, l2)[0], mid[1] + dirDown(a2, l2)[1]];
    return [mid, end];
  };

  const hip = [hx, hy];
  const [kB, aB] = limb(hip, p.lBt, LEG, p.lBs, LEG);
  const [kF, aF] = limb(hip, p.lFt, LEG, p.lFs, LEG);
  const [eB, hB] = limb(shoulder, p.aBu, ARM_U, p.aBl, ARM_L);
  const [eF, hF] = limb(shoulder, p.aFu, ARM_U, p.aFl, ARM_L);
  const foot = (ankle, a) => [ankle[0] + Math.cos(a * D) * 5.5, ankle[1] - Math.sin(a * D) * 5.5];

  q.legB.setAttribute('points', pts(hip, kB, aB));
  q.footB.setAttribute('points', pts(aB, foot(aB, p.lBs)));
  q.armB.setAttribute('points', pts(shoulder, eB, hB));
  q.handB.setAttribute('cx', hB[0]); q.handB.setAttribute('cy', hB[1]);
  q.torso.setAttribute('points', pts(hip, neck));
  q.legF.setAttribute('points', pts(hip, kF, aF));
  q.footF.setAttribute('points', pts(aF, foot(aF, p.lFs)));
  q.armF.setAttribute('points', pts(shoulder, eF, hF));
  q.handF.setAttribute('cx', hF[0]); q.handF.setAttribute('cy', hF[1]);

  const headAngle = p.lean + p.tilt;
  const hc = [neck[0] + Math.sin(headAngle * D) * 9.5, neck[1] - Math.cos(headAngle * D) * 9.5];
  q.head.setAttribute('transform', `translate(${hc[0].toFixed(2)} ${hc[1].toFixed(2)}) rotate(${headAngle.toFixed(2)})`);

  q.phone.setAttribute('transform', `translate(${(hF[0] + 1.5).toFixed(2)} ${(hF[1] - 2).toFixed(2)}) rotate(20)`);
  q.phone.style.opacity = p.phone.toFixed(2);

  // bicycle (hidden unless riding)
  q.bike.style.opacity = p.bike.toFixed(2);
  if (p.bike > 0.02) {
    const [rx, ry] = BIKE.rearWheel;
    const [fx, fy] = BIKE.frontWheel;
    q.wheelR.setAttribute('transform', `rotate(${extra.wheel.toFixed(1)} ${rx} ${ry})`);
    q.wheelF.setAttribute('transform', `rotate(${extra.wheel.toFixed(1)} ${fx} ${fy})`);
    const [bx, by] = BIKE.crank;
    const a = [bx + Math.cos(extra.pedal) * BIKE.crankLen, by + Math.sin(extra.pedal) * BIKE.crankLen];
    const b = [bx - Math.cos(extra.pedal) * BIKE.crankLen, by - Math.sin(extra.pedal) * BIKE.crankLen];
    q.crankA.setAttribute('points', pts([bx, by], a));
    q.crankB.setAttribute('points', pts([bx, by], b));
  }

  const lift = Math.max(0, HIP_STAND - hy);
  q.shadow.setAttribute('rx', (14 + p.bike * 14 + (hy - HIP_STAND) * 0.15 - lift * 0.15).toFixed(2));
  q.shadow.style.opacity = Math.max(0.08, 0.35 - lift * 0.006).toFixed(2);
}

export function collectParts(svg) {
  const parts = {};
  svg.querySelectorAll('[data-p]').forEach((el) => { parts[el.dataset.p] = el; });
  svg.__parts = parts;
  return parts;
}

// ─── Actions: each frame they write the *target* pose; the engine blends toward it ─────────────

const reset = (s) => Object.assign(s.target, BASE);
const breathe = (t) => Math.sin(t * 2);

const walk = (targetX) => (s) => {
  const dir = Math.sign(targetX - s.x) || 1;
  s.facing = dir;
  let t = 0;
  return (dt) => {
    t += dt;
    const ph = t * 6.8;
    s.x += dir * WALK_SPEED * dt;
    const sw = (k) => Math.sin(ph + k);
    const bend = (k) => 6 + 34 * Math.max(0, Math.cos(ph + k));
    reset(s);
    Object.assign(s.target, {
      lean: 3,
      hipY: HIP_STAND + 1.4 * Math.cos(ph * 2) + 0.6,
      lFt: 28 * sw(0), lFs: 28 * sw(0) - bend(0),
      lBt: 28 * sw(Math.PI), lBs: 28 * sw(Math.PI) - bend(Math.PI),
      aFu: -24 * sw(0), aFl: -24 * sw(0) + 16,
      aBu: -24 * sw(Math.PI), aBl: -24 * sw(Math.PI) + 16,
    });
    return dir > 0 ? s.x >= targetX : s.x <= targetX;
  };
};

const idle = () => (s) => {
  let t = 0;
  const dur = 2 + Math.random() * 2;
  if (Math.random() < 0.5) s.facing *= -1;
  return (dt) => {
    t += dt;
    reset(s);
    Object.assign(s.target, {
      tilt: 14 * Math.sin(t * 1.3),
      lean: 0.8 * breathe(t),
      aFu: 6 + 2 * breathe(t), aFl: 14 + 2 * breathe(t),
    });
    return t >= dur;
  };
};

const wave = () => (s) => {
  let t = 0;
  return (dt) => {
    t += dt;
    reset(s);
    Object.assign(s.target, { aFu: 150, aFl: 168 + 26 * Math.sin(t * 10), tilt: -6, lean: -1.5 });
    return t >= 2.6;
  };
};

const jump = () => (s) => {
  let t = 0;
  const count = 1 + Math.floor(Math.random() * 2);
  return (dt) => {
    t += dt;
    const u = t % 1;
    reset(s);
    const crouch = { hipY: 63, lFt: 38, lFs: -22, lBt: 34, lBs: -20, lean: 8, aFu: 40, aFl: 20, aBu: 30, aBl: 15 };
    if (u < 0.18 || u > 0.82) {
      Object.assign(s.target, crouch);
    } else {
      const a = (u - 0.18) / 0.64;
      Object.assign(s.target, {
        hipY: HIP_STAND - 30 * Math.sin(a * Math.PI),
        lFt: 20, lFs: -12, lBt: 8, lBs: -22,
        aFu: 162, aFl: 168, aBu: 150, aBl: 160, lean: -3,
      });
    }
    return t >= count;
  };
};

const stretch = () => (s) => {
  let t = 0;
  return (dt) => {
    t += dt;
    reset(s);
    Object.assign(s.target, {
      aFu: 176 + 2 * breathe(t), aFl: 178, aBu: 170, aBl: 176,
      lean: -7, tilt: -12, hipY: HIP_STAND - 1.2,
    });
    return t >= 2.4;
  };
};

const dance = () => (s) => {
  let t = 0;
  return (dt) => {
    t += dt;
    const b = Math.sin(t * 9);
    reset(s);
    Object.assign(s.target, {
      hipY: HIP_STAND + 2.5 * Math.abs(b),
      lean: 5 * Math.sin(t * 4.5), tilt: 8 * b,
      aFu: 112 + 52 * b, aFl: 138 + 52 * b,
      aBu: 112 - 52 * b, aBl: 138 - 52 * b,
      lFt: 14 * b, lFs: 14 * b - 18 * Math.max(0, -b),
      lBt: -14 * b, lBs: -14 * b - 18 * Math.max(0, b),
    });
    return t >= 3.8;
  };
};

const sit = () => (s) => {
  let t = 0;
  const dur = 4.5 + Math.random() * 2;
  return (dt) => {
    t += dt;
    reset(s);
    Object.assign(s.target, {
      hipY: 87, lean: 12 + 1.5 * breathe(t), tilt: 24,
      lFt: 78, lFs: 88, lBt: 66, lBs: 82,
      aFu: 38, aFl: 118, aBu: 30, aBl: 112, phone: 1,
    });
    return t >= dur;
  };
};

const cycle = (targetX) => (s) => {
  const dir = Math.sign(targetX - s.x) || 1;
  s.facing = dir;
  let t = 0;
  let phase = 'mount';
  let dismountT = 0;
  const CRUISE = 120; // px/s
  return (dt) => {
    t += dt;
    reset(s);
    if (phase === 'dismount') {
      dismountT += dt;
      s.target.bike = 0;
      return dismountT >= 0.5;
    }

    const remaining = Math.abs(targetX - s.x);
    const speed = phase === 'mount' ? 0
      : CRUISE * Math.min(1, (t - 0.5) / 0.7) * Math.max(0.2, Math.min(1, remaining / 110));
    if (phase === 'mount' && t >= 0.55) phase = 'ride';
    s.x += dir * speed * dt;
    const turn = (speed * dt) / BIKE.wheelR;
    s.wheel += turn / D;
    s.pedal += turn * 0.55;

    const lean = 30;
    const hip = [40, BIKE.hipY + 0.5 * Math.sin(s.pedal * 2)];
    const sh = [hip[0] + Math.sin(lean * D) * 18, hip[1] - Math.cos(lean * D) * 18];
    const [bx, by] = BIKE.crank;
    const foot = (k) => [bx + Math.cos(s.pedal + k) * BIKE.crankLen - 2, by + Math.sin(s.pedal + k) * BIKE.crankLen - 2.5];
    const [lFt, lFs] = ik(hip, foot(0), LEG, LEG, 1);
    const [lBt, lBs] = ik(hip, foot(Math.PI), LEG, LEG, 1);
    const [aFu, aFl] = ik(sh, BIKE.grip, ARM_U, ARM_L, -1);
    const [aBu, aBl] = ik(sh, [BIKE.grip[0] - 1, BIKE.grip[1] + 0.5], ARM_U, ARM_L, -1);

    Object.assign(s.target, {
      bike: 1, lean, tilt: -24, hipY: hip[1],
      lFt, lFs, lBt, lBs, aFu, aFl, aBu, aBl,
    });
    if (remaining < 4 && phase === 'ride') phase = 'dismount';
    return false;
  };
};

const ACTIONS = [
  ['walk', 34], ['cycle', 16], ['idle', 12], ['wave', 10], ['jump', 9], ['stretch', 8], ['dance', 8], ['sit', 13],
];
const FACTORIES = { idle, wave, jump, stretch, dance, sit };

export function startWalker({ root, svg, bounds, script }) {
  const parts = collectParts(svg);
  const cur = { ...BASE };
  const s = { x: 0, facing: 1, wheel: 0, pedal: 0, target: { ...BASE } };
  let scriptIndex = 0;
  const range = () => {
    const { min, max } = bounds();
    return [min, Math.max(min + 1, max)];
  };
  const [minX, maxX] = range();
  s.x = minX + Math.random() * (maxX - minX);

  let prev = null;
  const pickAction = () => {
    const [lo, hi] = range();
    let name;
    if (script) {
      name = script[scriptIndex++ % script.length];
    } else {
      const pool = ACTIONS.filter(([n]) => n === 'walk' || n !== prev);
      let r = Math.random() * pool.reduce((a, [, w]) => a + w, 0);
      name = 'walk';
      for (const [n, w] of pool) { if ((r -= w) <= 0) { name = n; break; } }
    }
    prev = name;
    if (name === 'walk' || name === 'cycle') {
      let tx = lo + Math.random() * (hi - lo);
      const far = name === 'cycle' ? 280 : 140;
      if (Math.abs(tx - s.x) < far) tx = s.x < (lo + hi) / 2 ? Math.min(hi, s.x + far + 80) : Math.max(lo, s.x - far - 80);
      return (name === 'cycle' ? cycle : walk)(tx)(s);
    }
    return FACTORIES[name]()(s);
  };

  let action = idle()(s);
  let last = performance.now();
  let raf;
  const tick = (now) => {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (action(dt)) action = pickAction();
    const [lo, hi] = range();
    s.x = Math.min(hi, Math.max(lo, s.x));
    const k = 1 - Math.exp(-dt * SMOOTH);
    for (const c of CHANNELS) cur[c] += (s.target[c] - cur[c]) * k;
    renderPose(svg, cur, parts, s);
    root.style.transform = `translate3d(${s.x.toFixed(1)}px,0,0)`;
    svg.style.transform = `scaleX(${s.facing})`;
    raf = requestAnimationFrame(tick);
  };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
