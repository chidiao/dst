import { defineConfig, transformerDirectives, transformerVariantGroup } from 'unocss'
import presetWind4 from '@unocss/preset-wind4'
import presetIcons from '@unocss/preset-icons'

export default defineConfig({
  presets: [
    presetWind4(),
    presetIcons({
      scale: 1.2,
      warn: true
    })
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup()
  ],
  theme: {
    fontFamily: {
      sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      dst: ['dst', '"Noto Sans SC"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace']
    }
  },
  shortcuts: {
    wrap: 'mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8',
    card: 'rounded-2xl border border-amber-500/10 bg-stone-900/60 backdrop-blur-xl shadow-lg shadow-black/30',
    chip: 'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium',
    btn: 'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40 select-none',
    'btn-primary': 'btn bg-gradient-to-b from-amber-400 to-amber-600 text-stone-950 shadow-lg shadow-amber-900/40 hover:from-amber-300 hover:to-amber-500',
    'btn-ghost': 'btn border border-white/10 bg-white/5 text-stone-200 hover:bg-white/10',
    'btn-danger': 'btn border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/20',
    input: 'w-full rounded-xl border border-white/10 bg-black/30 px-4 py-2.5 text-sm text-stone-100 placeholder-stone-500 outline-none transition-all focus:border-amber-400/50 focus:ring-2 focus:ring-amber-400/20'
  }
})