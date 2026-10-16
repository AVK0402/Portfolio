/** Trusted homepage markup translated from the approved standalone design reference. */
export const homeContent = {
  hero: {
    title: "Designing the Future of Human Intelligence.",
    description:
      "I lead design and product organizations at pivotal moments, building the teams, systems, and strategy that turn business ambition into outcomes.",
  },
  markup: String.raw`<style>
:root{color-scheme:light;box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}html{scroll-padding-top:env(safe-area-inset-top,0px)}body{margin:0;padding:0;font:14px -apple-system,BlinkMacSystemFont,sans-serif;background:#fff;color:#000}img{max-width:100%}[hidden]:not([hidden=until-found i]){display:none!important}
/* Crisp version. Same tokens and grotesk system as v4; length is cut by tabs, expandable beats and merged chapters. */
html { color-scheme: light; }
:root {
  --ground: #FFFFFF; --tint: #F5F5F7; --panel: #F4F4F6; --ink: #0A0A0B; --soft: #5E5E69;
  --rule: #E3E3E8; --rule-strong: #C4C4CE; --accent: #5B2FD8; --dim: #C9C9D2;
  --sans: var(--font-hanken-grotesk), system-ui, -apple-system, 'Segoe UI', sans-serif;
  --ease: cubic-bezier(.2, .7, .2, 1);
}
@media (prefers-reduced-motion: no-preference) { html { scroll-behavior: smooth; } }
*, *::before, *::after { box-sizing: border-box; }
body { margin: 0; background: var(--ground); color: var(--ink); font-family: var(--sans); font-size: 1.0625rem; line-height: 1.6; -webkit-font-smoothing: antialiased; overflow-x: clip; }
h1, h2, h3, h4, p, ul, figure, blockquote { margin: 0; }
ul { padding: 0; list-style: none; }
a { color: inherit; }
button { font: inherit; color: inherit; }
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 3px; }
section[id] { scroll-margin-top: 5rem; }
.wrap { width: 100%; max-width: 1120px; margin-inline: auto; padding-inline: clamp(16px, 4vw, 48px); }
.c { text-align: center; }

/* rhythm */
.s { padding-block: clamp(3.25rem, 7vw, 6rem); }
.s.g { background: var(--tint); --panel: var(--ground); }
.s.k { --dim: #303038; background: #000; color: #F5F5F7; --ink: #F5F5F7; --soft: #A9A9B5; --rule: #2B2B33; --rule-strong: #4A4A56; --panel: #121216; --accent: #B8A1FF; }

/* progress + top bar */
.prog { position: fixed; top: env(safe-area-inset-top, 0px); left: 0; right: 0; height: 2px; z-index: 30; background: var(--accent); transform: scaleX(0); transform-origin: left; pointer-events: none; }
.bar { position: sticky; top: env(safe-area-inset-top, 0px); z-index: 20; background: color-mix(in srgb, var(--ground) 88%, transparent); -webkit-backdrop-filter: blur(12px); backdrop-filter: blur(12px); border-bottom: 1px solid var(--rule); }
.bar-in { display: flex; align-items: center; justify-content: space-between; gap: 1rem; padding-block: .75rem; }
.id { text-decoration: none; display: flex; flex-direction: column; line-height: 1.25; min-width: 0; }
.id-name { font-weight: 600; font-size: 1.0625rem; letter-spacing: -.01em; }
.id-role { font-size: .8125rem; color: var(--soft); }
.nav { display: flex; align-items: center; gap: clamp(.75rem, 2vw, 1.75rem); font-size: .9375rem; }
.nav-links { display: flex; gap: clamp(1rem, 2.2vw, 1.75rem); }
.nav-links a { text-decoration: none; color: var(--soft); position: relative; padding-block: .2rem; }
.nav-links a::after { content: ""; position: absolute; left: 0; right: 0; bottom: -.1rem; height: 1px; background: var(--accent); transform: scaleX(0); transition: transform .35s var(--ease); }
.nav-links a:hover, .nav-links a.on { color: var(--ink); }
.nav-links a:hover::after, .nav-links a.on::after { transform: scaleX(1); }
.btn { display: inline-block; background: var(--ink); color: var(--ground); padding: .7rem 1.25rem; border-radius: 999px; font-weight: 600; font-size: .9375rem; text-decoration: none; white-space: nowrap; border: 1px solid var(--ink); transition: background .25s, border-color .25s, color .25s, transform .25s var(--ease); }
.btn:hover { background: var(--accent); border-color: var(--accent); color: #fff; transform: translateY(-1px); }
.btn.ghost { background: transparent; color: var(--ink); border-color: var(--rule-strong); }
.btn.ghost:hover { background: transparent; color: var(--accent); border-color: var(--accent); }
.btn.static:hover { background: var(--ink); border-color: var(--ink); color: var(--ground); transform: none; }

/* type */
.eyebrow { font-size: .78rem; letter-spacing: .14em; text-transform: uppercase; color: var(--soft); font-weight: 600; }
.scan { margin: .6rem auto 0; max-width: 40rem; color: var(--accent); font-weight: 500; font-size: 1.0625rem; text-wrap: balance; }
.h2 { margin: .9rem auto 0; font-weight: 600; font-size: clamp(2rem, 4.4vw, 3.5rem); line-height: 1.06; letter-spacing: -.035em; text-wrap: balance; max-width: 20ch; }
.h2.w { max-width: 26ch; }
.h2 span { display: block; }
.lede { margin: 1.25rem auto 0; max-width: 38rem; color: var(--soft); font-size: 1.125rem; }
.lbl { font-size: .75rem; letter-spacing: .14em; text-transform: uppercase; color: var(--soft); font-weight: 600; }
.sig { margin: 2.25rem auto 0; font-weight: 600; font-size: clamp(1.3rem, 2.4vw, 1.85rem); letter-spacing: -.025em; line-height: 1.2; max-width: 30ch; text-wrap: balance; }
.gap { margin-top: 2.5rem; }
.slot { border: 1px dashed var(--rule-strong); border-radius: 10px; padding: .55rem .9rem; font-size: .85rem; color: var(--soft); text-align: left; }
.slot b { color: var(--ink); font-weight: 600; margin-right: .5rem; }
.slot.mid { max-width: 640px; margin: .9rem auto 0; }

/* motion primitives (only when JS is on and motion is allowed) */
@media (prefers-reduced-motion: no-preference) {
  html.js .rv { transition: opacity 1.1s var(--ease), transform 1.1s var(--ease), filter 1.1s var(--ease); transition-delay: calc(var(--d, 0) * 110ms); }
  html.js .rv.pre { opacity: 0; transform: translateY(28px); filter: blur(6px); }
  html.js .rv.pre.in { opacity: 1; transform: none; filter: none; }
  html.js .a { opacity: 0; animation: up .9s var(--ease) forwards; animation-delay: calc(var(--d, 0) * 1ms); }
  html.js .bar { animation: down .8s var(--ease) backwards; }
  .tabpanel:not([hidden]) { animation: fade .5s var(--ease); }
  details[open] > .bd { animation: fade .45s var(--ease); }
  .bflow .node { animation: up .6s var(--ease) both; animation-delay: calc(var(--k, 0) * 90ms); }
  .sys .ea { stroke-dasharray: 5 6; animation: dash 3.2s linear infinite; }
  .sys .h { transform-box: fill-box; transform-origin: center; animation: pulse 2.8s ease-in-out infinite; }
  .stages .g { transition: opacity .9s var(--ease); }
  .stages.pre .g { opacity: 0; }
  .stages.pre.in .g { opacity: 1; }
  .stages.pre.in .g2 { transition-delay: .5s; }
  .stages.pre.in .g3 { transition-delay: 1s; }
}
@keyframes up { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes down { from { opacity: 0; transform: translateY(-14px); } to { opacity: 1; transform: none; } }
@keyframes rise { to { transform: none; } }
@keyframes fade { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
@keyframes dash { to { stroke-dashoffset: -22; } }
@keyframes pulse { 50% { transform: scale(1.3); } }

/* hero */
.hero { padding-block: clamp(2rem, 4.5vw, 3.5rem) clamp(2.5rem, 5vw, 4rem); }
.h1-wrap { position: relative; margin-top: 1.1rem; }
.h1-wrap canvas { position: absolute; left: 50%; top: -7rem; width: 100vw; height: calc(100% + 14rem); transform: translateX(-50%); display: block; pointer-events: none; }
@media (prefers-reduced-motion: no-preference) {
  html.js .h1-wrap:not(.pf-off) .pt { opacity: 0; filter: blur(14px); transform: scale(1.015); transition: opacity 1.1s var(--ease), filter 1.2s var(--ease), transform 1.4s var(--ease); }
  html.js .h1-wrap.formed .pt { opacity: 1; filter: blur(0); transform: none; }
}
.hero h1 { margin: 0 auto; font-weight: 600; font-size: clamp(2.6rem, 6.2vw, 4.9rem); line-height: 1.03; letter-spacing: -.045em; max-width: 19ch; text-wrap: balance; }
.hero .lead { margin: 1.1rem auto 0; max-width: 36rem; color: var(--soft); font-size: 1.15rem; }
.tags { margin-top: 1.1rem; display: flex; justify-content: center; flex-wrap: wrap; gap: .3rem 1.4rem; font-size: .76rem; letter-spacing: .14em; text-transform: uppercase; font-weight: 600; }
.tags a { text-decoration: none; color: var(--soft); }
.tags a:hover { color: var(--accent); }
.cta { margin-top: 1.5rem; display: flex; justify-content: center; flex-wrap: wrap; gap: .75rem; }
.trio { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(1.25rem, 3vw, 2.5rem); margin: 0 auto; max-width: 960px; }
.trio .fig, .stats .fig { font-weight: 600; font-size: clamp(1.4rem, 2.6vw, 2.05rem); line-height: 1.1; letter-spacing: -.03em; }
.trio .cap, .stats .cap { margin: .5rem auto 0; color: var(--soft); font-size: .93rem; max-width: 18rem; }
.hero .trio { margin-top: clamp(2rem, 4.5vw, 3.25rem); }
.facts { margin-top: 1.75rem; display: flex; justify-content: center; flex-wrap: wrap; gap: .35rem 1.75rem; font-size: .93rem; color: var(--soft); }
.facts strong { color: var(--ink); font-weight: 600; }
.facts.sub { margin-top: .4rem; font-size: .85rem; }
.twin { margin: 1.75rem auto 0; max-width: 640px; display: flex; align-items: center; gap: 1rem; text-align: left; background: var(--panel); border: 1px solid var(--rule); border-radius: 16px; padding: .9rem 1.25rem; transition: border-color .25s; }
.twin:hover { border-color: var(--accent); }
.play { flex: none; width: 2.8rem; height: 2.8rem; border-radius: 50%; background: var(--ink); color: var(--ground); display: grid; place-items: center; position: relative; }
.play::after { content: ""; position: absolute; inset: -5px; border-radius: 50%; border: 1px solid var(--accent); opacity: 0; animation: ring 2.6s ease-out infinite 2.4s; }
@keyframes ring { 0% { opacity: .7; transform: scale(.9); } 100% { opacity: 0; transform: scale(1.35); } }
@media (prefers-reduced-motion: reduce) { .play::after { animation: none; } }
.twin-t b { display: block; font-weight: 600; font-size: 1.05rem; letter-spacing: -.01em; }
.twin-t span { display: block; margin-top: .1rem; color: var(--soft); font-size: .9rem; }

/* perspective */
.cols3 { margin: 2.25rem auto 0; max-width: 980px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(1.25rem, 3vw, 2.25rem); text-align: left; }
.cols3 > div { border-top: 1px solid var(--rule-strong); padding-top: 1rem; }
.num { display: block; font-size: .8rem; font-weight: 600; color: var(--accent); }
.cols3 h3 { margin-top: .4rem; font-weight: 600; font-size: 1.25rem; line-height: 1.2; letter-spacing: -.015em; }
.cols3 p { margin-top: .5rem; color: var(--soft); font-size: .96rem; }
.sub-h { margin: clamp(3rem, 6vw, 4.5rem) auto 0; font-weight: 600; font-size: clamp(1.5rem, 3vw, 2.3rem); line-height: 1.12; letter-spacing: -.03em; max-width: 24ch; text-wrap: balance; }
.cards { margin: 1.75rem auto 0; display: grid; grid-template-columns: repeat(var(--n, 3), minmax(0, 1fr)); gap: .9rem; text-align: left; max-width: 1040px; }
.cards.n2 { --n: 2; max-width: 820px; }
.cards.n4 { --n: 4; }
.cards.n1 { --n: 1; max-width: 420px; }
.card { background: var(--panel); border: 1px solid var(--rule); border-radius: 14px; padding: 1.1rem 1.15rem 1.2rem; transition: border-color .25s, transform .3s var(--ease); }
.card:hover { border-color: var(--rule-strong); transform: translateY(-2px); }
.card .n { display: block; font-size: .78rem; font-weight: 600; color: var(--accent); }
.card .k { display: block; margin-top: .2rem; font-weight: 600; font-size: 1.05rem; letter-spacing: -.01em; line-height: 1.25; }
.card .m { display: block; margin-top: .25rem; font-size: .82rem; font-weight: 600; color: var(--accent); }
.card .q { display: block; margin-top: .35rem; color: var(--soft); font-size: .93rem; }
.award h3 { font-weight: 600; font-size: 1.12rem; letter-spacing: -.015em; line-height: 1.2; }
.award p { margin-top: .35rem; font-size: .88rem; color: var(--soft); }
.award p b { color: var(--ink); font-weight: 600; }
.tag { display: inline-block; margin-top: .6rem; border: 1px dashed var(--rule-strong); border-radius: 999px; padding: .05rem .6rem; font-size: .74rem; color: var(--soft); }
.caption { margin: 1.75rem auto 0; max-width: 42rem; color: var(--soft); font-size: 1.02rem; }

/* work: intro */
.fw { margin: 2.25rem auto 0; max-width: 940px; display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); gap: clamp(1.25rem, 4vw, 3rem); align-items: center; text-align: left; background: var(--panel); border: 1px solid var(--rule); border-radius: 20px; padding: clamp(1.1rem, 3vw, 2rem); }
.sys svg { display: block; width: 100%; height: auto; max-width: 380px; margin-inline: auto; }
.sys .e { fill: none; stroke: var(--rule-strong); stroke-width: 1; }
.sys .ea { fill: none; stroke: var(--accent); stroke-width: 1.5; opacity: .65; }
.sys .d { fill: var(--soft); }
.sys .n { fill: var(--ink); }
.sys .h { fill: var(--accent); }
.sys text { font: 600 13px var(--sans); fill: var(--ink); paint-order: stroke; stroke: var(--panel); stroke-width: 5px; stroke-linejoin: round; }
.fw .t { margin-top: .4rem; font-weight: 600; font-size: clamp(1.3rem, 2.3vw, 1.75rem); letter-spacing: -.025em; line-height: 1.15; }
.forces { margin-top: 1rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; }
.forces b { display: block; font-weight: 600; font-size: .95rem; }
.forces span { color: var(--soft); font-size: .84rem; line-height: 1.35; display: block; }
.fw .mini { margin-top: 1.25rem; padding-top: 1.1rem; border-top: 1px solid var(--rule); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .75rem; }
.fw .mini .fig { font-weight: 600; font-size: 1.3rem; letter-spacing: -.03em; line-height: 1.1; }
.fw .mini .cap { margin-top: .3rem; color: var(--soft); font-size: .8rem; line-height: 1.3; }

/* work: tabs */
.wtabs { margin: 2rem auto 0; max-width: 1040px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .7rem; text-align: left; }
.wtab { all: unset; box-sizing: border-box; cursor: pointer; display: block; padding: .95rem 1.05rem 1.05rem; border: 1px solid var(--rule); border-radius: 14px; background: var(--panel); transition: background .3s, border-color .3s, color .3s, transform .3s var(--ease); }
.wtab:hover { border-color: var(--accent); transform: translateY(-2px); }
.wtab:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.wtab .n { display: block; font-size: .76rem; font-weight: 600; color: var(--accent); }
.wtab b { display: block; margin-top: .2rem; font-weight: 600; font-size: 1.05rem; letter-spacing: -.01em; }
.wtab .d { display: block; margin-top: .2rem; font-size: .83rem; color: var(--soft); line-height: 1.35; }
.wtab[aria-selected="true"] { background: var(--ink); border-color: var(--ink); color: var(--ground); }
.wtab[aria-selected="true"] .n, .wtab[aria-selected="true"] .d { color: inherit; opacity: .78; }
.tabpanel { margin-top: clamp(2.25rem, 5vw, 3.5rem); }
.cs-head .st { margin: .75rem auto 0; font-weight: 600; font-size: clamp(1.7rem, 3.6vw, 2.8rem); line-height: 1.08; letter-spacing: -.035em; text-wrap: balance; max-width: 22ch; }
.cs-head .st span { display: block; }
.cs-head .cp, .cp { margin: 1.1rem auto 0; max-width: 38rem; color: var(--soft); font-size: 1.05rem; }
.stats { margin: 2rem auto 0; max-width: 960px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(1rem, 2.5vw, 2rem); }
.stats > div { border-top: 1px solid var(--rule-strong); padding-top: .85rem; }

/* before / after */
.seg { margin: 2.25rem auto 0; display: inline-flex; padding: 4px; gap: 4px; border: 1px solid var(--rule-strong); border-radius: 999px; background: var(--panel); }
.seg button { all: unset; box-sizing: border-box; cursor: pointer; padding: .45rem 1.3rem; border-radius: 999px; font-weight: 600; font-size: .9rem; color: var(--soft); transition: background .3s, color .3s; }
.seg button[aria-pressed="true"] { background: var(--ink); color: var(--ground); }
.seg button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.flow { margin: 1.4rem auto 0; display: flex; flex-wrap: wrap; justify-content: center; gap: 1.1rem 2.3rem; max-width: 980px; }
.node { position: relative; flex: 1 1 170px; max-width: 230px; background: var(--panel); border: 1px solid var(--rule); border-radius: 12px; padding: .9rem 1rem; text-align: left; }
.node:not(:last-child)::after { content: "→"; position: absolute; right: -1.65rem; top: 50%; transform: translateY(-50%); color: var(--soft); }
.node.hot { border-color: var(--accent); }
.node .t { display: block; font-weight: 600; line-height: 1.25; }
.node ul { margin-top: .45rem; display: grid; gap: .15rem; font-size: .88rem; color: var(--soft); }
.node .d { display: block; margin-top: .35rem; font-size: .88rem; color: var(--soft); }
.node .d b { color: var(--ink); font-weight: 600; }
.bflow[data-state="before"] .fa, .bflow[data-state="after"] .fb { display: none; }
.bcap { margin: 1.25rem auto 0; font-weight: 600; font-size: clamp(1.15rem, 2vw, 1.5rem); letter-spacing: -.02em; max-width: 30ch; text-wrap: balance; min-height: 2.4em; }
.quote { margin: 1.75rem auto 0; max-width: 36rem; font-weight: 500; font-size: clamp(1.1rem, 2vw, 1.4rem); line-height: 1.4; letter-spacing: -.015em; }
.quote cite { display: block; margin-top: .6rem; font-style: normal; font-size: .85rem; color: var(--soft); font-weight: 400; letter-spacing: 0; }

/* beats (accordion) */
.beats { margin: 2.25rem auto 0; max-width: 860px; text-align: left; border-top: 1px solid var(--rule-strong); }
.beat-row { border-bottom: 1px solid var(--rule); }
.beat-row summary { list-style: none; cursor: pointer; display: grid; grid-template-columns: 2.3rem minmax(0, 1fr) 1.6rem; column-gap: 1rem; row-gap: .1rem; align-items: center; padding: 1rem .2rem; }
.beat-row summary::-webkit-details-marker { display: none; }
.beat-row summary:focus-visible { outline: 2px solid var(--accent); outline-offset: -2px; }
.bn { grid-row: 1 / span 2; grid-column: 1; color: var(--accent); font-weight: 600; font-size: .82rem; }
.bl { grid-column: 2; font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; color: var(--soft); font-weight: 600; }
.bh { grid-column: 2; font-weight: 600; font-size: clamp(1.08rem, 1.8vw, 1.35rem); letter-spacing: -.02em; line-height: 1.22; transition: color .25s; }
.beat-row summary:hover .bh { color: var(--accent); }
.bp { grid-column: 3; grid-row: 1 / span 2; position: relative; width: 1.1rem; height: 1.1rem; justify-self: end; }
.bp::before, .bp::after { content: ""; position: absolute; left: 0; right: 0; top: 50%; height: 1.5px; background: currentColor; transition: transform .35s var(--ease); }
.bp::after { transform: rotate(90deg); }
.beat-row[open] .bp::after { transform: rotate(0); }
.beat-row[open] .bh { color: var(--accent); }
.bd { padding: .2rem .2rem 1.6rem 3.3rem; color: var(--soft); }
.bd > p { margin-top: .8rem; max-width: 42rem; }
.bd > p:first-child { margin-top: 0; }
.bd .lbl { margin-top: 1.4rem; }
.bd .lbl + .pull { margin-top: .5rem; }
.bd .pull { margin-top: 1.4rem; color: var(--ink); font-weight: 600; font-size: clamp(1.1rem, 1.9vw, 1.4rem); letter-spacing: -.02em; line-height: 1.25; max-width: 30ch; }
.bd .pull span { display: block; }
.bd .pull.acc { color: var(--accent); }
.bd .cards { margin: .9rem 0 0; max-width: none; }
.bd .flow { justify-content: flex-start; margin: .9rem 0 0; }
.duo { margin: 1rem 0 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .8rem; max-width: 640px; }
.duo > div { background: var(--panel); border: 1px solid var(--rule); border-radius: 12px; padding: 1rem 1.15rem 1.1rem; }
.duo > div.hot { border-color: var(--accent); }
.duo h4 { font-size: .74rem; letter-spacing: .12em; text-transform: uppercase; color: var(--soft); font-weight: 600; }
.duo li { margin-top: .35rem; font-weight: 600; font-size: 1rem; color: var(--ink); }
.chips { margin: .8rem 0 0; display: flex; flex-wrap: wrap; gap: .45rem; }
.chips li { padding: .3rem .8rem; border: 1px solid var(--rule-strong); border-radius: 999px; font-size: .86rem; background: var(--panel); color: var(--ink); }
.bd .bigfig { margin-top: 1.1rem; font-weight: 600; font-size: clamp(2rem, 5vw, 3rem); line-height: 1; letter-spacing: -.045em; color: var(--ink); }
.bd .bigfig small { display: block; margin-top: .4rem; font-size: .88rem; font-weight: 500; letter-spacing: 0; color: var(--soft); }
.fig-panel { margin: 1rem 0 0; max-width: 760px; background: var(--panel); border: 1px solid var(--rule); border-radius: 16px; padding: clamp(.8rem, 2vw, 1.25rem); }
.fig-panel svg { display: block; width: 100%; height: auto; }
.fig-cols { margin-top: .5rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; font-size: .82rem; color: var(--soft); }
.fig-cols b { display: block; color: var(--ink); font-weight: 600; }
.vas .p { fill: none; stroke: var(--soft); stroke-width: 1.5; opacity: .5; }
.vas .m { fill: none; stroke: var(--soft); stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.vas .box { fill: none; stroke: var(--rule-strong); stroke-width: 1.5; }
.vas .boxa { fill: var(--accent); fill-opacity: .14; stroke: var(--accent); stroke-width: 1.5; }

/* intent + next panels */
.two { margin: 2rem auto 0; max-width: 820px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1.25rem, 3vw, 2.5rem); text-align: left; }
.two > div { border-top: 1px solid var(--rule-strong); padding-top: 1rem; }
.two h3 { margin-top: .4rem; font-weight: 600; font-size: 1.2rem; line-height: 1.25; letter-spacing: -.015em; }
.two p { margin-top: .6rem; color: var(--soft); font-size: .96rem; }
.leave { margin: 2.25rem auto 0; padding: clamp(1.75rem, 4vw, 2.75rem) clamp(1.25rem, 3vw, 2rem); background: #000; color: #F5F5F7; border-radius: 20px; --soft: #A9A9B5; --accent: #B8A1FF; }
.leave .big { margin-top: .6rem; font-weight: 600; font-size: clamp(1.9rem, 4.6vw, 3.4rem); line-height: 1.05; letter-spacing: -.04em; }
.leave .big span { display: block; }
.leave p.cp { color: var(--soft); }
.leave .sig { margin-top: 1.5rem; }
.bridge { margin: 2.25rem auto 0; max-width: 34rem; font-weight: 600; font-size: clamp(1.25rem, 2.3vw, 1.65rem); line-height: 1.25; letter-spacing: -.02em; text-wrap: balance; }
.bridge-link { margin-top: 1rem; font-size: .95rem; }
.bridge-link a { color: var(--soft); text-decoration: none; }
.bridge-link a:hover { color: var(--accent); }

/* leadership */
.credit { margin-top: 1.1rem; display: flex; flex-wrap: wrap; justify-content: center; gap: .3rem 2rem; font-size: .93rem; color: var(--soft); }
.credit strong { color: var(--ink); font-weight: 600; }
.lrail { margin: 2.25rem auto 0; max-width: 960px; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: .6rem; }
.lt { all: unset; box-sizing: border-box; cursor: pointer; display: block; text-align: left; padding: .85rem 1rem .95rem; background: var(--panel); border: 1px solid var(--rule); border-radius: 14px; transition: border-color .3s, transform .3s var(--ease), background .3s; }
.lt:hover { border-color: var(--accent); transform: translateY(-2px); }
.lt:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.lt .n { display: block; font-size: .72rem; font-weight: 600; letter-spacing: .1em; color: var(--soft); }
.lt .name { display: block; margin-top: .2rem; font-weight: 600; font-size: 1.05rem; letter-spacing: -.01em; }
.lt[aria-pressed="true"] { border-color: var(--accent); box-shadow: 0 0 0 1px var(--accent); }
.lt.elevate { background: var(--ink); color: var(--ground); border-color: var(--ink); }
.lt.elevate .n { color: inherit; opacity: .7; }
.lt.elevate[aria-pressed="true"] { border-color: var(--accent); box-shadow: 0 0 0 2px var(--accent); }
.lpanel { margin: 1rem auto 0; max-width: 960px; background: var(--panel); border: 1px solid var(--rule); border-radius: 18px; padding: clamp(1.25rem, 3vw, 2.1rem); text-align: left; }
.lp { display: grid; grid-template-columns: minmax(0, 3fr) minmax(0, 2fr); gap: clamp(1.25rem, 3vw, 2.5rem); }
.lp[hidden] { display: none; }
@media (prefers-reduced-motion: no-preference) { .lp:not([hidden]) { animation: fade .5s var(--ease); } }
.lp .head { font-weight: 600; font-size: clamp(1.35rem, 2.5vw, 1.9rem); line-height: 1.15; letter-spacing: -.03em; }
.lp .short { margin-top: .5rem; color: var(--accent); font-weight: 500; font-size: .98rem; }
.lp .body { margin-top: 1rem; color: var(--soft); font-size: 1rem; line-height: 1.6; }
.lp .proof { border-left: 1px solid var(--rule); padding-left: clamp(1rem, 2.5vw, 1.75rem); align-self: start; }
.lp .proof .label { font-size: .74rem; letter-spacing: .14em; text-transform: uppercase; font-weight: 600; color: var(--accent); }
.lp .proof p:not(.label) { margin-top: .5rem; color: var(--ink); font-size: .98rem; }
.lp .proof .slot { margin-top: .6rem; }
.bottom-line { margin: 2.25rem auto 0; font-weight: 600; font-size: clamp(1.4rem, 3vw, 2.2rem); line-height: 1.12; letter-spacing: -.03em; max-width: 24ch; text-wrap: balance; }

/* impact */
.ctx { font-size: .88rem; color: var(--soft); }
.ctx b { color: var(--ink); font-weight: 600; }
.i1 { margin: 2rem auto 0; max-width: 1040px; display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: clamp(1.25rem, 4vw, 3rem); align-items: center; text-align: left; background: var(--panel); border: 1px solid var(--rule); border-radius: 20px; padding: clamp(1.25rem, 3vw, 2.25rem); }
.i1 h3, .story h3 { margin-top: .5rem; font-weight: 600; font-size: clamp(1.45rem, 2.7vw, 2.15rem); line-height: 1.1; letter-spacing: -.03em; }
.i1 p, .story p { margin-top: .75rem; color: var(--soft); font-size: .98rem; }
.stages svg { display: block; width: 100%; height: auto; }
.stages .dot { fill: var(--soft); }
.stages .edge { stroke: var(--rule-strong); stroke-width: 1; fill: none; }
.stages .hub { fill: var(--accent); }
.stage-labels { margin-top: .4rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; color: var(--soft); font-weight: 600; text-align: center; }
.i1 .slot, .story .slot { margin-top: .6rem; }
.stories { margin: 1rem auto 0; max-width: 1040px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; text-align: left; }
.story { background: var(--panel); border: 1px solid var(--rule); border-radius: 20px; padding: clamp(1.25rem, 3vw, 1.9rem); }
.story p.strong { color: var(--ink); font-weight: 600; }
.chain { margin-top: .9rem; font-size: .76rem; letter-spacing: .08em; text-transform: uppercase; font-weight: 600; color: var(--ink); line-height: 1.5; }
.pattern { margin: clamp(2.5rem, 5vw, 3.5rem) auto 0; max-width: 900px; }
.pattern-lead { max-width: 34rem; margin: 0 auto; font-weight: 600; font-size: clamp(1.2rem, 2.2vw, 1.6rem); line-height: 1.25; letter-spacing: -.02em; text-wrap: balance; }
.pattern-cols { margin-top: 1.75rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.25rem; }
.pattern-cols .domain { font-size: .74rem; letter-spacing: .14em; text-transform: uppercase; color: var(--soft); font-weight: 600; }
.pattern-cols .verb { margin-top: .2rem; font-weight: 600; font-size: clamp(1.6rem, 3.2vw, 2.4rem); letter-spacing: -.035em; line-height: 1.1; color: var(--accent); }
.pattern-cols .gloss { margin-top: .2rem; color: var(--soft); font-size: .93rem; }

/* future */
.band-in { max-width: 44rem; margin-inline: auto; }
.beat { margin-top: clamp(2rem, 4vw, 3rem); font-weight: 500; font-size: clamp(1.2rem, 2.2vw, 1.5rem); line-height: 1.45; letter-spacing: -.01em; }
.beat span { display: block; }
.beat.quiet { font-weight: 400; font-size: 1.0625rem; color: var(--soft); letter-spacing: 0; }
.beat.turn { font-weight: 600; font-size: clamp(1.7rem, 3.6vw, 2.6rem); line-height: 1.1; letter-spacing: -.035em; }
.beat.key { font-weight: 600; letter-spacing: -.02em; }
.more { margin-top: 1.75rem; }
.more summary { list-style: none; cursor: pointer; display: inline-flex; align-items: center; gap: .6rem; font-weight: 600; font-size: .95rem; padding: .6rem 1.2rem; border: 1px solid var(--rule-strong); border-radius: 999px; transition: border-color .25s, color .25s; }
.more summary::-webkit-details-marker { display: none; }
.more summary:hover { border-color: var(--accent); color: var(--accent); }
.more summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.more .on-open { display: none; }
.more[open] .on-open { display: inline; }
.more[open] .on-closed { display: none; }
.more[open] > summary { margin-bottom: .5rem; }
.provocation { margin-top: clamp(3.5rem, 7vw, 5.5rem); font-weight: 600; font-size: clamp(1.7rem, 5vw, 3.6rem); line-height: 1.05; letter-spacing: -.035em; text-transform: uppercase; }
.provocation span { display: block; }
.provocation span + span { margin-top: .45em; }
.caveat { margin-top: 1.75rem; color: var(--soft); font-size: 1.0625rem; }
.closing-q { margin-top: clamp(2.5rem, 6vw, 4rem); font-weight: 500; font-size: 1.3rem; letter-spacing: -.01em; }

/* about + connect */
.about-grid { margin: 2.25rem auto 0; max-width: 960px; display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 6fr); gap: clamp(1.5rem, 5vw, 3.5rem); align-items: start; text-align: left; }
.portrait { aspect-ratio: 4 / 5; background: var(--panel); border: 1px dashed var(--rule-strong); border-radius: 18px; display: grid; place-items: center; text-align: center; padding: 1rem; font-size: .875rem; color: var(--soft); }
.about-copy p { color: var(--soft); font-size: 1.05rem; }
.about-copy p + p { margin-top: 1rem; }
.about-copy .first { font-weight: 600; font-size: clamp(1.3rem, 2.2vw, 1.7rem); line-height: 1.25; letter-spacing: -.02em; color: var(--ink); }
.about-copy .close-lines { margin-top: 1.5rem; font-weight: 600; font-size: clamp(1.4rem, 2.8vw, 2rem); line-height: 1.15; letter-spacing: -.03em; color: var(--ink); }
.about-copy .close-lines span { display: block; }
.voices { margin: 1rem auto 0; max-width: 960px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: .8rem; }
.links { margin-top: 1.5rem; display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem 2rem; font-size: .9375rem; font-weight: 600; }
.links span { border-bottom: 1px solid var(--rule-strong); padding-bottom: .15rem; }
.talk { font-weight: 600; font-size: clamp(2.3rem, 6.6vw, 5.2rem); line-height: 1.04; letter-spacing: -.045em; text-wrap: balance; max-width: 15ch; margin-inline: auto; }
.talk.ask { margin-top: .3em; color: var(--soft); }
.talk-actions { margin-top: clamp(1.75rem, 4vw, 2.75rem); display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1rem 2rem; font-weight: 600; }
.talk-actions .btn { padding: 1rem 1.7rem; font-size: 1.0625rem; }
.talk-actions .alt { border-bottom: 1px solid var(--rule-strong); padding-bottom: .15rem; }
.foot { border-top: 1px solid var(--rule); padding-block: 1.5rem; font-size: .85rem; color: var(--soft); text-align: center; }


/* ===== Clean pass: quiet labels, hairline grids, more air. Accent is reserved for diagrams and focus. ===== */
:root { --sbg: var(--ground); }
.s.g { --sbg: var(--tint); }
.s.k { --sbg: #000; }
.s { padding-block: clamp(5rem, 11vw, 9rem); }
.hero { padding-block: clamp(2.5rem, 5vw, 4rem) clamp(4rem, 8vw, 6.5rem); }
.eyebrow, .kicker { font-size: .82rem; letter-spacing: 0; text-transform: none; font-weight: 500; color: var(--soft); }
.scan { color: var(--soft); font-weight: 400; font-size: .95rem; margin-top: .45rem; }
.h2 { margin-top: 1.1rem; font-size: clamp(2.1rem, 4.6vw, 3.7rem); letter-spacing: -.04em; line-height: 1.04; }
.lede { margin-top: 1.6rem; font-size: 1.06rem; line-height: 1.7; max-width: 33rem; }
.lbl { font-size: .8rem; letter-spacing: 0; text-transform: none; font-weight: 500; color: var(--soft); }
.sig { margin-top: 3.5rem; }
.sub-h { margin-top: clamp(5.5rem, 11vw, 8.5rem); }
.caption { margin-top: 2.5rem; font-size: .95rem; }
.num, .card .n, .card .m, .bn, .wtab .n, .lt .n { color: var(--soft); }

/* hairline grids: cells separated by 1px rules, no boxes */
.cards, .stats, .trio, .fw .mini { gap: 1px; background: var(--rule); border-block: 1px solid var(--rule); }
.cards { margin-top: 3rem; }
.card { background: var(--sbg); border: 0; border-radius: 0; padding: 1.6rem 1.4rem 1.75rem; }
.card:hover { transform: none; }
.card .k { font-size: 1.06rem; }
.award h3 { font-size: 1.06rem; }
.stats { margin: 3.5rem auto 0; max-width: 680px; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.stats > div, .trio > div { background: var(--sbg); border-top: 0; padding: 2.4rem 1.25rem 2.5rem; text-align: center; }
.stats .fig, .trio .fig { font-size: clamp(1.9rem, 3.3vw, 2.6rem); letter-spacing: -.04em; line-height: 1.05; }
.stats .cap, .trio .cap { margin-top: .7rem; font-size: .85rem; max-width: 16rem; }
.hero .trio { margin-top: clamp(3.5rem, 7vw, 5rem); max-width: 900px; }
.hero .trio .fig { font-size: clamp(1.45rem, 2.4vw, 1.9rem); }
.facts { margin-top: 2.5rem; }
.cs-head .st { margin-top: .9rem; font-size: clamp(2.1rem, 4.4vw, 3.4rem); letter-spacing: -.04em; line-height: 1.04; }
.cs-head .cp { margin-top: 1.6rem; max-width: 33rem; font-size: 1.04rem; line-height: 1.7; }
.cs-note { margin: 3rem auto 0; max-width: 30rem; font-size: .85rem; color: var(--soft); text-wrap: balance; }

/* panels lose their outlines; they sit on a soft fill */
.fw, .i1, .story, .lpanel { border: 0; --sbg: var(--panel); }
.fw { margin-top: 3.5rem; padding: clamp(1.5rem, 4vw, 3rem); }
.fw .mini { margin-top: 1.75rem; padding-top: 0; border-top: 1px solid var(--rule); }
.fw .mini > div { background: var(--panel); padding: 1.1rem .75rem; }
.twin { border: 0; margin-top: 3rem; }
.twin:hover { border: 0; }
.play::after { border-color: var(--rule-strong); }

/* tabs and rails keep their shape; selection is ink, not violet */
.wtabs { margin-top: 4rem; }
.wtab:hover, .lt:hover { border-color: var(--rule-strong); }
.lt[aria-pressed="true"] { border-color: var(--ink); box-shadow: 0 0 0 1px var(--ink); }
.lt.elevate[aria-pressed="true"] { border-color: var(--ink); box-shadow: 0 0 0 2px var(--sbg), 0 0 0 3px var(--ink); }
.tabpanel { margin-top: clamp(4.5rem, 9vw, 7rem); }
.lrail { margin-top: 3.5rem; }
.lpanel { margin-top: 1.25rem; padding: clamp(1.5rem, 4vw, 3rem); }
.lp .short, .lp .proof .label { color: var(--soft); }
.lp .proof .label { letter-spacing: 0; text-transform: none; font-size: .8rem; }

/* accent removed from text and controls */
.prog { background: var(--ink); opacity: .55; }
.nav-links a::after { background: var(--ink); }
.btn:hover { background: var(--ink); border-color: var(--ink); color: var(--ground); opacity: .85; }
.btn.ghost:hover { color: var(--ink); border-color: var(--ink); opacity: 1; }
.tags a:hover, .bridge-link a:hover { color: var(--ink); }
.more summary:hover { border-color: var(--ink); color: var(--ink); }
.pull.acc, .bd .pull.acc { color: var(--ink); }
.beat-row summary:hover .bh { color: var(--soft); }
.beat-row[open] .bh { color: var(--ink); }
.node.hot, .duo > div.hot { border-color: var(--ink); }
.pattern-cols .verb { color: var(--ink); }
.s.k .scan { color: var(--soft); }

/* beats breathe */
.beats { margin-top: 3.5rem; border-top-color: var(--rule); }
.beat-row summary { padding: 1.4rem .2rem; }
.bl { font-size: .78rem; letter-spacing: 0; text-transform: none; font-weight: 500; }
.bd { padding-bottom: 2.25rem; }
.bd .cards { margin-top: 1.25rem; }
.quote { margin-top: 3rem; }
.seg { margin-top: 3.5rem; }

/* impact and future */
.i1 { margin-top: 3.5rem; }
.stories { margin-top: 1.25rem; }
.pattern { margin-top: clamp(4rem, 8vw, 6rem); }
.chain { letter-spacing: .02em; text-transform: none; font-size: .85rem; font-weight: 500; }
.stage-labels { letter-spacing: 0; text-transform: none; font-size: .8rem; font-weight: 500; }
.beat { margin-top: clamp(2.5rem, 5vw, 3.75rem); }


/* ===== Facelift: four tiers. Statement > headline > proof > detail. ===== */
.bar { transition: transform .45s var(--ease), background .3s; }
.bar.hide { transform: translateY(-105%); }
.btn .ar { display: inline-block; transition: transform .35s var(--ease); }
.btn:hover .ar { transform: translateX(3px); }
.btn:hover .ar.dn { transform: translateY(3px); }

/* tier 1: statement lines, lit word by word as they scroll through */
.lit { margin: clamp(4.5rem, 10vw, 8rem) auto 0; max-width: 19ch; font-weight: 600; font-size: clamp(2.1rem, 5vw, 4rem); line-height: 1.06; letter-spacing: -.045em; text-wrap: balance; color: var(--ink); }
.lit.sm { max-width: 26ch; font-size: clamp(1.55rem, 3.2vw, 2.45rem); line-height: 1.16; letter-spacing: -.03em; }
.lit-k { display: block; margin-bottom: 1.1rem; font-size: .82rem; font-weight: 500; letter-spacing: 0; color: var(--soft); }
html.lit-on .lit .wd { color: var(--dim); transition: color .45s ease; }
html.lit-on .lit .wd.on { color: var(--ink); }
.tabpanel .lit { margin-top: clamp(4rem, 9vw, 6.5rem); }
#future .lit + .beat.quiet { margin-top: 1.5rem; }
#future .lit.sm { margin-top: clamp(3rem, 7vw, 5rem); }

/* tier 2: section headlines get more scale and air */
.h2 { font-size: clamp(2.3rem, 5.4vw, 4.4rem); }
.eyebrow { margin-bottom: .2rem; }
.hero .eyebrow { letter-spacing: .02em; }

/* tier 3: the journey, as a six-step path */
.path { margin: clamp(4rem, 8vw, 5.5rem) auto 0; padding: 0; list-style: none; max-width: 1040px; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 1px; background: var(--rule); border-block: 1px solid var(--rule); }
.path li { background: var(--sbg); padding: 1.6rem .9rem 1.7rem; text-align: center; }
.path b { display: block; font-weight: 600; font-size: 1.1rem; letter-spacing: -.015em; }
.path span { display: block; margin-top: .3rem; color: var(--soft); font-size: .86rem; line-height: 1.35; }
.path li:last-child b { color: var(--accent); }

/* quieter supporting furniture */
.twin { background: transparent; padding: .5rem; gap: .9rem; max-width: 560px; }
.twin .play { width: 2.6rem; height: 2.6rem; }
.slot { font-size: .8rem; padding: .45rem .8rem; border-color: var(--rule-strong); }
.facts { font-size: .9rem; }
#connect .talk.ask { color: var(--soft); }
.path + .slot { margin-top: 1.75rem; }


/* ===== Revision: one flagship case, designed placeholders, editorial breaks, particle bookends ===== */
.btn .pl { font-size: .72em; margin-right: .4rem; vertical-align: .08em; }
.split { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: clamp(2rem, 6vw, 5.5rem); align-items: center; text-align: left; }
.split .h2, .split .lede { margin-left: 0; margin-right: 0; text-align: left; }
.sys-panel { background: var(--panel); border-radius: 24px; padding: clamp(1.25rem, 3vw, 2.25rem); --sbg: var(--panel); }
.split .forces { margin-top: 2.25rem; padding-top: 1.25rem; border-top: 1px solid var(--rule); }
.stats.wide { max-width: none; margin-top: clamp(3.5rem, 7vw, 5rem); }
.shot { margin-top: clamp(2.5rem, 5vw, 3.5rem); }

/* placeholders: a quiet dotted field, the particle motif at rest */
.ph { position: relative; width: 100%; max-width: 100%; aspect-ratio: var(--ar, 16/9); border-radius: 22px; overflow: hidden; display: grid; place-items: center; text-align: center; color: var(--soft);
  background-color: var(--panel); background-image: radial-gradient(circle, var(--dim) 1px, transparent 1.5px); background-size: 16px 16px; background-position: center; }
.ph-in { display: grid; gap: .25rem; padding: .65rem 1.1rem; background: var(--panel); border-radius: 12px; max-width: 82%; }
.ph-t { font-size: .82rem; font-weight: 600; color: var(--ink); }
.ph-d { font-size: .8rem; line-height: 1.4; }
.ph.big { border-radius: 28px; }

/* digital twin */
.twin-s .h2 { max-width: 15ch; }
.video { position: relative; margin: clamp(2.75rem, 6vw, 4rem) auto 0; max-width: 1000px; }
.video .ph { border-radius: 28px; place-items: end center; padding-bottom: clamp(1rem, 3vw, 1.75rem); }
.playbig { position: absolute; left: 50%; top: 50%; width: 88px; height: 88px; margin: -44px 0 0 -44px; border-radius: 50%; background: var(--ink); color: var(--sbg); display: grid; place-items: center; }
.playbig::after { content: ""; position: absolute; inset: -10px; border-radius: 50%; border: 1px solid var(--ink); opacity: 0; }
@media (prefers-reduced-motion: no-preference) { .playbig::after { animation: ring 2.8s ease-out infinite 1s; } }
.vnote { margin-top: 1.25rem; font-size: .85rem; color: var(--soft); }
.vnote .tag, .icap .tag { margin: 0 .35rem 0 0; }

/* galleries */
.gal-wrap { margin-top: clamp(4rem, 8vw, 6rem); text-align: left; }
.gal { margin-top: 1.1rem; display: grid; grid-auto-flow: column; grid-auto-columns: min(80%, 420px); gap: 1rem; overflow-x: auto; scroll-snap-type: x mandatory; padding-bottom: .9rem; scrollbar-width: thin; scrollbar-color: transparent transparent; overscroll-behavior-x: contain; }
.gal:hover, .gal:focus-visible { scrollbar-color: rgba(10, 12, 18, .28) transparent; }
.gal::-webkit-scrollbar { height: 3px; background: transparent; }
.gal::-webkit-scrollbar-track { background: transparent; }
.gal::-webkit-scrollbar-thumb { border-radius: 999px; background: transparent; }
.gal:hover::-webkit-scrollbar-thumb, .gal:focus-visible::-webkit-scrollbar-thumb { background: rgba(10, 12, 18, .28); }
.gal figure { scroll-snap-align: start; margin: 0; min-width: 0; }
.gal figcaption { margin-top: .7rem; font-size: .86rem; color: var(--soft); }
.gal figcaption b { color: var(--ink); font-weight: 600; margin-right: .4rem; }
.gal .ph { border-radius: 18px; }
.gal:focus-visible { outline: 2px solid var(--accent); outline-offset: 4px; }
.gal-hint { margin-top: .3rem; font-size: .8rem; color: var(--soft); }
.mini-gal { grid-auto-columns: min(80%, 300px); }
.wtabs.two-t { grid-template-columns: repeat(2, minmax(0, 1fr)); max-width: 640px; }

/* impact: scale strip and editorial rows */
.scale { margin-top: clamp(4rem, 8vw, 5.5rem); max-width: none; grid-template-columns: repeat(4, minmax(0, 1fr)); }
.fig.tbd, .ibig.tbd { color: var(--dim); }
.stats .tag { margin-top: .8rem; }
.irows { margin-top: clamp(4rem, 8vw, 6rem); border-top: 1px solid var(--rule); }
.irow { display: grid; grid-template-columns: minmax(0, 4fr) minmax(0, 7fr); gap: clamp(2rem, 6vw, 5.5rem); padding-block: clamp(3rem, 6vw, 4.5rem); border-bottom: 1px solid var(--rule); text-align: left; align-items: start; }
.ibig { font-weight: 600; font-size: clamp(2.6rem, 5.4vw, 4.4rem); line-height: 1; letter-spacing: -.05em; }
.icap { margin-top: 1rem; color: var(--soft); font-size: .92rem; max-width: 22rem; }
.ileft .stages { margin-top: 2.25rem; max-width: 380px; }
.ileft .stage-labels { max-width: 380px; }
.iright h3 { margin-top: .75rem; font-weight: 600; font-size: clamp(1.6rem, 3vw, 2.3rem); line-height: 1.08; letter-spacing: -.035em; }
.iright p { margin-top: .9rem; color: var(--soft); max-width: 38rem; }
.iright .chain { color: var(--ink); margin-top: 1.25rem; }
.iright .role { margin-top: 1.4rem; color: var(--ink); font-size: .9rem; font-weight: 500; }

/* about: asymmetric */
.about-split { grid-template-columns: minmax(0, 5fr) minmax(0, 6fr); align-items: start; }
.about-split .h2 { margin-top: .6rem; }
.about-copy .first { margin-top: 2rem; }
.links.l { justify-content: flex-start; }

/* testimonials */
.voices2 { margin-top: clamp(5rem, 10vw, 8rem); }
.vq { margin: 1.5rem auto 0; max-width: 46rem; min-height: 9.5rem; }
.vquote p { font-weight: 500; font-size: clamp(1.4rem, 2.8vw, 2.1rem); line-height: 1.3; letter-spacing: -.02em; text-wrap: balance; }
.vquote cite { display: block; margin-top: 1.25rem; font-style: normal; font-size: .9rem; color: var(--soft); }
.tbd-q { color: var(--rule-strong); }
.vsel { margin-top: 2rem; display: inline-flex; flex-wrap: wrap; justify-content: center; gap: 4px; padding: 4px; border: 1px solid var(--rule-strong); border-radius: 999px; }
.vsel button { all: unset; box-sizing: border-box; cursor: pointer; padding: .45rem 1.1rem; border-radius: 999px; font-size: .88rem; font-weight: 600; color: var(--soft); transition: background .3s, color .3s; }
.vsel button[aria-pressed="true"] { background: var(--ink); color: var(--sbg); }
.vsel button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
@media (prefers-reduced-motion: no-preference) { .vquote:not([hidden]) { animation: fade .55s var(--ease); } }
.voices2 + .slot { margin-top: 3rem; }

/* closing bookend */
.ask-wrap { margin-top: .3em; }
.about-copy .eyebrow { font-size: .82rem; color: var(--soft); }
.split .h2 { font-size: clamp(2.2rem, 4.4vw, 3.7rem); max-width: 16ch; }
.ibig.word { font-size: clamp(2.2rem, 4.4vw, 3.5rem); letter-spacing: -.045em; }
.ask-wrap .talk.ask { margin-top: 0; }

@media (max-width: 860px) {
  .split, .about-split { grid-template-columns: minmax(0, 1fr); }
  .scale { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}
@media (max-width: 760px) {
  .irow { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
  .vsel { border-radius: 18px; }
}


/* ===== Three groups: Work, Leadership, About ===== */
.grp { display: flex; align-items: center; justify-content: center; gap: 1.1rem; margin: 0 auto clamp(2.75rem, 6vw, 4rem); font-size: .78rem; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--ink); }
.grp::before, .grp::after { content: ""; height: 1px; width: clamp(2.5rem, 8vw, 5.5rem); background: var(--rule-strong); }
.nav-links { gap: clamp(1.25rem, 3vw, 2.5rem); }


/* ===== v8: tighter groups ===== */
.scope-line { margin-top: 1.5rem; max-width: 34rem; font-size: .95rem; line-height: 1.6; color: var(--soft); }
.scope-line b { color: var(--ink); font-weight: 600; }
.recog { margin-top: clamp(5rem, 10vw, 8rem); }
.rec-line { margin: .9rem auto 0; max-width: 36rem; color: var(--soft); font-size: 1.02rem; text-wrap: balance; }
.recog .cards { margin-top: 2rem; }
.recog .path { margin-top: 1rem; }


/* ===== Wider measure: statements set in up to three lines, less side space, less scroll ===== */
.band-in, #future .band-in { max-width: 68rem; }
.lit { max-width: 30ch; font-size: clamp(1.9rem, 4vw, 3.2rem); line-height: 1.1; margin-top: clamp(3rem, 7vw, 5rem); }
.lit.sm { max-width: 44ch; font-size: clamp(1.35rem, 2.4vw, 1.95rem); line-height: 1.25; letter-spacing: -.025em; }
#future .lit.sm { margin-top: clamp(2rem, 4.5vw, 3rem); }
#future .h2 + .lit, #future .h2 + .lit.sm { margin-top: clamp(2.5rem, 5vw, 3.5rem); }
.h2 { max-width: 24ch; }
.h2.w { max-width: 30ch; }
.lede { max-width: 42rem; }
.cs-head .st { max-width: 26ch; }
.cs-head .cp { max-width: 40rem; }
.twin-s .h2 { max-width: 22ch; }
.talk { max-width: 20ch; }
.sig, .bottom-line, .pattern-lead { max-width: 40ch; }
.vq { max-width: 56rem; }
.leave .big span { display: inline; }
.leave .big span + span::before { content: " "; }


/* ===== Digital twin: floating invitation + overlay ===== */
.twin-fab { position: fixed; right: clamp(16px, 3vw, 32px); bottom: calc(clamp(16px, 3vw, 32px) + env(safe-area-inset-bottom, 0px)); z-index: 25; display: flex; align-items: center; gap: .7rem; padding: .45rem 1.1rem .45rem .45rem; border-radius: 999px; background: var(--ink); color: var(--ground); text-decoration: none; box-shadow: 0 10px 30px -12px rgba(0,0,0,.45); transition: transform .4s var(--ease), opacity .4s var(--ease), box-shadow .3s; }
.twin-fab:hover { transform: translateY(-2px); box-shadow: 0 16px 36px -14px rgba(0,0,0,.55); }
.tf-dot { position: relative; width: 2.6rem; height: 2.6rem; border-radius: 50%; background: var(--ground); color: var(--ink); display: grid; place-items: center; flex: none; }
.tf-dot svg { margin-left: 2px; }
.tf-dot::after { content: ""; position: absolute; inset: -5px; border-radius: 50%; border: 1px solid var(--ground); opacity: 0; }
@media (prefers-reduced-motion: no-preference) { .tf-dot::after { animation: ring 2.8s ease-out infinite 3s; } }
.tf-l { display: grid; line-height: 1.2; }
.tf-l b { font-size: .9rem; font-weight: 600; }
.tf-l span { font-size: .75rem; opacity: .7; }
html.js .twin-fab { opacity: 0; transform: translateY(14px); pointer-events: none; }
html.js .twin-fab.on { opacity: 1; transform: none; pointer-events: auto; }
html.js .twin-fab.on:hover { transform: translateY(-2px); }
@media (max-width: 560px) { .twin-fab { padding: .4rem; } .tf-l { display: none; } }

.twin-dlg { position: fixed; inset: 0; width: min(860px, calc(100vw - 40px)); max-width: none; max-height: calc(100dvh - 48px); margin: auto; padding: 0; border: 0; border-radius: 24px; background: var(--ground); color: var(--ink); overflow: auto; }
.twin-dlg::backdrop { background: rgba(0,0,0,.55); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
.td-in { position: relative; padding: clamp(1.5rem, 3vw, 2.25rem); text-align: center; --sbg: var(--ground); }
.td-x { position: absolute; top: 1rem; right: 1rem; z-index: 4; width: 2.5rem; height: 2.5rem; border-radius: 50%; border: 1px solid var(--rule-strong); background: transparent; color: var(--ink); line-height: 1; cursor: pointer; display: grid; place-items: center; padding: 0; }
.td-x:hover { border-color: var(--ink); }
.td-x svg { display: block; }
.twin-dlg .eyebrow.twin-k { font-size: .72rem; font-weight: 600; letter-spacing: .16em; text-transform: uppercase; color: var(--soft); }
.td-h { margin: .6rem auto 0; font-weight: 600; font-size: clamp(1.6rem, 3vw, 2.35rem); line-height: 1.08; letter-spacing: -.035em; max-width: 22ch; text-wrap: balance; }
.td-p { margin: .9rem auto 0; max-width: 46rem; color: var(--soft); text-wrap: balance; }
.twin-dlg .video { margin-top: 1.75rem; }
.twin-media { position: relative; border-radius: 18px; overflow: hidden; isolation: isolate; background: #0A0A0B; aspect-ratio: 16/9; -webkit-mask-image: -webkit-radial-gradient(white, black); mask-image: radial-gradient(white, black); transform: translateZ(0); }
.twin-v { display: block; width: 100%; height: 100%; object-fit: cover; background: #0A0A0B; border-radius: inherit; }
.twin-play { all: unset; box-sizing: border-box; position: absolute; inset: 0; z-index: 2; cursor: pointer; display: block; border-radius: inherit; color: #fff; background: radial-gradient(ellipse 38% 34% at 50% 60%, rgba(10,10,11,.38), rgba(10,10,11,0) 100%), rgba(10,10,11,.46); transition: background .3s, opacity .3s; }
.twin-play:hover { background: radial-gradient(ellipse 38% 34% at 50% 60%, rgba(10,10,11,.34), rgba(10,10,11,0) 100%), rgba(10,10,11,.38); }
.twin-play:focus-visible { outline: 3px solid var(--accent); outline-offset: -3px; border-radius: 20px; }
.twin-play .playbig { background: #fff; color: #0A0A0B; transition: transform .3s var(--ease); }
.twin-play .playbig::after { border-color: #fff; }
.twin-play:hover .playbig { transform: scale(1.06); }
.twin-cta { position: absolute; left: 0; right: 0; top: calc(50% + 62px); display: inline-flex; flex-direction: column; justify-content: center; align-items: center; gap: .2rem; color: #fff; font-size: 1.02rem; font-weight: 500; text-shadow: 0 1px 12px rgba(0,0,0,.45); }
.twin-dur { font-size: .88rem; font-weight: 400; opacity: .8; }
.twin-media.is-playing .twin-play { opacity: 0; pointer-events: none; }
.twin-q { position: absolute; top: .75rem; right: .75rem; z-index: 3; display: inline-flex; gap: 2px; padding: 3px; border-radius: 999px; background: rgba(10,10,11,.55); -webkit-backdrop-filter: blur(8px); backdrop-filter: blur(8px); }
.twin-q button { all: unset; box-sizing: border-box; cursor: pointer; font-size: .72rem; font-weight: 600; letter-spacing: .02em; padding: .3rem .65rem; border-radius: 999px; color: rgba(255,255,255,.72); transition: background .2s, color .2s; }
.twin-q button:hover { color: #fff; }
.twin-q button[aria-pressed="true"] { background: #fff; color: #0A0A0B; }
.twin-q button:focus-visible { outline: 2px solid #fff; outline-offset: 2px; }
.twin-note { display: inline-flex; align-items: center; gap: .55rem; text-align: left; }
.twin-note svg { flex: none; width: 14px; height: 14px; color: var(--rule-strong); }
@media (max-width: 600px) {
  .twin-play .playbig { width: 56px; height: 56px; margin: -28px 0 0 -28px; }
  .twin-play .playbig svg { width: 18px; height: 18px; }
  .twin-play .playbig::after { inset: -7px; }
  .twin-cta { top: calc(50% + 36px); font-size: .85rem; gap: 0; }
  .twin-dur { font-size: .78rem; }
  .twin-q { top: .5rem; right: .5rem; }
  .twin-q button { font-size: .66rem; padding: .25rem .5rem; }
}
@media (prefers-reduced-motion: no-preference) { .twin-dlg[open] { animation: up .45s var(--ease); } .twin-dlg[open]::backdrop { animation: fade .35s ease; } }


/* hero claim, larger */
.hero h1 { font-size: clamp(3.1rem, 8.4vw, 7rem); line-height: 1.1; letter-spacing: -.045em; max-width: 15ch; }
.hero .lead { margin-top: clamp(1.5rem, 3vw, 2.25rem); }
.hero .trio { margin-top: clamp(2rem, 4vw, 2.75rem); }
.hero .cta { margin-top: 1.5rem; }


/* company strip: six equal slots; each name sits where its logo file will go */
.logos-wrap { margin-top: clamp(2.5rem, 5vw, 3.5rem); }
.logos-cap { font-size: .8rem; color: var(--soft); }
.logos { margin: 1rem auto 0; padding: 0; list-style: none; max-width: 900px; display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); gap: 1px; background: var(--rule); border-block: 1px solid var(--rule); }
.logo { background: var(--sbg); display: grid; place-items: center; height: clamp(4.25rem, 7vw, 5.25rem); padding: 0 clamp(.75rem, 2vw, 1.5rem); }
.logo-mark { display: block; max-width: 100%; font-weight: 600; font-size: clamp(.92rem, 1.4vw, 1.05rem); letter-spacing: -.01em; color: var(--soft); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; transition: color .3s; }
.logo:hover .logo-mark { color: var(--ink); }
.logo img { display: block; max-height: 1.75rem; max-width: 100%; width: auto; height: auto; object-fit: contain; filter: grayscale(1); opacity: .7; transition: opacity .3s, filter .3s; }
.logo:hover img { opacity: 1; filter: none; }
@media (max-width: 760px) { .logos { grid-template-columns: repeat(3, minmax(0, 1fr)); } }


/* ===== Hero: the headline forms from a particle swarm; the rest of the hero waits for it ===== */
html.intro-on .hero .a { animation-play-state: paused; }
/* the looping word: a fixed slot so the line never reflows; the word fades as its particles take over */
.swap { display: inline-block; text-align: left; white-space: nowrap; }
.swap .pw { transition: opacity .25s ease; }
.swap.dissolve .pw { opacity: 0; transition-duration: .35s; }
.swap.resolve .pw { opacity: 1; transition-duration: .7s; }
.h1-wrap canvas.swap-cv { position: absolute; display: none; pointer-events: none; z-index: 1; transform: none; }
/* supplied logos: drawn in the text colour so they sit with the names, in both themes */
.logo-svg { line-height: 0; overflow: visible; }
.logo-svg svg { display: block; height: var(--lh, 1.4rem); width: auto; max-width: 100%; }
/* Indegene: brand colours become three greys so the block mark stays legible; hover shows the real colours */

.logo-indegene .ind-1, .logo-indegene .ind-6 { fill: currentColor; }
.logo-indegene .ind-2 { fill: currentColor; opacity: .62; }
.logo-indegene .ind-3 { fill: currentColor; opacity: .34; }
.logo-indegene .ind-4 { fill: none; stroke: currentColor; stroke-miterlimit: 10; }
.logo-indegene .ind-1, .logo-indegene .ind-2, .logo-indegene .ind-3 { transition: fill .35s ease, opacity .35s ease; }
.logo:hover .logo-indegene .ind-1 { fill: #034EA2; }
.logo:hover .logo-indegene .ind-2 { fill: #ED0677; opacity: 1; }
.logo:hover .logo-indegene .ind-3 { fill: #00C0F3; opacity: 1; }
/* Walmart Global Tech: a wide lockup, so it runs a touch shorter; the spark turns green on hover */

.logo-walmart .wm-spark { fill: currentColor; opacity: .55; transition: fill .35s ease, opacity .35s ease; }
.logo:hover .logo-walmart .wm-spark { fill: #08F27B; opacity: 1; }
/* raster logos: a grey silhouette (masked to the text colour) at rest, the original on hover */
.logo-raster { position: relative; display: block; height: var(--lh, 1.4rem); aspect-ratio: var(--ar); max-width: 100%; overflow: visible; }
.logo-raster .lr-mono { position: absolute; inset: 0; background: currentColor; -webkit-mask: var(--lr) center / contain no-repeat; mask: var(--lr) center / contain no-repeat; transition: opacity .35s ease; }
.logo-raster .lr-color { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: contain; opacity: 0; transition: opacity .35s ease; }
.logo:hover .logo-raster .lr-mono { opacity: 0; }
.logo:hover .logo-raster .lr-color { opacity: 1; }
/* Software AG: the gradient S sits in a lighter grey; hover restores its gradient */

.logo-sag .sag-s { fill: currentColor; opacity: .55; transition: opacity .35s ease; }
.logo:hover .logo-sag .sag-s { fill: url(#sag-grad); opacity: 1; }
/* Infosys: single-colour wordmark; hover shows the brand blue */

.logo-infosys .ifs { fill: currentColor; transition: fill .35s ease; }
.logo:hover .logo-infosys .ifs { fill: #007CC3; }
/* hero: one calm screen. Claim, context, action, then proof and companies, with room to breathe */
.hero .logo { padding: 0 .5rem; }
.hero .logo-mark { font-size: clamp(.86rem, 1.1vw, .95rem); text-overflow: clip; font-weight: 500; }
@media (min-width: 761px) {
  .hero { padding-block: clamp(2rem, 6.5vh, 4.75rem) clamp(2.5rem, 6vh, 4.5rem); }
  .hero h1 { font-size: clamp(3rem, min(8.4vw, 12vh), 7rem); }
  .hero .lead { margin-top: clamp(1.25rem, 3vh, 2.25rem); }
  .hero .cta { margin-top: clamp(1.25rem, 3vh, 2rem); }
  .hero .trio { margin-top: clamp(2.25rem, 5.4vh, 4.25rem); background: none; border: 0; gap: clamp(1.5rem, 4vw, 3rem); }
  .hero .trio > div { padding: 0; background: none; }
  .hero .trio { max-width: 1040px; }
  .hero .trio .fig { font-size: clamp(1.15rem, min(2.9vh, 1.85vw), 1.6rem); }
  .hero .logos { max-width: 1040px; }
  .hero .trio .cap { margin-top: .4rem; font-size: .88rem; max-width: none; text-wrap: balance; }
  .hero .logos-wrap { margin-top: clamp(2.5rem, 6.4vh, 4.75rem); }
  .hero .logos { margin-top: 0; background: none; border: 0; gap: 0; }
  .hero .logo { height: auto; padding: .25rem .5rem; background: none; }
}
@media (min-width: 1000px) { .hero .trio .fig { white-space: nowrap; } }
@media (min-width: 1600px) { .hero .trio, .hero .logos { max-width: 1200px; } }
@media (max-width: 999px) { .hero .logos { display: flex; flex-wrap: wrap; justify-content: center; align-items: center; gap: 1.5rem clamp(1.75rem, 6vw, 3rem); max-width: 640px; } .hero .logo { flex: none; height: 2.25rem; padding: 0; display: flex; align-items: center; } }
.hero .lead { max-width: 44rem; text-wrap: pretty; }
@media (min-width: 900px) { .hero .lead { text-wrap: balance; } }
/* the header, its rule and the hero details arrive together with the resolved headline */
.bar { transition: transform .8s var(--ease), opacity .8s var(--ease), background .3s; }
html.intro-on .bar { opacity: 0; transform: translateY(-14px); pointer-events: none; animation: none; }
html.intro-on .twin-fab { visibility: hidden; }
html.intro-on .prog { opacity: 0; }
.prog { transition: opacity .6s ease; }
html.js .hero .a { animation-delay: calc(var(--d, 0) * .3ms); animation-duration: .8s; }
.h1-wrap.swarm canvas { top: -16rem; height: calc(100% + 22rem); }
@media (prefers-reduced-motion: no-preference) {
  html.js .h1-wrap.swarm:not(.pf-off) .pt { opacity: 0; filter: none; transform: none; color: var(--soft); transition: opacity .7s ease, color .9s ease; }
  html.js .h1-wrap.swarm.formed .pt { opacity: 1; }
  html.js .h1-wrap.swarm.inked .pt { color: var(--ink); }
}

/* logo row: equal space between neighbours, all six on one optical centre line */
/* one height for every logo; widths follow each logo's own proportions */
.logos { --lh: 1.4rem; }
@media (max-width: 760px) { .logos { --lh: 1rem; } .hero .logos { column-gap: clamp(1rem, 4.5vw, 1.75rem); row-gap: 1.25rem; } }
@media (max-width: 760px) { .hero .logos { background: none; border: 0; gap: 1.4rem .75rem; margin-top: .5rem; } .hero .logo { background: none; height: 2.25rem; padding: 0 .25rem; } }
@media (min-width: 1000px) {
  .hero .logos { display: flex; flex-wrap: nowrap; justify-content: center; align-items: center; gap: clamp(3rem, 5.8vw, 5.5rem); }
  .hero .logo { padding: 0; height: 2rem; display: flex; align-items: center; justify-content: center; flex: none; }
  .hero .logo .logo-mark { max-width: none; }
}

@media (max-width: 960px) {
  .path { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .cards.n4 { --n: 2; }
  .wtabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .lrail { grid-template-columns: repeat(5, minmax(0, 1fr)); }
}
@media (max-width: 480px) { .path { grid-template-columns: repeat(2, minmax(0, 1fr)); } .id-role { display: none; } .lrail { grid-template-columns: repeat(2, minmax(0, 1fr)); } .lt.elevate { grid-column: 1 / -1; } }
@media (max-width: 760px) {
  .nav-links { display: none; }
  .stats, .trio, .cols3, .duo, .stories, .pattern-cols, .voices, .about-grid, .lp, .two, .fw, .i1 { grid-template-columns: minmax(0, 1fr); }
  .cards, .cards.n2, .cards.n4 { grid-template-columns: minmax(0, 1fr); }
  .lrail { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .lp .proof { border-left: 0; padding-left: 0; border-top: 1px solid var(--rule); padding-top: 1rem; }
  .flow { flex-direction: column; align-items: center; gap: 1.8rem; }
  .bd .flow { align-items: stretch; }
  .node { flex: none; width: 100%; max-width: 360px; }
  .bd .node { max-width: none; }
  .node:not(:last-child)::after { content: "↓"; right: auto; left: 50%; top: auto; bottom: -1.55rem; transform: translateX(-50%); }
  .bd { padding-left: .2rem; }
  .fig-cols { font-size: .72rem; }
  .stage-labels { font-size: .66rem; letter-spacing: .06em; }
  .forces, .fw .mini { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  .hero .trio { gap: 1.5rem; }
}
@media (max-width: 420px) { .lrail { grid-template-columns: repeat(2, minmax(0, 1fr)); } .forces, .fw .mini { grid-template-columns: minmax(0, 1fr); } }

/* Mobile: keep section navigation reachable in the sticky header */
@media (max-width: 760px) {
  .bar-in { flex-wrap: wrap; column-gap: .75rem; row-gap: 0; padding-block: .6rem 0; }
  .bar .nav { display: contents; }
  .bar .nav-links { display: flex; order: 9; flex: 1 0 100%; gap: 0; margin-top: .55rem; border-top: 1px solid var(--rule); font-size: .875rem; }
  .bar .nav-links a { flex: 1; text-align: center; padding: .62rem 0 .66rem; }
  .bar .nav-links a::after { left: 22%; right: 22%; bottom: 0; }
  .bar .btn { padding: .55rem 1rem; font-size: .875rem; }
  section[id] { scroll-margin-top: 7.25rem; }
}
@media (max-width: 480px) {
  .bar-in { column-gap: .5rem; }
  .bar .id-name { font-size: .975rem; white-space: nowrap; }
  .bar .btn { padding: .5rem .85rem; font-size: .8125rem; }
}
@media (max-width: 370px) { .bar .id-name { font-size: .9rem; } .bar .btn { padding: .48rem .7rem; } }
html.intro-on.bar-early .bar { opacity: 1; transform: none; pointer-events: auto; }

/* Quiet CTAs: one filled button per view at most */
.nav-cta { position: relative; display: inline-flex; align-items: center; gap: .35rem; color: var(--ink); font-weight: 600; text-decoration: none; white-space: nowrap; padding: .2rem 0 .2rem clamp(.9rem, 1.8vw, 1.5rem); border-left: 1px solid var(--rule-strong); line-height: 1.2; }
.nav-cta .ar, .lnk .ar { display: inline-block; transition: transform .35s var(--ease); }
.nav-cta::after { content: ""; position: absolute; left: clamp(.9rem, 1.8vw, 1.5rem); right: 0; bottom: -.1rem; height: 1px; background: var(--ink); transform: scaleX(0); transform-origin: left; transition: transform .35s var(--ease); }
.nav-cta:hover::after, .nav-cta:focus-visible::after { transform: scaleX(1); }
.nav-cta:hover .ar { transform: translateX(3px); }
.lnk { display: inline-flex; align-items: center; gap: .4rem; color: var(--ink); font-weight: 600; font-size: 1rem; text-decoration: none; padding-bottom: .3rem; border-bottom: 1px solid var(--rule-strong); transition: border-color .3s; }
.lnk:hover { border-color: var(--ink); }
.lnk:hover .ar.dn { transform: translateY(3px); }
@media (max-width: 760px) { .nav-cta { font-size: .875rem; border-left: 0; padding-left: 0; } .nav-cta::after { left: 0; } }
/* No underline on CTA hover; arrow nudge + opacity carry the feedback */
.nav-cta::after { display: none; }
.nav-cta, .lnk { transition: opacity .25s, border-color .3s; }
.nav-cta:hover { opacity: .7; }
.lnk:hover { border-color: transparent; opacity: .7; }

/* Theme toggle lives at the far right edge, as a utility after the CTA */
.bar .nav { gap: clamp(1.25rem, 3vw, 2.5rem); }
@media (max-width: 760px) {
  .bar .nav-cta { margin-left: auto; }
}
@media (max-width: 340px) { .bar .nav-cta { margin-left: auto; } }

/* Theme switch in the footer */
.foot-in { display: flex; align-items: center; justify-content: space-between; gap: 1rem 2rem; flex-wrap: wrap; text-align: left; }
@media (max-width: 760px) { .foot-in { justify-content: center; text-align: center; flex-direction: column; } }
html.js .twin-fab.on.at-foot { opacity: 0; transform: translateY(14px); pointer-events: none; }
/* Short desktop screens: keep the logos inside the first view */
@media (min-width: 761px) and (max-height: 780px) {
  .hero .trio { margin-top: clamp(1.6rem, 4.4vh, 2.25rem); }
  .hero .logos-wrap { margin-top: clamp(1.75rem, 5vh, 2.5rem); }
  .hero .cta { margin-top: clamp(1rem, 2.4vh, 1.5rem); }
}
@media (min-width: 761px) and (max-height: 740px) { .hero h1 { font-size: clamp(3rem, min(8.4vw, 11.2vh), 7rem); } }
@media (max-width: 760px) { .hero .trio { gap: 1px; } .hero .trio > div { padding-block: 1.2rem; } }

/* Converging forces → one system */
.sys .cv-l { stroke: var(--rule-strong); stroke-width: 1; fill: none; }
.sys .cv-f { fill: var(--ink); }
.sys .cv-ft { font: 600 11.5px var(--sans); letter-spacing: .12em; fill: var(--soft); stroke: none; }
.sys .cv-ring { fill: var(--panel); stroke: var(--ink); stroke-width: 1.25; }
.sys .cv-core { fill: color-mix(in srgb, var(--accent) 9%, var(--panel)); stroke: var(--accent); stroke-width: 1.1; stroke-dasharray: 3 4; }
.sys .cv-st { font: 700 12.5px var(--sans); letter-spacing: .16em; fill: var(--accent); stroke: none; }
.sys .cv-halo { fill: none; stroke: var(--accent); stroke-width: 1.2; opacity: 0; }
.sys .cv-p { fill: var(--accent); }
@media (prefers-reduced-motion: no-preference) {
  .sys .cv-halo { transform-box: fill-box; transform-origin: center; animation: cvHalo 3.6s cubic-bezier(.2,.6,.3,1) infinite; }
  .sys .cv-halo.h2 { animation-delay: 1.8s; }
  .sys .cv-core { transform-box: fill-box; transform-origin: center; animation: cvSpin 48s linear infinite; }
  .sys .cv-ring { transform-box: fill-box; transform-origin: center; animation: cvBreath 3.6s ease-in-out infinite; }
  .sys.pre .cv-l { stroke-dasharray: 320; stroke-dashoffset: 320; }
  .sys.pre.in .cv-l { stroke-dashoffset: 0; transition: stroke-dashoffset 1.4s var(--ease); transition-delay: calc(.3s + var(--k, 0) * .15s); }
}
@keyframes cvHalo { 0% { transform: scale(1); opacity: .55; } 100% { transform: scale(1.42); opacity: 0; } }
@keyframes cvSpin { to { transform: rotate(360deg); } }
@keyframes cvBreath { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
.sys-panel svg#system { max-width: 440px; }
.sys .cv-ft { font-size: 14px; letter-spacing: .1em; }
.sys .cv-st { font-size: 15px; }
.sys .cv-f { r: 7px; }
.sys .cv-p { r: 3.2px; }
.sys .cv-l { stroke-width: 1.2; }
.sys-panel svg#system { overflow: visible; } @media (min-width: 761px) { .sys-panel { padding: clamp(2rem, 3.4vw, 3rem) clamp(1rem, 2vw, 1.75rem); } }
@media (max-width: 760px) { .sys-panel { padding: 1.75rem 1.25rem 2.75rem; } }

.sys .cv-g { font: 400 13px var(--sans); fill: var(--soft); stroke: none; letter-spacing: 0; }
.sys .cv-ft { fill: var(--ink); }
@media (max-width: 760px) { .sys .cv-g { font-size: 16px; } .sys .cv-ft { font-size: 15.5px; } }
@media (min-width: 761px) { .sys .cv-g { font-size: 15px; } .sys .cv-ft { font-size: 14.5px; } }

/* Section marker: label left, progress counter right, on one hairline */
.grp { justify-content: space-between; gap: 1rem; width: 100%; padding-bottom: .85rem; border-bottom: 1px solid var(--rule-strong); margin: 0 0 clamp(2.75rem, 6vw, 4rem); text-transform: none; letter-spacing: 0; font-size: .9375rem; }
.grp::before, .grp::after { display: none; }
.grp-t { font-weight: 600; color: var(--ink); letter-spacing: -.005em; }
.grp-n { font-weight: 500; color: var(--soft); font-variant-numeric: tabular-nums; letter-spacing: .02em; }
.grp-n b { font-weight: 600; color: var(--ink); }

/* Floating section navigator */
.secnav { position: fixed; left: 50%; bottom: calc(clamp(16px, 3vw, 28px) + env(safe-area-inset-bottom, 0px)); z-index: 24; transform: translate(-50%, 16px); opacity: 0; pointer-events: none; transition: opacity .35s var(--ease), transform .45s var(--ease); display: flex; flex-direction: column; align-items: center; }
.secnav.on { opacity: 1; transform: translate(-50%, 0); pointer-events: auto; }
.sn-pill { display: inline-flex; align-items: center; gap: .55rem; height: 42px; padding: 0 1rem 0 1.1rem; border-radius: 999px; border: 1px solid var(--rule); background: color-mix(in srgb, var(--panel) 86%, transparent); -webkit-backdrop-filter: blur(14px) saturate(1.4); backdrop-filter: blur(14px) saturate(1.4); box-shadow: 0 10px 30px -14px rgba(0,0,0,.28), 0 1px 2px rgba(0,0,0,.05); color: var(--ink); font: 500 .875rem/1 var(--sans); cursor: pointer; white-space: nowrap; transition: border-color .25s, box-shadow .25s; }
.sn-pill:hover { border-color: var(--rule-strong); }
.sn-pill:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.sn-c { color: var(--soft); font-variant-numeric: tabular-nums; letter-spacing: .02em; }
.sn-c b { color: var(--ink); font-weight: 600; }
.sn-sep { color: var(--rule-strong); }
.sn-t { font-weight: 600; max-width: 13.5rem; overflow: hidden; text-overflow: ellipsis; }
.sn-chev { width: 12px; height: 12px; color: var(--soft); transition: transform .3s var(--ease); }
.secnav.open .sn-chev { transform: rotate(180deg); }
.sn-panel { position: absolute; bottom: calc(100% + 10px); left: 50%; width: max(100%, 260px); transform: translate(-50%, 8px) scale(.98); transform-origin: 50% 100%; opacity: 0; transition: opacity .2s var(--ease), transform .25s var(--ease); border-radius: 18px; border: 1px solid var(--rule); background: color-mix(in srgb, var(--panel) 92%, transparent); -webkit-backdrop-filter: blur(16px) saturate(1.4); backdrop-filter: blur(16px) saturate(1.4); box-shadow: 0 24px 50px -20px rgba(0,0,0,.35); padding: .4rem; }
.secnav.open .sn-panel { opacity: 1; transform: translate(-50%, 0) scale(1); }
.sn-list { list-style: none; margin: 0; padding: 0; }
.sn-list a { display: flex; align-items: center; gap: .85rem; padding: .62rem .8rem; border-radius: 11px; text-decoration: none; color: var(--soft); font-size: .9rem; transition: background .2s, color .2s; }
.sn-list a:hover, .sn-list a:focus-visible { background: color-mix(in srgb, var(--ink) 5%, transparent); color: var(--ink); outline: none; }
.sn-n { font-variant-numeric: tabular-nums; font-size: .78rem; letter-spacing: .04em; color: var(--soft); min-width: 1.4em; }
.sn-list a[aria-current] { color: var(--ink); font-weight: 600; }
.sn-list a[aria-current]::after { content: ""; margin-left: auto; width: 6px; height: 6px; border-radius: 50%; background: var(--accent); }
@media (max-width: 560px) { .sn-pill { height: 40px; font-size: .8125rem; padding: 0 .85rem 0 .95rem; } .sn-t { max-width: 9.5rem; } }
@media (prefers-reduced-motion: reduce) { .secnav, .sn-panel, .sn-chev { transition: none; } }
.sn-pill { background: color-mix(in srgb, var(--panel) 97%, transparent); -webkit-backdrop-filter: blur(20px) saturate(1.5); backdrop-filter: blur(20px) saturate(1.5); } .sn-panel { background: color-mix(in srgb, var(--panel) 98%, transparent); -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px); }
/* Navigator sits in the bottom-left corner, mirroring the twin button, so it stays clear of the reading column */
.secnav { left: clamp(16px, 3vw, 32px); align-items: flex-start; transform: translateY(16px); }
.secnav.on { transform: none; }
.sn-panel { left: 0; transform: translateY(8px) scale(.98); transform-origin: 0 100%; }
.secnav.open .sn-panel { transform: none; }
/* Compact at rest: just the count; the section name slides out on hover or when open */
.sn-pill { gap: 0; }
.sn-sep, .sn-t { display: inline-block; max-width: 0; opacity: 0; overflow: hidden; vertical-align: middle; transition: max-width .4s var(--ease), opacity .25s var(--ease), margin .4s var(--ease); }
.sn-chev { margin-left: .5rem; }
.sn-pill:hover .sn-sep, .sn-pill:focus-visible .sn-sep, .secnav.open .sn-sep { max-width: 1rem; opacity: 1; margin-left: .55rem; }
.sn-pill:hover .sn-t, .sn-pill:focus-visible .sn-t, .secnav.open .sn-t { max-width: 13.5rem; opacity: 1; margin-left: .55rem; }
@media (hover: none) { .sn-pill .sn-sep, .sn-pill .sn-t { max-width: 0; opacity: 0; margin-left: 0; } .secnav.open .sn-sep { max-width: 1rem; opacity: 1; margin-left: .55rem; } .secnav.open .sn-t { max-width: 9.5rem; opacity: 1; margin-left: .55rem; } }

/* A: pinned chapter switcher */
.chbar-wrap { position: sticky; top: calc(var(--barh, 72px) + 10px); z-index: 15; height: 0; display: flex; justify-content: center; }
.chbar { display: inline-flex; gap: 3px; padding: 4px; border-radius: 999px; border: 1px solid var(--rule); background: color-mix(in srgb, var(--panel) 96%, transparent); -webkit-backdrop-filter: blur(18px) saturate(1.4); backdrop-filter: blur(18px) saturate(1.4); box-shadow: 0 12px 30px -16px rgba(0,0,0,.3); opacity: 0; transform: translateY(-8px); pointer-events: none; transition: opacity .3s var(--ease), transform .4s var(--ease); height: max-content; }
.chbar.on { opacity: 1; transform: none; pointer-events: auto; }
.chb { all: unset; box-sizing: border-box; cursor: pointer; display: inline-flex; align-items: center; gap: .5rem; padding: .5rem 1rem; border-radius: 999px; font-size: .875rem; font-weight: 600; color: var(--soft); white-space: nowrap; transition: background .25s, color .25s; }
.chb:hover { color: var(--ink); }
.chb:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.chb .chn { font-size: .72rem; font-weight: 600; font-variant-numeric: tabular-nums; opacity: .7; }
.chb[aria-pressed="true"] { background: var(--ink); color: var(--ground); }
.tabpanel { scroll-margin-top: calc(var(--barh, 72px) + 80px); }
/* B: next-chapter endings */
.chnext { position: relative; display: block; margin: clamp(3rem, 7vw, 5rem) 0 0; padding: clamp(1.4rem, 3vw, 2rem) clamp(1.4rem, 3vw, 2.2rem); padding-right: 4.5rem; border-radius: 20px; border: 1px solid var(--rule); background: var(--panel); text-decoration: none; color: var(--ink); text-align: left; transition: border-color .25s, transform .3s var(--ease); }
.chnext:hover { border-color: var(--ink); transform: translateY(-2px); }
.chnext:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.chx-k { display: block; font-size: .8rem; font-weight: 600; color: var(--soft); letter-spacing: .01em; }
.chx-t { display: block; margin-top: .35rem; font-size: clamp(1.4rem, 2.6vw, 2rem); font-weight: 600; letter-spacing: -.02em; line-height: 1.15; }
.chx-d { display: block; margin-top: .3rem; color: var(--soft); }
.chx-ar { position: absolute; right: clamp(1.4rem, 3vw, 2.2rem); top: 50%; transform: translateY(-50%); font-size: 1.5rem; transition: transform .35s var(--ease); }
.chnext:hover .chx-ar { transform: translate(4px, -50%); }
.chend { margin-top: clamp(3rem, 7vw, 5rem); }
.chend .chnext { margin-top: .9rem; }
.chback { display: inline-flex; gap: .4rem; font-size: .9rem; font-weight: 600; color: var(--soft); text-decoration: none; }
.chback:hover { color: var(--ink); }
@media (max-width: 560px) { .chb { padding: .45rem .8rem; font-size: .8125rem; } }
.tabpanel > .chnext, .chend { max-width: 860px; margin-left: auto; margin-right: auto; }

/* Chapters as one segmented control (same as the pinned switcher) */
.wtabs.two-t { display: flex; width: max-content; max-width: 100%; margin: 2.5rem auto 0; gap: 3px; padding: 4px; border-radius: 999px; border: 1px solid var(--rule); background: var(--panel); }
.two-t .wtab, .two-t .wtab[aria-selected="true"] { display: inline-flex; align-items: center; gap: .55rem; padding: .7rem 1.35rem; border: 0; border-radius: 999px; background: transparent; color: var(--soft); transform: none; transition: background .3s var(--ease), color .25s; }
.two-t .wtab:hover { color: var(--ink); transform: none; border: 0; }
.two-t .wtab .n { display: inline; margin: 0; font-size: .78rem; font-weight: 600; color: inherit; opacity: .7; font-variant-numeric: tabular-nums; }
.two-t .wtab b { display: inline; margin: 0; font-size: 1rem; font-weight: 600; letter-spacing: -.01em; }
.two-t .wtab .d { display: none; }
.two-t .wtab[aria-selected="true"] { background: var(--ink); color: var(--ground); }
.two-t .wtab[aria-selected="true"] .n { color: inherit; opacity: .7; }
.two-t .wtab:focus-visible { outline-offset: 3px; }
.chdesc { margin: .9rem 0 0; text-align: center; color: var(--soft); font-size: .95rem; }
@media (max-width: 420px) { .two-t .wtab, .two-t .wtab[aria-selected="true"] { padding: .62rem 1.05rem; } .two-t .wtab b { font-size: .95rem; } }

/* Product screen in the flagship case */
.prodshot { margin: 0; border-radius: clamp(12px, 1.6vw, 20px); overflow: hidden; background: #fff; border: 1px solid var(--rule); box-shadow: 0 30px 70px -40px rgba(10,10,20,.35), 0 2px 6px rgba(10,10,20,.04); }
.prodshot img { display: block; width: 100%; height: auto; }

/* Interaction model as an era line: Then, Then, Now */
.eras { position: relative; list-style: none; margin: 1.6rem auto 0; padding: 0; max-width: 900px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); text-align: center; --dy: 2.15rem; }
.eras::before, .eras::after { content: ""; position: absolute; top: calc(var(--dy) + 5px); height: 1.5px; }
.eras::before { left: calc(100% / 6); right: calc(100% / 6); background: var(--rule-strong); }
.eras::after { left: 50%; right: calc(100% / 6); background: linear-gradient(90deg, var(--rule-strong), var(--accent)); }
.era { position: relative; display: flex; flex-direction: column; align-items: center; padding: 0 .75rem; color: var(--soft); }
.era-k { font-size: .72rem; font-weight: 600; letter-spacing: .14em; text-transform: uppercase; height: 1.4rem; line-height: 1.4rem; margin-bottom: calc(var(--dy) - 1.4rem); }
.era-dot { position: relative; z-index: 1; width: 11px; height: 11px; box-sizing: border-box; border-radius: 50%; border: 1.5px solid var(--rule-strong); background: var(--ground); }
.s.g .era-dot { background: var(--tint, var(--ground)); }
.era b { margin-top: 1.1rem; font-size: clamp(1.15rem, 2vw, 1.4rem); font-weight: 600; letter-spacing: -.015em; color: inherit; }
.era-d { margin-top: .3rem; font-size: .95rem; line-height: 1.45; }
.era.now { color: var(--ink); }
.era.now .era-k { color: var(--accent); }
.era.now .era-dot { width: 15px; height: 15px; margin-top: -2px; margin-bottom: -2px; border: 0; background: var(--accent); box-shadow: 0 0 0 5px color-mix(in srgb, var(--accent) 16%, transparent); }
.s.g .era.now .era-dot { background: var(--accent); }
.era.now .era-d { color: var(--soft); }
.era-tag { margin-top: .75rem; font-size: .75rem; font-weight: 600; color: var(--accent); padding: .28rem .65rem; border-radius: 999px; background: color-mix(in srgb, var(--accent) 10%, transparent); }
@media (max-width: 560px) { .era { padding: 0 .3rem; } .era b { font-size: 1.02rem; } .era-d { font-size: .82rem; } .era-tag { font-size: .68rem; padding: .25rem .5rem; } }
.era-tag { white-space: nowrap; }

.eras { margin-top: clamp(2.5rem, 5vw, 3.5rem); }
.era-take { max-width: 34ch; margin: clamp(2rem, 4vw, 2.75rem) auto 0; text-align: center; color: var(--ink); font-size: clamp(1.15rem, 1.9vw, 1.4rem); font-weight: 500; line-height: 1.45; letter-spacing: -.01em; text-wrap: balance; }
.era-take { max-width: 40ch; } @media (min-width: 561px) { .era-take span { display: block; } }
.era-tag { font-variant-numeric: tabular-nums; letter-spacing: .02em; padding: .26rem .7rem; }

/* Flows restyled as a dot line, consistent with the era line */
.flow, .bd .flow { --n: 3; position: relative; display: grid; grid-auto-flow: column; grid-auto-columns: minmax(0, 1fr); gap: 0; max-width: 900px; margin: 2rem auto 0; justify-content: stretch; align-items: start; flex-direction: unset; }
.flow:has(> .node:nth-child(4)) { --n: 4; }
.flow:has(> .node:nth-child(2):last-child) { --n: 2; }
.flow::before { content: ""; position: absolute; top: 5px; left: calc(100% / (2 * var(--n))); right: calc(100% / (2 * var(--n))); height: 1.5px; background: var(--rule-strong); }
.flow > .node, .bd .flow > .node { position: relative; flex: none; width: auto; max-width: none; background: none; border: 0; border-radius: 0; padding: 1.75rem .7rem 0; text-align: center; color: var(--soft); }
.flow > .node::after, .flow > .node:not(:last-child)::after { content: none; display: none; }
.flow > .node::before { content: ""; position: absolute; top: 0; left: 50%; transform: translateX(-50%); z-index: 1; width: 11px; height: 11px; box-sizing: border-box; border-radius: 50%; border: 1.5px solid var(--rule-strong); background: var(--ground); }
.s.g .flow > .node::before { background: var(--tint, var(--ground)); }
.flow > .node .t { font-size: 1rem; font-weight: 600; line-height: 1.3; color: inherit; }
.flow > .node .d, .flow > .node ul { font-size: .9rem; line-height: 1.45; color: var(--soft); }
.flow > .node ul { list-style: none; padding: 0; justify-items: center; }
.flow > .node .d b { color: inherit; }
.flow > .node.hot { color: var(--ink); border: 0; }
.flow > .node.hot .d b { color: var(--ink); }
.flow > .node.hot::before, .s.g .flow > .node.hot::before { top: -2px; width: 15px; height: 15px; border: 0; background: var(--accent); box-shadow: 0 0 0 5px color-mix(in srgb, var(--accent) 16%, transparent); }
@media (max-width: 560px) { .flow > .node, .bd .flow > .node { padding: 1.6rem .3rem 0; } .flow > .node .t { font-size: .9rem; } .flow > .node .d, .flow > .node ul { font-size: .8rem; } }
.bd .flow { margin: 1.75rem auto 2rem; }

/* Dependency chains: actors/systems as pills joined by arrows */
.flow.chain, .bd .flow.chain { display: flex; flex-wrap: nowrap; justify-content: center; align-items: flex-start; gap: 0 2.6rem; max-width: 980px; margin: 1.75rem auto 0; }
.bd .flow.chain { margin: 1.5rem auto 2rem; }
.flow.chain::before { content: none; display: none; }
.flow.chain > .node, .bd .flow.chain > .node { flex: 0 1 auto; display: flex; flex-direction: column; align-items: center; padding: 0; text-align: center; color: var(--ink); min-width: 0; }
.flow.chain > .node::before, .s.g .flow.chain > .node::before, .flow.chain > .node.hot::before { content: none; display: none; }
.flow.chain > .node .t { display: inline-block; padding: .62rem 1.15rem; border-radius: 999px; border: 1px solid var(--rule-strong); background: var(--panel); font-size: .95rem; font-weight: 600; line-height: 1.3; color: var(--ink); }
.flow.chain > .node:not(:last-child)::after { content: "→"; display: block; position: absolute; right: -1.85rem; left: auto; top: 1.3rem; bottom: auto; transform: translateY(-50%); color: var(--soft); font-size: 1rem; }
.flow.chain > .node.hot .t { border: 1.5px solid var(--accent); background: color-mix(in srgb, var(--accent) 8%, var(--panel)); }
.nt { margin-top: .5rem; font-size: .66rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--accent); }
.flow.chain > .node ul { margin-top: .6rem; }
@media (max-width: 760px) {
  .flow.chain, .bd .flow.chain { flex-direction: column; align-items: center; gap: 1.9rem 0; }
  .flow.chain > .node:not(:last-child)::after { content: "↓"; right: auto; left: 50%; top: auto; bottom: -1.55rem; transform: translateX(-50%); }
  .flow.chain > .node.hot:not(:last-child)::after { bottom: -1.65rem; }
}
/* Chains read as diagrams, not buttons: plain labels, the dependency framed by a dashed outline */
.flow.chain, .bd .flow.chain { gap: 0 2.4rem; align-items: flex-start; }
.flow.chain > .node .t { padding: .55rem .15rem; border: 0; border-radius: 0; background: none; font-weight: 500; font-size: 1rem; color: var(--ink); }
.flow.chain > .node.hot .t { padding: .55rem 1rem; border: 1.5px dashed var(--accent); border-radius: 10px; background: color-mix(in srgb, var(--accent) 6%, transparent); font-weight: 600; }
.flow.chain > .node:not(:last-child)::after { top: 1.35rem; color: var(--rule-strong); font-size: 1.1rem; }
@media (max-width: 760px) {
  .flow.chain, .bd .flow.chain { flex-direction: column; align-items: center; gap: 2rem 0; }
  .flow.chain > .node:not(:last-child)::after { top: auto; bottom: -1.7rem; }
  .flow.chain > .node.hot:not(:last-child)::after { bottom: -1.75rem; }
}

/* Calmer before/after block: fewer weights, more air */
.seg { margin-top: clamp(2.5rem, 5vw, 3.5rem); }
.bflow .flow.chain { margin-top: 2.25rem; }
.flow.chain > .node .t { font-size: .95rem; color: var(--soft); }
.flow.chain > .node.hot .t { padding: .45rem .85rem; color: var(--ink); border-width: 1.25px; }
.bcap { margin-top: 1.5rem; min-height: 1.6em; font-size: 1rem; font-weight: 500; letter-spacing: 0; color: var(--soft); }
.quote { margin-top: clamp(4rem, 8vw, 5.5rem); max-width: 32rem; font-size: clamp(1.05rem, 1.7vw, 1.25rem); font-weight: 500; }

/* Customer voice: the strongest proof in the case */
.voice { margin: clamp(4.5rem, 9vw, 7rem) auto clamp(4rem, 8vw, 6rem); max-width: 46rem; text-align: center; }
.voice-mark { display: block; height: .55em; font-family: Georgia, "Times New Roman", serif; font-size: clamp(4.5rem, 8vw, 6.5rem); line-height: 1; color: var(--accent); opacity: .55; }
.voice blockquote { margin: 0; }
.voice p { margin: 0; font-size: clamp(1.5rem, 3vw, 2.35rem); font-weight: 400; line-height: 1.3; letter-spacing: -.02em; color: var(--soft); text-wrap: balance; }
.voice em { font-style: normal; font-weight: 500; color: var(--ink); }
.voice figcaption { margin-top: 1.4rem; font-size: .85rem; font-weight: 500; letter-spacing: .02em; color: var(--soft); }
.voice figcaption::before { content: ""; display: block; width: 28px; height: 1.5px; margin: 0 auto .9rem; background: var(--rule-strong); }
.bflow .flow.chain, .bflow .flow.chain.fa, .bflow .flow.chain.fb { margin-top: clamp(3rem, 5.5vw, 4rem); }
.leave { background: var(--panel); color: var(--ink); border: 1px solid var(--rule); --soft: #5E5E69; --accent: #5B2FD8; }
/* Open accordion row: purple number and label only */ .beat-row[open] .bn { color: var(--accent); } .beat-row[open] .bl { color: color-mix(in srgb, var(--accent) 70%, var(--soft)); }

/* Technology + expert, as an equation */
.eqn { margin: 1.6rem 0 .4rem; max-width: 640px; }
.eq-terms { display: grid; grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr); align-items: center; column-gap: clamp(1.25rem, 4vw, 2.75rem); }
.eq-t h4 { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; color: var(--soft); }
.eq-t ul { margin-top: .7rem; }
.eq-t li { margin-top: .3rem; font-size: 1.02rem; font-weight: 500; color: var(--soft); }
.eq-t.hot h4 { color: var(--accent); }
.eq-t.hot li { color: var(--ink); font-weight: 600; }
.eq-op { font-size: clamp(1.8rem, 3.4vw, 2.4rem); font-weight: 300; line-height: 1; color: var(--rule-strong); padding-top: 1.2rem; }
.eq-sum { margin-top: 1.5rem; padding-top: 1.1rem; border-top: 1px solid var(--rule-strong); font-size: 1.02rem; line-height: 1.5; }
.eq-sum span { display: block; color: var(--soft); }
.eq-sum span + span { color: var(--ink); font-weight: 600; }
.eq-terms { align-items: start; } .eq-op { align-self: center; padding-top: 1.6rem; }

/* Technology vs expert: split, no boxes */
.split2 { margin: 1.6rem 0 .4rem; max-width: 640px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); }
.s2-col { padding-right: clamp(1.25rem, 4vw, 2.5rem); }
.s2-col + .s2-col { padding-right: 0; padding-left: clamp(1.25rem, 4vw, 2.5rem); border-left: 1px solid var(--rule-strong); }
.s2-col h4 { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; color: var(--soft); }
.s2-col ul { margin-top: .7rem; }
.s2-col li { margin-top: .3rem; font-size: 1.02rem; font-weight: 500; color: var(--soft); }
.s2-col.hot h4 { color: var(--accent); }
.s2-col.hot li { color: var(--ink); font-weight: 600; }

/* Technology vs expert: two inline lists */
.inl { margin: 1.6rem 0 .4rem; max-width: 640px; }
.inl-row + .inl-row { margin-top: 1.4rem; }
.inl-row h4 { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; color: var(--soft); }
.inl-row p { margin: .45rem 0 0; font-size: 1.05rem; line-height: 1.6; font-weight: 500; color: var(--soft); max-width: none; }
.inl-row i { font-style: normal; color: var(--rule-strong); margin: 0 .3rem; }
.inl-row.hot h4 { color: var(--accent); }
.inl-row.hot p { color: var(--ink); font-weight: 600; }

/* Mandate facts: mini stat row */
.mstat { margin: 1.5rem 0 .25rem; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); max-width: 640px; }
.mstat > div { padding: 0 clamp(.9rem, 2.5vw, 1.6rem); border-left: 1px solid var(--rule-strong); }
.mstat > div:first-child { padding-left: 0; border-left: 0; }
.mstat dt { font-size: clamp(1.35rem, 2.4vw, 1.75rem); font-weight: 600; letter-spacing: -.03em; line-height: 1.1; color: var(--ink); white-space: nowrap; }
.mstat dd { margin: .4rem 0 0; font-size: .86rem; line-height: 1.4; color: var(--soft); }
.mstat { margin-bottom: .6rem; } @media (max-width: 560px) { .mstat > div { padding: 0 .75rem; } .mstat > div:first-child { padding-left: 0; } .mstat dt { font-size: 1.15rem; } .mstat dd { font-size: .8rem; } }
.bd .pull.two { max-width: none; } @media (min-width: 761px) { .bd .pull.two span { white-space: nowrap; } }
@media (min-width: 761px) { .bd .pull.two { font-size: clamp(1rem, 2vw, 1.4rem); } }
.bd .pull.two { display: block; }
.bd .pull.two { display: block; }
/* Two-part pull lines: one line per part on desktop */ .bd .pull:has(> span) { display: block; max-width: none; } @media (min-width: 761px) { .bd .pull:has(> span) { font-size: clamp(1rem, 1.9vw, 1.4rem); } .bd .pull:has(> span) > span { white-space: nowrap; } }

/* What I observed: one calm inline list */
.bd .obs { margin-top: .55rem; max-width: 46rem; font-size: 1.05rem; line-height: 1.75; font-weight: 500; color: var(--ink); }
.bd .obs i { font-style: normal; color: var(--rule-strong); margin: 0 .35rem; }
.bd .obs span { white-space: nowrap; } .bd .obs i { margin: 0 .1rem 0 .55rem; }

/* What I observed: grouped by stage of the expert's working cycle */
.stages3 { margin: .9rem 0 .4rem; max-width: 760px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); }
.s3 { padding: 0 clamp(.9rem, 2.6vw, 1.75rem); border-left: 1px solid var(--rule-strong); }
.s3:first-child { padding-left: 0; border-left: 0; }
.s3 h4 { font-size: .72rem; letter-spacing: .12em; text-transform: uppercase; font-weight: 600; color: var(--soft); }
.s3 ul { margin-top: .65rem; }
.s3 li { margin-top: .3rem; font-size: 1.02rem; font-weight: 500; color: var(--ink); line-height: 1.35; }
@media (max-width: 560px) { .s3 { padding: 0 .7rem; } .s3 h4 { font-size: .64rem; letter-spacing: .08em; } .s3 li { font-size: .9rem; } }

/* What I observed: two-column numbered list */
.nlist { list-style: none; margin: .8rem 0 .4rem; padding: 0; max-width: 640px; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); grid-template-rows: repeat(4, auto); grid-auto-flow: column; column-gap: clamp(1.5rem, 5vw, 3rem); }
.nlist li { display: flex; align-items: baseline; gap: .85rem; padding: .55rem 0; border-top: 1px solid var(--rule); font-size: 1.02rem; font-weight: 500; color: var(--ink); line-height: 1.35; }
.nl-n { font-size: .74rem; font-weight: 600; letter-spacing: .04em; color: var(--soft); font-variant-numeric: tabular-nums; min-width: 1.4rem; }
@media (max-width: 560px) { .nlist { column-gap: 1rem; } .nlist li { font-size: .92rem; gap: .55rem; } }

/* Variation -> Abstraction -> Structure as one continuous flow */
.vas-fig { background: none; border: 0; padding: 0; max-width: 820px; margin-top: 1.6rem; }
.vas .vs-t { fill: none; stroke: var(--soft); stroke-width: 1.4; opacity: .55; }
.vas .vs-s { fill: none; stroke: var(--ink); stroke-width: 1.5; stroke-linecap: round; opacity: calc(.25 + .75 * var(--vs, 1)); }
.vas .vs-lens { fill: color-mix(in srgb, var(--accent) 7%, transparent); stroke: var(--accent); stroke-width: 1.25; }
.vas .vs-head { fill: none; stroke: var(--accent); stroke-width: 1.25; }
.vas .vs-box { fill: none; stroke: var(--rule-strong); stroke-width: 1.25; }
.vas .vs-head, .vas .vs-box { opacity: calc(.2 + .8 * var(--vs, 1)); }
.vas-fig .fig-cols { margin-top: .9rem; grid-template-columns: 46.4% 25.7% minmax(0, 1fr); gap: 0; font-size: .86rem; }
.vas-fig .fig-cols > div:nth-child(2) { text-align: center; }
.vas-fig .fig-cols > div:nth-child(3) { padding-left: 2%; }
.vas-fig .fig-cols { margin-top: .6rem; grid-template-columns: 46.4% 26% minmax(0, 1fr); } .vas-fig .fig-cols > div:nth-child(3) { padding-left: 1.5%; } @media (max-width: 560px) { .vas-fig .fig-cols { font-size: .72rem; } }

/* B: flowing dots and a blueprint that builds */
.vas .vs-dot { fill: var(--accent); }
.vas .vs-head.lit, .vas .vs-box.lit { fill: color-mix(in srgb, var(--accent) 8%, transparent); stroke: color-mix(in srgb, var(--accent) 55%, var(--rule-strong)); transition: fill .6s var(--ease), stroke .6s var(--ease); }
.vas .vs-head.lit { stroke: var(--accent); }
.vas .ping { animation: vsPing .7s var(--ease); }
@keyframes vsPing { 0% { fill: color-mix(in srgb, var(--accent) 22%, transparent); } 100% { fill: color-mix(in srgb, var(--accent) 8%, transparent); } }
.vas-fig .fig-cols > div:nth-child(2) { text-align: left; }
/* Human -> System -> Outcome: equal columns, arrows centred in the gaps */
.bd .flow.chain { --cg: clamp(2.5rem, 6vw, 4.5rem); display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); column-gap: var(--cg); max-width: 760px; margin: 2rem auto 2.25rem; align-items: start; }
.bd .flow.chain > .node { align-items: center; }
.bd .flow.chain > .node:not(:last-child)::after { right: calc(var(--cg) / -2); transform: translate(50%, -50%); top: 1.35rem; }
.bd .flow.chain > .node ul { margin-top: .9rem; gap: .35rem; }
.bd .flow.chain > .node li { font-size: .9rem; line-height: 1.4; }
@media (max-width: 760px) {
  .bd .flow.chain { display: flex; flex-direction: column; align-items: center; gap: 2.2rem 0; }
  .bd .flow.chain > .node:not(:last-child)::after { right: auto; left: 50%; top: auto; bottom: -1.75rem; transform: translateX(-50%); }
}
.bd .flow.chain { max-width: 860px; } @media (max-width: 760px) { .bd .flow.chain { gap: 2.8rem 0; } .bd .flow.chain > .node:not(:last-child)::after { bottom: -2.1rem; } }
@media (min-width: 761px) { .bd .flow.chain > .node { align-items: flex-start; text-align: left; } .bd .flow.chain > .node ul { justify-items: start; } .bd .flow.chain > .node .t { padding-left: 0; } .bd .flow.chain > .node.hot .t { margin-left: -.85rem; } }
@media (min-width: 761px) { .bd .flow.chain > .node .t { padding-left: .15rem; } .bd .flow.chain > .node.hot .t { margin-left: 0; padding: .45rem .85rem; } .bd .flow.chain > .node ul { padding-left: .15rem; margin-left: 0; } .bd .flow.chain > .node.hot ul { padding-left: calc(.85rem + 1.25px); } }
@media (min-width: 761px) { .bd .flow.chain > .node:not(:last-child)::after { left: var(--ax, auto); right: auto; top: var(--ay, 1.35rem); transform: translate(-50%, -50%); } }
@media (min-width: 761px) { .bd .flow.chain { grid-template-columns: repeat(3, auto); justify-content: start; --cg: clamp(3.5rem, 6vw, 5rem); max-width: none; margin-left: 0; } }
.stats .fig .fu { margin-left: .3em; font-size: .42em; font-weight: 600; letter-spacing: .02em; color: var(--soft); vertical-align: .55em; }
@media (min-width: 1000px) { #impact .stats .cap { white-space: nowrap; } #impact .stats > div { padding-inline: .5rem; } }
@media (min-width: 1000px) { #impact .stats { max-width: 1060px; } #impact .stats > div { padding-inline: .25rem; } } @media (min-width: 1000px) and (max-width: 1180px) { #impact .stats .cap { font-size: .8rem; } }
@media (min-width: 1000px) { #impact .stats .cap { font-size: .8rem; } #impact .stats > div { padding-inline: 0; } } @media (min-width: 1000px) and (max-width: 1180px) { #impact .stats .cap { font-size: .74rem; } }
@media (min-width: 1000px) { #impact .stats .cap { font-size: .78rem; letter-spacing: -.005em; } } @media (min-width: 1000px) and (max-width: 1180px) { #impact .stats .cap { font-size: .7rem; } }

/* Impact rows: a full-width image under each story */
.irow-fig { grid-column: 1 / -1; margin: clamp(.5rem, 2vw, 1.25rem) 0 0; }
.irow-fig figcaption { margin-top: .75rem; font-size: .85rem; color: var(--soft); text-align: left; }

/* Impact row takeaway: bold two-line statement */
.irow .istate { margin-top: 1.5rem; color: var(--ink); font-weight: 600; font-size: clamp(1.05rem, 1.6vw, 1.25rem); line-height: 1.35; letter-spacing: -.015em; }
.irow .istate span { display: block; }
@media (min-width: 1000px) { .irow .istate { font-size: 1.08rem; } .irow .istate span { white-space: nowrap; } }
@media (min-width: 1000px) and (max-width: 1099px) { .irow .istate { font-size: .98rem; } }
.irow .iai { margin-top: .9rem; color: var(--soft); font-size: 1rem; } .irow .iai b { color: var(--accent); font-weight: 600; }
.irow .iai b { color: var(--ink); font-weight: 500; }

/* Leadership signals: side list + panel */
.lead2 { margin: 3.25rem auto 0; max-width: 1000px; display: grid; grid-template-columns: minmax(0, 15rem) minmax(0, 1fr); gap: clamp(2rem, 5vw, 4rem); align-items: start; text-align: left; }
.lead2 .lrail { margin: 0; display: flex; flex-direction: column; gap: 0; max-width: none; grid-template-columns: none; border-left: 1px solid var(--rule); }
.lead2 .lt, .lead2 .lt.elevate { display: flex; align-items: baseline; gap: .9rem; padding: .75rem 0 .75rem 1.25rem; margin-left: -1px; background: none; border: 0; border-left: 2px solid transparent; border-radius: 0; box-shadow: none; color: var(--soft); transform: none; transition: color .25s, border-color .3s; }
.lead2 .lt .n { display: inline; font-size: .74rem; letter-spacing: .06em; color: var(--soft); opacity: 1; }
.lead2 .lt .name { display: inline; margin: 0; font-size: clamp(1.15rem, 1.8vw, 1.4rem); font-weight: 600; letter-spacing: -.02em; }
.lead2 .lt:hover { color: var(--ink); border-color: var(--rule-strong); transform: none; }
.lead2 .lt[aria-pressed="true"], .lead2 .lt.elevate[aria-pressed="true"] { color: var(--ink); border-left-color: var(--accent); box-shadow: none; }
.lead2 .lt[aria-pressed="true"] .n { color: var(--accent); }
.lead2 .lt:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.lead2 .lpanel { margin: 0; max-width: none; }
@media (max-width: 760px) {
  .lead2 { grid-template-columns: minmax(0, 1fr); gap: 1.25rem; }
  .lead2 .lrail { flex-direction: row; overflow-x: auto; border-left: 0; border-bottom: 1px solid var(--rule); scrollbar-width: none; gap: 1.25rem; }
  .lead2 .lrail::-webkit-scrollbar { display: none; }
  .lead2 .lt, .lead2 .lt.elevate { flex: none; padding: .6rem 0 .7rem; margin: 0 0 -1px; border-left: 0; border-bottom: 2px solid transparent; }
  .lead2 .lt[aria-pressed="true"] { border-bottom-color: var(--accent); }
  .lead2 .lt .name { font-size: 1.05rem; }
}

/* Leadership option 2: editorial index, all five visible */
.lindex { list-style: none; margin: 3.25rem auto 0; padding: 0; max-width: 1080px; text-align: left; border-top: 1px solid var(--rule); }
.lrow { display: grid; grid-template-columns: minmax(0, 11rem) minmax(0, 1fr) minmax(0, 17rem); gap: clamp(1.25rem, 3.5vw, 3rem); padding: clamp(1.5rem, 3vw, 2.1rem) 0; border-bottom: 1px solid var(--rule); align-items: start; }
.lrow .lk { display: flex; align-items: baseline; gap: .8rem; }
.lrow .lk .n { font-size: .74rem; font-weight: 600; letter-spacing: .06em; color: var(--accent); }
.lrow .lk .name { font-weight: 600; font-size: 1.05rem; letter-spacing: -.01em; color: var(--ink); }
.lrow .head { font-weight: 600; font-size: clamp(1.2rem, 2vw, 1.5rem); line-height: 1.2; letter-spacing: -.025em; }
.lrow .short { margin-top: .45rem; color: var(--soft); font-size: .98rem; line-height: 1.55; }
.lrow .proof { padding-top: .2rem; }
.lrow .proof .label { font-size: .7rem; letter-spacing: .14em; text-transform: uppercase; font-weight: 600; color: var(--soft); }
.lrow .proof p:not(.label) { margin-top: .4rem; color: var(--ink); font-size: .92rem; line-height: 1.5; }
.lrow .proof .slot { margin-top: .5rem; font-size: .8rem; }
@media (max-width: 900px) {
  .lrow { grid-template-columns: minmax(0, 1fr); gap: .75rem; }
  .lrow .proof { border-left: 2px solid var(--rule); padding: 0 0 0 1rem; margin-top: .35rem; }
}
/* Option 2 tightened: fits one laptop screen, quieter proof column */
.lindex { margin-top: 2.75rem; }
.lrow { padding: clamp(1.1rem, 2vw, 1.4rem) 0; grid-template-columns: minmax(0, 10rem) minmax(0, 1fr) minmax(0, 16rem); }
.lrow .head { font-size: clamp(1.1rem, 1.7vw, 1.3rem); }
.lrow .short { margin-top: .3rem; font-size: .94rem; line-height: 1.5; }
.lrow .proof .label { font-size: .66rem; letter-spacing: .12em; font-weight: 500; color: var(--soft); opacity: .8; }
.lrow .proof p:not(.label) { margin-top: .3rem; color: var(--soft); font-size: .88rem; line-height: 1.45; }
.lrow .proof .slot { margin-top: .35rem; padding: .45rem .75rem; font-size: .78rem; }
.lrow .lk .n { min-width: 1.4rem; font-variant-numeric: tabular-nums; }
/* Leadership: headline + story, two columns */
.lrow { grid-template-columns: minmax(0, 10rem) minmax(0, 1fr); }
.lindex { max-width: 980px; }
.lrow .short { margin-top: .45rem; max-width: 64ch; line-height: 1.6; }
@media (max-width: 900px) { .lrow { grid-template-columns: minmax(0, 1fr); gap: .6rem; } }
.lindex { max-width: 1120px; } .lrow .short { max-width: none; }
.lrow .short { text-wrap: pretty; }
@media (max-width: 900px) { .lbr { display: none; } }
@media (min-width: 901px) { .lrow .short:has(.lbr) { text-wrap: wrap; } }
@media (min-width: 901px) { .lrow { grid-template-columns: minmax(0, 8.5rem) minmax(0, 1fr); } }
@media (max-width: 1080px) { .lbr { display: none; } }
/* Future: two-beat intro, even measure */
.fut-lead { margin: clamp(2.25rem, 5vw, 3.5rem) auto 0; max-width: 980px; display: grid; gap: clamp(1.25rem, 2.5vw, 1.75rem); }
.fut-lead p { font-size: clamp(1.15rem, 1.75vw, 1.45rem); line-height: 1.45; font-weight: 500; letter-spacing: -.015em; color: var(--soft); text-wrap: balance; }
.fut-lead p span:last-child { color: var(--ink); }
@media (min-width: 901px) { .fut-lead p span { display: block; white-space: nowrap; } }
#future .fut-lead + .lit { margin-top: clamp(3.5rem, 7vw, 5.5rem); }
.fut-lead p span.ink { color: var(--ink); }
@media (min-width: 901px) { .provocation { font-size: clamp(1.7rem, 3.3vw, 2.75rem); } .provocation span { white-space: nowrap; } .provocation span + span { margin-top: .3em; } }
.closing-q, .provocation span { text-wrap: balance; }
/* Future option 3: the question as its own act */
.fut-q { margin: clamp(4rem, 8vw, 6rem) auto 0; max-width: 1080px; background: var(--panel); border-radius: 28px; padding: clamp(2rem, 6vw, 4.5rem) clamp(1.5rem, 6vw, 5rem); text-align: left; }
.fut-q .provocation { margin: 0; text-transform: none; font-weight: 600; font-size: clamp(1.6rem, 3.6vw, 3rem); line-height: 1.12; letter-spacing: -.035em; }
.fut-q .provocation span { white-space: normal; text-wrap: balance; }
.fut-q .provocation span + span { margin-top: .15em; color: var(--soft); }
.fut-q .closing-q { margin: clamp(2rem, 4vw, 3rem) 0 0; padding-top: 1.25rem; border-top: 1px solid var(--rule); font-size: 1rem; font-weight: 500; color: var(--ink); text-align: left; max-width: none; }
@media (min-width: 901px) { .fut-q .provocation span { white-space: nowrap; } .fut-q .provocation { font-size: clamp(1.6rem, 3.2vw, 2.75rem); } }
/* Future: full thought as a readable essay column */
#future .more > div { max-width: 660px; margin: clamp(2rem, 4vw, 3rem) auto 0; text-align: left; }
#future .more .beat { margin-top: 2.25rem; font-size: clamp(1.2rem, 1.9vw, 1.4rem); line-height: 1.35; font-weight: 600; letter-spacing: -.02em; color: var(--ink); text-wrap: balance; }
#future .more .beat:first-child { margin-top: 0; }
#future .more .beat.quiet { margin-top: 1.5rem; font-size: 1.0625rem; line-height: 1.65; font-weight: 400; letter-spacing: 0; color: var(--soft); text-wrap: pretty; }
#future .more .beat:not(.quiet) + .beat.quiet { margin-top: 1.25rem; }
#future .more .beat.quiet + .beat:not(.quiet) { margin-top: 2.25rem; }
#future .more .beat span + span { margin-top: .1em; }
#future .more .beat span:first-child:not(:last-child) { color: var(--soft); }
#future .more .beat.quiet:last-child { margin-top: 2.75rem; padding-top: 1.25rem; border-top: 1px solid var(--rule); font-size: .95rem; font-style: normal; }
/* Question panel: centered */
.fut-q { text-align: center; }
.fut-q .closing-q { text-align: center; border-top: 0; padding-top: 0; position: relative; margin-top: clamp(2.25rem, 4vw, 3rem); }
.fut-q .closing-q::before { content: ""; display: block; width: 3rem; height: 1px; background: var(--rule-strong); margin: 0 auto 1.5rem; }
/* About: portrait */
.portrait { margin: 0; aspect-ratio: 4 / 5; border: 0; padding: 0; display: block; border-radius: 22px; overflow: hidden; background: var(--panel); }
.portrait img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: 60% 30%; }
@media (min-width: 901px) { .rec-line { max-width: none !important; } .rec-line span { display: block; white-space: nowrap; } }
/* Recognition: awards as standout cards */
.awards { list-style: none; margin: clamp(2rem, 4vw, 2.75rem) auto 0; padding: 0; max-width: 1080px; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: clamp(.75rem, 1.4vw, 1rem); text-align: left; }
.aw { background: #fff; border: 1px solid var(--rule); border-radius: 20px; padding: clamp(1.25rem, 2.2vw, 1.75rem); display: flex; flex-direction: column; box-shadow: 0 18px 40px -32px rgba(10,10,20,.35); transition: transform .35s var(--ease), box-shadow .35s; }
.aw:hover { transform: translateY(-3px); box-shadow: 0 26px 50px -30px rgba(10,10,20,.4); }
.aw-ico { width: 28px; height: 28px; color: var(--accent); }
.aw-org { margin-top: 1.5rem; font-size: .72rem; font-weight: 600; letter-spacing: .12em; text-transform: uppercase; color: var(--soft); }
.aw-name { margin-top: .4rem; font-size: clamp(1.15rem, 1.6vw, 1.35rem); line-height: 1.2; font-weight: 600; letter-spacing: -.02em; color: var(--ink); text-wrap: balance; }
.aw-meta { margin-top: auto; padding-top: 1.25rem; font-size: .86rem; color: var(--soft); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .4rem .75rem; border-top: 0; }
.aw-yr { font-weight: 600; color: var(--ink); font-variant-numeric: tabular-nums; }
.aw-yr.tbd { font-weight: 500; font-size: .74rem; color: var(--soft); border: 1px dashed var(--rule-strong); border-radius: 999px; padding: .1rem .55rem; }
@media (max-width: 900px) { .awards { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
@media (max-width: 480px) { .awards { grid-template-columns: minmax(0, 1fr); } .aw-org { margin-top: 1rem; } }
/* Discipline path: quieter, reads as a journey under the awards */
.recog .path { margin-top: clamp(3.5rem, 7vw, 5rem); background: none; border: 0; gap: 0; max-width: 1080px; }
.recog .path li { background: none; padding: .25rem .5rem; position: relative; }
.recog .path li + li::before { content: "→"; position: absolute; left: -.45em; top: .3rem; color: var(--rule-strong); font-size: 1rem; }
.recog .path b { font-size: 1rem; }
.recog .path span { font-size: .82rem; }
@media (max-width: 900px) { .recog .path { row-gap: 1.25rem; } .recog .path li:nth-child(3n+1)::before { display: none; } }
@media (max-width: 480px) { .recog .path li:nth-child(3n+1)::before { display: block; } .recog .path li:nth-child(2n+1)::before { display: none; } }
/* Recognition option 4: editorial list */
.alist { list-style: none; margin: clamp(2.25rem, 4.5vw, 3.25rem) auto 0; padding: 0; max-width: 1080px; text-align: left; border-top: 1px solid var(--ink); }
.al { display: grid; grid-template-columns: 5.5rem minmax(0, 1fr) minmax(0, 11rem) minmax(0, 13rem); align-items: baseline; gap: 1.5rem; padding: clamp(1.25rem, 2.4vw, 1.75rem) 0; border-bottom: 1px solid var(--rule); transition: padding .35s var(--ease); }
.al-yr { font-size: .9rem; font-weight: 600; color: var(--ink); font-variant-numeric: tabular-nums; }
.al-yr.tbd { justify-self: start; font-size: .72rem; font-weight: 500; color: var(--soft); border: 1px dashed var(--rule-strong); border-radius: 999px; padding: .1rem .55rem; }
.al-name { font-size: clamp(1.35rem, 2.6vw, 2.1rem); line-height: 1.1; font-weight: 600; letter-spacing: -.035em; color: var(--ink); transition: color .25s; }
.al-org { font-size: 1rem; font-weight: 600; color: var(--ink); }
.al-cat { font-size: .9rem; color: var(--soft); text-align: right; }
.al:hover .al-name { color: var(--accent); }
@media (max-width: 900px) {
  .al { grid-template-columns: minmax(0, 1fr) auto; gap: .35rem 1rem; }
  .al-yr { grid-column: 2; grid-row: 1; justify-self: end; }
  .al-org { grid-column: 1; grid-row: 1; }
  .al-name { grid-column: 1 / -1; grid-row: 2; }
  .al-cat { grid-column: 1 / -1; grid-row: 3; text-align: left; }
}
/* Recognition option 2: featured award + three */
.afeat { margin: clamp(2.25rem, 4.5vw, 3.25rem) auto 0; max-width: 1080px; display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: clamp(1.25rem, 3vw, 2.5rem); align-items: stretch; text-align: left; }
.af-hero { background: #fff; border: 1px solid var(--rule); border-radius: 24px; padding: clamp(1.75rem, 3.5vw, 2.75rem); display: flex; flex-direction: column; box-shadow: 0 24px 60px -40px rgba(10,10,20,.4); }
.af-hero .aw-ico { width: 32px; height: 32px; }
.af-big { margin-top: auto; padding-top: 2.5rem; font-size: clamp(3.25rem, 7vw, 5.5rem); line-height: .95; font-weight: 600; letter-spacing: -.05em; color: var(--ink); }
.af-title { margin-top: .5rem; font-size: clamp(1.3rem, 2.2vw, 1.75rem); font-weight: 600; letter-spacing: -.025em; line-height: 1.15; }
.af-src { margin-top: 1.25rem; font-size: .95rem; color: var(--soft); }
.af-src b { color: var(--ink); font-weight: 600; }
.af-ctx { margin-top: .25rem; font-size: .9rem; color: var(--soft); }
.af-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; border-top: 1px solid var(--ink); }
.af-row { flex: 1; padding: clamp(1.1rem, 2.2vw, 1.5rem) 0; border-bottom: 1px solid var(--rule); display: flex; flex-direction: column; justify-content: center; }
.af-row .aw-org { margin-top: 0; }
.af-name { margin-top: .3rem; font-size: clamp(1.25rem, 2vw, 1.6rem); font-weight: 600; letter-spacing: -.03em; line-height: 1.15; }
.af-meta { margin-top: .4rem; font-size: .9rem; color: var(--soft); display: flex; flex-wrap: wrap; gap: .4rem .75rem; align-items: center; }
@media (max-width: 900px) { .afeat { grid-template-columns: minmax(0, 1fr); } .af-big { padding-top: 1.5rem; } }
.af-logo { display: block; width: clamp(180px, 18vw, 250px); height: auto; }
/* Featured award: centered, badge-like card */
.afeat { grid-template-columns: minmax(0, .9fr) minmax(0, 1fr); }
.af-hero { align-items: center; text-align: center; justify-content: center; }
.af-hero .af-logo { margin-inline: auto; }
.af-big { margin-top: 0; padding-top: clamp(1.5rem, 3vw, 2.25rem); }
@media (max-width: 900px) { .afeat { grid-template-columns: minmax(0, 1fr); } }
.af-list { border-top: 1px solid var(--rule); }
.af-list { border-top: 0; } .af-row:last-child { border-bottom: 0; }
/* Award rows: company logos */
.af-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; column-gap: 1.5rem; align-content: center; }
.af-row > :not(.af-lg) { grid-column: 1; }
.af-row .af-lg { grid-column: 2; grid-row: 1 / span 4; align-self: center; justify-self: end; }
.af-lg .logo-mark { color: var(--soft); }
.af-lg .logo-svg svg { height: var(--alh, 1.5rem); }
.af-row:hover .af-lg .logo-mark { color: var(--ink); }
.af-row:hover .logo-walmart .wm-spark { fill: #08F27B; opacity: 1; }
.af-row:hover .logo-infosys .ifs { fill: #007CC3; }
.af-row:hover .logo-sag .sag-s { opacity: 1; }
.af-row .af-name { margin-top: 0; }
.aw-org.vh { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
.af-ctx { display: inline-flex; align-items: center; gap: .45rem; }
.af-lg.sm .logo-svg svg { height: 1.05rem; }
.af-row { grid-template-columns: minmax(0, 1fr) 9.5rem; }
.af-row .af-lg { justify-self: start; width: 100%; }
.af-row .af-lg .logo-svg svg { max-width: 100%; }
.af-row .logo-sag svg { height: 1.45rem; }
.af-row .logo-infosys svg { height: 1.55rem; }
.af-row .logo-walmart svg { height: 1.2rem; }
@media (max-width: 480px) {
  .af-row { grid-template-columns: minmax(0, 1fr); }
  .af-row .af-lg { grid-column: 1; grid-row: auto; order: -1; margin-bottom: .6rem; }
  .af-row > :not(.af-lg) { grid-row: auto; }
}
@media (max-width: 480px) { .af-row { padding: 1.4rem 0; } .af-list { margin-top: .5rem; } }
.af-meta .aw-yr { font-size: .9rem; }
/* About: craft line (moved from Recognition) */
.craft-line { margin-top: 1.1rem; max-width: 34rem; font-size: clamp(1.02rem, 1.4vw, 1.15rem); line-height: 1.6; color: var(--soft); text-wrap: pretty; }
.craft-line b { color: var(--ink); font-weight: 600; }
.craft-line b.ai { color: var(--ink); }
.craft-line + * { margin-top: 1.75rem !important; } .afeat + .slot { margin-top: 2rem; }
/* About: portrait follows the reader */
@media (min-width: 901px) {
  .about-split > :first-child { position: sticky; top: calc(var(--hdr-h, 76px) + 1.5rem); align-self: start; }
}
/* About: beyond the boardroom */
.beyond { margin: clamp(3.5rem, 7vw, 5rem) auto 0; max-width: 1080px; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr); gap: clamp(1.5rem, 4vw, 3.5rem); text-align: left; align-items: start; padding-top: clamp(2rem, 4vw, 2.75rem); border-top: 1px solid var(--rule); }
.bb-k { font-size: .8rem; font-weight: 500; color: var(--soft); }
.bb-h { margin-top: .6rem; font-size: clamp(1.35rem, 2.3vw, 1.85rem); line-height: 1.15; font-weight: 600; letter-spacing: -.03em; text-wrap: balance; }
.bb-p { margin-top: .9rem; font-size: 1rem; line-height: 1.6; color: var(--soft); text-wrap: pretty; }
.bb-list { list-style: none; margin: 0; padding: 0; }
.bb-list li { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: .25rem 1.5rem; align-items: baseline; padding: 1.05rem 0; border-bottom: 1px solid var(--rule); }
.bb-list li:first-child { padding-top: .2rem; }
.bb-list li:last-child { border-bottom: 0; }
.bb-org { font-weight: 600; font-size: 1.02rem; color: var(--ink); letter-spacing: -.01em; }
.bb-role { font-size: .9rem; color: var(--soft); text-align: right; }
@media (max-width: 900px) { .beyond { grid-template-columns: minmax(0, 1fr); } }
@media (max-width: 480px) { .bb-list li { grid-template-columns: minmax(0, 1fr); } .bb-role { text-align: left; } }
/* Voices: real quote with person */
.v-cs { font-size: .78rem !important; font-weight: 600 !important; letter-spacing: .12em !important; text-transform: uppercase; color: var(--soft); line-height: 1.5 !important; margin-bottom: 1rem; }
.vquote .v-hl { color: var(--ink); }
.vquote p:not(.v-cs):not(.tbd-q) { color: var(--soft); }
.vquote cite { display: inline-flex; align-items: center; gap: .85rem; margin-top: 1.75rem; text-align: left; }
.v-av { width: 48px; height: 48px; border-radius: 50%; flex: none; filter: grayscale(1); }
.v-who { display: grid; gap: .1rem; font-size: .86rem; line-height: 1.35; }
.v-who b { color: var(--ink); font-weight: 600; font-size: .95rem; }
.v-ctx { font-size: .78rem; opacity: .85; }
@media (min-width: 761px) { .vquote .v-hl { display: block; margin-top: .15em; } }
/* Voices: full, original recommendation (no card) */
.vquote.vfull { max-width: 44rem; margin: 0 auto; text-align: left; }
.vquote.vfull p { font-size: inherit; font-weight: inherit; letter-spacing: 0; line-height: inherit; text-wrap: pretty; color: inherit; }
.vf-text { font-size: clamp(1.02rem, 1.4vw, 1.12rem); line-height: 1.65; color: var(--soft); padding-left: clamp(1rem, 2.5vw, 1.75rem); border-left: 2px solid var(--rule-strong); }
.vquote.vfull .vf-lead { color: var(--ink); font-weight: 500; }
.vf-cs { list-style: none; margin: .9rem 0; padding: 0; display: grid; gap: .45rem; }
.vf-cs b { color: var(--ink); font-weight: 600; }
.vquote.vfull .vf-punch { margin-top: .9rem; color: var(--ink); font-weight: 600; font-size: clamp(1.35rem, 2.4vw, 1.75rem); line-height: 1.2; letter-spacing: -.025em; }
.vquote.vfull cite { margin-top: 1.75rem; padding-left: clamp(1rem, 2.5vw, 1.75rem); }
.vq { min-height: 0; }
.vquote.vfull p.vf-lead, .vquote.vfull p.vf-punch { color: var(--ink); }
.vquote.vfull p.vf-end { color: var(--soft); }
/* Voices option 4: grid of highlights, full text on click */
#voices .vsel { margin-top: 1.25rem; }
#voices .vq { max-width: 1080px; margin-top: clamp(1.75rem, 3.5vw, 2.5rem); }
.rgrid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(.75rem, 1.4vw, 1rem); align-items: start; text-align: left; }
@media (prefers-reduced-motion: no-preference) { .rgrid:not([hidden]) { animation: fade .55s var(--ease); } }
.rc { background: #fff; border: 1px solid var(--rule); border-radius: 20px; padding: clamp(1.25rem, 2.2vw, 1.75rem); display: flex; flex-direction: column; gap: 1.1rem; box-shadow: 0 18px 40px -34px rgba(10,10,20,.35); }
.rc-q { font-size: clamp(1.05rem, 1.5vw, 1.2rem); line-height: 1.45; font-weight: 500; letter-spacing: -.012em; color: var(--ink); text-wrap: pretty; }
.rc-more summary { list-style: none; cursor: pointer; display: inline-flex; align-items: center; gap: .4rem; font-size: .84rem; font-weight: 600; color: var(--soft); transition: color .25s; }
.rc-more summary::-webkit-details-marker { display: none; }
.rc-more summary::after { content: "+"; font-weight: 500; }
.rc-more[open] summary::after { content: "−"; }
.rc-more summary:hover { color: var(--ink); }
.rc-more summary:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 4px; }
.rc-more .on-open { display: none; } .rc-more[open] .on-open { display: inline; } .rc-more[open] .on-closed { display: none; }
.rc-more .vf-text { margin-top: 1rem; font-size: .92rem; line-height: 1.6; color: var(--soft); padding-left: 1rem; border-left: 2px solid var(--rule); }
.rc-more .vf-text p { margin: 0; }
.rc-more .vf-cs { margin: .6rem 0; gap: .35rem; }
.rc-more .vf-lead { color: var(--ink); }
.rc-more .vf-end { margin-top: .6rem; }
.rc-more .vf-punch { margin-top: .35rem; color: var(--ink); font-weight: 600; }
.rc-who { display: flex; align-items: center; gap: .75rem; padding-top: 1rem; border-top: 1px solid var(--rule); margin-top: auto; }
.rc-who .v-av { width: 40px; height: 40px; }
.rc-who .v-who { font-size: .8rem; }
.rc-who .v-who b { font-size: .9rem; }
.rc-tbd { background: transparent; border-style: dashed; border-color: var(--rule-strong); box-shadow: none; }
.rc-tbd .rc-q, .rc-tbd .v-who, .rc-tbd .v-who b { color: var(--soft); opacity: .8; }
.ph-av { display: block; border-radius: 50%; background: var(--rule); flex: none; }
@media (max-width: 900px) { .rgrid { grid-template-columns: minmax(0, 1fr); } }
.rgrid[hidden] { display: none; }
/* Opened recommendation spans the row so nothing leaves gaps */
.rc:has(.rc-more[open]) { grid-column: 1 / -1; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.35fr); column-gap: clamp(1.5rem, 4vw, 3rem); align-items: start; }
.rc:has(.rc-more[open]) .rc-q { grid-column: 1; grid-row: 1; font-size: clamp(1.2rem, 2vw, 1.5rem); }
.rc:has(.rc-more[open]) .rc-who { grid-column: 1; grid-row: 2; }
.rc:has(.rc-more[open]) .rc-more { grid-column: 2; grid-row: 1 / span 3; }
.rc:has(.rc-more[open]) .rc-more .vf-text { font-size: .98rem; }
@media (max-width: 900px) { .rc:has(.rc-more[open]) { display: flex; } }
.rc-more .vf-paras p + p { margin-top: .7rem; } .rc-more .vf-paras p { color: var(--soft); }
.rgrid { grid-auto-flow: row dense; }
.rgrid { align-items: stretch; } .rc .rc-more { margin-bottom: auto; }
/* What I'm looking for: headline becomes the structure */
.ask3 { margin: clamp(2.75rem, 5.5vw, 4rem) auto 0; max-width: 1080px; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0; text-align: left; border-top: 1px solid var(--ink); }
.a3 { padding: clamp(1.5rem, 3vw, 2.25rem) clamp(1rem, 2.4vw, 2rem) 0; border-left: 1px solid var(--rule); display: flex; flex-direction: column; }
.a3:first-child { border-left: 0; padding-left: 0; }
.a3:last-child { padding-right: 0; }
.a3-k { font-size: .8rem; font-weight: 600; color: var(--ink); display: flex; gap: .6rem; align-items: baseline; }
.a3-k span { color: var(--accent); font-variant-numeric: tabular-nums; }
.a3 h3 { margin-top: 1rem; font-size: clamp(1.15rem, 1.7vw, 1.35rem); line-height: 1.25; font-weight: 600; letter-spacing: -.02em; text-wrap: balance; }
.a3-p { margin-top: .8rem; font-size: .95rem; line-height: 1.6; color: var(--soft); text-wrap: pretty; }
.a3-l { list-style: none; margin: 1.5rem 0 0; padding: 0; }
.a3-l li { padding: .85rem 0; border-top: 1px solid var(--rule); display: grid; gap: .2rem; }
.a3-l b { font-size: .92rem; font-weight: 600; color: var(--ink); }
.a3-l span { font-size: .86rem; line-height: 1.5; color: var(--soft); }
.a3-leave { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--rule); font-size: clamp(1.25rem, 2vw, 1.55rem); line-height: 1.2; font-weight: 600; letter-spacing: -.025em; color: var(--ink); }
.a3-leave span { display: block; }
.a3-leave .a3-lk { font-size: .78rem; font-weight: 500; letter-spacing: 0; color: var(--soft); margin-bottom: .5rem; }
.a3-sig { margin: clamp(3rem, 6vw, 4.5rem) auto 0; font-size: clamp(1.1rem, 1.8vw, 1.35rem); font-weight: 500; letter-spacing: -.015em; color: var(--soft); text-wrap: balance; }
@media (max-width: 900px) {
  .ask3 { grid-template-columns: minmax(0, 1fr); }
  .a3, .a3:first-child, .a3:last-child { border-left: 0; padding: 1.75rem 0 0; }
  .a3 + .a3 { margin-top: 1.75rem; border-top: 1px solid var(--rule); }
}
.a3 h3 { text-wrap: pretty; }
/* Align quote, link and divider across cards in a row */
@media (min-width: 901px) {
  .rc { display: grid; grid-row: span 3; grid-template-rows: subgrid; row-gap: 0; align-content: start; }
  .rc .rc-q { align-self: start; }
  .rc .rc-more { align-self: start; margin: 1.1rem 0 0; }
  .rc .rc-who { align-self: end; margin-top: 1.5rem; }
  .rc:has(.rc-more[open]) { grid-template-rows: auto auto 1fr; }
}
@media (min-width: 901px) { .rc .rc-who { align-self: start; } }
@media (min-width: 1000px) { .lede.lede-2l { max-width: none; } .lede.lede-2l span { display: block; white-space: nowrap; } }
/* Live links keep the same quiet underline style as before */
.links a, .talk-actions a.alt { color: inherit; text-decoration: none; border-bottom: 1px solid var(--rule-strong); padding-bottom: .15rem; transition: border-color .25s, color .25s; }
.links a:hover, .talk-actions a.alt:hover { border-color: var(--ink); color: var(--ink); }
.links a:focus-visible, .talk-actions a.alt:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: 2px; }
.v-more { margin-top: clamp(1.75rem, 3.5vw, 2.5rem); }
.rc-who { align-items: flex-start; } .rc-who .v-av { margin-top: .1rem; }

</style>
<div class="prog" id="prog" aria-hidden="true"></div>
<header class="bar">
  <div class="wrap bar-in">
    <a class="id" href="#top"><span class="id-name">Anish Velayudhan Kutty</span><span class="id-role">Design &amp; Product Executive</span></a>
    <nav class="nav" aria-label="Primary">
      <span class="nav-links"><a href="#work" data-g="work">Work</a><a href="#leadership" data-g="lead">Leadership</a><a href="#about" data-g="about">About</a></span>
      <a class="nav-cta" href="#connect">Let's connect <span class="ar">→</span></a>
    </nav>
  </div>
</header>

<main id="main-content">

<!-- HERO -->
<section class="s hero" id="top">
  <div class="wrap c">
    <p class="eyebrow a" style="--d:60">Design · Product · AI · Leadership</p>
    <div class="h1-wrap swarm"><h1 id="h1" class="pt">Designing the Future of Human Intelligence.</h1><canvas class="pfc" id="pf" aria-hidden="true"></canvas></div>
    <p class="lead a" style="--d:900">I lead design and product organizations at pivotal moments, building the teams, systems, and strategy that turn business ambition into outcomes.</p>
    <p class="cta a" style="--d:1100"><a class="lnk" href="#work">Read the work <span class="ar dn">↓</span></a></p>
    <div class="trio a" style="--d:1500">
      <div><p class="fig">Months&nbsp;→&nbsp;Hours</p><p class="cap">Task cycles, as users reported.</p></div>
      <div><p class="fig">Multi&#8209;million&nbsp;$</p><p class="cap">Follow-ons signed, then a partnership.</p></div>
      <div><p class="fig">Before the deal</p><p class="cap">Design invited upstream.</p></div>
    </div>
    <div class="logos-wrap a" style="--d:1800">
      <ul class="logos" aria-label="Companies I have worked for, most recent first">
        <li class="logo"><span class="logo-mark logo-svg" data-logo="Tresata" role="img" aria-label="Tresata"><svg aria-hidden="true" focusable="false" viewBox="0 0 122 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g id="tresata_vector_logo" fill="currentColor" fill-rule="nonzero"><path d="M34.8116748,15.1149416 C34.8116748,15.4725995 34.7884351,15.745776 34.74384,15.9344714 C34.6979888,16.1250167 34.6395755,16.2582134 34.5648316,16.3352948 C34.491344,16.4129929 34.3814266,16.4826745 34.2363355,16.5431063 C34.0906164,16.6016882 33.9229138,16.6571868 33.7269468,16.7009691 C33.5341202,16.7441346 33.3243349,16.7774338 33.0988472,16.8045664 C32.870847,16.8292326 32.6409625,16.8421821 32.4091938,16.8421821 C31.7917719,16.8421821 31.2560029,16.7644842 30.8012588,16.610938 C30.3477709,16.4580084 29.9715392,16.218131 29.6750762,15.8987056 C29.3779851,15.5761969 29.1575221,15.1747569 29.0174559,14.6882189 C28.8773897,14.203531 28.8064144,13.6269619 28.8064144,12.9622117 L28.8064144,7.4086493 L27.4804962,7.4086493 C27.3247274,7.4086493 27.2047604,7.31491829 27.1224794,7.12252306 C27.0401983,6.93321108 27,6.61316902 27,6.16794672 C27,5.93423584 27.0087933,5.73567409 27.0295206,5.57349478 C27.0515041,5.41254877 27.0816529,5.28428528 27.1224794,5.19178757 C27.1651901,5.09805656 27.2166943,5.03022491 27.27762,4.98952592 C27.3398018,4.94697697 27.4095209,4.92909408 27.4943143,4.92909408 L28.8064144,4.92909408 L28.8064144,2.5099707 C28.8064144,2.42857271 28.829026,2.35765781 28.8767616,2.29105946 C28.9213567,2.22692771 29.0030096,2.17019578 29.1210923,2.12456358 C29.2435718,2.08016468 29.4031091,2.04994876 29.6053571,2.02959927 C29.8057209,2.00924977 30.058845,2 30.3559362,2 C30.6586802,2 30.9111762,2.00924977 31.1165648,2.02959927 C31.3175567,2.04994876 31.477094,2.08016468 31.5920362,2.12456358 C31.7088627,2.17019578 31.7917719,2.22692771 31.8413917,2.29105946 C31.8903835,2.35765781 31.9155075,2.42857271 31.9155075,2.5099707 L31.9155075,4.92909408 L34.3154761,4.92909408 C34.3996414,4.92909408 34.4706167,4.94697697 34.5334267,4.98952592 C34.5956085,5.03022491 34.6458565,5.09805656 34.6873111,5.19178757 C34.7275094,5.28428528 34.7589144,5.41254877 34.7802698,5.57349478 C34.8016252,5.73567409 34.8116748,5.93423584 34.8116748,6.16794672 C34.8116748,6.61316902 34.7714764,6.93321108 34.6873111,7.12252306 C34.60503,7.31491829 34.4831787,7.4086493 34.3286662,7.4086493 L31.9155075,7.4086493 L31.9155075,12.5021897 C31.9155075,13.0929418 32.0109786,13.5363141 32.2000366,13.8316902 C32.3897227,14.1282995 32.7282684,14.2762957 33.2137894,14.2762957 C33.3789796,14.2762957 33.5272111,14.2602629 33.6603682,14.2343635 C33.7910129,14.2059975 33.9097238,14.1720816 34.0114759,14.136316 C34.1144842,14.0999335 34.2043025,14.0678677 34.2721372,14.0370351 C34.3443687,14.010519 34.4078067,13.994486 34.4649638,13.994486 C34.5152118,13.994486 34.5623192,14.010519 34.6069143,14.0370351 C34.6527656,14.0678677 34.6873111,14.1233663 34.7136913,14.2078474 C34.737559,14.293562 34.7589144,14.4082591 34.7802698,14.5556389 C34.8016252,14.6999352 34.8116748,14.8867806 34.8116748,15.1149416" id="Fill-1"></path><path d="M48.0305074,6.66139345 C48.0305074,6.94450355 48.0224156,7.17712268 48.0056096,7.35864975 C47.9888036,7.54017682 47.9632834,7.68263349 47.9327837,7.78421652 C47.8985492,7.88700172 47.8568455,7.95913168 47.8026928,7.99699991 C47.7485402,8.03787355 47.6806938,8.05891146 47.599776,8.05891146 C47.5319296,8.05891146 47.4591036,8.04508655 47.3788083,8.01743673 C47.2978906,7.98798366 47.2076362,7.95913168 47.103688,7.92607211 C47.0016071,7.89782121 46.8908121,7.86596381 46.7663232,7.83831399 C46.6424568,7.81186634 46.5080089,7.79804143 46.3617345,7.79804143 C46.1899399,7.79804143 46.0169004,7.83170208 45.8463507,7.89782121 C45.6751785,7.96574359 45.496537,8.0715342 45.3116711,8.21278871 C45.1286725,8.35223997 44.9350923,8.54458653 44.7365326,8.78081216 C44.5348607,9.01583561 44.3213624,9.30976521 44.0916804,9.65719119 L44.0916804,16.2456621 C44.0916804,16.3226007 44.0674051,16.3923264 44.0194769,16.4518336 C43.9684365,16.5119419 43.8844065,16.5594274 43.7648972,16.5990989 C43.6478777,16.6411747 43.4897769,16.6706278 43.2949518,16.6898624 C43.0970146,16.7090971 42.846792,16.7175123 42.545529,16.7175123 C42.2455109,16.7175123 41.9909312,16.7090971 41.7961062,16.6898624 C41.6019036,16.6706278 41.4438028,16.6411747 41.323671,16.5990989 C41.2078964,16.5594274 41.1238664,16.5119419 41.0746934,16.4518336 C41.0248978,16.3923264 41,16.3226007 41,16.2456621 L41,5.67621839 C41,5.59687544 41.0199183,5.53015522 41.0609996,5.4670415 C41.1020809,5.40873645 41.1761518,5.36004873 41.2819673,5.32097833 C41.3890277,5.28130685 41.5265878,5.25185379 41.692158,5.2302148 C41.8608404,5.21338447 42.0712265,5.20316606 42.3258062,5.20316606 C42.5853654,5.20316606 42.801976,5.21338447 42.9762604,5.2302148 C43.1486775,5.25185379 43.2812581,5.28130685 43.3733798,5.32097833 C43.4667465,5.36004873 43.5339704,5.40873645 43.578164,5.4670415 C43.6155106,5.53015522 43.6372962,5.59687544 43.6372962,5.67621839 L43.6372962,6.99078694 C43.9229981,6.59707757 44.1937613,6.27068949 44.448341,6.01462813 C44.7029207,5.7573646 44.9413168,5.55419854 45.1691314,5.40452887 C45.4006806,5.25425812 45.6291176,5.14906859 45.8569322,5.09076354 C46.0884815,5.02945307 46.3175409,5 46.545978,5 C46.6517935,5 46.7663232,5.007213 46.8908121,5.02043683 C47.0109438,5.02945307 47.1385448,5.05109206 47.2692581,5.07753971 C47.3987265,5.1063917 47.5138787,5.13704693 47.6128473,5.17431408 C47.7130609,5.20797473 47.783397,5.24524187 47.828213,5.28431227 C47.8724066,5.325787 47.9041512,5.36966606 47.9271817,5.41655053 C47.9470999,5.46343501 47.9632834,5.53015522 47.9807119,5.60949818 C47.9975179,5.6936498 48.0087219,5.81807398 48.018681,5.9839729 C48.0267727,6.15167506 48.0305074,6.37407577 48.0305074,6.66139345" id="Fill-2"></path><path d="M59.3263569,9.71631198 C59.3457605,8.8955957 59.1834753,8.24741301 58.8347971,7.77826346 C58.4820031,7.30911391 57.9381122,7.07217566 57.2043005,7.07217566 C56.8321028,7.07217566 56.5104722,7.14544335 56.2364688,7.2848883 C55.9612894,7.42078805 55.7331493,7.61341116 55.5544003,7.84857681 C55.3691834,8.08610592 55.2310057,8.3638141 55.1363393,8.68642827 C55.037557,9.00904245 54.9846378,9.35351875 54.9640582,9.71631198 L59.3263569,9.71631198 Z M62.1551773,10.5571178 C62.1551773,10.9145932 62.0722707,11.1781205 61.9146894,11.3488815 C61.757696,11.5190516 61.5395517,11.6035458 61.2590804,11.6035458 L54.9640582,11.6035458 C54.9640582,12.0466972 55.0175653,12.4478968 55.1239915,12.8100992 C55.2263018,13.1717107 55.393879,13.4783714 55.6249591,13.7288996 C55.8501593,13.9835639 56.1429784,14.1738236 56.5016523,14.3073598 C56.8603263,14.4391235 57.293675,14.5053008 57.7952306,14.5053008 C58.30443,14.5053008 58.7524785,14.4698487 59.139376,14.3942175 C59.5262735,14.320359 59.8620159,14.2405917 60.1418992,14.1490071 C60.4241344,14.0609677 60.6575665,13.978837 60.8421954,13.9049784 C61.0285882,13.830529 61.1808777,13.7956678 61.2937718,13.7956678 C61.3637426,13.7956678 61.4231296,13.8086669 61.4684049,13.8364377 C61.51662,13.8612542 61.5554274,13.9097054 61.5854149,13.978837 C61.6183423,14.0509229 61.635982,14.1490071 61.6483298,14.2766347 C61.6600896,14.4072166 61.6677335,14.5679328 61.6677335,14.7611468 C61.6677335,14.9313169 61.6624416,15.0772614 61.6553857,15.1977986 C61.6471538,15.3177449 61.6348061,15.4217377 61.6195183,15.5062319 C61.6048186,15.5936805 61.579535,15.6639938 61.5518995,15.7207172 C61.520736,15.7803949 61.4795767,15.8365274 61.4266576,15.8914782 C61.3772664,15.9446563 61.2396767,16.0185149 61.0191804,16.1130538 C60.7916282,16.2028658 60.508217,16.2962231 60.1613028,16.3848533 C59.8132127,16.4728927 59.4145554,16.5532508 58.9665069,16.6176555 C58.5172825,16.6867871 58.0392465,16.7175123 57.5288711,16.7175123 C56.6092545,16.7175123 55.8019441,16.601702 55.1116437,16.3688999 C54.4207553,16.1343251 53.8421731,15.7821675 53.3788368,15.3094727 C52.9160886,14.8344145 52.5709384,14.2382282 52.3422103,13.5150053 C52.1123061,12.7941457 52,11.9468404 52,10.9754527 C52,10.0507435 52.11995,9.22116422 52.35985,8.47903344 C52.597986,7.73690267 52.9460761,7.1070369 53.4011805,6.59120874 C53.8598128,6.07360798 54.4119355,5.67890785 55.0669565,5.40947184 C55.7160976,5.13826322 56.4534372,5 57.2742714,5 C58.1392048,5 58.8783084,5.12999106 59.4921701,5.3858371 C60.1066197,5.6405014 60.6105273,5.99738595 61.0050686,6.45235466 C61.400198,6.90495989 61.6900771,7.44383192 61.874706,8.06247119 C62.0581589,8.68642827 62.1551773,9.36001831 62.1551773,10.0903317 L62.1551773,10.5571178 L62.1551773,10.5571178 Z" id="Fill-3"></path><path d="M77.2337938,14.6813796 C76.9925082,15.1310305 76.6526602,15.5062319 76.2180899,15.8105292 C75.7815997,16.1130538 75.2651075,16.3399473 74.6654134,16.4912096 C74.0676393,16.6442446 73.4199441,16.7175123 72.7229676,16.7175123 C72.3024777,16.7175123 71.9011883,16.6897414 71.5165392,16.6318363 C71.1350903,16.5727495 70.7926822,16.4977092 70.488675,16.4084881 C70.1865879,16.3204487 69.936342,16.2288641 69.7340973,16.1343251 C69.5299325,16.0421496 69.384009,15.9529285 69.2924869,15.874343 C69.1990447,15.793394 69.128643,15.6639938 69.0736017,15.4885059 C69.0275206,15.3136088 69,15.0559902 69,14.7156499 C69,14.4875747 69.0089602,14.3097233 69.0275206,14.1726418 C69.044161,14.0355604 69.0665615,13.9280223 69.1024024,13.8476642 C69.1350432,13.7661243 69.1785642,13.7111736 69.2278453,13.6834028 C69.2803266,13.6579954 69.341128,13.642042 69.4179298,13.642042 C69.510092,13.642042 69.6476952,13.6910841 69.8249794,13.7868047 C70.0086637,13.8860706 70.2352291,13.992427 70.5014753,14.1111915 C70.7690016,14.22582 71.0864491,14.3345398 71.4429375,14.4349874 C71.7975058,14.5366168 72.2051954,14.5862498 72.6602462,14.5862498 C72.9450529,14.5862498 73.2004189,14.5578881 73.4212241,14.5053008 C73.6452294,14.4497591 73.840434,14.3723554 74.0042778,14.2713169 C74.1674817,14.1726418 74.2916446,14.0420599 74.3729265,13.8884341 C74.4586885,13.7348083 74.5041296,13.5540026 74.5041296,13.3519256 C74.5041296,13.1179417 74.4254077,12.9194099 74.267964,12.7521941 C74.1105203,12.58616 73.9050755,12.4396247 73.6503495,12.3143606 C73.3924234,12.1914599 73.1012165,12.0726954 72.7780089,11.9645664 C72.4554413,11.8570284 72.1239135,11.737673 71.7840655,11.6035458 C71.4429375,11.4735548 71.1114097,11.3222924 70.786282,11.1503497 C70.4637144,10.9789979 70.1725076,10.771603 69.9152215,10.5198931 C69.6598555,10.2723192 69.4524906,9.97333976 69.296327,9.6241365 C69.1414433,9.27611499 69.0652815,8.85718925 69.0652815,8.36617757 C69.0652815,7.86984807 69.1676839,7.41192502 69.381449,6.99772624 C69.5900939,6.58411832 69.894101,6.22782465 70.2864303,5.93179955 C70.6838796,5.63695619 71.165171,5.40947184 71.7315843,5.24521041 C72.3011977,5.08213072 72.9354526,5 73.6413893,5 C73.9965976,5 74.3390057,5.02304387 74.6718135,5.06972248 C75.0052614,5.11581022 75.3041484,5.17548793 75.5742348,5.24521041 C75.8449611,5.31552376 76.0689664,5.38938231 76.2564908,5.4721039 C76.4388951,5.55364374 76.5713783,5.62395709 76.6513801,5.6818622 C76.728822,5.74094904 76.7889834,5.79649068 76.8241842,5.85794099 C76.856825,5.91525523 76.8792255,5.98379597 76.899066,6.06651756 C76.9137863,6.14864827 76.9304267,6.24909591 76.942587,6.37022394 C76.9553873,6.49076111 76.9592274,6.64025082 76.9592274,6.81810223 C76.9592274,7.02667879 76.9553873,7.19743977 76.942587,7.33156691 C76.9304267,7.46273971 76.9105862,7.56673256 76.8792255,7.64531806 C76.8517049,7.7233127 76.8088238,7.77353651 76.7614627,7.80307994 C76.7102615,7.82907815 76.6513801,7.84325899 76.5828985,7.84325899 C76.5067367,7.84325899 76.388974,7.80307994 76.2302502,7.72035835 C76.0689664,7.63881851 75.8718418,7.55196084 75.6318361,7.45742189 C75.3918305,7.36465555 75.115344,7.27779788 74.7991765,7.19625804 C74.4830091,7.11353645 74.1252407,7.07217566 73.7201111,7.07217566 C73.4314643,7.07217566 73.1850585,7.10112822 72.9738535,7.15548811 C72.7652086,7.20925714 72.5917646,7.28666091 72.4586414,7.38829028 C72.3216782,7.49051053 72.2224759,7.60809335 72.1552743,7.74517483 C72.0887127,7.87989283 72.0554319,8.02760995 72.0554319,8.18123575 C72.0554319,8.42053747 72.1354338,8.62261448 72.2928775,8.78569417 C72.4528813,8.94759213 72.6628062,9.0923549 72.9252124,9.21525553 C73.1850585,9.34051965 73.4813855,9.45928421 73.8154734,9.568004 C74.1463612,9.67554206 74.4830091,9.79312488 74.8228571,9.92370681 C75.1652651,10.0477892 75.5012731,10.2002332 75.8328009,10.3686308 C76.1643287,10.5423461 76.4600156,10.7509226 76.7217818,10.9996783 C76.9829079,11.247843 77.1941129,11.5438681 77.3528367,11.8907079 C77.5115604,12.2363659 77.5928423,12.6470195 77.5928423,13.1179417 C77.5928423,13.7099918 77.4718795,14.2270017 77.2337938,14.6813796 Z" id="Fill-4"></path><path d="M90.0753802,11.6407705 L88.8821406,11.6407705 C88.3733705,11.6407705 87.942338,11.6738592 87.5871469,11.7453542 C87.2275318,11.813895 86.936174,11.9190696 86.7118096,12.0585145 C86.4880771,12.1985503 86.3243859,12.3675387 86.2219999,12.5672523 C86.1170858,12.7646023 86.0658928,12.9909049 86.0658928,13.2461601 C86.0658928,13.6816302 86.2144157,14.023743 86.5057735,14.2713169 C86.8021874,14.5188908 87.2117315,14.6447457 87.7350378,14.6447457 C88.1780786,14.6447457 88.5794066,14.5407529 88.9497659,14.3321763 C89.3188612,14.1194637 89.6942767,13.8139847 90.0753802,13.4092398 L90.0753802,11.6407705 Z M93.1551773,16.0888282 C93.1551773,16.1969572 93.1122004,16.2814513 93.0281428,16.3440834 C92.9478772,16.4061246 92.8145225,16.4516215 92.635663,16.4782105 C92.4593315,16.5071631 92.1964143,16.5183896 91.8456473,16.5183896 C91.4714959,16.5183896 91.1990985,16.5071631 91.0309832,16.4782105 C90.8578117,16.4516215 90.7396254,16.4061246 90.668208,16.3440834 C90.5999506,16.2814513 90.5620299,16.1969572 90.5620299,16.0888282 L90.5620299,15.2598398 C90.1063488,15.7207172 89.5855705,16.0781926 89.0003269,16.3334478 C88.4125553,16.5904755 87.7634784,16.7175123 87.0512003,16.7175123 C86.4609006,16.7175123 85.9167378,16.6448354 85.423136,16.5036179 C84.9282702,16.3588551 84.5010297,16.1443699 84.1420466,15.8619347 C83.7786394,15.577727 83.4986579,15.2261603 83.300838,14.8084163 C83.101122,14.3865362 83,13.8984789 83,13.3401082 C83,12.7356498 83.1270345,12.2085951 83.3798395,11.7624894 C83.6332765,11.3146111 84.011852,10.9476818 84.513038,10.6557928 C85.016752,10.3639038 85.6430764,10.1482368 86.3882191,10.0105645 C87.137786,9.86816517 88.0042752,9.80080617 88.9914788,9.80080617 L90.0753802,9.80080617 L90.0753802,9.17034953 C90.0753802,8.84537188 90.0412516,8.55761895 89.9704662,8.31536288 C89.9015768,8.06897074 89.7827584,7.86571199 89.6209632,7.7026323 C89.4610641,7.54073434 89.2449158,7.41901544 88.9744144,7.34338428 C88.7039131,7.26538965 88.3695784,7.22580146 87.9720425,7.22580146 C87.4474721,7.22580146 86.9810469,7.28075223 86.5696067,7.38829028 C86.1587986,7.49701008 85.7960234,7.61636551 85.4787531,7.75049264 C85.1640109,7.88284718 84.9010937,8.00161174 84.6887375,8.1109224 C84.4763813,8.21905133 84.3044738,8.27400209 84.1698552,8.27400209 C84.0801094,8.27400209 83.9985798,8.24741301 83.9296904,8.19187138 C83.860169,8.13810235 83.8007599,8.06010771 83.7527269,7.95847834 C83.708486,7.8580307 83.6749894,7.73394833 83.6465488,7.58859469 C83.6244284,7.4385141 83.6124201,7.27543441 83.6124201,7.09699214 C83.6124201,6.85591781 83.6307485,6.66624904 83.6749894,6.52680408 C83.7160702,6.38676826 83.7938077,6.26150415 83.909466,6.14864827 C84.0270203,6.03520153 84.2305284,5.91230089 84.5206221,5.77403767 C84.8132439,5.6405014 85.1513706,5.51228295 85.5400583,5.39765447 C85.9338021,5.27948078 86.3572505,5.18612357 86.8179877,5.10990154 C87.2806208,5.03899732 87.7558943,5 88.245072,5 C89.1191453,5 89.8642881,5.08213072 90.4805003,5.23871086 C91.1011366,5.39942708 91.6073786,5.64227401 92.0061785,5.97316034 C92.4087705,6.3016832 92.6976002,6.72829022 92.8815159,7.24825446 C93.0629035,7.7682187 93.1551773,8.3862671 93.1551773,9.09885445 L93.1551773,16.0888282 L93.1551773,16.0888282 Z" id="Fill-5"></path><path d="M105.811675,15.1166483 C105.811675,15.4743358 105.787175,15.7469184 105.745714,15.9356293 C105.695458,16.1268072 105.637663,16.2593983 105.564164,16.3377195 C105.488151,16.4166574 105.381357,16.483878 105.234987,16.5436982 C105.0905,16.6059851 104.923399,16.6577882 104.728657,16.7028075 C104.534543,16.7459766 104.323468,16.7811286 104.095431,16.8039467 C103.869907,16.8298482 103.641242,16.8421821 103.408179,16.8421821 C102.791286,16.8421821 102.253546,16.7644776 101.801242,16.6115355 C101.343284,16.4598266 100.968876,16.220546 100.671109,15.8998605 C100.37397,15.5791752 100.155985,15.177085 100.018409,14.68989 C99.875807,14.2045451 99.806077,13.6297781 99.806077,12.9631226 L99.806077,7.41033217 L98.4805734,7.41033217 C98.3247797,7.41033217 98.2022806,7.31474327 98.1224991,7.12418215 C98.0389484,6.93238764 98,6.61355238 98,6.16952648 C98,5.93517948 98.0087948,5.73598453 98.028269,5.57317504 C98.0489996,5.41283236 98.0797814,5.28455821 98.1224991,5.19205281 C98.1633321,5.09769731 98.216101,5.03109343 98.2770364,4.99039105 C98.3386001,4.94845528 98.4120996,4.92933749 98.4931375,4.92933749 L99.806077,4.92933749 L99.806077,2.51062978 C99.806077,2.42984173 99.826807,2.35707082 99.874551,2.29231705 C99.920409,2.22632987 100.002075,2.17144333 100.12269,2.12580734 C100.242676,2.08078805 100.402239,2.05118632 100.605776,2.02960173 C100.807429,2.00986724 101.057452,2 101.354591,2 C101.659897,2 101.91369,2.00986724 102.115342,2.02960173 C102.318879,2.05118632 102.477186,2.08078805 102.590262,2.12580734 C102.706479,2.17144333 102.791286,2.22632987 102.841542,2.29231705 C102.890542,2.35707082 102.913785,2.42984173 102.913785,2.51062978 L102.913785,4.92933749 L105.316025,4.92933749 C105.399575,4.92933749 105.470562,4.94845528 105.530869,4.99039105 C105.593689,5.03109343 105.646458,5.09769731 105.687919,5.19205281 C105.730009,5.28455821 105.760162,5.41283236 105.781521,5.57317504 C105.799739,5.73598453 105.811675,5.93517948 105.811675,6.16952648 C105.811675,6.61355238 105.770214,6.93238764 105.687919,7.12418215 C105.603112,7.31474327 105.485639,7.41033217 105.326076,7.41033217 L102.913785,7.41033217 L102.913785,12.5024457 C102.913785,13.0938636 103.008644,13.5385063 103.197104,13.8326734 C103.386192,14.1286906 103.726049,14.2773159 104.212904,14.2773159 C104.380006,14.2773159 104.527005,14.2631317 104.658298,14.2347634 C104.793362,14.2063951 104.908951,14.1737099 105.013232,14.1367077 C105.113744,14.1015557 105.20232,14.0688704 105.270794,14.0392688 C105.341781,14.0109005 105.407114,13.9960996 105.466164,13.9960996 C105.513908,13.9960996 105.561651,14.0109005 105.606881,14.0392688 C105.653368,14.0688704 105.687919,14.1243738 105.711163,14.2100953 C105.736919,14.2958171 105.760162,14.4105237 105.781521,14.5566823 C105.799739,14.7028408 105.811675,14.8884682 105.811675,15.1166483" id="Fill-6"></path><path d="M118.075877,11.6407705 L116.87918,11.6407705 C116.374708,11.6407705 115.94104,11.6738592 115.581967,11.7453542 C115.228584,11.813895 114.937154,11.9190696 114.712734,12.0585145 C114.488945,12.1985503 114.323317,12.3675387 114.220905,12.5672523 C114.114701,12.7646023 114.064127,12.9909049 114.064127,13.2461601 C114.064127,13.6816302 114.212687,14.023743 114.506646,14.2713169 C114.801237,14.5188908 115.210251,14.6447457 115.734952,14.6447457 C116.17431,14.6447457 116.58206,14.5407529 116.948718,14.3321763 C117.317906,14.1194637 117.695311,13.8139847 118.075877,13.4092398 L118.075877,11.6407705 Z M121.155177,16.0888282 C121.155177,16.1969572 121.114718,16.2814513 121.031904,16.3440834 C120.945297,16.4061246 120.81823,16.4516215 120.638062,16.4782105 C120.460422,16.5071631 120.194911,16.5183896 119.846585,16.5183896 C119.473605,16.5183896 119.200508,16.5071631 119.02919,16.4782105 C118.861032,16.4516215 118.739024,16.4061246 118.670749,16.3440834 C118.596785,16.2814513 118.563913,16.1969572 118.563913,16.0888282 L118.563913,15.2598398 C118.105589,15.7207172 117.585946,16.0781926 117.000556,16.3334478 C116.412638,16.5904755 115.7634,16.7175123 115.04968,16.7175123 C114.456705,16.7175123 113.917464,16.6448354 113.42121,16.5036179 C112.926221,16.3588551 112.500139,16.1443699 112.13917,15.8619347 C111.777569,15.577727 111.496253,15.2261603 111.298384,14.8084163 C111.098618,14.3865362 111,13.8984789 111,13.3401082 C111,12.7356498 111.124537,12.2085951 111.378669,11.7624894 C111.633434,11.3146111 112.008311,10.9476818 112.51215,10.6557928 C113.014725,10.3639038 113.640573,10.1482368 114.387798,10.0105645 C115.136287,9.86816517 116.002992,9.80080617 116.99297,9.80080617 L118.075877,9.80080617 L118.075877,9.17034953 C118.075877,8.84537188 118.041108,8.55761895 117.968409,8.31536288 C117.899502,8.06897074 117.784447,7.86571199 117.622612,7.7026323 C117.46204,7.54073434 117.246471,7.41901544 116.974637,7.34338428 C116.705333,7.26538965 116.368387,7.22580146 115.972016,7.22580146 C115.446051,7.22580146 114.982038,7.28075223 114.569231,7.38829028 C114.158321,7.49701008 113.794191,7.61636551 113.478106,7.75049264 C113.162021,7.88284718 112.900302,8.00161174 112.689158,8.1109224 C112.47422,8.21905133 112.303534,8.27400209 112.170146,8.27400209 C112.079114,8.27400209 111.997564,8.24741301 111.926761,8.19187138 C111.85659,8.13810235 111.79843,8.06010771 111.752914,7.95847834 C111.706133,7.8580307 111.671364,7.73394833 111.645445,7.58859469 C111.620791,7.4385141 111.610044,7.27543441 111.610044,7.09699214 C111.610044,6.85591781 111.629641,6.66624904 111.671364,6.52680408 C111.71372,6.38676826 111.792741,6.26150415 111.905899,6.14864827 C112.024747,6.03520153 112.228306,5.91230089 112.521,5.77403767 C112.809902,5.6405014 113.150642,5.51228295 113.541955,5.39765447 C113.930739,5.27948078 114.358086,5.18612357 114.818938,5.10990154 C115.277893,5.03899732 115.75455,5 116.245113,5 C117.117508,5 117.862204,5.08213072 118.482363,5.23871086 C119.09936,5.39942708 119.609522,5.64227401 120.009685,5.97316034 C120.40732,6.3016832 120.697486,6.72829022 120.88208,7.24825446 C121.06288,7.7682187 121.155177,8.3862671 121.155177,9.09885445 L121.155177,16.0888282 L121.155177,16.0888282 Z" id="Fill-7"></path><g id="logo/group"><g id="Group-4" transform="translate(1.361067, 2.523984)"><path d="M10.5814212,1.63605494 C10.564695,1.67309147 10.53184,1.70475173 10.490622,1.72685417 C10.464338,1.74298298 10.464338,1.74298298 10.464338,1.74298298 C10.3980306,1.76687752 10.3538257,1.82123759 10.3663704,1.86365038 C10.378915,1.90606318 10.4505986,1.92278936 10.5258664,1.90128428 C10.6017315,1.87918183 10.6817782,1.92577617 10.704478,2.00462814 L10.8532215,2.51537382 C10.8759213,2.59422579 10.9470076,2.64320958 11.0121202,2.62409395 C11.0766354,2.60557569 11.1100878,2.525529 11.0867906,2.44667703 L10.8299243,1.57691597 C10.8066272,1.49866137 10.7445014,1.44669075 10.6925308,1.4622222 C10.6405602,1.47715628 10.5999394,1.50164818 10.6029263,1.51658227 C10.6029263,1.51658227 10.6029263,1.51658227 10.604121,1.53868471 C10.604121,1.57691597 10.59755,1.60797886 10.5814212,1.63605494" id="Fill-8"></path><path d="M10.1196593,0.722088984 C10.0222891,0.369644596 10.0724676,0.0488604662 10.2307689,0.00465557682 C10.3872781,-0.0377572224 10.5933685,0.21433012 10.6877519,0.568566598 C10.7845247,0.920413623 10.7343462,1.24298984 10.5766423,1.28420792 C10.418341,1.32781544 10.2152374,1.0757281 10.1196593,0.722088984" id="Fill-9"></path><path d="M11.1542927,0.858287833 C11.3460463,0.544672063 11.6160545,0.363073599 11.7534481,0.447899197 C11.8932311,0.533919523 11.8484289,0.855898379 11.6584673,1.16712469 C11.465519,1.47894837 11.1961081,1.66413102 11.0581172,1.57691597 C10.9195289,1.49209037 10.9607469,1.16831942 11.1542927,0.858287833" id="Fill-10"></path><path d="M9.51034866,1.66532575 C9.20330389,1.46759847 9.02349751,1.19520077 9.11310202,1.05661247 C9.20270652,0.920413623 9.52349065,0.968800056 9.82874334,1.16712469 C10.1381776,1.36544933 10.3155945,1.63844439 10.2271847,1.77524061 C10.1387749,1.91263418 9.8179908,1.86365038 9.51034866,1.66532575" id="Fill-11"></path><path d="M8.62864033,3.49445238 C8.61729042,3.53686518 8.59518798,3.5756938 8.55934618,3.60854879 C8.53843846,3.63005387 8.53843846,3.63005387 8.53843846,3.63005387 C8.48168894,3.66947985 8.45361286,3.73339773 8.47631267,3.77103162 C8.49960984,3.80926288 8.57248817,3.80687343 8.6387955,3.76685008 C8.70510284,3.72622937 8.79410998,3.75012391 8.83652278,3.82061278 L9.11310202,4.2769984 C9.15551482,4.34688991 9.2373536,4.37616072 9.29529785,4.34151364 C9.35264473,4.30746393 9.36518936,4.22144361 9.3221792,4.15155209 L8.8508595,3.37557707 C8.8084467,3.3050882 8.73556837,3.27044112 8.68957139,3.2985172 C8.64297705,3.32659328 8.61012206,3.36064299 8.61549833,3.37438235 C8.61549833,3.37438235 8.61549833,3.37438235 8.6208746,3.39648479 C8.63043242,3.43292396 8.63162714,3.46577894 8.62864033,3.49445238" id="Fill-12"></path><path d="M7.94525663,2.73161936 C7.76126871,2.41441941 7.72781636,2.09184319 7.86759939,2.00821232 C8.00977187,1.92756826 8.27201439,2.11872454 8.45480759,2.43472977 C8.63939287,2.75133235 8.67165049,3.07450594 8.53246482,3.15813681 C8.39029234,3.23937823 8.1268551,3.04762458 7.94525663,2.73161936" id="Fill-13"></path><path d="M8.97988999,2.59780997 C9.08681803,2.2465603 9.29888203,2.00104396 9.45479387,2.0476383 C9.61070571,2.09483001 9.65252114,2.41800359 9.54499574,2.76805853 C9.44045715,3.11811346 9.22779579,3.36482453 9.07128658,3.3164381 C8.91418002,3.27044112 8.87415667,2.94846226 8.97988999,2.59780997" id="Fill-14"></path><path d="M7.59699379,3.79791298 C7.24753621,3.6850113 7.00859087,3.4681684 7.05637994,3.31225656 C7.10775319,3.15694208 7.42973204,3.12289237 7.77918961,3.23579405 C8.12804982,3.34869572 8.36938462,3.56673335 8.31621928,3.72204783 C8.26902758,3.8773623 7.94585399,3.91081465 7.59699379,3.79791298" id="Fill-15"></path><path d="M13.0222479,1.78659051 C12.9828219,1.77404588 12.9445907,1.74716453 12.9159172,1.70893327 C12.897399,1.6856361 12.897399,1.6856361 12.897399,1.6856361 C12.8633493,1.6253024 12.8030156,1.59125269 12.7629922,1.61036832 C12.7229689,1.62948394 12.7175926,1.70236227 12.7510449,1.77285115 C12.7850947,1.84334003 12.7516423,1.92995772 12.6775692,1.96579952 L12.1978865,2.19638178 C12.1244108,2.23222358 12.0873742,2.31047819 12.1160477,2.37081189 C12.1447211,2.43054822 12.2289494,2.45085858 12.3030224,2.41501677 L13.1214102,2.02075695 C13.1954833,1.98491515 13.236104,1.91621836 13.2122095,1.86723456 C13.1889123,1.81884813 13.157252,1.78300633 13.1423179,1.78778524 C13.1423179,1.78778524 13.1423179,1.78778524 13.1214102,1.79077205 C13.083179,1.79794041 13.0515187,1.79614832 13.0222479,1.78659051" id="Fill-16"></path><path d="M13.8484015,1.17966933 C14.1811329,1.02734167 14.5043064,1.02435485 14.5718085,1.17309833 C14.6411026,1.32184181 14.4248571,1.56556606 14.0951125,1.71729636 C13.7611864,1.86902665 13.4356234,1.8732082 13.3681213,1.72386736 C13.2994245,1.5763186 13.5144753,1.33199699 13.8484015,1.17966933" id="Fill-17"></path><path d="M13.8824512,2.2238605 C14.2217536,2.36185143 14.4475569,2.59780997 14.3842364,2.74774817 C14.3233053,2.90007583 13.9983397,2.91082837 13.6584399,2.77164271 C13.3203322,2.63185968 13.096321,2.39769324 13.157252,2.2465603 C13.2199752,2.09483001 13.5425514,2.08467483 13.8824512,2.2238605" id="Fill-18"></path><path d="M12.8191444,0.733438888 C12.964901,0.397123311 13.2050411,0.177293591 13.3537846,0.241211471 C13.5031254,0.307518805 13.5067096,0.631289752 13.3603556,0.968202693 C13.2151963,1.30332354 12.978043,1.52375063 12.8287022,1.45923538 C12.6781666,1.39412278 12.6763745,1.06855974 12.8191444,0.733438888" id="Fill-19"></path><path d="M6.28757328,1.79734305 C6.25651038,1.82482177 6.21469495,1.84095058 6.16690588,1.84572948 C6.13644035,1.84991103 6.13644035,1.84991103 6.13644035,1.84991103 C6.06595147,1.84572948 6.00382568,1.87858447 5.99844941,1.92278936 C5.99307314,1.96639688 6.05221211,2.01000441 6.12986935,2.01896486 C6.20692922,2.02732795 6.26248402,2.10140101 6.2529262,2.18264242 L6.19139778,2.7131011 C6.18183996,2.79493988 6.22903167,2.86781821 6.295339,2.87558393 C6.3622437,2.88334966 6.42436949,2.82301596 6.4339273,2.74117717 L6.53906326,1.84095058 C6.54862107,1.75911179 6.51158454,1.68742819 6.45782184,1.68145456 C6.40346177,1.67548092 6.35686743,1.68205192 6.35447798,1.69579128 C6.35447798,1.69579128 6.35447798,1.69579128 6.3443228,1.716699 C6.32938871,1.75134607 6.31206518,1.7770327 6.28757328,1.79734305" id="Fill-20"></path><path d="M6.21887649,0.776449051 C6.26905501,0.412057395 6.43930357,0.136075518 6.6035785,0.158775326 C6.76486661,0.182072498 6.85327639,0.493298814 6.80309787,0.855898379 C6.75291934,1.21969267 6.58267078,1.49388246 6.41959058,1.47237738 C6.25830247,1.4508723 6.1681006,1.13904862 6.21887649,0.776449051" id="Fill-21"></path><path d="M7.11850573,1.305713 C7.41778478,1.09424636 7.73737418,1.03092585 7.83056286,1.16413788 C7.92315419,1.29675255 7.7582819,1.57691597 7.45900285,1.78778524 C7.16211325,1.99984923 6.84252385,2.06316975 6.74754307,1.92936036 C6.65435439,1.79734305 6.81803195,1.51658227 7.11850573,1.305713" id="Fill-22"></path><path d="M5.287587,1.40368059 C5.08269136,1.10081736 5.02713657,0.781227958 5.16214069,0.689831362 C5.29714481,0.598434767 5.57372405,0.768085964 5.77921705,1.07094919 C5.98411269,1.37500715 6.04086221,1.69459655 5.90585809,1.78659051 C5.77384078,1.87858447 5.49546945,1.70714118 5.287587,1.40368059" id="Fill-23"></path><path d="M3.92141697,2.03389894 C3.93754578,2.07451965 3.93874051,2.11872454 3.92679324,2.16531889 C3.91902752,2.19697914 3.91902752,2.19697914 3.91902752,2.19697914 C3.8915488,2.2597023 3.90110662,2.32780172 3.94112996,2.34811208 C3.98055594,2.36842243 4.04208437,2.32780172 4.07732881,2.25791021 C4.11257325,2.18801869 4.20158039,2.16053998 4.27505609,2.19757651 L4.74995996,2.43771658 C4.8228383,2.47475311 4.90766389,2.45623485 4.93812943,2.39649851 C4.96859496,2.33616481 4.93335052,2.25731285 4.85987482,2.22027632 L4.04925273,1.81347186 C3.97577704,1.77643533 3.89573035,1.78599315 3.87183581,1.83497694 C3.84734391,1.88336338 3.83718874,1.92995772 3.849136,1.93891817 C3.849136,1.93891817 3.849136,1.93891817 3.86526481,1.95385225 C3.89274353,1.97953888 3.91245652,2.00582287 3.92141697,2.03389894" id="Fill-24"></path><path d="M2.93875423,1.75134607 C2.61558064,1.57870806 2.41606128,1.32303653 2.49013434,1.17907196 C2.56779157,1.03391266 2.89096516,1.05661247 3.21413874,1.22805576 C3.53910441,1.39949905 3.73922114,1.6545732 3.6615639,1.79913514 C3.58629612,1.94250235 3.26192781,1.92099727 2.93875423,1.75134607" id="Fill-25"></path><path d="M3.74519478,1.08648064 C3.64842191,0.732841525 3.69740571,0.411460032 3.85331755,0.369644596 C4.01161884,0.325439707 4.21830657,0.577527049 4.31448207,0.929971437 C4.40946284,1.28301319 4.36346586,1.60319996 4.20396984,1.64740484 C4.04686328,1.68981764 3.84316237,1.43892503 3.74519478,1.08648064" id="Fill-26"></path><path d="M3.21055456,2.83795004 C2.85452599,2.92695718 2.53613132,2.87140239 2.49790006,2.71250373 C2.45548726,2.5547998 2.71295087,2.35289098 3.06658999,2.26507857 C3.42202119,2.17547406 3.74220796,2.23102886 3.78163394,2.38933015 C3.82046256,2.54763144 3.5653884,2.74954026 3.21055456,2.83795004" id="Fill-27"></path><path d="M5.27802918,4.40005525 C5.31387099,4.42275506 5.34612861,4.45680477 5.36106269,4.50160703 C5.37300996,4.52848838 5.37300996,4.52848838 5.37300996,4.52848838 C5.39212559,4.59718517 5.44349884,4.64616896 5.486509,4.63780587 C5.53011653,4.62944279 5.55281633,4.56014864 5.53788225,4.48308876 C5.52294817,4.40662625 5.57671087,4.3307611 5.65735492,4.31522965 L6.17945051,4.21367788 C6.26009456,4.19814643 6.31564936,4.1318391 6.30310473,4.06612913 C6.2905601,4.00101652 6.21409758,3.96039581 6.13345353,3.97592726 L5.24577156,4.14916264 C5.16512751,4.16469409 5.10718326,4.22084624 5.11674107,4.27460895 C5.12629889,4.32777429 5.14660924,4.37018708 5.16214069,4.36899236 C5.16214069,4.36899236 5.16214069,4.36899236 5.18424313,4.37138181 C5.22127966,4.37556336 5.25293992,4.38452381 5.27802918,4.40005525" id="Fill-28"></path><path d="M4.32642934,4.77699154 C3.96621922,4.83911733 3.65200609,4.76026537 3.62333265,4.59897726 C3.59406184,4.43948124 3.86526481,4.25728541 4.22487756,4.19575698 C4.58747713,4.1318391 4.90228762,4.21188579 4.92976634,4.37377127 C4.95724505,4.53326728 4.68723681,4.71546311 4.32642934,4.77699154" id="Fill-29"></path><path d="M4.55760896,3.75908436 C4.26729036,3.53746255 4.10898907,3.25490967 4.20695666,3.1240871 C4.30432689,2.99386188 4.6221242,3.06554548 4.91483225,3.28597257 C5.20634558,3.50759438 5.36345215,3.79253671 5.26369246,3.92276192 C5.16572487,4.05238977 4.84912228,3.97891408 4.55760896,3.75908436" id="Fill-30"></path><path d="M5.20694294,5.4723225 C4.98113959,5.75905692 4.69440517,5.91198194 4.56597205,5.81043017 C4.43753892,5.71007312 4.51519616,5.39347054 4.74338897,5.10554139 C4.96799759,4.81940434 5.25771883,4.66528459 5.3837625,4.76683636 C5.51159826,4.86838814 5.43334366,5.18379599 5.20694294,5.4723225" id="Fill-31"></path><path d="M2.67770643,5.29550295 C2.67770643,5.33911047 2.66336971,5.38212063 2.63768309,5.42214398 C2.6179701,5.44544115 2.6179701,5.44544115 2.6179701,5.44544115 C2.56958366,5.49621704 2.55464958,5.56431646 2.58451775,5.59657408 C2.61438592,5.62942907 2.68547216,5.61330026 2.7434164,5.56073228 C2.80076329,5.50876167 2.89395197,5.51533267 2.94950677,5.57566637 L3.30911952,5.96693937 C3.36467431,6.02727307 3.45069463,6.04041507 3.49967843,5.99501545 C3.54925959,5.94961584 3.54388332,5.86359551 3.48832853,5.80326181 L2.87423898,5.13660429 C2.81868419,5.07627059 2.74042959,5.0565576 2.70100361,5.09299676 C2.66098026,5.12943593 2.63529363,5.16945927 2.64305936,5.18140654 C2.64305936,5.18140654 2.64305936,5.18140654 2.65261717,5.20350899 C2.67113544,5.23516924 2.67890116,5.26563478 2.67770643,5.29550295" id="Fill-32"></path><path d="M1.85812389,4.6814134 C1.61559436,4.40841834 1.5188215,4.09778939 1.64307308,3.98966662 C1.76314311,3.88154385 2.06122744,4.01714533 2.30136751,4.29133512 C2.54150759,4.567317 2.6406699,4.87794595 2.51821041,4.98487399 C2.39395883,5.0923994 2.09945869,4.95918737 1.85812389,4.6814134" id="Fill-33"></path><path d="M2.84795499,4.34688991 C2.88319943,3.98130353 3.04150073,3.69994538 3.20517829,3.71547683 C3.36706376,3.73100828 3.47160235,4.03865041 3.43635791,4.40244471 C3.40171084,4.76683636 3.24042273,5.0499866 3.07853726,5.03505252 C2.91844387,5.01832634 2.81211319,4.71128157 2.84795499,4.34688991" id="Fill-34"></path><path d="M1.7290934,5.79728818 C1.36470175,5.75547274 1.08394096,5.59000309 1.10425132,5.42692289 C1.12217222,5.26444005 1.43100908,5.16886191 1.79480337,5.21007998 C2.15919503,5.25249278 2.43876109,5.41736507 2.42143755,5.57865318 C2.40172456,5.74053866 2.09288769,5.83910361 1.7290934,5.79728818" id="Fill-35"></path><path d="M11.7164116,4.2459355 C11.6913223,4.2100937 11.6757909,4.1676809 11.6757909,4.11989183 C11.6757909,4.08823157 11.6757909,4.08823157 11.6757909,4.08823157 C11.6877381,4.02013215 11.6614542,3.95621427 11.6178466,3.94665646 C11.5742391,3.93709864 11.5252553,3.99145871 11.5097239,4.06792122 C11.493595,4.14438373 11.4147431,4.19277016 11.3346964,4.17544663 L10.8126008,4.06433704 C10.7319568,4.04761087 10.6548969,4.08703685 10.6405602,4.15214945 C10.6268208,4.21726206 10.6805835,4.28416676 10.7612276,4.3014903 L11.6489095,4.49025712 C11.7289562,4.5069833 11.804224,4.47771249 11.8155739,4.42454715 C11.8275212,4.37138181 11.823937,4.32419011 11.8078082,4.32000856 C11.8078082,4.32000856 11.8078082,4.32000856 11.7892899,4.30925602 C11.7558376,4.29133512 11.7325404,4.2704274 11.7164116,4.2459355" id="Fill-36"></path><path d="M12.7390977,4.27281686 C13.0951262,4.35644773 13.3537846,4.55238291 13.3167481,4.71187893 C13.2785168,4.87197232 12.9601221,4.93051393 12.6040936,4.84807778 C12.2492597,4.76265482 11.9882119,4.56612227 12.0252484,4.40722361 C12.0610903,4.24832496 12.3824717,4.18679653 12.7390977,4.27281686" id="Fill-37"></path><path d="M12.1279949,5.11868339 C12.308996,5.43468861 12.341851,5.75786219 12.2008733,5.83970098 C12.0592982,5.92034503 11.7958609,5.73157821 11.6148598,5.41318353 C11.432664,5.09419149 11.3974195,4.77221263 11.5419815,4.69037385 C11.6811671,4.60853507 11.9434097,4.80088607 12.1279949,5.11868339" id="Fill-38"></path><path d="M12.2008733,3.28836202 C12.5222548,3.11154246 12.8460257,3.08525848 12.9224882,3.22922305 C13.0007428,3.37079817 12.8060024,3.63005387 12.4840235,3.8056787 C12.1632394,3.98130353 11.8400658,4.00937961 11.7600191,3.8660124 C11.6829592,3.72324256 11.8794918,3.46398685 12.2008733,3.28836202" id="Fill-39"></path><path d="M14.3143449,5.15870673 C14.2695426,5.16169355 14.2259351,5.14974628 14.184717,5.12405966 C14.158433,5.10733348 14.158433,5.10733348 14.158433,5.10733348 C14.1058651,5.06312859 14.0371683,5.05297342 14.0067027,5.08463368 C13.9756399,5.11629393 13.9965476,5.18678281 14.0521024,5.24054552 C14.1082545,5.29490558 14.1076572,5.3874969 14.0509076,5.44663588 L13.6823344,5.83074052 C13.6255849,5.8898795 13.6184166,5.97649719 13.666803,6.02249417 C13.7151894,6.06908851 13.8012097,6.05893333 13.8579593,5.99919699 L14.4851908,5.34448674 C14.5419403,5.2847504 14.5568744,5.20589844 14.5180458,5.16826455 C14.4792172,5.13063065 14.4368044,5.10733348 14.4236624,5.11629393 C14.4236624,5.11629393 14.4236624,5.11629393 14.4069362,5.12764384 C14.3734839,5.14675947 14.3418236,5.15810937 14.3143449,5.15870673" id="Fill-40"></path><path d="M14.8722823,4.30208766 C15.1309406,4.04342932 15.4367907,3.92694346 15.5514844,4.04223459 C15.6667756,4.15752573 15.549095,4.46218104 15.2892419,4.72083938 C15.0305836,4.978303 14.7295124,5.09419149 14.6124292,4.978303 C14.4977354,4.86301187 14.6148187,4.560746 14.8722823,4.30208766" id="Fill-41"></path><path d="M15.2707236,5.26802423 C15.63631,5.2799715 15.9290181,5.42214398 15.9224471,5.58462682 C15.9170708,5.74710965 15.6177918,5.87136123 15.2545948,5.85821924 C14.886619,5.84627197 14.5951057,5.70529422 14.5992872,5.54161665 C14.6040661,5.37913382 14.9069293,5.2554796 15.2707236,5.26802423" id="Fill-42"></path><path d="M13.7546154,4.24354605 C13.7719389,3.8773623 13.9194877,3.58764107 14.0831653,3.59600416 C14.2480375,3.60436724 14.363926,3.90723047 14.3442131,4.27341422 C14.3245001,4.63780587 14.1793408,4.92812447 14.0144685,4.91976139 C13.8513883,4.91080093 13.7354998,4.60734034 13.7546154,4.24354605" id="Fill-43"></path><path d="M1.57975256,7.11805859 C1.62216536,7.13120058 1.6574098,7.15748457 1.68488851,7.19930001 C1.70400414,7.22080509 1.70400414,7.22080509 1.70400414,7.22080509 C1.73506704,7.28293088 1.79360865,7.31996741 1.83482672,7.3020465 C1.87544743,7.28472297 1.88381052,7.21184464 1.85215026,7.1407584 C1.82049,7.06907479 1.8563318,6.98424919 1.93159958,6.95139421 L2.42084018,6.73694076 C2.49610797,6.70408577 2.53553395,6.6270259 2.50805524,6.56609483 C2.48057652,6.50456641 2.39694565,6.48126923 2.32167787,6.51472158 L1.49373223,6.87791851 C1.41846445,6.9107735 1.37485692,6.97887292 1.39636201,7.02964881 C1.41786709,7.07982733 1.44713789,7.11686386 1.46207198,7.11208495 C1.46207198,7.11208495 1.46207198,7.11208495 1.4811876,7.1096955 C1.51941886,7.10372187 1.55227384,7.10730605 1.57975256,7.11805859" id="Fill-45"></path><path d="M0.735080755,7.69331951 C0.397570451,7.83429727 0.0708126871,7.82533682 0.0110763501,7.67241179 C-0.0534388938,7.52426568 0.17057237,7.28770978 0.508680037,7.14852412 C0.847385068,7.006949 1.17235074,7.01650681 1.23268444,7.16704238 C1.29839441,7.31698059 1.07557788,7.55473121 0.735080755,7.69331951" id="Fill-46"></path><path d="M0.736872845,6.64912834 C0.405336174,6.49799541 0.190285361,6.25546588 0.256592695,6.10731976 C0.323497393,5.95738156 0.649657793,5.96096574 0.98238919,6.11209867 C1.31571795,6.26203688 1.53196349,6.50337168 1.46386407,6.65330989 C1.39755673,6.80384545 1.0719937,6.80026127 0.736872845,6.64912834" id="Fill-47"></path><path d="M1.7470143,8.17718384 C1.58811565,8.50812315 1.34498876,8.71839506 1.19445319,8.64850354 C1.04809916,8.57920939 1.05467016,8.25484108 1.21416618,7.92390177 C1.37007802,7.59176774 1.61798382,7.38269056 1.76553257,7.45138735 C1.91367868,7.52187623 1.90591296,7.84624454 1.7470143,8.17718384" id="Fill-48"></path><path d="M12.6901139,7.72975868 C12.6453116,7.73394022 12.6058856,7.75126376 12.5688491,7.78352138 C12.5485388,7.80383174 12.5485388,7.80383174 12.5485388,7.80383174 C12.5019444,7.85639971 12.4356371,7.87790479 12.3997953,7.85162081 C12.3645508,7.82533682 12.3735113,7.75245849 12.4201056,7.68973533 C12.4667,7.62760954 12.4511685,7.53561558 12.3854586,7.48663179 L11.9595385,7.16644502 C11.8938285,7.11746122 11.8729208,7.03323299 11.9129441,6.97947029 C11.9529675,6.92630495 12.0395852,6.92272077 12.1052951,6.97230192 L12.8292995,7.51649995 C12.8950095,7.56548375 12.9218909,7.64194626 12.8890359,7.68555379 C12.8567783,7.72916131 12.8191444,7.75843212 12.8065997,7.75126376 C12.8065997,7.75126376 12.8065997,7.75126376 12.7874841,7.74230331 C12.7522397,7.72975868 12.71819,7.72497977 12.6901139,7.72975868" id="Fill-49"></path><path d="M13.382458,8.48183916 C13.6811397,8.69688997 13.9983397,8.76080785 14.0939178,8.63058264 C14.1877038,8.49796797 14.0228316,8.21601246 13.725942,8.00275374 C13.4272603,7.78830029 13.1124498,7.72318768 13.0138848,7.85580235 C12.9183067,7.98901438 13.083179,8.26858044 13.382458,8.48183916" id="Fill-50"></path><path d="M13.6160271,7.4651267 C13.9768346,7.39284574 14.243856,7.20766309 14.211001,7.04816707 C14.1793408,6.88687896 13.8627382,6.81220854 13.5031254,6.88448951 C13.1423179,6.95677048 12.8770886,7.14314785 12.9087489,7.3038386 C12.9422012,7.46333461 13.2576091,7.53561558 13.6160271,7.4651267" id="Fill-51"></path><path d="M12.2851015,8.7225766 C12.3639535,9.08099462 12.5557071,9.34144505 12.7146058,9.30620061 C12.8752965,9.27334563 12.9422012,8.95435359 12.8633493,8.59593556 C12.7862894,8.23930963 12.5939384,7.97706711 12.433845,8.01290892 C12.2731542,8.04695863 12.2062495,8.36475594 12.2851015,8.7225766" id="Fill-52"></path><path d="M4.40826812,7.8826837 C4.45068092,7.88686524 4.4901069,7.90657824 4.52714343,7.93704377 C4.55223269,7.95675676 4.55223269,7.95675676 4.55223269,7.95675676 C4.59763231,8.00932474 4.66393964,8.03082982 4.69918408,8.00454583 C4.73383115,7.97826184 4.72427334,7.90538351 4.67708163,7.84325772 C4.62988993,7.78053456 4.64542137,7.68973533 4.71113135,7.64015417 L5.13884352,7.32056477 C5.20515085,7.27158097 5.22605857,7.18735274 5.18663259,7.13359003 C5.14660924,7.07982733 5.06058892,7.07564579 4.99487895,7.12522695 L4.266693,7.6706197 C4.20098303,7.7196035 4.17410168,7.79546865 4.20755402,7.83847881 C4.24040901,7.88208634 4.2780429,7.91075978 4.2911849,7.90299406 C4.2911849,7.90299406 4.2911849,7.90299406 4.30970316,7.89642306 C4.34673969,7.88328106 4.37660786,7.87790479 4.40826812,7.8826837" id="Fill-53"></path><path d="M3.71413188,8.63655627 C3.4202291,8.85220445 3.09944497,8.9149276 3.00207474,8.7829103 C2.90948342,8.65089299 3.07435571,8.36893748 3.37064794,8.1550814 C3.66694017,7.94361476 3.98652958,7.87790479 4.08389981,8.01111683 C4.17708849,8.14134204 4.01400829,8.42270019 3.71413188,8.63655627" id="Fill-54"></path><path d="M3.47996544,7.61805173 C3.12214478,7.54816021 2.85452599,7.36118548 2.88618625,7.2010921 C2.91844387,7.03980399 3.23564382,6.96692565 3.59406184,7.0380119 C3.95367459,7.1096955 4.21890393,7.2972676 4.18903576,7.45676362 C4.15618077,7.61625964 3.84196764,7.68973533 3.47996544,7.61805173" id="Fill-55"></path><path d="M4.81208575,8.87789108 C4.73323379,9.23451701 4.54148015,9.49675953 4.38198413,9.46151509 C4.22248811,9.42627065 4.15618077,9.1090707 4.23443538,8.75125004 C4.31089789,8.39283202 4.50384626,8.13118686 4.66274491,8.16583394 C4.82403302,8.19988365 4.89153508,8.51827833 4.81208575,8.87789108" id="Fill-56"></path><path d="M15.483385,6.90659195 C15.4684509,6.86417915 15.4672562,6.82116899 15.476814,6.77517201 C15.4845797,6.74590121 15.4845797,6.74590121 15.4845797,6.74590121 C15.5114611,6.6807886 15.5001112,6.61089709 15.4600878,6.59178146 C15.4200645,6.57206847 15.3597308,6.61328654 15.3256811,6.68317805 C15.2922287,6.75366693 15.2038189,6.78114565 15.1303432,6.74470648 L14.6524525,6.50934531 C14.5789769,6.47290615 14.4941513,6.49202178 14.4648805,6.55235548 C14.4350123,6.61209181 14.4708541,6.69034641 14.5443298,6.72678558 L15.3561466,7.12701904 C15.4296223,7.1634582 15.509669,7.15330303 15.5335635,7.10491659 C15.5580554,7.05653016 15.5682106,7.00993582 15.5568607,7.00217009 C15.5568607,7.00217009 15.5568607,7.00217009 15.5407319,6.98604128 C15.5150453,6.96095202 15.4923454,6.9352654 15.483385,6.90659195" id="Fill-57"></path><path d="M16.4684372,7.18376856 C16.7945976,7.35162766 16.9965064,7.60610446 16.9224334,7.75126376 C16.8459708,7.89522833 16.5221999,7.8761127 16.1966369,7.70586414 C15.8734633,7.53800504 15.669165,7.2841256 15.7456275,7.13777158 C15.8208953,6.99380701 16.1452636,7.01471472 16.4684372,7.18376856" id="Fill-58"></path><path d="M15.669165,7.85281553 C15.7671326,8.20585728 15.7205383,8.52783614 15.5640291,8.5708463 C15.4051304,8.61445383 15.1966506,8.36475594 15.1004751,8.01290892 C14.9989233,7.65986716 15.0467124,7.3396804 15.2038189,7.29368342 C15.3615229,7.25007589 15.568808,7.50037114 15.669165,7.85281553" id="Fill-59"></path><path d="M16.1864817,6.09656722 C16.5425103,6.00457327 16.8620997,6.0595307 16.9039151,6.21663726 C16.9445358,6.37314646 16.6906564,6.57684737 16.3376146,6.66824397 C15.9821834,6.76203002 15.662594,6.70647523 15.6201812,6.54936866 C15.5795605,6.39226209 15.8328426,6.18975591 16.1864817,6.09656722" id="Fill-60"></path></g><path d="M19.0128813,9.86485869 L19.0146734,9.87979278 C19.0146734,9.87979278 18.8904219,13.8176121 16.4537767,15.1843795 C16.3175778,15.2775682 15.7429143,15.5302529 15.592976,15.5660947 C15.2769708,15.6658544 14.9406552,15.7226039 14.5923924,15.7226039 C13.4932438,15.7226039 12.5201389,15.1790032 11.9221781,14.3498629 C11.9173992,14.3414998 11.9114256,14.3337341 11.9048546,14.3271631 C11.8899205,14.3044633 11.8755838,14.2835555 11.859455,14.259661 C11.6718829,13.988458 11.5261262,13.6879843 11.4299507,13.3701869 C11.3487093,13.0852446 11.3045044,12.7835761 11.3045044,12.4735445 C11.3045044,12.0565849 11.3809669,11.6581435 11.5231394,11.2925571 C11.7650716,10.5763185 12.2089126,10.1091803 12.6724665,9.8027329 C13.2142751,9.41325198 13.8588302,9.15758046 14.5750689,9.15758046 C14.7214229,9.15758046 15.7429143,9.14025692 15.7924954,9.06737859 C15.8862815,8.93715338 15.3546281,8.74659446 15.3546281,8.74659446 C13.5804589,8.21374634 12.5058022,8.5536461 11.3427357,9.2776505 C11.3427357,9.2776505 11.2925571,9.30393449 11.2256524,9.31886857 C11.1008035,9.2352377 11.1354506,9.03751043 11.1354506,9.03751043 C11.2961413,7.35175099 12.0972056,6.18868451 13.2740114,5.24007148 C13.357045,5.18033514 13.5028016,5.03577321 13.4520257,4.91570317 C13.4293259,4.85716156 13.1133207,4.71976799 12.4048477,5.20781386 C11.5117895,5.88582128 10.6408337,6.56621816 9.87023496,8.58530635 C9.87023496,8.58530635 9.87023496,8.59068262 9.86485869,8.59844835 C9.8630666,8.59068262 9.86067715,8.58530635 9.86067715,8.58530635 C9.08888367,6.56621816 8.21852524,5.88582128 7.32666173,5.20781386 C6.61878614,4.71976799 6.36430934,4.86910883 6.33444118,4.92585835 C6.26454966,5.05608356 6.37386716,5.18033514 6.45809539,5.24007148 C7.63131705,6.18868451 8.43477078,7.35175099 8.59546153,9.03751043 C8.59546153,9.03751043 8.63130333,9.2352377 8.50167548,9.31886857 C8.44014705,9.30393449 8.38937117,9.2776505 8.38937117,9.2776505 C7.22331787,8.5536461 6.14925853,8.21374634 4.3786735,8.74659446 C4.3786735,8.74659446 3.84582538,8.93715338 3.93483252,9.06737859 C3.98859522,9.14025692 4.94258452,9.11636239 5.091328,9.11636239 C5.80756668,9.11636239 6.51783173,9.41325198 7.05725085,9.8027329 C7.52438901,10.1091803 7.96464581,10.5763185 8.2077727,11.2925571 C8.34755573,11.6581435 8.42581033,12.0565849 8.42581033,12.4735445 C8.42581033,12.7847708 8.38339753,13.0852446 8.30155875,13.3713817 C8.20418852,13.6903737 8.05843186,13.988458 7.87265185,14.259661 C7.85652304,14.2835555 7.84099159,14.3044633 7.82605751,14.3271631 C7.82008388,14.3337341 7.81590233,14.3414998 7.80813661,14.3498629 C7.21316269,15.1790032 6.23826567,15.7226039 5.13732498,15.7226039 C4.78906214,15.7226039 4.45274656,15.6658544 4.13913079,15.5660947 C3.98859522,15.5302529 3.41572375,15.2775682 3.27833017,15.1843795 C0.842879715,13.8176121 0.715043954,9.87979278 0.715043954,9.87979278 L0.716836044,9.86485869 C0.716836044,5.36611515 3.96589541,1.62662046 8.24600396,0.86139798 C8.77108636,0.76761193 9.3134923,0.719225498 9.86485869,0.719225498 C14.9179554,0.719225498 19.0128813,4.81295667 19.0128813,9.86485869 Z M19.7034334,9.10620721 C19.3139525,4.01248976 15.0583358,4.51894867e-23 9.86485869,4.51894867e-23 C4.41690476,4.51894867e-23 1.19949929e-24,4.41690476 1.19949929e-24,9.86485869 C1.19949929e-24,15.3146047 4.41690476,19.7321068 9.86485869,19.7321068 C15.0583358,19.7321068 19.3139525,15.7190197 19.7034334,10.6247049 C19.7219517,10.3732149 19.7321068,10.1205302 19.7321068,9.86485869 C19.7321068,9.60918717 19.7219517,9.35650246 19.7034334,9.10620721 L19.7034334,9.10620721 Z" id="Fill-44"></path></g></g></g></svg></span></li>
        <li class="logo"><span class="logo-mark logo-svg logo-indegene" data-logo="Indegene" role="img" aria-label="Indegene"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 446.78 90.88"><rect class="ind-1" x="22.12" y="50.09" width="12.43" height="24.29"/><rect class="ind-1" y="19.38" width="12.43" height="54.99"/><path class="ind-1" d="M148.56,67.38a17.35,17.35,0,0,0-3.4-5.45,14.47,14.47,0,0,0-5-3.51,14.83,14.83,0,0,0-5.89-1.22,15.46,15.46,0,0,0-5.94,1.17,14.48,14.48,0,0,0-4.92,3.41,16,16,0,0,0-3.35,5.45,20.47,20.47,0,0,0-1.22,7.28,19.91,19.91,0,0,0,1.22,7.18,16,16,0,0,0,3.35,5.45,15.05,15.05,0,0,0,4.92,3.46,14.9,14.9,0,0,0,16.81-3.51,17.54,17.54,0,0,0,3.4-5.45,20.65,20.65,0,0,0,0-14.26m1.07,34v-9a27.82,27.82,0,0,1-7.37,7.13,19.23,19.23,0,0,1-10.92,3,24.18,24.18,0,0,1-9.25-1.83,22.94,22.94,0,0,1-7.93-5.45,28.19,28.19,0,0,1-5.59-8.81,31.18,31.18,0,0,1-2.13-11.92,32,32,0,0,1,2.08-11.92,27.22,27.22,0,0,1,5.54-8.81,22.67,22.67,0,0,1,8-5.45,24.55,24.55,0,0,1,9.3-1.84,19.68,19.68,0,0,1,11,2.85A30.17,30.17,0,0,1,149.63,56V27h12.43v74.36H149.63Z" transform="translate(-22.47 -27.03)"/><path class="ind-1" d="M207.64,70.74a20.85,20.85,0,0,0-1.32-5.55,14.36,14.36,0,0,0-2.75-4.48,13.09,13.09,0,0,0-4.13-3A12.82,12.82,0,0,0,194,56.58a12.44,12.44,0,0,0-9.42,3.92A17.68,17.68,0,0,0,180,70.74ZM185.43,89a15.3,15.3,0,0,0,10.19,3.51,18.05,18.05,0,0,0,7.95-1.63,25.52,25.52,0,0,0,6.62-4.79l7.23,6.42a29.73,29.73,0,0,1-9.22,7.33,27.67,27.67,0,0,1-12.78,2.75,28.66,28.66,0,0,1-10.85-2A26,26,0,0,1,170,86.06a29.69,29.69,0,0,1-2.14-11.46,30.24,30.24,0,0,1,1.94-10.9,27.4,27.4,0,0,1,5.45-8.91,26.19,26.19,0,0,1,8.3-6.06,24.72,24.72,0,0,1,10.59-2.24,25.52,25.52,0,0,1,11.25,2.34,23.21,23.21,0,0,1,8,6.32,27.48,27.48,0,0,1,4.84,9.27,37.42,37.42,0,0,1,1.63,11.11c0,.54,0,1.09-.05,1.63s-.09,1.12-.15,1.73H180.14q1.11,6.61,5.3,10.14" transform="translate(-22.47 -27.03)"/><path class="ind-1" d="M268,65.74a14.12,14.12,0,0,0-3.41-4.7,15.37,15.37,0,0,0-5-3A17.5,17.5,0,0,0,253.48,57a16.82,16.82,0,0,0-6,1.07,15.17,15.17,0,0,0-4.84,3,13.43,13.43,0,0,0-3.26,4.65,15.25,15.25,0,0,0-1.17,6.07,14.76,14.76,0,0,0,1.22,6.07,15,15,0,0,0,3.26,4.71,13.94,13.94,0,0,0,4.84,3,16.62,16.62,0,0,0,6,1.06,17.41,17.41,0,0,0,6.06-1.06A14.77,14.77,0,0,0,268,77.89a13.84,13.84,0,0,0,1.27-6A14.51,14.51,0,0,0,268,65.75m5.86,45.54q-7.55,6.61-21.39,6.62a44.8,44.8,0,0,1-24-6.42l4.58-9.27a40.7,40.7,0,0,0,9,4.17,32.64,32.64,0,0,0,10.19,1.53q8.25,0,12.63-4.19t4.38-12.38v-4.2a29,29,0,0,1-7.85,7.2,20.73,20.73,0,0,1-11.1,2.78,25.31,25.31,0,0,1-9.16-1.68,23.2,23.2,0,0,1-7.79-4.94,24.18,24.18,0,0,1-5.45-8,26.56,26.56,0,0,1-2-10.7,26.51,26.51,0,0,1,2-10.69,24.39,24.39,0,0,1,5.45-8,23.72,23.72,0,0,1,7.84-5,24.91,24.91,0,0,1,9.12-1.73,21.17,21.17,0,0,1,11.26,2.73,30.55,30.55,0,0,1,7.59,6.53V47.62h12.32V90.4q0,14.26-7.54,20.88" transform="translate(-22.47 -27.03)"/><path class="ind-1" d="M327,70.74a20.85,20.85,0,0,0-1.32-5.55,14.36,14.36,0,0,0-2.75-4.48,13.09,13.09,0,0,0-4.13-3,12.82,12.82,0,0,0-5.45-1.12,12.44,12.44,0,0,0-9.42,3.92,17.68,17.68,0,0,0-4.53,10.24ZM304.76,89A15.3,15.3,0,0,0,315,92.53a18.05,18.05,0,0,0,7.95-1.63,25.52,25.52,0,0,0,6.62-4.79l7.23,6.42a29.73,29.73,0,0,1-9.22,7.33,27.67,27.67,0,0,1-12.78,2.75,28.66,28.66,0,0,1-10.85-2,26,26,0,0,1-14.62-14.51,29.69,29.69,0,0,1-2.14-11.46,30.24,30.24,0,0,1,1.94-10.9,27.4,27.4,0,0,1,5.45-8.91,26.19,26.19,0,0,1,8.3-6.06,24.72,24.72,0,0,1,10.59-2.24,25.52,25.52,0,0,1,11.25,2.34,23.21,23.21,0,0,1,8.05,6.32,27.48,27.48,0,0,1,4.84,9.27,37.42,37.42,0,0,1,1.63,11.11c0,.54,0,1.09-.05,1.63s-.09,1.12-.15,1.73H299.47q1.11,6.61,5.3,10.14" transform="translate(-22.47 -27.03)"/><path class="ind-1" d="M357.37,101.4H344.94V47.62h12.43v8.44a31.32,31.32,0,0,1,2.89-3.65,18.95,18.95,0,0,1,8.23-5.14,19.18,19.18,0,0,1,5.64-.77q9.14,0,14.12,5.6t5,15.08v34.23H380.8V70.93q0-6.3-3-9.71t-8.43-3.4a11.32,11.32,0,0,0-8.68,3.51q-3.33,3.51-3.33,9.8v30.28Z" transform="translate(-22.47 -27.03)"/><path class="ind-1" d="M438.3,70.74A20.85,20.85,0,0,0,437,65.19a14.36,14.36,0,0,0-2.75-4.48,13.09,13.09,0,0,0-4.13-3,12.82,12.82,0,0,0-5.45-1.12,12.44,12.44,0,0,0-9.42,3.92,17.68,17.68,0,0,0-4.53,10.24ZM416.09,89a15.3,15.3,0,0,0,10.19,3.51,18.05,18.05,0,0,0,8-1.63,25.52,25.52,0,0,0,6.62-4.79l7.23,6.42a29.73,29.73,0,0,1-9.22,7.33,27.67,27.67,0,0,1-12.78,2.75,28.66,28.66,0,0,1-10.85-2,26,26,0,0,1-14.62-14.51,29.69,29.69,0,0,1-2.14-11.46,30.24,30.24,0,0,1,1.94-10.9,27.4,27.4,0,0,1,5.45-8.91,26.19,26.19,0,0,1,8.3-6.06,24.72,24.72,0,0,1,10.59-2.24A25.52,25.52,0,0,1,436,48.83a23.21,23.21,0,0,1,8.05,6.32,27.48,27.48,0,0,1,4.84,9.27,37.42,37.42,0,0,1,1.63,11.11c0,.54,0,1.09,0,1.63s-.09,1.12-.15,1.73H410.8q1.13,6.61,5.3,10.14" transform="translate(-22.47 -27.03)"/><rect class="ind-2" x="64.84" y="31.65" width="12.43" height="42.73"/><rect class="ind-1" x="64.84" y="19.22" width="12.43" height="12.42"/><rect class="ind-3" x="22.12" y="37.66" width="24.07" height="12.42"/><rect class="ind-3" x="22.12" y="19.22" width="42.72" height="12.42"/><rect class="ind-2" x="46.19" y="50.09" width="12.43" height="24.29"/><rect class="ind-1" x="46.19" y="37.66" width="12.43" height="12.42"/><rect class="ind-2" x="0.02" y="1" width="12.38" height="12.38"/><path class="ind-4" d="M461.61,57.55a7.15,7.15,0,1,1,7.14-7.15A7.15,7.15,0,0,1,461.61,57.55Z" transform="translate(-22.47 -27.03)"/><g class="ind-5"><g class="ind-5"><path class="ind-6" d="M465,54h-1.25l-1.32-2.49a1.32,1.32,0,0,0-.52-.55,1.67,1.67,0,0,0-.8-.16h-1.28V54h-1.12V46.25H462a3,3,0,0,1,2,.58,2.06,2.06,0,0,1,.67,1.67,2.11,2.11,0,0,1-.5,1.46,2.37,2.37,0,0,1-1.42.73,1.62,1.62,0,0,1,.94.86Zm-3.12-4.11a2,2,0,0,0,1.27-.34,1.53,1.53,0,0,0,0-2.07,2.11,2.11,0,0,0-1.28-.32h-2.06V49.9Z" transform="translate(-22.47 -27.03)"/></g></g></svg></span></li>
        <li class="logo"><span class="logo-mark logo-svg logo-walmart" data-logo="Walmart Labs" role="img" aria-label="Walmart Global Tech (Walmart Labs)"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1029.26 125.17"><path d="M306.45,66.29c0-12.32-5.26-23.16-23.05-23.16-9.13,0-16.38,2.57-20.34,4.85l2.9,9.9c3.61-2.28,9.38-4.17,14.83-4.17,9.02-.02,10.5,5.11,10.5,8.4v.78c-19.67-.03-32.1,6.78-32.1,20.66,0,8.47,6.33,16.41,17.34,16.41,6.77,0,12.43-2.7,15.82-7.03h.34s2.25,9.4,14.63,5.8c-.65-3.91-.86-8.08-.86-13.1v-19.34Zm-14.69,13.02c0,1-.09,2.04-.36,2.94-1.14,3.77-5.04,6.95-9.92,6.95-4.07,0-7.3-2.31-7.3-7.19,0-7.47,8.22-9.54,17.59-9.49v6.78ZM16.26,26.35c1.52,7.67,5.84,29.9,5.84,29.9,1.81,9.15,3.48,18.73,4.74,26.31h.22c1.23-8.05,3.15-15.68,5.21-25.13l7.27-31.09h16.08l6.8,31.9c1.79,8.87,3.2,15.71,4.32,23.96h.22c1.23-8.33,2.82-15.45,4.57-24.56l6.53-31.3h15.44l-19.12,72.39c-12.18,2.67-16.85-2.23-18.53-10.02-1.67-7.79-4.94-22.61-4.94-22.61-1.67-8.11-2.98-13.84-3.9-22.17h-.23c-1.31,8.25-2.67,14.03-4.71,22.14l-8.03,32.66c-12.44,2.48-16.75-1.2-19.14-11.17C12.85,79.02,0,26.35,0,26.35H16.26Zm121.12,39.94c0-12.32-5.26-23.16-23.05-23.16-9.14,0-16.39,2.57-20.34,4.85l2.89,9.9c3.62-2.28,9.38-4.17,14.83-4.17,9.03-.02,10.51,5.11,10.51,8.4v.78c-19.68-.03-32.1,6.78-32.1,20.66,0,8.47,6.33,16.41,17.33,16.41,6.77,0,12.44-2.7,15.83-7.03h.33s2.25,9.4,14.63,5.8c-.65-3.91-.86-8.08-.86-13.1v-19.34Zm-14.68,13.02c0,1-.09,2.04-.36,2.94-1.14,3.77-5.04,6.95-9.92,6.95-4.07,0-7.3-2.31-7.3-7.19,0-7.47,8.22-9.54,17.58-9.49v6.78Zm39.19,19.43h-14.7V26.35h14.7V98.74ZM368.7,26.35v17.12h12.8v13.85h-12.8v20.43c0,6.61,1.68,9.82,6.69,9.82,2.36,0,4.08-.29,5.58-.66l.19,11.49c-2.02,.75-6.29,1.58-10.64,1.58-5.11,0-9.38-1.78-11.97-4.54-2.96-3.15-4.35-8.31-4.35-15.67V26.35h14.5Zm-39.14,18.01v10.26h.41c2.7-7.83,9.14-11.48,14.8-11.48,1.42,0,2.2,.11,3.34,.34v14.24c-1.36-.2-2.62-.39-4.38-.39-6.4,0-10.86,3.73-11.99,9.56-.24,1.2-.33,2.51-.33,4.01v27.84h-15.16V44.36h13.3Zm-143.36,0v7.39h.22c2.51-3.96,6.64-8.62,15.84-8.62,7.16,0,12.65,3.87,14.99,9.73h.22c2.01-2.95,4.32-5.19,6.89-6.77,3.06-1.88,6.44-2.95,10.73-2.95,9.68,0,18.26,6.69,18.26,23.58v32.03h-14.77v-29.8c0-8.56-2.9-13.51-8.95-13.51-4.43,0-7.65,2.97-8.87,6.62-.42,1.26-.62,2.98-.62,4.41v32.28h-14.76v-30.99c0-7.27-2.79-12.32-8.75-12.32-4.77,0-7.76,3.76-8.98,6.97-.52,1.38-.69,2.96-.69,4.45v31.89h-14.78V44.36h14.03Z" fill="currentColor"/><g><path d="M407.43,35.65c.45-1.36,.76-2.78,1.37-4.06,.99-2.09,2.53-3.73,4.66-4.75,1.96-.94,3.81-.9,5.7,.37,10.93,7.33,21.89,14.6,32.84,21.89,2.03,1.35,4.09,2.65,6.11,4.01,6.57,4.39,6.54,14.04-.04,18.43-12.02,8.01-24.03,16.02-36.04,24.03-1.01,.68-2.04,1.33-3.03,2.04-1.46,1.06-3.03,1.18-4.67,.58-2.72-1-4.48-3.01-5.71-5.54-.97-1.98-1.38-4.07-.9-6.26,.34-1.56,1.2-2.7,2.66-3.43,12.84-6.39,25.66-12.8,38.49-19.21,.91-.45,1.81-.92,2.79-1.42-.2-.13-.33-.23-.48-.3-13.7-6.8-27.39-13.6-41.09-20.4-1.46-.72-2.15-1.98-2.5-3.49-.05-.21-.1-.42-.15-.63v-1.86Z" class="wm-spark"/><path d="M518.75,36.92c-.17,.69-.31,1.65-.63,2.55-.39,1.08-1.2,1.82-2.27,2.3-8.49,3.84-16.97,7.69-25.44,11.56-1.41,.65-2.69,.53-3.98-.23-2.42-1.44-3.95-4.66-3.45-7.26,.18-.93,.62-1.67,1.41-2.24,7.7-5.53,15.39-11.09,23.09-16.61,1.77-1.27,3.66-.97,5.4,.02,3.71,2.1,5.5,5.41,5.86,9.9Z" class="wm-spark"/><path d="M518.63,88.56c-.27,4.28-2.11,7.63-5.97,9.67-1.94,1.02-3.84,.89-5.73-.48-7.31-5.31-14.66-10.57-22.06-15.77-1.77-1.24-2.27-2.79-1.9-4.76,.42-2.28,1.6-4.06,3.62-5.23,1.15-.67,2.35-.77,3.62-.19,8.53,3.86,17.06,7.7,25.6,11.53,1.77,.79,2.55,2.23,2.8,4.05,.05,.39,0,.8,0,1.2Z" class="wm-spark"/><path d="M462.99,125.17c-2.63-.02-5.05-.65-6.98-2.55-1.12-1.1-1.58-2.42-1.41-4.03,.51-4.73,.93-9.48,1.4-14.21,.42-4.32,.82-8.64,1.29-12.96,.31-2.86,1.9-4.31,4.8-4.56,1.69-.14,3.32,.05,4.79,.98,1.06,.68,1.72,1.6,1.85,2.91,.48,5.05,.99,10.09,1.5,15.14,.42,4.16,.81,8.33,1.29,12.49,.26,2.22-.63,3.82-2.36,5.06-1.68,1.19-3.65,1.73-6.16,1.74Z" class="wm-spark"/><path d="M462.95,0c2.59-.09,4.89,.55,6.83,2.22,1.32,1.14,1.91,2.56,1.7,4.37-.44,3.85-.76,7.71-1.14,11.57-.42,4.3-.85,8.59-1.27,12.89-.11,1.08-.25,2.16-.3,3.24-.06,1.21-.62,2.1-1.56,2.79-2.22,1.65-6.04,1.65-8.27,.02-.88-.64-1.44-1.46-1.55-2.58-.36-3.75-.75-7.49-1.13-11.23-.43-4.21-.85-8.41-1.28-12.62-.15-1.5-.32-2.99-.44-4.49-.17-2.05,.92-3.44,2.48-4.54,1.64-1.15,3.51-1.63,5.92-1.63Z" class="wm-spark"/></g><g><path d="M579.61,25.49c10.14,0,17.47,3.51,24.3,9.34,.8,.8,.9,2.01,.1,2.81-.9,.9-2.01,1.91-2.81,2.81-.9,1-1.51,.9-2.61-.1-5.12-4.52-12.35-7.83-19.08-7.83-15.87,0-27.92,13.26-27.92,28.82s12.05,29.03,27.92,29.03c11.05,0,18.08-4.22,18.08-4.22v-14.06h-11.55c-1.11,0-1.91-.8-1.91-1.81v-3.72c0-1.1,.8-1.91,1.91-1.91h17.38c1,0,1.81,.9,1.81,1.91v23c0,.5-.4,1.31-.8,1.61,0,0-10.24,6.63-24.81,6.63-20.09,0-36.26-15.97-36.26-36.05s16.17-36.26,36.26-36.26Z" fill="currentColor"/><path d="M619.08,28.7c0-1.1,1-2.21,2.21-2.21h3.01c1.11,0,2.21,1.11,2.21,2.21V94.58c0,1.21-1.1,2.21-2.21,2.21h-3.01c-1.21,0-2.21-1-2.21-2.21V28.7Z" fill="currentColor"/><path d="M662.67,49.39c12.86,0,23.3,11.05,23.3,24.1s-10.45,24.41-23.3,24.41-23.3-11.15-23.3-24.41,10.44-24.1,23.3-24.1Zm0,41.78c9.14,0,15.87-8.04,15.87-17.68s-6.73-17.38-15.87-17.38-15.97,7.93-15.97,17.38,6.83,17.68,15.97,17.68Z" fill="currentColor"/><path d="M698.33,28.7c0-1.1,.9-2.21,2.11-2.21h3.01c1.11,0,2.21,1.11,2.21,2.21v23.6s5.12-2.91,12.86-2.91c13.86,0,21.89,10.54,21.89,24.1s-8.94,24.41-20.79,24.41c-7.13,0-11.75-3.11-14.66-5.92-.3,3.01-1.91,5.22-4.82,5.22-1.1,0-1.81-.7-1.81-1.81V28.7Zm7.33,54.84s4.82,7.63,13.16,7.63,14.06-8.54,14.06-17.58-5.32-17.48-15.47-17.48c-6.43,0-11.75,2.91-11.75,2.91v24.51Z" fill="currentColor"/><path d="M767.83,67.37c4.92,0,9.94,1.51,9.94,1.51,.1-8.54-4.02-12.75-10.64-12.75-5.12,0-8.64,2.01-10.75,2.71-1.21,.5-1.81-.1-2.21-1.21l-1-2.71c-.4-1.41,.3-2.01,1.41-2.51,2.31-1,6.53-3.01,12.96-3.01,11.85,0,17.38,7.03,17.38,19.48v26.51c0,1.1-.7,1.81-1.81,1.81-3.01,0-4.62-2.31-4.92-5.42-2.41,2.51-7.33,6.13-14.56,6.13-8.13,0-14.36-5.83-14.36-15.17,0-8.84,6.63-15.37,18.58-15.37Zm-2.91,23.8c5.72,0,10.75-3.21,12.76-6.23v-9.44c-1.51-.8-5.22-1.81-9.84-1.81-6.43,0-11.25,3.11-11.25,9.04,0,4.72,3.21,8.44,8.34,8.44Z" fill="currentColor"/><path d="M800.37,28.7c0-1.1,1-2.21,2.21-2.21h3.01c1.11,0,2.21,1.11,2.21,2.21V94.58c0,1.21-1.1,2.21-2.21,2.21h-3.01c-1.21,0-2.21-1-2.21-2.21V28.7Z" fill="currentColor"/><path d="M858.62,33.22h-17.48c-1.1,0-1.91-.9-1.91-1.91v-2.91c0-1,.8-1.91,1.91-1.91h42.58c1.11,0,1.91,.9,1.91,1.91v2.91c0,1-.8,1.91-1.91,1.91h-17.47v61.67c0,1-.9,1.91-1.91,1.91h-3.82c-1.01,0-1.91-.9-1.91-1.91V33.22Z" fill="currentColor"/><path d="M907.53,49.39c12.15,0,20.99,8.94,20.99,21.09,0,.8-.1,2.01-.2,2.81-.1,1.21-1.1,2.01-2.11,2.01h-33.74c.2,7.73,6.73,15.87,15.16,15.87,6.13,0,9.94-2.11,12.55-3.82,1.61-1.11,2.31-1.51,3.52,.3l1.21,1.71c.9,1.41,1.3,1.91-.4,3.21-2.81,2.21-8.94,5.32-16.97,5.32-14.06,0-22.5-11.05-22.5-24.3s8.44-24.2,22.5-24.2Zm13.56,19.99c-.2-6.83-5.62-13.26-13.56-13.26s-14.06,6.03-14.96,13.26h28.52Z" fill="currentColor"/><path d="M960.86,49.39c6.93,0,12.55,2.71,16.87,7.63,.9,1.1,.7,2.41-.4,3.31l-1.61,1.51c-1.51,1.31-2.41,.3-3.31-.7-3.21-3.62-6.93-5.02-11.65-5.02-8.84,0-15.87,7.83-15.87,17.48s6.93,17.58,15.57,17.58c7.03,0,10.04-3.62,12.65-6.63,1.31-1.51,2.61-1.1,3.92,.2l.6,.6c1,1,1.41,2.01,.6,3.21-3.52,5.12-9.74,9.34-17.48,9.34-13.76,0-23.4-10.24-23.4-24.2s10.04-24.3,23.5-24.3Z" fill="currentColor"/><path d="M990.29,28.7c0-1.1,1-2.21,2.21-2.21h3.01c1.11,0,2.21,1.11,2.21,2.21v26.62s5.42-5.93,14.76-5.93c11.55,0,16.77,7.13,16.77,20.69v24.5c0,1.21-1.11,2.21-2.21,2.21h-3.12c-1.21,0-2.21-1-2.21-2.21v-24.5c0-8.84-2.61-13.96-9.74-13.96-8.84,0-14.26,6.63-14.26,6.63v31.84c0,1.21-1.1,2.21-2.21,2.21h-3.01c-1.21,0-2.21-1-2.21-2.21V28.7Z" fill="currentColor"/></g></svg></span></li>
        <li class="logo"><span class="logo-mark logo-svg logo-sag" data-logo="Software AG" role="img" aria-label="Software AG"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142 32" fill="none"><g clip-path="url(#sag-clip)"><path d="M14.0217 13.3034C9.84961 12.2252 6.01779 10.862 6.01779 6.06567H0.000244141C0.000244141 15.0633 5.87584 17.1916 11.7796 18.6968C15.9517 19.775 19.7835 20.7479 19.7835 25.9345H25.8011C25.8011 16.8586 19.8409 14.8086 14.0217 13.3034Z" class="sag-s"></path><path d="M4.85388 31.9521H13.7095C17.0299 31.9521 19.7835 29.3979 19.7835 25.9346H4.85388V31.9521Z" fill="currentColor"></path><path d="M20.9192 0.0480957H12.0917C8.77139 0.0480957 6.01782 2.60229 6.01782 6.06564H20.9192V0.0480957Z" fill="currentColor"></path><path d="M37.6971 13.7208C35.5625 13.3941 34.7097 12.892 34.7097 12.1645C34.7097 11.437 35.6637 11.0601 36.6178 11.0601C37.647 11.0601 38.7524 11.6123 39.2795 12.6415L41.6395 11.1854C40.7106 9.37753 39.1041 8.39844 36.6178 8.39844C34.1314 8.39844 31.8476 9.95475 31.8476 12.2647C31.8476 14.4494 33.4039 15.679 36.0907 16.0809C38.124 16.4076 38.9778 16.8345 38.9778 17.6622C38.9778 18.3658 38.1741 18.8929 36.8683 18.8929C35.5625 18.8929 34.5584 18.014 34.1064 17.0098L31.4697 18.466C32.2234 20.374 34.2567 21.5546 36.7921 21.5546C39.6793 21.5546 41.889 20.0985 41.889 17.562C41.889 15.0256 40.2575 14.1227 37.696 13.7208H37.6971Z" fill="currentColor"></path><path d="M49.655 8.39722C45.8138 8.39722 42.9767 11.1341 42.9767 14.9753C42.9767 18.8165 45.8138 21.5534 49.655 21.5534C53.4962 21.5534 56.3583 18.8165 56.3583 14.9753C56.3583 11.1341 53.5212 8.39722 49.655 8.39722ZM49.655 18.8426C47.4953 18.8426 45.939 17.2612 45.939 14.9763C45.939 12.6914 47.4953 11.1101 49.655 11.1101C51.8146 11.1101 53.396 12.6914 53.396 14.9763C53.396 17.2612 51.8146 18.8426 49.655 18.8426Z" fill="currentColor"></path><path d="M124.006 8.39735C120.165 8.39735 117.528 11.1342 117.528 14.9754C117.528 18.8166 120.165 21.5535 124.006 21.5535C126.818 21.5535 128.4 20.5995 129.655 18.992L127.396 17.3094C126.642 18.2885 125.663 18.9408 124.006 18.9408C122.073 18.9408 120.742 17.6851 120.466 15.8021H130.333V14.7228C130.333 11.0069 127.771 8.39526 124.005 8.39526L124.006 8.39735ZM120.616 13.4191C121.118 11.9129 122.324 10.9088 124.005 10.9088C125.813 10.9088 126.993 12.0382 127.369 13.4191H120.615H120.616Z" fill="currentColor"></path><path d="M133.949 8.69897L131.94 13.5694H133.07L133.497 12.465H135.455L135.882 13.5694H137.011L135.003 8.69897H133.949ZM133.848 11.5611L134.476 9.90353L135.103 11.5611H133.847H133.848Z" fill="currentColor"></path><path d="M70.8295 4.98305H67.9674V8.699H62.0166V6.36401H65.481V3.67725H61.8903C60.1326 3.67725 59.1535 4.63129 59.1535 6.36401V8.699H56.5419V11.3858H59.1535V21.2529H62.0156V11.3858H67.9663V18.5411C67.9663 20.2988 68.9204 21.2529 70.7032 21.2529H74.344V18.5411H70.8285V11.3858H74.344V8.699H70.8285V4.98305H70.8295Z" fill="currentColor"></path><path d="M139.346 11.0091V11.8128H140.903C140.727 12.3149 140.35 12.7167 139.622 12.7167C138.718 12.7167 138.116 12.0132 138.116 11.1354C138.116 10.2575 138.743 9.55399 139.597 9.55399C140.249 9.55399 140.626 9.85565 140.852 10.2064L141.681 9.65419C141.304 9.02687 140.577 8.625 139.597 8.625C138.191 8.625 137.136 9.7544 137.136 11.1354C137.136 12.5163 138.141 13.6457 139.597 13.6457C141.053 13.6457 141.957 12.6666 141.957 11.2857V11.0091H139.345H139.346Z" fill="currentColor"></path><path d="M109.491 11.4108V21.2528H112.353V11.4108H117.098V8.69897H112.228C110.445 8.69897 109.491 9.65301 109.491 11.4108Z" fill="currentColor"></path><path d="M88.7811 17.11L86.4211 8.69897H83.0569L80.6968 17.11L78.3869 8.69897H75.2732L79.0392 21.2528H82.1529L84.7395 12.1383L87.325 21.2528H90.4387L94.2047 8.69897H91.1161L88.7811 17.11Z" fill="currentColor"></path><path d="M104.384 10.0798C103.681 9.07569 102.375 8.39722 100.618 8.39722C96.9769 8.39722 94.3663 11.109 94.3663 14.9753C94.3663 18.8416 96.9779 21.5534 100.618 21.5534C102.551 21.5534 103.681 20.7747 104.384 19.8206V21.2517H107.246V8.69783H104.384V10.0788V10.0798ZM100.918 18.8676C98.7848 18.8676 97.3026 17.3113 97.3026 14.9763C97.3026 12.6413 98.7837 11.085 100.918 11.085C103.053 11.085 104.534 12.6413 104.534 14.9763C104.534 17.3113 103.053 18.8676 100.918 18.8676Z" fill="currentColor"></path></g><defs><linearGradient id="sag-grad" x1="-1.60304" y1="9.84321" x2="27.4044" y2="22.156" gradientUnits="userSpaceOnUse"><stop stop-color="#8E3CF7"></stop><stop offset="0.2" stop-color="#8E3CF7"></stop><stop offset="0.8" stop-color="#3CC1B6"></stop><stop offset="1" stop-color="#3CC1B6"></stop></linearGradient><clipPath id="sag-clip"><rect width="141.958" height="32" fill="white"></rect></clipPath></defs></svg></span></li>
        <li class="logo"><span class="logo-mark logo-svg logo-infosys" data-logo="Infosys" role="img" aria-label="Infosys"><svg aria-hidden="true" focusable="false" viewBox="0 7.52 24 8.96" xmlns="http://www.w3.org/2000/svg"><path class="ifs" d="M23.2734 7.5703c-.3984 0-.7246.3282-.7246.7266 0 .4013.3262.7246.7246.7246.3982 0 .7266-.3233.7266-.7246 0-.3984-.3284-.7266-.7266-.7266zm0 .1074c.3395 0 .6192.2795.6192.6192 0 .3396-.2797.6172-.6192.6172-.3397 0-.6171-.2776-.6171-.6172 0-.3397.2774-.6192.6171-.6192zm-15.1367.0547c-.9001 0-1.549.5917-1.6387 1.6406h-.6953v.5215h.6856c.0028 1.6664-.002 3.334-.002 4.998h.7774c-.0022-1.6659-.002-3.3319-.002-4.998h1.748c-.646.5242-1.0663 1.3739-1.0663 2.334 0 1.593 1.1564 2.8848 2.582 2.8848 1.4258 0 2.582-1.2918 2.582-2.8848 0-.1896-.0174-.3753-.0488-.5547.2565.4131.7488.6133 1.4082.8985.7784.329 1.2129.6165 1.2129 1.1074 0 .5885-.556.8955-1.1817.8906-.611 0-1.0883-.249-1.6191-.7305v.9239c.3239.2088.8256.3281 1.3691.3281.6844-.0023 2.0918-.249 2.0918-1.6758-.0044-.8557-.715-1.2239-1.4863-1.5586-.9383-.4653-1.2965-.5629-1.2871-1.0957 0-.7088.6178-.9219 1.0996-.9219.2099 0 .3891.0293.5586.086.3163.1194.4209.3553.5332.6113.5283 1.2356 1.0344 2.4811 1.5488 3.7227-.2464.5637-.526 1.1519-.7168 1.5273l-.0039.0098-.1601.2969-.1797.336h.7617c.3322-.7342 1.7436-4.1688 2.0469-4.9083.1995.533.6857.7467 1.4297 1.0684.7783.329 1.2148.6166 1.2148 1.1074 0 .5886-.5562.8936-1.1816.8887-.6348 0-1.1257-.2685-1.6817-.7871l-.0507-.041v.9413c.3115.259.8713.4102 1.4824.4102.6844-.0022 2.0918-.249 2.0918-1.6758-.0042-.8557-.7151-1.2258-1.4863-1.5605-.9384-.4654-1.2593-.563-1.25-1.0957 0-.709.5787-.9219 1.0605-.9219.5483 0 .8958.2037 1.379.5547V9.584c-.3923-.1381-.7212-.1915-1.1642-.1895-.8912-.0018-1.6966.3234-1.9004 1.0762l-1.1054 2.7344-.1153.3437-.1015-.3437c-.5022-1.2089-.9934-2.4236-1.4863-3.6309-.3154-.0828-.8307-.201-1.1934-.1953-.0377-.0007-.0758-.0002-.1152 0-1.0302-.002-2.0235.4332-2.0235 1.457 0 .0596.0022.1155.006.17-.412-.9813-1.3036-1.6602-2.338-1.6602-.1245 0-.2472.0085-.3672.0273H7.254c-.1194-.733.2228-1.1503.7383-1.1503.6472-.0006.9242.192 1.205.4511 0 0 .0195-.0007.0274 0 .0038-.2457.002-.5318.002-.7949-.185-.0857-.5061-.1465-1.0899-.1465zM0 7.756v7.1367h.8594V7.7559zm23 .1386v.7657h.1387v-.3086h.164l.1192.3086h.1543l-.1407-.3301c.0494-.0248.1329-.0518.1329-.1875 0-.2224-.1673-.248-.3125-.248zm.1387.1328h.1543c.0834 0 .1289.0337.1289.1016 0 .068-.0524.0996-.1172.0996h-.166zM4.1719 9.3555c-.945 0-1.3429.3359-1.6582.6738a.2474.2474 0 00-.0352.0644h-.0078v-.043l-.0098-.623H1.707v5.4649h.7754v-3.9961c.0226-.4905.7134-.9746 1.252-.9746.6477 0 1.1777.4364 1.1777 1.039v3.9317h.7754c-.0019-1.429-.002-2.858-.002-4.2871-.0234-.4835-.6094-1.25-1.5136-1.25zm6.2832.5566c.9741-.0175 1.7825 1.0214 1.8047 2.3184.022 1.297-.7504 2.3614-1.7246 2.3789-.9742.0171-1.7825-1.0195-1.8047-2.3164-.0221-1.2971.7503-2.3634 1.7246-2.3809Z"/></svg></span></li>
      </ul>
    </div>
  </div>
</section>

<!-- ===== WORK ===== -->
<section class="s g" id="work" data-g="work">
  <div class="wrap">
    <p class="grp rv"><span class="grp-t">Work</span><span class="grp-n" aria-label="Section 1 of 8"><b>01</b> / 08</span></p>
    <div class="split">
      <div class="rv">
        <p class="eyebrow">Flagship case · A de-identified enterprise platform</p>
        <h2 class="h2">Transformation is never just a product problem.</h2>
        <p class="lede">One complex enterprise challenge, viewed through the interconnected forces that shaped the product, the organization, and the business.</p>
        <p class="scope-line">Where I work: <b>design organizations</b>, <b>product and enterprise strategy</b>, <b style="white-space:nowrap">AI&#8209;native experiences</b>.</p>
      </div>
      <figure class="sys sys-panel rv" style="--d:1"><svg id="system" viewBox="10 30 460 382" role="img" aria-label="Product, organization and business converge to shape one system."></svg></figure>
    </div>
    <div class="stats wide rv">
      <div><p class="fig">~60 days</p><p class="cap">The entire v1.0 product experience.</p></div>
      <div><p class="fig">1 → 2</p><p class="cap">Designers. First 30 days solo.</p></div>
      <div><p class="fig">~6 months</p><p class="cap">Enterprise validation, then a global partner.</p></div>
    </div>
    <div class="shot rv"><figure class="prodshot"><img src="/images/home/final/guided-planning.webp" width="2200" height="1103" alt="The guided planning experience: a submission plan shown as a timeline from start date to due date, with a &quot;you are here&quot; marker, followed by tabs for requirements, market rules, shared packs, bundling and capacity." loading="lazy" decoding="async"></figure></div>

    <div class="c">
    <div class="wtabs two-t rv" role="tablist" aria-label="Chapters of the flagship case" id="work-tabs">
      <button class="wtab" role="tab" id="t-productize" aria-controls="tp-productize" aria-selected="true" data-tab="productize" aria-label="Chapter 1: Productize. Make intelligence accessible"><span class="n" aria-hidden="true">1</span><b>Productize</b><span class="d">Make intelligence accessible</span></button>
      <button class="wtab" role="tab" id="t-transform" aria-controls="tp-transform" aria-selected="false" tabindex="-1" data-tab="transform" aria-label="Chapter 2: Transform. From workflows to intent"><span class="n" aria-hidden="true">2</span><b>Transform</b><span class="d">From workflows to intent</span></button>
    </div>
    <p class="chdesc" id="chdesc" aria-hidden="true">Make intelligence accessible</p>

    <div class="chbar-wrap"><nav class="chbar" aria-label="Switch chapter">
      <button type="button" class="chb" data-go="productize" aria-pressed="true"><span class="chn">1</span>Productize</button>
      <button type="button" class="chb" data-go="transform" aria-pressed="false"><span class="chn">2</span>Transform</button>
    </nav></div>

    <!-- 01 PRODUCTIZE -->
    <div class="tabpanel" role="tabpanel" id="tp-productize" aria-labelledby="t-productize">
      <div class="cs-head">
        <p class="kicker">Chapter 1 · Productize</p>
        <h3 class="st"><span>The technology was powerful.</span><span>Access to it wasn't.</span></h3>
        <p class="cp">A decade of enterprise data expertise had created sophisticated capabilities. But much of that intelligence remained trapped in terminal workflows, scripts and the minds of experienced engineers.</p>
      </div>
      <div class="stats">
        <div><p class="fig">~<span class="cu" data-to="50">50</span></p><p class="cap">Engineers in an engineering-heavy organization.</p></div>
        <div><p class="fig"><span class="cu" data-to="12">12</span>+ years</p><p class="cap">Enterprise data expertise.</p></div>
        <div><p class="fig">Multi-industry</p><p class="cap">Complex data problems.</p></div>
      </div>
      <p class="cs-note">Turned expert reasoning into product behavior: a v1.0 enterprise experience in ~60 days, then validated with enterprise customers.</p>

      <div class="seg" role="group" aria-label="Before and after the product"><button type="button" aria-pressed="true" data-v="before">Before</button><button type="button" aria-pressed="false" data-v="after">After</button></div>
      <div class="bflow" id="bflow" data-state="before" aria-live="polite">
        <div class="flow chain fb">
          <div class="node" style="--k:0"><span class="t">Business problem</span></div>
          <div class="node" style="--k:1"><span class="t">Scripts / decision logic / technical expertise</span></div>
          <div class="node hot" style="--k:2"><span class="t">Data engineer</span></div>
          <div class="node" style="--k:3"><span class="t">Outcome</span></div>
        </div>
        <div class="flow chain fa">
          <div class="node" style="--k:0"><span class="t">User with domain context</span></div>
          <div class="node hot" style="--k:1"><span class="t">Guided product workflow</span></div>
          <div class="node" style="--k:2"><span class="t">Outcome</span></div>
        </div>
        <p class="bcap" id="bcap">The engineer was effectively the interface.</p>
      </div>
      <figure class="voice"><span class="voice-mark" aria-hidden="true">“</span><blockquote><p>I don't have to <em>depend on a data engineer</em> anymore. As a business guy, I exactly know my industry problem.</p></blockquote><figcaption>Business user · Enterprise customer</figcaption></figure>
      <p class="lit"><span class="lit-k">The real design problem</span>The technology wasn't what needed translating. The expert reasoning did.</p>
      <div class="gal-wrap">
        <p class="lbl">The work, screen by screen</p>
        <div class="gal" tabindex="0" role="region" aria-label="Product screens. Scroll sideways.">
          <figure><div class="ph " style="--ar:4/3" role="img" aria-label="Screen to add: Before: the terminal workflow"><span class="ph-in"><span class="ph-t">Screen to add</span><span class="ph-d">Before: the terminal workflow</span></span></div><figcaption><b>01</b> Before: scripts in a terminal</figcaption></figure>
          <figure><div class="ph " style="--ar:4/3" role="img" aria-label="Screen to add: The blueprint: recurring expert patterns"><span class="ph-in"><span class="ph-t">Screen to add</span><span class="ph-d">The blueprint: recurring expert patterns</span></span></div><figcaption><b>02</b> The blueprint</figcaption></figure>
          <figure><div class="ph " style="--ar:4/3" role="img" aria-label="Screen to add: v1.0: the guided workflow"><span class="ph-in"><span class="ph-t">Screen to add</span><span class="ph-d">v1.0: the guided workflow</span></span></div><figcaption><b>03</b> v1.0 guided workflow</figcaption></figure>
          <figure><div class="ph " style="--ar:4/3" role="img" aria-label="Screen to add: An enterprise use case, validated"><span class="ph-in"><span class="ph-t">Screen to add</span><span class="ph-d">An enterprise use case, validated</span></span></div><figcaption><b>04</b> Validated with enterprise users</figcaption></figure>
        </div>
        <p class="gal-hint" aria-hidden="true">Scroll sideways <span>→</span></p>
      </div>

      <div class="beats">
        <details class="beat-row" open>
          <summary><span class="bn">01</span><span class="bl">The real constraint</span><span class="bh">The engineer was effectively the interface.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>Customer outcomes were strong. But accessing the technology depended heavily on expert knowledge.</p>
            <div class="cards">
              <div class="card"><span class="k">Knowledge was concentrated.</span><span class="q">Critical expertise was difficult to transfer.</span></div>
              <div class="card"><span class="k">Delivery varied by expert.</span><span class="q">Similar problems could take different paths depending on the engineer.</span></div>
              <div class="card"><span class="k">Scale depended on people.</span><span class="q">Expert intervention remained central to delivery.</span></div>
            </div>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">02</span><span class="bl">The hidden complexity</span><span class="bh">The product knew less than the people operating it.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>The challenge wasn't simply to expose existing technology through a graphical interface. It was to understand the reasoning around it and translate expert capability into product behavior.</p>
            <div class="split2">
              <div class="s2-col"><h4>The technology provided</h4><ul><li>Tools</li><li>Frameworks</li><li>Data capabilities</li><li>Data processing</li></ul></div>
              <div class="s2-col hot"><h4>The expert provided</h4><ul><li>Context</li><li>Sequence</li><li>Judgment</li><li>Decision logic</li><li>Problem-solving</li></ul></div>
            </div>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">03</span><span class="bl">The mandate</span><span class="bh">Make the intelligence accessible.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>I joined in 2023 as Director of UX with a clear mandate: transform an expert-driven, terminal-based product into an experience people could operate without coding or data engineering expertise.</p>
            <dl class="mstat"><div><dt>2023</dt><dd>Joined as Director of UX</dd></div><div><dt>~60 days</dt><dd>The entire v1.0 experience</dd></div><div><dt>1 → 2</dt><dd>Designers · first 30 days solo</dd></div></dl>
            <p class="lbl">The objective</p>
            <p class="pull two"><span>Not to reinvent the underlying technology.</span><span>To make its capabilities understandable, operable and scalable.</span></p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">04</span><span class="bl">The approach and the discovery</span><span class="bh">I started with the engineers, not the interface.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>For the first month, I worked across data engineering, technology and business leadership to reconstruct how complex data problems were actually solved. I wasn't mapping their actions. I was trying to understand the reasoning behind them.</p>
            <p class="lbl">What I observed</p>
            <div class="stages3">
              <div class="s3"><h4>How they worked</h4><ul><li>Daily workflows</li><li>Terminal scripts</li></ul></div>
              <div class="s3"><h4>How they decided</h4><ul><li>Technical choices</li><li>Variations in approach</li><li>Dependencies</li></ul></div>
              <div class="s3"><h4>What resulted</h4><ul><li>Course corrections</li><li>Delivery outcomes</li></ul></div>
            </div>
            <p class="lbl">What I mapped</p>
            <div class="cards">
              <div class="card"><span class="k">Intent</span><span class="q">What problem are we solving?</span></div>
              <div class="card"><span class="k">Criteria</span><span class="q">What factors shape the decision?</span></div>
              <div class="card"><span class="k">Decisions</span><span class="q">Why this approach over another?</span></div>
              <div class="card"><span class="k">Sequence</span><span class="q">What determines what happens next?</span></div>
              <div class="card"><span class="k">Exceptions</span><span class="q">What makes the path change?</span></div>
              <div class="card"><span class="k">Outcomes</span><span class="q">How do we know it worked?</span></div>
            </div>
            <p class="lbl">The discovery</p>
            <p class="pull acc"><span>I wasn't documenting software steps.</span><span>I was mapping how experts reasoned.</span></p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">05</span><span class="bl">The synthesis</span><span class="bh">Different experts took different paths. Recurring patterns emerged.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>I compared workflows, scripts and decision logic across engineers and use cases looking for recurring patterns beneath individual approaches. Those patterns became the foundation for a shared product blueprint.</p>
            <div class="fig-panel vas-fig">
              <svg id="vas" class="vas" viewBox="0 26 900 168" role="img" aria-label="Tangled expert paths pass through one lens where they align into recurring patterns, which then feed a structured product blueprint."></svg>
              <div class="fig-cols"><div><b>Variation</b>Expert paths</div><div><b>Abstraction</b>Recurring patterns</div><div><b>Structure</b>Product blueprint</div></div>
            </div>
            <p class="lbl">The principle</p>
            <p class="pull"><span>From designing around how engineers worked</span> <span>to designing around how problems were solved.</span></p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">06</span><span class="bl">The productization</span><span class="bh">Expert reasoning became product behavior.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>The blueprint encoded recurring expert logic into a guided product experience, preserving the underlying capability while removing coding as the primary way to access it.</p>
            <p class="lbl">What changed</p>
            <p class="pull acc"><span>The expertise didn't disappear.</span><span>It moved into the product.</span></p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">07</span><span class="bl">The impact and the result</span><span class="bh">The product became the access point.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>Users with domain and data problem-solving context could now work through supported workflows without coding or data-engineering expertise as a prerequisite.</p>
            <div class="cards">
              <div class="card"><span class="k">Access</span><span class="q">Coding and data-engineering expertise were no longer prerequisites for supported workflows.</span></div>
              <div class="card"><span class="k">Effort</span><span class="q">Routine execution shifted from engineer-led scripting to guided product workflows.</span></div>
              <div class="card"><span class="k">Time</span><span class="q">Users reported dramatic compression in task cycles: from months to weeks, and weeks to hours.</span></div>
            </div>
            <p class="lbl">The result</p>
            <p class="pull acc"><span>Expertise stopped being the access layer.</span><span>It became part of the product.</span></p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">08</span><span class="bl">The validation</span><span class="bh">The product left the room. The learning came back.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>The first release wasn't treated as the finish line. We put the product in front of external practitioners and enterprise users, exposing gaps, challenging assumptions and informing what came next.</p>
            <div class="cards">
              <div class="card"><span class="n">01</span><span class="k">Internal alignment</span><span class="q">Could we make the complexity understandable?</span></div>
              <div class="card"><span class="n">02</span><span class="k">External practitioners</span><span class="q">Would it hold up beyond our own experts?</span></div>
              <div class="card"><span class="n">03</span><span class="k">Enterprise use cases</span><span class="q">Would it work against real business problems?</span></div>
            </div>
            <p class="lbl">What validation changed</p>
            <div class="cards n4">
              <div class="card"><span class="k">Journeys</span><span class="q">Real use exposed friction.</span></div>
              <div class="card"><span class="k">Capabilities</span><span class="q">Missing needs surfaced.</span></div>
              <div class="card"><span class="k">Domain needs</span><span class="q">Specific use cases revealed new requirements.</span></div>
              <div class="card"><span class="k">Roadmap</span><span class="q">Recurring, high-value problems moved up the roadmap.</span></div>
            </div>
            <p class="bigfig">~6 months<small>Enterprise validation</small></p>
            <p class="lbl">What we learned</p>
            <p class="pull"><span>Validation moved from the end of delivery</span> <span>into the way we shaped the roadmap.</span></p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">09</span><span class="bl">The business shift</span><span class="bh">The product became part of a bigger proposition.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>After ~6 months of enterprise validation, the platform moved into a broader solution architecture, extending its potential reach through a global enterprise partner.</p>
            <div class="cards n4">
              <div class="card"><span class="n">01</span><span class="k">Product</span><span class="q">Capability made accessible.</span></div>
              <div class="card"><span class="n">02</span><span class="k">Validation</span><span class="q">Tested against enterprise use cases.</span></div>
              <div class="card"><span class="n">03</span><span class="k">Solution architecture</span><span class="q">Incorporated into broader solutions.</span></div>
              <div class="card"><span class="n">04</span><span class="k">Distribution</span><span class="q">A path to the partner's clients.</span></div>
            </div>
            <p class="lbl">What this unlocked</p>
            <div class="cards">
              <div class="card"><span class="k">Reach</span><span class="q">Access to a partner's client ecosystem.</span></div>
              <div class="card"><span class="k">Relevance</span><span class="q">Enterprise use cases deepened the product's domain relevance.</span></div>
              <div class="card"><span class="k">Business model</span><span class="q">Participation inside partner-led solutions.</span></div>
            </div>
            <p class="pull acc"><span>From making the capability accessible</span><span>to creating a new path for it to reach the market.</span></p>
          </div>
        </details>
      </div>
      <a class="chnext" href="#transform" data-go="transform">
        <span class="chx-k">Up next · Chapter 2</span>
        <span class="chx-t">Transform</span>
        <span class="chx-d">From workflows to intent</span>
        <span class="chx-ar" aria-hidden="true">→</span>
      </a>
    </div>

    <!-- 02 TRANSFORM -->
    <div class="tabpanel" role="tabpanel" id="tp-transform" aria-labelledby="t-transform" hidden>
      <div class="cs-head">
        <p class="kicker">Chapter 2 · Transform</p>
        <h3 class="st"><span>We had changed the interface.</span><span>Then the definition of an interface changed.</span></h3>
        <p class="cp">The first transformation moved complex work from terminal scripts into a guided product experience. But as AI accelerated, a new interaction model was emerging, one where users could express intent instead of navigating every step.</p>
      </div>
      <ol class="eras" aria-label="How people work with software: script, then interface, now intent">
        <li class="era"><span class="era-k">Then</span><span class="era-dot" aria-hidden="true"></span><b>Script</b><span class="era-d">Tell the machine how.</span></li>
        <li class="era"><span class="era-k">Then</span><span class="era-dot" aria-hidden="true"></span><b>Interface</b><span class="era-d">Navigate the workflow.</span></li>
        <li class="era now"><span class="era-k">Now</span><span class="era-dot" aria-hidden="true"></span><b>Intent</b><span class="era-d">Describe what you need.</span><span class="era-tag">2.0</span></li>
      </ol>
      <p class="era-take"><span>We redefined the interface:</span> <span>from something people operate to something that understands their&nbsp;intent.</span></p>
      <p class="lit"><span class="lit-k">The standard</span>When making gets easier, the bar for what we make gets higher.</p>
      <div class="beats">
        <details class="beat-row" open>
          <summary><span class="bn">01</span><span class="bl">The interaction shift</span><span class="bh">From operating workflows to expressing intent.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>The rules were still being written. What lay ahead was uncertain, but the possibilities were expanding: an opportunity not just to adapt to the shift, but to get ahead of it and help shape what came next.</p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">02</span><span class="bl">The design question</span><span class="bh">If intent became the starting point, what would we need to design differently?</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p class="lbl" style="margin-top:0">The evolution</p>
            <p class="pull acc"><span>From designing how people operate the system</span><span>to designing how they direct it.</span></p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">03</span><span class="bl">The reframe</span><span class="bh">The interface was changing. So was the role of the human.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>When intent becomes the starting point, the human doesn't disappear from the experience. Their role begins to change: shaping what is asked, judging what comes back, and staying accountable for the outcome.</p>
            <div class="flow chain">
              <div class="node hot"><span class="t">Human</span><ul><li>Shapes direction</li><li>Exercises judgment</li><li>Remains accountable</li></ul></div>
              <div class="node"><span class="t">System</span><ul><li>Takes on more<br>of the execution</li></ul></div>
              <div class="node"><span class="t">Outcome</span></div>
            </div>
            <p class="lbl">The leadership question</p>
            <p class="pull"><span>If intent changed the relationship,</span> <span>what should remain distinctly human?</span></p>
            <p>The challenge was no longer only designing what the system could do but defining where human direction, judgment and accountability mattered most.</p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">04</span><span class="bl">The human role</span><span class="bh">Less execution. More judgment.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>As systems took on more execution, human contribution shifted toward setting direction, articulating intent, exercising judgment and remaining accountable for outcomes.</p>
            <div class="cards n4">
              <div class="card"><span class="k">Delegate</span><span class="q">Decide what to hand over.</span></div>
              <div class="card"><span class="k">Describe</span><span class="q">Make intent clear.</span></div>
              <div class="card"><span class="k">Discern</span><span class="q">Judge what comes back.</span></div>
              <div class="card"><span class="k">Diligence</span><span class="q">Stay accountable for the outcome.</span></div>
            </div>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">05</span><span class="bl">The system role</span><span class="bh">Not every task called for the same role from AI.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>The question wasn't simply where AI could be added. It was how much of the work the system should take on and where human involvement continued to matter.</p>
            <div class="cards">
              <div class="card"><span class="k">Execute</span><span class="m">Automate</span><span class="q">System executes the task.</span></div>
              <div class="card"><span class="k">Collaborate</span><span class="m">Augment</span><span class="q">Human + system work together.</span></div>
              <div class="card"><span class="k">Act</span><span class="m">Agency</span><span class="q">System acts with greater autonomy.</span></div>
            </div>
            <p class="pull acc"><span>The goal wasn't maximum autonomy.</span> <span>It was choosing the right mode for the problem.</span></p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">06</span><span class="bl">The experimentation</span><span class="bh">The new interaction model had to become tangible.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>We moved from principles into prototypes, exploring how an LLM could take on more of the interaction complexity while users focused on intent, judgment and outcomes.</p>
            <p class="lbl">From principle to prototype</p>
            <div class="cards n1"><div class="card"><span class="k">Guided interface</span><span class="q">User navigates the capability.</span></div></div>
            <div class="gal mini-gal" tabindex="0" role="region" aria-label="Prototype stages. Scroll sideways."><figure><div class="ph " style="--ar:4/3" role="img" aria-label="Prototype to add: Stage 2: intent in, guided steps out"><span class="ph-in"><span class="ph-t">Prototype to add</span><span class="ph-d">Stage 2: intent in, guided steps out</span></span></div><figcaption><b>02</b> Intent-led prototype</figcaption></figure><figure><div class="ph " style="--ar:4/3" role="img" aria-label="Prototype to add: Stage 3: the LLM handles the interaction"><span class="ph-in"><span class="ph-t">Prototype to add</span><span class="ph-d">Stage 3: the LLM handles the interaction</span></span></div><figcaption><b>03</b> Conversational prototype</figcaption></figure></div>
            <p class="lbl">What changed</p>
            <p class="pull acc"><span>The interface was no longer the destination.</span><span>It became the translation layer between human intent and system capability.</span></p>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">07</span><span class="bl">The craft and the standard</span><span class="bh">The product was changing. The way we designed had to change too.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>AI was beginning to challenge established roles, tools and ways of working. My role was to help the team engage with that change, experiment with it and raise the bar for what good looked like.</p>
            <p class="lbl">Preparing the team for a different craft</p>
            <div class="cards">
              <div class="card"><span class="k">Mindset</span><span class="q">Question where design creates value.</span></div>
              <div class="card"><span class="k">Experimentation</span><span class="q">Learn by building.</span></div>
              <div class="card"><span class="k">Ways of working</span><span class="q">Let the workflow evolve.</span></div>
            </div>
          </div>
        </details>
        <details class="beat-row">
          <summary><span class="bn">08</span><span class="bl">The leadership shift</span><span class="bh">As the transformation expanded, so did my role.</span><span class="bp" aria-hidden="true"></span></summary>
          <div class="bd">
            <p>I had joined to transform the experience. As the work expanded across product and technology, my responsibility grew too: from leading design to helping shape Product + Design, while building the fluency to lead through what was coming next.</p>
            <p class="lbl">The role evolved</p>
            <div class="flow">
              <div class="node"><span class="t">Experience</span><span class="d"><b>Director of UX</b><br>Make complex capability accessible.</span></div>
              <div class="node"><span class="t">Product</span><span class="d"><b>Product + Design</b><br>Shape product direction and experience together.</span></div>
              <div class="node hot"><span class="t">Leadership</span><span class="d"><b>Leading through change</b><br>Build the fluency for what came next.</span></div>
            </div>
            <p class="lbl">What mattered</p>
            <p>I didn't need to become the technologist in the room. I needed enough fluency to ask better questions, make better decisions and lead teams into unfamiliar territory.</p>
          </div>
        </details>
      </div>
      <div class="chend">
        <a class="chback" href="#productize" data-go="productize"><span aria-hidden="true">←</span> Chapter 1 · Productize</a>
        <a class="chnext" href="#impact">
          <span class="chx-k">Up next · Impact</span>
          <span class="chx-t">Who decided what's possible?</span>
          <span class="chx-ar" aria-hidden="true">→</span>
        </a>
      </div>
    </div>

    </div>
  </div>
</section>

<!-- IMPACT -->
<section class="s" id="impact" data-g="work">
  <div class="wrap">
    <p class="grp rv"><span class="grp-t">Impact</span><span class="grp-n" aria-label="Section 2 of 8"><b>02</b> / 08</span></p>
    <div class="c">
      <h2 class="h2">Who decided what's possible?</h2>
      <p class="lede">Possibility doesn't belong to design, technology, or any one individual. It emerges when disciplines come together.</p>
      <p class="lit">Design went from being called after the brief to being invited before the deal.</p>
    </div>
    <div class="stats scale rv">
      <div><p class="fig">$10M<span class="fu">ARR</span></p><p class="cap">From concept to commercial scale</p></div>
      <div><p class="fig">60<span class="fu">days</span></p><p class="cap">Enterprise platform MVP delivered</p></div>
      <div><p class="fig">0 → 1</p><p class="cap">Design functions built from scratch</p></div>
      <div><p class="fig">4,000+</p><p class="cap">Professionals upskilled in creative thinking</p></div>
    </div>

    <div class="irows">
      <article class="irow rv">
        <div class="ileft">
          <p class="ibig word">8 clients</p>
          <p class="icap">Across the US, Australia, Spain, Italy and Germany.</p>
        </div>
        <div class="iright">
          <p class="lbl">01 · Global scale · Two global pharmaceutical platforms</p>
          <h3>Designing for a scale we couldn't yet see.</h3>
          <p>Two platforms, one challenge: helping a global pharmaceutical ecosystem work as one.</p>
          <p>The first brought fragmented regulatory workflows into a coherent platform, and later supported critical workflows associated with the COVID-19 vaccine program, when speed, rigor and global coordination mattered at an unprecedented scale.</p>
          <p>The second, an intelligent content platform, helped teams across the drug lifecycle plan, create and adapt compliant content across channels and languages.</p>
          <p class="chain">Connected siloed systems → saved time → reduced expert dependence → adopted by ~8 pharma clients across 5 countries</p>
          <p class="istate"><span>The patterns surfaced early became the foundation for AI enablement.</span> <span>Early adopters didn't start their transformation from zero.</span></p>
          <p class="iai">The foundations outlasted my time there. After I moved on, they became the basis for a <b>$75M multi-year AI proposal</b>.</p>
          <p class="role">My role · Director of UX</p>
        </div>
              <figure class="irow-fig">
          <div class="ph big" style="--ar:16/7" role="img" aria-label="Image to add: Platform at global scale: a de-identified screen or a map of regions served"><span class="ph-in"><span class="ph-t">Image to add</span><span class="ph-d">Platform at global scale: a de-identified screen or a map of regions served</span></span></div>
          <figcaption>What the platform looked like at global scale.</figcaption>
        </figure>
      </article>
      <article class="irow rv">
        <div class="ileft">
          <p class="ibig word">1 → 300</p>
          <p class="icap">One Big Four tax practice. 300 distribution partners using it at scale.</p>
        </div>
        <div class="iright">
          <p class="lbl">02 · Commercial impact · Enterprise platform, Big Four tax practice</p>
          <h3>We removed the translator between technology and value.</h3>
          <p>Sophisticated technology became understandable directly to business leaders, with no engineering interpretation needed. Clear enough to sell itself: a Big Four firm's tax practice became the channel to 300 distribution partners.</p>
          <p class="chain">Short-term engagement → multi-million follow-ons, signed → Big Four tax partnership → 300 partners at scale</p>
          <p class="role">My role · Director of Product and Design. Led design from day one, from a solo first month through enterprise validation.</p>
        </div>
              <figure class="irow-fig">
          <div class="ph big" style="--ar:16/7" role="img" aria-label="Image to add: Business leaders working directly with the product: a de-identified screen or workshop moment"><span class="ph-in"><span class="ph-t">Image to add</span><span class="ph-d">Business leaders working directly with the product: a de-identified screen or workshop moment</span></span></div>
          <figcaption>The product, read directly by business leaders.</figcaption>
        </figure>
      </article>
      <article class="irow rv">
        <div class="ileft">
          <p class="ibig word">Upstream</p>
          <p class="icap">From after the brief to before the deal: design in final-stage RFPs.</p>
        </div>
        <div class="iright">
          <p class="lbl">03 · Organizational impact · Design practice, client-facing growth</p>
          <h3>From a design function to a growth engine.</h3>
          <p>Design increasingly entered client conversations, workshops, propositions and final-stage RFPs.</p>
          <p class="chain">Deliver → earn trust → invited upstream → shape proposition → influence growth</p>
          <p class="role">My role · Director of UX</p>
        </div>
              <figure class="irow-fig">
          <div class="ph big" style="--ar:16/7" role="img" aria-label="Image to add: Design in the room upstream: a workshop, proposition or RFP moment"><span class="ph-in"><span class="ph-t">Image to add</span><span class="ph-d">Design in the room upstream: a workshop, proposition or RFP moment</span></span></div>
          <figcaption>Design shaping the proposition, before the deal.</figcaption>
        </figure>
      </article>
    </div>

    <div class="pattern rv c">
      <p class="pattern-lead">The work I value most changed what a product could do, what a business could become, or how an organization worked.</p>
      <div class="pattern-cols">
        <div><p class="domain">Product</p><p class="verb">Transform</p><p class="gloss">Make complexity coherent.</p></div>
        <div><p class="domain">Business</p><p class="verb">Unlock</p><p class="gloss">Make value visible.</p></div>
        <div><p class="domain">Organization</p><p class="verb">Rewire</p><p class="gloss">Make change scale.</p></div>
      </div>
    </div>
  </div>
</section>

<!-- LEADERSHIP -->
<!-- ===== LEADERSHIP ===== -->
<section class="s" id="leadership" data-g="lead">
  <div class="wrap c">
    <p class="grp rv"><span class="grp-t">Leadership</span><span class="grp-n" aria-label="Section 3 of 8"><b>03</b> / 08</span></p>
    <p class="eyebrow rv">How I lead</p>
    <h2 class="h2 rv" style="--d:2">Great design scales through people.</h2>
    <p class="lede rv" style="--d:3">Leadership isn't about having all the answers. It's about creating the conditions for people, ideas and teams to become better.</p>
    <p class="credit rv"><span><strong>Top 250</strong> Great Managers, India (2021)</span><span><strong>10</strong> direct reports</span></p>

    <ol class="lindex">
      <li class="lrow rv" style="--d:0">
        <p class="lk"><span class="n">01</span><span class="name">Understand</span></p>
        <div class="lmain"><p class="head">Earn trust before asking for change.</p><p class="short">At Tresata, I spent my first month learning from engineers&mdash;not questioning their expertise, but understanding the reasoning behind it. That trust became the foundation for transforming how their capabilities reached customers.</p></div>
      </li>
      <li class="lrow rv" style="--d:1">
        <p class="lk"><span class="n">02</span><span class="name">Unlock</span></p>
        <div class="lmain"><p class="head">See the potential. Create the opportunity.</p><p class="short">At Indegene, I empowered leaders across levels to own conversations and decisions beyond their immediate roles.<br class="lbr"> Giving people room to lead helped extend design&rsquo;s influence across business units without making me the bottleneck.</p></div>
      </li>
      <li class="lrow rv" style="--d:2">
        <p class="lk"><span class="n">03</span><span class="name">Elevate</span></p>
        <div class="lmain"><p class="head">Make growth part of the work.</p><p class="short">Within the team, I introduced Builder&rsquo;s Day to give designers space to experiment, question established methods and build confidence with emerging technologies&mdash;making learning a shared responsibility, not an occasional activity.</p></div>
      </li>
      <li class="lrow rv" style="--d:3">
        <p class="lk"><span class="n">04</span><span class="name">Support</span></p>
        <div class="lmain"><p class="head">Understand the setback. Don&rsquo;t define the person by it.</p><p class="short">I&rsquo;ve seen how circumstances can affect even strong performers. My instinct is to understand what changed, work alongside them and help restore confidence and ownership&mdash;without losing sight of the standards we need to meet.</p></div>
      </li>
      <li class="lrow rv" style="--d:4">
        <p class="lk"><span class="n">05</span><span class="name">Influence</span></p>
        <div class="lmain"><p class="head">Challenge the thinking. Respect the people.</p><p class="short">When product and engineering teams were focused on differentiating existing features, I reframed the conversation around a simple question: &ldquo;Would someone actually pay for this?&rdquo; It shifted attention from what we could build to what customers would value.</p></div>
      </li>
    </ol>
    <p class="lit">Build people. Raise the collective. Extend the influence of design.</p>
  </div>
</section>

<!-- POINT OF VIEW -->
<section class="s g" id="pov" data-g="lead">
  <div class="wrap c">
    <p class="grp rv"><span class="grp-t">Point of view</span><span class="grp-n" aria-label="Section 4 of 8"><b>04</b> / 08</span></p>
    <h2 class="h2 rv" style="--d:2">Make the complex understandable.</h2>
    <p class="lede rv" style="--d:3">Every organization I have led has faced the same tension: change outrunning the clarity to act on it. I believe leadership's job is to close that gap, turning ambiguity into direction, and direction into results.</p>
    <div class="cols3 rv">
      <div><span class="num">01</span><h3>Complexity is an opportunity</h3><p>The harder the problem, the greater the leadership required. I bring together people, disciplines, and systems to find the shape inside the noise.</p></div>
      <div><span class="num">02</span><h3>Design shapes the business</h3><p>Good judgment shouldn't sit at the edges of a company. It belongs in strategy, in the room where priorities get set, deciding what actually survives contact with the market.</p></div>
      <div><span class="num">03</span><h3>Great design scales through people</h3><p>Craft alone doesn't scale; culture does. I build the teams and capability that let sound judgment show up in every decision, not just the ones I make myself.</p></div>
    </div>
    <p class="lit">Make technology human. Make design matter.</p>

  </div>
</section>

<!-- FUTURE -->
<section class="s" id="future" data-g="lead" style="padding-block:clamp(4rem,9vw,7rem)">
  <div class="wrap c">
    <div class="band-in">
      <p class="grp rv"><span class="grp-t">Future</span><span class="grp-n" aria-label="Section 5 of 8"><b>05</b> / 08</span></p>
      <h2 class="h2 w rv" style="--d:2">Intelligence is a relationship.</h2>

      <div class="fut-lead rv" style="--d:3">
        <p><span>For decades, we learned technology&rsquo;s language.</span> <span>Now, that relationship is beginning to reverse.</span></p>
        <p><span>So intelligence cannot simply learn who we are.</span> <span class="ink">It must understand who we are becoming,</span> <span class="ink">without trapping us in who we were.</span></p>
      </div>
      <p class="lit">And that changes the responsibility of design.</p>

      <details class="more rv" style="margin-top:3rem">
        <summary><span class="on-closed">Read the full thought +</span><span class="on-open">Hide the full thought −</span></summary>
        <div>
          <p class="beat quiet">Intelligence is learning ours: our behavior, context, intent, preferences and patterns. The instruction layer begins to disappear. Technology no longer needs to wait for every command. It can understand enough to know when to act.</p>
          <p class="beat">But understanding a human is not a one-time act.</p>
          <p class="beat quiet">We grow. We age. We learn. We forget. Our abilities change. Our expectations shift. Experiences reshape our decisions. Sometimes gradually. Sometimes overnight.</p>
          <p class="beat quiet">The more technology understands about us, the greater the consequence of what it chooses to do with that understanding. Progress cannot only be measured by what intelligence is capable of doing. We also have to consider what should remain ours to decide, when technology should act, when it should wait, and what parts of being human are worth protecting.</p>
          <p class="beat"><span>Because some decisions are reversible.</span><span>Their consequences may not be.</span></p>
          <p class="beat"><span>So perhaps the most important question about the future of intelligence isn&rsquo;t what we can make it do.</span><span>It is what happens to us when it can.</span></p>
          <p class="beat quiet">Not a prediction. Not an answer. A question worth carrying forward.</p>
        </div>
      </details>

      <div class="fut-q rv">
        <p class="provocation"><span>We built technology for humans.</span><span>What happens when it no longer needs us?</span></p>
        <p class="closing-q">Just because it&rsquo;s possible, should we?</p>
      </div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<!-- ===== ABOUT ===== -->
<section class="s g" id="about" data-g="about">
  <div class="wrap">
    <p class="grp rv"><span class="grp-t">About</span><span class="grp-n" aria-label="Section 6 of 8"><b>06</b> / 08</span></p>
    <div class="split about-split">
      <div class="rv"><figure class="portrait"><img src="/images/home/final/anish-portrait.webp" width="860" height="1075" alt="Anish Velayudhan Kutty, portrait" loading="lazy" decoding="async"></figure></div>
      <div class="about-copy rv" style="--d:1">
        <p class="eyebrow">My story</p>
        <h2 class="h2">Understand before you act.</h2>
        <p class="first">Long before design became my profession, understanding became my instinct.</p>
        <p>I've always been interested in why people, products, spaces and systems behave the way they do. Because everything we create develops character. Character shapes behavior. Behavior shapes relationships. And relationships begin with understanding.</p>
        <p>My path has crossed art, technology, teaching, making, mentoring and leadership. I don't see them as side chapters. They are different ways of understanding how people learn, create, decide and relate to the world around them.</p>
        <p class="close-lines"><span>The medium kept changing.</span><span>The instinct didn't.</span></p>
        <p class="craft-line">Art taught me to <b>see</b>. Design, to <b>shape</b>. UX, to <b>understand</b>. Product, to <b>prioritize</b>. Leadership, to <b>scale</b>. And AI is challenging me to <b class="ai">rethink what&rsquo;s possible</b>.</p>
        <p class="links l"><span>Download résumé ↘</span></p>
      </div>
    </div>

    <div class="recog c">
      <p class="eyebrow rv">Selected recognition</p>
      <p class="rec-line rv"><span>Recognized across four organizations. From founding Aatma Creative Space to leading design</span> <span>at global enterprises, I have moved through disciplines by design, not accident.</span></p>
    <div class="afeat rv">
      <div class="af-hero">
        <img class="af-logo" src="/images/home/final/great-manager-awards.webp" width="520" height="200" alt="The Great Manager Awards" loading="lazy" decoding="async">
        <p class="af-big">Top 250</p>
        <h3 class="af-title">Great Managers, India</h3>
        <p class="af-src"><b>Economic Times</b> · 2021</p>
        <p class="af-ctx"><span>While at</span> <span class="af-lg sm"><span class="logo-mark logo-svg logo-indegene" data-logo="Indegene" role="img" aria-label="Indegene"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 446.78 90.88"><rect class="ind-1" x="22.12" y="50.09" width="12.43" height="24.29"/><rect class="ind-1" y="19.38" width="12.43" height="54.99"/><path class="ind-1" d="M148.56,67.38a17.35,17.35,0,0,0-3.4-5.45,14.47,14.47,0,0,0-5-3.51,14.83,14.83,0,0,0-5.89-1.22,15.46,15.46,0,0,0-5.94,1.17,14.48,14.48,0,0,0-4.92,3.41,16,16,0,0,0-3.35,5.45,20.47,20.47,0,0,0-1.22,7.28,19.91,19.91,0,0,0,1.22,7.18,16,16,0,0,0,3.35,5.45,15.05,15.05,0,0,0,4.92,3.46,14.9,14.9,0,0,0,16.81-3.51,17.54,17.54,0,0,0,3.4-5.45,20.65,20.65,0,0,0,0-14.26m1.07,34v-9a27.82,27.82,0,0,1-7.37,7.13,19.23,19.23,0,0,1-10.92,3,24.18,24.18,0,0,1-9.25-1.83,22.94,22.94,0,0,1-7.93-5.45,28.19,28.19,0,0,1-5.59-8.81,31.18,31.18,0,0,1-2.13-11.92,32,32,0,0,1,2.08-11.92,27.22,27.22,0,0,1,5.54-8.81,22.67,22.67,0,0,1,8-5.45,24.55,24.55,0,0,1,9.3-1.84,19.68,19.68,0,0,1,11,2.85A30.17,30.17,0,0,1,149.63,56V27h12.43v74.36H149.63Z" transform="translate(-22.47 -27.03)"/><path class="ind-1" d="M207.64,70.74a20.85,20.85,0,0,0-1.32-5.55,14.36,14.36,0,0,0-2.75-4.48,13.09,13.09,0,0,0-4.13-3A12.82,12.82,0,0,0,194,56.58a12.44,12.44,0,0,0-9.42,3.92A17.68,17.68,0,0,0,180,70.74ZM185.43,89a15.3,15.3,0,0,0,10.19,3.51,18.05,18.05,0,0,0,7.95-1.63,25.52,25.52,0,0,0,6.62-4.79l7.23,6.42a29.73,29.73,0,0,1-9.22,7.33,27.67,27.67,0,0,1-12.78,2.75,28.66,28.66,0,0,1-10.85-2A26,26,0,0,1,170,86.06a29.69,29.69,0,0,1-2.14-11.46,30.24,30.24,0,0,1,1.94-10.9,27.4,27.4,0,0,1,5.45-8.91,26.19,26.19,0,0,1,8.3-6.06,24.72,24.72,0,0,1,10.59-2.24,25.52,25.52,0,0,1,11.25,2.34,23.21,23.21,0,0,1,8,6.32,27.48,27.48,0,0,1,4.84,9.27,37.42,37.42,0,0,1,1.63,11.11c0,.54,0,1.09-.05,1.63s-.09,1.12-.15,1.73H180.14q1.11,6.61,5.3,10.14" transform="translate(-22.47 -27.03)"/><path class="ind-1" d="M268,65.74a14.12,14.12,0,0,0-3.41-4.7,15.37,15.37,0,0,0-5-3A17.5,17.5,0,0,0,253.48,57a16.82,16.82,0,0,0-6,1.07,15.17,15.17,0,0,0-4.84,3,13.43,13.43,0,0,0-3.26,4.65,15.25,15.25,0,0,0-1.17,6.07,14.76,14.76,0,0,0,1.22,6.07,15,15,0,0,0,3.26,4.71,13.94,13.94,0,0,0,4.84,3,16.62,16.62,0,0,0,6,1.06,17.41,17.41,0,0,0,6.06-1.06A14.77,14.77,0,0,0,268,77.89a13.84,13.84,0,0,0,1.27-6A14.51,14.51,0,0,0,268,65.75m5.86,45.54q-7.55,6.61-21.39,6.62a44.8,44.8,0,0,1-24-6.42l4.58-9.27a40.7,40.7,0,0,0,9,4.17,32.64,32.64,0,0,0,10.19,1.53q8.25,0,12.63-4.19t4.38-12.38v-4.2a29,29,0,0,1-7.85,7.2,20.73,20.73,0,0,1-11.1,2.78,25.31,25.31,0,0,1-9.16-1.68,23.2,23.2,0,0,1-7.79-4.94,24.18,24.18,0,0,1-5.45-8,26.56,26.56,0,0,1-2-10.7,26.51,26.51,0,0,1,2-10.69,24.39,24.39,0,0,1,5.45-8,23.72,23.72,0,0,1,7.84-5,24.91,24.91,0,0,1,9.12-1.73,21.17,21.17,0,0,1,11.26,2.73,30.55,30.55,0,0,1,7.59,6.53V47.62h12.32V90.4q0,14.26-7.54,20.88" transform="translate(-22.47 -27.03)"/><path class="ind-1" d="M327,70.74a20.85,20.85,0,0,0-1.32-5.55,14.36,14.36,0,0,0-2.75-4.48,13.09,13.09,0,0,0-4.13-3,12.82,12.82,0,0,0-5.45-1.12,12.44,12.44,0,0,0-9.42,3.92,17.68,17.68,0,0,0-4.53,10.24ZM304.76,89A15.3,15.3,0,0,0,315,92.53a18.05,18.05,0,0,0,7.95-1.63,25.52,25.52,0,0,0,6.62-4.79l7.23,6.42a29.73,29.73,0,0,1-9.22,7.33,27.67,27.67,0,0,1-12.78,2.75,28.66,28.66,0,0,1-10.85-2,26,26,0,0,1-14.62-14.51,29.69,29.69,0,0,1-2.14-11.46,30.24,30.24,0,0,1,1.94-10.9,27.4,27.4,0,0,1,5.45-8.91,26.19,26.19,0,0,1,8.3-6.06,24.72,24.72,0,0,1,10.59-2.24,25.52,25.52,0,0,1,11.25,2.34,23.21,23.21,0,0,1,8.05,6.32,27.48,27.48,0,0,1,4.84,9.27,37.42,37.42,0,0,1,1.63,11.11c0,.54,0,1.09-.05,1.63s-.09,1.12-.15,1.73H299.47q1.11,6.61,5.3,10.14" transform="translate(-22.47 -27.03)"/><path class="ind-1" d="M357.37,101.4H344.94V47.62h12.43v8.44a31.32,31.32,0,0,1,2.89-3.65,18.95,18.95,0,0,1,8.23-5.14,19.18,19.18,0,0,1,5.64-.77q9.14,0,14.12,5.6t5,15.08v34.23H380.8V70.93q0-6.3-3-9.71t-8.43-3.4a11.32,11.32,0,0,0-8.68,3.51q-3.33,3.51-3.33,9.8v30.28Z" transform="translate(-22.47 -27.03)"/><path class="ind-1" d="M438.3,70.74A20.85,20.85,0,0,0,437,65.19a14.36,14.36,0,0,0-2.75-4.48,13.09,13.09,0,0,0-4.13-3,12.82,12.82,0,0,0-5.45-1.12,12.44,12.44,0,0,0-9.42,3.92,17.68,17.68,0,0,0-4.53,10.24ZM416.09,89a15.3,15.3,0,0,0,10.19,3.51,18.05,18.05,0,0,0,8-1.63,25.52,25.52,0,0,0,6.62-4.79l7.23,6.42a29.73,29.73,0,0,1-9.22,7.33,27.67,27.67,0,0,1-12.78,2.75,28.66,28.66,0,0,1-10.85-2,26,26,0,0,1-14.62-14.51,29.69,29.69,0,0,1-2.14-11.46,30.24,30.24,0,0,1,1.94-10.9,27.4,27.4,0,0,1,5.45-8.91,26.19,26.19,0,0,1,8.3-6.06,24.72,24.72,0,0,1,10.59-2.24A25.52,25.52,0,0,1,436,48.83a23.21,23.21,0,0,1,8.05,6.32,27.48,27.48,0,0,1,4.84,9.27,37.42,37.42,0,0,1,1.63,11.11c0,.54,0,1.09,0,1.63s-.09,1.12-.15,1.73H410.8q1.13,6.61,5.3,10.14" transform="translate(-22.47 -27.03)"/><rect class="ind-2" x="64.84" y="31.65" width="12.43" height="42.73"/><rect class="ind-1" x="64.84" y="19.22" width="12.43" height="12.42"/><rect class="ind-3" x="22.12" y="37.66" width="24.07" height="12.42"/><rect class="ind-3" x="22.12" y="19.22" width="42.72" height="12.42"/><rect class="ind-2" x="46.19" y="50.09" width="12.43" height="24.29"/><rect class="ind-1" x="46.19" y="37.66" width="12.43" height="12.42"/><rect class="ind-2" x="0.02" y="1" width="12.38" height="12.38"/><path class="ind-4" d="M461.61,57.55a7.15,7.15,0,1,1,7.14-7.15A7.15,7.15,0,0,1,461.61,57.55Z" transform="translate(-22.47 -27.03)"/><g class="ind-5"><g class="ind-5"><path class="ind-6" d="M465,54h-1.25l-1.32-2.49a1.32,1.32,0,0,0-.52-.55,1.67,1.67,0,0,0-.8-.16h-1.28V54h-1.12V46.25H462a3,3,0,0,1,2,.58,2.06,2.06,0,0,1,.67,1.67,2.11,2.11,0,0,1-.5,1.46,2.37,2.37,0,0,1-1.42.73,1.62,1.62,0,0,1,.94.86Zm-3.12-4.11a2,2,0,0,0,1.27-.34,1.53,1.53,0,0,0,0-2.07,2.11,2.11,0,0,0-1.28-.32h-2.06V49.9Z" transform="translate(-22.47 -27.03)"/></g></g></svg></span></span></p>
      </div>
      <ul class="af-list" role="list">
              <li class="af-row"><span class="af-lg"><span class="logo-mark logo-svg logo-walmart" data-logo="Walmart Labs" role="img" aria-label="Walmart Global Tech (Walmart Labs)"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1029.26 125.17"><path d="M306.45,66.29c0-12.32-5.26-23.16-23.05-23.16-9.13,0-16.38,2.57-20.34,4.85l2.9,9.9c3.61-2.28,9.38-4.17,14.83-4.17,9.02-.02,10.5,5.11,10.5,8.4v.78c-19.67-.03-32.1,6.78-32.1,20.66,0,8.47,6.33,16.41,17.34,16.41,6.77,0,12.43-2.7,15.82-7.03h.34s2.25,9.4,14.63,5.8c-.65-3.91-.86-8.08-.86-13.1v-19.34Zm-14.69,13.02c0,1-.09,2.04-.36,2.94-1.14,3.77-5.04,6.95-9.92,6.95-4.07,0-7.3-2.31-7.3-7.19,0-7.47,8.22-9.54,17.59-9.49v6.78ZM16.26,26.35c1.52,7.67,5.84,29.9,5.84,29.9,1.81,9.15,3.48,18.73,4.74,26.31h.22c1.23-8.05,3.15-15.68,5.21-25.13l7.27-31.09h16.08l6.8,31.9c1.79,8.87,3.2,15.71,4.32,23.96h.22c1.23-8.33,2.82-15.45,4.57-24.56l6.53-31.3h15.44l-19.12,72.39c-12.18,2.67-16.85-2.23-18.53-10.02-1.67-7.79-4.94-22.61-4.94-22.61-1.67-8.11-2.98-13.84-3.9-22.17h-.23c-1.31,8.25-2.67,14.03-4.71,22.14l-8.03,32.66c-12.44,2.48-16.75-1.2-19.14-11.17C12.85,79.02,0,26.35,0,26.35H16.26Zm121.12,39.94c0-12.32-5.26-23.16-23.05-23.16-9.14,0-16.39,2.57-20.34,4.85l2.89,9.9c3.62-2.28,9.38-4.17,14.83-4.17,9.03-.02,10.51,5.11,10.51,8.4v.78c-19.68-.03-32.1,6.78-32.1,20.66,0,8.47,6.33,16.41,17.33,16.41,6.77,0,12.44-2.7,15.83-7.03h.33s2.25,9.4,14.63,5.8c-.65-3.91-.86-8.08-.86-13.1v-19.34Zm-14.68,13.02c0,1-.09,2.04-.36,2.94-1.14,3.77-5.04,6.95-9.92,6.95-4.07,0-7.3-2.31-7.3-7.19,0-7.47,8.22-9.54,17.58-9.49v6.78Zm39.19,19.43h-14.7V26.35h14.7V98.74ZM368.7,26.35v17.12h12.8v13.85h-12.8v20.43c0,6.61,1.68,9.82,6.69,9.82,2.36,0,4.08-.29,5.58-.66l.19,11.49c-2.02,.75-6.29,1.58-10.64,1.58-5.11,0-9.38-1.78-11.97-4.54-2.96-3.15-4.35-8.31-4.35-15.67V26.35h14.5Zm-39.14,18.01v10.26h.41c2.7-7.83,9.14-11.48,14.8-11.48,1.42,0,2.2,.11,3.34,.34v14.24c-1.36-.2-2.62-.39-4.38-.39-6.4,0-10.86,3.73-11.99,9.56-.24,1.2-.33,2.51-.33,4.01v27.84h-15.16V44.36h13.3Zm-143.36,0v7.39h.22c2.51-3.96,6.64-8.62,15.84-8.62,7.16,0,12.65,3.87,14.99,9.73h.22c2.01-2.95,4.32-5.19,6.89-6.77,3.06-1.88,6.44-2.95,10.73-2.95,9.68,0,18.26,6.69,18.26,23.58v32.03h-14.77v-29.8c0-8.56-2.9-13.51-8.95-13.51-4.43,0-7.65,2.97-8.87,6.62-.42,1.26-.62,2.98-.62,4.41v32.28h-14.76v-30.99c0-7.27-2.79-12.32-8.75-12.32-4.77,0-7.76,3.76-8.98,6.97-.52,1.38-.69,2.96-.69,4.45v31.89h-14.78V44.36h14.03Z" fill="currentColor"/><g><path d="M407.43,35.65c.45-1.36,.76-2.78,1.37-4.06,.99-2.09,2.53-3.73,4.66-4.75,1.96-.94,3.81-.9,5.7,.37,10.93,7.33,21.89,14.6,32.84,21.89,2.03,1.35,4.09,2.65,6.11,4.01,6.57,4.39,6.54,14.04-.04,18.43-12.02,8.01-24.03,16.02-36.04,24.03-1.01,.68-2.04,1.33-3.03,2.04-1.46,1.06-3.03,1.18-4.67,.58-2.72-1-4.48-3.01-5.71-5.54-.97-1.98-1.38-4.07-.9-6.26,.34-1.56,1.2-2.7,2.66-3.43,12.84-6.39,25.66-12.8,38.49-19.21,.91-.45,1.81-.92,2.79-1.42-.2-.13-.33-.23-.48-.3-13.7-6.8-27.39-13.6-41.09-20.4-1.46-.72-2.15-1.98-2.5-3.49-.05-.21-.1-.42-.15-.63v-1.86Z" class="wm-spark"/><path d="M518.75,36.92c-.17,.69-.31,1.65-.63,2.55-.39,1.08-1.2,1.82-2.27,2.3-8.49,3.84-16.97,7.69-25.44,11.56-1.41,.65-2.69,.53-3.98-.23-2.42-1.44-3.95-4.66-3.45-7.26,.18-.93,.62-1.67,1.41-2.24,7.7-5.53,15.39-11.09,23.09-16.61,1.77-1.27,3.66-.97,5.4,.02,3.71,2.1,5.5,5.41,5.86,9.9Z" class="wm-spark"/><path d="M518.63,88.56c-.27,4.28-2.11,7.63-5.97,9.67-1.94,1.02-3.84,.89-5.73-.48-7.31-5.31-14.66-10.57-22.06-15.77-1.77-1.24-2.27-2.79-1.9-4.76,.42-2.28,1.6-4.06,3.62-5.23,1.15-.67,2.35-.77,3.62-.19,8.53,3.86,17.06,7.7,25.6,11.53,1.77,.79,2.55,2.23,2.8,4.05,.05,.39,0,.8,0,1.2Z" class="wm-spark"/><path d="M462.99,125.17c-2.63-.02-5.05-.65-6.98-2.55-1.12-1.1-1.58-2.42-1.41-4.03,.51-4.73,.93-9.48,1.4-14.21,.42-4.32,.82-8.64,1.29-12.96,.31-2.86,1.9-4.31,4.8-4.56,1.69-.14,3.32,.05,4.79,.98,1.06,.68,1.72,1.6,1.85,2.91,.48,5.05,.99,10.09,1.5,15.14,.42,4.16,.81,8.33,1.29,12.49,.26,2.22-.63,3.82-2.36,5.06-1.68,1.19-3.65,1.73-6.16,1.74Z" class="wm-spark"/><path d="M462.95,0c2.59-.09,4.89,.55,6.83,2.22,1.32,1.14,1.91,2.56,1.7,4.37-.44,3.85-.76,7.71-1.14,11.57-.42,4.3-.85,8.59-1.27,12.89-.11,1.08-.25,2.16-.3,3.24-.06,1.21-.62,2.1-1.56,2.79-2.22,1.65-6.04,1.65-8.27,.02-.88-.64-1.44-1.46-1.55-2.58-.36-3.75-.75-7.49-1.13-11.23-.43-4.21-.85-8.41-1.28-12.62-.15-1.5-.32-2.99-.44-4.49-.17-2.05,.92-3.44,2.48-4.54,1.64-1.15,3.51-1.63,5.92-1.63Z" class="wm-spark"/></g><g><path d="M579.61,25.49c10.14,0,17.47,3.51,24.3,9.34,.8,.8,.9,2.01,.1,2.81-.9,.9-2.01,1.91-2.81,2.81-.9,1-1.51,.9-2.61-.1-5.12-4.52-12.35-7.83-19.08-7.83-15.87,0-27.92,13.26-27.92,28.82s12.05,29.03,27.92,29.03c11.05,0,18.08-4.22,18.08-4.22v-14.06h-11.55c-1.11,0-1.91-.8-1.91-1.81v-3.72c0-1.1,.8-1.91,1.91-1.91h17.38c1,0,1.81,.9,1.81,1.91v23c0,.5-.4,1.31-.8,1.61,0,0-10.24,6.63-24.81,6.63-20.09,0-36.26-15.97-36.26-36.05s16.17-36.26,36.26-36.26Z" fill="currentColor"/><path d="M619.08,28.7c0-1.1,1-2.21,2.21-2.21h3.01c1.11,0,2.21,1.11,2.21,2.21V94.58c0,1.21-1.1,2.21-2.21,2.21h-3.01c-1.21,0-2.21-1-2.21-2.21V28.7Z" fill="currentColor"/><path d="M662.67,49.39c12.86,0,23.3,11.05,23.3,24.1s-10.45,24.41-23.3,24.41-23.3-11.15-23.3-24.41,10.44-24.1,23.3-24.1Zm0,41.78c9.14,0,15.87-8.04,15.87-17.68s-6.73-17.38-15.87-17.38-15.97,7.93-15.97,17.38,6.83,17.68,15.97,17.68Z" fill="currentColor"/><path d="M698.33,28.7c0-1.1,.9-2.21,2.11-2.21h3.01c1.11,0,2.21,1.11,2.21,2.21v23.6s5.12-2.91,12.86-2.91c13.86,0,21.89,10.54,21.89,24.1s-8.94,24.41-20.79,24.41c-7.13,0-11.75-3.11-14.66-5.92-.3,3.01-1.91,5.22-4.82,5.22-1.1,0-1.81-.7-1.81-1.81V28.7Zm7.33,54.84s4.82,7.63,13.16,7.63,14.06-8.54,14.06-17.58-5.32-17.48-15.47-17.48c-6.43,0-11.75,2.91-11.75,2.91v24.51Z" fill="currentColor"/><path d="M767.83,67.37c4.92,0,9.94,1.51,9.94,1.51,.1-8.54-4.02-12.75-10.64-12.75-5.12,0-8.64,2.01-10.75,2.71-1.21,.5-1.81-.1-2.21-1.21l-1-2.71c-.4-1.41,.3-2.01,1.41-2.51,2.31-1,6.53-3.01,12.96-3.01,11.85,0,17.38,7.03,17.38,19.48v26.51c0,1.1-.7,1.81-1.81,1.81-3.01,0-4.62-2.31-4.92-5.42-2.41,2.51-7.33,6.13-14.56,6.13-8.13,0-14.36-5.83-14.36-15.17,0-8.84,6.63-15.37,18.58-15.37Zm-2.91,23.8c5.72,0,10.75-3.21,12.76-6.23v-9.44c-1.51-.8-5.22-1.81-9.84-1.81-6.43,0-11.25,3.11-11.25,9.04,0,4.72,3.21,8.44,8.34,8.44Z" fill="currentColor"/><path d="M800.37,28.7c0-1.1,1-2.21,2.21-2.21h3.01c1.11,0,2.21,1.11,2.21,2.21V94.58c0,1.21-1.1,2.21-2.21,2.21h-3.01c-1.21,0-2.21-1-2.21-2.21V28.7Z" fill="currentColor"/><path d="M858.62,33.22h-17.48c-1.1,0-1.91-.9-1.91-1.91v-2.91c0-1,.8-1.91,1.91-1.91h42.58c1.11,0,1.91,.9,1.91,1.91v2.91c0,1-.8,1.91-1.91,1.91h-17.47v61.67c0,1-.9,1.91-1.91,1.91h-3.82c-1.01,0-1.91-.9-1.91-1.91V33.22Z" fill="currentColor"/><path d="M907.53,49.39c12.15,0,20.99,8.94,20.99,21.09,0,.8-.1,2.01-.2,2.81-.1,1.21-1.1,2.01-2.11,2.01h-33.74c.2,7.73,6.73,15.87,15.16,15.87,6.13,0,9.94-2.11,12.55-3.82,1.61-1.11,2.31-1.51,3.52,.3l1.21,1.71c.9,1.41,1.3,1.91-.4,3.21-2.81,2.21-8.94,5.32-16.97,5.32-14.06,0-22.5-11.05-22.5-24.3s8.44-24.2,22.5-24.2Zm13.56,19.99c-.2-6.83-5.62-13.26-13.56-13.26s-14.06,6.03-14.96,13.26h28.52Z" fill="currentColor"/><path d="M960.86,49.39c6.93,0,12.55,2.71,16.87,7.63,.9,1.1,.7,2.41-.4,3.31l-1.61,1.51c-1.51,1.31-2.41,.3-3.31-.7-3.21-3.62-6.93-5.02-11.65-5.02-8.84,0-15.87,7.83-15.87,17.48s6.93,17.58,15.57,17.58c7.03,0,10.04-3.62,12.65-6.63,1.31-1.51,2.61-1.1,3.92,.2l.6,.6c1,1,1.41,2.01,.6,3.21-3.52,5.12-9.74,9.34-17.48,9.34-13.76,0-23.4-10.24-23.4-24.2s10.04-24.3,23.5-24.3Z" fill="currentColor"/><path d="M990.29,28.7c0-1.1,1-2.21,2.21-2.21h3.01c1.11,0,2.21,1.11,2.21,2.21v26.62s5.42-5.93,14.76-5.93c11.55,0,16.77,7.13,16.77,20.69v24.5c0,1.21-1.11,2.21-2.21,2.21h-3.12c-1.21,0-2.21-1-2.21-2.21v-24.5c0-8.84-2.61-13.96-9.74-13.96-8.84,0-14.26,6.63-14.26,6.63v31.84c0,1.21-1.1,2.21-2.21,2.21h-3.01c-1.21,0-2.21-1-2.21-2.21V28.7Z" fill="currentColor"/></g></svg></span></span><p class="aw-org vh">Walmart Labs</p><h3 class="af-name">Bravo Award</h3><p class="af-meta">Design Excellence <span class="aw-yr">2018</span></p></li>
        <li class="af-row"><span class="af-lg"><span class="logo-mark logo-svg logo-sag" data-logo="Software AG" role="img" aria-label="Software AG"><svg aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 142 32" fill="none"><g clip-path="url(#aw-sag-clip)"><path d="M14.0217 13.3034C9.84961 12.2252 6.01779 10.862 6.01779 6.06567H0.000244141C0.000244141 15.0633 5.87584 17.1916 11.7796 18.6968C15.9517 19.775 19.7835 20.7479 19.7835 25.9345H25.8011C25.8011 16.8586 19.8409 14.8086 14.0217 13.3034Z" class="sag-s"></path><path d="M4.85388 31.9521H13.7095C17.0299 31.9521 19.7835 29.3979 19.7835 25.9346H4.85388V31.9521Z" fill="currentColor"></path><path d="M20.9192 0.0480957H12.0917C8.77139 0.0480957 6.01782 2.60229 6.01782 6.06564H20.9192V0.0480957Z" fill="currentColor"></path><path d="M37.6971 13.7208C35.5625 13.3941 34.7097 12.892 34.7097 12.1645C34.7097 11.437 35.6637 11.0601 36.6178 11.0601C37.647 11.0601 38.7524 11.6123 39.2795 12.6415L41.6395 11.1854C40.7106 9.37753 39.1041 8.39844 36.6178 8.39844C34.1314 8.39844 31.8476 9.95475 31.8476 12.2647C31.8476 14.4494 33.4039 15.679 36.0907 16.0809C38.124 16.4076 38.9778 16.8345 38.9778 17.6622C38.9778 18.3658 38.1741 18.8929 36.8683 18.8929C35.5625 18.8929 34.5584 18.014 34.1064 17.0098L31.4697 18.466C32.2234 20.374 34.2567 21.5546 36.7921 21.5546C39.6793 21.5546 41.889 20.0985 41.889 17.562C41.889 15.0256 40.2575 14.1227 37.696 13.7208H37.6971Z" fill="currentColor"></path><path d="M49.655 8.39722C45.8138 8.39722 42.9767 11.1341 42.9767 14.9753C42.9767 18.8165 45.8138 21.5534 49.655 21.5534C53.4962 21.5534 56.3583 18.8165 56.3583 14.9753C56.3583 11.1341 53.5212 8.39722 49.655 8.39722ZM49.655 18.8426C47.4953 18.8426 45.939 17.2612 45.939 14.9763C45.939 12.6914 47.4953 11.1101 49.655 11.1101C51.8146 11.1101 53.396 12.6914 53.396 14.9763C53.396 17.2612 51.8146 18.8426 49.655 18.8426Z" fill="currentColor"></path><path d="M124.006 8.39735C120.165 8.39735 117.528 11.1342 117.528 14.9754C117.528 18.8166 120.165 21.5535 124.006 21.5535C126.818 21.5535 128.4 20.5995 129.655 18.992L127.396 17.3094C126.642 18.2885 125.663 18.9408 124.006 18.9408C122.073 18.9408 120.742 17.6851 120.466 15.8021H130.333V14.7228C130.333 11.0069 127.771 8.39526 124.005 8.39526L124.006 8.39735ZM120.616 13.4191C121.118 11.9129 122.324 10.9088 124.005 10.9088C125.813 10.9088 126.993 12.0382 127.369 13.4191H120.615H120.616Z" fill="currentColor"></path><path d="M133.949 8.69897L131.94 13.5694H133.07L133.497 12.465H135.455L135.882 13.5694H137.011L135.003 8.69897H133.949ZM133.848 11.5611L134.476 9.90353L135.103 11.5611H133.847H133.848Z" fill="currentColor"></path><path d="M70.8295 4.98305H67.9674V8.699H62.0166V6.36401H65.481V3.67725H61.8903C60.1326 3.67725 59.1535 4.63129 59.1535 6.36401V8.699H56.5419V11.3858H59.1535V21.2529H62.0156V11.3858H67.9663V18.5411C67.9663 20.2988 68.9204 21.2529 70.7032 21.2529H74.344V18.5411H70.8285V11.3858H74.344V8.699H70.8285V4.98305H70.8295Z" fill="currentColor"></path><path d="M139.346 11.0091V11.8128H140.903C140.727 12.3149 140.35 12.7167 139.622 12.7167C138.718 12.7167 138.116 12.0132 138.116 11.1354C138.116 10.2575 138.743 9.55399 139.597 9.55399C140.249 9.55399 140.626 9.85565 140.852 10.2064L141.681 9.65419C141.304 9.02687 140.577 8.625 139.597 8.625C138.191 8.625 137.136 9.7544 137.136 11.1354C137.136 12.5163 138.141 13.6457 139.597 13.6457C141.053 13.6457 141.957 12.6666 141.957 11.2857V11.0091H139.345H139.346Z" fill="currentColor"></path><path d="M109.491 11.4108V21.2528H112.353V11.4108H117.098V8.69897H112.228C110.445 8.69897 109.491 9.65301 109.491 11.4108Z" fill="currentColor"></path><path d="M88.7811 17.11L86.4211 8.69897H83.0569L80.6968 17.11L78.3869 8.69897H75.2732L79.0392 21.2528H82.1529L84.7395 12.1383L87.325 21.2528H90.4387L94.2047 8.69897H91.1161L88.7811 17.11Z" fill="currentColor"></path><path d="M104.384 10.0798C103.681 9.07569 102.375 8.39722 100.618 8.39722C96.9769 8.39722 94.3663 11.109 94.3663 14.9753C94.3663 18.8416 96.9779 21.5534 100.618 21.5534C102.551 21.5534 103.681 20.7747 104.384 19.8206V21.2517H107.246V8.69783H104.384V10.0788V10.0798ZM100.918 18.8676C98.7848 18.8676 97.3026 17.3113 97.3026 14.9763C97.3026 12.6413 98.7837 11.085 100.918 11.085C103.053 11.085 104.534 12.6413 104.534 14.9763C104.534 17.3113 103.053 18.8676 100.918 18.8676Z" fill="currentColor"></path></g><defs><linearGradient id="aw-sag-grad" x1="-1.60304" y1="9.84321" x2="27.4044" y2="22.156" gradientUnits="userSpaceOnUse"><stop stop-color="#8E3CF7"></stop><stop offset="0.2" stop-color="#8E3CF7"></stop><stop offset="0.8" stop-color="#3CC1B6"></stop><stop offset="1" stop-color="#3CC1B6"></stop></linearGradient><clipPath id="aw-sag-clip"><rect width="141.958" height="32" fill="white"></rect></clipPath></defs></svg></span></span><p class="aw-org vh">Software AG</p><h3 class="af-name">Design Focus Award</h3><p class="af-meta">Product Engineering <span class="aw-yr">2017</span></p></li>
        <li class="af-row"><span class="af-lg"><span class="logo-mark logo-svg logo-infosys" data-logo="Infosys" role="img" aria-label="Infosys"><svg aria-hidden="true" focusable="false" viewBox="0 7.52 24 8.96" xmlns="http://www.w3.org/2000/svg"><path class="ifs" d="M23.2734 7.5703c-.3984 0-.7246.3282-.7246.7266 0 .4013.3262.7246.7246.7246.3982 0 .7266-.3233.7266-.7246 0-.3984-.3284-.7266-.7266-.7266zm0 .1074c.3395 0 .6192.2795.6192.6192 0 .3396-.2797.6172-.6192.6172-.3397 0-.6171-.2776-.6171-.6172 0-.3397.2774-.6192.6171-.6192zm-15.1367.0547c-.9001 0-1.549.5917-1.6387 1.6406h-.6953v.5215h.6856c.0028 1.6664-.002 3.334-.002 4.998h.7774c-.0022-1.6659-.002-3.3319-.002-4.998h1.748c-.646.5242-1.0663 1.3739-1.0663 2.334 0 1.593 1.1564 2.8848 2.582 2.8848 1.4258 0 2.582-1.2918 2.582-2.8848 0-.1896-.0174-.3753-.0488-.5547.2565.4131.7488.6133 1.4082.8985.7784.329 1.2129.6165 1.2129 1.1074 0 .5885-.556.8955-1.1817.8906-.611 0-1.0883-.249-1.6191-.7305v.9239c.3239.2088.8256.3281 1.3691.3281.6844-.0023 2.0918-.249 2.0918-1.6758-.0044-.8557-.715-1.2239-1.4863-1.5586-.9383-.4653-1.2965-.5629-1.2871-1.0957 0-.7088.6178-.9219 1.0996-.9219.2099 0 .3891.0293.5586.086.3163.1194.4209.3553.5332.6113.5283 1.2356 1.0344 2.4811 1.5488 3.7227-.2464.5637-.526 1.1519-.7168 1.5273l-.0039.0098-.1601.2969-.1797.336h.7617c.3322-.7342 1.7436-4.1688 2.0469-4.9083.1995.533.6857.7467 1.4297 1.0684.7783.329 1.2148.6166 1.2148 1.1074 0 .5886-.5562.8936-1.1816.8887-.6348 0-1.1257-.2685-1.6817-.7871l-.0507-.041v.9413c.3115.259.8713.4102 1.4824.4102.6844-.0022 2.0918-.249 2.0918-1.6758-.0042-.8557-.7151-1.2258-1.4863-1.5605-.9384-.4654-1.2593-.563-1.25-1.0957 0-.709.5787-.9219 1.0605-.9219.5483 0 .8958.2037 1.379.5547V9.584c-.3923-.1381-.7212-.1915-1.1642-.1895-.8912-.0018-1.6966.3234-1.9004 1.0762l-1.1054 2.7344-.1153.3437-.1015-.3437c-.5022-1.2089-.9934-2.4236-1.4863-3.6309-.3154-.0828-.8307-.201-1.1934-.1953-.0377-.0007-.0758-.0002-.1152 0-1.0302-.002-2.0235.4332-2.0235 1.457 0 .0596.0022.1155.006.17-.412-.9813-1.3036-1.6602-2.338-1.6602-.1245 0-.2472.0085-.3672.0273H7.254c-.1194-.733.2228-1.1503.7383-1.1503.6472-.0006.9242.192 1.205.4511 0 0 .0195-.0007.0274 0 .0038-.2457.002-.5318.002-.7949-.185-.0857-.5061-.1465-1.0899-.1465zM0 7.756v7.1367h.8594V7.7559zm23 .1386v.7657h.1387v-.3086h.164l.1192.3086h.1543l-.1407-.3301c.0494-.0248.1329-.0518.1329-.1875 0-.2224-.1673-.248-.3125-.248zm.1387.1328h.1543c.0834 0 .1289.0337.1289.1016 0 .068-.0524.0996-.1172.0996h-.166zM4.1719 9.3555c-.945 0-1.3429.3359-1.6582.6738a.2474.2474 0 00-.0352.0644h-.0078v-.043l-.0098-.623H1.707v5.4649h.7754v-3.9961c.0226-.4905.7134-.9746 1.252-.9746.6477 0 1.1777.4364 1.1777 1.039v3.9317h.7754c-.0019-1.429-.002-2.858-.002-4.2871-.0234-.4835-.6094-1.25-1.5136-1.25zm6.2832.5566c.9741-.0175 1.7825 1.0214 1.8047 2.3184.022 1.297-.7504 2.3614-1.7246 2.3789-.9742.0171-1.7825-1.0195-1.8047-2.3164-.0221-1.2971.7503-2.3634 1.7246-2.3809Z"/></svg></span></span><p class="aw-org vh">Infosys</p><h3 class="af-name">Best Contributor</h3><p class="af-meta">Branding &amp; Communication <span class="aw-yr">2013</span></p></li>
</ul>
    </div>
      <div class="beyond rv">
        <div class="bb-intro">
          <p class="bb-k">Beyond the boardroom</p>
          <h3 class="bb-h">Sharing perspectives. Shaping the next generation.</h3>
          <p class="bb-p">My engagement with academia and industry extends beyond the organizations I&rsquo;ve led&mdash;sharing perspectives on leadership, design and product thinking, while learning from the next generation of practitioners.</p>
        </div>
        <ul class="bb-list" role="list">
          <li><span class="bb-org">IIM Lucknow</span><span class="bb-role">Leadership Series Speaker</span></li>
          <li><span class="bb-org">College of Fine Arts, KCP</span><span class="bb-role">Guest Faculty &amp; External Jury</span></li>
          <li><span class="bb-org">NIFT Bengaluru</span><span class="bb-role">Guest Faculty &amp; External Jury</span></li>
          <li><span class="bb-org">Institute of Product Leadership</span><span class="bb-role">Guest Speaker &amp; Jury</span></li>
        </ul>
      </div>
    </div>

    <div class="voices2 c rv" id="voices">
      <p class="eyebrow">What people say</p>
      <div class="vsel" role="group" aria-label="Choose whose words to read">
        <button type="button" aria-pressed="true" aria-controls="v0">Senior leaders</button>
        <button type="button" aria-pressed="false" aria-controls="v1">Peers</button>
        <button type="button" aria-pressed="false" aria-controls="v2">People I led</button>
      </div>
      <div class="vq" aria-live="polite">
        <div class="rgrid" id="v0">
          <article class="rc">
            <p class="rc-q">&ldquo;These traits separately are rare, all these traits in one person are exceptionally rare. These traits in one person: Anish.&rdquo;</p>
            <details class="rc-more"><summary><span class="on-closed">Read full recommendation</span><span class="on-open">Hide full recommendation</span></summary>
            <div class="vf-text">
            <p class="vf-lead">Do you know the traits of best contributors (the four C) to an extremely modern innovation culture?</p>
            <ul class="vf-cs" role="list">
              <li><b>Curiosity</b> - the willingness to learn, to accept that the world is moving fast and we need to move fast as well,</li>
              <li><b>Creativity</b> - the ability to develop crazy ideas and to kill them in order to fail early,</li>
              <li><b>Collaboration</b> - the ability to work with others, to REALLY collaborate and</li>
              <li><b>Communication</b> - the ability to tell others how important their opinion is in an empathetic way.</li>
            </ul>
            <p class="vf-end">These traits separately are rare, all these traits in one person are exceptionally rare.</p>
            <p class="vf-punch">These traits in one person: Anish.</p>
          </div>
            </details>
            <footer class="rc-who"><img class="v-av" src="/images/home/final/recommendation-01.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span class="v-who"><b>Adam Egger</b><span>21 years at Software AG &middot; Advisor to B2B software CEOs</span><span class="v-ctx">Senior colleague at Software AG &middot; 2019</span></span></footer>
          </article>
          <article class="rc">
            <p class="rc-q">&ldquo;One of the best in the industry to drive User Experience for products - his impeccable focus on purpose, process &amp; quality always results in Best in class outcomes.&rdquo;</p>
            <details class="rc-more"><summary><span class="on-closed">Read full recommendation</span><span class="on-open">Hide full recommendation</span></summary>
            <div class="vf-text vf-paras">
              <p>Anish consistently stands out for his leadership qualities - organization first &amp; accountability, leading from the front, high level of empathy and emotional intelligence, hands on functional expertise, integrity and value system. One of the best in the industry to drive User Experience for products - his impeccable focus on purpose, process &amp; quality always results in Best in class outcomes.</p>
              <p>His ability to adapt and learn new concepts, tools and technology is exceptional. He consistently motivates his team with the same zeal to make it a great learning experience for each of them.</p>
              <p>Anish’s focus on deepening professional relationship with his colleagues makes it easier for them to have open conversations - be it around career advices or dealing with conflicts at workplace.</p>
              <p>Anish with his authenticity and clear sense of purpose would be a huge asset to his organization. Brings to the table an exceptional amount of talent and leadership that delivers a huge impact to strategic imperatives of the organization.</p>
              <p>During my 2 years of working relationship, I am glad that we developed a great professional bonding and more importantly found a ‘true’ friend !! My best to him always and wish that he continues to do exceptional things in his career!</p>
            </div>
            </details>
            <footer class="rc-who"><img class="v-av" src="/images/home/final/recommendation-02.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span class="v-who"><b>Dinesh Kumar</b><span>Chief Operating Officer, WiseEngage</span><span class="v-ctx">Worked together on the same team &middot; 2024</span></span></footer>
          </article>
          <article class="rc">
            <p class="rc-q">&ldquo;His products and standards are still used to this day as a basis to make many decisions.&rdquo;</p>
            <details class="rc-more"><summary><span class="on-closed">Read full recommendation</span><span class="on-open">Hide full recommendation</span></summary>
            <div class="vf-text vf-paras">
              <p>Anish was my UX expert for several retail products in Assortment management, Space management, Engineering platform products. His obsession to understand customer behavior, their problems and matching them with appropriate UX standards has been his strength.</p>
              <p>He was able to work with really difficult partners across multiple shores, and bring about a good solution. His products and standards are still used to this day as a basis to make many decisions.</p>
              <p>It was a delight to work with a creative person like Anish.</p>
            </div>
            </details>
            <footer class="rc-who"><img class="v-av" src="/images/home/final/recommendation-03.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span class="v-who"><b>Karthikeyan Kumaraguru</b><span>ML Platforms &amp; Conversational AI, Samsung</span><span class="v-ctx">Senior colleague &middot; 2020</span></span></footer>
          </article>
        </div>
        <div class="rgrid" id="v1" hidden>
          <article class="rc">
            <p class="rc-q">&ldquo;If you are creating a product, brain storming a new idea, ensure you start with him!&rdquo;</p>
            <details class="rc-more"><summary><span class="on-closed">Read full recommendation</span><span class="on-open">Hide full recommendation</span></summary>
            <div class="vf-text vf-paras">
              <p>Anish is very passionate about his work. He brings tons of experience from various stages of his life to create awesome designs. His creative thinking capabilities are off the charts and can set the bar high for engineering and technology teams.</p>
              <p>If you are creating a product, brain storming a new idea,  ensure you start with him!</p>
            </div>
            </details>
            <footer class="rc-who"><img class="v-av" src="/images/home/final/recommendation-04.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span class="v-who"><b>Prasanna Bableshwar</b><span>Technology Leader &middot; Cloud, Automation &amp; AI-driven hiring</span><span class="v-ctx">Worked together on the same team &middot; 2021</span></span></footer>
          </article>
          <article class="rc">
            <p class="rc-q">&ldquo;He is exceptionally good at interacting with people and he has exemplary skill to influence peers as well as seniors effectively.&rdquo;</p>
            <details class="rc-more"><summary><span class="on-closed">Read full recommendation</span><span class="on-open">Hide full recommendation</span></summary>
            <div class="vf-text vf-paras">
              <p>Smart, innovative and a champion of creative thinking are the attributes defines Anish. He is a very committed and hardworking person who spends time understanding the issues and thinking through solutions. He is exceptionally good at interacting with people and he has exemplary skill to influence peers as well as seniors effectively. His knowledge of design and aligning them to the people’s choice is something that anyone can admire. He differs from other people with his in-depth practical knowledge of possible outcomes. I have always seen him as a go-to person to discuss work, in most cases, he always had instant answers and ideas and doing it with ease. He keeps himself updated on the latest trend of work, and always come up with out of box solutions. He always makes you to think differently and provides a different dimension. He is one of the smart colleagues to have in our team. His multitasking ability was unlike I have seen before and made an applause-worthy increase in our company’s growth level. His work ethics is immaculate, and he goes out of his way when you ask for some help and guidance. He is great leader who leads by example. He is TedEx speaker, always conveys the message very accurately, and precisely. He is exceedingly a rare gem to be found and will be a great asset to any organization.</p>
            </div>
            </details>
            <footer class="rc-who"><img class="v-av" src="/images/home/final/recommendation-05.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span class="v-who"><b>Antony Prabhu J</b><span>Head, AI Product Management &middot; Life Sciences Strategy &amp; Consulting</span><span class="v-ctx">Worked together on the same team &middot; 2021</span></span></footer>
          </article>
          <article class="rc">
            <p class="rc-q">&ldquo;His ability to cut through the clutter and take control to provide simple and effective solution, and driving consensus within the team, makes him a “go to person”.&rdquo;</p>
            <details class="rc-more"><summary><span class="on-closed">Read full recommendation</span><span class="on-open">Hide full recommendation</span></summary>
            <div class="vf-text vf-paras">
              <p>It is a great pleasure to work with Anish who is an UX expert and also a champion of design thinking process. Anish is very user focused and he truly strives to bring a “wow” experience for the user in his design. With an open mind he is always ready to learn, un-learn and re-learn. He goes into grass roots to understand the business requirements and comes up with pragmatic yet innovative design. He is an avid thinker who evaluates every situation from multiple angles, works across all levels of hierarchy brainstorming for ideas and comes up with innovative solutions. Equipped with this key skill he comes across as a great partner for diverse product solutions across business units.</p>
              <p>His ability to cut through the clutter and take control to provide simple and effective solution, and driving consensus within the team, makes him a “go to person”. There are instances when Anish has ensured and enforced that even our clients follow a systematic process.</p>
              <p>Anish is a very passionate teacher and mentor willing to share his vast knowledge with everyone, irrespective of their age/ hierarchy. I have learnt a great deal from him. He is versatile and talented- I have seen his wonderful paintings and photography.</p>
            </div>
            </details>
            <footer class="rc-who"><img class="v-av" src="/images/home/final/recommendation-06.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span class="v-who"><b>Bhuma V</b><span>Director, Scientific Research &amp; Analytics, Indegene</span><span class="v-ctx">Worked together across teams &middot; 2020</span></span></footer>
          </article>
        </div>
        <div class="rgrid" id="v2" hidden>
          <article class="rc">
            <p class="rc-q">&ldquo;All in all, Anish is a rare leader who balances vision with execution, empathy with accountability, and strategic thinking with hands-on involvement.&rdquo;</p>
            <details class="rc-more"><summary><span class="on-closed">Read full recommendation</span><span class="on-open">Hide full recommendation</span></summary>
            <div class="vf-text vf-paras">
              <p>Throughout my time on Anish's Product team, I had the privilege of working closely with him and seeing his leadership firsthand. He genuinely cares about his team, not only about delivering results but also about supporting personal and professional growth. When it comes to ideation and execution, he welcomes input from everyone, regardless of title or position, creating a culture that truly enables innovation.</p>
              <p>Anish leads by example and never asks the team to do something he wouldn’t do himself. He is willing to be in the trenches when needed and ensures recognition goes where it is deserved. Just as importantly, he both gives and receives feedback openly and honestly, fostering a culture of trust and collaboration.</p>
              <p>All in all, Anish is a rare leader who balances vision with execution, empathy with accountability, and strategic thinking with hands-on involvement. His ability to create an environment where people feel both challenged and supported makes him a key enabler of meaningful results and genuine team growth. Any team or organization would be fortunate to have him.</p>
            </div>
            </details>
            <footer class="rc-who"><img class="v-av" src="/images/home/final/recommendation-07.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span class="v-who"><b>Dimitrios Chavouzis</b><span>Head of AI Engagements, Pareto.ai</span><span class="v-ctx">Reported to me directly &middot; 2025</span></span></footer>
          </article>
          <article class="rc">
            <p class="rc-q">&ldquo;What truly sets him apart is his remarkable ability to blend technical excellence with genuine compassion for his colleagues without assuming any sense of hierarchy.&rdquo;</p>
            <details class="rc-more"><summary><span class="on-closed">Read full recommendation</span><span class="on-open">Hide full recommendation</span></summary>
            <div class="vf-text vf-paras">
              <p>I had the privilege of working closely with Anish both as a senior leader in the organisation and as my assigned buddy. His impact as Director of Design &amp; Product extends far beyond his formal role. What truly sets him apart is his remarkable ability to blend technical excellence with genuine compassion for his colleagues without assuming any sense of hierarchy.</p>
              <p>Anish consistently demonstrates the top-notch professional ethics and design excellence. During our collaboration, I witnessed firsthand how he skilfully navigated complex requirements while never compromising on standards of excellence (which, btw, you will see in every aspect of his life) or professional integrity. His approach to problem-solving is both methodical and innovative, always pushing for solutions that cater to both business goals and customer centricity.</p>
              <p>What I found particularly impressive was his natural ability to guide team members through challenging situations. Whether it was a difficult project phase or a complex decision, Anish provided clear direction while ensuring everyone felt heard and valued. His door was always open, and he generously shared his wealth of experience to help others grow.</p>
              <p>Anish's reliability and work ethic are exemplary. He consistently delivers on his commitments while maintaining an unwavering focus on quality. Beyond his professional capabilities, he is a genuine well-wisher who actively invests in his colleagues' success and personal growth.</p>
              <p>Even with as many years of experience as he has, he has always shown a willingness to learn, an open-mind that is rather refreshing to experience and I will always fondly &amp; appreciatively remember the well thought-out perspectives he has brought to all our discussions.</p>
              <p>I truly wish him the best of everything in life.</p>
            </div>
            </details>
            <footer class="rc-who"><img class="v-av" src="/images/home/final/recommendation-08.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span class="v-who"><b>Himangi Ahuja</b><span>Marketing &amp; Communications, IIM Lucknow</span><span class="v-ctx">I was her senior leader and buddy &middot; 2024</span></span></footer>
          </article>
          <article class="rc">
            <p class="rc-q">&ldquo;He is an empathetic and supportive leader who helped me in discovering and embracing my strengths.&rdquo;</p>
            <details class="rc-more"><summary><span class="on-closed">Read full recommendation</span><span class="on-open">Hide full recommendation</span></summary>
            <div class="vf-text vf-paras">
              <p>I have had the privilege of working closely with a highly knowledgeable design practitioner like Anish. He is an empathetic and supportive leader who helped me in discovering and embracing my strengths. He leads by example and goes out of his way to help people learn and grow. He is very humble and approachable which makes him the “go-to person” for all things design!</p>
              <p>He guided me in crafting well-thought-out user-centric solutions and ensured that they align strongly with the product's purpose. I gained immense design knowledge from Anish which helps me in taking a more methodological approach to design now.</p>
              <p>Would love to work with Anish again if our paths were to cross! Thank you for all the support Anish :)</p>
            </div>
            </details>
            <footer class="rc-who"><img class="v-av" src="/images/home/final/recommendation-09.webp" width="48" height="48" alt="" loading="lazy" decoding="async"><span class="v-who"><b>Madhulika Yayavaram</b><span>Product Designer</span><span class="v-ctx">Worked together &middot; 2022</span></span></footer>
          </article>
        </div>
      </div>
      <p class="links v-more"><a href="https://www.linkedin.com/in/anishvelayudhankutty/details/recommendations/?detailScreenTabIndex=0" target="_blank" rel="noopener">Read more recommendations on LinkedIn ↗</a></p>
    </div>
  </div>
</section>

<!-- WHAT I'M LOOKING FOR -->
<section class="s" id="next" data-g="about">
  <div class="wrap c">
    <p class="grp rv"><span class="grp-t">What I'm looking for</span><span class="grp-n" aria-label="Section 7 of 8"><b>07</b> / 08</span></p>
    <h2 class="h2 w rv" style="--d:1"><span>Give me the problem.</span><span>Give me the trust.</span><span>Hold me accountable for what changes.</span></h2>
    <p class="lede rv lede-2l" style="--d:2"><span>I'm drawn to consequential problems where the answer isn't obvious, the existing model can be questioned,</span> <span>and there is enough ambition to imagine what could exist years ahead.</span></p>
    <div class="ask3 rv">
      <article class="a3">
        <p class="a3-k"><span>01</span> The problem</p>
        <h3>People shouldn&rsquo;t need to learn the language of a system before the system can understand them.</h3>
        <p class="a3-p">I want to help build products that feel closer to human expression than software operation, where people bring their intent and expertise, while the system handles more of what stands in between.</p>
        <ul class="a3-l" role="list">
          <li><b>Scale</b><span>Problems capable of transforming lives, not just improving metrics.</span></li>
          <li><b>Reinvention</b><span>Opportunities to question whether the way something works today should exist at all.</span></li>
          <li><b>Simplicity</b><span>Move sophistication into the system, not onto the customer.</span></li>
        </ul>
      </article>
      <article class="a3">
        <p class="a3-k"><span>02</span> The trust</p>
        <h3>Lead where business, technology, product, design and execution converge.</h3>
        <p class="a3-p">I want to be someone organizations turn to when the direction itself needs shaping, connecting possibilities across disciplines and translating them into action.</p>
        <ul class="a3-l" role="list">
          <li><b>Foresight</b><span>Organizations willing to think beyond today&rsquo;s conventions.</span></li>
          <li><b>Autonomy</b><span>Enough trust and mandate to challenge assumptions, cross boundaries and shape the path.</span></li>
        </ul>
      </article>
      <article class="a3">
        <p class="a3-k"><span>03</span> The accountability</p>
        <h3>Autonomy isn&rsquo;t freedom from outcomes. It comes with ownership of what follows.</h3>
        <p class="a3-p">The influence I value most is what remains when I&rsquo;m no longer in the room: a stronger instinct for what deserves to exist, what good looks like and when something can be better.</p>
        <p class="a3-leave"><span class="a3-lk">What I want to leave behind</span><span>Better taste.</span> <span>Higher standards.</span> <span>Stronger judgment.</span></p>
      </article>
    </div>
    <p class="a3-sig rv">Build what matters. Leave the standard higher than you found it.</p>
  </div>
</section>

<!-- CONVERSATION -->
<section class="s g" id="connect" data-g="about" style="padding-block:clamp(6rem,13vw,11rem)">
  <div class="wrap c">
    <p class="grp rv"><span class="grp-t">Conversation</span><span class="grp-n" aria-label="Section 8 of 8"><b>08</b> / 08</span></p>
    <h2 class="talk rv" style="margin-top:1.25rem">Great products are rarely built alone.</h2>
    <div class="h1-wrap ask-wrap"><h2 class="talk ask pt" id="ask">Let&rsquo;s build the next one together.</h2><canvas class="pfc" aria-hidden="true"></canvas></div>
    <div class="talk-actions rv"><span class="btn static">Schedule a conversation <span class="ar">→</span></span><a class="alt" href="https://www.linkedin.com/in/anishvelayudhankutty/" target="_blank" rel="noopener">LinkedIn</a><a class="alt" href="mailto:anishv.info@gmail.com">Email</a></div>
  </div>
</section>

</main>

<!-- SECTION NAVIGATOR: floating pill, opens a list of all sections -->
<nav class="secnav" aria-label="Sections">
  <div class="sn-panel" id="sn-panel" hidden>
    <ol class="sn-list">
      <li><a href="#work" data-i="0"><span class="sn-n">01</span><span class="sn-l">Work</span></a></li>
      <li><a href="#impact" data-i="1"><span class="sn-n">02</span><span class="sn-l">Impact</span></a></li>
      <li><a href="#leadership" data-i="2"><span class="sn-n">03</span><span class="sn-l">Leadership</span></a></li>
      <li><a href="#pov" data-i="3"><span class="sn-n">04</span><span class="sn-l">Point of view</span></a></li>
      <li><a href="#future" data-i="4"><span class="sn-n">05</span><span class="sn-l">Future</span></a></li>
      <li><a href="#about" data-i="5"><span class="sn-n">06</span><span class="sn-l">About</span></a></li>
      <li><a href="#next" data-i="6"><span class="sn-n">07</span><span class="sn-l">What I'm looking for</span></a></li>
      <li><a href="#connect" data-i="7"><span class="sn-n">08</span><span class="sn-l">Conversation</span></a></li>
    </ol>
  </div>
  <button class="sn-pill" type="button" aria-expanded="false" aria-controls="sn-panel">
    <span class="sn-c"><b>01</b>&nbsp;/&nbsp;08</span><span class="sn-sep" aria-hidden="true">·</span><span class="sn-t">Work</span>
    <svg class="sn-chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 7.5 6 4.5l3 3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </button>
</nav>

<!-- DIGITAL TWIN: a floating invitation, opened in an overlay -->
<a class="twin-fab" href="#twin" data-twin aria-label="Meet my digital twin, a 2-minute video">
  <span class="tf-dot" aria-hidden="true"><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>
  <span class="tf-l"><b>Meet my digital twin</b><span>2 min</span></span>
</a>
<dialog class="twin-dlg" id="twin" aria-labelledby="twin-h">
  <div class="td-in">
    <button class="td-x" type="button" aria-label="Close"><svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true"><path d="M2 2l10 10M12 2 2 12" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/></svg></button>
    <p class="eyebrow twin-k">A quick introduction</p>
    <h2 class="td-h" id="twin-h">The short version? Right here.</h2>
    <p class="td-p">A two-minute glimpse into how I think, what drives me, and the person behind the work.</p>
    <div class="video twin-media">
      <video class="twin-v" src="/videos/home/twin.mp4" poster="/images/home/final/twin-poster.jpg" preload="none" playsinline aria-label="Meet my digital twin video"></video>
      <div class="twin-q" role="group" aria-label="Video quality">
        <button type="button" data-src="/videos/home/twin.mp4" aria-pressed="true">1080p</button>
        <button type="button" data-src="/videos/home/twin-720.mp4" aria-pressed="false">720p</button>
      </div>
      <button class="twin-play" type="button" aria-label="Play Meet my digital twin video">
        <span class="playbig" aria-hidden="true"><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg></span>
        <span class="twin-cta"><span>Meet my digital twin</span><span class="twin-dur">2 min</span></span>
      </button>
    </div>
    <p class="vnote twin-note"><svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true"><circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M10 9v5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><circle cx="10" cy="6.3" r="1" fill="currentColor"/></svg>Presented through an AI-generated avatar, based on my own words and experiences.</p>
  </div>
</dialog>


<footer class="foot"><div class="wrap foot-in">
  <span class="foot-note">© 2026 Anish Velayudhan Kutty · Dashed and dotted frames mark material still to be added.</span>
</div></footer>`,
} as const;

export type HomeContent = typeof homeContent;
