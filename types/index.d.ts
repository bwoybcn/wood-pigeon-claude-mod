export type Seeds = {
  /** Cache-read tokens on the main loop's latest response. */
  lastRead: number
  /** Cache-write tokens on the main loop's latest response. */
  lastWrite: number
  /** Cache-read tokens summed over this session's main-loop responses. */
  sessionRead: number
}

declare module 'claude-code' {
  interface PluginState {
    'wood-pigeon': { seeds: Seeds }
  }
}
