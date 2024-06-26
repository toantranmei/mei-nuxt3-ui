<template>
  <nav aria-label="Breadcrumb" :class="ui.wrapper" v-bind="attrs">
    <ol :class="ui.ol">
      <li v-for="(link, index) in links" :key="index" :class="ui.li">
        <MeiLink
          as="span"
          :class="[ui.base, index === links.length - 1 ? ui.active : !!link.to ? ui.inactive : '']"
          :aria-current="index === links.length - 1 ? 'page' : undefined"
          v-bind="getMeiLinkProps(link)"
          @click="link.click"
        >
          <slot name="icon" :link="link" :index="index" :is-active="index === links.length - 1">
            <MeiIcon
              v-if="link.icon"
              :name="link.icon"
              :class="twMerge(twJoin(ui.icon.base, index === links.length - 1 ? ui.icon.active : !!link.to ? ui.icon.inactive : ''), link.iconClass)"
            />
          </slot>

          <slot :link="link" :index="index" :is-active="index === links.length - 1">
            <span v-if="link.label" :class="twMerge(ui.label, link.labelClass)">{{ link.label }}</span>
          </slot>
        </MeiLink>

        <slot v-if="index < links.length - 1" name="divider">
          <template v-if="divider">
            <MeiIcon v-if="divider.startsWith('i-')" :name="divider" :class="ui.divider.base" role="presentation" />
            <span v-else role="presentation">{{ divider }}</span>
          </template>
        </slot>
      </li>
    </ol>
  </nav>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'
import type { PropType } from 'vue'
import { twMerge, twJoin } from 'tailwind-merge'
import MeiIcon from '../elements/Icon.vue'
import MeiLink from '../elements/Link.vue'
import { useMeiUI } from '../../composables/useMeiUI'
import { mergeConfig, getMeiLinkProps } from '../../utils'
import type { BreadcrumbLink, Strategy } from '../../types'
// @ts-expect-error
import appConfig from '#build/app.config'
import { breadcrumb } from '#mei-ui/ui.config'

const config = mergeConfig<typeof breadcrumb>(appConfig.meiUI.strategy, appConfig.meiUI.breadcrumb, breadcrumb)

export default defineComponent({
  components: {
    MeiIcon,
    MeiLink
  },
  inheritAttrs: false,
  props: {
    links: {
      type: Array as PropType<BreadcrumbLink[]>,
      default: () => []
    },
    divider: {
      type: String,
      default: () => config.default.divider
    },
    class: {
      type: [String, Object, Array] as PropType<any>,
      default: () => ''
    },
    ui: {
      type: Object as PropType<Partial<typeof config> & { strategy?: Strategy }>,
      default: () => ({})
    }
  },
  setup (props) {
    const { ui, attrs } = useMeiUI('breadcrumb', toRef(props, 'ui'), config, toRef(props, 'class'))

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      getMeiLinkProps,
      twMerge,
      twJoin
    }
  }
})
</script>
