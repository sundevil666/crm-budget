<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCounterStore } from '@/stores/counter'

import EmptyLayout from '@/layouts/EmptyLayout.vue'
import MainLayout from '@/layouts/MainLayout.vue'

const movieStore = useCounterStore()

const route = useRoute()

const layout = computed(() =>
  route.meta?.layout === 'main' ? MainLayout : EmptyLayout
)
</script>
