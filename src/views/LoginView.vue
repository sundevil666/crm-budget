<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          :class="
            errorEmail !== '' && errorEmail !== null ? 'invalid' : 'validate'
          "
          v-model="email"
          ref="emailElement"
          @blur="onValidation('email')"
          @input="clearError('email')"
        />
        <label for="email">Email</label>
        <small v-if="errorEmail !== null" class="helper-text invalid">{{
          errorEmail
        }}</small>
      </div>

      <div class="input-field">
        <input
          id="password"
          type="password"
          :class="
            errorPassword !== '' && errorPassword !== null
              ? 'invalid'
              : 'validate'
          "
          v-model="password"
          ref="passwordElement"
          @blur="onValidation('password')"
          @input="clearError('password')"
        />
        <label for="password">Пароль</label>
        <small v-if="errorPassword !== null" class="helper-text invalid">{{
          errorPassword
        }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link :to="{ name: 'register' }">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { inject } from 'vue'
import messages from '@/utils/message/messages'

const router = useRouter()
const route = useRoute()

const emailElement = ref<HTMLInputElement | null>(null)
const passwordElement = ref<HTMLInputElement | null>(null)
const email = ref<string>('')
const password = ref<string>('')
const errorEmail = ref<string | null>(null)
const errorPassword = ref<string | null>(null)
const minLength = ref<number>(6)

const EMPTY_INPUT = 'Поле не должно быть пустым'

const $message: any = inject('$message')

onMounted(() => {
  emailElement.value?.focus()
  if (messages[route.query.message]) {
    $message(messages[route.query.message])
  }
})
const submitHandler = (): void => {
  onValidation('email')
  onValidation('password')

  if (!errorEmail.value && !errorPassword.value) {
    const formData = {
      email: email.value,
      password: password.value,
    }
    console.log(formData)
    router.push({ name: 'home' })
  }
}

const onValidation = (el: string): void => {
  if (el === 'email' && !email.value) {
    errorEmail.value = EMPTY_INPUT
  }
  if (el === 'password' && !password.value) {
    errorPassword.value = EMPTY_INPUT
  }
}
const clearError = (el: string): void => {
  const filter =
    /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
  if (el === 'email') {
    if (email.value.length === 0) {
      errorEmail.value = EMPTY_INPUT
      return
    }
    if (!filter.test(email.value)) {
      errorEmail.value = 'Email указан не корекнтный'
      return
    }
    errorEmail.value = ''
  }
  if (el === 'password') {
    const length = password.value.length
    if (length === 0) {
      errorPassword.value = EMPTY_INPUT
      return
    }
    if (length < minLength.value) {
      errorPassword.value = `
        Пароль должен быть больше ${minLength.value - 1} символов.
        Сейчас он: ${length}
      `
      return
    }
    errorPassword.value = ''
  }
}
</script>

<style>
.input-field {
  padding-bottom: 10px;
}
</style>
