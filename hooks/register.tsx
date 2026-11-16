import { atom, read, update } from 'claude-code'
import type { Register, ThemeSetArgs } from 'claude-code'

import type { Seeds } from '../types'
import { makeColors } from './make-colors.js'
import { meterSvg, short } from './meter'
import { SCENE } from './scene'

const seeds = atom({ plugin: 'wood-pigeon', key: 'seeds' } as const, {
  lastRead: 0,
  lastWrite: 0,
  sessionRead: 0,
} as Seeds)

// Wood pigeon: blue-grey plumage, a mauve-pink breast, the iridescent green
// and purple neck sheen, a coral beak with a yellow tip.
const { theme, problems } = makeColors({
  label: 'Wood pigeon',
  roles: {
    accent: '#a8607f', // rosy breast
    danger: '#c8553d', // coral beak
    success: '#3f8a5f', // green neck sheen
    warning: '#c9952c', // beak tip
    pro: '#7b5ea8', // purple neck sheen
  },
  light: {
    gray: {
      anchors: {
        'surface-0': '#e3e5ec',
        'surface-1': '#ebedf2',
        'surface-2': '#f5f5f8',
        'text-primary': '#252a36',
        'text-secondary': '#434a5a',
        'text-muted': '#5a6173',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#1a1c24',
        'surface-1': '#21242d',
        'surface-2': '#282b35',
        'surface-3': '#2e313c',
        'text-primary': '#eceaf1',
        'text-secondary': '#cac7d3',
        'text-muted': '#a5a2b1',
      },
    },
  },
})

const LOOK: ThemeSetArgs = {
  colors: theme,
  backdrop: { scene: 'wood-pigeons', glass: { blur: 14, opacity: 0.72 } },
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))

    if (unpainted !== undefined) {
      $.ui.toast(unpainted)
    }
    const set = await $.theme.set(LOOK)

    if (!set.isDrawn) {
      $.ui.status(set.reason)
    }

    return next(e)
  })

  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if ((e.surface !== 'desktop' && e.surface !== 'mobile') || e.props.plugin !== 'wood-pigeon') {
      return next(e)
    }
    const { Svg } = $.ui.resolve(e)

    return (
      <Svg
        source={SCENE}
        alt="Wood pigeons pottering about: one cooing on an oak branch, one pecking at seeds, one strutting, and one flying past"
        isInteractive
      />
    )
  })

  // Each main-loop model response: note what the prompt cache served.
  on('turn.step', async function* ($, e, next) {
    const result = yield* next(e)
    const usage = result.usage

    if (e.agentId === undefined && usage !== null) {
      await update($, seeds, s => ({
        lastRead: usage.cache_read_input_tokens,
        lastWrite: usage.cache_creation_input_tokens,
        sessionRead: s.sessionRead + usage.cache_read_input_tokens,
      }))
    }

    return result
  })

  // The crop meter, above the prompt.
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) {
      return next(e)
    }
    const { context } = await $.session.usage()
    const s = await read($, seeds)
    const { Box, Text } = $.ui.resolve(e)

    if (e.surface === 'desktop' || e.surface === 'mobile') {
      const { Svg } = $.ui.resolve(e)
      const svg = meterSvg({
        percent: context.percent,
        tokens: context.tokens,
        window: context.window,
        cached: s.lastRead,
        sessionCached: s.sessionRead,
        isWorking: e.props.isWorking,
      })

      return (
        <Box>
          <Svg
            source={svg}
            isInteractive
            alt={`Context ${context.percent ?? 0}% used; ${short(s.lastRead)} tokens cached on the last response, ${short(s.sessionRead)} read from cache this session`}
          />
        </Box>
      )
    }

    return (
      <Box>
        <Text dimColor>
          🕊 context {context.percent ?? 0}% · {short(s.lastRead)} cached · {short(s.sessionRead)} cache reads this session
        </Text>
      </Box>
    )
  })
}
