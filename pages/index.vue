<template>
  <div class="index-page">
    <div class="welcome-container">
      <h1>Добро пожаловать в систему</h1>
      <p v-if="isLoading">Загрузка...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const isLoading = ref(true)

// При загрузке страницы проверяем статус аутентификации
onMounted(async () => {
  try {
    // Даём небольшую задержку для проверки состояния аутентификации
    await new Promise(resolve => setTimeout(resolve, 500))
    
    // Перенаправляем пользователя в зависимости от статуса аутентификации
    if (authStore.isAuthenticated) {
      navigateTo('/account')
    } else {
      navigateTo('/login')
    }
  } finally {
    isLoading.value = false
  }
})
</script>

<style lang="scss" scoped>
.index-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;

  .welcome-container {
    text-align: center;
    padding: 2rem;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    h1 {
      font-size: 2rem;
      color: #333;
      margin-bottom: 1rem;
    }

    p {
      color: #666;
      font-size: 1.1rem;
    }
  }
}
</style>

