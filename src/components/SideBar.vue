<template>
  <ul class="sidenav app-sidenav" :class="[{ open: modelValue }]">
    <li v-for="link in props.navList" :key="link.id">
      <router-link
        :to="{ name: link.nameUrl }"
        class="waves-effect waves-orange pointer"
        :exact="link.isExact"
        >{{ link.title }}</router-link
      >
    </li>
  </ul>
</template>

<script setup lang="ts">
import type INavItem from '@/types/INavItem'

const props = defineProps<{
  modelValue: boolean
  navList: INavItem[]
}>()
</script>
