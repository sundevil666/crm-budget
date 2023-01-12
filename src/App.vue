<template>
  <component :is="tab">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { watch, computed, markRaw, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useCounterStore } from '@/stores/counter'

import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const movieStore = useCounterStore()

const route = useRoute()
const tab = ref(null)
const routerMeta: any = computed(() => route.meta?.layout)

watch(
  () => routerMeta.value as string | undefined,
  async () => {
    tab.value = markRaw(routerMeta.value === 'main' ? MainLayout : EmptyLayout)
  },
  { immediate: true }
)
</script>
