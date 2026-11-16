// The "crop meter": a wood pigeon walks along a twig as the context window
// fills, and a pile of seeds beside it grows with the cached tokens.

export const short = (n: number): string =>
  n >= 1_000_000 ? `${(n / 1_000_000).toFixed(1)}M` : n >= 1000 ? `${(n / 1000).toFixed(1)}k` : `${n}`

export type MeterArgs = {
  percent: number | undefined
  tokens: number | undefined
  window: number
  cached: number
  sessionCached: number
  isWorking: boolean
}

const W = 460
const H = 66
const X0 = 34
const X1 = 300

export const meterSvg = ({ percent, tokens, window, cached, sessionCached, isWorking }: MeterArgs): string => {
  const p = Math.max(0, Math.min(100, percent ?? 0))
  const x = X0 + ((X1 - X0) * p) / 100
  const mood = p >= 85 ? 'full' : p >= 60 ? 'snug' : 'easy'
  const crop = p >= 85 ? 'crop nearly full' : p >= 60 ? 'crop filling up' : 'plenty of room'
  // Seeds: from 1 to 14, growing with how much of the context the cache served.
  const share = tokens ? cached / tokens : 0
  const seedCount = cached > 0 ? Math.max(1, Math.round(share * 14)) : 0
  const seeds = Array.from({ length: seedCount }, (_, i) => {
    const row = i < 6 ? 0 : i < 11 ? 1 : 2
    const col = row === 0 ? i : row === 1 ? i - 6 : i - 11
    const sx = 330 + col * 7 + row * 3.5
    const sy = 54 - row * 4.5
    return `<ellipse cx="${sx}" cy="${sy}" rx="3" ry="2" transform="rotate(${(i * 47) % 60 - 30} ${sx} ${sy})" />`
  }).join('')
  const title = `Context: ${tokens === undefined ? 'no reading yet' : `${tokens.toLocaleString()} of ${window.toLocaleString()} tokens (${p}%)`}
Cached on the last response: ${cached.toLocaleString()} tokens${tokens ? ` (${Math.round(share * 100)}% of the context)` : ''}
Cache reads this session: ${sessionCached.toLocaleString()} tokens`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<title>${title}</title>
<style>
  :root { --ink:#3a4050; --soft:#6a7082; --twig:#8a7360; --trail:#b5718f; --seed:#c9a66b; }
  @media (prefers-color-scheme: dark) { :root { --ink:#e6e3ec; --soft:#a9a6b5; --twig:#7a6656; --trail:#d494b0; --seed:#d8b77a; } }
  .snug { --trail:#c9952c } .full { --trail:#d0654c }
  text { font-family: ui-sans-serif, system-ui, sans-serif; fill: var(--ink) }
  .big { font-size: 15px; font-weight: 650 } .small { font-size: 11px; fill: var(--soft) }
  .twig { stroke: var(--twig); stroke-width: 3.5; stroke-linecap: round; fill: none; opacity: .55 }
  .trail { stroke: var(--trail); stroke-width: 3.5; stroke-linecap: round; fill: none }
  .leaf { fill: #7c9a5e }
  .seeds ellipse { fill: var(--seed) }
  .body,.head { fill: #8f9bb0 } .wing { fill: #7d889d } .breast { fill: #c49bac } .tailb { fill: #3b4150 }
  .patch { fill: #fff } .sheen { fill: #4fa37c; animation: sh 5s ease-in-out infinite alternate }
  .beak { fill: #e2785e } .legs { stroke: #d9707a; stroke-width: 1.6; stroke-linecap: round }
  @keyframes sh { to { fill: #8a6bb3 } }
  .bird { transition: transform .8s ease }
  .hd { animation: bob 1.2s ease-in-out infinite }
  @keyframes bob { 50% { transform: translateX(1.5px) } }
  .working .pk { transform-origin: 0px 0px; animation: peck 1.4s ease-in-out infinite }
  @keyframes peck { 0%,55%,100% { transform: rotate(0) } 70% { transform: rotate(24deg) } 80% { transform: rotate(6deg) } 88% { transform: rotate(24deg) } }
  .eye { animation: blink 4.5s infinite; transform-origin: 8px -16.5px }
  @keyframes blink { 0%,93%,100% { transform: scaleY(1) } 96% { transform: scaleY(.1) } }
  @media (prefers-reduced-motion: reduce) { * { animation: none !important } }
</style>
<g class="${mood} ${isWorking ? 'working' : ''}">
  <path class="twig" d="M${X0} 52 L${X1} 52" />
  <path class="trail" d="M${X0} 52 L${x.toFixed(1)} 52" />
  <path class="leaf" d="M${X1} 52 c6 -6 12 -6 16 -2 c-4 4 -10 6 -16 2 Z" />
  <path class="leaf" d="M${X1 - 8} 52 c2 6 0 10 -4 12 c-2 -4 0 -9 4 -12 Z" />
  <g class="bird" style="transform: translate(${x.toFixed(1)}px, 51px) scale(1.2)">
    <g class="pk">
      <line class="legs" x1="-2" y1="-5" x2="-3" y2="0" /><line class="legs" x1="2" y1="-5" x2="3" y2="0" />
      <path class="tailb" d="M-12 -12 L-22 -9 L-21 -6 L-11 -7 Z" />
      <ellipse class="body" cx="-2" cy="-11" rx="11" ry="7" />
      <ellipse class="breast" cx="4" cy="-10" rx="6" ry="6" />
      <path class="wing" d="M-11 -14 Q-2 -18 5 -14 Q2 -7 -9 -8 Z" />
      <g class="hd">
        <path class="body" d="M2 -15 Q4 -20 7 -22 L10 -19 Q9 -15 7 -13 Z" />
        <ellipse class="sheen" cx="6" cy="-17" rx="2.6" ry="1.4" />
        <ellipse class="patch" cx="5" cy="-15.5" rx="2.2" ry="1" />
        <circle class="head" cx="8" cy="-21" r="4.2" />
        <g class="eye"><circle cx="9.3" cy="-21.8" r="1" fill="#f1e6a6" /><circle cx="9.5" cy="-21.8" r=".5" fill="#2a2730" /></g>
        <path class="beak" d="M11.8 -21.4 L14.6 -20.2 L11.8 -19.4 Z" />
      </g>
    </g>
  </g>
  <text class="big" x="16" y="20">Context ${percent === undefined ? '—' : `${p}%`}</text>
  <text class="small" x="124" y="20">${tokens === undefined ? 'waiting for the first reply' : `${short(tokens)} / ${short(window)} · ${crop}`}</text>
  <g class="seeds">${seeds}</g>
  <text class="big" x="330" y="20">${short(cached)} cached</text>
  <text class="small" x="330" y="34">${short(sessionCached)} read this session</text>
</g>
</svg>`
}
