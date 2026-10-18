/* eslint-disable @typescript-eslint/no-unused-vars */
(function () {
  var r = document.documentElement;
  r.classList.add("js");
  try {
    if (!window.matchMedia || !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      r.classList.add("intro-on");
    }
  } catch (e) {}
})();
(function () {
  var reduce = !!(
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  var $ = function (s, r) {
    return (r || document).querySelector(s);
  };
  var $$ = function (s, r) {
    return Array.prototype.slice.call((r || document).querySelectorAll(s));
  };

  function rng(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function token(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }
  function mk(parent, name, attrs, cls) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (cls) n.setAttribute("class", cls);
    parent.appendChild(n);
    return n;
  }
  var ease = function (t) {
    return 1 - Math.pow(1 - t, 3);
  };
  var clamp = function (v, a, b) {
    return Math.max(a, Math.min(b, v));
  };

  /* ---------- Landing: numbers count up ---------- */
  function runCount(el, delay) {
    var to = +el.getAttribute("data-to"),
      dur = 1300,
      t0 = performance.now() + delay;
    if (reduce) {
      el.textContent = to;
      return;
    }
    el.textContent = "0";
    (function tick(now) {
      var p = clamp((now - t0) / dur, 0, 1);
      el.textContent = Math.round(to * ease(p));
      if (p < 1) requestAnimationFrame(tick);
    })(performance.now());
  }
  (function () {
    var later = [];
    var heroCounts = [];
    $$(".cu").forEach(function (el) {
      if (el.closest("#top")) heroCounts.push(el);
      else later.push(el);
    });
    function goHero() {
      heroCounts.forEach(function (el) {
        runCount(el, 1500);
      });
    }
    if (document.documentElement.classList.contains("intro-on"))
      document.addEventListener("introdone", goHero, { once: true });
    else goHero();
    if (!later.length || reduce || !("IntersectionObserver" in window)) return;
    var cio = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            cio.unobserve(e.target);
            runCount(e.target, 150);
          }
        });
      },
      { threshold: 0.8 },
    );
    later.forEach(function (el) {
      cio.observe(el);
    });
  })();

  /* ---------- Signature: particles gather into a line of type, then the type resolves ---------- */
  function colours() {}
  function kick() {}
  var easeIO = function (t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };
  var easeOutExpo = function (t) {
    return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t);
  };
  function ParticleType(el, cv, seed, onDone) {
    var wrap = el.parentNode,
      PT = [],
      PW = 0,
      PH = 0,
      dpr = 1,
      t0 = 0,
      active = false,
      done = false,
      col = "#000";
    var INTRO = wrap.classList.contains("intro-wrap");
    /* the intro gathers more particles, all at once, and holds the dotted headline before the type resolves */
    var boost = INTRO ? 1.35 : 1,
      A0 = INTRO ? 0.45 : 0.18;
    var T_FORMED = INTRO ? 3.25 : 2.3,
      T_FADE = INTRO ? 3.45 : 2.45,
      T_FADE_D = INTRO ? 0.7 : 0.8,
      T_END = INTRO ? 4.25 : 3.3;
    function finish() {
      if (done) return;
      done = true;
      active = false;
      wrap.classList.add("formed");
      if (cv) {
        try {
          cv.getContext("2d").clearRect(0, 0, cv.width, cv.height);
        } catch (e) {}
        cv.style.display = "none";
      }
      if (onDone) onDone();
    }
    function giveUp() {
      wrap.classList.add("pf-off");
      finish();
    }
    function build() {
      var cr = cv.getBoundingClientRect();
      PW = Math.round(cr.width);
      PH = Math.round(cr.height);
      if (!PW || !PH) return false;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(PW * dpr);
      cv.height = Math.round(PH * dpr);
      var cs = getComputedStyle(el),
        fs = parseFloat(cs.fontSize);
      col = cs.color;
      var off = document.createElement("canvas");
      off.width = PW;
      off.height = PH;
      var o = off.getContext("2d", { willReadFrequently: true });
      o.font = cs.fontWeight + " " + fs + "px " + cs.fontFamily;
      if ("letterSpacing" in o)
        o.letterSpacing = (parseFloat(cs.letterSpacing) || 0) + "px";
      o.fillStyle = "#000";
      o.textBaseline = "alphabetic";
      var asc = o.measureText("Hg").fontBoundingBoxAscent;
      var minX = 1e9,
        maxX = -1e9,
        minY = 1e9,
        maxY = -1e9;
      $$(".pw", el).forEach(function (sp) {
        var r = sp.getBoundingClientRect(),
          x = r.left - cr.left,
          top = r.top - cr.top;
        o.fillText(sp.textContent, x, asc ? top + asc : top + r.height * 0.8);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x + r.width);
        minY = Math.min(minY, top);
        maxY = Math.max(maxY, top + r.height);
      });
      var data = o.getImageData(0, 0, PW, PH).data,
        pool = [],
        x,
        y;
      for (y = Math.max(0, minY | 0); y < Math.min(PH, maxY + 1); y += 2)
        for (x = Math.max(0, minX | 0); x < Math.min(PW, maxX + 1); x += 2)
          if (data[(y * PW + x) * 4 + 3] > 150) pool.push(x, y);
      var count = pool.length / 2;
      if (!count) return false;
      var N = Math.min(
          count,
          Math.round(
            INTRO
              ? Math.min(6500, Math.max(2200, (maxX - minX) * 4.6))
              : Math.min(3400, Math.max(1000, (maxX - minX) * 2.6)),
          ),
        ),
        rand = rng(seed);
      var cx = (minX + maxX) / 2,
        cy = (minY + maxY) / 2,
        rx = Math.max(PW * 0.55, 260),
        ry = Math.max(PH * 0.62, 200);
      PT = [];
      for (var i = 0; i < N; i++) {
        var k = Math.floor(rand() * count) * 2;
        var tx = pool[k] + rand() * 1.6 - 0.8,
          ty = pool[k + 1] + rand() * 1.6 - 0.8;
        var ang = rand() * Math.PI * 2,
          rad = 0.35 + Math.pow(rand(), 0.8) * 0.85;
        var sx = cx + Math.cos(ang) * rx * rad,
          sy = cy + Math.sin(ang) * ry * rad;
        var mx = (sx + tx) / 2,
          my = (sy + ty) / 2,
          dx = tx - sx,
          dy = ty - sy,
          len = Math.sqrt(dx * dx + dy * dy) || 1;
        var bend = (rand() - 0.5) * 0.5 * len;
        PT.push({
          sx: sx,
          sy: sy,
          tx: tx,
          ty: ty,
          qx: mx - (dy / len) * bend,
          qy: my + (dx / len) * bend,
          d: INTRO
            ? 0.15 + rand() * 0.45
            : 0.1 + ((tx - minX) / Math.max(1, maxX - minX)) * 0.5 + rand() * 0.3,
          dur: INTRO ? 1.6 + rand() * 0.5 : 1.35 + rand() * 0.55,
          r: 0.7 + rand() * 0.6,
        });
      }
      return true;
    }
    function frame(now) {
      if (!active) return;
      var ctx = cv.getContext("2d"),
        el2 = (now - t0) / 1000;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, PW, PH);
      ctx.fillStyle = col;
      var fadeOut = 1 - clamp((el2 - T_FADE) / T_FADE_D, 0, 1),
        appear = easeOutExpo(clamp(el2 / 0.7, 0, 1));
      for (var i = 0; i < PT.length; i++) {
        var p = PT[i],
          u = clamp((el2 - p.d) / p.dur, 0, 1),
          e = easeIO(u),
          v = 1 - e;
        var x = v * v * p.sx + 2 * v * e * p.qx + e * e * p.tx,
          y = v * v * p.sy + 2 * v * e * p.qy + e * e * p.ty;
        ctx.globalAlpha = (A0 + (1 - A0) * e) * appear * fadeOut;
        var s = p.r * (1.6 - 0.5 * e) * boost;
        ctx.fillRect(x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
      if (el2 > T_FORMED) wrap.classList.add("formed");
      if (el2 > T_END) return finish();
      requestAnimationFrame(frame);
    }
    function start() {
      if (done || active) return;
      if (reduce) return giveUp();
      try {
        var cs = getComputedStyle(el);
        var ready =
          document.fonts && document.fonts.load
            ? Promise.race([
                document.fonts.load(
                  cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily,
                ),
                new Promise(function (r) {
                  setTimeout(r, 1200);
                }),
              ])
            : Promise.resolve();
        ready.then(function () {
          if (done) return;
          (function tryBuild(n) {
            if (done) return;
            if (build()) {
              active = true;
              t0 = performance.now() + 120;
              requestAnimationFrame(frame);
            } else if (n < 60)
              setTimeout(function () {
                tryBuild(n + 1);
              }, 100);
            else giveUp();
          })(0);
        }, giveUp);
        setTimeout(function () {
          if (!done && !active) giveUp();
        }, 8000);
        setTimeout(function () {
          if (!done) finish();
        }, 12000);
      } catch (e) {
        giveUp();
      }
    }
    if (reduce || !cv) {
      giveUp();
      return { start: function () {} };
    }
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map(function (w) {
        return '<span class="pw">' + w + "</span>";
      })
      .join(" ");
    var rzT = 0;
    window.addEventListener("resize", function () {
      if (done || !active) return;
      clearTimeout(rzT);
      rzT = setTimeout(function () {
        if (!done && active && !build()) finish();
      }, 120);
    });
    return { start: start };
  }
  /* ---------- Hero: a swarm streams in, gathers, spreads into dotted letters, then the type settles ---------- */
  function SwarmType(el, cv, onDone, onFormed) {
    var wrap = el.parentNode,
      P = [],
      W = 0,
      H = 0,
      dpr = 1,
      t0 = 0,
      done = false,
      active = false,
      col = "#5E5E69";
    var C;
    function finish() {
      if (done) return;
      done = true;
      active = false;
      wrap.classList.add("formed", "inked");
      if (cv) {
        try {
          cv.getContext("2d").clearRect(0, 0, cv.width, cv.height);
        } catch (e) {}
        cv.style.display = "none";
      }
      if (onDone) onDone();
    }
    function giveUp() {
      wrap.classList.add("pf-off");
      finish();
    }
    function build() {
      var cr = cv.getBoundingClientRect();
      W = Math.round(cr.width);
      H = Math.round(cr.height);
      if (!W || !H) return false;
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      var cs = getComputedStyle(el),
        fs = parseFloat(cs.fontSize);
      col = token("--soft") || col;
      var off = document.createElement("canvas");
      off.width = W;
      off.height = H;
      var o = off.getContext("2d", { willReadFrequently: true });
      o.font = cs.fontWeight + " " + fs + "px " + cs.fontFamily;
      if ("letterSpacing" in o)
        o.letterSpacing = (parseFloat(cs.letterSpacing) || 0) + "px";
      o.fillStyle = "#000";
      o.textBaseline = "alphabetic";
      var asc = o.measureText("Hg").fontBoundingBoxAscent;
      var minX = 1e9,
        maxX = -1e9,
        minY = 1e9,
        maxY = -1e9;
      $$(".pw", el).forEach(function (sp) {
        var r = sp.getBoundingClientRect(),
          x = r.left - cr.left,
          top = r.top - cr.top;
        o.fillText(sp.textContent, x, asc ? top + asc : top + r.height * 0.8);
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x + r.width);
        minY = Math.min(minY, top);
        maxY = Math.max(maxY, top + r.height);
      });
      var step = Math.max(2, Math.round(fs / 36));
      var data = o.getImageData(0, 0, W, H).data,
        pool = [],
        x,
        y;
      for (y = Math.max(0, minY | 0); y < Math.min(H, maxY + 1); y += step)
        for (x = Math.max(0, minX | 0); x < Math.min(W, maxX + 1); x += step)
          if (data[(y * W + x) * 4 + 3] > 140) pool.push(x, y);
      var count = pool.length / 2;
      if (!count) return false;
      var N = Math.min(count, 4400),
        rand = rng(31),
        i;
      /* shuffle so every particle gets a distinct spot in the letters */
      var idx = [];
      for (i = 0; i < count; i++) idx.push(i);
      for (i = count - 1; i > 0; i--) {
        var j = Math.floor(rand() * (i + 1)),
          t = idx[i];
        idx[i] = idx[j];
        idx[j] = t;
      }
      C = { x: (minX + maxX) / 2, y: (minY + maxY) / 2 };
      var R = Math.max(70, Math.min(fs * 2.15, W * 0.32, C.y - 8, H - C.y - 8));
      P = [];
      for (i = 0; i < N; i++) {
        var k = idx[i] * 2,
          a = rand() * Math.PI * 2,
          s0 = rand() * 0.75;
        P.push({
          tx: pool[k] + step / 2,
          ty: pool[k + 1] + step / 2,
          ang: a,
          rad: R * (0.8 + 0.2 * Math.sqrt(rand())),
          x0: C.x + (rand() - 0.5) * Math.min(W, 1100) * 0.8,
          y0: -8 - rand() * H * 0.35,
          s0: s0,
          e0: s0 + DROP + 0.3 + rand() * 0.3,
          ed: 1.15 + rand() * 0.4,
          r: 0.95 + rand() * 0.45,
          bend: (rand() - 0.5) * 0.35,
        });
      }
      return true;
    }
    var DROP = 1.0;
    /* the circle: particles orbit a ring around the centre of the headline */
    function ring(p, t) {
      var w = Math.max(0, t - (p.s0 + DROP)),
        an = p.ang + w * 1.25;
      return [C.x + Math.cos(an) * p.rad, C.y + Math.sin(an) * p.rad];
    }
    function frame(now) {
      if (!active) return;
      var ctx = cv.getContext("2d"),
        t = (now - t0) / 1000,
        i;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = col;
      var fadeOut = 1 - clamp((t - 4.05) / 0.7, 0, 1);
      for (i = 0; i < P.length; i++) {
        var p = P[i],
          x,
          y,
          al,
          streak = 0;
        var us = clamp((t - p.s0) / DROP, 0, 1);
        if (us <= 0) continue;
        if (t < p.e0) {
          if (us < 1) {
            /* rain: a straight fall that bends into the circle at the end */
            var e = us < 0.5 ? 2 * us * us : 1 - Math.pow(-2 * us + 2, 2) / 2,
              v = 1 - e,
              B = ring(p, p.s0 + DROP);
            var qx = p.x0,
              qy = B[1] - (B[1] - p.y0) * 0.12;
            x = v * v * p.x0 + 2 * v * e * qx + e * e * B[0];
            y = v * v * p.y0 + 2 * v * e * qy + e * e * B[1];
            streak = us < 0.8 ? 12 * Math.sin((Math.PI * us) / 0.8) : 0;
          } else {
            var b2 = ring(p, t);
            x = b2[0];
            y = b2[1];
          }
          al = 0.3 + 0.5 * us;
        } else {
          var u = clamp((t - p.e0) / p.ed, 0, 1),
            e2 = easeIO(u),
            w2 = 1 - e2,
            F = ring(p, p.e0);
          var mx = (F[0] + p.tx) / 2,
            my = (F[1] + p.ty) / 2,
            ddx = p.tx - F[0],
            ddy = p.ty - F[1];
          var cx2 = mx - ddy * p.bend,
            cy2 = my + ddx * p.bend;
          x = w2 * w2 * F[0] + 2 * w2 * e2 * cx2 + e2 * e2 * p.tx;
          y = w2 * w2 * F[1] + 2 * w2 * e2 * cy2 + e2 * e2 * p.ty;
          al = 0.9;
        }
        ctx.globalAlpha = al * fadeOut;
        if (streak > 1) ctx.fillRect(x - 0.35, y - p.r / 2 - streak, 0.7, p.r + streak);
        else ctx.fillRect(x - p.r / 2, y - p.r / 2, p.r, p.r);
      }
      ctx.globalAlpha = 1;
      if (t > 4.0 && !wrap.classList.contains("formed")) {
        wrap.classList.add("formed");
        if (onFormed) onFormed();
      }
      if (t > 4.45) wrap.classList.add("inked");
      if (t > 4.8) return finish();
      requestAnimationFrame(frame);
    }
    function start() {
      if (done || active) return;
      if (reduce || !cv) return giveUp();
      try {
        var cs = getComputedStyle(el);
        var ready =
          document.fonts && document.fonts.load
            ? Promise.race([
                document.fonts.load(
                  cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily,
                ),
                new Promise(function (r) {
                  setTimeout(r, 1200);
                }),
              ])
            : Promise.resolve();
        ready.then(function () {
          if (done) return;
          (function tryBuild(n) {
            if (done) return;
            if (build()) {
              active = true;
              t0 = performance.now() + 150;
              requestAnimationFrame(frame);
            } else if (n < 60)
              setTimeout(function () {
                tryBuild(n + 1);
              }, 100);
            else giveUp();
          })(0);
        }, giveUp);
        setTimeout(function () {
          if (!done && !active) giveUp();
        }, 8000);
        setTimeout(function () {
          if (!done) finish();
        }, 12000);
      } catch (e) {
        giveUp();
      }
    }
    if (reduce || !cv) {
      giveUp();
      return { start: function () {} };
    }
    var words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words
      .map(function (w) {
        return '<span class="pw">' + w + "</span>";
      })
      .join(" ");
    var rzT = 0;
    window.addEventListener("resize", function () {
      if (done || !active) return;
      clearTimeout(rzT);
      rzT = setTimeout(function () {
        if (!done && active && !build()) finish();
      }, 120);
    });
    return { start: start };
  }
  (function () {
    var root = document.documentElement;
    var released = false;
    function release() {
      if (released) return;
      released = true;
      root.classList.remove("intro-on");
      document.dispatchEvent(new Event("introdone"));
    }
    var h = $("#h1");
    if (!h || !root.classList.contains("intro-on")) {
      if (h) h.parentNode.classList.add("pf-off", "formed", "inked");
      release();
      return;
    }
    var sw = SwarmType(h, $("#pf"), release, release),
      started = false;
    function go() {
      if (started || document.hidden) return;
      started = true;
      sw.start();
    }
    if ("IntersectionObserver" in window) {
      var hio = new IntersectionObserver(
        function (es) {
          if (es[0].isIntersecting) {
            hio.disconnect();
            go();
          }
        },
        { threshold: 0.25 },
      );
      hio.observe(h.parentNode);
    } else go();
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden && !started) {
        var r = h.getBoundingClientRect();
        if (r.bottom > 0 && r.top < innerHeight) go();
      }
    });
    setTimeout(function () {
      if (!started) {
        started = true;
        h.parentNode.classList.add("pf-off", "formed", "inked");
        release();
      }
    }, 9000);
  })();
  /* ---------- Hero: "Human" and "Agent" trade places through particles, on a slow loop ---------- */
  (function () {
    var h = $("#h1");
    if (!h || reduce) return;
    var WORDS = ["Human", "Agent"];
    var HOLD = 3400,
      MORPH = 3200,
      cur = 0,
      word = null,
      slot = null,
      cv = null,
      ctx = null,
      dpr = 1;
    var box = null,
      A = [],
      B = [],
      P = [],
      visible = true,
      timer = 0,
      running = false;
    try {
      h.setAttribute("aria-label", h.textContent.replace(/\s+/g, " ").trim());
    } catch (e) {}
    function fontOf(el) {
      var cs = getComputedStyle(el);
      return {
        font: cs.fontWeight + " " + cs.fontSize + " " + cs.fontFamily,
        ls: parseFloat(cs.letterSpacing) || 0,
        color: cs.color,
      };
    }
    function setup() {
      word = $$(".pw", h).filter(function (s) {
        return s.textContent.trim() === WORDS[0] || s.textContent.trim() === WORDS[1];
      })[0];
      if (!word) return false;
      /* hold the slot at the wider word's width so the headline never reflows */
      var f = fontOf(h),
        m = document.createElement("canvas").getContext("2d");
      m.font = f.font;
      if ("letterSpacing" in m) m.letterSpacing = f.ls + "px";
      var wMax = Math.ceil(
        Math.max(m.measureText(WORDS[0]).width, m.measureText(WORDS[1]).width) + 2,
      );
      if (!slot) {
        slot = document.createElement("span");
        slot.className = "swap";
        word.parentNode.insertBefore(slot, word);
        slot.appendChild(word);
      }
      slot.style.width = wMax + "px";
      if (!cv) {
        cv = document.createElement("canvas");
        cv.className = "swap-cv";
        cv.setAttribute("aria-hidden", "true");
        h.parentNode.appendChild(cv);
      }
      return true;
    }
    function sample(text) {
      var f = fontOf(h),
        wr = h.parentNode.getBoundingClientRect(),
        sr = slot.getBoundingClientRect();
      var pad = Math.round(parseFloat(getComputedStyle(h).fontSize) * 1.7);
      box = {
        x: sr.left - wr.left - pad,
        y: sr.top - wr.top - pad,
        w: Math.round(sr.width + pad * 2),
        h: Math.round(sr.height + pad * 2),
        pad: pad,
      };
      var off = document.createElement("canvas");
      off.width = box.w;
      off.height = box.h;
      var o = off.getContext("2d", { willReadFrequently: true });
      o.font = f.font;
      if ("letterSpacing" in o) o.letterSpacing = f.ls + "px";
      o.textBaseline = "alphabetic";
      o.textAlign = "left";
      o.fillStyle = "#000";
      var asc = o.measureText("Hg").fontBoundingBoxAscent || sr.height * 0.8;
      o.fillText(text, pad, pad + asc);
      var d = o.getImageData(0, 0, box.w, box.h).data,
        pts = [],
        x,
        y,
        step = 3;
      for (y = 0; y < box.h; y += step)
        for (x = 0; x < box.w; x += step)
          if (d[(y * box.w + x) * 4 + 3] > 140) pts.push([x + 1, y + 1]);
      var r = rng(text.length * 97 + 13);
      for (var i = pts.length - 1; i > 0; i--) {
        var j = Math.floor(r() * (i + 1)),
          t = pts[i];
        pts[i] = pts[j];
        pts[j] = t;
      }
      return pts;
    }
    function prepare(from, to) {
      A = sample(from);
      B = sample(to);
      dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.style.left = box.x + "px";
      cv.style.top = box.y + "px";
      cv.style.width = box.w + "px";
      cv.style.height = box.h + "px";
      cv.width = Math.round(box.w * dpr);
      cv.height = Math.round(box.h * dpr);
      ctx = cv.getContext("2d");
      var n = Math.min(2100, Math.max(A.length, B.length)),
        r = rng(7 + cur);
      P = [];
      for (var i = 0; i < n; i++) {
        var a = A[i % A.length],
          b = B[i % B.length];
        /* burst: each particle flies outward from the word's centre, with some scatter */
        var ca = Math.atan2(a[1] - box.h / 2, a[0] - box.w / 2) + (r() - 0.5) * 1.1,
          cb = Math.atan2(b[1] - box.h / 2, b[0] - box.w / 2) + (r() - 0.5) * 1.1;
        var s = 40 + r() * 95,
          s2 = 40 + r() * 95;
        P.push({
          ax: a[0],
          ay: a[1],
          bx: b[0],
          by: b[1],
          dx: Math.cos(ca) * s,
          dy: Math.sin(ca) * s * 0.85,
          ex: Math.cos(cb) * s2,
          ey: Math.sin(cb) * s2 * 0.85,
          d: r() * 0.16,
          r: 0.95 + r() * 0.5,
          bend: (r() - 0.5) * 0.7,
          acc: r() < 0.35,
        });
      }
    }
    function lighten(hex, bg, k) {
      function p(c) {
        c = (c || "").trim().replace("#", "");
        if (c.length === 3) c = c.replace(/(.)/g, "$1$1");
        var n = parseInt(c, 16);
        return isNaN(n) ? null : [(n >> 16) & 255, (n >> 8) & 255, n & 255];
      }
      var a = p(hex),
        b = p(bg);
      if (!a || !b) return hex;
      return (
        "rgb(" +
        a
          .map(function (v, i) {
            return Math.round(v + (b[i] - v) * k);
          })
          .join(",") +
        ")"
      );
    }
    var e3 = function (t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    function morph() {
      if (!visible || document.hidden) {
        schedule(800);
        return;
      }
      running = true;
      var from = WORDS[cur],
        to = WORDS[1 - cur];
      prepare(from, to);
      var col = token("--soft") || fontOf(h).color,
        acc = lighten(
          token("--accent") || "#5B2FD8",
          token("--ground") || "#FFFFFF",
          0.42,
        ),
        t0 = performance.now(),
        swapped = false;
      cv.style.display = "block";
      slot.classList.add("dissolve");
      (function frame(now) {
        var t = (now - t0) / MORPH,
          i;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, box.w, box.h);
        var aIn = clamp(t / 0.08, 0, 1),
          aOut = 1 - clamp((t - 0.86) / 0.14, 0, 1);
        for (i = 0; i < P.length; i++) {
          var p = P[i],
            u = clamp((t - p.d) / (1 - p.d), 0, 1),
            x,
            y;
          if (u < 0.3) {
            /* the word bursts: particles fly outward */
            var k = 1 - Math.pow(1 - u / 0.3, 3);
            x = p.ax + p.dx * k;
            y = p.ay + p.dy * k;
          } else if (u < 0.78) {
            /* they swirl across into the next word */
            var v = e3((u - 0.3) / 0.48),
              w = 1 - v;
            var sx = p.ax + p.dx,
              sy = p.ay + p.dy,
              tx = p.bx + p.ex,
              ty = p.by + p.ey;
            var mx = (sx + tx) / 2 - (ty - sy) * p.bend,
              my = (sy + ty) / 2 + (tx - sx) * p.bend;
            x = w * w * sx + 2 * w * v * mx + v * v * tx;
            y = w * w * sy + 2 * w * v * my + v * v * ty;
          } else {
            /* and pull in to settle into its letters */
            var q = 1 - Math.pow(1 - (u - 0.78) / 0.22, 3);
            x = p.bx + p.ex * (1 - q);
            y = p.by + p.ey * (1 - q);
          }
          ctx.fillStyle = p.acc ? acc : col;
          ctx.globalAlpha = (p.acc ? 0.85 : 0.75) * aIn * aOut;
          ctx.fillRect(x - p.r / 2, y - p.r / 2, p.r, p.r);
        }
        ctx.globalAlpha = 1;
        if (!swapped && t > 0.84) {
          swapped = true;
          word.textContent = to;
          slot.classList.remove("dissolve");
          slot.classList.add("resolve");
        }
        if (t < 1) {
          requestAnimationFrame(frame);
          return;
        }
        ctx.clearRect(0, 0, box.w, box.h);
        cv.style.display = "none";
        slot.classList.remove("resolve");
        cur = 1 - cur;
        running = false;
        schedule(HOLD);
      })(t0);
    }
    function schedule(ms) {
      clearTimeout(timer);
      timer = setTimeout(morph, ms);
    }
    function begin() {
      if (!setup()) return;
      schedule(HOLD);
      try {
        new IntersectionObserver(function (es) {
          visible = es[0].isIntersecting;
        }).observe(h.parentNode);
      } catch (e) {}
      var rz = 0;
      window.addEventListener("resize", function () {
        clearTimeout(rz);
        rz = setTimeout(function () {
          if (!running) setup();
        }, 150);
      });
    }
    function afterIntro() {
      setTimeout(begin, 1800);
    }
    if (document.documentElement.classList.contains("intro-on"))
      document.addEventListener("introdone", afterIntro, { once: true });
    else afterIntro();
  })();
  var ask = $("#ask");
  if (ask) {
    var askType = ParticleType(ask, ask.parentNode.querySelector("canvas"), 29);
    if ("IntersectionObserver" in window && !reduce) {
      var aio = new IntersectionObserver(
        function (es) {
          if (es[0].isIntersecting) {
            aio.disconnect();
            askType.start();
          }
        },
        { threshold: 0.6 },
      );
      aio.observe(ask.parentNode);
    } else askType.start();
  }

  /* ---------- Scroll: progress, reveals, active nav ---------- */
  var prog = $("#prog");
  var bar = $(".bar"),
    lastY = window.scrollY,
    ticking = false;
  var LIT = [];
  if (!reduce) {
    $$(".lit").forEach(function (el) {
      Array.prototype.slice.call(el.childNodes).forEach(function (n) {
        if (n.nodeType !== 3 || !n.textContent.trim()) return;
        var frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach(function (part) {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          var s = document.createElement("span");
          s.className = "wd";
          s.textContent = part;
          frag.appendChild(s);
        });
        el.replaceChild(frag, n);
      });
      LIT.push({ el: el, w: $$(".wd", el), n: -1 });
    });
    if (LIT.length) document.documentElement.classList.add("lit-on");
  }
  function setLit(o, c) {
    if (c === o.n) return;
    o.w.forEach(function (s, i) {
      s.classList.toggle("on", i < c);
    });
    o.n = c;
  }
  function litUpdate() {
    var vh = window.innerHeight;
    LIT.forEach(function (o) {
      var r = o.el.getBoundingClientRect();
      if (!r.height) return;
      if (r.bottom < 0) return setLit(o, o.w.length);
      if (r.top > vh) return setLit(o, 0);
      var p = clamp((vh * 0.86 - r.top) / (r.height + vh * 0.32), 0, 1);
      setLit(o, Math.round(p * o.w.length));
    });
  }
  function onScroll() {
    var y = window.scrollY,
      h = document.documentElement.scrollHeight - window.innerHeight;
    if (prog) prog.style.transform = "scaleX(" + (h > 0 ? clamp(y / h, 0, 1) : 0) + ")";
    lastY = y;
    litUpdate();
    ticking = false;
  }
  window.addEventListener(
    "scroll",
    function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onScroll);
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", litUpdate);
  onScroll();
  var rv = $$(".rv, .stages");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    rv.forEach(function (el) {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.95) {
        el.classList.add("pre");
        io.observe(el);
      }
    });
  } else {
    rv.forEach(function (el) {
      el.classList.add("in");
    });
  }
  var navLinks = $$(".nav-links a");
  if ("IntersectionObserver" in window) {
    var nio = new IntersectionObserver(
      function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          var g = e.target.getAttribute("data-g") || "";
          navLinks.forEach(function (a) {
            a.classList.toggle("on", !!g && a.getAttribute("data-g") === g);
          });
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    $$("main > section").forEach(function (s) {
      nio.observe(s);
    });
  }

  /* ---------- Work: case-study tabs ---------- */
  var tabs = $$(".wtab"),
    panels = $$(".tabpanel");
  function showTab(id, focus) {
    tabs.forEach(function (t) {
      var on = t.getAttribute("data-tab") === id;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    panels.forEach(function (p) {
      p.hidden = p.id !== "tp-" + id;
    });
    var cd = document.getElementById("chdesc"),
      st = $('.wtab[data-tab="' + id + '"] .d');
    if (cd && st) cd.textContent = st.textContent;
    $$(".chb").forEach(function (c) {
      c.setAttribute(
        "aria-pressed",
        c.getAttribute("data-go") === id ? "true" : "false",
      );
    });
    if (id === "productize") armBeforeAfter();
    if (typeof litUpdate === "function") requestAnimationFrame(litUpdate);
  }
  tabs.forEach(function (t, i) {
    t.addEventListener("click", function () {
      var id = t.getAttribute("data-tab");
      showTab(id);
      try {
        history.replaceState(null, "", "#" + id);
      } catch (e) {}
    });
    t.addEventListener("keydown", function (e) {
      var k = e.key,
        j = -1;
      if (k === "ArrowRight") j = (i + 1) % tabs.length;
      else if (k === "ArrowLeft") j = (i + tabs.length - 1) % tabs.length;
      else if (k === "Home") j = 0;
      else if (k === "End") j = tabs.length - 1;
      if (j > -1) {
        e.preventDefault();
        showTab(tabs[j].getAttribute("data-tab"), true);
      }
    });
  });
  var CASES = ["productize", "transform"];
  function route() {
    var h = (location.hash || "").replace("#", "");
    if (CASES.indexOf(h) > -1) {
      showTab(h);
      var tb = $("#work-tabs");
      if (tb) tb.scrollIntoView({ block: "start" });
    }
  }
  window.addEventListener("hashchange", route);

  /* ---------- Productize: before / after ---------- */
  var bf = $("#bflow"),
    bcap = $("#bcap"),
    segBtns = $$(".seg button"),
    touched = false,
    armed = false;
  var CAPS = {
    before: "The engineer was effectively the interface.",
    after: "The product became the access point.",
  };
  function setBA(v) {
    if (!bf) return;
    bf.setAttribute("data-state", v);
    if (bcap) bcap.textContent = CAPS[v];
    segBtns.forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-v") === v ? "true" : "false");
    });
  }
  segBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      touched = true;
      setBA(b.getAttribute("data-v"));
    });
  });
  function armBeforeAfter() {
    if (armed || !bf || reduce || !("IntersectionObserver" in window)) return;
    armed = true;
    var o = new IntersectionObserver(
      function (es) {
        if (es[0].isIntersecting) {
          o.disconnect();
          setTimeout(function () {
            if (!touched) setBA("after");
          }, 2200);
        }
      },
      { threshold: 0.6 },
    );
    o.observe(bf);
  }

  /* ---------- Leadership: five signals ---------- */
  var lts = $$(".lt");
  function pick(i) {
    lts.forEach(function (b, j) {
      b.setAttribute("aria-pressed", j === i ? "true" : "false");
    });
    for (var j = 0; j < 5; j++) {
      var p = document.getElementById("l" + j);
      if (p) p.hidden = j !== i;
    }
  }
  lts.forEach(function (b, i) {
    b.addEventListener("click", function () {
      pick(i);
    });
  });
  var vbs = $$(".vsel button");
  vbs.forEach(function (b, i) {
    b.addEventListener("click", function () {
      vbs.forEach(function (x, j) {
        x.setAttribute("aria-pressed", j === i ? "true" : "false");
        var q = document.getElementById("v" + j);
        if (q) q.hidden = j !== i;
      });
    });
  });

  /* ---------- Diagrams ---------- */
  function buildStages() {
    var svg = $("#stages");
    if (!svg) return;
    var rand = rng(11),
      cx = 120,
      cy = 75,
      ox = [0, 240, 480],
      i,
      a,
      k;
    var g1 = mk(svg, "g", {}, "g g1"),
      g2 = mk(svg, "g", {}, "g g2"),
      g3 = mk(svg, "g", {}, "g g3");
    for (i = 0; i < 16; i++)
      mk(g1, "circle", { cx: 14 + rand() * 212, cy: 12 + rand() * 126, r: 3 }, "dot");
    var pts = [];
    for (i = 0; i < 16; i++) {
      a = rand() * Math.PI * 2;
      var d = 14 + rand() * 54;
      pts.push({ x: ox[1] + cx + Math.cos(a) * d, y: cy + Math.sin(a) * d * 0.9 });
    }
    pts.forEach(function (p) {
      mk(g2, "line", { x1: ox[1] + cx, y1: cy, x2: p.x, y2: p.y }, "edge");
    });
    pts.forEach(function (p) {
      mk(g2, "circle", { cx: p.x, cy: p.y, r: 3 }, "dot");
    });
    mk(g2, "circle", { cx: ox[1] + cx, cy: cy, r: 7 }, "hub");
    var rings = [
        [6, 24],
        [10, 46],
        [14, 68],
      ],
      prev = null;
    rings.forEach(function (ring, ri) {
      var pp = [];
      for (k = 0; k < ring[0]; k++) {
        a = (k / ring[0]) * Math.PI * 2 + ri * 0.4;
        pp.push({
          x: ox[2] + cx + Math.cos(a) * ring[1],
          y: cy + Math.sin(a) * ring[1] * 0.88,
        });
      }
      pp.forEach(function (p, idx) {
        var q = pp[(idx + 1) % pp.length];
        mk(g3, "line", { x1: p.x, y1: p.y, x2: q.x, y2: q.y }, "edge");
      });
      if (prev)
        pp.forEach(function (p, idx) {
          var q = prev[Math.floor((idx * prev.length) / pp.length)];
          mk(g3, "line", { x1: p.x, y1: p.y, x2: q.x, y2: q.y }, "edge");
        });
      pp.forEach(function (p) {
        mk(g3, "circle", { cx: p.x, cy: p.y, r: 3 }, "dot");
      });
      prev = pp;
    });
    mk(g3, "circle", { cx: ox[2] + cx, cy: cy, r: 7 }, "hub");
  }
  function buildVas() {
    var svg = $("#vas");
    if (!svg) return;
    svg.setAttribute("viewBox", "0 26 900 168");
    var rand = rng(11),
      N = 5,
      LX = 418,
      LW = 44,
      OUT = 652,
      k;
    var slots = [],
      strands = [];
    for (k = 0; k < N; k++) slots.push(62 + k * 24);
    var gT = mk(svg, "g", {}, "vs-tangle"),
      gS = mk(svg, "g", {}, "vs-straight");
    for (k = 0; k < N; k++) {
      var s = {
        y0: 40 + ((k * 3) % N) * 34 + (rand() - 0.5) * 14,
        c1: rand() < 0.5 ? 20 + rand() * 40 : 160 + rand() * 40,
        c2: rand() < 0.5 ? 20 + rand() * 50 : 150 + rand() * 50,
        loose: 40 + rand() * 140,
        slot: slots[k],
      };
      s.t = mk(gT, "path", {}, "vs-t");
      s.s = mk(gS, "path", {}, "vs-s");
      strands.push(s);
    }
    /* the lens where variation becomes pattern */
    mk(svg, "rect", { x: LX, y: 36, width: LW, height: 148, rx: 22 }, "vs-lens");
    /* the structure the patterns feed */
    var sx = OUT + 6,
      sw = 900 - sx - 8;
    var blocks = [
      mk(svg, "rect", { x: sx, y: 40, width: sw, height: 30, rx: 6 }, "vs-head"),
    ];
    var bw = (sw - 10) / 2;
    [
      [sx, 80],
      [sx + bw + 10, 80],
      [sx, 132],
      [sx + bw + 10, 132],
    ].forEach(function (p) {
      blocks.push(
        mk(svg, "rect", { x: p[0], y: p[1], width: bw, height: 42, rx: 6 }, "vs-box"),
      );
    });
    var gP = mk(svg, "g", {}, "vs-dots");
    function draw(p) {
      strands.forEach(function (s) {
        var y = s.loose + (s.slot - s.loose) * p;
        s.t.setAttribute(
          "d",
          "M14," +
            s.y0.toFixed(1) +
            " C 150," +
            s.c1.toFixed(1) +
            " 280," +
            s.c2.toFixed(1) +
            " " +
            (LX + LW / 2) +
            "," +
            y.toFixed(1),
        );
        s.s.setAttribute(
          "d",
          "M" + (LX + LW / 2) + "," + y.toFixed(1) + " L " + OUT + "," + y.toFixed(1),
        );
      });
      svg.style.setProperty("--vs", p.toFixed(3));
    }
    /* B: once aligned, ideas keep flowing: dots travel each expert path, through the lens, and build the blueprint */
    function flow() {
      var NS = "http://www.w3.org/2000/svg",
        guides = strands.map(function (s) {
          var p = document.createElementNS(NS, "path");
          p.setAttribute(
            "d",
            s.t.getAttribute("d") + " L " + OUT + "," + s.slot.toFixed(1),
          );
          p.setAttribute("fill", "none");
          gP.appendChild(p);
          p.style.display = "none";
          return { p: p, L: p.getTotalLength() };
        });
      var dots = [],
        filled = 0,
        visible = true,
        last = performance.now(),
        nextAt = 0,
        lane = 0;
      new IntersectionObserver(function (es) {
        visible = es[0].isIntersecting;
      }).observe(svg);
      function spawn(now) {
        var g = guides[lane % guides.length];
        lane += 2;
        var c = mk(gP, "circle", { r: 2.8 }, "vs-dot");
        dots.push({
          c: c,
          g: g,
          t0: now,
          dur: 2600 + Math.random() * 500,
          target: blocks[((lane / 2) % blocks.length) | 0],
        });
      }
      (function tick(now) {
        if (visible) {
          if (now >= nextAt) {
            spawn(now);
            nextAt = now + 420;
          }
          dots = dots.filter(function (d) {
            var x = (now - d.t0) / d.dur;
            if (x >= 1) {
              d.c.remove();
              var b = blocks[filled % blocks.length];
              filled++;
              b.classList.add("lit");
              b.classList.remove("ping");
              void b.getBoundingClientRect();
              b.classList.add("ping");
              return false;
            }
            var e = x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
            var pt = d.g.p.getPointAtLength(e * d.g.L);
            d.c.setAttribute("cx", pt.x.toFixed(1));
            d.c.setAttribute("cy", pt.y.toFixed(1));
            d.c.setAttribute(
              "opacity",
              (x < 0.08 ? x / 0.08 : x > 0.92 ? (1 - x) / 0.08 : 1).toFixed(2),
            );
            return true;
          });
        }
        requestAnimationFrame(tick);
      })(performance.now());
    }
    var red =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (red || !("IntersectionObserver" in window)) {
      draw(1);
      svg.classList.add("vs-done");
      return;
    }
    draw(0);
    var played = false;
    function play() {
      if (played) return;
      played = true;
      var t0 = performance.now(),
        D = 1500;
      (function f(now) {
        var x = Math.min(1, (now - t0) / D),
          e = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        draw(e);
        if (x < 1) requestAnimationFrame(f);
        else {
          svg.classList.add("vs-done");
          flow();
        }
      })(t0);
    }
    var io = new IntersectionObserver(
      function (es) {
        if (es[0].isIntersecting && svg.getBoundingClientRect().height > 0) {
          io.disconnect();
          setTimeout(play, 250);
        }
      },
      { threshold: 0.55 },
    );
    io.observe(svg);
  }
  function buildSystem() {
    var svg = $("#system");
    if (!svg) return;
    svg.setAttribute("viewBox", "10 30 460 382");
    var NS = "http://www.w3.org/2000/svg";
    var C = { x: 240, y: 334 },
      R = 70,
      r = 52;
    var F = [
      { x: 76, t: "Product", g: ["Complexity", "to coherence"] },
      { x: 240, t: "Organization", g: ["Capability", "to scale"] },
      { x: 404, t: "Business", g: ["Decisions", "to outcomes"] },
    ];
    var FY = 120;
    var lines = mk(svg, "g", {}, "cv-lines");
    F.forEach(function (f, i) {
      var dx = C.x - f.x,
        dy = C.y - FY,
        L = Math.sqrt(dx * dx + dy * dy);
      var ex = C.x - (dx / L) * R,
        ey = C.y - (dy / L) * R;
      var ln = mk(
        lines,
        "line",
        { x1: f.x, y1: FY, x2: ex.toFixed(1), y2: ey.toFixed(1) },
        "cv-l",
      );
      ln.style.setProperty("--k", i);
      f.ex = ex;
      f.ey = ey;
    });
    /* the system */
    var sys = mk(svg, "g", {}, "cv-sys");
    mk(sys, "circle", { cx: C.x, cy: C.y, r: R }, "cv-halo");
    mk(sys, "circle", { cx: C.x, cy: C.y, r: R }, "cv-halo h2");
    mk(sys, "circle", { cx: C.x, cy: C.y, r: R }, "cv-ring");
    mk(sys, "circle", { cx: C.x, cy: C.y, r: r }, "cv-core");
    var t = mk(sys, "text", { x: C.x, y: C.y + 4.5, "text-anchor": "middle" }, "cv-st");
    t.setAttribute("y", C.y + 5.5);
    t.textContent = "SYSTEM";
    /* forces flowing in */
    if (!reduce)
      F.forEach(function (f, i) {
        for (var k = 0; k < 2; k++) {
          var p = mk(svg, "circle", { r: 2.6, cx: 0, cy: 0 }, "cv-p");
          var dur = 3.6,
            begin = (i * 0.55 + (k * dur) / 2).toFixed(2) + "s";
          var am = document.createElementNS(NS, "animateMotion");
          am.setAttribute(
            "path",
            "M" + f.x + "," + FY + " L" + f.ex.toFixed(1) + "," + f.ey.toFixed(1),
          );
          am.setAttribute("dur", dur + "s");
          am.setAttribute("begin", begin);
          am.setAttribute("repeatCount", "indefinite");
          am.setAttribute("keyPoints", "0;1");
          am.setAttribute("keyTimes", "0;1");
          am.setAttribute("calcMode", "spline");
          am.setAttribute("keySplines", ".45 0 .55 1");
          var op = document.createElementNS(NS, "animate");
          op.setAttribute("attributeName", "opacity");
          op.setAttribute("values", "0;1;1;0");
          op.setAttribute("keyTimes", "0;.15;.8;1");
          op.setAttribute("dur", dur + "s");
          op.setAttribute("begin", begin);
          op.setAttribute("repeatCount", "indefinite");
          p.setAttribute("opacity", "0");
          p.appendChild(am);
          p.appendChild(op);
        }
      });
    /* the three forces */
    F.forEach(function (f) {
      mk(svg, "circle", { cx: f.x, cy: FY, r: 6 }, "cv-f");
      var tx = mk(
        svg,
        "text",
        { x: f.x, y: FY - 68, "text-anchor": "middle" },
        "cv-ft",
      );
      tx.textContent = f.t.toUpperCase();
      var gl = mk(svg, "text", { x: f.x, y: FY - 44, "text-anchor": "middle" }, "cv-g");
      f.g.forEach(function (line, n) {
        var ts = mk(gl, "tspan", { x: f.x, dy: n ? "1.3em" : "0" });
        ts.textContent = line;
      });
    });
  }

  /* Light theme only */
  function paintToggle() {
    colours();
    kick();
  }

  /* ---------- Digital twin: floating invitation and overlay ---------- */
  (function () {
    var fab = $(".twin-fab"),
      dlg = $("#twin"),
      video = dlg && $("video", dlg),
      media = dlg && $(".twin-media", dlg),
      play = dlg && $(".twin-play", dlg),
      qualityButtons = dlg ? $$(".twin-q button", dlg) : [];
    if (!fab || !dlg || typeof dlg.showModal !== "function") return;
    function showFab() {
      /* the invitation waits until the reader starts scrolling, so the first screen stays clean */
      function check() {
        if (window.scrollY > 160 && !dlg.open) {
          fab.classList.add("on");
          window.removeEventListener("scroll", check);
        }
      }
      window.addEventListener("scroll", check, { passive: true });
      check();
    }
    if (document.documentElement.classList.contains("intro-on"))
      document.addEventListener("introdone", showFab, { once: true });
    else showFab();
    function open(e) {
      if (e) e.preventDefault();
      if (!dlg.open) dlg.showModal();
      fab.classList.remove("on");
    }
    function close() {
      if (dlg.open) dlg.close();
    }
    $$("[data-twin]").forEach(function (a) {
      a.addEventListener("click", open);
    });
    if (video && media && play) {
      play.addEventListener("click", function () {
        video.controls = true;
        media.classList.add("is-playing");
        var started = video.play();
        if (started && typeof started.catch === "function") {
          started.catch(function () {
            video.controls = false;
            media.classList.remove("is-playing");
          });
        }
      });
      video.addEventListener("ended", function () {
        video.controls = false;
        video.currentTime = 0;
        media.classList.remove("is-playing");
      });
      qualityButtons.forEach(function (button) {
        button.addEventListener("click", function () {
          var src = button.getAttribute("data-src");
          if (!src || video.getAttribute("src") === src) return;
          var currentTime = video.currentTime || 0,
            wasPlaying = !video.paused && !video.ended;
          qualityButtons.forEach(function (item) {
            item.setAttribute("aria-pressed", item === button ? "true" : "false");
          });
          video.setAttribute("src", src);
          if (currentTime > 0 || wasPlaying) {
            video.addEventListener(
              "loadedmetadata",
              function () {
                video.currentTime = Math.min(
                  currentTime,
                  video.duration || currentTime,
                );
                if (wasPlaying) {
                  var resumed = video.play();
                  if (resumed && typeof resumed.catch === "function")
                    resumed.catch(function () {});
                }
              },
              { once: true },
            );
          }
          video.load();
        });
      });
    }
    $(".td-x", dlg).addEventListener("click", close);
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) close();
    });
    dlg.addEventListener("close", function () {
      if (video) {
        video.pause();
        video.controls = false;
        video.currentTime = 0;
      }
      if (media) media.classList.remove("is-playing");
      fab.classList.add("on");
      try {
        history.replaceState(null, "", location.pathname + location.search);
      } catch (e) {}
    });
    if (location.hash === "#twin") open();
  })();

  paintToggle();
  buildStages();
  buildVas();
  buildSystem();
  route();
})();

/* If the reader scrolls during the intro, reveal the header right away so navigation is never out of reach */
(function () {
  var root = document.documentElement;
  if (!root.classList.contains("intro-on")) return;
  function check() {
    if (!root.classList.contains("intro-on")) {
      window.removeEventListener("scroll", check);
      return;
    }
    if (window.scrollY > 24) {
      root.classList.add("bar-early");
      window.removeEventListener("scroll", check);
    }
  }
  window.addEventListener("scroll", check, { passive: true });
})();

/* Step the twin button aside while the footer (with the theme switch) is on screen */
(function () {
  var foot = document.querySelector(".foot"),
    fab = document.querySelector(".twin-fab");
  if (!foot || !fab || !("IntersectionObserver" in window)) return;
  new IntersectionObserver(function (es) {
    fab.classList.toggle("at-foot", es[0].isIntersecting);
  }).observe(foot);
})();

/* Floating section navigator */
(function () {
  var nav = document.querySelector(".secnav");
  if (!nav) return;
  var pill = nav.querySelector(".sn-pill"),
    panel = nav.querySelector("#sn-panel");
  var links = [].slice.call(nav.querySelectorAll(".sn-list a"));
  var secs = links.map(function (a) {
    return document.getElementById(a.getAttribute("href").slice(1));
  });
  var cEl = pill.querySelector(".sn-c b"),
    tEl = pill.querySelector(".sn-t");
  var hero = document.querySelector(".hero"),
    foot = document.querySelector(".foot"),
    root = document.documentElement;
  var cur = -1,
    atFoot = false;
  function setOpen(o) {
    pill.setAttribute("aria-expanded", o ? "true" : "false");
    if (o) {
      panel.hidden = false;
      requestAnimationFrame(function () {
        nav.classList.add("open");
      });
    } else {
      nav.classList.remove("open");
      setTimeout(function () {
        if (!nav.classList.contains("open")) panel.hidden = true;
      }, 220);
    }
  }
  function update() {
    var y = window.scrollY,
      line = window.innerHeight * 0.4,
      i = -1;
    secs.forEach(function (s, k) {
      if (s && s.getBoundingClientRect().top <= line) i = k;
    });
    if (i < 0) i = 0;
    if (i !== cur) {
      cur = i;
      cEl.textContent = (i < 9 ? "0" : "") + (i + 1);
      tEl.textContent = links[i].querySelector(".sn-l").textContent;
      links.forEach(function (a, k) {
        if (k === i) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }
    var past = hero ? y > hero.offsetHeight * 0.6 : y > 400;
    var show = past && !atFoot && !root.classList.contains("intro-on");
    nav.classList.toggle("on", show);
    if (!show && pill.getAttribute("aria-expanded") === "true") setOpen(false);
  }
  pill.addEventListener("click", function () {
    setOpen(pill.getAttribute("aria-expanded") !== "true");
  });
  links.forEach(function (a) {
    a.addEventListener("click", function () {
      setOpen(false);
    });
  });
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target) && pill.getAttribute("aria-expanded") === "true")
      setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && pill.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      pill.focus();
    }
  });
  if (foot && "IntersectionObserver" in window)
    new IntersectionObserver(function (es) {
      atFoot = es[0].isIntersecting;
      update();
    }).observe(foot);
  var tick = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!tick) {
        tick = true;
        requestAnimationFrame(function () {
          tick = false;
          update();
        });
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", update);
  document.addEventListener("introdone", update);
  update();
})();

/* Chapters: pinned switcher while reading + next-chapter endings */
(function () {
  var tabsEl = document.getElementById("work-tabs"),
    bar = document.querySelector(".chbar"),
    hdr = document.querySelector(".bar");
  var panels = [].slice.call(document.querySelectorAll(".tabpanel"));
  if (!tabsEl || !bar) return;
  function setH() {
    if (hdr)
      document.documentElement.style.setProperty("--barh", hdr.offsetHeight + "px");
  }
  setH();
  window.addEventListener("resize", setH);
  function go(id) {
    var t = document.querySelector('.wtab[data-tab="' + id + '"]');
    if (t) t.click();
    var p = document.getElementById("tp-" + id);
    if (p)
      requestAnimationFrame(function () {
        var off = (hdr ? hdr.offsetHeight : 0) + bar.offsetHeight + 28;
        var y = p.getBoundingClientRect().top + window.scrollY - off;
        window.scrollTo({
          top: y,
          behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
            ? "auto"
            : "smooth",
        });
      });
  }
  [].slice.call(document.querySelectorAll("[data-go]")).forEach(function (el) {
    el.addEventListener("click", function (e) {
      var id = el.getAttribute("data-go");
      if (!id) return;
      e.preventDefault();
      go(id);
    });
  });
  function update() {
    var top = hdr ? hdr.offsetHeight : 0;
    var tr = tabsEl.getBoundingClientRect();
    var vis = panels.filter(function (p) {
      return !p.hidden;
    })[0];
    var pr = vis ? vis.getBoundingClientRect() : null;
    var show = tr.bottom < top && pr && pr.bottom > top + 160;
    bar.classList.toggle("on", !!show);
  }
  var tk = false;
  window.addEventListener(
    "scroll",
    function () {
      if (!tk) {
        tk = true;
        requestAnimationFrame(function () {
          tk = false;
          update();
        });
      }
    },
    { passive: true },
  );
  window.addEventListener("resize", update);
  update();
})();

/* Accordions: one open at a time; heights and scroll move together on one eased curve */
(function () {
  var hdr = document.querySelector(".bar");
  var reduce =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var DUR = 620;
  function ease(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  } /* ease-in-out cubic */
  function body(det) {
    return det.querySelector(":scope > .bd");
  }
  function box(b) {
    var cs = getComputedStyle(b),
      pt = parseFloat(cs.paddingTop) || 0,
      pb = parseFloat(cs.paddingBottom) || 0;
    return { b: b, pt: pt, pb: pb, h: b.offsetHeight - pt - pb };
  }
  function setF(x, f) {
    x.b.style.overflow = "hidden";
    x.b.style.height = x.h * f + "px";
    x.b.style.paddingTop = x.pt * f + "px";
    x.b.style.paddingBottom = x.pb * f + "px";
  }
  function clear(x) {
    ["overflow", "height", "paddingTop", "paddingBottom"].forEach(function (p) {
      x.b.style[p] = "";
    });
  }
  var busy = false;
  [].slice.call(document.querySelectorAll(".beats")).forEach(function (group) {
    var rows = [].slice.call(group.querySelectorAll(":scope > details.beat-row"));
    rows.forEach(function (d) {
      var sum = d.querySelector(":scope > summary");
      sum.addEventListener("click", function (ev) {
        ev.preventDefault();
        if (busy) return;
        var opening = !d.open;
        var closing = (
          opening
            ? rows.filter(function (o) {
                return o !== d && o.open;
              })
            : [d]
        )
          .map(function (o) {
            var b = body(o);
            return b ? box(b) : null;
          })
          .filter(Boolean);
        closing.forEach(function (x) {
          x.o = x.b.parentNode;
        });
        var cb = d.closest(".tabpanel") ? document.querySelector(".chbar") : null;
        var off = (hdr ? hdr.offsetHeight : 0) + (cb ? cb.offsetHeight + 18 : 0) + 24;
        var startY = window.scrollY,
          op = null;
        if (opening) {
          d.open = true;
          var ob = body(d);
          if (ob) {
            op = box(ob);
            setF(op, 0);
          }
        }
        function target() {
          return Math.max(0, d.getBoundingClientRect().top + window.scrollY - off);
        }
        function frame(k) {
          closing.forEach(function (x) {
            setF(x, 1 - k);
          });
          if (op) setF(op, k);
        }
        function finish() {
          closing.forEach(function (x) {
            x.o.open = false;
            clear(x);
          });
          if (op) clear(op);
          busy = false;
        }
        if (reduce) {
          finish();
          if (opening) window.scrollTo({ top: target(), behavior: "instant" });
          return;
        }
        /* work out where the row will sit once everything has settled */
        frame(1);
        var endY = opening ? target() : startY;
        frame(0);
        busy = true;
        var t0 = performance.now();
        (function step(now) {
          var p = Math.min(1, (now - t0) / DUR),
            k = ease(p);
          frame(k);
          if (opening)
            window.scrollTo({ top: startY + (endY - startY) * k, behavior: "instant" });
          if (p < 1) requestAnimationFrame(step);
          else finish();
        })(t0);
      });
    });
  });
})();

/* Human -> System -> Outcome: place each arrow midway between the two titles it joins */
(function () {
  var chains = [].slice.call(document.querySelectorAll(".bd .flow.chain"));
  if (!chains.length) return;
  function place() {
    chains.forEach(function (ch) {
      var nodes = [].slice.call(ch.querySelectorAll(":scope > .node"));
      nodes.forEach(function (n, i) {
        var nx = nodes[i + 1];
        if (!nx) return;
        var a = n.querySelector(".t"),
          b = nx.querySelector(".t");
        if (!a || !b || !a.offsetWidth) return;
        var nr = n.getBoundingClientRect(),
          ar = a.getBoundingClientRect(),
          br = b.getBoundingClientRect();
        n.style.setProperty("--ax", (ar.right + br.left) / 2 - nr.left + "px");
        n.style.setProperty("--ay", ar.top + ar.height / 2 - nr.top + "px");
      });
    });
  }
  window.addEventListener("resize", place);
  document.addEventListener(
    "toggle",
    function () {
      requestAnimationFrame(place);
    },
    true,
  );
  document.addEventListener("click", function () {
    setTimeout(place, 700);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(place);
  place();
})();

/* ================= Product film: source → orchestrate → data factory → agent ================= */
(function () {
  var fig = document.querySelector(".prodshot.pf:not(.pf2)");
  if (!fig || fig.dataset.pfReady) return;
  fig.dataset.pfReady = "true";
  var view = fig.querySelector(".pf-view"),
    stage = fig.querySelector(".pf-stage");
  var ov = fig.querySelector(".pf-ov"),
    ovN = fig.querySelector(".pf-ov-n"),
    ovT = fig.querySelector(".pf-ov-t b"),
    ovS = fig.querySelector(".pf-ov-t span");
  var bars = fig.querySelectorAll(".pf-bar i b"),
    ctl = fig.querySelector(".pf-ctl");
  var reduce =
    window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var W = 1920,
    H = 992;

  function fit() {
    var s = view.clientWidth / W;
    stage.style.transform = "scale(" + s + ")";
  }
  if ("ResizeObserver" in window) new ResizeObserver(fit).observe(view);
  else window.addEventListener("resize", fit);
  fit();

  /* ---------- icons ---------- */
  var P = function (d, extra) {
    return (
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"' +
      (extra || "") +
      ">" +
      d +
      "</svg>"
    );
  };
  var I = {
    home: P(
      '<path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-5h-6v5H5a1 1 0 0 1-1-1z"/>',
    ),
    flow: P(
      '<circle cx="7" cy="6" r="2"/><circle cx="17" cy="18" r="2"/><path d="M9 6h6a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h6"/>',
    ),
    fac: P(
      '<circle cx="12" cy="12" r="3"/><path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6 7 7M17 17l1.4 1.4M5.6 18.4 7 17M17 7l1.4-1.4"/>',
    ),
    doc: P(
      '<rect x="5" y="4" width="14" height="16" rx="3"/><path d="M9 10h6M9 14h4"/>',
    ),
    help: P(
      '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14"/><circle cx="12" cy="17" r=".6" fill="currentColor"/>',
    ),
    users: P(
      '<circle cx="9" cy="9" r="3"/><circle cx="16" cy="10" r="2.5"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M14 19a4.5 4.5 0 0 1 7 0"/>',
    ),
    wand: P(
      '<path d="m4 20 11-11M14 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1zM19 11l.5 1 1 .5-1 .5-.5 1-.5-1-1-.5 1-.5z"/>',
    ),
    srch: P(
      '<circle cx="11" cy="11" r="6"/><path d="m20 20-4.5-4.5"/>',
      ' style="width:14px;height:14px"',
    ),
    chev: P('<path d="m6 9 6 6 6-6"/>', ' style="width:18px;height:18px"'),
    s1: P(
      '<circle cx="6" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="18" cy="6" r="2"/><circle cx="12" cy="16" r="3" fill="currentColor"/>',
    ),
    s2: P(
      '<rect x="5" y="6" width="14" height="12" rx="2"/><path d="M3 9V5h4M21 9V5h-4M3 15v4h4M21 15v4h-4M8 12h8"/>',
    ),
    s3: P(
      '<ellipse cx="12" cy="6" rx="7" ry="2.5"/><path d="M5 6v12c0 1.4 3.1 2.5 7 2.5M19 6v6M5 12c0 1.4 3.1 2.5 7 2.5"/><circle cx="18" cy="17" r="3"/>',
    ),
    s4: P(
      '<path d="M7 4H4v16h3M17 4h3v16h-3"/><circle cx="10" cy="9" r="1.6"/><circle cx="14" cy="15" r="1.6"/><path d="m11 10 2 4"/>',
    ),
    s5: P(
      '<path d="M12 3c.6 3.4 2.6 5.4 6 6-3.4.6-5.4 2.6-6 6-.6-3.4-2.6-5.4-6-6 3.4-.6 5.4-2.6 6-6zM18 15c.3 1.5 1 2.2 2.5 2.5-1.5.3-2.2 1-2.5 2.5-.3-1.5-1-2.2-2.5-2.5 1.5-.3 2.2-1 2.5-2.5z"/>',
    ),
    s6: P(
      '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.8-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.8 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.8.3H9a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.8V9a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/>',
    ),
    s7: P(
      '<rect x="4" y="5" width="14" height="15" rx="2"/><path d="M8 3v4M14 3v4M4 10h14"/><circle cx="17" cy="17" r="4" fill="#fff"/><path d="M17 15.5V17l1 1"/>',
    ),
  };
  var STEPS = [
    ["s1", "Source"],
    ["s2", "Profile"],
    ["s3", "Prepare"],
    ["s4", "Connect"],
    ["s6", "Validate"],
    ["s5", "Enrich"],
    ["s7", "Orchestrate"],
  ];

  /* ---------- chrome builders ---------- */
  function header(navOn, avatarOnly) {
    var nav =
      '<div class="pf-a pf-nav"><i class="' +
      (navOn === 0 ? "on" : "") +
      '">' +
      I.home +
      '</i><i class="' +
      (navOn === 1 ? "on" : "") +
      '">' +
      I.flow +
      "</i>" +
      (navOn === 2
        ? '<i class="on" style="background:#E8EEF8;color:#1E4FA8">' +
          I.fac +
          "</i>"
        : "") +
      "</div>";
    var right = avatarOnly
      ? '<div class="pf-a pf-right"><span class="pf-av">JR</span><span class="pf-t14 pf-b" style="margin-left:-18px">Jordan Reyes</span></div>'
      : '<div class="pf-a pf-right"><span class="pf-ico">' +
        I.doc +
        '</span><span class="pf-ico">' +
        I.help +
        '</span><span class="pf-ico">' +
        I.users +
        '</span><span class="pf-ico">' +
        I.wand +
        '</span><span class="pf-av">JR</span></div>';
    return (
      '<div class="pf-a pf-logo"><span class="pf-mark"></span>workspace</div>' +
      nav +
      right
    );
  }
  function title(kick, h1, product, hm) {
    return (
      '<div class="pf-a pf-kick">' +
      kick +
      '</div><div class="pf-a pf-h1">' +
      h1 +
      "</div>" +
      '<div class="pf-a pf-pn">Product Name<b>' +
      product +
      "</b></div>" +
      (hm ? '<div class="pf-a pf-hm">' + hm + "</div>" : "")
    );
  }
  function footer(step, label) {
    var s = "";
    STEPS.forEach(function (st, i) {
      if (i === step)
        s +=
          '<i class="cur">' +
          I[st[0]] +
          "<span>Step " +
          (i + 1) +
          "/7<br>" +
          st[1] +
          "</span></i>";
      else s += "<i>" + I[st[0]] + "</i>";
    });
    return (
      '<div class="pf-a pf-foot"><div class="pf-a pf-tut"><span class="pf-play"></span>' +
      label +
      ' Tutorials</div><div class="pf-a pf-steps">' +
      s +
      "</div></div>"
    );
  }
  function esc(s) {
    return String(s);
  }

  /* ---------- synthetic, masked healthcare data ---------- */
  var MRN = [
    "••••4821",
    "••••7330",
    "••••1192",
    "••••5604",
    "••••9917",
    "••••2046",
    "••••6583",
    "••••3378",
    "••••8125",
    "••••0469",
  ];
  var NM = [
    "M. R•••••",
    "D. O••••",
    "A. K•••",
    "S. P•••••",
    "J. L••",
    "T. N•••••",
    "R. B•••",
    "L. H••••",
    "C. V•••",
    "E. W•••••",
  ];
  var GD = ["F", "M", "F", "F", "M", "M", "F", "M", "F", "F"];
  var DOB = [
    "1984-••-••",
    "1957-••-••",
    "1991-••-••",
    "1969-••-••",
    "2002-••-••",
    "1976-••-••",
    "1948-••-••",
    "1988-••-••",
    "1963-••-••",
    "1995-••-••",
  ];
  var ICD = [
    "E11.9",
    "I10",
    "J45.909",
    "E78.5",
    "M54.5",
    "I10",
    "N18.3",
    "F41.1",
    "E11.65",
    "K21.9",
  ];

  /* ---------- scenes ---------- */
  var SC = [];
  var PL = {
    0: {
      img: "/images/home/final/product-film/plate-00.webp",
      html: '<div class="pf-a pf-logo" style="left:44px;top:33px;color:#111"><span class="pf-mark"></span>workspace</div><span class="pf-a" style="left:1840px;top:29px;width:33px;height:33px;border-radius:50%;display:grid;place-items:center;font:700 13px/1 PFLato;color:#234">JR</span><span class="pf-tx" style="left:45px;top:189px;font:700 16.0px/1 PFLato;color:#231f20;" >Care Network 360</span><span class="pf-tx" style="left:101px;top:321px;font:700 14.5px/1 PFLato;color:#231f20;" >ehr-lake</span><span class="pf-tx" style="left:87px;top:371px;font:700 13.5px/1 PFLato;color:#231f20;" >ehr-lake</span><span class="pf-tx" style="left:127px;top:431px;font:400 14.0px/1 PFLato;color:#231f20;" >admissions.parquet</span><span class="pf-tx" style="left:126px;top:493px;font:400 14.0px/1 PFLato;color:#231f20;" >encounters.parquet</span><span class="pf-tx" style="left:126px;top:554px;font:400 14.0px/1 PFLato;color:#231f20;" >discharges.parquet</span><span class="pf-tx" style="left:86px;top:603px;font:400 14.0px/1 PFLato;color:#231f20;" >claims_2024</span><span class="pf-tx" style="left:86px;top:655px;font:400 14.0px/1 PFLato;color:#231f20;" >rx_fills</span><span class="pf-tx" style="left:86px;top:707px;font:400 14.0px/1 PFLato;color:#231f20;" >lab_results</span><span class="pf-tx" style="left:86px;top:759px;font:400 14.0px/1 PFLato;color:#231f20;" >patients_master</span><span class="pf-tx" style="left:86px;top:811px;font:400 14.0px/1 PFLato;color:#231f20;" >providers</span><div class="pf-a" style="left:0;top:850px;width:330px;height:16px;overflow:hidden"><span class="pf-tx" style="left:86px;top:13px;font:400 14.0px/1 PFLato;color:#231f20">referrals</span></div><span class="pf-tx" style="left:563px;top:278px;font:400 14.0px/1 PFLato;color:#231f20;" >ehr-lake</span><span class="pf-tx" style="left:621.5807800292969px;top:278px;font:400 14.0px/1 PFLato;color:#231f20;" >/</span><span class="pf-tx" style="left:639.9087524414062px;top:278px;font:700 14.0px/1 PFLato;color:#838485;" >encounters.parquet</span><img class="pf-a" src="data:image/webp;base64,UklGRqwAAABXRUJQVlA4TKAAAAAvFAAFAJegkI0kaAlKcI8/50qYads2pwKICeycgrZt2FQJzAj25p9s0mZP0t7x/wFEFqKcCsBc6wWAw0hy2wYAqayXgO+/W0GgQwMR/Z8A/mW4u48cKunildPApy9TZT6Zh0ah4YV2Z5hN1PpyJ0h2O/A8FBUD82MqhPDVreAVIV1izNFXjqntHFMWNV7QK9MWSfSjErPYU1bWAwCu4D8C" style="left:770px;top:273px"><span class="pf-tx" style="left:386px;top:404px;font:400 14.5px/1 PFLato;color:#231f20;" >parquet</span><span class="pf-tx" style="left:411px;top:539px;font:400 12.0px/1 PFLato;color:#231f20;" >Patient_MRN</span><span class="pf-tx" style="left:411px;top:581px;font:400 12.0px/1 PFLato;color:#231f20;" >Pat_Full_Nm</span><span class="pf-tx" style="left:411px;top:623px;font:400 12.0px/1 PFLato;color:#231f20;" >Gndr_Cd</span><span class="pf-tx" style="left:411px;top:665px;font:400 12.0px/1 PFLato;color:#231f20;" >Dob</span><span class="pf-tx" style="left:411px;top:707px;font:400 12.0px/1 PFLato;color:#231f20;" >Phone_Nbr</span><span class="pf-tx" style="left:411px;top:749px;font:400 12.0px/1 PFLato;color:#231f20;" >Payer_Id</span><span class="pf-tx" style="left:411px;top:791px;font:400 12.0px/1 PFLato;color:#231f20;" >Icd10_Cd</span><div class="pf-a" style="left:0;top:820px;width:830px;height:23px;overflow:hidden"><span class="pf-tx" style="left:411px;top:13px;font:400 12.0px/1 PFLato;color:#231f20">Enc_Dt</span></div><img class="pf-a" data-uc="0" src="data:image/webp;base64,UklGRnQAAABXRUJQVlA4TGgAAAAvEUAEAEegoG0bhj/g7i+loaBtG4Y/4O4vVdC2DcMfcPeXzn/YXlUAts0MgCQAAJjW1t7kS4/sGQHNCDgsDg0TdI/M3k0xQET/JwCdTy5XLIMtN34QlKP6akb/0EFrakq23AXeXM7oBA==" style="left:384px;top:535px"><img class="pf-a" data-uc="1" src="data:image/webp;base64,UklGRnQAAABXRUJQVlA4TGgAAAAvEUAEAEegoG0bhj/g7i+loaBtG4Y/4O4vVdC2DcMfcPeXzn/YXlUAts0MgCQAAJjW1t7kS4/sGQHNCDgsDg0TdI/M3k0xQET/JwCdTy5XLIMtN34QlKP6akb/0EFrakq23AXeXM7oBA==" style="left:384px;top:577px"><img class="pf-a" data-uc="2" src="data:image/webp;base64,UklGRnQAAABXRUJQVlA4TGgAAAAvEUAEAEegoG0bhj/g7i+loaBtG4Y/4O4vVdC2DcMfcPeXzn/YXlUAts0MgCQAAJjW1t7kS4/sGQHNCDgsDg0TdI/M3k0xQET/JwCdTy5XLIMtN34QlKP6akb/0EFrakq23AXeXM7oBA==" style="left:384px;top:619px"><img class="pf-a" data-uc="3" src="data:image/webp;base64,UklGRnQAAABXRUJQVlA4TGgAAAAvEUAEAEegoG0bhj/g7i+loaBtG4Y/4O4vVdC2DcMfcPeXzn/YXlUAts0MgCQAAJjW1t7kS4/sGQHNCDgsDg0TdI/M3k0xQET/JwCdTy5XLIMtN34QlKP6akb/0EFrakq23AXeXM7oBA==" style="left:384px;top:661px"><span class="pf-tx" style="left:886px;top:397px;font:700 14.0px/1 PFLato;color:#838485;" >Patient_MRN</span><span class="pf-tx" style="left:1121px;top:397px;font:700 14.0px/1 PFLato;color:#838485;" >Pat_Full_Nm</span><span class="pf-tx" style="left:1385px;top:397px;font:700 14.0px/1 PFLato;color:#838485;" >Gndr_Cd</span><span class="pf-tx" style="left:1624px;top:397px;font:700 14.0px/1 PFLato;color:#838485;" >Dob</span><div class="pf-a" data-row="0" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:450px;font:400 12.0px/1 PFLato;color:#231f20">••••4821</span><span class="pf-tx" style="left:1121px;top:450px;font:400 12.0px/1 PFLato;color:#231f20">M. R•••••</span><span class="pf-tx" style="left:1385px;top:450px;font:400 12.0px/1 PFLato;color:#231f20">F</span><span class="pf-tx" style="left:1626px;top:450px;font:400 12.0px/1 PFLato;color:#231f20">1984-••-••</span></div><div class="pf-a" data-row="1" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:492px;font:400 12.0px/1 PFLato;color:#231f20">••••7330</span><span class="pf-tx" style="left:1121px;top:492px;font:400 12.0px/1 PFLato;color:#231f20">D. O••••</span><span class="pf-tx" style="left:1385px;top:492px;font:400 12.0px/1 PFLato;color:#231f20">M</span><span class="pf-tx" style="left:1626px;top:492px;font:400 12.0px/1 PFLato;color:#231f20">1957-••-••</span></div><div class="pf-a" data-row="2" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:534px;font:400 12.0px/1 PFLato;color:#231f20">••••1192</span><span class="pf-tx" style="left:1121px;top:534px;font:400 12.0px/1 PFLato;color:#231f20">A. K•••</span><span class="pf-tx" style="left:1385px;top:534px;font:400 12.0px/1 PFLato;color:#231f20">F</span><span class="pf-tx" style="left:1626px;top:534px;font:400 12.0px/1 PFLato;color:#231f20">1991-••-••</span></div><div class="pf-a" data-row="3" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:576px;font:400 12.0px/1 PFLato;color:#231f20">••••5604</span><span class="pf-tx" style="left:1121px;top:576px;font:400 12.0px/1 PFLato;color:#231f20">S. P•••••</span><span class="pf-tx" style="left:1385px;top:576px;font:400 12.0px/1 PFLato;color:#231f20">F</span><span class="pf-tx" style="left:1626px;top:576px;font:400 12.0px/1 PFLato;color:#231f20">1969-••-••</span></div><div class="pf-a" data-row="4" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:618px;font:400 12.0px/1 PFLato;color:#231f20">••••9917</span><span class="pf-tx" style="left:1121px;top:618px;font:400 12.0px/1 PFLato;color:#231f20">J. L••</span><span class="pf-tx" style="left:1385px;top:618px;font:400 12.0px/1 PFLato;color:#231f20">M</span><span class="pf-tx" style="left:1626px;top:618px;font:400 12.0px/1 PFLato;color:#231f20">2002-••-••</span></div><div class="pf-a" data-row="5" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:660px;font:400 12.0px/1 PFLato;color:#231f20">••••2046</span><span class="pf-tx" style="left:1121px;top:660px;font:400 12.0px/1 PFLato;color:#231f20">T. N•••••</span><span class="pf-tx" style="left:1385px;top:660px;font:400 12.0px/1 PFLato;color:#231f20">M</span><span class="pf-tx" style="left:1626px;top:660px;font:400 12.0px/1 PFLato;color:#231f20">1976-••-••</span></div><div class="pf-a" data-row="6" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:702px;font:400 12.0px/1 PFLato;color:#231f20">••••6583</span><span class="pf-tx" style="left:1121px;top:702px;font:400 12.0px/1 PFLato;color:#231f20">R. B•••</span><span class="pf-tx" style="left:1385px;top:702px;font:400 12.0px/1 PFLato;color:#231f20">F</span><span class="pf-tx" style="left:1626px;top:702px;font:400 12.0px/1 PFLato;color:#231f20">1948-••-••</span></div><div class="pf-a" data-row="7" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:744px;font:400 12.0px/1 PFLato;color:#231f20">••••3378</span><span class="pf-tx" style="left:1121px;top:744px;font:400 12.0px/1 PFLato;color:#231f20">L. H••••</span><span class="pf-tx" style="left:1385px;top:744px;font:400 12.0px/1 PFLato;color:#231f20">M</span><span class="pf-tx" style="left:1626px;top:744px;font:400 12.0px/1 PFLato;color:#231f20">1988-••-••</span></div><div class="pf-a" data-row="8" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:786px;font:400 12.0px/1 PFLato;color:#231f20">••••8125</span><span class="pf-tx" style="left:1121px;top:786px;font:400 12.0px/1 PFLato;color:#231f20">C. V•••</span><span class="pf-tx" style="left:1385px;top:786px;font:400 12.0px/1 PFLato;color:#231f20">F</span><span class="pf-tx" style="left:1626px;top:786px;font:400 12.0px/1 PFLato;color:#231f20">1963-••-••</span></div><div class="pf-a" data-row="9" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:828px;font:400 12.0px/1 PFLato;color:#231f20">••••0469</span><span class="pf-tx" style="left:1121px;top:828px;font:400 12.0px/1 PFLato;color:#231f20">E. W•••••</span><span class="pf-tx" style="left:1385px;top:828px;font:400 12.0px/1 PFLato;color:#231f20">F</span><span class="pf-tx" style="left:1626px;top:828px;font:400 12.0px/1 PFLato;color:#231f20">1995-••-••</span></div><div class="pf-a" data-row="10" style="inset:0;opacity:0"><span class="pf-tx" style="left:886px;top:870px;font:400 12.0px/1 PFLato;color:#231f20">••••7712</span><span class="pf-tx" style="left:1121px;top:870px;font:400 12.0px/1 PFLato;color:#231f20">K. M•••</span><span class="pf-tx" style="left:1385px;top:870px;font:400 12.0px/1 PFLato;color:#231f20">M</span><span class="pf-tx" style="left:1626px;top:870px;font:400 12.0px/1 PFLato;color:#231f20">1979-••-••</span></div><span class="pf-tx" style="left:1434px;top:116px;font:500 14.0px/1 PFLato;color:#838485;" >VIEW SELECTED DATA SOURCE (<span data-vs>0</span>)</span><div class="pf-a" data-cont style="left:1692px;top:104px;width:186px;height:36px;background:#111;opacity:0"><span class="pf-tx" style="left:14px;top:12px;font:700 14.0px/1 PFLato;color:#fff">CONTINUE TO PROFILE</span></div><span class="pf-tx" style="left:693px;top:868px;font:400 12.0px/1 PFLato;color:#838485;" >Reset</span><span class="pf-a" data-apb style="left:757px;top:857px;width:59px;height:32px;border:1px solid #838485;border-radius:3px;transition:border-color .3s,background .3s"></span><span class="pf-tx" style="left:771px;top:868px;font:400 12.0px/1 PFLato;color:#838485;transition:color .3s" data-apt>Apply</span>',
      sp: {
        copy: "data:image/webp;base64,UklGRqwAAABXRUJQVlA4TKAAAAAvFAAFAJegkI0kaAlKcI8/50qYads2pwKICeycgrZt2FQJzAj25p9s0mZP0t7x/wFEFqKcCsBc6wWAw0hy2wYAqayXgO+/W0GgQwMR/Z8A/mW4u48cKunildPApy9TZT6Zh0ah4YV2Z5hN1PpyJ0h2O/A8FBUD82MqhPDVreAVIV1izNFXjqntHFMWNV7QK9MWSfSjErPYU1bWAwCu4D8C",
        chk: "data:image/webp;base64,UklGRpgAAABXRUJQVlA4TIsAAAAvEUAEAHegmJEkODgERbDHfwnWTNu22RRAQ2DnriGYojZS4CgrgDHA+cUB8x+7myCIuxNEXZDEqAtSE/4fQYBNbe1NftrK1KuCaggrTQIGOJGAjqwYSCb6byLNQkT/JwA1MxAXHEH+VAruK5hRoCC1gtrC7pEahH6gtgSOGmS9rZCySsE3xYmRZEVNAA==",
        unchk:
          "data:image/webp;base64,UklGRnQAAABXRUJQVlA4TGgAAAAvEUAEAEegoG0bhj/g7i+loaBtG4Y/4O4vVdC2DcMfcPeXzn/YXlUAts0MgCQAAJjW1t7kS4/sGQHNCDgsDg0TdI/M3k0xQET/JwCdTy5XLIMtN34QlKP6akb/0EFrakq23AXeXM7oBA==",
      },
    },
    1: {
      img: "/images/home/final/product-film/plate-01.webp",
      html: '<div class="pf-a pf-logo" style="left:44px;top:33px;color:#111"><span class="pf-mark"></span>workspace</div><span class="pf-a" style="left:1840px;top:29px;width:33px;height:33px;border-radius:50%;display:grid;place-items:center;font:700 13px/1 PFLato;color:#234">JR</span><span class="pf-tx" style="left:44px;top:189px;font:700 16.0px/1 PFLato;color:#231f20;" >Care Network 360</span><span class="pf-tx" style="left:87px;top:439px;font:500 13.5px/1 PFLato;color:#231f20;" >claims_2024</span><span class="pf-tx" style="left:86px;top:460px;font:400 10.5px/1 PFLato;color:#838485;" >904,875 Records , 14 Fields</span><span class="pf-tx" style="left:85px;top:506px;font:500 14.0px/1 PFLato;color:#231f20;" >encounters.parquet</span><span class="pf-tx" style="left:86px;top:529px;font:400 10.5px/1 PFLato;color:#838485;" >10,000 Records , 10 Fields</span><span class="pf-tx" style="left:709px;top:257px;font:400 14.0px/1 PFLato;color:#231f20;" >ehr-lake</span><span class="pf-tx" style="left:767.5807800292969px;top:257px;font:400 14.0px/1 PFLato;color:#231f20;" >/</span><span class="pf-tx" style="left:785.9087524414062px;top:257px;font:700 14.0px/1 PFLato;color:#838485;" >encounters.parquet</span><img class="pf-a" src="data:image/webp;base64,UklGRqwAAABXRUJQVlA4TKAAAAAvFAAFAJegkI0kaAlKcI8/50qYads2pwKICeycgrZt2FQJzAj25p9s0mZP0t7x/wFEFqKcCsBc6wWAw0hy2wYAqayXgO+/W0GgQwMR/Z8A/mW4u48cKunildPApy9TZT6Zh0ah4YV2Z5hN1PpyJ0h2O/A8FBUD82MqhPDVreAVIV1izNFXjqntHFMWNV7QK9MWSfSjErPYU1bWAwCu4D8C" style="left:916px;top:252px"><span class="pf-tx" style="left:87px;top:643px;font:400 14.0px/1 PFLato;color:#231f20;" >Phone_Nbr</span><span class="pf-tx" style="left:87px;top:711px;font:400 14.0px/1 PFLato;color:#231f20;" >Patient_MRN</span><span class="pf-tx" style="left:87px;top:779px;font:400 14.0px/1 PFLato;color:#231f20;" >Pat_Full_Nm</span><span class="pf-tx" style="left:88px;top:847px;font:500 13.5px/1 PFLato;color:#231f20;" >Dob</span><div class="pf-a" style="left:0;top:900px;width:478px;height:29px;overflow:hidden"><span class="pf-tx" style="left:88px;top:16px;font:700 13.5px/1 PFLato;color:#231f20">Payer_Id</span></div><span class="pf-a" style="left:87px;top:729px;width:30px;height:19px;border-radius:9.5px;box-sizing:border-box;background:#231f20;border:1px solid #231f20;color:#fff;display:flex;align-items:center;justify-content:center;font:400 10.5px/1 PFLato;padding-bottom:1px;white-space:nowrap">mrn</span><span class="pf-a" style="left:123px;top:729px;width:45px;height:19px;border-radius:9.5px;box-sizing:border-box;background:transparent;border:1px solid #231f20;color:#231f20;display:flex;align-items:center;justify-content:center;font:400 10.5px/1 PFLato;padding-bottom:1px;white-space:nowrap">Patient</span><span class="pf-tx" style="left:499px;top:335px;font:700 20.0px/1 PFLato;color:#231f20;" data-n="326261">0</span><span class="pf-tx" style="left:683px;top:336px;font:700 19.5px/1 PFLato;color:#231f20;" data-p="36.06">0%</span><span class="pf-tx" style="left:865px;top:335px;font:700 20.0px/1 PFLato;color:#231f20;" data-n="67007">0</span><span class="pf-tx" style="left:1022px;top:335px;font:700 20.5px/1 PFLato;color:#231f20;" >String</span><div class="pf-a" data-tv="0" style="left:0;top:0;opacity:0"><img class="pf-a" src="data:image/webp;base64,UklGRoIBAABXRUJQVlA4THYBAAAvC4EIAJehsG3bRv3/3CTdrd5Q2LZto//fzeiuFLZt2+j/dzO6q/kP9XuP6t5Ldc4x57T3NteEiAwIQUQARYQ5p30OUEQCIcacQPdeAkQDfQ4I0H0Poo8Geu9DiDKSKCJkJb9UWUmFiAwIUUQARNu2zVbBzo2t2jhl8P9fV/ukD2NE9F+N2zYOU65MNx7yBOnfQSgqHhiqwp2HFqByBw+OBiQr6gtR9JjXr69ExrvimoJ39dX4PpnpudgA3OnIhDlKAITicSYFF+z1/ky3cBHu/M4GM2eUotvGw2T6lgvknbF3cxeRA9Qg4Y5swr0uFx8H45RJxgHgDNtIZuSR8RDB+LTYsYxwIlyOACGWfmtkPsBKGx+LHXZFVG58AWBvAN12mFrzew+neShuCBfAsS0imIWATZj7gh5yvdrWnBhtKvK94oy1o30KkwxYtPS5/uOJ217QpP7++TV95mcFg+LiPm8WM6Qv3Tc9c5bVh5Ys/RENrUmEBg==" style="left:514px;top:461px"><span class="pf-tx" style="left:548px;top:474px;font:500 10.5px/1 PFLato;color:#231f20">48213•••••</span></div><div class="pf-a" data-tv="1" style="left:0;top:0;opacity:0"><img class="pf-a" src="data:image/webp;base64,UklGRoIBAABXRUJQVlA4THYBAAAvC4EIAJehsG3bRv3/3CTdrd5Q2LZto//fzeiuFLZt2+j/dzO6q/kP9XuP6t5Ldc4x57T3NteEiAwIQUQARYQ5p30OUEQCIcacQPdeAkQDfQ4I0H0Poo8Geu9DiDKSKCJkJb9UWUmFiAwIUUQARNu2zVbBzo2t2jhl8P9fV/ukD2NE9F+N2zYOU65MNx7yBOnfQSgqHhiqwp2HFqByBw+OBiQr6gtR9JjXr69ExrvimoJ39dX4PpnpudgA3OnIhDlKAITicSYFF+z1/ky3cBHu/M4GM2eUotvGw2T6lgvknbF3cxeRA9Qg4Y5Mwr0uFx8H45RJxgHgDNtIZuSR8RDB+LTYsYxwIlyOACGWfmtkPsBKGx+LHXZFVG58AWBvAN12mFrzew+neShuCBfAsS0imIWATZj7gh5yvdrWnBhtKvK94oy1o30KkwxYtPS5/uOJ217QpP7++TV95mcFg+LiPm8WM6Qv3Tc9c5bVh5Ys/RENrUmEBg==" style="left:514px;top:496px"><span class="pf-tx" style="left:548px;top:509px;font:500 10.5px/1 PFLato;color:#231f20">55190•••••</span></div><div class="pf-a" data-tv="2" style="left:0;top:0;opacity:0"><img class="pf-a" src="data:image/webp;base64,UklGRoYBAABXRUJQVlA4THoBAAAvC4EIAJ+hoG0jJ8+f7d3vFRoK27Zt9P+7Gd2VwrZtG/3/bkZ3Nf+hfu9R3XupzjnmnPbe5lpAiMyAEGQEUEaICKA5p3MuEGLMCXTvJUAU0OeAAN33IPpooPc+hKhGEmWEWskvVa2kQmQGhCgjAKJt20oqYtMNdrcek/j/n+thHnwxRkT/1bht4zDlynTjIU8Q/h2EJOOBIUvceWgBMnfw4GhB+nFWE/GUebOsIfq8i5vEvMsa4/tk9qo6BuBulibMZQAgUB9nHXPBPt0qJrGL4OqPz9g6yx4mIzxMX7twgfwK+7pzETpABlLdpUm4V33xcTDKTDJygLMYobslj4yHiFblYschRElwWAKquvWHS/MBjsqqKHbYKVFy9lUANwOYjIKet7v3UM68uKG6AIq2D2HGKkzCzlfpIdfHS8aJ5Tkl34srrCvdejDJgEUHn+s/nopq6HVvaVN//0GTGfOzgnlcux+0ixnSl+6bnjmL8kNLFP6IhtImQgE=" style="left:514px;top:531px"><span class="pf-tx" style="left:548px;top:544px;font:500 10.5px/1 PFLato;color:#231f20">60327•••••</span></div><div class="pf-a" data-tv="3" style="left:0;top:0;opacity:0"><img class="pf-a" src="data:image/webp;base64,UklGRooBAABXRUJQVlA4TH4BAAAvC4EIAJ+hoG0jJ8+f7d3vFRoK27Zt9P+7Gd2VwrZtG/3/bkZ3Nf+hfu9R3XupzjnmnPbe5lpAiMyAEGQEUEaICKA5p3MuEGLMCXTvJUAU0OeAAN33IPpooPc+hKhGEmWEWskvVa2kQmQGhCgjAKJt20oqY3Olsbtojkn8/8+VrQdfjBHRfzZuGzmi15eqKzf8oPHvIK02Hph2kzsPLdDmDh6cGmQSZxcSr5i3zq5kwrv4mph32dV8n9Rx1VABTM9Wodo9AD3xOG7MBX1/rljGJnqn7uIA37DHWM7xMJPOkQvUrdBPgYm+AWQgmLZKuNfl8vGilKmk5ABja2Pkk0XKQwycctkR9VHSi2xACL87s9UH2ElOUXboKVFy6AoAZwVYzntjK7j3pTzyckOYkGU56oqwDzUWUAlBV9BDPu+OGSfsQ0pdKwZQvGgnOo+hkgKNoi7XczyBauRL/1Kn5v7Ta9bM7xVs4ovP63qxh/Sl+6b3nJuPPov4IxqpTkQC" style="left:514px;top:566px"><span class="pf-tx" style="left:548px;top:579px;font:500 10.5px/1 PFLato;color:#231f20">61884•••••</span></div><div class="pf-a" data-tv="4" style="left:0;top:0;opacity:0"><img class="pf-a" src="data:image/webp;base64,UklGRowBAABXRUJQVlA4TIABAAAvC4EIAJ+hoG0jJ/zh3t3vERoK27Zt1P/PTdLdSmHbto3+fzeju5r/UL/3nHOozjnmnPbe5lpAiMyAEGQEUEaICKA5p3MuEGLMCXTvhRDQMMaAAN33IPpooPc+hKgiiTJCVfJLhKhKKkRmQIgyAiBIkqS48W3fkk5HYmYY8Vr7/9eJcYwREf2fgI9/BwOBOxYBdwTuWnAHd/4FUnP+TNdhXtdfWOOdu8Txzl/8/WSrp8oGiMcDCzvIAGTyfkaOC9Fyd6LpYmTbtLXGJB5U0WzjbmpqwwVKT0TbaYy8CHgQ4oFd4W5qauO5AHPMkpnGAIr9ASoTSsjcRWnofU1tPDvmOY5k8wEg5SRtDOwdLMJhTW08O6I90ec6lQB2Bmi2s2oyvQO/CNXGc0PG0FrPUznLYZ2EJUxTSffgFxvPicF6T2niAGAao7ClXRWWDAo0T+/iXBYclwdHNU5L3Mhd4hhx8+vUL+nyLuy5c1w35B0nfy6I+xLcCcQ9iYA7f2eGX4o=" style="left:514px;top:601px"><span class="pf-tx" style="left:548px;top:614px;font:500 10.5px/1 PFLato;color:#231f20">70413•••••</span></div><div class="pf-a" data-tv="5" style="left:0;top:0;opacity:0"><img class="pf-a" src="data:image/webp;base64,UklGRo4BAABXRUJQVlA4TIEBAAAvC4EIAJ+hoG0jJ/zh3t3vERoK27Zt1P/PTdLdSmHbto3+fzeju5r/UL/3nHOozjnmnPbe5lpAiMyAEGQEUEaICKA5p3MuEGLMCXTvhRDQMMaAAN33IPpooPc+hKgiiTJCVfJLhKhKKkRmQIgyAiBIkqS48W3fkk5HYmYY8Vr7/9eJcYwREf2fgI9/BwOBOxYBdwTuWnAHd/4FUnP+TNdhXtdfWOOdu8Txzl/8/WSrp8oGiMcDCzvIAGTyfkaOC9Fyd6LpYmTbtLXGJB5U0WzjbmpqwwVKT0TbaYy8CHgQ4oFd4W5qauO5AHPMkpnGAIr9ASoTSsjcRWnofU1tPDvmOY5kNACknGSNgb2DRTisqY1nR7Qn+lynEsDOAM12Vk2md+AXodp4bsgYWut5Kmc5rJOwK0xTSffgFxvPicF6T2niAGAao7ClXRWWDAo0T+/iXBYclwdHNU5KiRu5Sxwjbn6d+iVd3oU9d47rhrzj5M8FcV+CO4G4JxFw5+/M8EsRAA==" style="left:514px;top:636px"><span class="pf-tx" style="left:548px;top:649px;font:500 10.5px/1 PFLato;color:#231f20">73095•••••</span></div><div class="pf-a" data-tv="6" style="left:0;top:0;opacity:0"><img class="pf-a" src="data:image/webp;base64,UklGRooBAABXRUJQVlA4TH4BAAAvC4EIAJehoG0jJ/zh3t3vERoK27Zt1P/PTdLdSmHbto3+fzeju5r/UL/3nHOozjnmnPbe5lpAiMyAEGQEUEaICKA5p3MuEGLM6d4DIaBhjAEBuu9B9NFA730IUUUSZYSq5JcIUZVUiMyAEGUEQJAkSXGj274lnY/EfOIRr7X//50YxxgR0f8JKP07GAjcsQi4I3DXgju48y+QhvNnui7zev7CBu/cJY53/uLvJ1s/VTVAPC4sbJEByOT9jBwXouXuRMvFyLZpmzCJizpaHdxNQ224QOmJaDuNkSeAByEu7Ap301AbzwWYY5bMNAbwMShQm1BC5i4qQ+8bauPZMc9xJKMCkHKSNQt7B4tw2FAbz45oT/S5TiWAnQFanayeTO/AL0K18eyIobWep3KWwzoJu8I0lXQPfrHxnCjWe0oTBwDTGOUt7eqwZFAmSu/iXBYclwdHNU5KiRu5Sxwjbn6d/iU93oV9d47rhbzj5M8FcV+CO4G4JxFw5+/M8EsR" style="left:514px;top:671px"><span class="pf-tx" style="left:548px;top:684px;font:500 10.5px/1 PFLato;color:#231f20">78120•••••</span></div><span class="pf-tx" style="left:1509px;top:497px;font:700 12.0px/1 PFLato;color:#231f20;" >MRN_Epic</span><span class="pf-tx" style="left:1509px;top:519px;font:400 12.0px/1 PFLato;color:#838485;" >encounters</span><span class="pf-tx" style="left:1816px;top:501px;font:600 10.5px/1 PFLato;color:#231f20;" >92%</span><span class="pf-tx" style="left:1509px;top:561px;font:700 12.0px/1 PFLato;color:#231f20;" >MRN_Claims</span><span class="pf-tx" style="left:1509px;top:583px;font:400 12.0px/1 PFLato;color:#838485;" >claims_2024</span><span class="pf-tx" style="left:1816px;top:565px;font:600 10.5px/1 PFLato;color:#231f20;" >88%</span><span class="pf-tx" style="left:1509px;top:625px;font:700 12.0px/1 PFLato;color:#231f20;" >MRN_Rx</span><span class="pf-tx" style="left:1509px;top:647px;font:400 12.0px/1 PFLato;color:#838485;" >rx_fills</span><span class="pf-tx" style="left:1816px;top:629px;font:600 10.5px/1 PFLato;color:#231f20;" >74%</span><span class="pf-tx" style="left:1509px;top:689px;font:700 12.0px/1 PFLato;color:#231f20;" >MRN_Lab</span><span class="pf-tx" style="left:1509px;top:711px;font:400 12.0px/1 PFLato;color:#838485;" >lab_results</span><span class="pf-tx" style="left:1816px;top:693px;font:600 10.5px/1 PFLato;color:#231f20;" >61%</span><span class="pf-tx" style="left:1509px;top:753px;font:700 12.0px/1 PFLato;color:#231f20;" >MRN_Ref</span><span class="pf-tx" style="left:1509px;top:775px;font:400 12.0px/1 PFLato;color:#838485;" >referrals</span><span class="pf-tx" style="left:1816px;top:757px;font:600 10.5px/1 PFLato;color:#231f20;" >43%</span><img class="pf-a" data-uc="0" src="data:image/webp;base64,UklGRoAAAABXRUJQVlA4THMAAAAvEUAEAF9AFmCaHMEU+iOIICIByCwDOCFZ4ADDANRmC6Bj6JvBBDb/kbSGxv+AQVEBrB0oCtsB09ram8RH9oQJYBUUI6DZAssWyN7rN16KYoCI/k8AIhVxC+R152Z38sFtVurrlx9KXt9atZ2bHmDELREJAA==" style="left:1484px;top:493px"><img class="pf-a" data-uc="1" src="data:image/webp;base64,UklGRoAAAABXRUJQVlA4THMAAAAvEUAEAF9AFmCaHMEU+iOIICIByCwDOCFZ4ADDANRmC6Bj6JvBBDb/kbSGxv+AQVEBrB0oCtsB09ram8RH9oQJYBUUI6DZAssWyN7rN16KYoCI/k8AIhVxC+R152Z38sFtVurrlx9KXt9atZ2bHmDELREJAA==" style="left:1484px;top:557px">',
      sp: {
        copy: "data:image/webp;base64,UklGRqwAAABXRUJQVlA4TKAAAAAvFAAFAJegkI0kaAlKcI8/50qYads2pwKICeycgrZt2FQJzAj25p9s0mZP0t7x/wFEFqKcCsBc6wWAw0hy2wYAqayXgO+/W0GgQwMR/Z8A/mW4u48cKunildPApy9TZT6Zh0ah4YV2Z5hN1PpyJ0h2O/A8FBUD82MqhPDVreAVIV1izNFXjqntHFMWNV7QK9MWSfSjErPYU1bWAwCu4D8C",
        chk: "data:image/webp;base64,UklGRpgAAABXRUJQVlA4TIsAAAAvEUAEAHegmJEkODgERbDHfwnWTNu22RRAQ2DnriGYojZS4CgrgDHA+cUB8x+7myCIuxNEXZDEqAtSE/4fQYBNbe1NftrK1KuCaggrTQIGOJGAjqwYSCb6byLNQkT/JwA1MxAXHEH+VAruK5hRoCC1gtrC7pEahH6gtgSOGmS9rZCySsE3xYmRZEVNAA==",
        unchk:
          "data:image/webp;base64,UklGRoAAAABXRUJQVlA4THMAAAAvEUAEAF9AFmCaHMEU+iOIICIByCwDOCFZ4ADDANRmC6Bj6JvBBDb/kbSGxv+AQVEBrB0oCtsB09ram8RH9oQJYBUUI6DZAssWyN7rN16KYoCI/k8AIhVxC+R152Z38sFtVurrlx9KXt9atZ2bHmDELREJAA==",
      },
    },
    2: {
      img: "/images/home/final/product-film/plate-02.webp",
      html: '<div class="pf-a pf-logo" style="left:44px;top:33px;color:#111"><span class="pf-mark"></span>workspace</div><span class="pf-a" style="left:1840px;top:29px;width:33px;height:33px;border-radius:50%;display:grid;place-items:center;font:700 13px/1 PFLato;color:#234">JR</span><span class="pf-tx" style="left:44px;top:189px;font:700 16.0px/1 PFLato;color:#231f20;" >Care Network 360</span><span class="pf-tx" style="left:59px;top:239px;font:500 10.0px/1 PFLato;color:#838485;" >Profile Data Selected (1 of 3)</span><span class="pf-tx" style="left:59px;top:256px;font:500 13.5px/1 PFLato;color:#231f20;" >encounters.parquet</span><span class="pf-tx" style="left:81px;top:432px;font:400 14.0px/1 PFLato;color:#231f20;" >address</span><span class="pf-tx" style="left:388.9px;top:432px;font:500 14.0px/1 PFLato;color:#231f20;" >Addr_Ln1</span><span class="pf-tx" style="left:81px;top:482px;font:400 14.0px/1 PFLato;color:#231f20;" >payer</span><span class="pf-tx" style="left:396.0px;top:482px;font:500 14.0px/1 PFLato;color:#231f20;" >Payer_Id</span><span class="pf-tx" style="left:81px;top:532px;font:400 14.0px/1 PFLato;color:#231f20;" >city</span><span class="pf-tx" style="left:406.1px;top:532px;font:500 14.0px/1 PFLato;color:#231f20;" >Ct_Nm</span><span class="pf-tx" style="left:81px;top:632px;font:400 14.0px/1 PFLato;color:#231f20;" >patient</span><span class="pf-tx" style="left:371.7px;top:632px;font:500 14.0px/1 PFLato;color:#231f20;" >Pat_Full_Nm</span><span class="pf-tx" style="left:81px;top:682px;font:400 14.0px/1 PFLato;color:#231f20;" >gender</span><span class="pf-tx" style="left:394.5px;top:682px;font:500 14.0px/1 PFLato;color:#231f20;" >Gndr_Cd</span><span class="pf-tx" style="left:81px;top:732px;font:400 14.0px/1 PFLato;color:#231f20;" >mrn</span><span class="pf-tx" style="left:365.7px;top:732px;font:500 14.0px/1 PFLato;color:#231f20;" >Patient_MRN</span><span class="pf-tx" style="left:81px;top:782px;font:400 14.0px/1 PFLato;color:#231f20;" >name</span><span class="pf-tx" style="left:371.7px;top:782px;font:500 14.0px/1 PFLato;color:#231f20;" >Pat_Full_Nm</span><span class="pf-tx" style="left:85px;top:832px;font:700 14.0px/1 PFLato;color:#231f20;" >phone</span><span class="pf-tx" style="left:379.9px;top:832px;font:400 14.0px/1 PFLato;color:#231f20;" >Phone_Nbr</span><span class="pf-tx" style="left:746px;top:442px;font:500 11.5px/1 PFLato;color:#231f20;" data-raw="0">1-312-•••-1212</span><span class="pf-tx" style="left:1067px;top:441px;font:400 12.0px/1 PFLato;color:#231f20;opacity:0" data-cl="0" >+1312•••1212</span><span class="pf-tx" style="left:746px;top:484px;font:500 11.5px/1 PFLato;color:#231f20;" data-raw="1">415-•••-8989</span><span class="pf-tx" style="left:1067px;top:483px;font:400 12.0px/1 PFLato;color:#231f20;opacity:0" data-cl="1" >+1415•••8989</span><span class="pf-tx" style="left:746px;top:526px;font:500 11.5px/1 PFLato;color:#231f20;" data-raw="2">(773) •••-0457</span><span class="pf-tx" style="left:1067px;top:525px;font:400 12.0px/1 PFLato;color:#231f20;opacity:0" data-cl="2" >+1773•••0457</span><span class="pf-tx" style="left:746px;top:568px;font:500 11.5px/1 PFLato;color:#231f20;" data-raw="3">312.•••.6620</span><span class="pf-tx" style="left:1067px;top:567px;font:400 12.0px/1 PFLato;color:#231f20;opacity:0" data-cl="3" >+1312•••6620</span><span class="pf-tx" style="left:746px;top:610px;font:500 11.5px/1 PFLato;color:#231f20;" data-raw="4">1-646-•••-3015</span><span class="pf-tx" style="left:1067px;top:609px;font:400 12.0px/1 PFLato;color:#231f20;opacity:0" data-cl="4" >+1646•••3015</span><span class="pf-tx" style="left:746px;top:652px;font:500 11.5px/1 PFLato;color:#231f20;" data-raw="5">(415) •••-7741</span><span class="pf-tx" style="left:1067px;top:651px;font:400 12.0px/1 PFLato;color:#231f20;opacity:0" data-cl="5" >+1415•••7741</span><span class="pf-tx" style="left:746px;top:694px;font:500 11.5px/1 PFLato;color:#231f20;" data-raw="6">1-312-•••-121222222</span><span class="pf-tx" style="left:1067px;top:693px;font:400 12.0px/1 PFLato;color:#231f20;opacity:0" data-cl="6" >null</span><span class="pf-tx" style="left:895px;top:300px;font:400 14.0px/1 PFLato;color:#231f20;" >Parses and validates a phone number for the given region, outputting a normalized E.164 value.</span><span class="pf-tx" style="left:1775px;top:486px;font:400 12.0px/1 PFLato;color:#838485;transition:color .3s" data-test>TEST</span><span class="pf-tx" style="left:1511px;top:452px;font:400 12.0px/1 PFLato;color:#231f20;" data-ti></span><span class="pf-tx" style="left:1511px;top:571px;font:400 12.0px/1 PFLato;color:#838485;opacity:0" data-to>+9198801•••78</span>',
      sp: {},
    },
    3: {
      img: "/images/home/final/product-film/plate-03.webp",
      html: '<div class="pf-a pf-logo" style="left:44px;top:33px;color:#111"><span class="pf-mark"></span>workspace</div><span class="pf-a" style="left:1840px;top:29px;width:33px;height:33px;border-radius:50%;display:grid;place-items:center;font:700 13px/1 PFLato;color:#234">JR</span><span class="pf-tx" style="left:44px;top:189px;font:700 16.0px/1 PFLato;color:#231f20;" >Care Network 360</span><div data-chips><span class="pf-a" data-chip style="left:420px;top:349px;width:108px;height:24px;border:1px solid #231f20;border-radius:12px;display:grid;place-items:center;font:400 10.5px/1 PFLato;color:#231f20">ehr_encounters</span><span class="pf-a" data-chip style="left:539px;top:349px;width:94px;height:24px;border:1px solid #231f20;border-radius:12px;display:grid;place-items:center;font:400 10.5px/1 PFLato;color:#231f20">claims_2024</span><span class="pf-a" data-chip style="left:644px;top:349px;width:65px;height:24px;border:1px solid #231f20;border-radius:12px;display:grid;place-items:center;font:400 10.5px/1 PFLato;color:#231f20">rx_fills</span><img class="pf-a" data-chip src="data:image/webp;base64,UklGRuIAAABXRUJQVlA4TNUAAAAvEUAEAO+gqG0jKf1PBsDsxR/nkjDTtm0w+RcA2ztFbRvJuebfEJg9578M739TAIYjDEcRJlNAVSEAGLOjEwbACtDJBLD6b90Ch5FtNdUTLmYf/hzg9F+oqYWI/k8Aux+XWbu8OCy9Rc95SKay8wvxwe4jNV+ghFQ5rKkpoFQB5htAjT0ve7DVtOFhLIlzRLrhyoRlGCRZkLRA3rm7e0zuvm40sauJ3ZGpuSLe9jz3NOibshlum6IENapwWBQr8I967j1D/LOtyTTk7MH6yuFr6szkHwAA" style="left:720px;top:353px"></div><div class="pf-a" data-tok="0-0" style="left:0;top:0;width:1920px;height:992px;transform-origin:518.5px 476px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcFLbtmrt914h9hyAIQB7/J6bvJPzq/35q4j+TwDeUMNiVgE3p46AhCtXkJJpz6xZ2XapuSaRkesocuNqRA5c+S412dTnZHf/0WIyFTqXA8C0mBU8fw==" style="left:470px;top:458px"><span class="pf-tx" style="left:492.8px;top:472px;font:700 11.5px/1 PFLato;color:#000000">last_name</span></div><div class="pf-a" data-tok="0-1" style="left:0;top:0;width:1920px;height:992px;transform-origin:648.5px 476px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcFLbtmrt914h9hyAIQB7/J6bvJPzq/35q4j+TwDeUMNiVgE3p46AhCtXkJJpz6xZ2XapuSaRkesocuNqRA5c+S412dTnZHf/0WIyFTqXA8C0mBU8fw==" style="left:600px;top:458px"><span class="pf-tx" style="left:638.7px;top:472px;font:700 11.5px/1 PFLato;color:#000000">dob</span></div><div class="pf-a" data-tok="0-2" style="left:0;top:0;width:1920px;height:992px;transform-origin:779px 476px"><img class="pf-a" src="data:image/webp;base64,UklGRrAAAABXRUJQVlA4TKQAAAAvX8AIAKegpm0kKfxBbrcItvruQsMwG0njz3UAh3EA874xyDaSP9AbvMkT3AF85z9Mw/j/jP/PMNoAxgLaAnJXzGgDqDtAGwpGkiQpwd3h/5/dPRauzUb0X5Hbto2UdPe43uBtIf0wgupkZ5JiTQJDkoKNDT/apSZvvhJNPU76HJl+ktSSmSzJtIaOPjxU6G1F82X8c3elJkb/G/H/XvH/7SugAA==" style="left:731px;top:458px"><span class="pf-tx" style="left:771.6px;top:472px;font:700 11.5px/1 PFLato;color:#000000">zip</span></div><div class="pf-a" data-tok="0-3" style="left:0;top:0;width:1920px;height:992px;transform-origin:909.5px 476px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcBNJtmrtAwGcc85KWNF7ClgA/GPzZ/v5RxH9nwC8n0bOHAKoG2odXsPtIiErn9rQkU2yk50iLdcl0nMdIh3XJHvD1Ywt2/0/mkEWAxWXBng5s40XCA==" style="left:862px;top:458px"><span class="pf-tx" style="left:891.7px;top:472px;font:700 11.5px/1 PFLato;color:#000000">gender</span></div><div class="pf-a" data-tok="0-4" style="left:0;top:0;width:1920px;height:992px;transform-origin:1040px 476px"><img class="pf-a" src="data:image/webp;base64,UklGRrAAAABXRUJQVlA4TKQAAAAvX8AIAKegpm0kKfxBbrcItvruQsMwG0njz3UAh3EA874xyDaSP9AbvMkT3AF85z9Mw/j/jP/PMNoAxgLaAnJXzGgDqDtAGwpGkiQpwd3h/5/dPRauzUb0X5Hbto2UdPe43uBtIf0wgupkZ5JiTQJDkoKNDT/apSZvvhJNPU76HJl+ktSSmSzJtIaOPjxU6G1F82X8c3elJkb/G/H/XvH/7SugAA==" style="left:992px;top:458px"><span class="pf-tx" style="left:1023.9px;top:472px;font:700 11.5px/1 PFLato;color:#000000">phone</span></div><div class="pf-a" data-tok="0-5" style="left:0;top:0;width:1920px;height:992px;transform-origin:1170px 476px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcFLbtmrt914h9hyAIQB7/J6bvJPzq/35q4j+TwDeUMNiVgE3p46AhCtXkJJpz6xZ2XapuSaRkesocuNqRA5c+S412dTnZHf/0WIyFTqXA8C0mBU8fw==" style="left:1122px;top:458px"><span class="pf-tx" style="left:1159.8px;top:472px;font:700 11.5px/1 PFLato;color:#000000">mrn</span></div><div class="pf-a" data-tok="1-0" style="left:0;top:0;width:1920px;height:992px;transform-origin:518.5px 551px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcFLbtmrt914h9hyAIQB7/J6bvJPzq/35q4j+TwDeUMNiVgE3p46AhCtXkJJpz6xZ2XapuSaRkesocuNqRA5c+S412dTnZHf/0WIyFTqXA8C0mBU8fw==" style="left:470px;top:533px"><span class="pf-tx" style="left:492.8px;top:547px;font:700 11.5px/1 PFLato;color:#000000">last_name</span></div><div class="pf-a" data-tok="1-1" style="left:0;top:0;width:1920px;height:992px;transform-origin:648.5px 551px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcFLbtmrt914h9hyAIQB7/J6bvJPzq/35q4j+TwDeUMNiVgE3p46AhCtXkJJpz6xZ2XapuSaRkesocuNqRA5c+S412dTnZHf/0WIyFTqXA8C0mBU8fw==" style="left:600px;top:533px"><span class="pf-tx" style="left:638.7px;top:547px;font:700 11.5px/1 PFLato;color:#000000">dob</span></div><div class="pf-a" data-tok="1-2" style="left:0;top:0;width:1920px;height:992px;transform-origin:779px 551px"><img class="pf-a" src="data:image/webp;base64,UklGRrAAAABXRUJQVlA4TKQAAAAvX8AIAKegpm0kKfxBbrcItvruQsMwG0njz3UAh3EA874xyDaSP9AbvMkT3AF85z9Mw/j/jP/PMNoAxgLaAnJXzGgDqDtAGwpGkiQpwd3h/5/dPRauzUb0X5Hbto2UdPe43uBtIf0wgupkZ5JiTQJDkoKNDT/apSZvvhJNPU76HJl+ktSSmSzJtIaOPjxU6G1F82X8c3elJkb/G/H/XvH/7SugAA==" style="left:731px;top:533px"><span class="pf-tx" style="left:771.6px;top:547px;font:700 11.5px/1 PFLato;color:#000000">zip</span></div><div class="pf-a" data-tok="1-3" style="left:0;top:0;width:1920px;height:992px;transform-origin:909.5px 551px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcBNJtmrtAwGcc85KWNF7ClgA/GPzZ/v5RxH9nwC8n0bOHAKoG2odXsPtIiErn9rQkU2yk50iLdcl0nMdIh3XJHvD1Ywt2/0/mkEWAxWXBng5s40XCA==" style="left:862px;top:533px"><span class="pf-tx" style="left:891.7px;top:547px;font:700 11.5px/1 PFLato;color:#000000">gender</span></div><div class="pf-a" data-tok="1-4" style="left:0;top:0;width:1920px;height:992px;transform-origin:1040px 551px"><img class="pf-a" src="data:image/webp;base64,UklGRrAAAABXRUJQVlA4TKQAAAAvX8AIAKegpm0kKfxBbrcItvruQsMwG0njz3UAh3EA874xyDaSP9AbvMkT3AF85z9Mw/j/jP/PMNoAxgLaAnJXzGgDqDtAGwpGkiQpwd3h/5/dPRauzUb0X5Hbto2UdPe43uBtIf0wgupkZ5JiTQJDkoKNDT/apSZvvhJNPU76HJl+ktSSmSzJtIaOPjxU6G1F82X8c3elJkb/G/H/XvH/7SugAA==" style="left:992px;top:533px"><span class="pf-tx" style="left:1023.9px;top:547px;font:700 11.5px/1 PFLato;color:#000000">phone</span></div><div class="pf-a" data-tok="1-5" style="left:0;top:0;width:1920px;height:992px;transform-origin:1170px 551px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcFLbtmrt914h9hyAIQB7/J6bvJPzq/35q4j+TwDeUMNiVgE3p46AhCtXkJJpz6xZ2XapuSaRkesocuNqRA5c+S412dTnZHf/0WIyFTqXA8C0mBU8fw==" style="left:1122px;top:533px"><span class="pf-tx" style="left:1159.8px;top:547px;font:700 11.5px/1 PFLato;color:#000000">mrn</span></div><div class="pf-a" data-tok="2-0" style="left:0;top:0;width:1920px;height:992px;transform-origin:518.5px 626px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcFLbtmrt914h9hyAIQB7/J6bvJPzq/35q4j+TwDeUMNiVgE3p46AhCtXkJJpz6xZ2XapuSaRkesocuNqRA5c+S412dTnZHf/0WIyFTqXA8C0mBU8fw==" style="left:470px;top:608px"><span class="pf-tx" style="left:492.8px;top:622px;font:700 11.5px/1 PFLato;color:#000000">last_name</span></div><div class="pf-a" data-tok="2-1" style="left:0;top:0;width:1920px;height:992px;transform-origin:648.5px 626px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcFLbtmrt914h9hyAIQB7/J6bvJPzq/35q4j+TwDeUMNiVgE3p46AhCtXkJJpz6xZ2XapuSaRkesocuNqRA5c+S412dTnZHf/0WIyFTqXA8C0mBU8fw==" style="left:600px;top:608px"><span class="pf-tx" style="left:638.7px;top:622px;font:700 11.5px/1 PFLato;color:#000000">dob</span></div><div class="pf-a" data-tok="2-2" style="left:0;top:0;width:1920px;height:992px;transform-origin:779px 626px"><img class="pf-a" src="data:image/webp;base64,UklGRrAAAABXRUJQVlA4TKQAAAAvX8AIAKegpm0kKfxBbrcItvruQsMwG0njz3UAh3EA874xyDaSP9AbvMkT3AF85z9Mw/j/jP/PMNoAxgLaAnJXzGgDqDtAGwpGkiQpwd3h/5/dPRauzUb0X5Hbto2UdPe43uBtIf0wgupkZ5JiTQJDkoKNDT/apSZvvhJNPU76HJl+ktSSmSzJtIaOPjxU6G1F82X8c3elJkb/G/H/XvH/7SugAA==" style="left:731px;top:608px"><span class="pf-tx" style="left:771.6px;top:622px;font:700 11.5px/1 PFLato;color:#000000">zip</span></div><div class="pf-a" data-tok="2-3" style="left:0;top:0;width:1920px;height:992px;transform-origin:909.5px 626px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcBNJtmrtAwGcc85KWNF7ClgA/GPzZ/v5RxH9nwC8n0bOHAKoG2odXsPtIiErn9rQkU2yk50iLdcl0nMdIh3XJHvD1Ywt2/0/mkEWAxWXBng5s40XCA==" style="left:862px;top:608px"><span class="pf-tx" style="left:891.7px;top:622px;font:700 11.5px/1 PFLato;color:#000000">gender</span></div><div class="pf-a" data-tok="2-4" style="left:0;top:0;width:1920px;height:992px;transform-origin:1040px 626px"><img class="pf-a" src="data:image/webp;base64,UklGRrAAAABXRUJQVlA4TKQAAAAvX8AIAKegpm0kKfxBbrcItvruQsMwG0njz3UAh3EA874xyDaSP9AbvMkT3AF85z9Mw/j/jP/PMNoAxgLaAnJXzGgDqDtAGwpGkiQpwd3h/5/dPRauzUb0X5Hbto2UdPe43uBtIf0wgupkZ5JiTQJDkoKNDT/apSZvvhJNPU76HJl+ktSSmSzJtIaOPjxU6G1F82X8c3elJkb/G/H/XvH/7SugAA==" style="left:992px;top:608px"><span class="pf-tx" style="left:1023.9px;top:622px;font:700 11.5px/1 PFLato;color:#000000">phone</span></div><div class="pf-a" data-tok="2-5" style="left:0;top:0;width:1920px;height:992px;transform-origin:1170px 626px"><img class="pf-a" src="data:image/webp;base64,UklGRp4AAABXRUJQVlA4TJIAAAAvX8AIAFegJAAapn9CEuBwKHZrGAagxt8ojAACCGDfdQYBpvEHiSSEDDI4wNv8x8PbPLjNg/1HW+4o4RYkcFLbtmrt914h9hyAIQB7/J6bvJPzq/35q4j+TwDeUMNiVgE3p46AhCtXkJJpz6xZ2XapuSaRkesocuNqRA5c+S412dTnZHf/0WIyFTqXA8C0mBU8fw==" style="left:1122px;top:608px"><span class="pf-tx" style="left:1159.8px;top:622px;font:700 11.5px/1 PFLato;color:#000000">mrn</span></div><span class="pf-tx" style="left:1414.8px;top:389px;font:500 11.5px/1 PFLato;color:#000000;" data-sh="0">suffix</span><span class="pf-tx" style="left:1417.8px;top:431px;font:500 11.5px/1 PFLato;color:#000000;" data-sh="1">dob</span><span class="pf-tx" style="left:1649.1px;top:452px;font:500 12.0px/1 PFLato;color:#000000;" >last_name</span><span class="pf-tx" style="left:1668.0px;top:572px;font:500 12.0px/1 PFLato;color:#000000;" >zip</span><span class="pf-tx" style="left:1665.0px;top:692px;font:500 12.0px/1 PFLato;color:#000000;" >dob</span><span class="pf-tx" style="left:1665.8px;top:731px;font:500 12.0px/1 PFLato;color:#000000;" >mrn</span><span class="pf-tx" style="left:1661.4px;top:772px;font:500 12.0px/1 PFLato;color:#000000;" >payer</span><span class="pf-tx" style="left:1382.0px;top:815px;font:400 10.5px/1 PFLato;color:#838485;" >constraints within the entity ID(s) to</span>',
      sp: {
        plus: "data:image/webp;base64,UklGRuIAAABXRUJQVlA4TNUAAAAvEUAEAO+gqG0jKf1PBsDsxR/nkjDTtm0w+RcA2ztFbRvJuebfEJg9578M739TAIYjDEcRJlNAVSEAGLOjEwbACtDJBLD6b90Ch5FtNdUTLmYf/hzg9F+oqYWI/k8Aux+XWbu8OCy9Rc95SKay8wvxwe4jNV+ghFQ5rKkpoFQB5htAjT0ve7DVtOFhLIlzRLrhyoRlGCRZkLRA3rm7e0zuvm40sauJ3ZGpuSLe9jz3NOibshlum6IENapwWBQr8I967j1D/LOtyTTk7MH6yuFr6szkHwAA",
      },
    },
    4: {
      img: "/images/home/final/product-film/plate-04.webp",
      html: '<div class="pf-a pf-logo" style="left:44px;top:33px;color:#111"><span class="pf-mark"></span>workspace</div><span class="pf-a" style="left:1840px;top:29px;width:33px;height:33px;border-radius:50%;display:grid;place-items:center;font:700 13px/1 PFLato;color:#234">JR</span><span class="pf-tx" style="left:44px;top:189px;font:700 16.0px/1 PFLato;color:#231f20;" >Care Network 360</span><span class="pf-a" data-hl style="left:64px;top:355px;width:148px;height:17px;background:#CEE7FF"></span><span class="pf-tx" style="left:64px;top:355px;font:400 16.0px/1 PFLato;color:#231f20;" >Patient 360 Example</span><span class="pf-tx" style="left:1005px;top:319px;font:400 12.0px/1 PFLato;color:#838485;" >Patient 360 Example</span><svg class="pf-a" style="left:0;top:0;width:1920px;height:992px;overflow:visible"><polyline data-e="0" points="215.5,611.5 301.6,530.6 388.5,441.5" fill="none" stroke="#DADADA" stroke-width="1.6" stroke-dasharray="5 5"/><circle data-d="0" cx="301.6" cy="530.6" r="6" fill="#034EA2" stroke="rgba(3,78,162,.12)" stroke-width="3"/><polyline data-e="1" points="215.5,611.5 326.6,579.6 431.5,546.5" fill="none" stroke="#DADADA" stroke-width="1.6" stroke-dasharray="5 5"/><circle data-d="1" cx="326.6" cy="579.6" r="6" fill="#034EA2" stroke="rgba(3,78,162,.12)" stroke-width="3"/><polyline data-e="2" points="215.5,611.5 324.6,629.6 418.5,649.5" fill="none" stroke="#DADADA" stroke-width="1.6" stroke-dasharray="5 5"/><circle data-d="2" cx="324.6" cy="629.6" r="6" fill="#034EA2" stroke="rgba(3,78,162,.12)" stroke-width="3"/></svg><div class="pf-a" data-n0="0" style="left:192.5px;top:588.5px;width:46px;height:46px;border-radius:50%;background:#C2DBBE;border:2px solid #fff;display:grid;place-items:center;font:600 16.5px/1 PFLato;color:#000;box-sizing:border-box">MR</div><span class="pf-tx" data-ln0="0" style="left:185.8px;top:648px;font:400 12.0px/1 PFLato;color:#231f20">M. R•••••</span><div class="pf-a" data-n0="1" style="left:365.5px;top:418.5px;width:46px;height:46px;border-radius:50%;background:#FAD384;border:2px solid #fff;display:grid;place-items:center;font:600 16.5px/1 PFLato;color:#000;box-sizing:border-box">EH</div><span class="pf-tx" data-ln0="1" style="left:347.6px;top:478px;font:400 12.0px/1 PFLato;color:#231f20">ehr_encounters</span><div class="pf-a" data-n0="2" style="left:408.5px;top:523.5px;width:46px;height:46px;border-radius:50%;background:#84D7FA;border:2px solid #fff;display:grid;place-items:center;font:600 16.5px/1 PFLato;color:#000;box-sizing:border-box">CL</div><span class="pf-tx" data-ln0="2" style="left:398.6px;top:583px;font:400 12.0px/1 PFLato;color:#231f20">claims_2024</span><div class="pf-a" data-n0="3" style="left:395.5px;top:626.5px;width:46px;height:46px;border-radius:50%;background:#D6A7FC;border:2px solid #fff;display:grid;place-items:center;font:600 16.5px/1 PFLato;color:#000;box-sizing:border-box">RX</div><span class="pf-tx" data-ln0="3" style="left:401.7px;top:686px;font:400 12.0px/1 PFLato;color:#231f20">rx_fills</span><span class="pf-tx" style="left:1506px;top:306px;font:600 16.5px/1 PFLato;color:#000000;" >MR</span><span class="pf-tx" style="left:1548px;top:306px;font:500 16.0px/1 PFLato;color:#000000;" >M. R•••••</span><span class="pf-tx" style="left:1509px;top:473px;font:400 12.0px/1 PFLato;color:#231f20;" >Patient_MRN</span><span class="pf-tx" style="left:1645px;top:473px;font:400 12.0px/1 PFLato;color:#66676b;opacity:0" data-v="0">••••4821</span><span class="pf-tx" style="left:1645px;top:515px;font:400 12.0px/1 PFLato;color:#66676b;opacity:0" data-v="1">R•••••, M.</span><span class="pf-tx" style="left:1645px;top:557px;font:400 12.0px/1 PFLato;color:#66676b;opacity:0" data-v="2">ehr_encounters</span><span class="pf-tx" style="left:1645px;top:599px;font:400 12.0px/1 PFLato;color:#66676b;opacity:0" data-v="3">1984-••-••</span><span class="pf-tx" style="left:1645px;top:641px;font:400 12.0px/1 PFLato;color:#66676b;opacity:0" data-v="4">+1 ••• ••• 4471</span><span class="pf-tx" style="left:1509px;top:683px;font:400 12.0px/1 PFLato;color:#66676b;" >PayerID</span><span class="pf-tx" style="left:1645px;top:683px;font:400 12.0px/1 PFLato;color:#66676b;opacity:0" data-v="5">PY-••••-03</span><span class="pf-tx" style="left:1645px;top:725px;font:400 12.0px/1 PFLato;color:#66676b;opacity:0" data-v="6">m•••••@••••.org</span><span class="pf-tx" style="left:1509px;top:767px;font:400 12.0px/1 PFLato;color:#66676b;" >EntityId</span><span class="pf-tx" style="left:1645px;top:767px;font:400 12.0px/1 PFLato;color:#66676b;opacity:0" data-v="7">6f3e1a••••••c21a</span><span class="pf-tx" style="left:1645px;top:809px;font:400 12.0px/1 PFLato;color:#66676b;opacity:0" data-v="8">patient</span><span class="pf-tx" style="left:1645px;top:851px;font:400 12.0px/1 PFLato;color:#66676b;opacity:0" data-v="9">ehr/x/default/48213••••…</span><span class="pf-tx" style="left:74px;top:885px;font:500 14.0px/1 PFLato;color:#66676b;" >Entity Id : 6f3e1a••••••c21a</span><img class="pf-a" data-menu src="data:image/webp;base64,UklGRqYEAABXRUJQVlA4TJoEAAAvd0AVAEfBNpKkOJN/uA3I4vEUg+K2bSPvP+6VV1Ghbds26v/fykCnopr/fPT+75FH9nse+fnuEgVEooAoIOJJkQmkyKQE0iFK4REFRCyWgbYk21Ib63gAzoBFW26u50EXtfD/fyJn7Y1CYr/vFdF/iJIk1W32EBInkCcv4JT7ggatdWe1ru3A2upfYSAlRCuIWmTQ+QQ2gkoUqOls6STpmpGO8LFjJOu4ro6rFOAHHEQCCN0kK3IJQqRGfuGHb9BaISm+iuSeE5kTvRqd4kkaB7Zy0i2nNaNAYUZK5TvDKnEB3novp7xqRSNQEBQ6Chr0U1BSoeIqe3LlQpTaI1W0vrAnSy8MIEj2Osga2CrSOYgKkdO9XsiK9Trlwp4PxNau1u50NJLEJzkVGjrpyCGYVlgRVHJXf8/CnHwplNdcDr+/C5u327ZeRHgAjsjuN8GE3dRH4gl8cFgpBVwkwdcGM3ZfxaUB5/7Wju76UgXtXPpgyJg9QtuelhtQ1TsPlsQ6GO94vzNVwdTReBdprVokuqTemiK7BrrY0q4vOEVHNyb2GWbKrmpny41izMa0I7oZaU8Jdpv23ELszHY5xz28HzhsuxHbM3V63X9y4w22Tce0qv0xgOUhh+wVABg2NV91bM7qMvyOVc+nw/HP8xQ8z8N/p5/paVPzMw5bb4yn+XMIQw7P33nOYfwa5gVj3pS7A5Uz5o39YQqex88pfLyEf3ufSf5uyB0xWjxvnnw8hdfD+DqF/bwg8Li5dbCFdXBVT8/BX7/yb/CXKTiPo+f5T/DH7WjpAjqjy7/ZpyGQh6Xhf3+H+m2f/HlLDbas+5wz5snsMG4FZWvzZNOC7O2vTK77O9jXmRQzbNxxn2Nz/Y3mqhKpPMiWkkeb+42SoaLBYUwd5b7d4DB2NvexNLmPVeerYm7eiLjuW9y325wnS440646tzThUb9iNu43Gg25tmN0uahz6cMk49HncShzKyMvGocPseQvxIDyIl41Dx6/pGT4lX39dYI3LLhiHnvZ/GXxYOMbrzs+NWPcvF4fuTyHP+/D8/xbiBaZ8yTj0823vh/fwePp8unK8D+5ywTh0+P0hD3MOeTy9XK9S9leXjENH+LlOz7kiXDUOZePtZePQE/xUx2mcDsfh2lUX/Tpx6HDNLjLuzsViHNpYfU9oWG1j831sFA8qdt8zGBNx3ae5qs9RifdNqV/OFAGSNTeMdBho7P+w8P9fGFj6Ozu6LYuEeyn3dtRm0fbOWF6BiAYhbcRSuUn1DBW+wvJc2lsDOQX3mClDmZ4DxSFRhhSZLQLAiRR6loxGRkBDBDDvAUZPmJGcPVnwUPKCKPKCXE3mIRIgAwUDEBSFp6fkQCSsFWJEEB8AaUG+kpBEYkaS+2oW1BoEPWVPKzBJp1sBAkzBRhiXInpJrVISvzBny0WeFxLQJQ61xC/oR+RTEDvEQCKF2N1l1hd+0EqiGxRITcMWIkbJgSQCQKei4I0aojYuKlhtR9FjzSgMyFotg0+OW+GhICHAaJSkwopMFBCIgVfrpTpctOQ3wLGfYq6AaAA6nNNVPtL1lquHAw==" style="left:1335px;top:326px;opacity:0">',
      sp: {
        menu: "data:image/webp;base64,UklGRqYEAABXRUJQVlA4TJoEAAAvd0AVAEfBNpKkOJN/uA3I4vEUg+K2bSPvP+6VV1Ghbds26v/fykCnopr/fPT+75FH9nse+fnuEgVEooAoIOJJkQmkyKQE0iFK4REFRCyWgbYk21Ib63gAzoBFW26u50EXtfD/fyJn7Y1CYr/vFdF/iJIk1W32EBInkCcv4JT7ggatdWe1ru3A2upfYSAlRCuIWmTQ+QQ2gkoUqOls6STpmpGO8LFjJOu4ro6rFOAHHEQCCN0kK3IJQqRGfuGHb9BaISm+iuSeE5kTvRqd4kkaB7Zy0i2nNaNAYUZK5TvDKnEB3novp7xqRSNQEBQ6Chr0U1BSoeIqe3LlQpTaI1W0vrAnSy8MIEj2Osga2CrSOYgKkdO9XsiK9Trlwp4PxNau1u50NJLEJzkVGjrpyCGYVlgRVHJXf8/CnHwplNdcDr+/C5u327ZeRHgAjsjuN8GE3dRH4gl8cFgpBVwkwdcGM3ZfxaUB5/7Wju76UgXtXPpgyJg9QtuelhtQ1TsPlsQ6GO94vzNVwdTReBdprVokuqTemiK7BrrY0q4vOEVHNyb2GWbKrmpny41izMa0I7oZaU8Jdpv23ELszHY5xz28HzhsuxHbM3V63X9y4w22Tce0qv0xgOUhh+wVABg2NV91bM7qMvyOVc+nw/HP8xQ8z8N/p5/paVPzMw5bb4yn+XMIQw7P33nOYfwa5gVj3pS7A5Uz5o39YQqex88pfLyEf3ufSf5uyB0xWjxvnnw8hdfD+DqF/bwg8Li5dbCFdXBVT8/BX7/yb/CXKTiPo+f5T/DH7WjpAjqjy7/ZpyGQh6Xhf3+H+m2f/HlLDbas+5wz5snsMG4FZWvzZNOC7O2vTK77O9jXmRQzbNxxn2Nz/Y3mqhKpPMiWkkeb+42SoaLBYUwd5b7d4DB2NvexNLmPVeerYm7eiLjuW9y325wnS440646tzThUb9iNu43Gg25tmN0uahz6cMk49HncShzKyMvGocPseQvxIDyIl41Dx6/pGT4lX39dYI3LLhiHnvZ/GXxYOMbrzs+NWPcvF4fuTyHP+/D8/xbiBaZ8yTj0823vh/fwePp8unK8D+5ywTh0+P0hD3MOeTy9XK9S9leXjENH+LlOz7kiXDUOZePtZePQE/xUx2mcDsfh2lUX/Tpx6HDNLjLuzsViHNpYfU9oWG1j831sFA8qdt8zGBNx3ae5qs9RifdNqV/OFAGSNTeMdBho7P+w8P9fGFj6Ozu6LYuEeyn3dtRm0fbOWF6BiAYhbcRSuUn1DBW+wvJc2lsDOQX3mClDmZ4DxSFRhhSZLQLAiRR6loxGRkBDBDDvAUZPmJGcPVnwUPKCKPKCXE3mIRIgAwUDEBSFp6fkQCSsFWJEEB8AaUG+kpBEYkaS+2oW1BoEPWVPKzBJp1sBAkzBRhiXInpJrVISvzBny0WeFxLQJQ61xC/oR+RTEDvEQCKF2N1l1hd+0EqiGxRITcMWIkbJgSQCQKei4I0aojYuKlhtR9FjzSgMyFotg0+OW+GhICHAaJSkwopMFBCIgVfrpTpctOQ3wLGfYq6AaAA6nNNVPtL1lquHAw==",
      },
    },
    5: {
      img: "/images/home/final/product-film/plate-05.webp",
      html: '<div class="pf-a pf-logo" style="left:44px;top:33px;color:#111"><span class="pf-mark"></span>workspace</div><span class="pf-a" style="left:1840px;top:29px;width:33px;height:33px;border-radius:50%;display:grid;place-items:center;font:700 13px/1 PFLato;color:#234">JR</span><span class="pf-tx" style="left:44px;top:189px;font:700 16.0px/1 PFLato;color:#231f20;" >Care Network 360</span><span class="pf-tx" style="left:728px;top:321px;font:600 16.5px/1 PFLato;color:#231f20;" >Configure Logic | payer</span><span class="pf-tx" style="left:86px;top:358px;font:600 14.5px/1 PFLato;color:#231f20;" >payer</span><span class="pf-tx" style="left:86px;top:550px;font:400 14.0px/1 PFLato;color:#231f20;" >language</span><span class="pf-tx" style="left:87px;top:598px;font:400 14.0px/1 PFLato;color:#231f20;" >last_name</span><span class="pf-tx" style="left:86px;top:646px;font:400 14.0px/1 PFLato;color:#231f20;" >mrn</span><span class="pf-tx" style="left:86px;top:694px;font:400 14.0px/1 PFLato;color:#231f20;" >specialty</span><span class="pf-tx" style="left:86px;top:742px;font:400 14.0px/1 PFLato;color:#231f20;" >dob</span><img class="pf-a" data-cnt src="data:image/webp;base64,UklGRvABAABXRUJQVlA4TOMBAAAv0cAIAK+hKJKkZu59BwLAv8GcwQaDRpIU9YJ/Tadp9hl22TaSpGjW3/XuYfPP8Jhn/uMPv75eX92bD7DR/Y/X1+vrD61nOt/2+hp3x0CqKFXEQKooKUpKgJISoFQJA0CpEqCkJClKFSVFSZGuIKYD4UwJ8A2cmRgupBPgI5wr78a5cmYECOFACAAEWLJtq4l2EiL9Ajzc4b7g7sx/bm6Rr66K6D8Dt40UefmY8Qd4YT5TQujjBxaZEuzAC20yJlhhnswJ+X9PdLsGjXYhJTnr+XA4236qEglIVElH5/H8kOOwGF0+U2w3oN7Wr6hGt1tJIeMVd2E1yn2/c8l0K1V5O0pybRc8hPnyI65yQamXG6v2uFQFF1x11911KbhQTLDp4dFh/vXO5Yh7ddOPqmiBilDpD/pGFyWSRlINYbW4hg3O8OvqAgBaFNq4j8Sl2UELJFaO/fYadvAZlLob6cXWNQ9z6QNSeZJBvZ9o8yeN/ezrg6hI3+sBppQelvNHi+337+xNKeHWqtooykYVjaLxnJvY+/p4fW89+sGdnbqJor6iLmJK0DSD1hOumEZii9N4scfZz0fHH9zZgYczWgG8PBhcEhy2k+Fwvspl0VvMfyehlTXs0PuzM+a3VeDjZ83fUg8A" style="left:741px;top:367px;opacity:0"><span class="pf-tx" style="left:744px;top:497px;font:600 12.0px/1 PFLato;color:#231f20;" data-dd>Drag &amp; drop a Field Preference here</span><img class="pf-a" data-pf src="data:image/webp;base64,UklGRsYBAABXRUJQVlA4TLoBAAAv0cAIAB+hoI0kZfzLPYYHGwrbtm38/7lO97AUtm3buP9/mz3aev7jwy/fyxcj3P+8fC/fh+aM866Xr3YBkBJSAkBKAEgJsUIkpQAQSSlEAOiQEojESkoASAmxEAtIsG27TasDojwDIkI2LSLPedL8R0kvxskva0X0fwIYVbNeWY0ZTwb0yuFkVA3pmYNqRu+c/c/D1VZKu5M7+VTDJs3fo1XW6H3QHO8TioGV8BbFEjkZy+oui7SBJvkrUkobf4Vs1HWe5AjggJjdPW5c9qHJ8bLdl9D5OwUIXwBa38OJA5GrAjSGIAIigAbAzR043LyjvsMR7ijaPUIxsBJuEFtsVzZiqmu2JRvRDrpkv8ttRxV/JMsjXx4vytJqbA+7GtSjASnCIrM3odMavR8i4MRdk00jmIfcqubm6COramH/SVdbvCS0d7ltCRwf2ZJjDYSW4w5r9BLd38OnGjZpfrvtAbw7ctnjll3mcgREgJjlHqEYWAm3c4dsKkd8mFnsMlYlcjKWyD0WaQNN8ldc6RznhY6PWYP3UfOKu7zZsvsuxRpHj7jxP9+qQd8YVqPpsF8MJmPG1axXViMA" style="left:741px;top:489px;opacity:0"><div data-chips><span class="pf-a" data-chip style="left:736px;top:571px;width:94px;height:24px;border:1px solid #231f20;border-radius:12px;display:grid;place-items:center;font:400 10.5px/1 PFLato;color:#231f20">claims_2024</span><span class="pf-a" data-chip style="left:841px;top:571px;width:108px;height:24px;border:1px solid #231f20;border-radius:12px;display:grid;place-items:center;font:400 10.5px/1 PFLato;color:#231f20">ehr_encounters</span><img class="pf-a" data-chip src="data:image/webp;base64,UklGRsIAAABXRUJQVlA4TLYAAAAvEMAFALU4sbVtSjZvo/1N278Ck7a/0Wg0miZoNjfAkFgA5zvMg/P4MBwBQdH/0UxA/yfgTIp62Ji13yQu6tY30RlWF4cY86ecAALE0hAh6hPQAZO0gG9eA55PgDH/w3Z6hPIQw05Y3zGRM3XIv9R6cstFxIYxjzhitmT5sixDhLoDwJgT/t9gP71EOhkE5F/g4DNU5xNgq+5L9F8MhM2f4x/oxudI9Kye68ntqe5KQs/LchlJUQ==" style="left:960px;top:575px"></div>',
      sp: {
        cnt: "data:image/webp;base64,UklGRvABAABXRUJQVlA4TOMBAAAv0cAIAK+hKJKkZu59BwLAv8GcwQaDRpIU9YJ/Tadp9hl22TaSpGjW3/XuYfPP8Jhn/uMPv75eX92bD7DR/Y/X1+vrD61nOt/2+hp3x0CqKFXEQKooKUpKgJISoFQJA0CpEqCkJClKFSVFSZGuIKYD4UwJ8A2cmRgupBPgI5wr78a5cmYECOFACAAEWLJtq4l2EiL9Ajzc4b7g7sx/bm6Rr66K6D8Dt40UefmY8Qd4YT5TQujjBxaZEuzAC20yJlhhnswJ+X9PdLsGjXYhJTnr+XA4236qEglIVElH5/H8kOOwGF0+U2w3oN7Wr6hGt1tJIeMVd2E1yn2/c8l0K1V5O0pybRc8hPnyI65yQamXG6v2uFQFF1x11911KbhQTLDp4dFh/vXO5Yh7ddOPqmiBilDpD/pGFyWSRlINYbW4hg3O8OvqAgBaFNq4j8Sl2UELJFaO/fYadvAZlLob6cXWNQ9z6QNSeZJBvZ9o8yeN/ezrg6hI3+sBppQelvNHi+337+xNKeHWqtooykYVjaLxnJvY+/p4fW89+sGdnbqJor6iLmJK0DSD1hOumEZii9N4scfZz0fHH9zZgYczWgG8PBhcEhy2k+Fwvspl0VvMfyehlTXs0PuzM+a3VeDjZ83fUg8A",
        pref: "data:image/webp;base64,UklGRsYBAABXRUJQVlA4TLoBAAAv0cAIAB+hoI0kZfzLPYYHGwrbtm38/7lO97AUtm3buP9/mz3aev7jwy/fyxcj3P+8fC/fh+aM866Xr3YBkBJSAkBKAEgJsUIkpQAQSSlEAOiQEojESkoASAmxEAtIsG27TasDojwDIkI2LSLPedL8R0kvxskva0X0fwIYVbNeWY0ZTwb0yuFkVA3pmYNqRu+c/c/D1VZKu5M7+VTDJs3fo1XW6H3QHO8TioGV8BbFEjkZy+oui7SBJvkrUkobf4Vs1HWe5AjggJjdPW5c9qHJ8bLdl9D5OwUIXwBa38OJA5GrAjSGIAIigAbAzR043LyjvsMR7ijaPUIxsBJuEFtsVzZiqmu2JRvRDrpkv8ttRxV/JMsjXx4vytJqbA+7GtSjASnCIrM3odMavR8i4MRdk00jmIfcqubm6COramH/SVdbvCS0d7ltCRwf2ZJjDYSW4w5r9BLd38OnGjZpfrvtAbw7ctnjll3mcgREgJjlHqEYWAm3c4dsKkd8mFnsMlYlcjKWyD0WaQNN8ldc6RznhY6PWYP3UfOKu7zZsvsuxRpHj7jxP9+qQd8YVqPpsF8MJmPG1axXViMA",
        plus: "data:image/webp;base64,UklGRsIAAABXRUJQVlA4TLYAAAAvEMAFALU4sbVtSjZvo/1N278Ck7a/0Wg0miZoNjfAkFgA5zvMg/P4MBwBQdH/0UxA/yfgTIp62Ji13yQu6tY30RlWF4cY86ecAALE0hAh6hPQAZO0gG9eA55PgDH/w3Z6hPIQw05Y3zGRM3XIv9R6cstFxIYxjzhitmT5sixDhLoDwJgT/t9gP71EOhkE5F/g4DNU5xNgq+5L9F8MhM2f4x/oxudI9Kye68ntqe5KQs/LchlJUQ==",
      },
    },
    6: {
      img: "/images/home/final/product-film/plate-06.webp",
      html: '<div class="pf-a pf-logo" style="left:44px;top:33px;color:#111"><span class="pf-mark"></span>workspace</div><span class="pf-a" style="left:1840px;top:29px;width:33px;height:33px;border-radius:50%;display:grid;place-items:center;font:700 13px/1 PFLato;color:#234">JR</span><span class="pf-tx" style="left:44px;top:189px;font:700 16.0px/1 PFLato;color:#231f20;" >Care Network 360</span><img class="pf-a" data-fab src="data:image/webp;base64,UklGRmQDAABXRUJQVlA4TFcDAAAvQ0AQAB/DoJEkRX3+NZ6AE8AP/QwOGESSFKf9e0QAAiB/hlEbSY68/Dnu+wDkWPMvtCEmSdxhtfyi7J1CKISg1PNAXALIaWu/OCZEGfdtfj7IPnH5sNTjgBh5rQxK3hsDEYRS904gBAYlzYUg8togggho92V5PwqBiLw2BCLy2kC2bdtpW1myzFISxxAoc11mZmZmbvX/P5GksnR04TWi/wzcNpKSzuwCe4ibGZ5g/DeFDIRwU40d0ATGxHa9wKOB73uuQ0wEP94kHi3F1VrP8NhY1tNWiUrMtTGCXXJYWB3avHz44S36ebhanqiUA5cguCWvkPbs3vJcPawOJcwhGGQJ2yyZuuCSupyIqYMBnHjlnhOuoLOh0FW+qpgEldkvrqS3xZRaim4V68dcWUd1ZiMlL3TdcQA9ZCWFKZBdzN44iN6ygvwiKQwAOeev3YzIGcJ+/Y6D6a7qY7lOTnrMAXWUelJmlRY4qGbKMpuI3/8Oy2cPNfPb3ficA+swsXFuOx3l4JosmHluxxfwXMR2TrNJM65BvUHOKglXdLAXEiTuXX3QwU3VFYLZGJfgee45byckNCZeNcM1GeaM9meBtxtzMmyHlvBFkVxIFe0NE+6CDFexndcibUrOn6qOqMVv++HypuL8S9gR+X2cK5iCc94jevNgOslVTMX5GBXBJrmKqTgfDUQE47rImJBRXSsZFeF3aeviCYfVvzVNVHNFONU7Pff2Y+qIsKIzTc9YRMTfki09z/paKAQF43reOZMUC3FqN1yDHiuu+EVuhzs62AhzAiBE+3SQUZwXrsSnGr5JkZP3lSZ0RMO3kZL8uCk6AK+T3NpAJuv5guVtsNkuUc3AslS2ZCIw7CXHkBzHLjZkZNLaAxz3NV8ymERWofMFLJYcYPJZh00HXoFmGGAtIbr04iBI411P0UGGirH6PsBsdeYgxXQlSFY+1PiaTgJbPfFyw4ELpXi4K3RMBJF7BfGo9MLFRPIr9wJYcGk8vP6Qz/VuX1JwTLhclLi0XBudv7r7/nXy7642x6ohdQloQouw5bJSXG3ryEYnhntqablIXQvDZ9bING3bp0FDvu/aBGv7R9BUyz8C/Df9lwDZH6Rynpr9Wk9Y644YzfL33ojH/tqdfAwA" style="left:1810px;top:250px;opacity:0"><img class="pf-a" data-menu src="data:image/webp;base64,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" style="left:1676px;top:314px;opacity:0"><span class="pf-tx" style="left:57px;top:258px;font:400 12.0px/1 PFLato;color:#231f20;" data-ph>Enter a workflow name</span><span class="pf-tx" style="left:57px;top:258px;font:400 12.0px/1 PFLato;color:#231f20;" data-wf></span><span class="pf-tx" style="left:342px;top:762px;font:500 14.0px/1 PFLato;color:#231f20;" data-hh>02</span><span class="pf-tx" style="left:677px;top:762px;font:400 14.0px/1 PFLato;color:#231f20;" >UTC −05:00 / Eastern Time (ET)</span><div class="pf-a" data-conf style="left:1682px;top:104px;width:198px;height:36px;background:#231f20;border-radius:2px;opacity:0"><span class="pf-tx" style="left:14px;top:12px;font:700 14.0px/1 PFLato;color:#fff">CONFIRM ORCHESTRATE</span></div>',
      sp: {
        fab: "data:image/webp;base64,UklGRmQDAABXRUJQVlA4TFcDAAAvQ0AQAB/DoJEkRX3+NZ6AE8AP/QwOGESSFKf9e0QAAiB/hlEbSY68/Dnu+wDkWPMvtCEmSdxhtfyi7J1CKISg1PNAXALIaWu/OCZEGfdtfj7IPnH5sNTjgBh5rQxK3hsDEYRS904gBAYlzYUg8togggho92V5PwqBiLw2BCLy2kC2bdtpW1myzFISxxAoc11mZmZmbvX/P5GksnR04TWi/wzcNpKSzuwCe4ibGZ5g/DeFDIRwU40d0ATGxHa9wKOB73uuQ0wEP94kHi3F1VrP8NhY1tNWiUrMtTGCXXJYWB3avHz44S36ebhanqiUA5cguCWvkPbs3vJcPawOJcwhGGQJ2yyZuuCSupyIqYMBnHjlnhOuoLOh0FW+qpgEldkvrqS3xZRaim4V68dcWUd1ZiMlL3TdcQA9ZCWFKZBdzN44iN6ygvwiKQwAOeev3YzIGcJ+/Y6D6a7qY7lOTnrMAXWUelJmlRY4qGbKMpuI3/8Oy2cPNfPb3ficA+swsXFuOx3l4JosmHluxxfwXMR2TrNJM65BvUHOKglXdLAXEiTuXX3QwU3VFYLZGJfgee45byckNCZeNcM1GeaM9meBtxtzMmyHlvBFkVxIFe0NE+6CDFexndcibUrOn6qOqMVv++HypuL8S9gR+X2cK5iCc94jevNgOslVTMX5GBXBJrmKqTgfDUQE47rImJBRXSsZFeF3aeviCYfVvzVNVHNFONU7Pff2Y+qIsKIzTc9YRMTfki09z/paKAQF43reOZMUC3FqN1yDHiuu+EVuhzs62AhzAiBE+3SQUZwXrsSnGr5JkZP3lSZ0RMO3kZL8uCk6AK+T3NpAJuv5guVtsNkuUc3AslS2ZCIw7CXHkBzHLjZkZNLaAxz3NV8ymERWofMFLJYcYPJZh00HXoFmGGAtIbr04iBI411P0UGGirH6PsBsdeYgxXQlSFY+1PiaTgJbPfFyw4ELpXi4K3RMBJF7BfGo9MLFRPIr9wJYcGk8vP6Qz/VuX1JwTLhclLi0XBudv7r7/nXy7642x6ohdQloQouw5bJSXG3ryEYnhntqablIXQvDZ9bING3bp0FDvu/aBGv7R9BUyz8C/Df9lwDZH6Rynpr9Wk9Y644YzfL33ojH/tqdfAwA",
        menu: "data:image/webp;base64,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",
      },
    },
    7: {
      img: "/images/home/final/product-film/plate-07.webp",
      html: '<div class="pf-a pf-logo" style="left:44px;top:28px;color:#111"><span class="pf-mark"></span>workspace</div><span class="pf-a" style="left:1702.5px;top:24.5px;width:33px;height:33px;border-radius:50%;display:grid;place-items:center;font:700 12px/1 PFLato;color:#234">JR</span><span class="pf-tx" style="left:1748px;top:35px;font:700 14.0px/1 PFLato;color:#231f20;" >Jordan Reyes</span><img class="pf-a" src="data:image/webp;base64,UklGRpAAAABXRUJQVlA4TIMAAAAvD0ADAG9gpG2k8+/v6At4Xnw2DLKNNH+rN3iER9gIXnHbSMr23yn/9mBx/mO/GRiUwvpzCgN00K1RCouJAUxq25ZymO2X4L6nwhiFCAQYKxAAjcfjsOj59iFCRP+T/wYAWDyoWmplsCuy7xE03+ayqjuVgn2lzQUmKQEw9+wAMMb8AAA=" style="left:1841px;top:34px"><span class="pf-tx" style="left:44px;top:127px;font:400 16.0px/1 PFLato;color:#66676b;" >Pipeline_ClaimsQuality_MonthlyTemplate_2025</span><img class="pf-a" data-wires src="data:image/webp;base64,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" style="left:44px;top:243px"><svg class="pf-a" data-w2 style="left:0;top:0;width:1920px;height:992px;overflow:visible"><path d="M207 498 H346 Q362 498 362 514 V562 Q362 578 378 578 H420 M500 578 H646 Q662 578 662 562 V509.5 Q662 493.5 678 493.5 H756" fill="none" stroke="#E3E4E6" stroke-width="2"/></svg><img class="pf-a" data-dn="0" data-nm="Data Source" data-w="112" src="data:image/webp;base64,UklGRjACAABXRUJQVlA4TCMCAAAvb0AJAGehoG0bKYfq+INqt3tLg3EbSYq8+Ue6PzyGVtC2DZPxRzoK3cn8R+La4j9QG1Af492A1AakNgLuQZCCQWoLCrgNKOA2ApD7CKjF+x5ESq/1/0dKzQW5RwBFLSAC9TFrI4As27bbtjl6emwS3UjD5TExYkMgRcTznyCLK1P+Ivo/Abt/0tnzmLbwKVvIxlbYQLkZs7mnazbSPc8l2QoZF9jM9H+qcq7aEvX+3vlet6NvAW562YjKjNl7t87M7FLfrbLu8quI941CkYP2sird1rX1+VJhq+p4OAT5InYHUAxDDv5ssqYELgYBUeA4ozpjDbOigAiIIIgCKoCorHtdNShQxK7rc5BHewunSx6C76WM53gU772fuKATd+78JbVBbTgL50K9945DtNis+c2qJEBeOJcXgAxv8o4SuobagBxOBSCWwiVVFHSQpahgLUCvSC/v5RumzjHVd2iguOrcHMVVKJlKPZSuA07lkgFDAVSD9z7pit3rqrxvZEX10r5Fk+Lva5vT0B4WwFxjQHjDaaI9q9Nudgm1c0qXztUppXjNG6qXO6oAC+4BmTFF+mM5KBql9nC/8HAPFbGE6v3mnePNKaUUr0FiZ+bIh3DMQ9f5SRtjvIbW+1gioQ9uQYP3d+TRh7vPt3bPrADC4p7ZPVNhrTAVVr5XXnzEV3+v7/y/0ShbIQvPbiuaH3PZ2MgWiBuzuV32M23h+Cvb/ZMGAA==" style="left:98px;top:262px"><div class="pf-a" data-dn="1" data-nm="Select" data-w="73" style="left:130px;top:483px;width:73px;height:36px;border:1px solid #034EA2;border-radius:4px;background:#fff;box-sizing:border-box"><svg class="pf-a" viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="#034EA2" stroke-width="1.4" stroke-linejoin="round" style="left:8px;top:8px"><rect x="2.5" y="3.5" width="13" height="11" rx="1"/><path d="M2.5 7.5h13M2.5 11h13M7 3.5v11M11 3.5v11"/></svg><span class="pf-tx" style="left:32px;top:13px;font:400 12.0px/1 PFLato;color:#034ea2">Select</span></div><img class="pf-a" data-dn="2" data-nm="Transpose" data-w="101" src="data:image/webp;base64,UklGRh4CAABXRUJQVlA4TBICAAAvZEAJAI+hqJGkqDc8cYV/Hxhgd7nHButIkpUMLl/kHxoRODxXhEEjSYrmyMH5V4n/Cz3/oZ9pf/9LvJULA2B43hveZxirLX76UoaDc4KiTgMUpZU+L0IMuDRCDLhwACEhjEAIIwTg0gBcmPcmAH8xjfsvKJDKuTQAQ4YwAH5xadqyQLpt623iHM/HN6luMHQFFIqILYOV9388lzGJUn5G9H8Ckv+x5a0N0b6WA2W7F2It27bsu26Iubn1BYmatAPEPfwP0joM2pgt7ln/NsRsWdOfRm1xN/32HjMOdnAz9M12D7GQ9fqNSefLZdgt57GovX+YAZExQFBQVEAVEEQ6KqCIdkQ7ogKIjnr58vVT8nMoZBg7YE4TNEfvxDlXQTg6b9DK+jnNd+crMI+Tm5N763N2zrpixOtHpnNT7IECqpyQIkHMEaDZgFukXtC72BWgXsjciA8fSZJkotMUOUC+rlYEhaCFt2/QZGCNsUCTz2ubsrw75+oRL5+/TnY6TqGg1X4+Al36Xc9pIEOXfrU8MTokvZOkIZvIHJERArsjzQKts+wuqEfgYKRWJH2SGGNc2DNRUZ1Op6FldaqUxjm/gX1VVTmmPjll7p3fPMtaazOmnzF6BjSZCN0Z3RndGSPft0ut5ddvMp78LhvCY/4bPP9dsf5f00rUZOBmorY795XtTqIlpi37kvISot3+KJP/sQ==" style="left:291px;top:346px"><div class="pf-a" data-dn="5" data-nm="Filter" data-w="80" style="left:420px;top:560px;width:80px;height:36px;border:1px solid #034EA2;border-radius:4px;background:#fff;box-sizing:border-box"><svg class="pf-a" viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="#034EA2" stroke-width="1.4" stroke-linejoin="round" style="left:8px;top:8px"><path d="M2.5 3.5h13l-5 6v5l-3-1.5V9.5z"/></svg><span class="pf-tx" style="left:32px;top:13px;font:400 12.0px/1 PFLato;color:#034ea2">Filter</span></div><img class="pf-a" data-dn="3" data-nm="Connect" data-w="92" src="data:image/webp;base64,UklGRuwBAABXRUJQVlA4TOABAAAvW0AJAGehoG0bKQf/AO/fXWkobts2Un/df7YO4iB95WTctm0g9deFbv+1DlUQzX9o2/G8xE+YBOH+OJkcz68XgJgEMUngEDMJuAQRcEnEJQGImUzP6wVhj/zjz2KP8AExE8QkCAsz3ff5syBd2/a2aR7y8bVkGLNslShDpRrxB+d/grFFKJtfEf2fgNmX5fxhsLd2P5+YD73wxsrdMB/b3/IGu4cxk7dIhgneZPu54YpZ8a6YJffmhEN/uVqb/VmtvG2qxPnNzStztgR8zhtgUVzFsvjr67j+H4KeLnlA7aYzAVypSLeMiwogqIAIKkcqR6JAfM7FxcWUrYDGRKwFWptqM+OX2WcHZR2yo4mbTb5Ew2ZzD13eBPWWQ82vp7oWaI9WQFPhwkRSiCtsiRaaIrQB34NvNSuAKTWPZ7PZbKo4QKy7NgV8nrqOY00C1g5TMJoETSL+CyG5bsMJnupcWQCblDywtH5KTUeWJ2oBrk/y+7GKYL5p1mbr5sqVQOV9Uug68gpJq+c4DypaFFVK3WgFfTY79P5gduip7g+lBGWRQ77lOeJTDEofQ1iySeEFXvJcOBZOKcKxAJzzKl7ht9Qgb5FMPLi3qNuOzYdO3hpxw3xsNt/ZWzv8nc++LAE=" style="left:464px;top:445px"><img class="pf-a" data-dn="4" data-nm="Rename" data-w="90" src="data:image/webp;base64,UklGRroBAABXRUJQVlA4TK4BAAAvWUAJAG+hoG0jJwf/+f7NH6WhuG3bSP11/9k6iIP0lRNt27Zxtj7U/98qKiOa/9B64nsZP8MFEPfh6GQ9P14EyAWQCyLCPhGGXAUSEYJQCCJAbgC58HqB2FG//ix2pBfIDSAjtsDKDetdfxagW9vbNnmJIuhuOk0xHWJkGe7/ApuIPX9F9H8Csl/I4X2bPtfTsGfYboVPVdbtsOu04tMN911JPh9pe/iE07+MEAjhk8rzKs9d1zGG6ceKThIxRkcdi021+VApX3TnJPI8eRaw2QOqgCJ6JgooKoieifounweDgYPUDQl4SYywt30p1LdW7cDMSqG+2ZeLvZXCpoo28TxdvJO43FVKESEE6gXSKCOwBfWMooLHuTaKPnieL7Isc2jRrSRUfdeNgD2YlZF6AvUExsuzCVMDW8wbM0ueqydXdJKIMXoW7PYQF5x36X5b7H2PuFPW2edUrVTx1guk2lAYqPYUezCXNArjtwuBEF7CqBmxKx9t3KPV/mbvYlZZtXq7txS8OS/OcX6E9/uH1MrnIz334fPZHLqG7UY+FwntsCsbHtPn2t4Ns19I" style="left:498px;top:292px"><img class="pf-a" data-dn="6" data-nm="Pivot" data-w="73" src="data:image/webp;base64,UklGRpwBAABXRUJQVlA4TI8BAAAvSEAJAFehsJGUaCnffvlBbUNx27aR+uv+s3UQB+krJ+O2bQM5vy50+691sJ1o/uMvO+ymvBSTcX8cTNb15wZMAVCFm33EFR8BCGKKD1zxEYBZmOz2AbAjf7057AgvgFkABFEFC7M47wPjzQJ0a5vjJB+dUboCgQGDOkKTbnL/d9jduP2M6P8ERH/d+Na0Qb/HI3FzIoRMxyYeet8jdLkNtRQcNSMIv/2PKb1XqB++B+XACmUMVmFxptCMB8NS1QuMHZ1wtvaSAcZ8ocnEmFjZwniD436WW0FVL0N0dzxlBxQOREQAiABmADzt6fE5yYF16Oq9zshLiFBNgN2RqjpOfOvPE7rNZrvdLkEimHLgzJ0gghcBt2wtIIrMYWL7WAwzvF536KU1CgvNAa7nPHePKIrW26EvAmjqUpQ7IJkVDc6ga8/mC5myBMQCYtejuxcR67EQ1TuArCuVQb48r8K+FBFDk5YkQp+wmHqvYCUEOCvkf5WGgqORmwRnXofixlBQJE08FMVvbdDNRxz9dQEA" style="left:625px;top:381px"><div class="pf-a" data-dn="7" data-nm="With Columns" data-w="115" style="left:756px;top:478px;width:115px;height:36px;border:1px solid #034EA2;border-radius:4px;background:#fff;box-sizing:border-box"><svg class="pf-a" viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="#034EA2" stroke-width="1.4" stroke-linejoin="round" style="left:8px;top:8px"><rect x="2.5" y="2.5" width="13" height="13" rx="1"/><path d="M7 2.5v13M11 2.5v13"/></svg><span class="pf-tx" style="left:32px;top:13px;font:400 12.0px/1 PFLato;color:#034ea2">With Columns</span></div><img class="pf-a" data-dn="8" data-nm="Stack" data-w="74" src="data:image/webp;base64,UklGRuYBAABXRUJQVlA4TNoBAAAvSUAJAHehoJGkZpGP4O90TKhtJKlZMvqvjTrQu8gBgrZtk+mYzp/W9W7L/Ndhf2d+s7AKIgFiPyz4PWYCJBIgkdhA9dugIZEG2kAlQBuoxAYg0QCJxJwF4hePtt7iF/P2BRAfotHPBWW9Adm2bUuJs/TUsShBuTbE5sbm2HANRP///4QrKcyo14j+T8DwB5ycq7rfx6QlqQqh17KokqbjnN6vzk219E+qFt5g/RPLpu9CzbzXdyArSyENK+1dHuY05uZ6Zl5o1V0ZoZvdRjvQ8E/SsNImWVkaURap/4XYS/Vr91EE5Oae8jAnMrvyPG4QfRKVJo0bPCIyUF9qZmuBrE1rB4zDn7Bkd7VScMEHpzVyKV64RxTlFHRnCpnN28jDzSuZAV9gTkoF0ZrfBXGPzwjUewVQMyU63VkT45m5rATQ2na8MBxGCEzCSmRlKUgU47JBbZPv3Ljlq9TuglfILcxBttY2WcLKk11huoOdk1uKqNZMSumM3ByowDI42vV6u5ki4bqUsNt6xyRYmGgNxa47tCgzyKwQokV4FuCDxg9e7gDUezPl+3cCk5Q+dtTTH1Il/ZOW86p/y31TUi2lX7KqkqZhcqj7XZ2S4X949LiP3sXfweDxHQA=" style="left:805px;top:351px"><div class="pf-a" style="left:0;top:0;width:1920px;height:891px;overflow:hidden"><div class="pf-a" data-drawer style="inset:0"><img class="pf-a" src="data:image/webp;base64,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" style="left:63px;top:501px;border-radius:16px;box-shadow:0 0 11px rgba(30,40,70,.09)"><span class="pf-tx" style="left:109px;top:580px;font:600 14.5px/1 PFLato;color:#838485;" >Jan 2024</span><span class="pf-tx" style="left:405px;top:580px;font:600 14.5px/1 PFLato;color:#838485;" >Feb 2024</span><span class="pf-tx" style="left:650px;top:580px;font:600 14.5px/1 PFLato;color:#838485;" >Mar 2024</span><span class="pf-tx" style="left:894px;top:580px;font:600 14.5px/1 PFLato;color:#838485;" >Apr 2024</span><span class="pf-tx" style="left:1138px;top:580px;font:600 14.5px/1 PFLato;color:#838485;" >May 2024</span><span class="pf-tx" style="left:1383px;top:580px;font:600 14.5px/1 PFLato;color:#838485;" >Jun 2024</span><span class="pf-tx" style="left:1627px;top:580px;font:600 14.5px/1 PFLato;color:#838485;" >Jul 2024</span><div class="pf-a" data-dr="0" style="inset:0"><span class="pf-tx" style="left:109px;top:626px;font:400 16.0px/1 PFLato;color:#231f20">18,456</span><span class="pf-tx" style="left:405px;top:626px;font:400 16.0px/1 PFLato;color:#231f20">17,932</span><span class="pf-tx" style="left:650px;top:626px;font:400 16.0px/1 PFLato;color:#231f20">19,210</span><span class="pf-tx" style="left:894px;top:626px;font:400 16.0px/1 PFLato;color:#231f20">18,877</span><span class="pf-tx" style="left:1138px;top:626px;font:400 16.0px/1 PFLato;color:#231f20">20,114</span><span class="pf-tx" style="left:1383px;top:626px;font:400 16.0px/1 PFLato;color:#231f20">19,560</span><span class="pf-tx" style="left:1627px;top:626px;font:400 16.0px/1 PFLato;color:#231f20">21,003</span></div><div class="pf-a" data-dr="1" style="inset:0"><span class="pf-tx" style="left:109px;top:678px;font:400 16.0px/1 PFLato;color:#231f20">12,204</span><span class="pf-tx" style="left:405px;top:678px;font:400 16.0px/1 PFLato;color:#231f20">11,890</span><span class="pf-tx" style="left:650px;top:678px;font:400 16.0px/1 PFLato;color:#231f20">12,765</span><span class="pf-tx" style="left:894px;top:678px;font:400 16.0px/1 PFLato;color:#231f20">12,411</span><span class="pf-tx" style="left:1138px;top:678px;font:400 16.0px/1 PFLato;color:#231f20">13,020</span><span class="pf-tx" style="left:1383px;top:678px;font:400 16.0px/1 PFLato;color:#231f20">12,874</span><span class="pf-tx" style="left:1627px;top:678px;font:400 16.0px/1 PFLato;color:#231f20">13,392</span></div><div class="pf-a" data-dr="2" style="inset:0"><span class="pf-tx" style="left:109px;top:730px;font:400 16.0px/1 PFLato;color:#231f20">4.21</span><span class="pf-tx" style="left:405px;top:730px;font:400 16.0px/1 PFLato;color:#231f20">4.08</span><span class="pf-tx" style="left:650px;top:730px;font:400 16.0px/1 PFLato;color:#231f20">4.36</span><span class="pf-tx" style="left:894px;top:730px;font:400 16.0px/1 PFLato;color:#231f20">4.19</span><span class="pf-tx" style="left:1138px;top:730px;font:400 16.0px/1 PFLato;color:#231f20">4.42</span><span class="pf-tx" style="left:1383px;top:730px;font:400 16.0px/1 PFLato;color:#231f20">4.31</span><span class="pf-tx" style="left:1627px;top:730px;font:400 16.0px/1 PFLato;color:#231f20">4.57</span></div><div class="pf-a" data-dr="3" style="inset:0"><span class="pf-tx" style="left:109px;top:782px;font:400 16.0px/1 PFLato;color:#231f20">612</span><span class="pf-tx" style="left:405px;top:782px;font:400 16.0px/1 PFLato;color:#231f20">598</span><span class="pf-tx" style="left:650px;top:782px;font:400 16.0px/1 PFLato;color:#231f20">640</span><span class="pf-tx" style="left:894px;top:782px;font:400 16.0px/1 PFLato;color:#231f20">617</span><span class="pf-tx" style="left:1138px;top:782px;font:400 16.0px/1 PFLato;color:#231f20">655</span><span class="pf-tx" style="left:1383px;top:782px;font:400 16.0px/1 PFLato;color:#231f20">630</span><span class="pf-tx" style="left:1627px;top:782px;font:400 16.0px/1 PFLato;color:#231f20">671</span></div><div class="pf-a" data-dr="4" style="inset:0"><span class="pf-tx" style="left:109px;top:834px;font:400 16.0px/1 PFLato;color:#231f20">96.2</span><span class="pf-tx" style="left:405px;top:834px;font:400 16.0px/1 PFLato;color:#231f20">95.8</span><span class="pf-tx" style="left:650px;top:834px;font:400 16.0px/1 PFLato;color:#231f20">96.9</span><span class="pf-tx" style="left:894px;top:834px;font:400 16.0px/1 PFLato;color:#231f20">96.4</span><span class="pf-tx" style="left:1138px;top:834px;font:400 16.0px/1 PFLato;color:#231f20">97.1</span><span class="pf-tx" style="left:1383px;top:834px;font:400 16.0px/1 PFLato;color:#231f20">96.7</span><span class="pf-tx" style="left:1627px;top:834px;font:400 16.0px/1 PFLato;color:#231f20">97.4</span></div></div></div>',
      sp: {
        chev: "data:image/webp;base64,UklGRpAAAABXRUJQVlA4TIMAAAAvD0ADAG9gpG2k8+/v6At4Xnw2DLKNNH+rN3iER9gIXnHbSMr23yn/9mBx/mO/GRiUwvpzCgN00K1RCouJAUxq25ZymO2X4L6nwhiFCAQYKxAAjcfjsOj59iFCRP+T/wYAWDyoWmplsCuy7xE03+ayqjuVgn2lzQUmKQEw9+wAMMb8AAA=",
        "n_Data Source":
          "data:image/webp;base64,UklGRjACAABXRUJQVlA4TCMCAAAvb0AJAGehoG0bKYfq+INqt3tLg3EbSYq8+Ue6PzyGVtC2DZPxRzoK3cn8R+La4j9QG1Af492A1AakNgLuQZCCQWoLCrgNKOA2ApD7CKjF+x5ESq/1/0dKzQW5RwBFLSAC9TFrI4As27bbtjl6emwS3UjD5TExYkMgRcTznyCLK1P+Ivo/Abt/0tnzmLbwKVvIxlbYQLkZs7mnazbSPc8l2QoZF9jM9H+qcq7aEvX+3vlet6NvAW562YjKjNl7t87M7FLfrbLu8quI941CkYP2sird1rX1+VJhq+p4OAT5InYHUAxDDv5ssqYELgYBUeA4ozpjDbOigAiIIIgCKoCorHtdNShQxK7rc5BHewunSx6C76WM53gU772fuKATd+78JbVBbTgL50K9945DtNis+c2qJEBeOJcXgAxv8o4SuobagBxOBSCWwiVVFHSQpahgLUCvSC/v5RumzjHVd2iguOrcHMVVKJlKPZSuA07lkgFDAVSD9z7pit3rqrxvZEX10r5Fk+Lva5vT0B4WwFxjQHjDaaI9q9Nudgm1c0qXztUppXjNG6qXO6oAC+4BmTFF+mM5KBql9nC/8HAPFbGE6v3mnePNKaUUr0FiZ+bIh3DMQ9f5SRtjvIbW+1gioQ9uQYP3d+TRh7vPt3bPrADC4p7ZPVNhrTAVVr5XXnzEV3+v7/y/0ShbIQvPbiuaH3PZ2MgWiBuzuV32M23h+Cvb/ZMGAA==",
        n_Select:
          "data:image/webp;base64,UklGRgwDAABXRUJQVlA4TAADAAAvTgAFAJcEIZIkxVYe+BfyXD0RDFMP/vfguG0kR2Jf/nHe2/u7luO2jSRJNZjnZLipbyJzdHP+ySZtyJy0d5TFP+YXxs+DSgVg2RNjdgti5lUUE9OrmD+zW2X/X2zMWMSMZcJYxITxeC+35+dyfiWgJCIU1+tSVM7nF9xugecuorjfEgqoQAIKJOvhcLksikhO5wckCmQISG6XZVAsHSqX6y2BRCxOyvl6+x1jMBy4npegQMJQAEwqcLlsitIAkMG2zOFy2iABCKDBYCzCGJ/D+We+OR7/ZjeFtG3bzkZq2iYZe707a9vmcI1Z2zbGtvWTm+dtuv763PcT0X8Gbts2sm9P5hsz/99ue94x9Qf0Ady149Rs4vd39pg6y/2jiT+jp5/JDIjjP+Gw3UkOIi/e4MXDcvJ4U9niiS2Qw/dyGCpO72X9ElULFDoYRayeHCjuXc+psEEQAQGRDAkTEcukl2OddwU+5lbu7S+AAhhwkiQAZgmdI+c6xUDZAYidaaAAgBZGScaeCSLpDEenoFSA4lnSVSXogUMFhcgHh6SP5MUvXz+xrf3TB3ZeEBSkJDPLQYwhdryJgkKyiBNJMkUj2Wkka86YkZ8FxEiLSsv2A3omSFIraTTQxjNXzGxMENNm9o2mPF8TOZolW5A2X75zaWtS0BQfBYWmlFg1t+PRWmzDabefdthuXrm6U3dpV1pT4kzVvtftbKpNi9rWMU2pOSRTO1CjZoJiY8VLVxaX6IifCVSBrmtN4It3N5qoXT4kRnXve4W4smmBpjaO+NCqDZFKN1Sl/eN1SEMFY3jJ3IqyTAIfIAE0A0SDIk38UEB4gA0jR/wA2PLq5uuGDAJofHv30XZ/Q8ujh/UHm3ua9yBqGiOrqlFaUTYdyIZBM0k2nPVdQiivH27pu76Grw/R13XrR4J9LeTeJ8HrE+RCv6HRd3wYWT5fXV5RORoGYXTGvO7bt8g3IMneIHRrQbjv3pNF008fo3f/2unwZOtje/km1MUR7VxDwDzJHi1btho=",
        n_Transpose:
          "data:image/webp;base64,UklGRh4CAABXRUJQVlA4TBICAAAvZEAJAI+hqJGkqDc8cYV/Hxhgd7nHButIkpUMLl/kHxoRODxXhEEjSYrmyMH5V4n/Cz3/oZ9pf/9LvJULA2B43hveZxirLX76UoaDc4KiTgMUpZU+L0IMuDRCDLhwACEhjEAIIwTg0gBcmPcmAH8xjfsvKJDKuTQAQ4YwAH5xadqyQLpt623iHM/HN6luMHQFFIqILYOV9388lzGJUn5G9H8Ckv+x5a0N0b6WA2W7F2It27bsu26Iubn1BYmatAPEPfwP0joM2pgt7ln/NsRsWdOfRm1xN/32HjMOdnAz9M12D7GQ9fqNSefLZdgt57GovX+YAZExQFBQVEAVEEQ6KqCIdkQ7ogKIjnr58vVT8nMoZBg7YE4TNEfvxDlXQTg6b9DK+jnNd+crMI+Tm5N763N2zrpixOtHpnNT7IECqpyQIkHMEaDZgFukXtC72BWgXsjciA8fSZJkotMUOUC+rlYEhaCFt2/QZGCNsUCTz2ubsrw75+oRL5+/TnY6TqGg1X4+Al36Xc9pIEOXfrU8MTokvZOkIZvIHJERArsjzQKts+wuqEfgYKRWJH2SGGNc2DNRUZ1Op6FldaqUxjm/gX1VVTmmPjll7p3fPMtaazOmnzF6BjSZCN0Z3RndGSPft0ut5ddvMp78LhvCY/4bPP9dsf5f00rUZOBmorY795XtTqIlpi37kvISot3+KJP/sQ==",
        n_Connect:
          "data:image/webp;base64,UklGRuwBAABXRUJQVlA4TOABAAAvW0AJAGehoG0bKQf/AO/fXWkobts2Un/df7YO4iB95WTctm0g9deFbv+1DlUQzX9o2/G8xE+YBOH+OJkcz68XgJgEMUngEDMJuAQRcEnEJQGImUzP6wVhj/zjz2KP8AExE8QkCAsz3ff5syBd2/a2aR7y8bVkGLNslShDpRrxB+d/grFFKJtfEf2fgNmX5fxhsLd2P5+YD73wxsrdMB/b3/IGu4cxk7dIhgneZPu54YpZ8a6YJffmhEN/uVqb/VmtvG2qxPnNzStztgR8zhtgUVzFsvjr67j+H4KeLnlA7aYzAVypSLeMiwogqIAIKkcqR6JAfM7FxcWUrYDGRKwFWptqM+OX2WcHZR2yo4mbTb5Ew2ZzD13eBPWWQ82vp7oWaI9WQFPhwkRSiCtsiRaaIrQB34NvNSuAKTWPZ7PZbKo4QKy7NgV8nrqOY00C1g5TMJoETSL+CyG5bsMJnupcWQCblDywtH5KTUeWJ2oBrk/y+7GKYL5p1mbr5sqVQOV9Uug68gpJq+c4DypaFFVK3WgFfTY79P5gduip7g+lBGWRQ77lOeJTDEofQ1iySeEFXvJcOBZOKcKxAJzzKl7ht9Qgb5FMPLi3qNuOzYdO3hpxw3xsNt/ZWzv8nc++LAE=",
        n_Rename:
          "data:image/webp;base64,UklGRroBAABXRUJQVlA4TK4BAAAvWUAJAG+hoG0jJwf/+f7NH6WhuG3bSP11/9k6iIP0lRNt27Zxtj7U/98qKiOa/9B64nsZP8MFEPfh6GQ9P14EyAWQCyLCPhGGXAUSEYJQCCJAbgC58HqB2FG//ix2pBfIDSAjtsDKDetdfxagW9vbNnmJIuhuOk0xHWJkGe7/ApuIPX9F9H8Csl/I4X2bPtfTsGfYboVPVdbtsOu04tMN911JPh9pe/iE07+MEAjhk8rzKs9d1zGG6ceKThIxRkcdi021+VApX3TnJPI8eRaw2QOqgCJ6JgooKoieifounweDgYPUDQl4SYywt30p1LdW7cDMSqG+2ZeLvZXCpoo28TxdvJO43FVKESEE6gXSKCOwBfWMooLHuTaKPnieL7Isc2jRrSRUfdeNgD2YlZF6AvUExsuzCVMDW8wbM0ueqydXdJKIMXoW7PYQF5x36X5b7H2PuFPW2edUrVTx1guk2lAYqPYUezCXNArjtwuBEF7CqBmxKx9t3KPV/mbvYlZZtXq7txS8OS/OcX6E9/uH1MrnIz334fPZHLqG7UY+FwntsCsbHtPn2t4Ns19I",
        n_Pivot:
          "data:image/webp;base64,UklGRpwBAABXRUJQVlA4TI8BAAAvSEAJAFehsJGUaCnffvlBbUNx27aR+uv+s3UQB+krJ+O2bQM5vy50+691sJ1o/uMvO+ymvBSTcX8cTNb15wZMAVCFm33EFR8BCGKKD1zxEYBZmOz2AbAjf7057AgvgFkABFEFC7M47wPjzQJ0a5vjJB+dUboCgQGDOkKTbnL/d9jduP2M6P8ERH/d+Na0Qb/HI3FzIoRMxyYeet8jdLkNtRQcNSMIv/2PKb1XqB++B+XACmUMVmFxptCMB8NS1QuMHZ1wtvaSAcZ8ocnEmFjZwniD436WW0FVL0N0dzxlBxQOREQAiABmADzt6fE5yYF16Oq9zshLiFBNgN2RqjpOfOvPE7rNZrvdLkEimHLgzJ0gghcBt2wtIIrMYWL7WAwzvF536KU1CgvNAa7nPHePKIrW26EvAmjqUpQ7IJkVDc6ga8/mC5myBMQCYtejuxcR67EQ1TuArCuVQb48r8K+FBFDk5YkQp+wmHqvYCUEOCvkf5WGgqORmwRnXofixlBQJE08FMVvbdDNRxz9dQEA",
        "n_With Columns":
          "data:image/webp;base64,UklGRjYFAABXRUJQVlA4TCkFAAAveEAGAO/mOJIkR8k5/P/ip9ZQSB8gNpKkSIq689/Fs4GeYRJSI0mSJIsubsufyb7nKp9/tWkbMHhNfaNa+cM5fnwFIUWFOIcokhnLHgMbYwwzIDbMjMP9gwRSEBFEQkQgRaX/efykIMHJsyjPrnD7QJAgSFDCd5VldT2WHfv7iwhcInTScn1LEKQgyXdVMuPyggQikkpFtFxfkBCUQRIEMSoiub4SvqMbiji/rkAECT86Rlkuw+P0/BAhIRNP6X8u718ikEBIQcKc4/T2QQTDFQwNV3J+JBDj/f57hMxmjB6N4+NNkGBwFWOmx/H5EQghgRHMgMlPIMQYs779YSqb5z8HtQGADMnV6swkj7Ft27ZtPb/YdnKIbdu2fdrYf2a3Z2J8rK7q6orovwO3bRxJ2r5XlHlG7Of1HX5Ov9fU2Hv/yVflJnTu+v/inq9JO0I7Nh7u+docDSpP7FeHve/A8/VJP9I8cMf7pUGI9DHEKZAj40RNT8nN9OTxA7Eec/A92fRRcyF+4gUjQnwS44KXkB539PQ5WKIU1NoyAhs9+Lhkev+Q7iH0gWtCSp77TRySsp6EDxp7Ry0mJFoyGhs9DpeQOh4hETp/yUUkQiRnkesFkUuxI8UZiWofhYkzhhwThBi9gIhoEVMIIqV4RkcvUee+SFRyIY38Q40/VZqc9lq4dkYpZ8RIdluO94su3ws/Ngq+MPwwhF28aqE9xT7loDh9m4dozY2iXuq9j2b3JTpJRA9LeUmpLXpwK8CqbQpMNHoUvUcffZBMD+PjwjxmVtIyGtO4A2NHay1MjaxPreGm14tywRtbm3hp9UgqZKn2VSJfRulSRZX0BVu9SiBRqTJeptHsK16YuFghNmwtUxlmLuUtWoqZvbaQesXEj+NM/Bv9OoPDEtumPHYxM1PKWAYlhpiZrwP3T/lzFbOtwyn9ap+xZ2d4LWw/PU6NIlam2bbdnirHYzWv0sSLNMP67af+2r/uWjneJrL9WhE2RsY6JuGMeBv3Fl9n+pmFmYMtRKeEG0I0fyTCLCIsKXN4Q6eC1wt2PSW8qh83OyvCwTpS5pYwlw2WYaU6RYtMWMVjLYNmSRnPeoy/bkY5nml822f55WiX5vt9LM67YHyCFZEMv6o1MvHA+MkTDFtfh6BfWBS7nsVbwjsGpMwRSbPSnIT5aQUJBMv5JH9meVECDxmRuhd4kpb08SIpE0T3l/JBkbEpssOI7DQFzm/rLxwQxWCCiCTqHD+IAAi3hEnnUlK1NuOhVTb4QQBAIO/tOekif+843zwgKf2hlRWAnIp+yKroB9gxOZwGcqU7SIvDQJMgXYOkaTADoOJTP+hU2NE/lGcl0G3jjgAolfA0UWudrDkCBBDwWSuYshwQIG0KtMwGQOUOcNez7gB5750HgPSBqM8D4NOKANkCAG1uDkTQK/NNmgs4Lx0na2QLeXcSLB8EVXIAJ6firsGAOwdgpUC9IwCIAADZyUkhzCuMNIhonreOmLIcEXHZNGybjZHo8J97BjGwSyOa5YPw54vH5mNOlUjMroKI0FPfuat7RPy+7JjsrhwxdUpk1Yu7Zak1K4ZhFYrEKemRO4ei2TW48q6Nl4eEp0M0+CxXcmJugOxIY6KMMdTO/LenfnVd7fi/pv1z4yq+5w9+dU8xBn5RMgCMw2pKlzOMHc9NlUgXX+WG5Dz6p5ehHmbmSw34tz0vXjHbqqYhRUexYTaGhcWwYYeORlZKjDCLsDPEOHvEmahWGEeOS/0rnVsDAA==",
        n_Stack:
          "data:image/webp;base64,UklGRuYBAABXRUJQVlA4TNoBAAAvSUAJAHehoJGkZpGP4O90TKhtJKlZMvqvjTrQu8gBgrZtk+mYzp/W9W7L/Ndhf2d+s7AKIgFiPyz4PWYCJBIgkdhA9dugIZEG2kAlQBuoxAYg0QCJxJwF4hePtt7iF/P2BRAfotHPBWW9Adm2bUuJs/TUsShBuTbE5sbm2HANRP///4QrKcyo14j+T8DwB5ycq7rfx6QlqQqh17KokqbjnN6vzk219E+qFt5g/RPLpu9CzbzXdyArSyENK+1dHuY05uZ6Zl5o1V0ZoZvdRjvQ8E/SsNImWVkaURap/4XYS/Vr91EE5Oae8jAnMrvyPG4QfRKVJo0bPCIyUF9qZmuBrE1rB4zDn7Bkd7VScMEHpzVyKV64RxTlFHRnCpnN28jDzSuZAV9gTkoF0ZrfBXGPzwjUewVQMyU63VkT45m5rATQ2na8MBxGCEzCSmRlKUgU47JBbZPv3Ljlq9TuglfILcxBttY2WcLKk11huoOdk1uKqNZMSumM3ByowDI42vV6u5ki4bqUsNt6xyRYmGgNxa47tCgzyKwQokV4FuCDxg9e7gDUezPl+3cCk5Q+dtTTH1Il/ZOW86p/y31TUi2lX7KqkqZhcqj7XZ2S4X949LiP3sXfweDxHQA=",
      },
    },
    8: {
      img: "/images/home/final/product-film/plate-08.webp",
      html: '<div class="pf-a pf-logo" style="left:44px;top:28px;color:#2b2b2b;filter:blur(.4px)"><span class="pf-mark"></span>workspace</div><span class="pf-a" style="left:1702.5px;top:24.5px;width:33px;height:33px;border-radius:50%;display:grid;place-items:center;font:700 12px/1 PFLato;color:#2a3440;filter:blur(.4px)">JR</span><span class="pf-tx" style="left:1748px;top:35px;font:700 14.0px/1 PFLato;color:#3a3838;filter:blur(.4px)" >Jordan Reyes</span><img class="pf-a" src="data:image/webp;base64,UklGRmIBAABXRUJQVlA4TFUBAAAvD0ADACfDoG0kR859f2LPH1El4aCNJEcq9+f8DJ4/yJcYtm0bhvK2j/d/5r8O1+8PSTGOKRTQGRsIoSUZA0hlOkICKaCl0uCMDRTTcc7vp1Bguz3m02zP17QALKfHjZA0MnVgOg7AvAD52QLA/4zjQEsBOhXLvxcKBKgA/EMFCkgKuCMoBQCCJMmmrWdb38Yzv59tW3PO73tn/5u4m4jov9q2bRiXtSRnqCoARWWGomh5kERSggFIEhJ0WK02RwLouFquD7SZteud0eZ8Wo1bzfb0sGhGH9P1znTWLibvo835JHbhDyV+S+XveDAQiY9mn3duh++9UHjzOj0PX7NlIxOxm2yvzxaT/TLbXB4H5VTIatDrDNZwujo+iU3/L3tlMRrM17niYCdA22Epf+ty3uQrgy2B8X8Y1X5enj5qY80MyMO812x2Z3uh/Y8Z8rzTniXAzAA=" style="left:1841px;top:34px"><div class="pf-a" style="left:0;top:0;width:1920px;height:992px;clip-path:polygon(0 0,1920px 0,1920px 140px,302px 140px,302px 992px,0 992px)"><span class="pf-tx" style="left:44px;top:127px;font:400 16.0px/1 PFLato;color:#6b6b6b;filter:blur(.4px)">Pipeline_ClaimsQuality_MonthlyTemplate_2025</span></div><span class="pf-tx" style="left:341px;top:231px;font:400 12.0px/1 PFLato;color:#231f20;" >Risk Band Columns</span><span class="pf-tx" style="left:349px;top:351px;font:400 16.0px/1 PFLato;color:#034ea2;" >age_band</span><span class="pf-tx" style="left:616px;top:352px;font:600 14.5px/1 PFLato;color:#231f20;" >{"type":"function","operator":"bucket","bins":[18,40,65]}</span><div class="pf-a" data-row2 style="inset:0;opacity:0"><img class="pf-a" src="data:image/webp;base64,UklGRv4AAABXRUJQVlA4TPEAAAAvQUAGAN+Apm0j5fgz/fnTNTQMso1Uf8pH2BG8wrZtG+f/e9PhDM1/9DSzAjizAliJHPyVZRErwCoRwJV3CbACbJZgBlgBJMl24zafhJGBpJQEgcZ//5OGglXMyruI/k8AXsTSJPBlXcVkZjZ/dt6tYLJLvcV5pKuN3QJndy8AZhqcl+WmM/SRc84Jzu+c1cjSe6hWUlXTLTIrIoqucwaAyiN1ALyRGPE5HCwjSJPQr5lpxDiP4DxS5G+J/YxxhhTdK2cbQWbFfULKCPGnZKdhBGkSWtzdP+Dc3VfS0xDOI0W6BU6SpxdgkDPwX2VWvB4BAA==" style="left:1148px;top:398px"></div><span class="pf-tx" style="left:349px;top:403px;font:400 16.0px/1 PFLato;color:#034ea2;opacity:0" data-r2n>risk_band</span><span class="pf-tx" style="left:616px;top:403px;font:400 16.0px/1 PFLato;color:#231f20;" data-cfg></span>',
      sp: {
        chev: "data:image/webp;base64,UklGRmIBAABXRUJQVlA4TFUBAAAvD0ADACfDoG0kR859f2LPH1El4aCNJEcq9+f8DJ4/yJcYtm0bhvK2j/d/5r8O1+8PSTGOKRTQGRsIoSUZA0hlOkICKaCl0uCMDRTTcc7vp1Bguz3m02zP17QALKfHjZA0MnVgOg7AvAD52QLA/4zjQEsBOhXLvxcKBKgA/EMFCkgKuCMoBQCCJMmmrWdb38Yzv59tW3PO73tn/5u4m4jov9q2bRiXtSRnqCoARWWGomh5kERSggFIEhJ0WK02RwLouFquD7SZteud0eZ8Wo1bzfb0sGhGH9P1znTWLibvo835JHbhDyV+S+XveDAQiY9mn3duh++9UHjzOj0PX7NlIxOxm2yvzxaT/TLbXB4H5VTIatDrDNZwujo+iU3/L3tlMRrM17niYCdA22Epf+ty3uQrgy2B8X8Y1X5enj5qY80MyMO812x2Z3uh/Y8Z8rzTniXAzAA=",
        edit: "data:image/webp;base64,UklGRv4AAABXRUJQVlA4TPEAAAAvQUAGAN+Apm0j5fgz/fnTNTQMso1Uf8pH2BG8wrZtG+f/e9PhDM1/9DSzAjizAliJHPyVZRErwCoRwJV3CbACbJZgBlgBJMl24zafhJGBpJQEgcZ//5OGglXMyruI/k8AXsTSJPBlXcVkZjZ/dt6tYLJLvcV5pKuN3QJndy8AZhqcl+WmM/SRc84Jzu+c1cjSe6hWUlXTLTIrIoqucwaAyiN1ALyRGPE5HCwjSJPQr5lpxDiP4DxS5G+J/YxxhhTdK2cbQWbFfULKCPGnZKdhBGkSWtzdP+Dc3VfS0xDOI0W6BU6SpxdgkDPwX2VWvB4BAA==",
      },
    },
    9: {
      img: "/images/home/final/product-film/plate-09.webp",
      html: '<span class="pf-tx" style="left:166px;top:23px;font:700 15.5px/1 PFLato;color:#6c6c6c;" >AGENT YODA</span><div class="pf-a" style="left:25px;top:19px;display:flex;align-items:center;gap:7px;font:700 19px/1 PFLato;color:#fff;letter-spacing:.01em"><span class="pf-mark" style="width:21px;height:21px;color:#fff"></span>workspace</div><span class="pf-a" style="left:288px;top:15px;width:149px;height:29px;border:1px solid #7a7a7a;border-radius:3px"></span><span class="pf-tx" style="left:297px;top:26px;font:400 10.0px/1 PFLato;color:#ffffff;" >Regional Care Network</span><img class="pf-a" src="data:image/webp;base64,UklGRmQAAABXRUJQVlA4TFcAAAAvDUADAFdApG2bOiubghNp26bOyqbgRNq2qbOyKfj8x7YAAP9VKlABMIlt28p63wxPEoEIRHgahSYCLbD4S1ZoENH/9HPByt0J5pWOEzHejvnsIBrYfAUA" style="left:415px;top:22px"><span class="pf-tx" style="left:1826px;top:26px;font:400 10.5px/1 PFLato;color:#dadbe1;" >backend online</span><div class="pf-a" data-ring style="left:0;top:0;width:660px;height:660px;transform-origin:327.5px 353px"><span class="pf-a" style="left:320.5px;top:224.8px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:360.0px;top:231.6px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:284.8px;top:236.5px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:250.2px;top:246.5px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:393.3px;top:253.7px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:220.6px;top:276.6px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:419.8px;top:277.5px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:207.9px;top:311.3px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:442.5px;top:316.2px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:446.2px;top:349.5px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:204.8px;top:350.5px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:207.5px;top:387.2px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:445.3px;top:392.7px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:426.2px;top:424.5px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:221.5px;top:427.0px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:250.5px;top:448.0px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:396.6px;top:455.4px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:285.5px;top:465.0px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:362.4px;top:466.4px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span><span class="pf-a" style="left:320.0px;top:478.5px;width:3px;height:3px;border-radius:50%;background:#d0d0d0"></span></div><img class="pf-a" data-hero src="data:image/webp;base64,UklGRj4FAABXRUJQVlA4TDEFAAAvx8AOABfCNpIkJ/P/yHkflwCJXrtrkgKbRpIc1ZmJjz+bp/Sbvlm2kSTFmXvWJ/9YSIpzQdr570HarxrnfVw10nbV+G17PwXWSAEE0xDcDYEBmFsKIGSgb2Eg0LcwEEAoQMM0BhBomFYggpECRowc15a26f0UgH3PFfieaz+LkQIMBW3bMC5/4t0BEBETYDJ3dZB4XIJr223jrEKOYsW99/r5AEqcz5/9r4r8pDVFdioQ0X8HbiMpkvcYs9B3f5Bk204cSR+lcZGGlE2UFhOM2P+2jCScJ5pqBxH9d+A2kiLlmFPdA3tf4P9hly3Jtyg845blbUGo3+ELUyvCx3smA7vPPYDeM3eePpA39+D1Tzeu7aRJG3gGwod4HpVrF/HMXO1DHJoJ0ZX4cVRtafwPrlbbNTMqugIPpAScp081W6rb1FscPlFOKlIbFm1B1iQke4+GXjbkESJoOVHixMMbTkIqSjsrZ2M2YBQVgY5Hkc9EdU9Ye/+BTVFBKnPeawK1QUxYIvWCoEsDiGlkQOQ9BSg2FYJUdYQQCxeiNrAJmUhjnfl0zgo6LcqC0B6DgFQlImqvxj2BxxtYlzePWio7b6iwcxu1gSghBrVht6ANo1UZSTcQbmrgOpD5OLQzWAcpjyEhmd6n4b7bJjOiXuJACrajJtrVZDYgaBCNXkFxh4olaLqlIliLbRBNsvQYFmw8Tl9DvyDaJm9YWZ0C3KT9rnpWne2TTwMPICvX7TTf8dFnRBCLS8Zq5cmDER+1TpM5rWq4iilFQrBCeqKqk5q7esA748JD4ITIw2iKEIDIBmeNUu15Cm7+0RmyKVZCtjo+au4KqF/jDjhrwyV6r4mA9JR4U8lJYpq8IU1wRXPGp7NZTB4EVAcG+Xg6qIaC6EyKJyDPdCMOhGb6fZEdkSYrh9JrwSmLO4MvoN6/e29pZo6kJ+AedGZJovtKSP5C3vJtRg/whwipMdFWoHrrad3UFy1N/TWw7GImkCq0F40BeTTGPuYcgWLKaZosBNpyCtim5MnB/45TL4VlUTJ5hNjiaWbFV4SmuSMk5ug8bcx05EfjHbaEWM2bHX1JQa9rU37OAjKpA6BkNuZFhbhpceUg6spxymb/daPV/gyYw8fLpZV2bcfmFnXXQ0wDtSrXor3oaXzza1gSyq8BQZD+Ik6t/+d6cnnehxCpnyCLuJTUHdE3GGbRmVnwfY79cCUk0WDYDSWm1n0AwfOzN8z8AYon6HiPU2Sdfl9OcnA4qwwV5/TcsvPp1vHJ1DnxnARIyotL6NQvrSEDokrv+PC+nKNRJ1rE96m6CZdoCHBuDIB80DMA5o6bA0JZzZwkReUBwLfUOIb1vvLJ34xI04qgyh2WskOoC67TouSCxDVEcdNcPfutYyLh5kChUydFRpy/oNbGJvQPjfvyd1rh2zVWka5bQB+ki0xvBRtmuk6mVtSBK5mkoKfWZKA0OtgMOqmCcIPykcxsuZhlzqzMMIwLKp0UpIlYKgUWMYyWnfRmDjwnbkdWBibAMqnShnWSlHVWSm3Y6yQewtGinRGGegOZQ3oApwM3MjEp4y25ECTv/fI8qofUyl9Rt2PWukE/rMcvEecv0VMFZRSPqY5gIrE/KEsl5X5OZuiLpOhasxCEvbmKFfK8Qd+H7ppNTDIKxSRi/bYKc28rKr8+T8DJP1RAcv9vwCDz668jReeaYdy+BqCKuYxJP/VFTKjT/61KFTruwGLbrNucHnS1jHD2YYp1rVfFWu7ooj75KS/trl8E6/gv6MIA" style="left:230px;top:320px"><img class="pf-a" data-sgt src="data:image/webp;base64,UklGRoYBAABXRUJQVlA4THkBAAAvWcAEAIV02tYsScI4Ap/ABxACIRACARACKRAAUQApEAIB8AmEwEXJenfP42dE/yeA//Ep23el8jUpJPVv8QKE0rdEtHIb39ID6Cdf6hpczQE3sJztkrJfLGUDLGewGX4FLGfAHMsOWMr2mmnXy5CDBmnvLU2mtiRLIUUlbSl8627AISkSWaekhocU/hKHtIc/McMsllUVujIRxrltbrOMRbj7CopO89iWtZLvoMspvDHfQmFPLFiTqkxTyjprvSmdGgmIAGbQlaCpZh0wRdfIvHkqPUoRaycs9tJB1RxjDPcpLXvilEN9xm9S2GsFuD1Tdi0GFr0mSOrc9676RFeGrvwI/FB7qWq2rqCpl65B15pnJWnP2Z25az4mrfqhTOySL0krlwge1epN9SW7bWk6dkp9DY7oY6ml3cephZ/SbvSt3aBJ54US0vQnWkidd7pxNQNMDVzHXMAZgDlXNwAzHprxvBufX5pzhzfFXLvwu5bjyIC3oxn/zgA=" style="left:280px;top:530px"><div class="pf-a" data-sg="0" style="left:192px;top:566px;width:266px;height:29px;background:#2a2a2a;border-radius:2px"><span class="pf-tx" style="left:10px;top:9px;font:400 13.5px/1 PFLato;color:#ffffff">Which providers share the most patients?</span></div><div class="pf-a" data-sg="1" style="left:151px;top:607px;width:348px;height:29px;background:#2a2a2a;border-radius:2px"><span class="pf-tx" style="left:10px;top:9px;font:400 13.5px/1 PFLato;color:#ffffff">How are Northside Clinic referrals leaving the network?</span></div><div class="pf-a" data-sg="2" style="left:160px;top:648px;width:331px;height:29px;background:#2a2a2a;border-radius:2px"><span class="pf-tx" style="left:10px;top:9px;font:400 13.5px/1 PFLato;color:#ffffff">What do high-risk diabetic cohorts have in common?</span></div><div class="pf-a" data-sg="3" style="left:176px;top:689px;width:297px;height:29px;background:#2a2a2a;border-radius:2px"><span class="pf-tx" style="left:10px;top:9px;font:400 13.5px/1 PFLato;color:#ffffff">Map the care network around Lakeview Health</span></div><span class="pf-tx" style="left:73px;top:817px;font:400 16.0px/1 PFLato;color:#a5a5a5;" data-ask>Ask anything...</span><div class="pf-a" data-thread style="left:56px;top:120px;width:538px"></div><div class="pf-a" data-sel style="left:0;top:0;opacity:0"><span class="pf-tx" style="left:1123px;top:94px;font:500 14.0px/1 PFLato;color:#e8eaf0">BlueRiver, </span><span class="pf-tx" style="left:1188.2677307128906px;top:94px;font:700 13.0px/1 PFLato;color:#e8eaf0">Northside Clinic, Dr. A. K••••</span><span class="pf-tx" style="left:1380px;top:94px;font:700 15.5px/1 PFLato;color:#00bfff">+1</span></div><img class="pf-a" data-an="0" src="data:image/webp;base64,UklGRsQBAABXRUJQVlA4TLgBAAAvL8ALAFehJgCCBtzy0j+r2wyK27aNo1J6vOoM0CBo27apeNs//wlKucr9KD81ACUAzyDxjN6Q9EDjP0iGUQDA6AHTA4lnwChAtm3bTiJRgIiRvtMcKwf4/z8U8d5OzxH9n4Ds/zev6lkTCMv5uPoNqjoYHCajNNVcxHkRL69FrvNIRaN3fXr5bruu/X47bHs0RZQyuN1/doPf9jeaUYQywPaze/htC2H0UNHAqe0i/pwgFA/kDVy6yBdo8mE1XLroF6gHFXDqEp6gGjLHtk3xs8V8QAmvXdJPqO5NsO8S71DfC3hP9YmQ91XYdsnXqPrGOKQ7oe6b4z3dFbO+Jb7SfaPpC2jT/SD0Qfcbwp8S0Kb7Qehr8JXuG8u+GZ7TvWLRV+OU7oBxX4VVug2qvqeAz1SvCNndGrtUO0zvVfCZ5g1G97I5Nm2KdoNFNrCCY4ojFEOyGs7xzlBng58aOMc6Q5MPy4oAxzZGe4SmyB4tA2xeH/vYQCizx8vG7e512MfObSizmEVzw+bw+t12Xft9Pa30NkUW96nuiVjnWfRiEWNRZUnLaRgW6ipLX40Xy0D4NaurPPv/BQ==" style="left:1090px;top:431px"><span class="pf-tx" style="left:1084.0px;top:486px;font:500 14.0px/1 PFLato;color:#e8eaf0;" data-al="0">BlueRiver</span><img class="pf-a" data-an="1" src="data:image/webp;base64,UklGRsIBAABXRUJQVlA4TLYBAAAvLAALAHfBKJIkRbXM6N/PCTkH/BwbjNo2EpQQ6CI8Okf0GOz/WraRJDmZ8V7Aq/yDIRcykCY3/wHsaZTqaZTqacbpehqlepqeRqmexrw/JWIzhkTGEJcpwLC6oGIzBSCgYrP9L7sLKDUBCUjLrnuRheternuRhfM7ycLxHBCg3w9k2bbVNhLOpoScsy2puw56DrKZ/wRBvI6/Ef2fAPPPOi1e4sE/XsVEa+iEZLFjDefhx2lXdiF05fpWg7hs4wdUy5C8rkDGeaynXobe65p2lsPCuQsZ31ew/WZwDJmPYPuMPceQ/Ug77iGcg+KVR5qj7jTeNS5lLGyC6pJ2mGCpgnKFSxA2WkskNqEO6t9MIwU3vQtfkScbvR2vyJ1Sb4FEWjq9N20Ewi8Iv0dLp/emjQil3oJH5MlWb80rUnDRu/EVmfKt1zCJGGGptUZM3FFpVdiEYctSZ4OMEoyj6TQ+Dc4kPzhrXBCTPmo55DvgRz2MhUOuA8xMbwvnLsfnAtZknLc0m36rBm9N1pFAtUlbVfAYmdxOoLltyk8In3J/+gneGcWRFZLFDYzypHg+PHh5FlPzXwg=" style="left:1196px;top:433px"><span class="pf-tx" style="left:1187.9px;top:486px;font:500 14.0px/1 PFLato;color:#e8eaf0;" data-al="1">Northside</span><img class="pf-a" data-an="2" src="data:image/webp;base64,UklGRqABAABXRUJQVlA4TJQBAAAvLAALAD+hJACjaLz21oAI9NdUQZ3f2dVQ0ABRBAmOBkawkf0T/DgQRLKN/QmcBCLo30oD8x+AzieDoMe+z/9BMADJiQyCDEIuEAzKGNRDBsEgF3q8sVGhQoVK1NI4qEQtjeP2q3GcdlCBbNu22rZixZxU2UlkxQGrl+j8/0eCOLe+RvR/Atz/YT9vKiD7NndW90XJ1qm1WARO1cdXiDF81a8edCnW7vDUxOz6CbQtMwq+iYdrjwwlRqhCLBgqGI8NcI6FLzAeaYVzLH5B2gNKFQ0r9rwFHyyCZ81plTqaNsg9Y+IxGj+zZihXqwZNdfho/kCfmHm1q5gTG1e7T34SO992NzQhBLuAJCD+gvB7CMEuIAnl2+7Gnth4t6v5ScxUdq/MiZ6TnadLOKWxqlGXXnmxemLKuAuNTY22GW7FB4vgWV32TmXxhrr8VjiXuyDtATfBudQFBnd4giqUCG8wuYKD4K/HGo9Mrmir8FjnNY+wt670quBf61uIMdw+qhPI6gzbScnW9e6Mu3nbBUS3uXf/qg==" style="left:1084px;top:533px"><span class="pf-tx" style="left:1066.4px;top:587px;font:500 14.0px/1 PFLato;color:#e8eaf0;" data-al="2">Dr. A. K••••</span><img class="pf-a" data-an="3" src="data:image/webp;base64,UklGRroBAABXRUJQVlA4TK4BAAAvLAALAHehqJGkqOdPBgUowL889sKEmkiSotmYqkUBCvAvBRMQv9EyiiQpUjXXs1GAAvxrWgHsi3P+2wC0TRLbJLFt18o2SWyzTRLbbu8kOa35YH0hUClAVIo3PglyDvDkXuBByD0RxBoI8kzwCMSZCDhTAoJcP3hyT5Bt23baVgpHNfXIgRVmtvX/PyhZp73wGtH/CTD/h+OskBrqqshGWv1ciBY71MhrWOzO78b75n3bzEDyZMMKVk8ffVuBDNPYmtnTd77NcJMUFvaNT9juwXabwNEnPoHtMqw5+uQn3LCDsPeKe6q4nFmj0c7IY4bC1as+cf0Iy8orr8kjhLvWEwmNmHn1BeNAxkZvz1eg5K53oQh889J7IQFHq9fiAuB/IPwOR6vX4gLCS+9FFSg5690oAhl7vS1fgTFLvTmjgBEeWjfEhHPWWitsRN/x0LkhgwiTM281mjm5ia7YaxwQEz9wHNOdqAcdjIVjqhNMTGcL+zZFcwBrEk4d83u355zamqQDgdU17rmCamBS5wLz7fXTeN98zvsF1LlRHFghWvKeUR5lZVVDLWU2Nv+q" style="left:1196px;top:533px"><span class="pf-tx" style="left:1168.0px;top:587px;font:500 14.0px/1 PFLato;color:#e8eaf0;" data-al="3">MRN ••••4821</span><img class="pf-a" data-pop src="data:image/webp;base64,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" style="left:985px;top:196px"><img class="pf-a" data-zoom src="data:image/webp;base64,UklGRogBAABXRUJQVlA4THsBAAAvIAAYAFehIAAZBvvr31cNhZEkQ7t3hz35B/vDSJKkRIU7R/7/SWdl/gPgNCeogTBQRcnQCAUfl4niMyUjEPVHCmkJAZXHNAfHMfBKQFQ+8lehratFClgJPky8IqpbNtG7cCVD86guo1Pyiky8EsC2bbeNctPARtN7F6SMGP3/H6ZJdN4i+j8B8J7CfQagOJe1+bGYAkW5SmCdLMslcFzCc/UK1IlLUgE1fOufSRYyr4MevrmLiDz0ISIXK9Z+tkpDCFe9hhBSq/ZBDxj+JQUKXuN/VTPf1t63Bd8fGDGHjsgXMjlow7HjmRvdGuS6xdDtez6ONB+UK42LAlDTRMSmWQBi0N6oEkh1jYFj5iKEKLKwM/1wxBwQmSd2G1UCqa5tIo/gMI4Uw5XGBaVBpGEc3mS3yTueN7sHwwC3u1BHFDmkJsa/ib1va+bbgu8/xkX6L1as/WyVhv7UyvZvpUxckho4r1yWJ6Aol4lZsipfABTH2rw8F09w/xoAAA==" style="left:1563px;top:831px;transform:translateX(301px)"><div class="pf-a" data-det style="inset:0;opacity:0"><img class="pf-a" src="data:image/webp;base64,UklGRvAAAABXRUJQVlA4TOQAAAAvAMDoAM1FRP9jASSE/9/1AR///gc+A7DAqW3btZJDRY8I/ItARlJAHV/7Bcxq/YqtYQIiwmldgoS+hSRHZIlIaBHJIgQJIdLaFUdEEKIlghpRNEkLQSKEECRHLa3YP1rSJEgLCSJyJEJaiBAkmgQhEoJEaCHE/1paJIQWkZZWkyCSqSWZlEUQxjAYZg2bzGDWMGt9gcG5YbDFGGYNa2vWLGOGwRhmsMYaZjo3bYxpxrI1azBrODesMcZgMJYzzLE1jGEwDIMx1qw9ePbohpN89eITZjDDNNYMY46nH4xh2CUb1hg=" style="left:1594px;top:60px"><img class="pf-a" src="data:image/webp;base64,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" style="left:1600px;top:130px"><span class="pf-tx" style="left:1622px;top:176px;font:700 12.0px/1 PFLato;color:#ffffff;" >DR. A. K••••</span><span class="pf-a" style="left:1708px;top:173px;width:61px;height:17px;border:1px solid #b24dff;border-radius:2px;display:grid;place-items:center;font:500 10.0px/1 PFLato;color:#b24dff">PROVIDER</span><span class="pf-tx" style="left:1632px;top:212px;font:400 12.0px/1 PFLato;color:#66bb6a;" >NPI</span><span class="pf-tx" style="left:1632px;top:266px;font:400 10.0px/1 PFLato;color:#66bb6a;" >REGION</span><span class="pf-tx" style="left:1633px;top:232px;font:700 12.0px/1 PFLato;color:#e8eaf0;" >••••••4410</span><span class="pf-tx" style="left:1632px;top:284px;font:700 12.0px/1 PFLato;color:#e8eaf0;" >Midwest · IL</span><span class="pf-tx" style="left:1632px;top:338px;font:700 12.0px/1 PFLato;color:#e8eaf0;" >38</span><span class="pf-tx" style="left:1632px;top:392px;font:700 12.0px/1 PFLato;color:#e8eaf0;" >claims_2024 · referrals</span><span class="pf-tx" style="left:1632px;top:446px;font:700 12.0px/1 PFLato;color:#e8eaf0;" >Referral data current through Q2 2025</span><span class="pf-tx" style="left:1632px;top:514px;font:700 12.0px/1 PFLato;color:#e8eaf0;" >refers_to ×38 · shares_patients ×212</span></div><img class="pf-a" src="data:image/webp;base64,UklGRm4AAABXRUJQVlA4TGIAAAAvCEACAG9gkG3k4A5gJ/An8ArbtkFxYTwiAdIcEZs25z8AG2rE/0Ho2NT1bGo9EFoBDIFNbFtxLk5o6VBBv+vAAEkMRNKmg5nn5ouI6P8EYOYEfiswpZtfeqxLWvitAHE4TA==" style="left:1090px;top:973px"><span class="pf-tx" style="left:1105px;top:975px;font:400 10.5px/1 PFLato;color:#848484;letter-spacing:1.0px" >PATIENT</span><img class="pf-a" src="data:image/webp;base64,UklGRmoAAABXRUJQVlA4TF0AAAAvCEACAF+gIG0DFnXXaNu2uY6atngG2UaOHUINfgg//0HWMP7P6NIebtp0MQywiWS7zYmJWnUZgBzQZAjuTcK9EWgevQ8iov8TgNkb+KHALb180m890oYfChBXhwkA" style="left:1161px;top:973px"><span class="pf-tx" style="left:1176px;top:975px;font:400 10.5px/1 PFLato;color:#848484;letter-spacing:1.0px" >PROVIDER</span><img class="pf-a" src="data:image/webp;base64,UklGRmgAAABXRUJQVlA4TFwAAAAvCEACAF9AJECas0vGLEG2beoGNZjBFbRtw8L+bf4jwxLY/2BWq6ysIBmVgE0jSY76mFx4ofl/AJbH5z5/KB7GSUNvQUT0fwIw2wZ8UWCSTn7psg5pxhcFiKPDBA==" style="left:1243px;top:973px"><span class="pf-tx" style="left:1258px;top:975px;font:400 10.5px/1 PFLato;color:#848484;letter-spacing:1.0px" >PAYER</span><img class="pf-a" src="data:image/webp;base64,UklGRnIAAABXRUJQVlA4TGYAAAAvCEACAGegtm0bNmWntykE2baxIczgQ7jCtm3bVPZO2vkPAEMVmv8Xmq3dCkBX2RoBrgkVGEWS7WS+k3/9/5QFkNxECQhADAIwALWynoiI/k8A5tDBfwqc0s0jvdYlrfhfEdLiMAE=" style="left:1302px;top:973px"><span class="pf-tx" style="left:1317px;top:975px;font:400 10.5px/1 PFLato;color:#848484;letter-spacing:1.0px" >FACILITY</span><img class="pf-a" src="data:image/webp;base64,UklGRnoAAABXRUJQVlA4TG0AAAAvCEACAH+goI0kZY/pyb/Zt6GwbRsUt2M02rZNUIPC9v+rm/8AaC63AfH+fMJtptMdENPpDgFmAp+ZwCa2rTgXJ/R7jwBaLFAhByTEQSQlQpjZRUT0fwK45gi+j0Ab4+Uf47s9Y1RkHwpSEVwBAA==" style="left:1375px;top:973px"><span class="pf-tx" style="left:1390px;top:975px;font:400 10.5px/1 PFLato;color:#848484;letter-spacing:1.0px" >OTHER</span>',
      sp: {
        ddchev:
          "data:image/webp;base64,UklGRmQAAABXRUJQVlA4TFcAAAAvDUADAFdApG2bOiubghNp26bOyqbgRNq2qbOyKfj8x7YAAP9VKlABMIlt28p63wxPEoEIRHgahSYCLbD4S1ZoENH/9HPByt0J5pWOEzHejvnsIBrYfAUA",
        hero: "data:image/webp;base64,UklGRj4FAABXRUJQVlA4TDEFAAAvx8AOABfCNpIkJ/P/yHkflwCJXrtrkgKbRpIc1ZmJjz+bp/Sbvlm2kSTFmXvWJ/9YSIpzQdr570HarxrnfVw10nbV+G17PwXWSAEE0xDcDYEBmFsKIGSgb2Eg0LcwEEAoQMM0BhBomFYggpECRowc15a26f0UgH3PFfieaz+LkQIMBW3bMC5/4t0BEBETYDJ3dZB4XIJr223jrEKOYsW99/r5AEqcz5/9r4r8pDVFdioQ0X8HbiMpkvcYs9B3f5Bk204cSR+lcZGGlE2UFhOM2P+2jCScJ5pqBxH9d+A2kiLlmFPdA3tf4P9hly3Jtyg845blbUGo3+ELUyvCx3smA7vPPYDeM3eePpA39+D1Tzeu7aRJG3gGwod4HpVrF/HMXO1DHJoJ0ZX4cVRtafwPrlbbNTMqugIPpAScp081W6rb1FscPlFOKlIbFm1B1iQke4+GXjbkESJoOVHixMMbTkIqSjsrZ2M2YBQVgY5Hkc9EdU9Ye/+BTVFBKnPeawK1QUxYIvWCoEsDiGlkQOQ9BSg2FYJUdYQQCxeiNrAJmUhjnfl0zgo6LcqC0B6DgFQlImqvxj2BxxtYlzePWio7b6iwcxu1gSghBrVht6ANo1UZSTcQbmrgOpD5OLQzWAcpjyEhmd6n4b7bJjOiXuJACrajJtrVZDYgaBCNXkFxh4olaLqlIliLbRBNsvQYFmw8Tl9DvyDaJm9YWZ0C3KT9rnpWne2TTwMPICvX7TTf8dFnRBCLS8Zq5cmDER+1TpM5rWq4iilFQrBCeqKqk5q7esA748JD4ITIw2iKEIDIBmeNUu15Cm7+0RmyKVZCtjo+au4KqF/jDjhrwyV6r4mA9JR4U8lJYpq8IU1wRXPGp7NZTB4EVAcG+Xg6qIaC6EyKJyDPdCMOhGb6fZEdkSYrh9JrwSmLO4MvoN6/e29pZo6kJ+AedGZJovtKSP5C3vJtRg/whwipMdFWoHrrad3UFy1N/TWw7GImkCq0F40BeTTGPuYcgWLKaZosBNpyCtim5MnB/45TL4VlUTJ5hNjiaWbFV4SmuSMk5ug8bcx05EfjHbaEWM2bHX1JQa9rU37OAjKpA6BkNuZFhbhpceUg6spxymb/daPV/gyYw8fLpZV2bcfmFnXXQ0wDtSrXor3oaXzza1gSyq8BQZD+Ik6t/+d6cnnehxCpnyCLuJTUHdE3GGbRmVnwfY79cCUk0WDYDSWm1n0AwfOzN8z8AYon6HiPU2Sdfl9OcnA4qwwV5/TcsvPp1vHJ1DnxnARIyotL6NQvrSEDokrv+PC+nKNRJ1rE96m6CZdoCHBuDIB80DMA5o6bA0JZzZwkReUBwLfUOIb1vvLJ34xI04qgyh2WskOoC67TouSCxDVEcdNcPfutYyLh5kChUydFRpy/oNbGJvQPjfvyd1rh2zVWka5bQB+ki0xvBRtmuk6mVtSBK5mkoKfWZKA0OtgMOqmCcIPykcxsuZhlzqzMMIwLKp0UpIlYKgUWMYyWnfRmDjwnbkdWBibAMqnShnWSlHVWSm3Y6yQewtGinRGGegOZQ3oApwM3MjEp4y25ECTv/fI8qofUyl9Rt2PWukE/rMcvEecv0VMFZRSPqY5gIrE/KEsl5X5OZuiLpOhasxCEvbmKFfK8Qd+H7ppNTDIKxSRi/bYKc28rKr8+T8DJP1RAcv9vwCDz668jReeaYdy+BqCKuYxJP/VFTKjT/61KFTruwGLbrNucHnS1jHD2YYp1rVfFWu7ooj75KS/trl8E6/gv6MIA",
        sugt: "data:image/webp;base64,UklGRoYBAABXRUJQVlA4THkBAAAvWcAEAIV02tYsScI4Ap/ABxACIRACARACKRAAUQApEAIB8AmEwEXJenfP42dE/yeA//Ep23el8jUpJPVv8QKE0rdEtHIb39ID6Cdf6hpczQE3sJztkrJfLGUDLGewGX4FLGfAHMsOWMr2mmnXy5CDBmnvLU2mtiRLIUUlbSl8627AISkSWaekhocU/hKHtIc/McMsllUVujIRxrltbrOMRbj7CopO89iWtZLvoMspvDHfQmFPLFiTqkxTyjprvSmdGgmIAGbQlaCpZh0wRdfIvHkqPUoRaycs9tJB1RxjDPcpLXvilEN9xm9S2GsFuD1Tdi0GFr0mSOrc9676RFeGrvwI/FB7qWq2rqCpl65B15pnJWnP2Z25az4mrfqhTOySL0krlwge1epN9SW7bWk6dkp9DY7oY6ml3cephZ/SbvSt3aBJ54US0vQnWkidd7pxNQNMDVzHXMAZgDlXNwAzHprxvBufX5pzhzfFXLvwu5bjyIC3oxn/zgA=",
        n0: "data:image/webp;base64,UklGRsQBAABXRUJQVlA4TLgBAAAvL8ALAFehJgCCBtzy0j+r2wyK27aNo1J6vOoM0CBo27apeNs//wlKucr9KD81ACUAzyDxjN6Q9EDjP0iGUQDA6AHTA4lnwChAtm3bTiJRgIiRvtMcKwf4/z8U8d5OzxH9n4Ds/zev6lkTCMv5uPoNqjoYHCajNNVcxHkRL69FrvNIRaN3fXr5bruu/X47bHs0RZQyuN1/doPf9jeaUYQywPaze/htC2H0UNHAqe0i/pwgFA/kDVy6yBdo8mE1XLroF6gHFXDqEp6gGjLHtk3xs8V8QAmvXdJPqO5NsO8S71DfC3hP9YmQ91XYdsnXqPrGOKQ7oe6b4z3dFbO+Jb7SfaPpC2jT/SD0Qfcbwp8S0Kb7Qehr8JXuG8u+GZ7TvWLRV+OU7oBxX4VVug2qvqeAz1SvCNndGrtUO0zvVfCZ5g1G97I5Nm2KdoNFNrCCY4ojFEOyGs7xzlBng58aOMc6Q5MPy4oAxzZGe4SmyB4tA2xeH/vYQCizx8vG7e512MfObSizmEVzw+bw+t12Xft9Pa30NkUW96nuiVjnWfRiEWNRZUnLaRgW6ipLX40Xy0D4NaurPPv/BQ==",
        n1: "data:image/webp;base64,UklGRsIBAABXRUJQVlA4TLYBAAAvLAALAHfBKJIkRbXM6N/PCTkH/BwbjNo2EpQQ6CI8Okf0GOz/WraRJDmZ8V7Aq/yDIRcykCY3/wHsaZTqaZTqacbpehqlepqeRqmexrw/JWIzhkTGEJcpwLC6oGIzBSCgYrP9L7sLKDUBCUjLrnuRheternuRhfM7ycLxHBCg3w9k2bbVNhLOpoScsy2puw56DrKZ/wRBvI6/Ef2fAPPPOi1e4sE/XsVEa+iEZLFjDefhx2lXdiF05fpWg7hs4wdUy5C8rkDGeaynXobe65p2lsPCuQsZ31ew/WZwDJmPYPuMPceQ/Ug77iGcg+KVR5qj7jTeNS5lLGyC6pJ2mGCpgnKFSxA2WkskNqEO6t9MIwU3vQtfkScbvR2vyJ1Sb4FEWjq9N20Ewi8Iv0dLp/emjQil3oJH5MlWb80rUnDRu/EVmfKt1zCJGGGptUZM3FFpVdiEYctSZ4OMEoyj6TQ+Dc4kPzhrXBCTPmo55DvgRz2MhUOuA8xMbwvnLsfnAtZknLc0m36rBm9N1pFAtUlbVfAYmdxOoLltyk8In3J/+gneGcWRFZLFDYzypHg+PHh5FlPzXwg=",
        n2: "data:image/webp;base64,UklGRqABAABXRUJQVlA4TJQBAAAvLAALAD+hJACjaLz21oAI9NdUQZ3f2dVQ0ABRBAmOBkawkf0T/DgQRLKN/QmcBCLo30oD8x+AzieDoMe+z/9BMADJiQyCDEIuEAzKGNRDBsEgF3q8sVGhQoVK1NI4qEQtjeP2q3GcdlCBbNu22rZixZxU2UlkxQGrl+j8/0eCOLe+RvR/Atz/YT9vKiD7NndW90XJ1qm1WARO1cdXiDF81a8edCnW7vDUxOz6CbQtMwq+iYdrjwwlRqhCLBgqGI8NcI6FLzAeaYVzLH5B2gNKFQ0r9rwFHyyCZ81plTqaNsg9Y+IxGj+zZihXqwZNdfho/kCfmHm1q5gTG1e7T34SO992NzQhBLuAJCD+gvB7CMEuIAnl2+7Gnth4t6v5ScxUdq/MiZ6TnadLOKWxqlGXXnmxemLKuAuNTY22GW7FB4vgWV32TmXxhrr8VjiXuyDtATfBudQFBnd4giqUCG8wuYKD4K/HGo9Mrmir8FjnNY+wt670quBf61uIMdw+qhPI6gzbScnW9e6Mu3nbBUS3uXf/qg==",
        n3: "data:image/webp;base64,UklGRroBAABXRUJQVlA4TK4BAAAvLAALAHehqJGkqOdPBgUowL889sKEmkiSotmYqkUBCvAvBRMQv9EyiiQpUjXXs1GAAvxrWgHsi3P+2wC0TRLbJLFt18o2SWyzTRLbbu8kOa35YH0hUClAVIo3PglyDvDkXuBByD0RxBoI8kzwCMSZCDhTAoJcP3hyT5Bt23baVgpHNfXIgRVmtvX/PyhZp73wGtH/CTD/h+OskBrqqshGWv1ciBY71MhrWOzO78b75n3bzEDyZMMKVk8ffVuBDNPYmtnTd77NcJMUFvaNT9juwXabwNEnPoHtMqw5+uQn3LCDsPeKe6q4nFmj0c7IY4bC1as+cf0Iy8orr8kjhLvWEwmNmHn1BeNAxkZvz1eg5K53oQh889J7IQFHq9fiAuB/IPwOR6vX4gLCS+9FFSg5690oAhl7vS1fgTFLvTmjgBEeWjfEhHPWWitsRN/x0LkhgwiTM281mjm5ia7YaxwQEz9wHNOdqAcdjIVjqhNMTGcL+zZFcwBrEk4d83u355zamqQDgdU17rmCamBS5wLz7fXTeN98zvsF1LlRHFghWvKeUR5lZVVDLWU2Nv+q",
        pop: "data:image/webp;base64,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",
        zoomc:
          "data:image/webp;base64,UklGRogBAABXRUJQVlA4THsBAAAvIAAYAFehIAAZBvvr31cNhZEkQ7t3hz35B/vDSJKkRIU7R/7/SWdl/gPgNCeogTBQRcnQCAUfl4niMyUjEPVHCmkJAZXHNAfHMfBKQFQ+8lehratFClgJPky8IqpbNtG7cCVD86guo1Pyiky8EsC2bbeNctPARtN7F6SMGP3/H6ZJdN4i+j8B8J7CfQagOJe1+bGYAkW5SmCdLMslcFzCc/UK1IlLUgE1fOufSRYyr4MevrmLiDz0ISIXK9Z+tkpDCFe9hhBSq/ZBDxj+JQUKXuN/VTPf1t63Bd8fGDGHjsgXMjlow7HjmRvdGuS6xdDtez6ONB+UK42LAlDTRMSmWQBi0N6oEkh1jYFj5iKEKLKwM/1wxBwQmSd2G1UCqa5tIo/gMI4Uw5XGBaVBpGEc3mS3yTueN7sHwwC3u1BHFDmkJsa/ib1va+bbgu8/xkX6L1as/WyVhv7UyvZvpUxckho4r1yWJ6Aol4lZsipfABTH2rw8F09w/xoAAA==",
        ld0: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4TGIAAAAvCEACAG9gkG3k4A5gJ/An8ArbtkFxYTwiAdIcEZs25z8AG2rE/0Ho2NT1bGo9EFoBDIFNbFtxLk5o6VBBv+vAAEkMRNKmg5nn5ouI6P8EYOYEfiswpZtfeqxLWvitAHE4TA==",
        ld1: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4TF0AAAAvCEACAF+gIG0DFnXXaNu2uY6atngG2UaOHUINfgg//0HWMP7P6NIebtp0MQywiWS7zYmJWnUZgBzQZAjuTcK9EWgevQ8iov8TgNkb+KHALb180m890oYfChBXhwkA",
        ld2: "data:image/webp;base64,UklGRmgAAABXRUJQVlA4TFwAAAAvCEACAF9AJECas0vGLEG2beoGNZjBFbRtw8L+bf4jwxLY/2BWq6ysIBmVgE0jSY76mFx4ofl/AJbH5z5/KB7GSUNvQUT0fwIw2wZ8UWCSTn7psg5pxhcFiKPDBA==",
        ld3: "data:image/webp;base64,UklGRnIAAABXRUJQVlA4TGYAAAAvCEACAGegtm0bNmWntykE2baxIczgQ7jCtm3bVPZO2vkPAEMVmv8Xmq3dCkBX2RoBrgkVGEWS7WS+k3/9/5QFkNxECQhADAIwALWynoiI/k8A5tDBfwqc0s0jvdYlrfhfEdLiMAE=",
        ld4: "data:image/webp;base64,UklGRnoAAABXRUJQVlA4TG0AAAAvCEACAH+goI0kZY/pyb/Zt6GwbRsUt2M02rZNUIPC9v+rm/8AaC63AfH+fMJtptMdENPpDgFmAp+ZwCa2rTgXJ/R7jwBaLFAhByTEQSQlQpjZRUT0fwK45gi+j0Ab4+Uf47s9Y1RkHwpSEVwBAA==",
      },
    },
    10: {
      img: "/images/home/final/product-film/plate-10.webp",
      html: '<span class="pf-tx" style="left:166px;top:23px;font:700 15.5px/1 PFLato;color:#6c6c6c;" >AGENT YODA</span><div class="pf-a" style="left:25px;top:19px;display:flex;align-items:center;gap:7px;font:700 19px/1 PFLato;color:#fff;letter-spacing:.01em"><span class="pf-mark" style="width:21px;height:21px;color:#fff"></span>workspace</div><span class="pf-a" style="left:288px;top:15px;width:149px;height:29px;border:1px solid #7a7a7a;border-radius:3px"></span><span class="pf-tx" style="left:297px;top:26px;font:400 10.0px/1 PFLato;color:#ffffff;" >Regional Care Network</span><img class="pf-a" src="data:image/webp;base64,UklGRmQAAABXRUJQVlA4TFcAAAAvDUADAFdApG2bOiubghNp26bOyqbgRNq2qbOyKfj8x7YAAP9VKlABMIlt28p63wxPEoEIRHgahSYCLbD4S1ZoENH/9HPByt0J5pWOEzHejvnsIBrYfAUA" style="left:415px;top:22px"><span class="pf-tx" style="left:1826px;top:26px;font:400 10.5px/1 PFLato;color:#dadbe1;" >backend online</span><span class="pf-tx" style="left:844px;top:94px;font:500 14.0px/1 PFLato;color:#e8eaf0;" >Regional Care Network · </span><span class="pf-tx" style="left:997.2363433837891px;top:94px;font:700 12.5px/1 PFLato;color:#e8eaf0;" ><b data-cnt style="font-weight:inherit">0</b> entities</span><canvas class="pf-a" data-g width="1920" height="992" style="left:0;top:0;width:1920px;height:992px"></canvas><div class="pf-a" data-tip style="left:0;top:0;opacity:0;background:#1E1E1E;border:1px solid #333;border-radius:6px;padding:10px 14px;font:400 12px/1.2 PFLato;color:#ddd;white-space:nowrap;box-shadow:0 14px 30px -12px rgba(0,0,0,.8)"><b style="color:#fff;font-weight:700">Northside Clinic</b> <span style="border:1px solid #FF5E57;color:#FF5E57;padding:1px 5px;font-size:10px;margin-left:6px">FACILITY</span><div style="margin-top:6px;color:#999">degree 64 · shares_patients ×212</div></div><img class="pf-a" src="data:image/webp;base64,UklGRm4AAABXRUJQVlA4TGIAAAAvCEACAG9gkG3k4A5gJ/An8ArbtkFxYTwiAdIcEZs25z8AG2rE/0Ho2NT1bGo9EFoBDIFNbFtxLk5o6VBBv+vAAEkMRNKmg5nn5ouI6P8EYOYEfiswpZtfeqxLWvitAHE4TA==" style="left:789px;top:973px"><span class="pf-tx" style="left:804px;top:975px;font:400 10.5px/1 PFLato;color:#848484;letter-spacing:1.0px" >PATIENT</span><img class="pf-a" src="data:image/webp;base64,UklGRmoAAABXRUJQVlA4TF0AAAAvCEACAF+gIG0DFnXXaNu2uY6atngG2UaOHUINfgg//0HWMP7P6NIebtp0MQywiWS7zYmJWnUZgBzQZAjuTcK9EWgevQ8iov8TgNkb+KHALb180m890oYfChBXhwkA" style="left:860px;top:973px"><span class="pf-tx" style="left:875px;top:975px;font:400 10.5px/1 PFLato;color:#848484;letter-spacing:1.0px" >PROVIDER</span><img class="pf-a" src="data:image/webp;base64,UklGRmgAAABXRUJQVlA4TFwAAAAvCEACAF9AJECas0vGLEG2beoGNZjBFbRtw8L+bf4jwxLY/2BWq6ysIBmVgE0jSY76mFx4ofl/AJbH5z5/KB7GSUNvQUT0fwIw2wZ8UWCSTn7psg5pxhcFiKPDBA==" style="left:942px;top:973px"><span class="pf-tx" style="left:957px;top:975px;font:400 10.5px/1 PFLato;color:#848484;letter-spacing:1.0px" >PAYER</span><img class="pf-a" src="data:image/webp;base64,UklGRnIAAABXRUJQVlA4TGYAAAAvCEACAGegtm0bNmWntykE2baxIczgQ7jCtm3bVPZO2vkPAEMVmv8Xmq3dCkBX2RoBrgkVGEWS7WS+k3/9/5QFkNxECQhADAIwALWynoiI/k8A5tDBfwqc0s0jvdYlrfhfEdLiMAE=" style="left:1001px;top:973px"><span class="pf-tx" style="left:1016px;top:975px;font:400 10.5px/1 PFLato;color:#848484;letter-spacing:1.0px" >FACILITY</span><img class="pf-a" src="data:image/webp;base64,UklGRnoAAABXRUJQVlA4TG0AAAAvCEACAH+goI0kZY/pyb/Zt6GwbRsUt2M02rZNUIPC9v+rm/8AaC63AfH+fMJtptMdENPpDgFmAp+ZwCa2rTgXJ/R7jwBaLFAhByTEQSQlQpjZRUT0fwK45gi+j0Ab4+Uf47s9Y1RkHwpSEVwBAA==" style="left:1074px;top:973px"><span class="pf-tx" style="left:1089px;top:975px;font:400 10.5px/1 PFLato;color:#848484;letter-spacing:1.0px" >OTHER</span>',
      sp: {
        ddchev:
          "data:image/webp;base64,UklGRmQAAABXRUJQVlA4TFcAAAAvDUADAFdApG2bOiubghNp26bOyqbgRNq2qbOyKfj8x7YAAP9VKlABMIlt28p63wxPEoEIRHgahSYCLbD4S1ZoENH/9HPByt0J5pWOEzHejvnsIBrYfAUA",
        ld0: "data:image/webp;base64,UklGRm4AAABXRUJQVlA4TGIAAAAvCEACAG9gkG3k4A5gJ/An8ArbtkFxYTwiAdIcEZs25z8AG2rE/0Ho2NT1bGo9EFoBDIFNbFtxLk5o6VBBv+vAAEkMRNKmg5nn5ouI6P8EYOYEfiswpZtfeqxLWvitAHE4TA==",
        ld1: "data:image/webp;base64,UklGRmoAAABXRUJQVlA4TF0AAAAvCEACAF+gIG0DFnXXaNu2uY6atngG2UaOHUINfgg//0HWMP7P6NIebtp0MQywiWS7zYmJWnUZgBzQZAjuTcK9EWgevQ8iov8TgNkb+KHALb180m890oYfChBXhwkA",
        ld2: "data:image/webp;base64,UklGRmgAAABXRUJQVlA4TFwAAAAvCEACAF9AJECas0vGLEG2beoGNZjBFbRtw8L+bf4jwxLY/2BWq6ysIBmVgE0jSY76mFx4ofl/AJbH5z5/KB7GSUNvQUT0fwIw2wZ8UWCSTn7psg5pxhcFiKPDBA==",
        ld3: "data:image/webp;base64,UklGRnIAAABXRUJQVlA4TGYAAAAvCEACAGegtm0bNmWntykE2baxIczgQ7jCtm3bVPZO2vkPAEMVmv8Xmq3dCkBX2RoBrgkVGEWS7WS+k3/9/5QFkNxECQhADAIwALWynoiI/k8A5tDBfwqc0s0jvdYlrfhfEdLiMAE=",
        ld4: "data:image/webp;base64,UklGRnoAAABXRUJQVlA4TG0AAAAvCEACAH+goI0kZY/pyb/Zt6GwbRsUt2M02rZNUIPC9v+rm/8AaC63AfH+fMJtptMdENPpDgFmAp+ZwCa2rTgXJ/R7jwBaLFAhByTEQSQlQpjZRUT0fwK45gi+j0Ab4+Uf47s9Y1RkHwpSEVwBAA==",
      },
    },
    11: {
      img: "/images/home/final/product-film/plate-11.webp",
      html: '<div class="pf-a pf-logo" style="left:44px;top:33px;color:#111"><span class="pf-mark"></span>workspace</div><span class="pf-tx" style="left:976px;top:298px;font:700 14.5px/1 PFLato;color:#231f20;" >care_network_nightly</span><span class="pf-tx" style="left:976px;top:435px;font:400 14.5px/1 PFLato;color:#231f20;" >claims_quality_weekly</span><span class="pf-tx" style="left:976px;top:483px;font:600 14.0px/1 PFLato;color:#231f20;" >rx_adherence_daily</span><span class="pf-tx" style="left:1741.0px;top:256px;font:700 14.5px/1 PFLato;color:#838485;" >Entity IDs</span><span class="pf-tx" style="left:1187px;top:298px;font:700 14.0px/1 PFLato;color:#231f20;" >2024-10-07:02:00:00</span><span class="pf-tx" style="left:1187px;top:439px;font:400 14.0px/1 PFLato;color:#231f20;" >2024-10-07:02:00:00</span><span class="pf-tx" style="left:1187px;top:487px;font:400 14.0px/1 PFLato;color:#231f20;" >2024-10-07:02:00:00</span><img class="pf-a" data-tip src="data:image/webp;base64,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" style="left:205px;top:490px;opacity:0"><img class="pf-a" data-panel src="data:image/webp;base64,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" style="left:1296px;top:221px;opacity:0">',
      sp: {
        tip: "data:image/webp;base64,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",
      },
    },
  };
  function plate(i) {
    return '<img class="pf-plate" alt="" src="' + PL[i].img + '">' + PL[i].html;
  }
  Object.keys(PL).forEach(function (k) {
    var im = new Image();
    im.src = PL[k].img;
  });

  // S0 — Terminal era: config files and CLI runs before the SaaS workflow
  SC.push({
    act: 0,
    dark: true,
    dur: 10400,
    html: function () {
      return (
        '<div class="pf-a" style="inset:0;background:radial-gradient(120% 90% at 50% 0%,#1d2230 0%,#0b0d12 70%)"></div>' +
        '<div class="pf-a pf-term" style="left:70px;top:46px;width:1780px;height:900px;border-radius:14px;background:#15171c;box-shadow:0 40px 90px -30px rgba(0,0,0,.8),0 0 0 1px rgba(255,255,255,.08);overflow:hidden">' +
        '<div class="pf-a" style="left:0;top:0;right:0;height:44px;background:#22252c;border-bottom:1px solid #2c3038"></div>' +
        '<span class="pf-a" style="left:20px;top:15px;width:14px;height:14px;border-radius:50%;background:#ff5f57"></span><span class="pf-a" style="left:44px;top:15px;width:14px;height:14px;border-radius:50%;background:#febc2e"></span><span class="pf-a" style="left:68px;top:15px;width:14px;height:14px;border-radius:50%;background:#28c840"></span>' +
        '<div class="pf-a" data-ttl style="left:0;right:0;top:13px;text-align:center;font:500 15px/1 PFLato;color:#9aa0aa">jordan@etl-01: ~/care-network — zsh — 180×42</div>' +
        '<div class="pf-a" data-vp style="left:28px;top:62px;right:28px;bottom:20px;overflow:hidden"><div class="pf-a" data-buf style="left:0;top:0;right:0;font:400 23px/35px Menlo,Consolas,\'DejaVu Sans Mono\',monospace;color:#d6d9df;white-space:pre"></div></div>' +
        '<div class="pf-a" data-vim style="left:28px;top:62px;right:28px;bottom:20px;opacity:0;font:400 23px/35px Menlo,Consolas,\'DejaVu Sans Mono\',monospace;color:#d6d9df;white-space:pre"></div>' +
        "</div>"
      );
    },
    run: function (s, t) {
      var buf = s.querySelector("[data-buf]"),
        vp = s.querySelector("[data-vp]"),
        vim = s.querySelector("[data-vim]");
      var P =
        '<span style="color:#7ee787">jordan@etl-01</span> <span style="color:#79c0ff">~/care-network</span> <span style="color:#d6d9df">$</span> ';
      var C = {
        i: "#8b949e",
        ok: "#7ee787",
        err: "#ff7b72",
        w: "#e3b341",
        d: "#6e7681",
        h: "#d2a8ff",
      };
      function line(html) {
        var d = document.createElement("div");
        d.innerHTML = html || " ";
        buf.appendChild(d);
        var over = buf.offsetHeight - vp.clientHeight;
        if (over > 0) buf.style.transform = "translateY(" + -over + "px)";
        return d;
      }
      function cmd(at, text, dur) {
        t.at(at, function () {
          var d = line(
            P +
              '<span data-c></span><span data-k style="background:#d6d9df;color:#15171c"> </span>',
          );
          t.type(d.querySelector("[data-c]"), text, dur);
          t.at(dur + 60, function () {
            var k = d.querySelector("[data-k]");
            if (k) k.remove();
          });
        });
      }
      function out(at, html) {
        t.at(at, function () {
          line(html);
        });
      }
      function tag(c, x) {
        return '<span style="color:' + C[c] + '">' + x + "</span>";
      }
      buf.style.transition = "transform .18s ease-out";
      t.cam(0, 1.04, 960, 496);
      t.camTo(1, 960, 496, 9000);
      out(0, tag("d", "Last login: Mon Oct  7 01:58:12 on ttys002"));
      cmd(250, "vim config/care_network.yaml", 650);
      // vim: quick edit of the resolution config
      var V = [
        tag("d", " 1 ") + tag("h", "pipeline") + ": care_network_nightly",
        tag("d", " 2 ") + tag("h", "sources") + ":",
        tag("d", " 3 ") +
          "  - ehr_encounters   " +
          tag("d", "# s3://ehr-lake/encounters.parquet"),
        tag("d", " 4 ") + "  - claims_2024",
        tag("d", " 5 ") + "  - rx_fills",
        tag("d", " 6 ") + tag("h", "pii") + ":",
        tag("d", " 7 ") + "  mask: [Patient_MRN, Pat_Full_Nm, Dob, Phone_Nbr]",
        tag("d", " 8 ") + tag("h", "resolve") + ":",
        tag("d", " 9 ") +
          "  keys: [last_name, <span data-key>dob</span>, zip, gender, phone, mrn]",
        tag("d", "10 ") + "  threshold: <span data-th>0.92</span>",
        tag("d", "11 ") + "  shields: [suffix]",
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        tag("d", "~"),
        '<span data-vbar style="color:#8b949e">"config/care_network.yaml" 11L, 312B</span>',
      ].join("\n");
      t.at(1050, function () {
        vim.innerHTML = V;
        vim.style.opacity = 1;
        vp.style.opacity = 0;
      });
      t.at(1650, function () {
        var th = vim.querySelector("[data-th]");
        th.style.background = "#3b4252";
        th.textContent = "0.88";
        vim.querySelector("[data-vbar]").textContent = "-- INSERT --";
      });
      t.at(2200, function () {
        vim.querySelector("[data-vbar]").textContent = ":wq";
      });
      t.at(2500, function () {
        vim.style.opacity = 0;
        vp.style.opacity = 1;
        line(tag("d", '"config/care_network.yaml" 11L, 312B written'));
      });
      cmd(
        2650,
        "dp ingest --source s3://ehr-lake/encounters.parquet --schema schemas/encounters.json",
        900,
      );
      out(
        3650,
        tag("i", "[INFO] ") +
          "reading encounters.parquet … " +
          tag("ok", "10,000 records") +
          " in 2.1s",
      );
      cmd(3850, "dp profile --fields Patient_MRN,Pat_Full_Nm,Gndr_Cd,Dob", 650);
      out(4600, tag("d", "  FIELD          POPULATED   UNIQUE   SAMPLE"));
      out(
        4680,
        "  Patient_MRN    " + tag("ok", "100.00%") + "     67K      ••••4821",
      );
      out(
        4760,
        "  Pat_Full_Nm    " + tag("ok", "100.00%") + "      1K      M. R•••••",
      );
      out(4840, "  Gndr_Cd        " + tag("ok", " 98.70%") + "       2      F");
      out(
        4920,
        "  Dob            " + tag("w", " 29.00%") + "     56K      1984-••-••",
      );
      cmd(5150, "dp resolve --config config/care_network.yaml", 550);
      out(
        5800,
        tag("err", "[ERROR] ") +
          "KeyError: 'dob' not found in source " +
          tag("h", "claims_2024") +
          tag("d", "  (config/care_network.yaml:9)"),
      );
      out(
        5880,
        tag("d", "        Traceback written to logs/resolve-20241007-0201.log"),
      );
      cmd(6150, "sed -i 's/dob/birth_dt/' config/care_network.yaml", 500);
      cmd(6750, "dp resolve --config config/care_network.yaml", 450);
      var bar;
      t.at(7300, function () {
        bar = line("");
        var st = performance.now();
        (function f(now) {
          if (!t.live()) return;
          var k = Math.min(1, (now - st) / 1150),
            n = Math.round(k * 32);
          bar.innerHTML =
            tag("i", "resolving ") +
            tag("ok", Array(n + 1).join("█")) +
            tag("d", Array(33 - n).join("░")) +
            " " +
            Math.round(k * 100) +
            "%  " +
            tag(
              "d",
              Math.round(k * 18204).toLocaleString("en-US") + " entities",
            );
          if (k < 1) requestAnimationFrame(f);
        })(st);
      });
      out(
        8500,
        tag("ok", "[OK] ") +
          "18,204 entities resolved · PII masked · 4 sources",
      );
      cmd(8650, 'dp schedule --cron "0 2 * * *" --tz America/New_York', 550);
      out(
        9300,
        tag("ok", "[OK] ") +
          "care_network_nightly scheduled · next run 02:00 ET",
      );
      t.at(9500, function () {
        line(P + '<span style="background:#d6d9df;color:#15171c"> </span>');
      });
    },
  });

  // S1 — Source: pick fields, records stream in
  SC.push({
    act: 0,
    dur: 6200,
    html: function () {
      return plate(0);
    },
    run: function (s, t) {
      var chk = PL[0].sp.chk;
      t.cam(0, 1.16, 640, 560);
      t.cursor(1200, 760, 0);
      [0, 1, 2, 3].forEach(function (k, i) {
        t.at(250 + i * 330, function () {
          t.move(393, 544 + k * 42, 280);
        });
        t.at(560 + i * 330, function () {
          t.click();
          var u = s.querySelector('[data-uc="' + k + '"]');
          t.A(u, [{ opacity: 1 }, { opacity: 0 }], 160);
          u.style.opacity = 0;
          if (!i) {
            s.querySelector("[data-apb]").style.borderColor = "#231f20";
            s.querySelector("[data-apt]").style.color = "#231f20";
          }
        });
      });
      t.at(1700, function () {
        t.move(786, 873, 450);
        t.camTo(1, 960, 496, 1300);
      });
      t.at(2200, function () {
        t.click();
      });
      s.querySelectorAll("[data-row]").forEach(function (r, i) {
        t.at(2350 + i * 80, function () {
          r.style.opacity = 1;
          t.A(
            r,
            [
              { opacity: 0, transform: "translateY(6px)" },
              { opacity: 1, transform: "none" },
            ],
            380,
          );
        });
      });
      t.at(3500, function () {
        var v = s.querySelector("[data-vs]");
        v.textContent = "1";
        t.A(
          v.parentNode,
          [
            { transform: "scale(1)" },
            { transform: "scale(1.04)" },
            { transform: "none" },
          ],
          300,
        );
        var c = s.querySelector("[data-cont]");
        c.style.opacity = 1;
        t.A(c, [{ opacity: 0 }, { opacity: 1 }], 400);
        t.move(1784, 122, 900);
      });
      t.at(4500, function () {
        t.click();
        t.A(
          s.querySelector("[data-cont]"),
          [
            { transform: "scale(1)" },
            { transform: "scale(.96)" },
            { transform: "none" },
          ],
          240,
        );
      });
    },
  });

  // S2 — Profile: stats count up, top values fill in, similar fields selected
  SC.push({
    act: 0,
    dur: 5600,
    html: function () {
      return plate(1);
    },
    run: function (s, t) {
      t.cam(0, 1.12, 700, 520);
      t.cursor(400, 620, 0);
      t.move(200, 724, 450);
      t.at(500, function () {
        t.click();
      });
      t.at(650, function () {
        s.querySelectorAll("[data-n]").forEach(function (e) {
          t.count(e, +e.getAttribute("data-n"), 1300);
        });
        s.querySelectorAll("[data-p]").forEach(function (e) {
          t.count(e, +e.getAttribute("data-p"), 1300, 2, "%");
        });
      });
      s.querySelectorAll("[data-tv]").forEach(function (e, i) {
        t.at(900 + i * 110, function () {
          e.style.opacity = 1;
          t.A(
            e,
            [
              { opacity: 0, transform: "translateX(-10px)" },
              { opacity: 1, transform: "none" },
            ],
            360,
          );
        });
      });
      t.at(2100, function () {
        t.camTo(1.12, 1400, 600, 1300);
        t.move(1493, 502, 900);
      });
      [0, 1].forEach(function (k, i) {
        t.at(3100 + i * 420, function () {
          if (i) t.move(1493, 566, 300);
          t.at(i ? 320 : 0, function () {
            t.click();
            var u = s.querySelector('[data-uc="' + k + '"]');
            u.style.opacity = 0;
          });
        });
      });
      t.at(4200, function () {
        t.camTo(1, 960, 496, 1100);
        t.move(1796, 122, 900);
      });
    },
  });

  // S3 — Prepare: phone cleaner normalises masked numbers
  SC.push({
    act: 0,
    dur: 5400,
    html: function () {
      return plate(2);
    },
    run: function (s, t) {
      t.cam(0, 1.1, 820, 520);
      t.cursor(640, 760, 0);
      t.move(580, 646, 450);
      t.at(500, function () {
        t.click();
      });
      s.querySelectorAll("[data-cl]").forEach(function (e, i) {
        t.at(800 + i * 140, function () {
          e.style.opacity = 1;
          t.A(
            e,
            [
              { opacity: 0, transform: "translateX(-8px)" },
              { opacity: 1, transform: "none" },
            ],
            320,
          );
        });
      });
      t.at(1900, function () {
        t.camTo(1.18, 1500, 470, 1200);
        t.move(1600, 461, 800);
      });
      t.at(2700, function () {
        t.click();
        t.type(s.querySelector("[data-ti]"), "98801•••78", 700);
      });
      t.at(3450, function () {
        s.querySelector("[data-test]").style.color = "#231f20";
      });
      t.at(3500, function () {
        t.move(1788, 491, 350);
      });
      t.at(3900, function () {
        t.click();
        var o = s.querySelector("[data-to]");
        o.style.opacity = 1;
        t.A(o, [{ opacity: 0 }, { opacity: 1 }], 300);
      });
      t.at(4300, function () {
        t.camTo(1, 960, 496, 900);
        t.move(814, 876, 800);
      });
      t.at(5150, function () {
        t.click();
      });
    },
  });

  // S4 — Connect: resolution logic assembles
  SC.push({
    act: 0,
    dur: 5200,
    html: function () {
      return plate(3);
    },
    run: function (s, t) {
      var toks = s.querySelectorAll("[data-tok]");
      toks.forEach(function (e) {
        e.style.opacity = 0;
      });
      s.querySelectorAll("[data-chip]").forEach(function (e, i) {
        t.A(
          e,
          [
            { opacity: 0, transform: "scale(.85)" },
            { opacity: 1, transform: "none" },
          ],
          380,
          "cubic-bezier(.2,1.3,.4,1)",
          250 + i * 120,
        );
      });
      t.cam(0, 1.15, 800, 520);
      t.cursor(1500, 760, 0);
      toks.forEach(function (e, i) {
        var r = +e.getAttribute("data-tok").split("-")[0],
          j = +e.getAttribute("data-tok").split("-")[1];
        t.at(700 + r * 650 + j * 85, function () {
          e.style.opacity = 1;
          t.A(
            e,
            [
              { opacity: 0, transform: "translateY(6px)" },
              { opacity: 1, transform: "none" },
            ],
            300,
          );
        });
      });
      t.at(700, function () {
        t.move(1170, 482, 1800);
      });
      t.at(2700, function () {
        t.camTo(1, 960, 496, 1300);
        t.move(1680, 510, 600);
      });
      t.at(3400, function () {
        t.click();
        t.flyTo(1680, 510, 1430, 393, "suffix", 600, function () {});
        t.move(1430, 393, 600);
      });
      t.at(4250, function () {
        t.move(1840, 122, 700);
      });
      t.at(4950, function () {
        t.click();
      });
    },
  });

  // S5 — Validate: patient golden record resolves
  SC.push({
    act: 0,
    dur: 6000,
    html: function () {
      return plate(4);
    },
    run: function (s, t) {
      var q = function (a) {
        return s.querySelectorAll(a);
      };
      q("[data-n0],[data-ln0],[data-d],[data-e]").forEach(function (e) {
        e.style.opacity = 0;
      });
      t.cam(0, 1.3, 330, 560);
      t.cursor(700, 760, 0);
      function pop(k, d) {
        t.at(d, function () {
          var n = s.querySelector('[data-n0="' + k + '"]'),
            l = s.querySelector('[data-ln0="' + k + '"]');
          n.style.opacity = 1;
          l.style.opacity = 1;
          t.A(
            n,
            [
              { transform: "scale(0)" },
              { transform: "scale(1.08)" },
              { transform: "none" },
            ],
            520,
            "cubic-bezier(.2,1.3,.4,1)",
          );
          t.A(l, [{ opacity: 0 }, { opacity: 1 }], 400, "ease", 150);
        });
      }
      pop(0, 250);
      [0, 1, 2].forEach(function (k) {
        t.at(650 + k * 380, function () {
          var e = s.querySelector('[data-e="' + k + '"]'),
            d = s.querySelector('[data-d="' + k + '"]');
          e.style.opacity = 1;
          var L = e.getTotalLength();
          t.A(
            e,
            [
              { strokeDashoffset: L, strokeDasharray: "5 5" },
              { strokeDashoffset: 0, strokeDasharray: "5 5" },
            ],
            500,
            "ease-out",
          );
          t.A(
            e,
            [{ clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0 0 0)" }],
            1,
          );
          d.style.opacity = 1;
          t.A(
            d,
            [
              {
                transform: "scale(0)",
                transformOrigin: "center",
                transformBox: "fill-box",
              },
              {
                transform: "scale(1)",
                transformOrigin: "center",
                transformBox: "fill-box",
              },
            ],
            300,
            "ease",
            200,
          );
        });
        pop(k + 1, 900 + k * 380);
      });
      t.at(800, function () {
        t.move(215, 611, 1400);
      });
      t.at(2400, function () {
        t.click();
        t.camTo(1, 960, 496, 1100);
      });
      q("[data-v]").forEach(function (e, i) {
        t.at(2700 + i * 90, function () {
          e.style.opacity = 1;
          t.A(
            e,
            [
              { opacity: 0, transform: "translateX(-6px)" },
              { opacity: 1, transform: "none" },
            ],
            300,
          );
        });
      });
      t.at(3800, function () {
        t.move(1394, 312, 700);
      });
      t.at(4550, function () {
        t.click();
        var m = s.querySelector("[data-menu]");
        m.style.opacity = 1;
        t.A(
          m,
          [
            { opacity: 0, transform: "translateY(-6px)" },
            { opacity: 1, transform: "none" },
          ],
          260,
        );
      });
      t.at(4900, function () {
        t.move(1410, 357, 350);
      });
      t.at(5350, function () {
        t.click();
      });
    },
  });

  // S6 — Enrich: pick the best value for every field
  SC.push({
    act: 0,
    dur: 5600,
    html: function () {
      return plate(5);
    },
    run: function (s, t) {
      s.querySelectorAll("[data-chip]").forEach(function (e) {
        e.style.opacity = 0;
      });
      t.cam(0, 1.18, 760, 470);
      t.cursor(600, 760, 0);
      t.at(300, function () {
        t.move(563, 457, 450);
      });
      t.at(850, function () {
        t.click();
        t.flyTo(563, 457, 846, 385, "Count", 650, function () {
          var c = s.querySelector("[data-cnt]");
          c.style.opacity = 1;
          t.A(c, [{ transform: "scale(.94)" }, { transform: "none" }], 260);
        });
        t.move(846, 385, 650);
      });
      t.at(1800, function () {
        t.move(563, 564, 500);
      });
      t.at(2350, function () {
        t.click();
        t.flyTo(563, 564, 846, 507, "Prefer", 650, function () {
          s.querySelector("[data-dd]").style.opacity = 0;
          var p = s.querySelector("[data-pf]");
          p.style.opacity = 1;
          t.A(p, [{ transform: "scale(.94)" }, { transform: "none" }], 260);
        });
        t.move(846, 507, 650);
      });
      s.querySelectorAll("[data-chip]").forEach(function (e, i) {
        t.at(3150 + i * 170, function () {
          e.style.opacity = 1;
          t.A(
            e,
            [
              { opacity: 0, transform: "translateY(6px) scale(.9)" },
              { opacity: 1, transform: "none" },
            ],
            360,
            "cubic-bezier(.2,1.3,.4,1)",
          );
        });
      });
      t.at(3800, function () {
        t.camTo(1, 960, 496, 1000);
        t.move(1820, 122, 1000);
      });
      t.at(5000, function () {
        t.click();
      });
    },
  });

  // S7 — Orchestrate: schedule and confirm
  SC.push({
    act: 0,
    dur: 5000,
    html: function () {
      return plate(6);
    },
    run: function (s, t) {
      t.cam(0, 1.15, 560, 420);
      t.cursor(600, 330, 0);
      t.move(200, 263, 400);
      t.at(450, function () {
        t.click();
        s.querySelector("[data-ph]").style.opacity = 0;
        t.type(s.querySelector("[data-wf]"), "care_network_nightly", 700);
      });
      t.at(1300, function () {
        t.camTo(1, 960, 496, 1100);
        t.move(400, 768, 600);
      });
      t.at(1950, function () {
        t.click();
        var h = s.querySelector("[data-hh]");
        t.A(
          h,
          [
            { opacity: 0, transform: "translateY(-6px)" },
            { opacity: 1, transform: "none" },
          ],
          300,
        );
      });
      t.at(2300, function () {
        var c = s.querySelector("[data-conf]");
        c.style.opacity = 1;
        t.A(c, [{ opacity: 0 }, { opacity: 1 }], 350);
        t.move(1780, 122, 700);
      });
      t.at(3100, function () {
        t.click();
        t.A(
          s.querySelector("[data-conf]"),
          [
            { transform: "scale(1)" },
            { transform: "scale(.96)" },
            { transform: "none" },
          ],
          240,
        );
      });
      t.at(3400, function () {
        var f = s.querySelector("[data-fab]"),
          m = s.querySelector("[data-menu]");
        f.style.opacity = 1;
        t.A(
          f,
          [
            { opacity: 0, transform: "scale(.6)" },
            { opacity: 1, transform: "none" },
          ],
          380,
          "cubic-bezier(.2,1.3,.4,1)",
        );
        m.style.opacity = 1;
        t.A(
          m,
          [
            { opacity: 0, transform: "translateY(-8px)" },
            { opacity: 1, transform: "none" },
          ],
          360,
          "ease",
          180,
        );
        t.move(1768, 348, 600);
      });
      t.at(4350, function () {
        t.click();
      });
    },
  });

  // S7b — Operational dashboard: monitor the scheduled pipeline
  SC.push({
    act: 0,
    dur: 5600,
    html: function () {
      return plate(11);
    },
    run: function (s, t) {
      t.cam(0, 1.15, 470, 500);
      t.cursor(700, 700, 0);
      t.at(400, function () {
        t.move(324, 569, 700);
      });
      t.at(1150, function () {
        var tp = s.querySelector("[data-tip]");
        tp.style.opacity = 1;
        t.A(
          tp,
          [
            { opacity: 0, transform: "translateY(6px)" },
            { opacity: 1, transform: "none" },
          ],
          320,
        );
      });
      t.at(2000, function () {
        t.camTo(1, 960, 496, 1000);
        t.move(1859, 201, 900);
      });
      t.at(3000, function () {
        t.click();
        var p = s.querySelector("[data-panel]");
        p.style.opacity = 1;
        t.A(
          p,
          [
            { opacity: 0, transform: "translateX(24px)" },
            { opacity: 1, transform: "none" },
          ],
          450,
          "cubic-bezier(.2,.9,.2,1)",
        );
      });
      t.at(3600, function () {
        t.move(1440, 439, 600);
      });
      t.at(4250, function () {
        t.click();
      });
      t.at(4600, function () {
        t.move(1822, 671, 600);
      });
      t.at(5300, function () {
        t.click();
      });
    },
  });

  // S8 — Data Factory: build the pipeline, then the sample-data drawer slides up
  SC.push({
    act: 1,
    dur: 8000,
    html: function () {
      return plate(7);
    },
    run: function (s, t) {
      var TK = [485, 601, 717, 833, 949, 1065, 1181, 1302, 1429, 1556];
      var nodes = [].slice.call(s.querySelectorAll("[data-dn]")),
        wires = s.querySelector("[data-wires]"),
        w2 = s.querySelector("[data-w2] path"),
        dr = s.querySelector("[data-drawer]");
      nodes.forEach(function (n) {
        n.style.opacity = 0;
      });
      wires.style.clipPath = "inset(0 100% 0 0)";
      var L2 = w2.getTotalLength();
      w2.style.strokeDasharray = L2;
      w2.style.strokeDashoffset = L2;
      dr.style.transform = "translateY(430px)";
      s.querySelectorAll("[data-dr]").forEach(function (r) {
        r.style.opacity = 0;
      });
      t.cam(0, 1, 960, 496);
      t.camTo(1.3, 520, 420, 2800);
      t.cursor(900, 620, 0);
      var W = 1832,
        right = W;
      var EDGES = {
        Transpose: ["M207 281 H240 V365 H294", "M204 498 H235 V365 H294"],
        Rename: ["M389 365 H428 V311 H501"],
        Connect: ["M389 365 H422 V464 H467"],
        Pivot: ["M585 311 H600 V400 H628", "M553 464 H585 V400 H628"],
        Filter: ["M207 498 H362 V578 H420"],
        "With Columns": ["M695 400 H721 V494 H756", "M500 578 H662 V494 H756"],
        Stack: ["M695 400 H780 V370 H808", "M815 478 V432 H843 V386"],
      };
      var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("class", "pf-a");
      svg.style.cssText =
        "left:0;top:0;width:1920px;height:992px;overflow:visible;pointer-events:none";
      s.appendChild(svg);
      function pulse(d, delay) {
        var p = document.createElementNS("http://www.w3.org/2000/svg", "path");
        p.setAttribute("d", d);
        p.setAttribute("fill", "none");
        svg.appendChild(p);
        var L = p.getTotalLength();
        var dot = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "circle",
        );
        dot.setAttribute("r", 3.5);
        dot.setAttribute("fill", "#1E4FA8");
        dot.setAttribute("opacity", 0);
        svg.appendChild(dot);
        t.at(delay || 0, function () {
          var st = performance.now();
          (function step(now) {
            var k = Math.min(1, (now - st) / 900);
            var pt = p.getPointAtLength(L * k);
            dot.setAttribute("cx", pt.x);
            dot.setAttribute("cy", pt.y);
            dot.setAttribute("opacity", k < 1 ? 1 - k * 0.3 : 0);
            if (k < 1 && t.live()) requestAnimationFrame(step);
          })(st);
        });
      }
      nodes.forEach(function (n, i) {
        var x = parseFloat(n.style.left),
          y = parseFloat(n.style.top),
          w = +n.getAttribute("data-w"),
          tx = TK[+n.getAttribute("data-dn")];
        t.at(250 + i * 320, function () {
          t.move(tx, 204, 150);
          t.flyTo(
            tx,
            204,
            x + 40,
            y + 18,
            n.getAttribute("data-nm"),
            260,
            function () {
              n.style.opacity = 1;
              t.A(
                n,
                [
                  { transform: "scale(.86)" },
                  { transform: "scale(1.06)" },
                  { transform: "none" },
                ],
                300,
              );
              (EDGES[n.getAttribute("data-nm")] || []).forEach(function (d, k) {
                pulse(d, 120 + k * 160);
              });
              var nr = Math.min(right, Math.max(0, W - (x - 44 + w + 60)));
              t.A(
                wires,
                [
                  { clipPath: "inset(0 " + right + "px 0 0)" },
                  { clipPath: "inset(0 " + nr + "px 0 0)" },
                ],
                420,
                "ease-out",
              );
              right = nr;
              wires.style.clipPath = "inset(0 " + nr + "px 0 0)";
            },
          );
        });
      });
      t.at(1500, function () {
        t.A(
          w2,
          [{ strokeDashoffset: L2 }, { strokeDashoffset: 0 }],
          1400,
          "ease-in-out",
        );
        w2.style.strokeDashoffset = 0;
      });
      t.at(2950, function () {
        t.A(
          wires,
          [{ clipPath: wires.style.clipPath }, { clipPath: "inset(0 0 0 0)" }],
          500,
        );
        wires.style.clipPath = "inset(0 0 0 0)";
      });
      t.at(3400, function () {
        t.camTo(1, 960, 496, 900);
        t.move(960, 760, 600);
      });
      t.at(3300, function () {
        var i = 0;
        Object.keys(EDGES).forEach(function (k) {
          EDGES[k].forEach(function (d) {
            pulse(d, i++ * 70);
          });
        });
      });
      t.at(4000, function () {
        t.A(
          dr,
          [{ transform: "translateY(430px)" }, { transform: "none" }],
          750,
          "cubic-bezier(.2,.9,.2,1)",
        );
        dr.style.transform = "none";
      });
      s.querySelectorAll("[data-dr]").forEach(function (r, i) {
        t.at(4450 + i * 120, function () {
          r.style.opacity = 1;
          t.A(
            r,
            [
              { opacity: 0, transform: "translateY(6px)" },
              { opacity: 1, transform: "none" },
            ],
            320,
          );
        });
      });
      t.at(5900, function () {
        t.move(1844, 126, 800);
      });
      t.at(6900, function () {
        t.click();
      });
    },
  });

  // S9 — Data Factory pop-up: configure a node
  SC.push({
    act: 1,
    dur: 5600,
    html: function () {
      return plate(8);
    },
    run: function (s, t) {
      t.cam(0, 1, 960, 496);
      t.cursor(900, 640, 0);
      t.at(300, function () {
        t.camTo(1.22, 760, 330, 1500);
        t.move(1176, 299, 700);
      });
      t.at(1100, function () {
        t.click();
        ["[data-row2]", "[data-r2n]"].forEach(function (q) {
          var e = s.querySelector(q);
          e.style.opacity = 1;
          t.A(
            e,
            [
              { opacity: 0, transform: "translateY(-8px)" },
              { opacity: 1, transform: "none" },
            ],
            380,
          );
        });
      });
      t.at(1500, function () {
        t.move(700, 410, 500);
      });
      t.at(2050, function () {
        t.click();
        t.type(
          s.querySelector("[data-cfg]"),
          '{"type":"case","when":"hba1c > 9","then":"high"}',
          1500,
        );
      });
      t.at(3800, function () {
        t.camTo(1, 960, 496, 1100);
        t.move(400, 862, 900);
      });
      t.at(4900, function () {
        t.click();
      });
    },
  });

  // S10 — Agent (dark): ask, the care network surfaces, answer streams
  SC.push({
    act: 2,
    dark: true,
    dur: 9400,
    html: function () {
      return plate(9);
    },
    run: function (s, t) {
      var q = function (a) {
          return s.querySelector(a);
        },
        qa = function (a) {
          return s.querySelectorAll(a);
        };
      qa("[data-an],[data-al],[data-pop],[data-sel]").forEach(function (e) {
        e.style.opacity = 0;
      });
      t.cam(0, 1, 960, 496);
      t.A(
        q("[data-ring]"),
        [{ transform: "rotate(0deg)" }, { transform: "rotate(36deg)" }],
        9400,
        "linear",
      );
      t.cursor(900, 700, 0);
      t.move(325, 621, 700);
      t.at(800, function () {
        t.click();
        var a = q("[data-ask]");
        a.style.color = "#fff";
        t.type(
          a,
          "How are Northside Clinic referrals leaving the network?",
          900,
        );
      });
      t.at(1900, function () {
        t.move(900, 760, 400);
        ["[data-hero]", "[data-sgt]", "[data-ring]"].forEach(function (k) {
          var e = q(k);
          t.A(e, [{ opacity: 1 }, { opacity: 0 }], 400);
          e.style.opacity = 0;
        });
        qa("[data-sg]").forEach(function (e) {
          t.A(e, [{ opacity: 1 }, { opacity: 0 }], 300);
          e.style.opacity = 0;
        });
        q("[data-thread]").innerHTML =
          '<div style="margin-left:auto;width:max-content;max-width:420px;background:#2E2E2E;padding:10px 14px;border-radius:12px 12px 2px 12px;font:400 14px/1.4 PFLato;color:#eee">How are Northside Clinic referrals leaving the network?</div><div data-ans style="margin-top:22px;font:400 14px/1.65 PFLato;color:#ddd"></div>';
        var a = q("[data-ask]");
        a.textContent = "Ask anything...";
        a.style.color = "";
      });
      [0, 1, 2, 3].forEach(function (k) {
        t.at(2300 + k * 140, function () {
          var n = q('[data-an="' + k + '"]'),
            l = q('[data-al="' + k + '"]');
          n.style.opacity = 1;
          l.style.opacity = 1;
          t.A(
            n,
            [
              { transform: "scale(0)" },
              { transform: "scale(1.1)" },
              { transform: "none" },
            ],
            520,
            "cubic-bezier(.2,1.3,.4,1)",
          );
          t.A(l, [{ opacity: 0 }, { opacity: 1 }], 400, "ease", 150);
        });
      });
      t.at(2500, function () {
        var e = q("[data-sel]");
        e.style.opacity = 1;
        t.A(e, [{ opacity: 0 }, { opacity: 1 }], 500);
      });
      t.at(3200, function () {
        t.stream(
          q("[data-ans]"),
          "Northside Clinic sends 31% of orthopedic referrals out of network, mostly to Lakeview Health. 212 shared patients link the two; 18 have overlapping payer coverage with BlueRiver.\n\nSources: claims_2024 · referrals · 4 resolved entities. Patient identifiers are masked.",
          2600,
        );
      });
      t.at(4300, function () {
        t.move(1113, 454, 700);
      });
      t.at(5100, function () {
        t.click();
        var p = q("[data-pop]");
        p.style.opacity = 1;
        t.A(
          p,
          [
            { opacity: 0, transform: "translateY(8px)" },
            { opacity: 1, transform: "none" },
          ],
          380,
        );
        var z = q("[data-zoom]");
        t.A(
          z,
          [{ transform: "translateX(301px)" }, { transform: "none" }],
          500,
          "cubic-bezier(.2,.9,.2,1)",
        );
        z.style.transform = "none";
        var d = q("[data-det]");
        d.style.opacity = 1;
        t.A(
          d,
          [
            { opacity: 0, transform: "translateX(16px)" },
            { opacity: 1, transform: "none" },
          ],
          500,
          "ease",
          150,
        );
      });
      t.at(5600, function () {
        t.camTo(1.12, 1260, 330, 1600);
        t.move(1053, 318, 900);
      });
      t.at(7600, function () {
        t.click();
        t.camTo(1.3, 1150, 470, 1500);
      });
    },
  });

  // S11 — Agent (dark): the whole care network, full view
  var GN = [
    1307, 825, 16, 0, 1341, 777, 16, 0, 1262, 812, 16, 0, 1181, 297, 16, 0,
    1197, 700, 16, 0, 1252, 864, 15, 0, 1138, 860, 15, 0, 1024, 307, 15, 0, 910,
    819, 15, 0, 1105, 532, 13, 0, 993, 212, 12, 0, 1208, 453, 11, 0, 1191, 550,
    11, 0, 1098, 494, 10, 0, 1071, 299, 10, 0, 1042, 348, 10, 0, 856, 337, 10,
    0, 815, 727, 10, 0, 981, 739, 10, 0, 899, 283, 10, 0, 991, 312, 10, 0, 865,
    310, 10, 0, 858, 489, 10, 0, 691, 378, 10, 0, 802, 367, 10, 0, 1059, 532,
    10, 0, 1039, 386, 10, 0, 1023, 373, 10, 0, 781, 723, 10, 0, 1006, 340, 10,
    0, 983, 417, 10, 0, 866, 707, 10, 0, 841, 363, 10, 0, 799, 426, 10, 0, 791,
    477, 10, 0, 784, 391, 10, 0, 1056, 337, 9, 0, 893, 486, 9, 0, 831, 653, 9,
    0, 754, 467, 9, 0, 1078, 469, 9, 0, 1075, 421, 9, 0, 1072, 367, 9, 0, 1048,
    479, 9, 0, 1037, 504, 9, 0, 1022, 526, 9, 0, 1017, 481, 9, 0, 968, 665, 9,
    0, 933, 324, 9, 0, 905, 315, 9, 0, 883, 634, 9, 0, 872, 671, 9, 0, 828, 513,
    9, 0, 823, 560, 9, 0, 748, 561, 9, 0, 1032, 575, 9, 0, 962, 319, 9, 0, 913,
    358, 9, 0, 896, 595, 9, 0, 875, 324, 9, 0, 838, 585, 9, 0, 778, 642, 9, 0,
    749, 419, 9, 0, 740, 505, 9, 0, 1187, 845, 9, 0, 1040, 550, 9, 0, 1036, 423,
    9, 0, 992, 385, 9, 0, 975, 525, 9, 0, 971, 556, 9, 0, 959, 637, 9, 0, 939,
    662, 9, 0, 935, 482, 9, 0, 886, 529, 9, 0, 855, 563, 9, 0, 803, 458, 9, 0,
    783, 320, 9, 0, 763, 444, 9, 0, 749, 633, 9, 0, 1054, 446, 8, 0, 1013, 553,
    8, 0, 997, 564, 8, 0, 982, 572, 8, 0, 932, 549, 8, 0, 887, 390, 8, 0, 843,
    455, 8, 0, 812, 498, 8, 0, 775, 360, 8, 0, 762, 490, 8, 0, 712, 609, 8, 0,
    711, 510, 8, 0, 688, 486, 8, 0, 1215, 801, 8, 0, 1189, 777, 8, 0, 1149, 819,
    8, 0, 1087, 568, 8, 0, 1072, 545, 8, 0, 1050, 415, 8, 0, 1032, 454, 8, 0,
    1002, 503, 8, 0, 991, 530, 8, 0, 935, 597, 8, 0, 923, 584, 8, 0, 844, 539,
    8, 0, 775, 610, 8, 0, 767, 584, 8, 0, 741, 604, 8, 0, 706, 541, 8, 0, 1068,
    393, 8, 0, 1061, 763, 8, 0, 894, 376, 8, 0, 813, 309, 8, 0, 1343, 729, 8, 0,
    1222, 828, 8, 0, 1144, 322, 8, 0, 1113, 815, 8, 0, 1086, 634, 8, 0, 1074,
    733, 8, 0, 979, 378, 8, 0, 975, 346, 8, 0, 891, 345, 8, 0, 866, 370, 8, 0,
    859, 601, 8, 0, 775, 547, 8, 0, 1345, 680, 8, 0, 1311, 621, 8, 0, 1271, 764,
    8, 0, 1210, 748, 8, 0, 1157, 606, 8, 0, 1136, 745, 8, 0, 1107, 748, 8, 0,
    1099, 775, 8, 0, 1073, 796, 8, 0, 962, 352, 8, 0, 905, 655, 8, 0, 816, 607,
    8, 0, 784, 431, 8, 0, 757, 341, 8, 0, 1340, 643, 8, 0, 1284, 693, 8, 0,
    1160, 773, 8, 0, 1151, 703, 8, 0, 1120, 716, 8, 0, 1101, 661, 8, 0, 983,
    632, 8, 0, 923, 385, 8, 0, 851, 440, 8, 0, 790, 463, 8, 0, 771, 399, 8, 0,
    1296, 589, 7, 0, 1276, 726, 7, 0, 1238, 651, 7, 0, 1238, 619, 7, 0, 1212,
    589, 7, 0, 1206, 640, 7, 0, 1186, 612, 7, 0, 1173, 644, 7, 0, 1166, 741, 7,
    0, 1146, 669, 7, 0, 1133, 578, 7, 0, 1116, 687, 7, 0, 1074, 669, 7, 0, 1059,
    697, 7, 0, 997, 424, 7, 0, 959, 348, 7, 0, 785, 464, 7, 0, 726, 440, 7, 0,
    1315, 701, 7, 0, 1307, 663, 7, 0, 1269, 663, 7, 0, 1243, 578, 7, 0, 1240,
    774, 7, 0, 1005, 593, 7, 0, 901, 555, 7, 0, 1266, 606, 7, 0, 1249, 695, 7,
    0, 1179, 808, 7, 0, 1089, 704, 7, 0, 1000, 454, 7, 0, 927, 631, 7, 0, 816,
    434, 7, 0, 1069, 503, 7, 0, 946, 451, 7, 0, 843, 511, 7, 0, 813, 388, 7, 0,
    783, 513, 7, 0, 1244, 734, 6, 0, 1129, 786, 6, 0, 1054, 594, 6, 0, 989, 750,
    6, 0, 968, 444, 6, 0, 965, 405, 6, 0, 958, 534, 6, 0, 955, 386, 6, 0, 951,
    502, 6, 0, 910, 569, 6, 0, 874, 463, 6, 0, 860, 642, 6, 0, 819, 341, 6, 0,
    733, 533, 6, 0, 729, 538, 6, 0, 1301, 772, 6, 0, 1008, 435, 6, 0, 831, 374,
    6, 0, 818, 385, 6, 0, 814, 409, 6, 0, 791, 569, 6, 0, 1013, 359, 6, 0, 941,
    451, 6, 0, 839, 325, 6, 0, 831, 474, 6, 0, 805, 627, 6, 0, 795, 569, 6, 0,
    795, 338, 6, 0, 723, 570, 6, 0, 1309, 735, 5, 0, 1009, 393, 5, 0, 1006, 394,
    5, 0, 926, 343, 5, 0, 914, 406, 5, 0, 869, 544, 5, 0, 834, 623, 5, 0, 815,
    403, 5, 0, 811, 401, 5, 0, 1310, 738, 5, 0, 1305, 734, 5, 0, 1011, 404, 5,
    0, 1006, 404, 5, 0, 993, 452, 5, 0, 873, 552, 5, 0, 839, 318, 5, 0, 1280,
    630, 4, 0, 1061, 591, 4, 0, 960, 590, 4, 0, 953, 605, 4, 0, 946, 559, 4, 0,
    925, 335, 4, 0, 918, 459, 4, 0, 908, 404, 4, 0, 904, 614, 4, 0, 859, 652, 4,
    0, 834, 379, 4, 0, 722, 579, 4, 0, 1011, 427, 4, 0, 960, 580, 4, 0, 951,
    613, 4, 0, 945, 568, 4, 0, 930, 622, 4, 0, 908, 562, 4, 0, 900, 613, 4, 0,
    884, 576, 4, 0, 855, 651, 4, 0, 820, 351, 4, 0, 807, 402, 4, 0, 1317, 543,
    16, 1, 1343, 500, 16, 1, 1071, 835, 16, 1, 1195, 416, 16, 1, 1178, 469, 16,
    1, 1318, 338, 15, 1, 1360, 455, 15, 1, 673, 271, 15, 1, 1234, 492, 15, 1,
    1152, 540, 15, 1, 927, 423, 15, 1, 857, 826, 15, 1, 1258, 326, 14, 1, 1118,
    197, 14, 1, 1192, 508, 14, 1, 1131, 634, 14, 1, 1099, 600, 14, 1, 981, 472,
    14, 1, 943, 373, 14, 1, 876, 502, 14, 1, 876, 422, 13, 1, 655, 350, 13, 1,
    1313, 453, 13, 1, 965, 490, 13, 1, 810, 803, 13, 1, 1156, 392, 12, 1, 1292,
    492, 12, 1, 1274, 533, 12, 1, 910, 519, 12, 1, 1156, 428, 12, 1, 597, 538,
    12, 1, 1227, 374, 12, 1, 979, 245, 11, 1, 1096, 267, 11, 1, 983, 705, 11, 1,
    958, 275, 11, 1, 942, 734, 11, 1, 932, 516, 11, 1, 1081, 229, 11, 1, 778,
    287, 11, 1, 1100, 335, 11, 1, 758, 524, 11, 1, 706, 460, 11, 1, 610, 659,
    11, 1, 842, 411, 11, 1, 1303, 414, 10, 1, 1234, 539, 10, 1, 898, 426, 10, 1,
    810, 251, 10, 1, 750, 317, 10, 1, 858, 401, 10, 1, 1092, 441, 10, 1, 775,
    240, 10, 1, 677, 313, 10, 1, 1162, 580, 10, 1, 821, 222, 10, 1, 727, 293,
    10, 1, 1109, 304, 10, 1, 1013, 176, 10, 1, 943, 211, 10, 1, 900, 447, 10, 1,
    898, 215, 10, 1, 841, 280, 10, 1, 1136, 280, 10, 1, 801, 585, 10, 1, 744,
    252, 10, 1, 711, 330, 10, 1, 684, 715, 10, 1, 1261, 403, 9, 1, 860, 217, 9,
    1, 807, 279, 9, 1, 660, 489, 9, 1, 605, 497, 9, 1, 1015, 653, 9, 1, 947,
    701, 9, 1, 928, 246, 9, 1, 889, 242, 9, 1, 871, 271, 9, 1, 764, 683, 9, 1,
    734, 703, 9, 1, 726, 355, 9, 1, 696, 421, 9, 1, 649, 606, 9, 1, 612, 449, 9,
    1, 605, 591, 9, 1, 683, 565, 9, 1, 678, 448, 9, 1, 1016, 617, 9, 1, 677,
    520, 9, 1, 959, 775, 8, 1, 929, 288, 8, 1, 1021, 731, 8, 1, 1000, 773, 7, 1,
    1027, 700, 7, 1, 744, 372, 7, 1, 745, 367, 6, 1, 604, 285, 16, 2, 565, 377,
    16, 2, 1056, 191, 16, 2, 655, 411, 15, 2, 1353, 407, 14, 2, 615, 392, 14, 2,
    1310, 379, 13, 2, 896, 739, 12, 2, 728, 742, 11, 2, 722, 394, 11, 2, 713,
    262, 11, 2, 708, 672, 11, 2, 1102, 393, 10, 2, 975, 287, 10, 2, 801, 671,
    10, 2, 1121, 424, 10, 2, 1037, 272, 10, 2, 1046, 631, 9, 2, 1005, 273, 9, 2,
    718, 644, 9, 2, 801, 535, 9, 2, 642, 458, 9, 2, 637, 570, 9, 2, 869, 771, 9,
    2, 847, 741, 9, 2, 847, 245, 9, 2, 839, 681, 9, 2, 1184, 361, 9, 2, 1024,
    239, 9, 2, 908, 179, 9, 2, 723, 481, 9, 2, 607, 333, 9, 2, 929, 768, 8, 2,
    1126, 248, 8, 2, 1118, 364, 6, 2, 1114, 365, 6, 2, 1268, 444, 16, 3, 1166,
    226, 16, 3, 906, 695, 14, 3, 1142, 501, 14, 3, 1129, 463, 13, 3, 1270, 365,
    12, 3, 771, 765, 11, 3, 1218, 337, 11, 3, 1149, 354, 11, 3, 649, 535, 10, 3,
    662, 644, 10, 3, 651, 684, 10, 3, 1060, 247, 10, 3, 969, 177, 9, 3,
  ];
  SC.push({
    act: 2,
    dark: true,
    dur: 6800,
    html: function () {
      return plate(10);
    },
    run: function (s, t) {
      var cv = s.querySelector("[data-g]"),
        g = cv.getContext("2d");
      var COL = [
        "rgb(0,224,122)",
        "rgb(30,161,255)",
        "rgb(251,178,0)",
        "rgb(255,77,78)",
        "rgb(178,77,255)",
      ];
      var N = [];
      for (var i = 0; i < GN.length; i += 4)
        N.push({ x: GN[i], y: GN[i + 1], r: GN[i + 2], c: GN[i + 3] });
      var hubs = N.filter(function (n) {
        return (
          n.c === 1 &&
          n.r >= 9 &&
          Math.abs(n.x - 920) < 220 &&
          Math.abs(n.y - 420) < 200
        );
      });
      if (!hubs.length) hubs = [N[0]];
      var seed = 5;
      function rnd() {
        seed = (seed * 16807) % 2147483647;
        return (seed - 1) / 2147483646;
      }
      // same graph as before, now populated with motion
      var E = [];
      N.forEach(function (n) {
        var h = hubs[Math.floor(rnd() * hubs.length)];
        E.push({ a: h, b: n, al: 0.18 + rnd() * 0.2 });
        if (rnd() < 0.5) {
          var m = N[Math.floor(rnd() * N.length)];
          if (Math.hypot(m.x - n.x, m.y - n.y) < 140)
            E.push({ a: n, b: m, al: 0.24 });
        }
      });
      var L = [
        "Patient ••••",
        "Dr. •. K••••",
        "Clinic ••",
        "Rx ••••",
        "Lab ••••",
        "Payer ••",
        "Referral ••••",
        "Care Site ••",
      ];
      var CX = 930,
        CY = 430,
        maxD = 0;
      N.forEach(function (n) {
        n.d = Math.hypot(n.x - CX, n.y - CY);
        if (n.d > maxD) maxD = n.d;
      });
      var js = 11;
      function jr() {
        js = (js * 16807) % 2147483647;
        return (js - 1) / 2147483646;
      }
      N.forEach(function (n) {
        n.t0 = 150 + Math.pow(n.d / maxD, 1.15) * 1500 + jr() * 220;
      });
      hubs.forEach(function (h) {
        h.t0 = Math.min(h.t0, 60 + jr() * 120);
        h.hub = 1;
      });
      E.forEach(function (e) {
        e.t0 = Math.max(e.a.t0, e.b.t0) - 60;
      });
      function back(k) {
        var c = 1.9;
        return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2);
      }
      function ease(k) {
        return 1 - Math.pow(1 - k, 3);
      }
      var RGB = [
        [0, 224, 122],
        [30, 161, 255],
        [251, 178, 0],
        [255, 77, 78],
        [178, 77, 255],
      ];
      var st = performance.now();
      (function frame(now) {
        if (!t.live()) return;
        var el = now - st;
        g.clearRect(0, 0, 1920, 992);
        // shockwave rings from the centre
        [0, 380].forEach(function (off) {
          var k = (el - off) / 1700;
          if (k > 0 && k < 1) {
            g.beginPath();
            g.arc(CX, CY, 30 + ease(k) * 560, 0, Math.PI * 2);
            g.strokeStyle = "rgba(110,170,255," + 0.28 * (1 - k) + ")";
            g.lineWidth = 2 - k;
            g.stroke();
          }
        });
        // edges grow from source to target
        E.forEach(function (e) {
          var k = Math.max(0, Math.min(1, (el - e.t0) / 420));
          if (!k) return;
          var q = ease(k),
            x = e.a.x + (e.b.x - e.a.x) * q,
            y = e.a.y + (e.b.y - e.a.y) * q;
          var flash = k < 1 ? (1 - k) * 0.45 : 0;
          g.strokeStyle =
            "rgba(" +
            ((110 + flash * 200) | 0) +
            "," +
            ((135 + flash * 160) | 0) +
            "," +
            ((185 + flash * 70) | 0) +
            "," +
            (e.al + flash) +
            ")";
          g.lineWidth = 0.7 + flash;
          g.beginPath();
          g.moveTo(e.a.x, e.a.y);
          g.lineTo(x, y);
          g.stroke();
        });
        // nodes pop with a glow
        N.forEach(function (n) {
          var k = Math.max(0, Math.min(1, (el - n.t0) / 480));
          if (!k) return;
          var c = RGB[n.c],
            sc = back(k),
            fx = n.x + (CX - n.x) * (1 - ease(k)) * 0.18,
            fy = n.y + (CY - n.y) * (1 - ease(k)) * 0.18;
          var glow = k < 1 ? 1 - k : 0;
          if (n.hub && el > n.t0 + 480)
            glow = Math.max(glow, 0.16 + 0.12 * Math.sin(el / 420 + n.x));
          if (glow > 0.02) {
            var gr = g.createRadialGradient(
              fx,
              fy,
              n.r * 0.6,
              fx,
              fy,
              n.r * (2.6 + glow),
            );
            gr.addColorStop(0, "rgba(" + c + "," + 0.55 * glow + ")");
            gr.addColorStop(1, "rgba(" + c + ",0)");
            g.fillStyle = gr;
            g.beginPath();
            g.arc(fx, fy, n.r * (2.6 + glow), 0, Math.PI * 2);
            g.fill();
          }
          g.globalAlpha = Math.min(1, k * 2.2);
          g.beginPath();
          g.arc(fx, fy, Math.max(0.1, n.r * sc), 0, Math.PI * 2);
          g.fillStyle = COL[n.c];
          g.fill();
          g.lineWidth = 1;
          g.strokeStyle = "rgba(0,0,0,.55)";
          g.stroke();
          g.globalAlpha = 1;
        });
        // labels settle in last
        var lk = Math.max(0, Math.min(1, (el - 1700) / 700));
        if (lk) {
          g.font = "400 6.5px PFLato, Lato, sans-serif";
          g.fillStyle = "rgba(120,132,150," + 0.75 * lk + ")";
          N.forEach(function (n, i) {
            if (i % 3 === 0) return;
            g.fillText(
              L[i % L.length] + (10 + (i % 89)),
              n.x - n.r - 2 - 40,
              n.y + n.r + 7,
            );
          });
        }
        requestAnimationFrame(frame);
      })(st);
      t.cam(0, 1.18, 960, 470);
      t.camTo(1, 960, 496, 2200);
      t.count(s.querySelector("[data-cnt]"), 2846, 1800);
      t.at(2400, function () {
        t.camTo(1.06, 960, 520, 3800);
      });
      var tg =
        N.filter(function (n) {
          return n.c === 3;
        })[0] || N[0];
      t.at(2800, function () {
        t.cursor(1500, 760, 0);
        t.move(tg.x, tg.y, 800);
      });
      t.at(3700, function () {
        var tp = s.querySelector("[data-tip]");
        tp.style.left = tg.x + 24 + "px";
        tp.style.top = tg.y - 86 + "px";
        tp.style.opacity = 1;
        t.A(
          tp,
          [
            { opacity: 0, transform: "translateY(6px)" },
            { opacity: 1, transform: "none" },
          ],
          360,
        );
      });
      t.at(5900, function () {
        t.camTo(1, 960, 496, 800);
      });
    },
  });

  var ACTS = [
    [
      "01",
      "From terminal to SaaS",
      "A command-line engine reborn as a guided 7-step workflow",
    ],
    [
      "02",
      "One-page Data Factory",
      "Built for data prep, grown into one page that skips the input grind",
    ],
    ["03", "Agentic AI, V1", "Ask your data anything. Every answer traceable."],
  ];
  var actDur = [0, 0, 0];
  SC.forEach(function (sc) {
    actDur[sc.act] += sc.dur;
  });

  /* ---------- engine ---------- */
  var cur = -1,
    timers = [],
    anims = [],
    live = false,
    gen = 0,
    paused = false,
    actStart = 0;
  var cursor = document.createElement("div");
  cursor.className = "pf-cursor";
  cursor.innerHTML =
    '<svg viewBox="0 0 28 28"><path d="M5 3l16 9.5-7 1.6-3.6 6.9z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  var cx0 = 0,
    cy0 = 0;

  function T(scene, g) {
    var cam = scene.querySelector(".pf-cam"),
      camS = 1,
      camX = 960,
      camY = 496;
    function ok() {
      return g === gen && live;
    }
    function A(el, kf, d, e, delay) {
      if (!el || !el.animate) return;
      var a = el.animate(kf, {
        duration: d,
        easing: e || "cubic-bezier(.22,.8,.24,1)",
        delay: delay || 0,
        fill: "both",
      });
      anims.push(a);
      return a;
    }
    function tf(s, x, y) {
      var tx = 960 - x * s,
        ty = 496 - y * s;
      tx = Math.min(0, Math.max(W - W * s, tx));
      ty = Math.min(0, Math.max(H - H * s, ty));
      return "translate(" + tx + "px," + ty + "px) scale(" + s + ")";
    }
    var api = {
      live: ok,
      A: A,
      at: function (ms, fn) {
        timers.push(
          setTimeout(function () {
            if (ok()) fn();
          }, ms),
        );
      },
      cam: function (s0, s1, x, y, d) {
        cam.style.transformOrigin = "0 0";
        camS = s1;
        camX = x;
        camY = y;
        if (!d) {
          cam.style.transform = tf(s1, x, y);
          return;
        }
        A(
          cam,
          [{ transform: tf(s0, x, y) }, { transform: tf(s1, x, y) }],
          d,
          "cubic-bezier(.45,0,.2,1)",
        );
      },
      camTo: function (s1, x, y, d) {
        cam.style.transformOrigin = "0 0";
        var from = tf(camS, camX, camY);
        camS = s1;
        camX = x;
        camY = y;
        var to = tf(s1, x, y);
        cam.getAnimations().forEach(function (a) {
          if (a.commitStyles) a.commitStyles();
          a.cancel();
        });
        A(
          cam,
          [{ transform: cam.style.transform || from }, { transform: to }],
          d,
          "cubic-bezier(.6,0,.2,1)",
        );
        cam.style.transform = to;
      },
      cursor: function (x, y) {
        cx0 = x;
        cy0 = y;
        scene.querySelector(".pf-cam").appendChild(cursor);
        cursor.style.transform = "translate(" + x + "px," + y + "px)";
        cursor.style.opacity = 1;
      },
      move: function (x, y, d) {
        A(
          cursor,
          [
            { transform: "translate(" + cx0 + "px," + cy0 + "px)" },
            { transform: "translate(" + x + "px," + y + "px)" },
          ],
          d,
          "cubic-bezier(.5,0,.15,1)",
        );
        cx0 = x;
        cy0 = y;
        cursor.style.transform = "translate(" + x + "px," + y + "px)";
      },
      click: function () {
        var r = document.createElement("span");
        r.className = "pf-ring";
        r.style.left = cx0 + 6 + "px";
        r.style.top = cy0 + 5 + "px";
        cam.appendChild(r);
        A(
          r,
          [
            { transform: "scale(.3)", opacity: 1 },
            { transform: "scale(1.3)", opacity: 0 },
          ],
          520,
          "ease-out",
        );
        A(
          cursor,
          [
            { transform: "translate(" + cx0 + "px," + cy0 + "px) scale(1)" },
            { transform: "translate(" + cx0 + "px," + cy0 + "px) scale(.82)" },
            { transform: "translate(" + cx0 + "px," + cy0 + "px) scale(1)" },
          ],
          240,
        );
      },
      count: function (el, to, d, dec, suf) {
        var st = performance.now();
        (function f(now) {
          if (!ok()) return;
          var k = Math.min(1, (now - st) / d),
            e = 1 - Math.pow(1 - k, 3),
            v = to * e;
          el.textContent =
            (dec ? v.toFixed(dec) : Math.round(v).toLocaleString("en-US")) +
            (suf || "");
          if (k < 1) requestAnimationFrame(f);
        })(st);
      },
      type: function (el, txt, d) {
        var st = performance.now();
        el.textContent = "";
        (function f(now) {
          if (!ok()) return;
          var k = Math.min(1, (now - st) / d);
          el.textContent = txt.slice(0, Math.round(txt.length * k));
          if (k < 1) requestAnimationFrame(f);
        })(st);
      },
      stream: function (el, txt, d) {
        var words = txt.split(/(\s+)/),
          st = performance.now();
        (function f(now) {
          if (!ok()) return;
          var k = Math.min(1, (now - st) / d);
          el.innerText = words.slice(0, Math.round(words.length * k)).join("");
          if (k < 1) requestAnimationFrame(f);
        })(st);
      },
      drag: function (knob, fill, x0, x1, d, lab) {
        var st = performance.now();
        (function f(now) {
          if (!ok()) return;
          var k = Math.min(1, (now - st) / d),
            e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2,
            x = x0 + (x1 - x0) * e;
          knob.style.left = x + "px";
          fill.style.width = x - 1472 + 12 + "px";
          knob.textContent = lab(x);
          if (k < 1) requestAnimationFrame(f);
        })(st);
      },
      flyTo: function (x0, y0, x1, y1, txt, d, done) {
        var g2 = document.createElement("div");
        g2.className = "pf-a pf-card pf-t12";
        g2.style.cssText =
          "left:0;top:0;padding:8px 14px;border:1px solid #1E4FA8;color:#1E4FA8;box-shadow:0 12px 30px -10px rgba(0,0,0,.35);z-index:40;white-space:nowrap";
        g2.textContent = txt;
        cam.appendChild(g2);
        var a = A(
          g2,
          [
            {
              transform:
                "translate(" +
                (x0 - 40) +
                "px," +
                (y0 - 16) +
                "px) rotate(-3deg)",
              opacity: 0.2,
            },
            {
              transform:
                "translate(" + (x1 - 40) + "px," + (y1 - 16) + "px) rotate(0)",
              opacity: 1,
            },
          ],
          d,
          "cubic-bezier(.5,0,.2,1)",
        );
        if (a)
          a.onfinish = function () {
            g2.remove();
            if (ok()) done();
          };
      },
    };
    return api;
  }

  var scenes = SC.map(function (sc) {
    var el = document.createElement("div");
    el.className = "pf-scene" + (sc.dark ? " dark" : "");
    el.innerHTML = '<div class="pf-cam"></div>';
    stage.appendChild(el);
    return el;
  });

  var ovAct = -1,
    ovT0 = 0,
    ovLeft = 10000,
    ovTimer = 0,
    OV_MS = 10000;
  function armOv() {
    clearTimeout(ovTimer);
    ovT0 = performance.now();
    ovTimer = setTimeout(
      function () {
        ovTimer = 0;
        ov.classList.add("off");
      },
      Math.max(0, ovLeft),
    );
  }
  function setActUI(i, k) {
    if (SC[i].act !== ovAct) {
      ovAct = SC[i].act;
      var a = ACTS[ovAct];
      ovN.textContent = a[0];
      ovT.textContent = a[1];
      ovS.textContent = a[2];
      ov.classList.remove("off");
      ovLeft = ovAct === 0 ? 14000 : OV_MS;
      armOv();
    }
    ov.classList.toggle("dk", !!SC[i].dark);
    ctl.classList.toggle("dk", !!SC[i].dark);
    bars.forEach(function (b, j) {
      b.getAnimations().forEach(function (x) {
        x.cancel();
      });
      b.style.transform = "scaleX(" + (j < SC[i].act ? 1 : 0) + ")";
    });
    var actIdx = SC[i].act,
      pre = 0;
    for (var q = 0; q < i; q++) if (SC[q].act === actIdx) pre += SC[q].dur;
    var b = bars[actIdx];
    var a0 = pre / actDur[actIdx],
      a1 = (pre + SC[i].dur) / actDur[actIdx];
    var an = b.animate(
      [
        { transform: "scaleX(" + a0 + ")" },
        { transform: "scaleX(" + a1 + ")" },
      ],
      { duration: SC[i].dur, easing: "linear", fill: "forwards" },
    );
    anims.push(an);
  }

  function show(i) {
    gen++;
    var g = gen;
    timers.forEach(clearTimeout);
    timers = [];
    anims.forEach(function (a) {
      try {
        a.cancel();
      } catch (e) {}
    });
    anims = [];
    var prev = cur;
    cur = i;
    var el = scenes[i],
      cam = el.querySelector(".pf-cam");
    cam.innerHTML = SC[i].html();
    cam.querySelectorAll("img").forEach(function (image) { image.alt = ""; });
    cam.style.transform = "";
    el.classList.add("on");
    el.style.zIndex = 2;
    el.animate(
      [
        { opacity: 0, transform: "scale(1.025)", filter: "blur(6px)" },
        { opacity: 1, transform: "none", filter: "blur(0)" },
      ],
      { duration: 700, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" },
    );
    if (prev > -1 && prev !== i) {
      var pe = scenes[prev];
      pe.style.zIndex = 1;
      var out = pe.animate(
        [
          { opacity: 1, transform: "none", filter: "blur(0)" },
          { opacity: 0, transform: "scale(.985)", filter: "blur(4px)" },
        ],
        { duration: 650, easing: "ease", fill: "both" },
      );
      out.onfinish = function () {
        if (cur !== prev) {
          pe.classList.remove("on");
          pe.querySelector(".pf-cam").innerHTML = "";
        }
      };
    }
    cursor.style.opacity = 0;
    setActUI(i);
    var t = T(el, g);
    SC[i].run(el.querySelector(".pf-cam"), t);
    timers.push(
      setTimeout(function () {
        if (g === gen && live) show((i + 1) % SC.length);
      }, SC[i].dur),
    );
  }

  function start() {
    if (live) return;
    live = true;
    if (ovAct >= 0 && ovTimer === 0 && !ov.classList.contains("off")) armOv();
    show(cur < 0 ? 0 : cur);
  }
  function stop() {
    live = false;
    gen++;
    timers.forEach(clearTimeout);
    timers = [];
    if (ovTimer) {
      clearTimeout(ovTimer);
      ovTimer = 0;
      ovLeft -= performance.now() - ovT0;
    }
  }

  function still() {
    var i = 2;
    cur = i;
    var el = scenes[i];
    el.classList.add("on");
    el.style.opacity = 1;
    var cam = el.querySelector(".pf-cam");
    cam.innerHTML = SC[i].html();
    cam.querySelectorAll("img").forEach(function (image) { image.alt = ""; });
    el.querySelectorAll("[data-n]").forEach(function (e) {
      e.textContent = (+e.getAttribute("data-n")).toLocaleString("en-US");
    });
    el.querySelectorAll("[data-p]").forEach(function (e) {
      e.textContent = e.getAttribute("data-p") + "%";
    });
    el.querySelectorAll("[data-tv]").forEach(function (e) {
      e.style.opacity = 1;
    });
    var a = ACTS[0];
    ovN.textContent = a[0];
    ovT.textContent = a[1];
    ovS.textContent = a[2];
    ctl.hidden = true;
  }

  if (reduce) {
    still();
    return;
  }

  var visible = false;
  function sync() {
    if (visible && !paused && !document.hidden) start();
    else stop();
  }
  if ("IntersectionObserver" in window)
    new IntersectionObserver(
      function (es) {
        visible = es[0].isIntersecting;
        sync();
      },
      { threshold: 0.25 },
    ).observe(fig);
  else {
    visible = true;
    sync();
  }
  document.addEventListener("visibilitychange", sync);
  ctl.addEventListener("click", function () {
    paused = !paused;
    ctl.setAttribute("aria-pressed", String(paused));
    ctl.setAttribute(
      "aria-label",
      paused ? "Play product film" : "Pause product film",
    );
    ctl.innerHTML = paused
      ? '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>'
      : '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor"/></svg>';
    sync();
  });
})();

/* ================= Transform film: autonomous data operations ================= */
(function () {
  var fig = document.querySelector('.prodshot.pf2'); if (!fig || fig.dataset.pfReady) return; fig.dataset.pfReady = 'true';
  var view = fig.querySelector('.pf-view'), stage = fig.querySelector('.pf-stage');
  var ov = fig.querySelector('.pf-ov'), ovN = fig.querySelector('.pf-ov-n'), ovT = fig.querySelector('.pf-ov-t b'), ovS = fig.querySelector('.pf-ov-t span');
  var bars = fig.querySelectorAll('.pf-bar i b'), ctl = fig.querySelector('.pf-ctl');
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var W = 1920, H = 992;

  function fit() { var s = view.clientWidth / W; stage.style.transform = 'scale(' + s + ')'; }
  if ('ResizeObserver' in window) new ResizeObserver(fit).observe(view); else window.addEventListener('resize', fit);
  fit();

  var SC = [];
  /* ---------- Transform film: autonomous data operations ---------- */
  var INK = '#111', MUT = '#6B6B6B', LINE = '#E7E7E7', SOFT = '#F5F5F5', OK = '#1F9D55', WARN = '#C98A00', BAD = '#D64545';
  function d(x, y, w, h, st, inner, attrs) { return '<div class="pf-a" ' + (attrs || '') + ' style="left:' + x + 'px;top:' + y + 'px;' + (w != null ? 'width:' + w + 'px;' : '') + (h != null ? 'height:' + h + 'px;' : '') + (st || '') + '">' + (inner || '') + '</div>'; }
  function tx(x, y, size, weight, color, text, attrs, extra) { return '<div class="pf-a" ' + (attrs || '') + ' style="left:' + x + 'px;top:' + y + 'px;font:' + weight + ' ' + size + 'px/1.25 PFLato;color:' + color + ';white-space:nowrap;' + (extra || '') + '">' + text + '</div>'; }
  function dot(c, s) { s = s || 8; return '<span style="display:inline-block;width:' + s + 'px;height:' + s + 'px;border-radius:50%;background:' + c + ';vertical-align:middle"></span>'; }
  function top(dark) {
    var c = dark ? '#fff' : INK, m = dark ? '#8A8A8A' : MUT;
    return '<div class="pf-a pf-logo" style="left:44px;top:30px;color:' + c + '"><span class="pf-mark"></span>workspace</div>' +
      tx(1520, 36, 15, 400, m, dot(OK) + '&nbsp;&nbsp;Agent Yoda · autonomous') +
      '<span class="pf-a" style="left:1836px;top:26px;width:40px;height:40px;border-radius:50%;border:1.5px solid ' + (dark ? '#444' : '#D0D0D0') + ';display:grid;place-items:center;font:700 13px/1 PFLato;color:' + c + '">JR</span>' +
      d(0, 92, 1920, 1, 'background:' + (dark ? '#1E1E1E' : LINE));
  }
  var CREW = [['St', 'Steward', 'Governance · contracts'], ['Ca', 'Cartographer', 'Lineage · knowledge graph'], ['Au', 'Auditor', 'Audit ledger · evidence'], ['Gu', 'Guardian', 'PII · access · security'], ['Ta', 'Tagger', 'Auto-classification'], ['Sc', 'Scrubber', 'Cleaners · standards'], ['Co', 'Counsel', 'HIPAA · GDPR · consent'], ['Cu', 'Custodian', 'Storage · retention · cost'], ['Wa', 'Watcher', 'Observability · SLAs'], ['Ex', 'Explainer', 'Why, for every value'], ['Me', 'Medic', 'Self-repair · rollback'], ['He', 'Herald', 'Alerts · briefs']];
  function glyph(x, y, s, label, dark, attrs) { return '<span class="pf-a" ' + (attrs || '') + ' style="left:' + (x - s / 2) + 'px;top:' + (y - s / 2) + 'px;width:' + s + 'px;height:' + s + 'px;border-radius:50%;border:1.5px solid ' + (dark ? '#fff' : INK) + ';background:' + (dark ? '#000' : '#fff') + ';display:grid;place-items:center;font:700 ' + Math.round(s * .3) + 'px/1 PFLato;color:' + (dark ? '#fff' : INK) + '">' + label + '</span>'; }

  // V1 — Intent: one sentence becomes a living plan
  SC.push({ act: 0, dur: 6600, html: function () {
    var plan = [['Ingest', '7 sources · 4.2M records'], ['Protect', 'PHI masked · HIPAA minimum necessary'], ['Resolve', 'One record per patient'], ['Publish', 'Ready by 05:45 · SLA 06:00']], ph = '';
    plan.forEach(function (p, i) { ph += d(560 + i * 205, 600, 190, 92, 'border:1px solid ' + LINE + ';border-radius:14px;opacity:0;background:#fff', tx(18, 18, 13, 400, MUT, '0' + (i + 1)) + tx(18, 40, 18, 700, INK, p[0]) + tx(18, 66, 12, 400, MUT, p[1]), 'data-plan="' + i + '"'); });
    return top() +
      tx(0, 300, 15, 400, MUT, 'What should your data do?', 'data-q', 'left:0;width:1920px;text-align:center') +
      d(460, 340, 1000, 84, 'border:1.5px solid ' + INK + ';border-radius:42px;background:#fff', tx(38, 25, 26, 400, INK, '<span data-int></span><span data-car style="display:inline-block;width:2px;height:28px;background:' + INK + ';vertical-align:-5px;margin-left:2px"></span>') + '<span class="pf-a" data-go style="right:14px;top:14px;width:56px;height:56px;border-radius:50%;background:' + INK + ';display:grid;place-items:center;color:#fff;font:400 26px/1 PFLato">↑</span>') +
      tx(0, 470, 15, 400, MUT, '', 'data-compile', 'left:0;width:1920px;text-align:center;opacity:0') + ph +
      tx(0, 760, 13, 400, '#9A9A9A', 'No pipelines to build. No steps to click.', 'data-foot', 'left:0;width:1920px;text-align:center;opacity:0');
  }, run: function (s, t) {
    var q = function (a) { return s.querySelector(a); };
    t.cam(0, 1.12, 960, 420); t.camTo(1, 960, 496, 5000);
    t.A(q('[data-car]'), [{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }], 900, 'steps(2)');
    t.at(400, function () { t.type(q('[data-int]'), 'Keep the Care Network clean, compliant and ready by 6 AM.', 2000); });
    t.at(2500, function () { t.cursor(1200, 600, 0); t.move(1404, 382, 400); });
    t.at(2950, function () { t.click(); var c = q('[data-compile]'); c.style.opacity = 1; c.innerHTML = dot(OK) + '&nbsp;&nbsp;Agent Yoda compiled your intent into a living plan'; t.A(c, [{ opacity: 0 }, { opacity: 1 }], 400); });
    [0, 1, 2, 3].forEach(function (i) { t.at(3300 + i * 180, function () { var p = q('[data-plan="' + i + '"]'); p.style.opacity = 1; t.A(p, [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], 500, 'cubic-bezier(.2,.9,.2,1)'); }); });
    t.at(4500, function () { var f = q('[data-foot]'); f.style.opacity = 1; t.A(f, [{ opacity: 0 }, { opacity: 1 }], 500); });
  } });

  // V2 — The crew: twelve specialist agents assemble around Yoda
  SC.push({ act: 0, dur: 6000, html: function () {
    var cx = 960, cy = 540, R = 300, h = '', lines = '';
    CREW.forEach(function (c, i) {
      var a = -Math.PI / 2 + i / CREW.length * Math.PI * 2, x = cx + Math.cos(a) * R * 1.45, y = cy + Math.sin(a) * R;
      lines += '<line data-l="' + i + '" x1="' + cx + '" y1="' + cy + '" x2="' + x + '" y2="' + y + '" stroke="' + LINE + '" stroke-width="1.5"/>';
      var lx = x + (Math.cos(a) >= -0.05 ? 40 : -40), al = Math.cos(a) >= -0.05 ? 'left' : 'right';
      h += glyph(x, y, 56, c[0], false, 'data-ag="' + i + '"') +
        '<div class="pf-a" data-al="' + i + '" style="top:' + (y - 18) + 'px;' + (al === 'left' ? 'left:' + lx + 'px' : 'right:' + (1920 - lx) + 'px') + ';text-align:' + al + ';white-space:nowrap;opacity:0"><div style="font:700 15px/1.2 PFLato;color:' + INK + '">' + c[1] + ' <span data-st="' + i + '" style="display:inline-block;width:7px;height:7px;border-radius:50%;background:#C8C8C8;vertical-align:2px;margin-left:4px"></span></div><div style="font:400 12px/1.4 PFLato;color:' + MUT + '">' + c[2] + '</div></div>';
    });
    return top() + tx(44, 120, 15, 400, MUT, 'Intent', '', '') + tx(44, 142, 18, 700, INK, 'Keep the Care Network clean, compliant and ready by 6 AM.') +
      '<svg class="pf-a" style="left:0;top:0;width:1920px;height:992px;overflow:visible">' + lines + '</svg>' + h +
      glyph(cx, cy, 96, 'Y', false, 'data-yoda') + tx(0, cy + 62, 16, 700, INK, 'Agent Yoda', '', 'left:0;width:1920px;text-align:center') +
      tx(0, 930, 14, 400, MUT, '12 agents assigned. You’ll hear from us only if needed.', 'data-msg', 'left:0;width:1920px;text-align:center;opacity:0');
  }, run: function (s, t) {
    t.cam(0, 1.25, 960, 540); t.camTo(1, 960, 496, 2600);
    t.A(s.querySelector('[data-yoda]'), [{ transform: 'scale(.4)', opacity: 0 }, { transform: 'scale(1.08)' }, { transform: 'none', opacity: 1 }], 700, 'cubic-bezier(.2,1.2,.4,1)');
    CREW.forEach(function (c, i) {
      var g = s.querySelector('[data-ag="' + i + '"]'), l = s.querySelector('[data-al="' + i + '"]'), ln = s.querySelector('[data-l="' + i + '"]');
      g.style.opacity = 0; ln.style.opacity = 0;
      t.at(500 + i * 120, function () { g.style.opacity = 1; ln.style.opacity = 1; t.A(ln, [{ opacity: 0 }, { opacity: 1 }], 400); t.A(g, [{ transform: 'scale(0)' }, { transform: 'scale(1.1)' }, { transform: 'none' }], 520, 'cubic-bezier(.2,1.3,.4,1)'); l.style.opacity = 1; t.A(l, [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], 400, 'ease', 120); });
      t.at(2400 + i * 90, function () { var st = s.querySelector('[data-st="' + i + '"]'); st.style.background = OK; t.A(st, [{ transform: 'scale(2)' }, { transform: 'none' }], 300); });
    });
    t.at(3700, function () { var m = s.querySelector('[data-msg]'); m.style.opacity = 1; t.A(m, [{ opacity: 0 }, { opacity: 1 }], 500); });
  } });

  // V3 — Autonomous night: the quiet pulse and the agent log
  SC.push({ act: 1, dur: 8000, html: function () {
    var log = [
      ['22:04', 'Ta', 'Tagger', 'Classified 214 new fields · 31 tagged PHI'],
      ['22:05', 'Gu', 'Guardian', 'Masked 6 PII fields · tokenized SSN at source'],
      ['22:31', 'Sc', 'Scrubber', 'Standardized 41,203 phone numbers to E.164'],
      ['23:10', 'St', 'Steward', 'Contract check claims_2024 · schema v14 ✓'],
      ['00:42', 'Me', 'Medic', 'rx_fills timed out · retried · recovered in 38s'],
      ['01:15', 'Ca', 'Cartographer', '+12,408 lineage edges · graph updated'],
      ['02:20', 'Cu', 'Custodian', 'Moved 2.1 TB to cold tier · storage cost −18%'],
      ['03:02', 'Wa', 'Watcher', 'Freshness 99.98% · drift forecast for claims feed'],
      ['04:47', 'He', 'Herald', 'Warned billing team: vendor file late by ~20 min']
    ], rows = '';
    log.forEach(function (r, i) { rows += d(980, 190 + i * 74, 896, 64, 'border-bottom:1px solid ' + LINE + ';opacity:0', tx(0, 22, 13, 400, '#9A9A9A', r[0]) + glyph(86, 31, 36, r[1]) + tx(120, 13, 15, 700, INK, r[2]) + tx(120, 35, 14, 400, MUT, r[3]) + '<span class="pf-a" style="right:0;top:26px">' + dot(OK, 8) + '</span>', 'data-row="' + i + '"'); });
    var stats = [['Records processed', '4.2M', 'data-n="4200000"'], ['PII exposures', '0', ''], ['Issues self-healed', '3', 'data-n="3"'], ['Human decisions needed', '1', '']], sh = '';
    stats.forEach(function (m, i) { sh += d(44 + (i % 2) * 430, 520 + Math.floor(i / 2) * 150, 400, 130, 'border:1px solid ' + LINE + ';border-radius:16px', tx(24, 22, 13, 400, MUT, m[0]) + tx(24, 52, 44, 700, i === 3 ? WARN : INK, m[1], m[2])); });
    return top() + tx(44, 120, 15, 400, MUT, 'Overnight · 22:00 – 06:00') + tx(44, 142, 26, 700, INK, 'Quiet means healthy.') +
      d(44, 230, 860, 230, 'border:1px solid ' + LINE + ';border-radius:16px', '<svg class="pf-a" data-pulse style="left:20px;top:30px;width:820px;height:150px;overflow:visible"><path data-pl d="" fill="none" stroke="' + INK + '" stroke-width="2"/></svg>' + tx(24, 192, 12, 400, '#9A9A9A', '22:00') + tx(400, 192, 12, 400, '#9A9A9A', '02:00') + tx(800, 192, 12, 400, '#9A9A9A', '06:00')) +
      tx(980, 150, 15, 700, INK, 'Agent log') + tx(1700, 150, 13, 400, MUT, 'auto-scroll · live') + sh + rows;
  }, run: function (s, t) {
    var pl = s.querySelector('[data-pl]'), pts = [];
    for (var i = 0; i <= 160; i++) { var x = i / 160 * 820, y = 75; if (i % 23 === 7) y = 40; if (i % 23 === 8) y = 110; if (i === 72) y = 15; if (i === 73) y = 130; pts.push(x.toFixed(1) + ' ' + y); }
    pl.setAttribute('d', 'M' + pts.join(' L')); var L = pl.getTotalLength(); pl.style.strokeDasharray = L;
    t.A(pl, [{ strokeDashoffset: L }, { strokeDashoffset: 0 }], 6500, 'linear');
    t.cam(0, 1.06, 960, 496); t.camTo(1, 960, 496, 7000);
    s.querySelectorAll('[data-row]').forEach(function (r, i) { t.at(500 + i * 650, function () { r.style.opacity = 1; t.A(r, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], 450); }); });
    s.querySelectorAll('[data-n]').forEach(function (e) { t.count(e, +e.getAttribute('data-n'), 5500); });
    t.at(5500, function () { s.querySelector('[data-n="4200000"]').textContent = '4.2M'; });
  } });

  // V4 — Compliance on autopilot: GDPR erasure and policy in plain English
  SC.push({ act: 1, dur: 7000, html: function () {
    var sys = [['ehr_encounters', 6], ['claims_2024', 3], ['rx_fills', 2], ['lab_results', 2], ['crm_contacts', 1]], g = '', lines = '';
    sys.forEach(function (sy, i) { var x = 1180 + (i % 2) * 360, y = 330 + i * 92; lines += '<line data-gl="' + i + '" x1="1000" y1="560" x2="' + x + '" y2="' + y + '" stroke="' + LINE + '" stroke-width="1.5"/>'; g += d(x, y - 26, 300, 52, 'border:1px solid ' + LINE + ';border-radius:26px;background:#fff', tx(22, 16, 15, 400, INK, sy[0]) + tx(220, 16, 15, 700, MUT, sy[1] + ' rec', 'data-gc="' + i + '"'), 'data-gn="' + i + '"'); });
    return top() + tx(44, 120, 15, 400, MUT, 'Counsel · Auditor · Cartographer') + tx(44, 142, 26, 700, INK, 'Compliance runs itself, with proof.') +
      d(44, 220, 760, 160, 'border:1.5px solid ' + INK + ';border-radius:18px', tx(28, 26, 13, 400, MUT, 'Incoming · 01:12') + tx(28, 52, 22, 700, INK, 'Erasure request · subject ••••4821') + tx(28, 90, 15, 400, MUT, 'GDPR Art. 17 · verified identity · deadline 30 days') + '<span class="pf-a" data-stat style="right:24px;top:26px;font:700 13px/1 PFLato;color:' + WARN + '">Locating…</span>') +
      d(44, 410, 760, 120, 'background:' + SOFT + ';border-radius:18px', tx(28, 24, 13, 400, MUT, 'Policy in plain English') + tx(28, 50, 20, 400, INK, '“Never let a full SSN leave the vault.”') + tx(28, 84, 13, 700, OK, '', 'data-pol')) +
      d(44, 560, 760, 210, 'border:1px solid ' + LINE + ';border-radius:18px', tx(28, 24, 13, 400, MUT, 'Audit ledger') + '<div class="pf-a" data-led style="left:28px;top:52px;right:28px;font:400 14px/30px PFLato;color:' + INK + '"></div>') +
      '<svg class="pf-a" style="left:0;top:0;width:1920px;height:992px;overflow:visible">' + lines + '</svg>' + glyph(1000, 560, 76, '••21', false, 'data-subj') + g;
  }, run: function (s, t) {
    var q = function (a) { return s.querySelector(a); }, led = q('[data-led]');
    function ledger(txt, c) { var e = document.createElement('div'); e.innerHTML = '<span style="color:#9A9A9A">' + txt[0] + '</span>&nbsp;&nbsp;' + txt[1] + (c ? '&nbsp;&nbsp;<b style="color:' + OK + '">✓</b>' : ''); led.appendChild(e); t.A(e, [{ opacity: 0, transform: 'translateX(-8px)' }, { opacity: 1, transform: 'none' }], 300); }
    s.querySelectorAll('[data-gn],[data-gl]').forEach(function (e) { e.style.opacity = 0; });
    t.cam(0, 1.08, 600, 400); t.camTo(1, 960, 496, 2000);
    [0, 1, 2, 3, 4].forEach(function (i) { t.at(700 + i * 220, function () { var n = q('[data-gn="' + i + '"]'), l = q('[data-gl="' + i + '"]'); n.style.opacity = 1; l.style.opacity = 1; t.A(n, [{ opacity: 0, transform: 'scale(.9)' }, { opacity: 1, transform: 'none' }], 380); }); });
    t.at(1900, function () { var st = q('[data-stat]'); st.textContent = 'Found 14 records · 5 systems'; st.style.color = INK; ledger(['01:12:08', 'Cartographer traced subject across 5 systems'], 1); });
    t.at(2900, function () { [0, 1, 2, 3, 4].forEach(function (i) { var c = q('[data-gc="' + i + '"]'); c.textContent = 'erased'; c.style.color = OK; var n = q('[data-gn="' + i + '"]'); t.A(n, [{ borderColor: INK }, { borderColor: LINE }], 600, 'ease', i * 80); }); ledger(['01:12:41', 'Counsel erased 14 records · backups tombstoned'], 1); });
    t.at(3900, function () { var st = q('[data-stat]'); st.textContent = 'Completed in 29 min'; st.style.color = OK; ledger(['01:41:02', 'Auditor signed evidence pack #A-2291'], 1); });
    t.at(4700, function () { var p = q('[data-pol]'); p.textContent = 'Enforced in 7 pipelines · 0 violations · HIPAA §164.514 ✓'; t.A(p, [{ opacity: 0 }, { opacity: 1 }], 400); ledger(['02:00:00', 'Counsel re-verified HIPAA minimum necessary'], 1); });
  } });

  // V5 — The rare human moment (dark beat)
  SC.push({ act: 2, dark: true, dur: 6600, html: function () {
    return top(true) +
      tx(0, 210, 15, 400, '#8A8A8A', '04:52 · the only interruption tonight', 'data-k', 'left:0;width:1920px;text-align:center') +
      d(560, 260, 800, 520, 'background:#111;border:1px solid #2A2A2A;border-radius:24px;box-shadow:0 40px 120px -40px rgba(0,0,0,.9)',
        tx(40, 40, 14, 700, WARN, dot(WARN) + '&nbsp;&nbsp;One decision needs you') +
        tx(40, 76, 28, 700, '#fff', 'claims_2024 added a new column: <span style="font-family:Menlo,Consolas,monospace;font-weight:400">member_ssn</span>', '', 'white-space:normal;width:720px;line-height:1.3') +
        tx(40, 172, 17, 400, '#BDBDBD', 'I quarantined it before any pipeline could read it. Nothing has been exposed.', '', 'white-space:normal;width:720px;line-height:1.5') +
        d(40, 240, 720, 1, 'background:#2A2A2A') +
        tx(40, 262, 13, 400, '#8A8A8A', 'Evidence') +
        tx(40, 290, 15, 400, '#DADADA', '•  Values match SSN pattern in 99.7% of 18,204 rows', '', '') +
        tx(40, 318, 15, 400, '#DADADA', '•  Not covered by the claims data contract (v14)', '', '') +
        tx(40, 346, 15, 400, '#DADADA', '•  HIPAA: identifier · GDPR: special category', '', '') +
        tx(40, 392, 15, 400, '#fff', 'Recommended: <b>mask at source</b> and <b>notify the vendor</b> · confidence 97%', '', '') +
        '<span class="pf-a" data-ap style="left:40px;top:444px;height:48px;padding:0 28px;border-radius:24px;background:#fff;color:#000;display:flex;align-items:center;font:700 16px/1 PFLato">Approve</span>' +
        '<span class="pf-a" style="left:178px;top:444px;height:48px;padding:0 24px;border-radius:24px;border:1px solid #444;color:#fff;display:flex;align-items:center;font:400 16px/1 PFLato">Review details</span>' +
        '<span class="pf-a" style="left:380px;top:458px;font:400 14px/1 PFLato;color:#8A8A8A">or reply “mask it”</span>', 'data-card') +
      '<div class="pf-a" data-done style="left:0;width:1920px;top:500px;text-align:center;opacity:0"><div style="font:700 34px/1.2 PFLato;color:#fff">' + dot(OK, 14) + '&nbsp;&nbsp;Done.</div><div style="margin-top:14px;font:400 18px/1.4 PFLato;color:#9A9A9A">Masked at source · vendor notified · contract v15 drafted · 0 records exposed</div></div>';
  }, run: function (s, t) {
    var c = s.querySelector('[data-card]');
    t.cam(0, 1, 960, 496);
    t.A(c, [{ opacity: 0, transform: 'translateY(30px) scale(.97)' }, { opacity: 1, transform: 'none' }], 700, 'cubic-bezier(.2,.9,.2,1)', 200);
    t.at(900, function () { t.camTo(1.14, 960, 540, 2400); t.cursor(1300, 860, 0); });
    t.at(2800, function () { t.move(640, 728, 900); });
    t.at(3900, function () { t.click(); var b = s.querySelector('[data-ap]'); t.A(b, [{ transform: 'scale(1)' }, { transform: 'scale(.94)' }, { transform: 'none' }], 240); });
    t.at(4300, function () { t.camTo(1, 960, 496, 700); t.A(c, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.96)' }], 450); c.style.opacity = 0; var dn = s.querySelector('[data-done]'); dn.style.opacity = 1; t.A(dn, [{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], 500, 'ease', 300); });
  } });

  // V6 — Explainability: pull the thread, scrub through time
  SC.push({ act: 2, dur: 7600, html: function () {
    var nodes = [[140, 'ehr_encounters', 'source'], [140, 'claims_2024', 'source'], [140, 'rx_fills', 'source'], [600, 'Scrubber', 'phone → E.164'], [600, 'Guardian', 'mask MRN, name'], [1060, 'Resolver', 'dob ✓ last_name ✓ phone 0.94'], [1520, 'Gold record', 'Patient ••••4821']], h = '', ln = '';
    var Y = [330, 450, 570, 390, 510, 450, 450];
    nodes.forEach(function (n, i) { h += d(n[0], Y[i] - 34, 300, 68, 'border:1.5px solid ' + (i === 6 ? INK : '#CFCFCF') + ';border-radius:14px;background:' + (i === 6 ? INK : '#fff') + ';opacity:0', tx(20, 12, 16, 700, i === 6 ? '#fff' : INK, n[1]) + tx(20, 38, 12, 400, i === 6 ? '#BDBDBD' : MUT, n[2]), 'data-tn="' + i + '"'); });
    var E = [[0, 3], [1, 3], [2, 4], [3, 5], [4, 5], [5, 6]];
    E.forEach(function (e, i) { var a = nodes[e[0]], b = nodes[e[1]], x1 = a[0] + 300, y1 = Y[e[0]], x2 = b[0], y2 = Y[e[1]], mx = (x1 + x2) / 2; ln += '<path data-te="' + i + '" d="M' + x1 + ' ' + y1 + ' C' + mx + ' ' + y1 + ' ' + mx + ' ' + y2 + ' ' + x2 + ' ' + y2 + '" fill="none" stroke="' + INK + '" stroke-width="1.5"/>'; });
    return top() + tx(44, 120, 15, 400, MUT, 'Explainer · Auditor') + tx(44, 142, 26, 700, INK, 'Ask why. Pull the thread.') +
      d(1290, 120, 586, 60, 'border:1px solid ' + LINE + ';border-radius:30px', tx(26, 19, 17, 400, INK, '<span data-why></span>')) +
      '<svg class="pf-a" style="left:0;top:0;width:1920px;height:992px;overflow:visible">' + ln + '</svg>' + h +
      tx(140, 650, 16, 400, INK, '', 'data-exp', 'white-space:normal;width:1680px;line-height:1.5;opacity:0') +
      d(140, 790, 1680, 2, 'background:' + LINE) + d(140, 790, 1680, 2, 'background:' + INK + ';transform-origin:0 0', '', 'data-tl') +
      '<span class="pf-a" data-knob style="left:1808px;top:779px;width:24px;height:24px;border-radius:50%;background:' + INK + '"></span>' +
      tx(140, 816, 12, 400, '#9A9A9A', '22:00') + tx(1784, 816, 12, 400, '#9A9A9A', '06:00') + tx(0, 846, 14, 400, MUT, 'Time-scrub · <b data-time style="color:' + INK + '">06:00</b> · <span data-ev>estate as of now</span>', '', 'left:0;width:1920px;text-align:center');
  }, run: function (s, t) {
    var q = function (a) { return s.querySelector(a); };
    var pts = s.querySelectorAll('[data-te]'); pts.forEach(function (p) { var L = p.getTotalLength(); p.style.strokeDasharray = L; p.style.strokeDashoffset = L; });
    t.cam(0, 1, 960, 496); t.cursor(1700, 600, 0);
    t.at(200, function () { t.move(1560, 150, 600); });
    t.at(850, function () { t.click(); t.type(q('[data-why]'), 'Why was ••••4821 merged with ••••7330?', 1100); });
    var order = [6, 5, 3, 4, 0, 1, 2];
    order.forEach(function (n, k) { t.at(2100 + k * 170, function () { var e = q('[data-tn="' + n + '"]'); e.style.opacity = 1; t.A(e, [{ opacity: 0, transform: 'translateX(18px)' }, { opacity: 1, transform: 'none' }], 380); }); });
    t.at(2400, function () { pts.forEach(function (p, i) { var L = p.getTotalLength(); t.A(p, [{ strokeDashoffset: L }, { strokeDashoffset: 0 }], 700, 'ease-out', (5 - i) * 120); p.style.strokeDashoffset = 0; }); });
    t.at(3500, function () { var e = q('[data-exp]'); e.style.opacity = 1; e.innerHTML = '<b>Because</b> date of birth and last name match exactly across three sources, and the standardized phone number matches with 0.94 confidence. Approved by policy RES-07 · no human override · reversible.'; t.A(e, [{ opacity: 0 }, { opacity: 1 }], 500); });
    t.at(4700, function () { t.move(1820, 791, 500); });
    t.at(5300, function () {
      var k = q('[data-knob]'), tl = q('[data-tl]'), tm = q('[data-time]'), ev = q('[data-ev]'), st = performance.now();
      (function f(now) { if (!t.live()) return; var u = Math.min(1, (now - st) / 1500), e = 1 - Math.pow(1 - u, 3), x = 1808 - e * 1010, frac = (x - 128) / 1680; k.style.left = x + 'px'; tl.style.transform = 'scaleX(' + Math.max(0, frac) + ')'; var mins = Math.round(frac * 480), hh = (22 + Math.floor(mins / 60)) % 24, mm = mins % 60; tm.textContent = (hh < 10 ? '0' : '') + hh + ':' + (mm < 10 ? '0' : '') + mm; t.move(x + 12, 791, 1); if (u < 1) requestAnimationFrame(f); else ev.textContent = 'Resolver merged ••••4821 + ••••7330 · ledger #L-88213'; })(st);
    });
  } });

  // V7 — Morning brief
  SC.push({ act: 2, dur: 6000, html: function () {
    var li = [['4.2M records', 'ready at 05:41, 19 minutes ahead of SLA'], ['0 PII exposures', '1 new identifier caught and masked at source'], ['3 issues', 'self-healed · 1 decision approved by you'], ['Cost', 'storage down 18% after cold-tiering']], h = '';
    li.forEach(function (l, i) { h += d(560, 430 + i * 74, 800, 64, 'border-bottom:1px solid ' + LINE + ';opacity:0', tx(0, 20, 20, 700, INK, l[0]) + tx(260, 22, 17, 400, MUT, l[1]), 'data-li="' + i + '"'); });
    return top() + tx(0, 250, 15, 400, MUT, '06:00 · Morning brief from Agent Yoda', '', 'left:0;width:1920px;text-align:center') +
      tx(0, 290, 44, 700, INK, 'Good morning, Jordan. All quiet.', 'data-h', 'left:0;width:1920px;text-align:center') +
      tx(0, 356, 18, 400, MUT, 'Here is everything that happened while you slept, in four lines.', '', 'left:0;width:1920px;text-align:center') + h +
      tx(0, 800, 22, 700, INK, 'Agents run it. You decide the rare exceptions.', 'data-end', 'left:0;width:1920px;text-align:center;opacity:0');
  }, run: function (s, t) {
    t.cam(0, 1.1, 960, 420); t.camTo(1, 960, 496, 3000);
    t.A(s.querySelector('[data-h]'), [{ opacity: 0, transform: 'translateY(14px)' }, { opacity: 1, transform: 'none' }], 700, 'cubic-bezier(.2,.9,.2,1)', 200);
    s.querySelectorAll('[data-li]').forEach(function (e, i) { t.at(900 + i * 260, function () { e.style.opacity = 1; t.A(e, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], 420); }); });
    t.at(2600, function () { var e = s.querySelector('[data-end]'); e.style.opacity = 1; t.A(e, [{ opacity: 0 }, { opacity: 1 }], 700); });
  } });

  // V8 — On the go: the brief and the one decision, on phone and watch
  SC.push({ act: 2, dur: 9200, html: function () {
    var F = 'font-family:PFLato,-apple-system,sans-serif;';
    function bars() { return '<span style="display:inline-flex;align-items:flex-end;gap:2px;height:11px;margin-right:6px">' + [4, 6, 8, 10].map(function (h) { return '<i style="display:block;width:3px;height:' + h + 'px;border-radius:1px;background:#111"></i>'; }).join('') + '</span>'; }
    function wifi() { return '<svg width="15" height="11" viewBox="0 0 15 11" style="margin-right:6px"><path d="M7.5 10.5 9.6 8.1a3 3 0 0 0-4.2 0zM3.8 6.4a5.4 5.4 0 0 1 7.4 0l1.4-1.6a7.6 7.6 0 0 0-10.2 0zM.9 3.2a9.8 9.8 0 0 1 13.2 0L15.5 1.6a12 12 0 0 0-16 0z" fill="#111"/></svg>'; }
    function batt() { return '<span style="display:inline-block;position:relative;width:24px;height:12px;border:1.5px solid rgba(17,17,17,.45);border-radius:4px;vertical-align:-1px"><i style="position:absolute;left:1.5px;top:1.5px;bottom:1.5px;width:16px;border-radius:2px;background:#111"></i><i style="position:absolute;right:-4px;top:3px;width:2px;height:4px;border-radius:0 1px 1px 0;background:rgba(17,17,17,.45)"></i></span>'; }
    var status = '<div class="pf-a" style="left:34px;right:30px;top:20px;height:20px;display:flex;align-items:center;justify-content:space-between;' + F + 'font-weight:700;font-size:16px;color:#111"><span>6:02</span><span style="display:flex;align-items:center">' + bars() + wifi() + batt() + '</span></div>';
    var island = '<div class="pf-a" style="left:50%;top:14px;width:110px;height:32px;margin-left:-55px;border-radius:16px;background:#050505"></div>';
    // phone lock screen
    var lock = '<div class="pf-a" data-lock style="inset:0;background:radial-gradient(120% 70% at 30% 0%,#f4f4f6 0%,#dcdde2 55%,#c9cbd2 100%)">' +
      '<div class="pf-a" style="left:0;right:0;top:92px;text-align:center;' + F + 'font-size:15px;font-weight:600;color:#3a3a40">Tuesday, October 8</div>' +
      '<div class="pf-a" style="left:0;right:0;top:110px;text-align:center;' + F + 'font-size:92px;font-weight:700;letter-spacing:-3px;color:#16161a">6:02</div>' +
      '<div class="pf-a" data-ban style="left:14px;right:14px;top:300px;padding:14px 16px;border-radius:22px;background:rgba(255,255,255,.72);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 8px 30px -12px rgba(0,0,0,.25);opacity:0;' + F + '">' +
        '<div style="display:flex;align-items:center;gap:8px;font-size:13px;color:#555"><span style="width:22px;height:22px;border-radius:6px;background:#111;display:grid;place-items:center"><span class="pf-mark" style="width:12px;height:12px;color:#fff;border-width:1.5px"></span></span>WORKSPACE<span style="margin-left:auto">now</span></div>' +
        '<div style="margin-top:8px;font-size:15px;font-weight:700;color:#111">Good morning. All quiet.</div>' +
        '<div style="margin-top:2px;font-size:14px;color:#333">Care Network ready at 05:41 · 1 decision is waiting for you.</div></div>' +
      '<div class="pf-a" style="left:50%;bottom:10px;width:130px;height:5px;margin-left:-65px;border-radius:3px;background:#111;opacity:.85"></div></div>';
    // phone app screen
    function row(k, v) { return '<div style="display:flex;justify-content:space-between;align-items:baseline;padding:13px 0;border-bottom:1px solid #EDEDED"><span style="font-size:15px;color:#666">' + k + '</span><span style="font-size:16px;font-weight:700;color:#111">' + v + '</span></div>'; }
    var app = '<div class="pf-a" data-app style="inset:0;background:#fff;opacity:0;' + F + '">' +
      '<div class="pf-a" style="left:24px;right:24px;top:62px;display:flex;align-items:center;justify-content:space-between"><span style="display:flex;align-items:center;gap:7px;font-weight:700;font-size:16px;color:#111"><span class="pf-mark" style="width:17px;height:17px;border-width:1.8px"></span>workspace</span><span style="width:30px;height:30px;border-radius:50%;border:1.5px solid #D0D0D0;display:grid;place-items:center;font-size:11px;font-weight:700;color:#111">JR</span></div>' +
      '<div class="pf-a" style="left:24px;right:24px;top:118px">' +
        '<div style="font-size:13px;color:#888">Morning brief · 06:00</div>' +
        '<div style="margin-top:6px;font-size:30px;font-weight:700;letter-spacing:-.6px;color:#111;display:flex;align-items:center;gap:10px"><span style="width:11px;height:11px;border-radius:50%;background:' + OK + ';box-shadow:0 0 0 5px rgba(31,157,85,.15)"></span>All quiet</div>' +
        '<div style="margin-top:14px">' + row('Records ready', '4.2M · 05:41') + row('PII exposures', '0') + row('Self-healed', '3 issues') + '</div>' +
        '<div data-dec style="margin-top:18px;padding:16px;border-radius:20px;border:1.5px solid ' + WARN + ';background:#FFFBF2">' +
          '<div style="font-size:12px;font-weight:700;color:' + WARN + ';letter-spacing:.04em">1 DECISION</div>' +
          '<div style="margin-top:6px;font-size:16px;font-weight:700;color:#111;line-height:1.3">claims_2024 added <span style="font-family:Menlo,Consolas,monospace;font-weight:400">member_ssn</span></div>' +
          '<div style="margin-top:4px;font-size:13px;color:#666">Quarantined · 0 records exposed · confidence 97%</div>' +
          '<div style="margin-top:14px;display:flex;gap:8px"><span data-pap style="flex:1;height:42px;border-radius:21px;background:#111;color:#fff;display:grid;place-items:center;font-size:15px;font-weight:700">Approve</span><span style="flex:1;height:42px;border-radius:21px;border:1px solid #CFCFCF;color:#111;display:grid;place-items:center;font-size:15px">Review</span></div></div>' +
        '<div data-done style="display:none;margin-top:18px;padding:16px;border-radius:20px;background:#F3FAF6;border:1.5px solid rgba(31,157,85,.35)">' +
          '<div style="font-size:12px;font-weight:700;color:' + OK + ';letter-spacing:.04em">APPROVED ON WATCH · 06:03</div>' +
          '<div style="margin-top:6px;font-size:16px;font-weight:700;color:#111">Masked at source</div>' +
          '<div style="margin-top:4px;font-size:13px;color:#666">Vendor notified · contract v15 drafted · 0 exposed</div></div>' +
      '</div>' +
      '<div class="pf-a" style="left:50%;bottom:10px;width:130px;height:5px;margin-left:-65px;border-radius:3px;background:#111;opacity:.85"></div></div>';
    var phone = '<div class="pf-a" data-phone style="left:560px;top:96px;width:400px;height:820px;border-radius:66px;padding:3px;background:linear-gradient(145deg,#e9eaed 0%,#a9adb4 22%,#f4f5f7 48%,#8e939b 74%,#d6d8dc 100%);box-shadow:0 60px 90px -40px rgba(20,20,30,.55),0 20px 40px -20px rgba(20,20,30,.35)">' +
      '<span class="pf-a" style="left:-4px;top:170px;width:4px;height:34px;border-radius:2px 0 0 2px;background:linear-gradient(90deg,#8e939b,#c9ccd1)"></span><span class="pf-a" style="left:-4px;top:224px;width:4px;height:62px;border-radius:2px 0 0 2px;background:linear-gradient(90deg,#8e939b,#c9ccd1)"></span><span class="pf-a" style="left:-4px;top:298px;width:4px;height:62px;border-radius:2px 0 0 2px;background:linear-gradient(90deg,#8e939b,#c9ccd1)"></span><span class="pf-a" style="right:-4px;top:250px;width:4px;height:96px;border-radius:0 2px 2px 0;background:linear-gradient(270deg,#8e939b,#c9ccd1)"></span>' +
      '<div style="position:relative;width:100%;height:100%;border-radius:63px;padding:11px;background:#0b0b0d">' +
        '<div style="position:relative;width:100%;height:100%;border-radius:53px;overflow:hidden;background:#fff">' + lock + app + status + island +
          '<div class="pf-a" style="inset:0;pointer-events:none;background:linear-gradient(115deg,rgba(255,255,255,.22) 0%,rgba(255,255,255,0) 32%,rgba(255,255,255,0) 70%,rgba(255,255,255,.06) 100%)"></div></div></div></div>';
    // watch
    function ring(id) { return '<svg data-' + id + ' class="pf-a" width="120" height="120" viewBox="0 0 120 120" style="left:50%;top:58px;margin-left:-60px"><circle cx="60" cy="60" r="50" fill="none" stroke="#1d2a22" stroke-width="12"/><circle data-arc cx="60" cy="60" r="50" fill="none" stroke="#2EDB78" stroke-width="12" stroke-linecap="round" stroke-dasharray="314" stroke-dashoffset="22" transform="rotate(-90 60 60)"/></svg>'; }
    var wf = 'font-family:PFLato,-apple-system,sans-serif;color:#fff;';
    var watch = '<div class="pf-a" data-watch style="left:1080px;top:150px;width:300px;height:720px">' +
      '<div class="pf-a" style="left:52px;top:0;width:196px;height:210px;border-radius:40px 40px 20px 20px;background:linear-gradient(90deg,#2a2b2f,#3c3e44 50%,#2a2b2f);box-shadow:inset 0 -14px 20px -10px rgba(0,0,0,.6)"></div>' +
      '<div class="pf-a" style="left:52px;top:510px;width:196px;height:210px;border-radius:20px 20px 40px 40px;background:linear-gradient(90deg,#2a2b2f,#3c3e44 50%,#2a2b2f);box-shadow:inset 0 14px 20px -10px rgba(0,0,0,.6)"></div>' +
      '<span class="pf-a" style="right:0;top:262px;width:14px;height:56px;border-radius:5px;background:repeating-linear-gradient(0deg,#9ea2a9 0 2px,#c9ccd1 2px 4px);box-shadow:0 2px 4px rgba(0,0,0,.3)"></span><span class="pf-a" style="right:6px;top:346px;width:8px;height:58px;border-radius:3px;background:linear-gradient(90deg,#8e939b,#c9ccd1)"></span>' +
      '<div class="pf-a" style="left:18px;top:170px;width:272px;height:380px;border-radius:78px;padding:4px;background:linear-gradient(145deg,#e9eaed 0%,#9fa3aa 28%,#f2f3f5 52%,#868b93 78%,#cfd2d6 100%);box-shadow:0 50px 70px -36px rgba(20,20,30,.6),0 16px 30px -16px rgba(20,20,30,.35)">' +
        '<div style="position:relative;width:100%;height:100%;border-radius:74px;padding:12px;background:#050506">' +
          '<div style="position:relative;width:100%;height:100%;border-radius:62px;overflow:hidden;background:#000">' +
            '<div class="pf-a" style="right:30px;top:22px;' + wf + 'font-size:18px;font-weight:700">6:02</div>' +
            '<div class="pf-a" data-wq style="inset:0">' + ring('wr') + '<div class="pf-a" style="left:0;right:0;top:196px;text-align:center;' + wf + 'font-size:22px;font-weight:700">All quiet</div><div class="pf-a" style="left:0;right:0;top:228px;text-align:center;' + wf + 'font-size:14px;color:#9a9a9a">4.2M ready · 05:41</div></div>' +
            '<div class="pf-a" data-wd style="inset:0;opacity:0">' +
              '<div class="pf-a" style="left:26px;top:52px;' + wf + 'font-size:13px;font-weight:700;color:' + WARN + '">● 1 DECISION</div>' +
              '<div class="pf-a" style="left:26px;right:20px;top:76px;' + wf + 'font-size:19px;font-weight:700;line-height:1.25;white-space:normal">member_ssn quarantined</div>' +
              '<div class="pf-a" style="left:26px;right:20px;top:132px;' + wf + 'font-size:13px;color:#9a9a9a;white-space:normal;line-height:1.35">Mask at source and notify vendor?</div>' +
              '<span class="pf-a" data-wok style="left:30px;top:226px;width:84px;height:84px;border-radius:50%;background:#1F9D55;display:grid;place-items:center;' + wf + 'font-size:34px;font-weight:700"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg></span>' +
              '<span class="pf-a" style="right:30px;top:226px;width:84px;height:84px;border-radius:50%;background:#2a2a2c;display:grid;place-items:center;' + wf + 'font-size:30px">⋯</span></div>' +
            '<div class="pf-a" data-wa style="inset:0;opacity:0">' + ring('wr2') + '<div class="pf-a" style="left:0;right:0;top:196px;text-align:center;' + wf + 'font-size:22px;font-weight:700">Approved</div><div class="pf-a" style="left:0;right:0;top:228px;text-align:center;' + wf + 'font-size:14px;color:#9a9a9a">Agents are on it</div></div>' +
            '<div class="pf-a" style="inset:0;pointer-events:none;background:linear-gradient(120deg,rgba(255,255,255,.14) 0%,rgba(255,255,255,0) 36%)"></div>' +
          '</div></div></div></div>';
    return '<div class="pf-a" style="inset:0;background:radial-gradient(90% 80% at 50% 30%,#ffffff 0%,#f1f1f3 60%,#e6e6ea 100%)"></div>' + top() +
      tx(140, 300, 15, 400, MUT, 'On the go') + tx(140, 326, 34, 700, INK, 'Updates come to you.', '', 'line-height:1.15') + tx(140, 376, 18, 400, MUT, 'One glance to know it’s fine.<br>One tap for the rare decision,<br>from your phone or your wrist.', '', 'line-height:1.55') +
      phone + watch +
      tx(0, 940, 15, 400, MUT, 'Approve from anywhere. The agents do the rest.', 'data-cap', 'left:0;width:1920px;text-align:center;opacity:0');
  }, run: function (s, t) {
    var q = function (a) { return s.querySelector(a); };
    var ph = q('[data-phone]'), w = q('[data-watch]');
    t.cam(0, 1, 960, 496);
    t.A(ph, [{ opacity: 0, transform: 'translateY(120px)' }, { opacity: 1, transform: 'none' }], 900, 'cubic-bezier(.2,.9,.2,1)');
    t.A(w, [{ opacity: 0, transform: 'translateY(90px) scale(.96)' }, { opacity: 1, transform: 'none' }], 900, 'cubic-bezier(.2,.9,.2,1)', 180);
    s.querySelectorAll('[data-arc]').forEach(function (a) { t.A(a, [{ strokeDashoffset: 314 }, { strokeDashoffset: 22 }], 1400, 'cubic-bezier(.3,.8,.2,1)', 400); });
    // notification arrives on both devices together
    t.at(1300, function () {
      var b = q('[data-ban]'); b.style.opacity = 1; t.A(b, [{ opacity: 0, transform: 'translateY(-26px) scale(.96)' }, { opacity: 1, transform: 'none' }], 520, 'cubic-bezier(.2,1.2,.4,1)');
      t.A(ph, [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(-2px)' }, { transform: 'none' }], 320);
      var wq = q('[data-wq]'), wd = q('[data-wd]'); t.A(wq, [{ opacity: 1 }, { opacity: 0 }], 300); wq.style.opacity = 0; wd.style.opacity = 1; t.A(wd, [{ opacity: 0, transform: 'scale(.92)' }, { opacity: 1, transform: 'none' }], 420, 'cubic-bezier(.2,1.2,.4,1)', 120);
      t.A(w, [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'none' }], 260);
    });
    // phone opens into the brief
    t.at(2600, function () { var l = q('[data-lock]'), a = q('[data-app]'); t.A(l, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(1.04)' }], 450); l.style.opacity = 0; a.style.opacity = 1; t.A(a, [{ opacity: 0, transform: 'scale(.97)' }, { opacity: 1, transform: 'none' }], 500, 'cubic-bezier(.2,.9,.2,1)'); });
    // approve on the watch
    t.at(3600, function () { t.cursor(1500, 900, 0); t.move(1203, 620, 900); t.camTo(1.18, 1180, 520, 1100); });
    t.at(4750, function () { t.click(); var ok = q('[data-wok]'); t.A(ok, [{ transform: 'scale(1)' }, { transform: 'scale(.88)' }, { transform: 'scale(1.06)' }, { transform: 'none' }], 360); });
    t.at(5100, function () { var wd = q('[data-wd]'), wa = q('[data-wa]'); t.A(wd, [{ opacity: 1 }, { opacity: 0 }], 260); wd.style.opacity = 0; wa.style.opacity = 1; t.A(wa, [{ opacity: 0 }, { opacity: 1 }], 300); var arc = wa.querySelector('[data-arc]'); t.A(arc, [{ strokeDashoffset: 314 }, { strokeDashoffset: 0 }], 800, 'cubic-bezier(.3,.8,.2,1)'); arc.style.strokeDashoffset = 0; t.A(w, [{ transform: 'scale(1)' }, { transform: 'scale(1.015)' }, { transform: 'none' }], 300); });
    // phone mirrors the approval
    t.at(5600, function () { t.camTo(1, 960, 496, 1000); var d = q('[data-dec]'), dn = q('[data-done]'); t.A(d, [{ opacity: 1 }, { opacity: 0, transform: 'scale(.97)' }], 300); t.at(300, function () { d.style.display = 'none'; dn.style.display = 'block'; t.A(dn, [{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], 420); }); });
    t.at(6600, function () { var c = q('[data-cap]'); c.style.opacity = 1; t.A(c, [{ opacity: 0 }, { opacity: 1 }], 600); });
  } });

  // V9 — Mo: a voice companion that runs jobs on the go and reports back
  function moHTML(x, y, s, dark, id) {
    var h = Math.round(s * .9), r = '';
    for (var i = 0; i < 3; i++) r += '<span class="pf-a" data-rip style="left:-8%;top:-10%;width:116%;height:120%;border-radius:50%;border:' + (s > 120 ? 2 : 1.5) + 'px solid ' + (dark ? 'rgba(255,255,255,.55)' : 'rgba(17,17,17,.22)') + ';opacity:0"></span>';
    var eye = 'style="transform-box:fill-box;transform-origin:50% 50%"';
    var stroke = 'stroke="#15161a" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"';
    var face = '<svg class="pf-a" style="left:0;top:0;overflow:visible" width="' + s + '" height="' + h + '" viewBox="0 0 100 90">' +
      '<g data-eo ' + eye + '><ellipse cx="37" cy="44" rx="5.4" ry="7.8" fill="#15161a"/><ellipse cx="63" cy="44" rx="5.4" ry="7.8" fill="#15161a"/><circle cx="38.8" cy="40.6" r="1.8" fill="#fff"/><circle cx="64.8" cy="40.6" r="1.8" fill="#fff"/></g>' +
      '<g data-ec style="opacity:0"><path d="M31 44 q6 5.5 12 0 M57 44 q6 5.5 12 0" ' + stroke + '/></g>' +
      '<g data-eh style="opacity:0"><path d="M31 47 q6 -9 12 0 M57 47 q6 -9 12 0" ' + stroke + '/></g>' +
      '<g data-eb style="opacity:0"><path d="M30 32.5 L42 28.5 M58 28.5 L70 32.5" stroke="#15161a" stroke-width="2.6" fill="none" stroke-linecap="round"/></g>' +
      '</svg>';
    var dw = Math.max(4, Math.round(s * .06)), think = '<div class="pf-a" data-think style="left:37%;top:63%;width:26%;height:12%;opacity:0;display:flex;justify-content:space-between;align-items:center">' + [0, 1, 2].map(function () { return '<i style="display:block;width:' + dw + 'px;height:' + dw + 'px;border-radius:50%;background:#15161a"></i>'; }).join('') + '</div>';
    return '<div class="pf-a" data-mo="' + id + '" style="left:' + x + 'px;top:' + y + 'px;width:' + s + 'px;height:' + h + 'px">' + r +
      '<span class="pf-a" data-glow style="left:-40%;top:-40%;width:180%;height:180%;border-radius:50%;opacity:0"></span>' +
      (dark ? '' : '<span class="pf-a" data-sh style="left:16%;bottom:-10%;width:68%;height:10%;border-radius:50%;background:radial-gradient(closest-side,rgba(0,0,0,.2),rgba(0,0,0,0))"></span>') +
      '<span class="pf-a" data-hand style="left:82%;top:34%;width:' + Math.round(s * .2) + 'px;height:' + Math.round(s * .2) + 'px;border-radius:50%;background:radial-gradient(circle at 35% 30%,#fff,#dfe2e7 60%,#b3b8c1);transform:scale(0);transform-origin:10% 90%"></span>' +
      '<div class="pf-a" data-body style="inset:0;border-radius:50% 50% 46% 46% / 60% 60% 40% 40%;transform-origin:50% 100%;background:radial-gradient(circle at 33% 22%,rgba(255,255,255,.95) 0,rgba(255,255,255,0) 20%),radial-gradient(130% 120% at 40% 18%,#ffffff 0%,#eceef2 38%,#c6cad3 78%,#a3a8b3 100%);box-shadow:inset 0 -' + Math.round(s * .07) + 'px ' + Math.round(s * .12) + 'px rgba(70,76,90,.32),inset 0 ' + Math.round(s * .04) + 'px ' + Math.round(s * .06) + 'px rgba(255,255,255,.9)' + (dark ? ',0 0 ' + Math.round(s * .25) + 'px rgba(255,255,255,.12)' : '') + '">' + face + think + '</div></div>';
  }

  SC.push({ act: 3, dur: 14400, html: function () {
    var F = 'font-family:PFLato,-apple-system,sans-serif;';
    function bars() { return '<span style="display:inline-flex;align-items:flex-end;gap:2px;height:11px;margin-right:6px">' + [4, 6, 8, 10].map(function (h) { return '<i style="display:block;width:3px;height:' + h + 'px;border-radius:1px;background:#111"></i>'; }).join('') + '</span>'; }
    function wifi() { return '<svg width="15" height="11" viewBox="0 0 15 11" style="margin-right:6px"><path d="M7.5 10.5 9.6 8.1a3 3 0 0 0-4.2 0zM3.8 6.4a5.4 5.4 0 0 1 7.4 0l1.4-1.6a7.6 7.6 0 0 0-10.2 0zM.9 3.2a9.8 9.8 0 0 1 13.2 0L15.5 1.6a12 12 0 0 0-16 0z" fill="#111"/></svg>'; }
    function batt() { return '<span style="display:inline-block;position:relative;width:24px;height:12px;border:1.5px solid rgba(17,17,17,.45);border-radius:4px;vertical-align:-1px"><i style="position:absolute;left:1.5px;top:1.5px;bottom:1.5px;width:15px;border-radius:2px;background:#111"></i><i style="position:absolute;right:-4px;top:3px;width:2px;height:4px;border-radius:0 1px 1px 0;background:rgba(17,17,17,.45)"></i></span>'; }
    var status = '<div class="pf-a" style="left:34px;right:30px;top:20px;height:20px;display:flex;align-items:center;justify-content:space-between;' + F + 'font-weight:700;font-size:16px;color:#111"><span>6:14</span><span style="display:flex;align-items:center">' + bars() + wifi() + batt() + '</span></div>';
    var island = '<div class="pf-a" style="left:50%;top:14px;width:110px;height:32px;margin-left:-55px;border-radius:16px;background:#050505"></div>';
    var mic = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" style="flex:none;margin-top:3px"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>';
    var card = 'position:absolute;left:18px;right:18px;padding:14px;border-radius:18px;border:1px solid ' + LINE + ';background:#fff;display:flex;gap:12px;align-items:center;box-sizing:border-box;opacity:0';
    var ring1 = '<span data-c1i style="position:relative;flex:none;width:40px;height:40px"><svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="#EDEDED" stroke-width="4"/><circle data-c1a cx="20" cy="20" r="16" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round" stroke-dasharray="100.5" stroke-dashoffset="100.5" transform="rotate(-90 20 20)"/></svg></span>';
    var app = '<div class="pf-a" style="inset:0;background:#fff;' + F + '">' +
      '<div class="pf-a" style="left:24px;right:24px;top:62px;display:flex;align-items:center;justify-content:space-between"><span style="display:flex;align-items:center;gap:8px;font-weight:700;font-size:17px;color:#111">Mo<span style="width:7px;height:7px;border-radius:50%;background:' + OK + '"></span></span><span style="width:30px;height:30px;border-radius:50%;border:1.5px solid #D0D0D0;display:grid;place-items:center;font-size:11px;font-weight:700;color:#111">JR</span></div>' +
      moHTML(116, 118, 140, false, 'p') +
      '<div class="pf-a" data-pst style="left:0;right:0;top:272px;text-align:center;font-size:22px;font-weight:700;color:#111;letter-spacing:-.3px">Hi Jordan.</div>' +
      '<div class="pf-a" data-pss style="left:0;right:0;top:304px;text-align:center;font-size:14px;color:#888">Say “Hey Mo” to start a job</div>' +
      '<div class="pf-a" data-tb style="right:20px;top:344px;max-width:272px;padding:11px 15px;border-radius:20px 20px 6px 20px;background:#111;color:#fff;font-size:15px;line-height:1.35;display:flex;gap:8px;opacity:0;box-sizing:border-box">' + mic + '<span data-tbt style="white-space:normal"></span></div>' +
      '<div data-c1 style="' + card + ';top:452px">' + ring1 + '<span style="flex:1;min-width:0"><span style="display:block;font-size:15px;font-weight:700;color:#111">Northeast claims refresh</span><span data-c1s style="display:block;margin-top:2px;font-size:13px;color:#777">Running · 3 agents</span></span><span data-c1p style="font-size:15px;font-weight:700;color:#111">0%</span></div>' +
      '<div data-c2 style="' + card + ';top:540px;flex-wrap:wrap;border-color:' + WARN + ';background:#FFFBF2"><span data-c2i style="flex:none;width:40px;height:40px;border-radius:50%;background:' + WARN + ';display:grid;place-items:center;color:#fff;font-size:20px;font-weight:700">!</span><span style="flex:1;min-width:0"><span style="display:block;font-size:15px;font-weight:700;color:#111">Eligibility feed sync</span><span data-c2s style="display:block;margin-top:2px;font-size:13px;color:#777">Failed at step 3 · source timed out</span></span>' +
        '<span data-c2b style="flex-basis:100%;display:flex;gap:8px;margin-top:2px"><span style="flex:1;height:38px;border-radius:19px;background:#111;color:#fff;display:grid;place-items:center;font-size:14px;font-weight:700">Retry with backup</span><span style="flex:none;width:84px;height:38px;border-radius:19px;border:1px solid #CFCFCF;color:#111;display:grid;place-items:center;font-size:14px">Skip</span></span></div>' +
      '<div class="pf-a" style="left:50%;bottom:10px;width:130px;height:5px;margin-left:-65px;border-radius:3px;background:#111;opacity:.85"></div></div>';
    var phone = '<div class="pf-a" data-phone style="left:560px;top:96px;width:400px;height:820px;border-radius:66px;padding:3px;background:linear-gradient(145deg,#e9eaed 0%,#a9adb4 22%,#f4f5f7 48%,#8e939b 74%,#d6d8dc 100%);box-shadow:0 60px 90px -40px rgba(20,20,30,.55),0 20px 40px -20px rgba(20,20,30,.35)">' +
      '<span class="pf-a" style="left:-4px;top:170px;width:4px;height:34px;border-radius:2px 0 0 2px;background:linear-gradient(90deg,#8e939b,#c9ccd1)"></span><span class="pf-a" style="left:-4px;top:224px;width:4px;height:62px;border-radius:2px 0 0 2px;background:linear-gradient(90deg,#8e939b,#c9ccd1)"></span><span class="pf-a" style="left:-4px;top:298px;width:4px;height:62px;border-radius:2px 0 0 2px;background:linear-gradient(90deg,#8e939b,#c9ccd1)"></span><span class="pf-a" style="right:-4px;top:250px;width:4px;height:96px;border-radius:0 2px 2px 0;background:linear-gradient(270deg,#8e939b,#c9ccd1)"></span>' +
      '<div style="position:relative;width:100%;height:100%;border-radius:63px;padding:11px;background:#0b0b0d;box-sizing:border-box">' +
        '<div style="position:relative;width:100%;height:100%;border-radius:53px;overflow:hidden;background:#fff">' + app + status + island +
          '<div class="pf-a" style="inset:0;pointer-events:none;background:linear-gradient(115deg,rgba(255,255,255,.22) 0%,rgba(255,255,255,0) 32%,rgba(255,255,255,0) 70%,rgba(255,255,255,.06) 100%)"></div></div></div></div>';
    // watch
    var wf = 'font-family:PFLato,-apple-system,sans-serif;color:#fff;';
    var wv = '<div class="pf-a" data-wv style="left:0;right:0;top:236px;height:36px;display:flex;justify-content:center;align-items:center;gap:3px;opacity:0">' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function () { return '<i style="display:block;width:4px;height:30px;border-radius:2px;background:#fff;transform:scaleY(.15)"></i>'; }).join('') + '</div>';
    var wb = '<div class="pf-a" data-wbt style="inset:0;opacity:0">' +
      '<span class="pf-a" data-wr style="left:50px;top:222px;width:64px;height:64px;border-radius:50%;background:#fff;display:grid;place-items:center"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 1 1-2.6-5.9"/><path d="M20 4v5h-5"/></svg></span>' +
      '<span class="pf-a" style="right:50px;top:222px;width:64px;height:64px;border-radius:50%;background:#2a2a2c;display:grid;place-items:center"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg></span></div>';
    var watch = '<div class="pf-a" data-watch style="left:1080px;top:150px;width:300px;height:720px">' +
      '<div class="pf-a" style="left:52px;top:0;width:196px;height:210px;border-radius:40px 40px 20px 20px;background:linear-gradient(90deg,#2a2b2f,#3c3e44 50%,#2a2b2f);box-shadow:inset 0 -14px 20px -10px rgba(0,0,0,.6)"></div>' +
      '<div class="pf-a" style="left:52px;top:510px;width:196px;height:210px;border-radius:20px 20px 40px 40px;background:linear-gradient(90deg,#2a2b2f,#3c3e44 50%,#2a2b2f);box-shadow:inset 0 14px 20px -10px rgba(0,0,0,.6)"></div>' +
      '<span class="pf-a" style="right:0;top:262px;width:14px;height:56px;border-radius:5px;background:repeating-linear-gradient(0deg,#9ea2a9 0 2px,#c9ccd1 2px 4px);box-shadow:0 2px 4px rgba(0,0,0,.3)"></span><span class="pf-a" style="right:6px;top:346px;width:8px;height:58px;border-radius:3px;background:linear-gradient(90deg,#8e939b,#c9ccd1)"></span>' +
      '<div class="pf-a" style="left:18px;top:170px;width:272px;height:380px;border-radius:78px;padding:4px;box-sizing:border-box;background:linear-gradient(145deg,#e9eaed 0%,#9fa3aa 28%,#f2f3f5 52%,#868b93 78%,#cfd2d6 100%);box-shadow:0 50px 70px -36px rgba(20,20,30,.6),0 16px 30px -16px rgba(20,20,30,.35)">' +
        '<div style="position:relative;width:100%;height:100%;border-radius:74px;padding:12px;box-sizing:border-box;background:#050506">' +
          '<div style="position:relative;width:100%;height:100%;border-radius:62px;overflow:hidden;background:#000">' +
            '<div class="pf-a" data-wscr style="inset:0;opacity:.35">' +
              '<div class="pf-a" style="right:30px;top:22px;' + wf + 'font-size:18px;font-weight:700">6:14</div>' +
              moHTML(74, 58, 92, true, 'w') +
              '<div class="pf-a" data-wt style="left:0;right:0;top:166px;text-align:center;' + wf + 'font-size:20px;font-weight:700"></div>' +
              '<div class="pf-a" data-ws style="left:0;right:0;top:194px;text-align:center;' + wf + 'font-size:13px;color:#9a9a9a"></div>' +
              wv + wb + '</div>' +
            '<div class="pf-a" style="inset:0;pointer-events:none;background:linear-gradient(120deg,rgba(255,255,255,.14) 0%,rgba(255,255,255,0) 36%)"></div>' +
          '</div></div></div></div>';
    return '<div class="pf-a" style="inset:0;background:radial-gradient(90% 80% at 50% 30%,#ffffff 0%,#f1f1f3 60%,#e6e6ea 100%)"></div>' + top() +
      tx(140, 300, 15, 400, MUT, 'Meet Mo') + tx(140, 326, 34, 700, INK, 'Just say it.', '', 'line-height:1.15') + tx(140, 376, 18, 400, MUT, 'Mo takes your voice, runs the job<br>and reports back when it’s done,<br>or when it needs you.', '', 'line-height:1.55') +
      phone + watch +
      tx(0, 940, 15, 400, MUT, 'Speak a job. Mo runs it and reports back.', 'data-cap', 'left:0;width:1920px;text-align:center;opacity:0');
  }, run: function (s, t) {
    var q = function (a) { return s.querySelector(a); };
    var ph = q('[data-phone]'), w = q('[data-watch]');
    function M(el) { var g = function (a) { return el.querySelector(a); }; return { el: el, body: g('[data-body]'), eo: g('[data-eo]'), ec: g('[data-ec]'), eh: g('[data-eh]'), eb: g('[data-eb]'), think: g('[data-think]'), glow: g('[data-glow]'), hand: g('[data-hand]'), rips: el.querySelectorAll('[data-rip]'), loops: [] }; }
    var P = M(q('[data-mo="p"]')), Wm = M(q('[data-mo="w"]')), both = [P, Wm];
    function keep(m, a, n) { if (a) { if (n !== 1) a.effect.updateTiming({ iterations: n || Infinity }); m.loops.push(a); } return a; }
    function face(m, k) { ['eo', 'ec', 'eh'].forEach(function (x) { m[x].style.opacity = x === k ? 1 : 0; }); }
    function breathe(m, d) { keep(m, t.A(m.body, [{ transform: 'scale(1,1)' }, { transform: 'scale(1.03,.955)' }, { transform: 'scale(1,1)' }], d || 2400, 'ease-in-out')); }
    function blink(m) { keep(m, t.A(m.eo, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(1)', offset: .88 }, { transform: 'scaleY(.1)', offset: .93 }, { transform: 'scaleY(1)' }], 2800, 'linear')); }
    function glow(m, c, on) { if (c) m.glow.style.background = 'radial-gradient(circle,' + c + ' 0%,rgba(0,0,0,0) 62%)'; var from = +getComputedStyle(m.glow).opacity; m.glow.style.opacity = on ? 1 : 0; t.A(m.glow, [{ opacity: from }, { opacity: on ? 1 : 0 }], 450, 'ease'); }
    function mood(m, k) {
      m.loops.forEach(function (a) { try { a.cancel(); } catch (e) {} }); m.loops = [];
      m.eb.style.opacity = 0; m.think.style.opacity = 0;
      if (k === 'sleep') { face(m, 'ec'); breathe(m, 2800); }
      if (k === 'idle') { face(m, 'eo'); breathe(m); blink(m); }
      if (k === 'wake') { face(m, 'eo'); keep(m, t.A(m.body, [{ transform: 'scale(1)' }, { transform: 'scale(.88,1.16)', offset: .35 }, { transform: 'scale(1.08,.92)', offset: .7 }, { transform: 'scale(1)' }], 760, 'cubic-bezier(.3,1.3,.5,1)'), 1); keep(m, t.A(m.eo, [{ transform: 'scaleY(.1)' }, { transform: 'scaleY(1.15)', offset: .5 }, { transform: 'scaleY(1)' }], 500, 'ease-out'), 1); }
      if (k === 'listen') { face(m, 'eo'); keep(m, t.A(m.body, [{ transform: 'scale(1.045,.955)' }, { transform: 'scale(.965,1.04)' }, { transform: 'scale(1.045,.955)' }], 520, 'ease-in-out')); m.rips.forEach(function (r, i) { keep(m, t.A(r, [{ transform: 'scale(.92)', opacity: .8 }, { transform: 'scale(1.75)', opacity: 0 }], 1500, 'cubic-bezier(.2,.7,.3,1)', i * 500)); }); }
      if (k === 'think') { face(m, 'eo'); m.think.style.opacity = 1; keep(m, t.A(m.body, [{ transform: 'rotate(-4deg)' }, { transform: 'rotate(4deg)' }, { transform: 'rotate(-4deg)' }], 1000, 'ease-in-out')); keep(m, t.A(m.eo, [{ transform: 'translate(0,0)' }, { transform: 'translate(-1.5px,-2px)' }, { transform: 'translate(1.5px,-2px)' }, { transform: 'translate(0,0)' }], 1600, 'ease-in-out')); m.think.querySelectorAll('i').forEach(function (d, i) { keep(m, t.A(d, [{ transform: 'translateY(0)', opacity: .35 }, { transform: 'translateY(-60%)', opacity: 1 }, { transform: 'translateY(0)', opacity: .35 }], 720, 'ease-in-out', i * 140)); }); }
      if (k === 'happy') { face(m, 'eh'); keep(m, t.A(m.body, [{ transform: 'translateY(0) scale(1)' }, { transform: 'translateY(0) scale(1.12,.86)', offset: .14 }, { transform: 'translateY(-24%) scale(.93,1.09)', offset: .42 }, { transform: 'translateY(0) scale(1.1,.9)', offset: .72 }, { transform: 'translateY(0) scale(1)' }], 760, 'ease-out'), 2); }
      if (k === 'sad') { face(m, 'eo'); m.eb.style.opacity = 1; m.eo.style.transformOrigin = '50% 100%'; keep(m, t.A(m.eo, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(.55)' }], 420), 1); keep(m, t.A(m.body, [{ transform: 'none' }, { transform: 'translateY(4%) scale(1.08,.85) rotate(-6deg)' }], 650, 'cubic-bezier(.3,1.3,.5,1)'), 1); keep(m, t.A(m.eb, [{ transform: 'translateY(-3px)', opacity: 0 }, { transform: 'none', opacity: 1 }], 400), 1); }
      if (k === 'wave') { face(m, 'eh'); breathe(m); keep(m, t.A(m.hand, [{ transform: 'scale(0) rotate(0)' }, { transform: 'scale(1) rotate(-22deg)', offset: .18 }, { transform: 'scale(1) rotate(24deg)', offset: .36 }, { transform: 'scale(1) rotate(-22deg)', offset: .54 }, { transform: 'scale(1) rotate(24deg)', offset: .72 }, { transform: 'scale(1) rotate(0)', offset: .88 }, { transform: 'scale(0) rotate(0)' }], 1500, 'ease-in-out'), 1); }
      if (k === 'bye') { face(m, 'eh'); keep(m, t.A(m.el, [{ transform: 'scale(1)', opacity: 1 }, { transform: 'scale(1.1,.9)', offset: .3 }, { transform: 'scale(.04)', opacity: 0 }], 620, 'cubic-bezier(.5,0,.75,.3)'), 1); }
    }
    function both_(k) { both.forEach(function (m) { mood(m, k); }); }
    function setT(sel, v, fade) { var e = q(sel); if (fade) { t.A(e, [{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], 380, 'cubic-bezier(.2,.9,.2,1)'); } e.innerHTML = v; }
    function say(a, b, c, d) { setT('[data-pst]', a, 1); setT('[data-pss]', b, 1); setT('[data-wt]', c, 1); setT('[data-ws]', d, 1); }
    function buzz(el) { t.A(el, [{ transform: 'translateX(0)' }, { transform: 'translateX(-3px)' }, { transform: 'translateX(3px)' }, { transform: 'translateX(-2px)' }, { transform: 'none' }], 300); }
    function fadeIn(el, d) { el.style.opacity = 1; t.A(el, [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], d || 460, 'cubic-bezier(.2,.9,.2,1)'); }
    function fadeOut(el) { var from = +getComputedStyle(el).opacity; el.style.opacity = 0; t.A(el, [{ opacity: from }, { opacity: 0 }], 260); }
    var wv = q('[data-wv]'), wvl = [];
    function wave(on) { if (on) { fadeIn(wv, 300); wv.querySelectorAll('i').forEach(function (b, i) { var h = [.25, .9, .45, 1, .35, .8, .55, .95, .3, .7, .5, .85, .3][i]; wvl.push(t.A(b, [{ transform: 'scaleY(.15)' }, { transform: 'scaleY(' + h + ')' }, { transform: 'scaleY(.2)' }, { transform: 'scaleY(' + (1.15 - h) + ')' }, { transform: 'scaleY(.15)' }], 560 + (i % 4) * 90, 'ease-in-out', i * 30)); }); wvl.forEach(function (a) { if (a) a.effect.updateTiming({ iterations: Infinity }); }); } else { fadeOut(wv); } }
    var AMBER = 'rgba(201,138,0,.55)', GREEN = 'rgba(46,219,120,.45)';

    // 0 · devices arrive; Mo idles on the phone and sleeps on the watch
    t.cam(0, 1, 960, 496);
    t.A(ph, [{ opacity: 0, transform: 'translateY(120px)' }, { opacity: 1, transform: 'none' }], 900, 'cubic-bezier(.2,.9,.2,1)');
    t.A(w, [{ opacity: 0, transform: 'translateY(90px) scale(.96)' }, { opacity: 1, transform: 'none' }], 900, 'cubic-bezier(.2,.9,.2,1)', 180);
    mood(P, 'idle'); mood(Wm, 'sleep');
    // 1 · wrist raise wakes Mo on the watch
    t.at(900, function () {
      t.camTo(1.12, 1180, 520, 1000);
      t.A(w, [{ transform: 'none' }, { transform: 'translateY(-16px) rotate(-2deg)' }, { transform: 'none' }], 760, 'cubic-bezier(.3,.9,.3,1)');
      var sc = q('[data-wscr]'); sc.style.opacity = 1; t.A(sc, [{ opacity: .35 }, { opacity: 1 }], 400);
      mood(Wm, 'wake'); say('Hi Jordan.', 'Say “Hey Mo” to start a job', 'Hey Jordan', 'I’m listening');
    });
    // 2 · voice command
    t.at(1750, function () {
      both_('listen'); wave(true);
      say('Listening…', '&nbsp;', 'Listening…', '&nbsp;');
      var tb = q('[data-tb]'); fadeIn(tb, 360); t.type(q('[data-tbt]'), 'Refresh the Northeast claims feed and tell me when it’s done.', 2100);
    });
    // 3 · hand-off: Mo thinks, a job starts
    t.at(4200, function () {
      wave(false); both_('think'); t.camTo(1, 960, 496, 900);
      say('On it.', '3 agents assigned · about 4 min', 'On it', '3 agents assigned');
      t.at(300, function () { fadeIn(q('[data-c1]')); t.A(q('[data-c1a]'), [{ strokeDashoffset: 100.5 }, { strokeDashoffset: 0 }], 2000, 'cubic-bezier(.4,0,.3,1)', 200); q('[data-c1a]').style.strokeDashoffset = 0; t.at(200, function () { t.count(q('[data-c1p]'), 100, 2000, 0, '%'); }); });
    });
    // 4 · job complete
    t.at(6800, function () {
      both_('happy'); both.forEach(function (m) { glow(m, GREEN, true); }); t.at(900, function () { both.forEach(function (m) { glow(m, 0, false); mood(m, 'idle'); }); });
      buzz(ph); buzz(w);
      say('Done.', 'Northeast claims refreshed', 'Done', '1.2M records · 4m 12s');
      q('[data-c1a]').setAttribute('stroke', OK);
      q('[data-c1i]').insertAdjacentHTML('beforeend', '<svg style="position:absolute;left:10px;top:10px" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="' + OK + '" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>');
      var p = q('[data-c1p]'); p.textContent = ''; setT('[data-c1s]', '1.2M records · 4m 12s · 0 issues', 1);
    });
    // 5 · error: Mo droops, amber glow, asks to retry
    t.at(8500, function () {
      both_('sad'); both.forEach(function (m) { glow(m, AMBER, true); });
      buzz(ph); buzz(w);
      say('Hmm, one snag.', 'Eligibility feed failed at step 3', 'Feed failed', 'Retry with backup?');
      fadeIn(q('[data-c2]')); fadeIn(q('[data-wbt]'), 380);
      t.at(500, function () { t.camTo(1.18, 1180, 540, 1000); });
    });
    // 6 · tap retry on the watch
    t.at(9600, function () { t.cursor(1500, 900, 0); t.move(1191, 586, 900); });
    t.at(10650, function () {
      t.click(); var r = q('[data-wr]'); t.A(r, [{ transform: 'scale(1)' }, { transform: 'scale(.86)' }, { transform: 'scale(1.06)' }, { transform: 'none' }], 360);
      both.forEach(function (m) { glow(m, 0, false); mood(m, 'wake'); });
      t.at(500, function () { both_('think'); });
      fadeOut(q('[data-wbt]'));
      say('Retrying…', 'Switching to the backup source', 'Retrying', 'Backup source');
      var c2 = q('[data-c2]'); c2.style.borderColor = LINE; c2.style.background = '#fff'; q('[data-c2b]').style.display = 'none';
      var ic = q('[data-c2i]'); ic.style.background = 'none'; ic.innerHTML = '<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="16" fill="none" stroke="#EDEDED" stroke-width="4"/><circle cx="20" cy="20" r="16" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round" stroke-dasharray="30 100"/></svg>';
      var sv = ic.firstChild; sv.style.transformOrigin = '50% 50%'; var sp = t.A(sv, [{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], 800, 'linear'); if (sp) sp.effect.updateTiming({ iterations: Infinity });
      setT('[data-c2s]', 'Retrying with backup source…', 1);
    });
    // 7 · recovered
    t.at(12000, function () {
      t.camTo(1, 960, 496, 900);
      both_('happy'); both.forEach(function (m) { glow(m, GREEN, true); }); t.at(800, function () { both.forEach(function (m) { glow(m, 0, false); }); });
      buzz(w);
      say('All good again.', 'Recovered · 0 records lost', 'Recovered', '0 records lost');
      var c2 = q('[data-c2]'); c2.style.background = '#F3FAF6'; c2.style.borderColor = 'rgba(31,157,85,.35)';
      var ic = q('[data-c2i]'); ic.innerHTML = ''; ic.style.background = OK; ic.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
      t.A(ic, [{ transform: 'scale(.6)' }, { transform: 'scale(1.1)' }, { transform: 'none' }], 380, 'cubic-bezier(.2,1.2,.4,1)');
      setT('[data-c2s]', 'Recovered via backup · 0 records lost', 1);
    });
    // 8 · Mo waves goodbye
    t.at(12900, function () { both_('wave'); say('Anything else?', 'I’ll ping you if something needs you', 'Bye for now', 'I’ll ping you'); var c = q('[data-cap]'); c.style.opacity = 1; t.A(c, [{ opacity: 0 }, { opacity: 1 }], 600); });
    t.at(13800, function () { both_('bye'); });
  } });

  var ACTS = [['01', 'State the intent', 'One sentence becomes a living plan run by agents'], ['02', 'Agents run it', 'Governed, compliant and self-healing, around the clock'], ['03', 'You decide the exceptions', 'One tap with full evidence. Every answer explainable.'], ['04', 'Run it from anywhere', 'Speak a job, and Mo reports back when it’s done or when it needs you.']];
  var actDur = [0, 0, 0, 0]; SC.forEach(function (sc) { actDur[sc.act] += sc.dur; });

  /* ---------- engine ---------- */
  var cur = -1, timers = [], anims = [], live = false, gen = 0, paused = false, actStart = 0;
  var cursor = document.createElement('div'); cursor.className = 'pf-cursor';
  cursor.innerHTML = '<svg viewBox="0 0 28 28"><path d="M5 3l16 9.5-7 1.6-3.6 6.9z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>';
  var cx0 = 0, cy0 = 0;

  function T(scene, g) {
    var cam = scene.querySelector('.pf-cam'), camS = 1, camX = 960, camY = 496;
    function ok() { return g === gen && live; }
    function A(el, kf, d, e, delay) { if (!el || !el.animate) return; var a = el.animate(kf, { duration: d, easing: e || 'cubic-bezier(.22,.8,.24,1)', delay: delay || 0, fill: 'both' }); anims.push(a); return a; }
    function tf(s, x, y) { var tx = 960 - x * s, ty = 496 - y * s; tx = Math.min(0, Math.max(W - W * s, tx)); ty = Math.min(0, Math.max(H - H * s, ty)); return 'translate(' + tx + 'px,' + ty + 'px) scale(' + s + ')'; }
    var api = {
      live: ok, A: A,
      at: function (ms, fn) { timers.push(setTimeout(function () { if (ok()) fn(); }, ms)); },
      cam: function (s0, s1, x, y, d) { cam.style.transformOrigin = '0 0'; camS = s1; camX = x; camY = y; if (!d) { cam.style.transform = tf(s1, x, y); return; } A(cam, [{ transform: tf(s0, x, y) }, { transform: tf(s1, x, y) }], d, 'cubic-bezier(.45,0,.2,1)'); },
      camTo: function (s1, x, y, d) { cam.style.transformOrigin = '0 0'; var from = tf(camS, camX, camY); camS = s1; camX = x; camY = y; var to = tf(s1, x, y); cam.getAnimations().forEach(function (a) { if (a.commitStyles) a.commitStyles(); a.cancel(); }); A(cam, [{ transform: cam.style.transform || from }, { transform: to }], d, 'cubic-bezier(.6,0,.2,1)'); cam.style.transform = to; },
      cursor: function (x, y) { cx0 = x; cy0 = y; scene.querySelector('.pf-cam').appendChild(cursor); cursor.style.transform = 'translate(' + x + 'px,' + y + 'px)'; cursor.style.opacity = 1; },
      move: function (x, y, d) { A(cursor, [{ transform: 'translate(' + cx0 + 'px,' + cy0 + 'px)' }, { transform: 'translate(' + x + 'px,' + y + 'px)' }], d, 'cubic-bezier(.5,0,.15,1)'); cx0 = x; cy0 = y; cursor.style.transform = 'translate(' + x + 'px,' + y + 'px)'; },
      click: function () { var r = document.createElement('span'); r.className = 'pf-ring'; r.style.left = (cx0 + 6) + 'px'; r.style.top = (cy0 + 5) + 'px'; cam.appendChild(r); A(r, [{ transform: 'scale(.3)', opacity: 1 }, { transform: 'scale(1.3)', opacity: 0 }], 520, 'ease-out'); A(cursor, [{ transform: 'translate(' + cx0 + 'px,' + cy0 + 'px) scale(1)' }, { transform: 'translate(' + cx0 + 'px,' + cy0 + 'px) scale(.82)' }, { transform: 'translate(' + cx0 + 'px,' + cy0 + 'px) scale(1)' }], 240); },
      count: function (el, to, d, dec, suf) { var st = performance.now(); (function f(now) { if (!ok()) return; var k = Math.min(1, (now - st) / d), e = 1 - Math.pow(1 - k, 3), v = to * e; el.textContent = (dec ? v.toFixed(dec) : Math.round(v).toLocaleString('en-US')) + (suf || ''); if (k < 1) requestAnimationFrame(f); })(st); },
      type: function (el, txt, d) { var st = performance.now(); el.textContent = ''; (function f(now) { if (!ok()) return; var k = Math.min(1, (now - st) / d); el.textContent = txt.slice(0, Math.round(txt.length * k)); if (k < 1) requestAnimationFrame(f); })(st); },
      stream: function (el, txt, d) { var words = txt.split(/(\s+)/), st = performance.now(); (function f(now) { if (!ok()) return; var k = Math.min(1, (now - st) / d); el.innerText = words.slice(0, Math.round(words.length * k)).join(''); if (k < 1) requestAnimationFrame(f); })(st); },
      drag: function (knob, fill, x0, x1, d, lab) { var st = performance.now(); (function f(now) { if (!ok()) return; var k = Math.min(1, (now - st) / d), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2, x = x0 + (x1 - x0) * e; knob.style.left = x + 'px'; fill.style.width = (x - 1472 + 12) + 'px'; knob.textContent = lab(x); if (k < 1) requestAnimationFrame(f); })(st); },
      flyTo: function (x0, y0, x1, y1, txt, d, done) { var g2 = document.createElement('div'); g2.className = 'pf-a pf-card pf-t12'; g2.style.cssText = 'left:0;top:0;padding:8px 14px;border:1px solid #1E4FA8;color:#1E4FA8;box-shadow:0 12px 30px -10px rgba(0,0,0,.35);z-index:40;white-space:nowrap'; g2.textContent = txt; cam.appendChild(g2); var a = A(g2, [{ transform: 'translate(' + (x0 - 40) + 'px,' + (y0 - 16) + 'px) rotate(-3deg)', opacity: .2 }, { transform: 'translate(' + (x1 - 40) + 'px,' + (y1 - 16) + 'px) rotate(0)', opacity: 1 }], d, 'cubic-bezier(.5,0,.2,1)'); if (a) a.onfinish = function () { g2.remove(); if (ok()) done(); }; }
    };
    return api;
  }

  var scenes = SC.map(function (sc) { var el = document.createElement('div'); el.className = 'pf-scene' + (sc.dark ? ' dark' : ''); el.innerHTML = '<div class="pf-cam"></div>'; stage.appendChild(el); return el; });

  var ovAct = -1, ovT0 = 0, ovLeft = 10000, ovTimer = 0, OV_MS = 10000;
  function armOv() { clearTimeout(ovTimer); ovT0 = performance.now(); ovTimer = setTimeout(function () { ovTimer = 0; ov.classList.add('off'); }, Math.max(0, ovLeft)); }
  function setActUI(i, k) {
    if (SC[i].act !== ovAct) {
      ovAct = SC[i].act; var a = ACTS[ovAct]; ovN.textContent = a[0]; ovT.textContent = a[1]; ovS.textContent = a[2];
      ov.classList.remove('off'); ovLeft = OV_MS; armOv();
    }
    ov.classList.toggle('dk', !!SC[i].dark); ctl.classList.toggle('dk', !!SC[i].dark);
    bars.forEach(function (b, j) { b.getAnimations().forEach(function (x) { x.cancel(); }); b.style.transform = 'scaleX(' + (j < SC[i].act ? 1 : 0) + ')'; });
    var actIdx = SC[i].act, pre = 0; for (var q = 0; q < i; q++) if (SC[q].act === actIdx) pre += SC[q].dur;
    var b = bars[actIdx]; var a0 = pre / actDur[actIdx], a1 = (pre + SC[i].dur) / actDur[actIdx];
    var an = b.animate([{ transform: 'scaleX(' + a0 + ')' }, { transform: 'scaleX(' + a1 + ')' }], { duration: SC[i].dur, easing: 'linear', fill: 'forwards' }); anims.push(an);
  }

  function show(i) {
    gen++; var g = gen;
    timers.forEach(clearTimeout); timers = []; anims.forEach(function (a) { try { a.cancel(); } catch (e) {} }); anims = [];
    var prev = cur; cur = i;
    var el = scenes[i], cam = el.querySelector('.pf-cam'); cam.innerHTML = SC[i].html(); cam.querySelectorAll('img').forEach(function (image) { image.alt = ''; }); cam.style.transform = '';
    el.classList.add('on'); el.style.zIndex = 2;
    el.animate([{ opacity: 0, transform: 'scale(1.025)', filter: 'blur(6px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 700, easing: 'cubic-bezier(.2,.8,.2,1)', fill: 'both' });
    if (prev > -1 && prev !== i) { var pe = scenes[prev]; pe.style.zIndex = 1; var out = pe.animate([{ opacity: 1, transform: 'none', filter: 'blur(0)' }, { opacity: 0, transform: 'scale(.985)', filter: 'blur(4px)' }], { duration: 650, easing: 'ease', fill: 'both' }); out.onfinish = function () { if (cur !== prev) { pe.classList.remove('on'); pe.querySelector('.pf-cam').innerHTML = ''; } }; }
    cursor.style.opacity = 0;
    setActUI(i);
    var t = T(el, g); SC[i].run(el.querySelector('.pf-cam'), t);
    timers.push(setTimeout(function () { if (g === gen && live) show((i + 1) % SC.length); }, SC[i].dur));
  }

  function start() { if (live) return; live = true; if (ovAct >= 0 && ovTimer === 0 && !ov.classList.contains('off')) armOv(); show(cur < 0 ? 0 : cur); }
  function stop() { live = false; gen++; timers.forEach(clearTimeout); timers = []; if (ovTimer) { clearTimeout(ovTimer); ovTimer = 0; ovLeft -= performance.now() - ovT0; } }

  function still() { var i = 0; cur = i; var el = scenes[i]; el.classList.add('on'); el.style.opacity = 1; var cam = el.querySelector('.pf-cam'); cam.innerHTML = SC[i].html(); cam.querySelectorAll('img').forEach(function (image) { image.alt = ''; }); el.querySelectorAll('[data-n]').forEach(function (e) { e.textContent = (+e.getAttribute('data-n')).toLocaleString('en-US'); }); el.querySelectorAll('[data-p]').forEach(function (e) { e.textContent = e.getAttribute('data-p') + '%'; }); el.querySelectorAll('[data-tv]').forEach(function (e) { e.style.opacity = 1; }); var a = ACTS[0]; ovN.textContent = a[0]; ovT.textContent = a[1]; ovS.textContent = a[2]; ctl.hidden = true; }

  if (reduce) { still(); return; }

  var visible = false;
  function sync() { if (visible && !paused && !document.hidden) start(); else stop(); }
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; sync(); }, { threshold: .25 }).observe(fig);
  else { visible = true; sync(); }
  document.addEventListener('visibilitychange', sync);
  ctl.addEventListener('click', function () { paused = !paused; ctl.setAttribute('aria-pressed', String(paused)); ctl.setAttribute('aria-label', paused ? 'Play concept film' : 'Pause concept film'); ctl.innerHTML = paused ? '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M8 5v14l11-7z" fill="currentColor"/></svg>' : '<svg viewBox="0 0 24 24" width="14" height="14"><path d="M7 5h3v14H7zM14 5h3v14h-3z" fill="currentColor"/></svg>'; sync(); });
})();


/* ================= Transform: capability cloud ================= */
(function () {
  var cloud = document.querySelector('.cloud'); if (!cloud || cloud.dataset.cloudReady) return; cloud.dataset.cloudReady = 'true';
  var cap = cloud.querySelector('.cloud-cap'), def = cap.innerHTML;
  var R = { 1: [17, 22], 2: [29.5, 36], 3: [41.5, 46] }, OFF = { 1: -45, 2: -54, 3: -67.5 }, k = 0;
  cloud.querySelectorAll('.cg').forEach(function (g) {
    var ring = g.getAttribute('data-ring'), ps = g.querySelectorAll('.pill'), r = R[ring];
    ps.forEach(function (p, i) {
      var a = ((ring === '1' ? [-150, -30, 30, 150][i] : OFF[ring] + i * 360 / ps.length)) * Math.PI / 180;
      p.style.setProperty('--x', (50 + Math.cos(a) * r[0]).toFixed(2) + '%');
      p.style.setProperty('--y', (50 + Math.sin(a) * r[1]).toFixed(2) + '%');
      p.style.setProperty('--i', ++k);
      p.style.setProperty('--dx', ((i % 2 ? 1 : -1) * (3 + i % 3)) + 'px');
      p.style.setProperty('--dy', ((i % 3 ? -1 : 1) * (4 + i % 2 * 2)) + 'px');
      p.style.setProperty('--dur', (7 + (k % 5)) + 's');
    });
  });
  var pills = cloud.querySelectorAll('.pill');
  function pick(p) {
    pills.forEach(function (x) { x.classList.toggle('on', x === p); });
    cap.innerHTML = p ? '<b>' + p.textContent + '</b> · <span>' + p.getAttribute('data-agent') + (p.getAttribute('data-agent') === 'You' ? '' : ' agent') + '.</span> ' + p.getAttribute('data-why') : def;
  }
  pills.forEach(function (p) {
    p.addEventListener('mouseenter', function () { pick(p); });
    p.addEventListener('focus', function () { pick(p); });
    p.addEventListener('click', function () { pick(p.classList.contains('on') && matchMedia('(hover: none)').matches ? null : p); });
  });
  cloud.querySelector('.cloud-stage').addEventListener('mouseleave', function () { pick(null); });
  if ('IntersectionObserver' in window) new IntersectionObserver(function (es, o) { es.forEach(function (e) { if (e.isIntersecting) { cloud.classList.add('in'); o.disconnect(); } }); }, { threshold: .25 }).observe(cloud);
  else cloud.classList.add('in');
})();
