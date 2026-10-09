import gsap from 'gsap';

// The astronaut + rocket "mission loop":
//   wave on the ground → board the rocket → launch to a spot in the sky → step out and float around
//   doing things → board again → land back on the ground → step out → repeat.
// Pure GSAP/DOM (no React) so it can be tested standalone. See components/Astronaut.jsx for markup
// (astronaut parts are marked data-a, rocket parts data-r).

const SPEED = 70; // px/s, lazy zero-g drift
const BOOST_SPEED = 240; // px/s, jetpack dash
const ROCKET_SPEED = 230; // px/s
const MARGIN = 48;
const TOP_SAFE = 90; // keep clear of the sticky header
const CONTENT_W = 768; // the centred max-w-3xl content column — never fly over it
const GUTTER_PAD = 18;
const BUBBLE_ZONE = 100; // keep ground spots clear of the chat bubble (bottom-right)

const rand = (min, max) => min + Math.random() * (max - min);
const clamp = gsap.utils.clamp;
const deg = (r) => (r * 180) / Math.PI;

export function startAstronaut({ root, rocket, puffs, bounds }) {
  const part = (n) => root.querySelector(`[data-a="${n}"]`);
  const figure = part('figure');
  const armF = part('armF');
  const armB = part('armB');
  const legF = part('legF');
  const legB = part('legB');
  const head = part('head');
  const boost = part('boost');
  const zzz = part('zzz');
  const flame = rocket.querySelector('[data-r="flame"]');
  const puffEls = [...puffs.querySelectorAll('[data-r="puff"]')];

  // Rotation pivots (SVG user units): shoulders, hips, neck, jetpack nozzle, rocket nozzle.
  gsap.set(armF, { svgOrigin: '39 31' });
  gsap.set(armB, { svgOrigin: '24 32' });
  gsap.set(legF, { svgOrigin: '36 48' });
  gsap.set(legB, { svgOrigin: '26 48' });
  gsap.set(head, { svgOrigin: '32 30' });
  gsap.set(boost, { svgOrigin: '17 49' });
  gsap.set(flame, { svgOrigin: '20 64', scaleY: 0, opacity: 0 });
  gsap.set([root, rocket], { opacity: 0 });

  let alive = true;
  const live = new Set();
  const track = (t) => { live.add(t); return t; };
  const wait = (s) => new Promise((res) => track(gsap.delayedCall(s, res)));
  const tw = (target, vars) => new Promise((res) => track(gsap.to(target, { ...vars, onComplete: res })));
  const tl = (build) => new Promise((res) => {
    const t = track(gsap.timeline({ onComplete: res }));
    build(t);
  });

  const view = () => {
    const b = bounds();
    return { w: Math.max(2 * MARGIN + 2, b.w), h: Math.max(2 * MARGIN + 2, b.h) };
  };
  // The mission stays inside ONE side gutter (left or right of the content column), chosen at start.
  const side = Math.random() < 0.5 ? 'left' : 'right';
  const gutter = () => {
    const w = view().w;
    const edge = Math.max(0, (w - CONTENT_W) / 2);
    return side === 'left'
      ? { a: GUTTER_PAD, b: edge - GUTTER_PAD }
      : { a: w - edge + GUTTER_PAD, b: w - GUTTER_PAD };
  };
  const AH = root.offsetHeight;
  const RW = rocket.offsetWidth;
  const RH = rocket.offsetHeight;

  const pos = { x: 0, y: 0 }; // astronaut centre
  const r = { x: 0, y: 0, rot: 0, shake: 0, bob: 0 }; // rocket centre
  const place = () => gsap.set(root, { x: pos.x, y: pos.y });
  const placeRocket = () =>
    gsap.set(rocket, { x: r.x - RW / 2 + r.shake, y: r.y - RH / 2 + r.bob, rotation: r.rot });

  const groundAstroY = () => view().h - AH / 2 - 2;
  const groundRocketY = () => view().h - RH / 2 - 2;
  const pickHome = () => {
    const g = gutter();
    const lo = g.a + RW / 2 + 4;
    const hi = Math.max(lo + 1, (side === 'right' ? g.b - BUBBLE_ZONE + GUTTER_PAD : g.b) - RW / 2 - 4);
    return rand(lo, hi);
  };
  // Which way to step out of the rocket: toward the roomier side, kept inside the gutter.
  const stepSide = () => {
    const g = gutter();
    return r.x - g.a > g.b - r.x ? -1 : 1;
  };
  const inGutterX = (x, pad = 0) => {
    const g = gutter();
    return clamp(g.a + pad, Math.max(g.a + pad, g.b - pad), x);
  };

  // Ambient paddling of legs and arms — big enough to read as swimming through zero-g.
  const ambient = [
    gsap.to(legB, { rotation: 24, duration: 0.85, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
    gsap.to(legF, { rotation: -22, duration: 0.7, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
  ];
  const armTweens = [
    gsap.to(armB, { rotation: 20, duration: 1.0, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
    gsap.to(armF, { rotation: -18, duration: 0.9, yoyo: true, repeat: -1, ease: 'sine.inOut' }),
  ];
  const holdArms = () => armTweens.forEach((t) => t.pause());
  const freeArms = () => {
    gsap.to([armF, armB], { rotation: 0, duration: 0.3 });
    armTweens.forEach((t) => t.play());
  };

  const faceDir = (dx) => gsap.to(figure, { scaleX: dx < 0 ? -1 : 1, duration: 0.5, ease: 'power2.out' });
  const normalizeRotation = () => {
    const rot = (((gsap.getProperty(figure, 'rotation') % 360) + 360) % 360);
    gsap.set(figure, { rotation: rot > 180 ? rot - 360 : rot });
  };

  // ── Astronaut actions (each returns a promise) ────────────────────────────────────────────

  const drift = (region, withBoost) => {
    const v = view();
    const g = gutter();
    const reg = region || { x0: g.a + 30, x1: g.b - 30, y0: TOP_SAFE, y1: v.h - MARGIN };
    const tx = rand(reg.x0, Math.max(reg.x0 + 1, reg.x1));
    const ty = rand(reg.y0, Math.max(reg.y0 + 1, reg.y1));
    const dx = tx - pos.x;
    const dy = ty - pos.y;
    const speed = withBoost ? BOOST_SPEED : SPEED;
    const lean = clamp(-14, 14, (dy / (Math.abs(dx) + 1)) * 10) * (dx < 0 ? -1 : 1);

    faceDir(dx);
    gsap.to(figure, { rotation: lean * (withBoost ? 1.8 : 1), duration: 0.6, ease: 'power2.out' });
    if (withBoost) gsap.to(boost, { scaleY: 2.3, scaleX: 1.25, duration: 0.3 });

    return tw(pos, {
      x: tx,
      y: ty,
      duration: Math.max(0.6, Math.hypot(dx, dy) / speed),
      ease: withBoost ? 'power2.inOut' : 'sine.inOut',
      onUpdate: place,
    }).then(() => {
      if (withBoost) gsap.to(boost, { scaleY: 1, scaleX: 1, duration: 0.4 });
      gsap.to(figure, { rotation: 0, duration: 0.5 });
    });
  };

  const wave = () => {
    holdArms();
    return tl((t) => {
      t.to(armF, { rotation: -22, duration: 0.35, ease: 'power2.out' })
        .to(head, { rotation: -6, duration: 0.3 }, '<')
        .to(armF, { rotation: 16, duration: 0.22, yoyo: true, repeat: 7, ease: 'sine.inOut' })
        .to([armF, head], { rotation: 0, duration: 0.4 });
    }).then(freeArms);
  };

  const flip = () => {
    const dir = Math.random() < 0.5 ? -1 : 1;
    holdArms();
    return tl((t) => {
      t.to([armF, armB], { rotation: -40, duration: 0.25 })
        .to(figure, { rotation: `+=${360 * dir}`, duration: 1.3, ease: 'power2.inOut' }, '<')
        .to(boost, { scaleY: 1.9, duration: 0.25, yoyo: true, repeat: 1 }, '<');
    }).then(() => { normalizeRotation(); freeArms(); });
  };

  const lookAround = () => {
    faceDir(Math.random() < 0.5 ? -1 : 1);
    return tl((t) => {
      t.to(head, { rotation: -16, duration: 0.6, ease: 'sine.inOut' })
        .to(head, { rotation: 16, duration: 1.0, ease: 'sine.inOut' })
        .to(head, { rotation: -8, duration: 0.7, ease: 'sine.inOut' })
        .to(head, { rotation: 0, duration: 0.5, ease: 'sine.inOut' });
    });
  };

  const nap = () => {
    holdArms();
    return tl((t) => {
      t.to(figure, { rotation: 80, duration: 1.0, ease: 'power2.inOut' })
        .to([armF, armB], { rotation: 18, duration: 1.0 }, '<')
        .to(head, { rotation: 10, duration: 1.0 }, '<')
        .to(zzz, { opacity: 1, duration: 0.4 })
        .fromTo(zzz, { y: 0 }, { y: -14, duration: 1.6, ease: 'sine.out', repeat: 1 }, '<')
        .to(zzz, { opacity: 0, duration: 0.5 }, '-=0.5')
        .to(figure, { rotation: 0, duration: 0.9, ease: 'power2.inOut' })
        .to([armF, armB, head], { rotation: 0, duration: 0.6 }, '<');
    }).then(freeArms);
  };

  const dance = () => {
    holdArms();
    ambient.forEach((t) => t.timeScale(2.5));
    return tl((t) => {
      t.to(armF, { rotation: -78, duration: 0.3, yoyo: true, repeat: 9, ease: 'sine.inOut' })
        .to(armB, { rotation: -70, duration: 0.3, yoyo: true, repeat: 9, ease: 'sine.inOut', delay: 0.3 }, 0)
        .to(figure, { rotation: 10, duration: 0.3, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 0)
        .to(head, { rotation: -12, duration: 0.3, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 0);
    }).then(() => { ambient.forEach((t) => t.timeScale(1)); gsap.to(figure, { rotation: 0, duration: 0.3 }); freeArms(); });
  };

  // ── Rocket ────────────────────────────────────────────────────────────────────────────────

  const puffBurst = (cx, gy) => {
    puffEls.forEach((el, i) => {
      const side = i % 2 ? 1 : -1;
      gsap.fromTo(
        el,
        { x: cx - 10, y: gy - 12, scale: 0.3, opacity: 0.55 },
        {
          x: cx - 10 + side * rand(18, 58), y: gy - 12 - rand(0, 14), scale: rand(1.3, 2),
          opacity: 0, duration: 1.3, delay: i * 0.05, ease: 'power2.out',
        },
      );
    });
  };

  const board = async () => {
    holdArms();
    faceDir(r.x - pos.x);
    await Promise.all([
      tw(pos, { x: r.x, y: r.y + 4, duration: 0.8, ease: 'power2.inOut', onUpdate: place }),
      tw(root, { scale: 0.3, duration: 0.8, ease: 'power2.in' }),
      tw(figure, { rotation: 0, duration: 0.4 }),
    ]);
    gsap.set(root, { autoAlpha: 0 });
    freeArms();
  };

  const stepOut = async (toX, toY) => {
    pos.x = r.x; pos.y = r.y; place();
    gsap.set(root, { autoAlpha: 1, scale: 0.3 });
    faceDir(toX - r.x);
    await Promise.all([
      tw(pos, { x: toX, y: toY, duration: 0.9, ease: 'power2.out', onUpdate: place }),
      tw(root, { scale: 1, duration: 0.8, ease: 'back.out(1.6)' }),
    ]);
  };

  const flyRocket = (dest, { tilt = true } = {}) => {
    const dx = dest.x - r.x;
    const dy = dest.y - r.y;
    const T = Math.max(2.0, Math.hypot(dx, dy) / ROCKET_SPEED);
    const lean = tilt ? clamp(-35, 35, deg(Math.atan2(dx, -dy))) : 0;
    return tl((t) => {
      t.to(r, { rot: lean, duration: 0.7, ease: 'power2.out', onUpdate: placeRocket }, 0)
        .to(r, { x: dest.x, y: dest.y, duration: T, ease: 'power2.inOut', onUpdate: placeRocket }, 0)
        .to(r, { rot: 0, duration: 0.9, ease: 'power2.inOut', onUpdate: placeRocket }, T - 0.9);
    });
  };

  let bobTween = null;
  const startHover = () => {
    gsap.to(flame, { scaleY: 0.35, duration: 0.6 });
    bobTween = track(gsap.to(r, { bob: 5, duration: 1.5, yoyo: true, repeat: -1, ease: 'sine.inOut', onUpdate: placeRocket }));
  };
  const stopHover = () => {
    bobTween?.kill();
    gsap.to(r, { bob: 0, duration: 0.3, onUpdate: placeRocket });
  };

  const launch = async () => {
    const v = view();
    const dest = {
      x: rand(gutter().a + RW / 2, Math.max(gutter().a + RW / 2 + 1, gutter().b - RW / 2)),
      y: rand(TOP_SAFE + RH / 2 + 30, Math.max(TOP_SAFE + RH / 2 + 31, v.h * 0.55)),
    };
    puffBurst(r.x, v.h);
    await Promise.all([
      tw(flame, { scaleY: 1, opacity: 1, duration: 0.6 }),
      tw(r, { shake: 2.2, duration: 0.045, yoyo: true, repeat: 17, ease: 'none', onUpdate: placeRocket }),
    ]);
    r.shake = 0;
    await flyRocket(dest);
    startHover();
  };

  const land = async () => {
    stopHover();
    const hx = pickHome();
    const gy = groundRocketY();
    gsap.to(flame, { scaleY: 1, opacity: 1, duration: 0.4 });
    await flyRocket({ x: hx, y: gy - 150 });
    await tw(r, { y: gy, duration: 1.8, ease: 'power2.out', onUpdate: placeRocket });
    puffBurst(r.x, view().h);
    await tw(flame, { scaleY: 0, opacity: 0, duration: 0.4 });
  };

  // ── The loop ──────────────────────────────────────────────────────────────────────────────

  const SKY_ACTIONS = [[wave, 4], [flip, 3], [lookAround, 3], [dance, 3], [nap, 1.5], [() => drift(null, true), 0]];
  const pickSkyAction = (prev) => {
    const pool = SKY_ACTIONS.filter(([fn, w]) => w > 0 && fn !== prev);
    let roll = Math.random() * pool.reduce((s, [, w]) => s + w, 0);
    for (const [fn, w] of pool) { if ((roll -= w) <= 0) return fn; }
    return wave;
  };

  const playAround = async () => {
    const count = 4 + Math.floor(Math.random() * 3);
    let prev = null;
    for (let i = 0; i < count && alive; i += 1) {
      const v = view();
      await drift({
        x0: inGutterX(r.x - 190, 30), x1: inGutterX(r.x + 190, 30),
        y0: Math.max(TOP_SAFE, r.y - 130), y1: Math.min(v.h - MARGIN - 70, r.y + 130),
      });
      prev = pickSkyAction(prev);
      await prev();
    }
  };

  const mission = async () => {
    r.x = pickHome();
    r.y = groundRocketY();
    placeRocket();
    const so = stepSide();
    pos.x = inGutterX(r.x + so * (RW / 2 + 36), 30);
    pos.y = groundAstroY();
    place();
    faceDir(-so);
    gsap.to([root, rocket], { opacity: 1, duration: 1, delay: 1.2 });
    await wait(2.4);

    while (alive) {
      await wave();
      await wait(0.4);
      await board();
      await launch();
      const o1 = stepSide();
      await stepOut(inGutterX(r.x + o1 * (RW / 2 + 46), 30), r.y - 10);
      await playAround();
      await board();
      await land();
      const o2 = stepSide();
      await stepOut(inGutterX(r.x + o2 * (RW / 2 + 36), 30), groundAstroY());
      faceDir(-o2);
      await wait(1.6);
    }
  };
  mission();

  return () => {
    alive = false;
    live.forEach((t) => t.kill());
    ambient.forEach((t) => t.kill());
    armTweens.forEach((t) => t.kill());
    gsap.killTweensOf([root, rocket, figure, armF, armB, legF, legB, head, boost, zzz, flame, pos, r, ...puffEls]);
  };
}
