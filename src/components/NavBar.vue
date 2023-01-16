<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="onClick">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">
          {{ dateFilter(date, 'datetime') }}
        </span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropdownElement"
          >
            USER NAME
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <router-link :to="{ name: 'profile' }" class="black-text">
                <i class="material-icons">account_circle</i>Профиль
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" @click.prevent="logout" class="black-text">
                <i class="material-icons">assignment_return</i>Выйти
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import dateFilter from '@/helper/dateFilter'

const emit = defineEmits<{
  (e: 'onClick'): void
}>()

const onClick = () => {
  emit('onClick')
}

const dropdownElement = ref<object | null>(null)
const dropdown = ref<object | null>(null)
const router = useRouter()
const date = ref<Date>(new Date())
const interval = ref<undefined | number>()

onMounted(() => {
  // eslint-disable-next-line no-undef
  dropdown.value = M.Dropdown.init(dropdownElement.value, {
    constrainWidth: true,
  })
  interval.value = setInterval(() => {
    date.value = new Date()
  }, 1000)
})
onUnmounted(() => {
  if (dropdown.value && dropdown.value.destroy) {
    dropdown.value.destroy()
  }
  clearInterval(interval.value)
})
const logout = (): void => {
  console.log('logout')
  router.push('/login?message=logout')
}
</script>
