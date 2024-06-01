import type { AppConfig } from 'nuxt/schema'
import type { input } from '../ui-configs'
import type { ExtractDeepKey, ExtractDeepObject, NestedKeyOf } from '.'
import type colors from '#mei-ui-colors'

export type InputSize = keyof typeof input.size | ExtractDeepKey<AppConfig, ['ui', 'input', 'size']>
export type InputColor = keyof typeof input.color | ExtractDeepKey<AppConfig, ['ui', 'input', 'color']> | typeof colors[number]
export type InputVariant = keyof typeof input.variant | ExtractDeepKey<AppConfig, ['ui', 'input', 'variant']> | NestedKeyOf<typeof input.color> | NestedKeyOf<ExtractDeepObject<AppConfig, ['ui', 'input', 'color']>>
