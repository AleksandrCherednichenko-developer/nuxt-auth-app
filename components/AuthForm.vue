<template>
  <form class="auth-form" @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="username">Логин:</label>
      <input
        id="username"
        v-model="formData.username"
        type="email"
        required
        placeholder="Введите email"
        :class="{ 'error': errors.username }"
        :disabled="isLoading"
      />
      <span v-if="errors.username" class="error-message">{{ errors.username }}</span>
    </div>

    <div class="form-group">
      <label for="password">Пароль:</label>
      <input
        id="password"
        v-model="formData.password"
        type="password"
        required
        placeholder="Введите пароль"
        :class="{ 'error': errors.password }"
        :disabled="isLoading"
      />
      <span v-if="errors.password" class="error-message">{{ errors.password }}</span>
    </div>

    <button type="submit" :disabled="isLoading" class="submit-button">
      <template v-if="isLoading">
        <LoaderSpinner />
      </template>
      <template v-else>
        Войти
      </template>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import LoaderSpinner from './LoaderSpinner.vue'

interface FormData {
  username: string
  password: string
}

interface FormErrors {
  username?: string
  password?: string
}

const props = defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'submit', data: FormData): void
}>()

const formData = ref<FormData>({
  username: '',
  password: ''
})

const errors = ref<FormErrors>({})

const handleSubmit = async () => {
  errors.value = {}
  
  if (!formData.value.username) {
    errors.value.username = 'Введите email'
    return
  }
  if (!formData.value.password) {
    errors.value.password = 'Введите пароль'
    return
  }

  try {
    emit('submit', { ...formData.value })
  } catch (e) {
    console.error(e)
  }
}
</script>

<style lang="scss" scoped>
.auth-form {
  .form-group {
    margin-bottom: 1.5rem;

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      box-sizing: border-box;

      &.error {
        border-color: #dc3545;
      }

      &:focus {
        outline: none;
        border-color: #007bff;
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
      }

      &:disabled {
        background-color: #f8f9fa;
        cursor: not-allowed;
      }
    }

    .error-message {
      color: #dc3545;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }
  }

  .submit-button {
    width: 100%;
    padding: 0.75rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;

    &:hover:not(:disabled) {
      background: #0056b3;
    }

    &:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
  }
}
</style>
