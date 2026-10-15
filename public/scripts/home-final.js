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
      dlg = $("#twin");
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
    $(".td-x", dlg).addEventListener("click", close);
    dlg.addEventListener("click", function (e) {
      if (e.target === dlg) close();
    });
    dlg.addEventListener("close", function () {
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
