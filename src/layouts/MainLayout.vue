<template>
  <div class="app-main-layout">
    <nav-bar @onClick="onClick" />
    <side-bar :nav-list="navList" v-model="isOpenSB" />
    <main class="app-content" :class="[{ full: !isOpenSB }]">
      <div class="app-page">
        <RouterView />
      </div>
    </main>

    <div class="fixed-action-btn">
      <a class="btn-floating btn-large blue" href="#">
        <i class="large material-icons">add</i>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'

import type INavItem from '@/types/INavItem'

const navList: INavItem[] = [
  { id: 1, title: 'Счет', nameUrl: 'home', isExact: true },
  { id: 2, title: 'История', nameUrl: 'history' },
  { id: 3, title: 'Планирование', nameUrl: 'planning' },
  { id: 4, title: 'Новая запись', nameUrl: 'record' },
  { id: 5, title: 'Категории', nameUrl: 'categories' },
]

const isOpenSB = ref<boolean>(true)

const onClick = (): void => {
  isOpenSB.value = !isOpenSB.value
}
</script>
