# Wood pigeon 🕊

A Claude Code mod that gives the desktop and mobile apps a soft wood pigeon look.

- **Colours:** blue-grey surfaces, a rosy mauve accent from the pigeon's breast, green and purple from the sheen on its neck, and a coral beak for errors. Works in light and dark mode.
- **Pigeons:** an animated background with a pigeon cooing on an oak branch, one pecking at seeds, one strutting up and down, and one flying past now and then. Respects reduced-motion settings.
- **Context meter:** a strip above the message box where a pigeon walks along a twig as the context window fills (mauve, then amber from 60%, coral from 85%), with a pile of seeds for cached tokens: cache reads on the latest reply and the total this session. It pecks while Claude is working.

The terminal shows a one-line text version of the meter; themes and backgrounds only draw in the desktop and mobile apps.

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install wood-pigeon --marketplace bwoybcn/wood-pigeon-claude-mod
```

Answer `y` to add the marketplace, then pick a scope.

From a shell:

```bash
claude plugin install wood-pigeon --marketplace bwoybcn/wood-pigeon-claude-mod
```

## Files

- `hooks/register.tsx`: the colours, the background hook and the context meter hooks
- `hooks/scene.ts`: the animated pigeon background (SVG + CSS)
- `hooks/meter.ts`: the context and cache meter drawing
- `hooks/make-colors.js`: the theme colour builder that ships with Claude Code's mod tooling
