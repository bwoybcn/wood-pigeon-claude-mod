// The backdrop: a soft woodland sky, an oak branch, drifting feathers and
// three wood pigeons doing their thing. Pure SVG + CSS, no script.

type Pigeon = {
  id: string
  // Seconds to offset this bird's animations, so they don't move in unison.
  delay: number
}

// One wood pigeon facing right, in a 120 x 100 box, feet at about (62, 94).
const pigeon = ({ id, delay }: Pigeon): string => `
<g class="bird ${id}" style="--d:${delay}s">
  <g class="peck">
    <g class="legs">
      <path d="M58 78 L56 93 M56 93 l-5 1 M56 93 l4 1" />
      <path d="M67 78 L69 93 M69 93 l-4 1 M69 93 l5 1" />
    </g>
    <path class="tail" d="M28 52 L3 57 Q0 62 4 66 L30 66 Z" />
    <path class="tailband" d="M8 56.3 L3 57 Q0 62 4 66 L9 66 Z" />
    <ellipse class="body" cx="55" cy="60" rx="34" ry="21" />
    <ellipse class="breast" cx="76" cy="62" rx="17" ry="17" />
    <path class="wing" d="M30 50 Q52 40 74 50 Q66 70 34 66 Q26 60 30 50 Z" />
    <path class="wingbar" d="M50 46 Q58 45 64 47 Q60 50 52 50 Z" />
    <path class="primaries" d="M30 56 Q24 62 34 66 Q30 61 30 56 Z" />
    <g class="head">
      <path class="neck" d="M72 52 Q74 38 82 30 L94 34 Q92 48 86 54 Z" />
      <ellipse class="sheen" cx="84" cy="43" rx="7.5" ry="4" transform="rotate(-25 84 43)" />
      <ellipse class="patch" cx="81" cy="47" rx="6" ry="3" transform="rotate(-20 81 47)" />
      <circle class="headc" cx="89" cy="30" r="12" />
      <g class="eye">
        <circle cx="93" cy="27.5" r="2.6" fill="#f1e6a6" />
        <circle cx="93.4" cy="27.5" r="1.2" fill="#2a2730" />
      </g>
      <path class="beak" d="M99.5 29 Q107 31 108.5 33.5 Q104 34.5 99.5 33.5 Z" />
      <path class="beaktip" d="M105 31.6 Q107.5 32.4 108.5 33.5 Q106.5 34 104.6 33.9 Z" />
      <circle class="cere" cx="100" cy="30.2" r="1.3" />
      <circle class="blush" cx="95" cy="35" r="2.6" />
    </g>
  </g>
</g>`

// A pigeon in flight, wings flapping, facing right in a 140 x 80 box.
const flyer = `
<g class="flyer">
  <path class="tail" d="M20 40 L0 34 L0 48 Z" />
  <path class="tailband" d="M5 35.5 L0 34 L0 48 L5 46.5 Z" />
  <path class="wing far" d="M55 36 Q60 10 82 2 Q74 22 72 38 Z" />
  <ellipse class="body" cx="56" cy="41" rx="34" ry="12" />
  <ellipse class="breast" cx="76" cy="44" rx="14" ry="9" />
  <path class="patch" d="M86 36 q4 -1 6 1 q-3 2 -6 -1 Z" />
  <circle class="headc" cx="96" cy="35" r="9" />
  <circle cx="99" cy="33.5" r="1.6" fill="#f1e6a6" />
  <circle cx="99.2" cy="33.5" r="0.8" fill="#2a2730" />
  <path class="beak" d="M104 34 L111 36 L104 38 Z" />
  <path class="wing near" d="M50 40 Q56 70 80 78 Q74 56 74 42 Z" />
  <path class="wingbar" d="M56 50 Q60 56 64 58 Q60 54 58 48 Z" />
</g>`

const heart = (x: number, y: number, cls: string): string =>
  `<path class="heart ${cls}" d="M${x} ${y + 3} c-3 -5 -9 -1 0 6 c9 -7 3 -11 0 -6 Z" />`

const feather = (cls: string): string =>
  `<g class="feather ${cls}"><path d="M0 0 Q6 -10 2 -22 Q-5 -10 0 0 Z" /><path class="rachis" d="M0 0 Q2 -11 2 -22" /></g>`

const leaf = (x: number, y: number, r: number, s = 1): string =>
  `<path class="leaf" transform="translate(${x} ${y}) rotate(${r}) scale(${s})" d="M0 0 C6 -4 10 -2 12 -8 C16 -4 20 -6 22 -2 C26 0 24 4 28 6 C22 8 20 12 14 10 C10 14 4 10 0 0 Z" />`

const STYLE = `
:root { --sky0:#e9e7f0; --sky1:#f4eef0; --cloud:#ffffff; --branch:#6d5847; --leaf:#7c9a5e; --leaf2:#9bb27a; --ground:#d8d6c6; }
@media (prefers-color-scheme: dark) {
  :root { --sky0:#191b25; --sky1:#2a2433; --cloud:#3a3a4c; --branch:#4b3d33; --leaf:#4b6340; --leaf2:#5d7650; --ground:#24242c; }
}
.sky0 { stop-color: var(--sky0) } .sky1 { stop-color: var(--sky1) }
.cloud { fill: var(--cloud); opacity: .55 }
.branch { stroke: var(--branch); stroke-width: 9; stroke-linecap: round; fill: none }
.twig { stroke: var(--branch); stroke-width: 4; stroke-linecap: round; fill: none }
.leaf { fill: var(--leaf) } .leaf:nth-child(even) { fill: var(--leaf2) }
.grass { stroke: var(--leaf); stroke-width: 2.5; stroke-linecap: round; fill: none; opacity: .7 }
.ground { fill: var(--ground); opacity: .6 }

.body, .headc, .neck { fill: #8f9bb0 }
.wing { fill: #7d889d } .tail { fill: #8693a8 } .tailband { fill: #3b4150 }
.primaries { fill: #4a5161 }
.breast { fill: #c49bac }
.wingbar, .patch { fill: #ffffff }
.sheen { fill: #4fa37c; opacity: .85; animation: shimmer 6s ease-in-out infinite alternate }
.beak { fill: #e2785e } .beaktip { fill: #f2cf6b } .cere { fill: #f3efe8 }
.blush { fill: #e99aaa; opacity: .45 }
.legs path { stroke: #d9707a; stroke-width: 2.6; stroke-linecap: round; fill: none }
.heart { fill: #e48aa3; opacity: 0 }
.feather path { fill: #b7bfce } .feather .rachis { fill: none; stroke: #ffffff; stroke-width: .8 }

@keyframes shimmer { 0% { fill: #4fa37c } 50% { fill: #5f8fb0 } 100% { fill: #8a6bb3 } }

/* Pigeon walk: the head bobs forward and back. */
.head { animation: bob .9s ease-in-out infinite; animation-delay: var(--d) }
@keyframes bob { 0%,100% { transform: translateX(0) } 45% { transform: translateX(5px) } }

/* A peck at the ground every so often. */
.peck { transform-origin: 62px 93px; animation: peck 7s ease-in-out infinite; animation-delay: var(--d) }
@keyframes peck { 0%,70%,100% { transform: rotate(0) } 75% { transform: rotate(28deg) } 79% { transform: rotate(4deg) } 83% { transform: rotate(28deg) } 88% { transform: rotate(0) } }

.eye { transform-origin: 93px 27.5px; animation: blink 5s infinite; animation-delay: var(--d) }
@keyframes blink { 0%,94%,100% { transform: scaleY(1) } 97% { transform: scaleY(.1) } }

/* The strutter wanders back and forth along the bottom right. */
.stroll { animation: stroll 26s ease-in-out infinite }
@keyframes stroll {
  0% { transform: translate(0,0) scaleX(1) } 40% { transform: translate(-190px,0) scaleX(1) }
  42% { transform: translate(-190px,0) scaleX(-1) translateX(-120px) } 88% { transform: translate(0,0) scaleX(-1) translateX(-120px) }
  90%,100% { transform: translate(0,0) scaleX(1) }
}
.stroll .bird { animation: hop .45s ease-in-out infinite }
@keyframes hop { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-2px) } }

/* The branch sitter puffs up happily and coos. */
.puff { transform-origin: 60px 90px; animation: puff 6s ease-in-out infinite }
@keyframes puff { 0%,60%,100% { transform: scale(1) } 70%,80% { transform: scale(1.07, 1.1) } }
.coo .heart { animation: float 6s ease-out infinite }
.coo .h2 { animation-delay: .5s } .coo .h3 { animation-delay: 1s }
@keyframes float { 0%,62% { opacity: 0; transform: translate(0,0) } 70% { opacity: .9 } 100% { opacity: 0; transform: translate(10px,-40px) } }

/* A pigeon flies across the top now and then. */
.flight { animation: fly 48s linear infinite; animation-delay: 8s; transform: translateX(-300px) }
@keyframes fly {
  0% { transform: translate(-300px, 120px) } 22% { transform: translate(1700px, 30px) }
  100% { transform: translate(1700px, 30px) }
}
.flyer .near { transform-origin: 62px 42px; animation: flapn .35s ease-in-out infinite alternate }
.flyer .far { transform-origin: 62px 38px; animation: flapf .35s ease-in-out infinite alternate }
@keyframes flapn { from { transform: scaleY(1) } to { transform: scaleY(-.55) } }
@keyframes flapf { from { transform: scaleY(1) } to { transform: scaleY(-.6) } }

.feather { opacity: 0; animation: drift 22s linear infinite }
.f2 { animation-delay: 9s } .f3 { animation-delay: 16s }
@keyframes drift {
  0% { opacity: 0; transform: translate(0,0) rotate(0) } 8% { opacity: .8 }
  50% { transform: translate(-60px, 260px) rotate(40deg) } 90% { opacity: .6 }
  100% { opacity: 0; transform: translate(20px, 560px) rotate(-20deg) }
}
.cloud { animation: clouds 90s linear infinite alternate }
@keyframes clouds { from { transform: translateX(0) } to { transform: translateX(80px) } }

@media (prefers-reduced-motion: reduce) { * { animation: none !important } }
`

const branch = `
<path class="branch" d="M1420 140 Q1300 150 1180 128 Q1120 118 1060 130" />
<path class="twig" d="M1250 142 Q1230 175 1205 190" />
<path class="twig" d="M1120 124 Q1100 95 1080 82" />
${leaf(1205, 188, 100)}${leaf(1195, 186, 60, 0.9)}${leaf(1080, 82, 200)}${leaf(1062, 128, 180, 1.1)}
${leaf(1078, 86, 250, 0.8)}${leaf(1330, 150, 80)}${leaf(1360, 140, 30, 0.9)}${leaf(1290, 146, 120, 0.8)}`

export const SCENE = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
<style>${STYLE}</style>
<defs>
  <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" class="sky0" /><stop offset="1" class="sky1" />
  </linearGradient>
</defs>
<rect width="100%" height="100%" fill="url(#sky)" />

<!-- Clouds and feathers across the whole window. -->
<svg width="100%" height="100%" viewBox="0 0 1400 1000" preserveAspectRatio="xMidYMin slice">
  <g class="cloud">
    <ellipse cx="260" cy="150" rx="120" ry="34" /><ellipse cx="330" cy="130" rx="80" ry="38" />
    <ellipse cx="820" cy="260" rx="140" ry="30" /><ellipse cx="760" cy="244" rx="70" ry="30" />
  </g>
  <g transform="translate(420 -30) scale(1.7)">${feather('f1')}</g>
  <g transform="translate(980 -30) scale(1.7)">${feather('f2')}</g>
  <g transform="translate(180 -30) scale(1.7)">${feather('f3')}</g>
</svg>

<!-- The flyer, along the top. -->
<svg width="100%" height="100%" viewBox="0 0 1400 1000" preserveAspectRatio="xMidYMin meet">
  <g class="flight"><g transform="scale(1.3)">${flyer}</g></g>
</svg>

<!-- Top right: a happy pigeon on an oak branch. -->
<svg width="100%" height="100%" viewBox="0 0 1400 1000" preserveAspectRatio="xMaxYMin meet">
  ${branch}
  <g transform="translate(1196 -4) scale(1.4)">
    <g class="puff">${pigeon({ id: 'sitter', delay: 0.3 })}</g>
    <g class="coo">${heart(104, 6, 'h1')}${heart(114, 0, 'h2')}${heart(96, -4, 'h3')}</g>
  </g>
</svg>

<!-- Bottom left: a pigeon pecking at seeds. -->
<svg width="100%" height="100%" viewBox="0 0 1400 1000" preserveAspectRatio="xMinYMax meet">
  <ellipse class="ground" cx="110" cy="992" rx="170" ry="22" />
  <path class="grass" d="M20 990 q4 -18 0 -30 M30 990 q-2 -14 6 -24 M200 990 q3 -16 -2 -26 M212 990 q-4 -12 4 -20" />
  <g fill="#c9a66b"><circle cx="152" cy="986" r="2" /><circle cx="160" cy="989" r="2" /><circle cx="146" cy="990" r="1.8" /></g>
  <g transform="translate(40 858) scale(1.4)">${pigeon({ id: 'pecker', delay: 1.7 })}</g>
</svg>

<!-- Bottom right: a pigeon strutting up and down. -->
<svg width="100%" height="100%" viewBox="0 0 1400 1000" preserveAspectRatio="xMaxYMax meet">
  <ellipse class="ground" cx="1180" cy="992" rx="240" ry="20" />
  <path class="grass" d="M1360 990 q4 -18 0 -30 M1372 990 q-2 -14 6 -24 M1010 990 q3 -14 -2 -22" />
  <g transform="translate(1200 858) scale(1.4)"><g class="stroll">${pigeon({ id: 'strutter', delay: 0 })}</g></g>
</svg>
</svg>`
