<template>
  <div class="login-page">
    <div class="login-container">
      <h1>Вход в систему</h1>
      
      <AuthForm @submit="handleLogin" :is-loading="isLoading" />
      
      <div v-if="error" class="error-message">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()
const error = ref('')
const isLoading = ref(false)

// Если пользователь уже авторизован, перенаправляем на страницу аккаунта
if (authStore.isAuthenticated) {
  router.push('/account')
}

const handleLogin = async (credentials: { username: string; password: string }) => {
  try {
    error.value = ''
    isLoading.value = true
    await authStore.login(credentials.username, credentials.password)
    router.push('/account')
  } catch (e) {
    error.value = 'Введены неверные данные авторизации. Попробуйте ещё раз'
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss" scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;

  .login-container {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
    }

    .error-message {
      margin-top: 1rem;
      padding: 1rem;
      background-color: #fff5f5;
      color: #dc3545;
      border: 1px solid #dc3545;
      border-radius: 4px;
      text-align: center;
    }
  }
}
</style>