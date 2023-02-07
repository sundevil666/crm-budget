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
          @blur="onValidation('password')"
          @input="clearError('password')"
        />
        <label for="password">Пароль</label>
        <small v-if="errorPassword !== null" class="helper-text invalid">{{
          errorPassword
        }}</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          :class="
            errorName !== '' && errorName !== null ? 'invalid' : 'validate'
          "
          v-model="name"
          ref="nameElement"
          @blur="onValidation('name')"
          @input="clearError('name')"
        />
        <label for="name">Имя</label>
        <small v-if="errorName !== null" class="helper-text invalid">{{
          errorName
        }}</small>
      </div>
      <div class="input-field">
        <label>
          <input
            type="checkbox"
            v-model="agree"
            @change="clearError('rules')"
          />
          <span>С правилами согласен</span>
        </label>
        <small v-if="errorAgree !== null" class="helper-text invalid">{{
          errorAgree
        }}</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link :to="{ name: 'login' }">Войти!</router-link>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const emailElement = ref<HTMLInputElement | null>(null)
const email = ref<string>('')
const password = ref<string>('')
const name = ref<string>('')
const agree = ref<boolean>(false)
const errorEmail = ref<string | null>(null)
const errorPassword = ref<string | null>(null)
const errorName = ref<string | null>(null)
const errorAgree = ref<string | null>(null)
const minLength = ref<number>(6)

const EMPTY_INPUT = 'Поле не должно быть пустым'
const ERROR_RULES = 'Необходимо соглосится с правилами'

onMounted(() => {
  emailElement.value?.focus()
})
const submitHandler = (): void => {
  onValidation('email')
  onValidation('password')
  onValidation('name')
  onValidation('rules')

  if (
    !errorEmail.value &&
    !errorPassword.value &&
    !errorName.value &&
    !errorAgree.value
  ) {
    const formData = {
      email: email.value,
      password: password.value,
      name: name.value,
      rules: agree.value,
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
  if (el === 'name' && !name.value) {
    errorName.value = EMPTY_INPUT
  }
  if (el === 'rules' && !agree.value) {
    errorAgree.value = ERROR_RULES
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
  if (el === 'name') {
    const length = name.value.length
    if (length === 0) {
      errorName.value = EMPTY_INPUT
      return
    }
    if (length < 2) {
      errorName.value = `
        Имя должено быть больше 2 символов.
        Сейчас оно: ${length}
      `
      return
    }
    errorName.value = ''
  }
  if (el === 'rules') {
    errorAgree.value = agree.value ? '' : ERROR_RULES
    return
  }
}
</script>

<style>
.input-field {
  padding-bottom: 10px;
  min-height: 60px;
}
.invalid-rules {
  color: red;
}
</style>
