<template>
  <div :class="skeletonClass" v-bind="attrs" />
</template>

<script lang="ts">
import { computed, toRef, defineComponent } from 'vue'
import type { PropType } from 'vue'
import { twMerge, twJoin } from 'tailwind-merge'
import { useMeiUI } from '../../composables/useMeiUI'
import { mergeConfig } from '../../utils'
import type { Strategy } from '../../types'
// @ts-expect-error
import appConfig from '#build/app.config'
import { skeleton } from '#mei-ui/ui.config'

const config = mergeConfig<typeof skeleton>(appConfig.meiUI.strategy, appConfig.meiUI.skeleton, skeleton)

export default defineComponent({
  inheritAttrs: false,
  props: {
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
    const { ui, attrs } = useMeiUI('skeleton', toRef(props, 'ui'), config)

    const skeletonClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.background,
        ui.value.rounded
      ), props.class)
    })

    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      skeletonClass
    }
  }
})
</script>
