import type { Register } from 'claude-code'

const WIDTH = 10

function bar(percent: number): string {
  const p = Math.max(0, Math.min(100, percent))
  const filled = Math.round((p / 100) * WIDTH)
  return `${'█'.repeat(filled)}${'░'.repeat(WIDTH - filled)} ${Math.round(p)}%`
}

function k(n: number): string {
  return n >= 1000 ? `${Math.round(n / 1000)}k` : `${n}`
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    const u = await $.session.usage()
    const c = u.context
    const percent = c.percent ?? (c.tokens !== undefined && c.window ? (c.tokens / c.window) * 100 : 0)
    const detail = c.tokens !== undefined ? ` (${k(c.tokens)}/${k(c.window)})` : ''
    $.ui.status(`Tokens ${bar(percent)}${detail}`)
    return next(e)
  })

  on('session.measure', async ($, e, next) => {
    const u = await $.session.usage()
    const c = u.context
    const percent = c.percent ?? (c.tokens !== undefined && c.window ? (c.tokens / c.window) * 100 : 0)
    const detail = c.tokens !== undefined ? ` (${k(c.tokens)}/${k(c.window)})` : ''
    $.ui.status(`Tokens ${bar(percent)}${detail}`)
    return next(e)
  })
}
