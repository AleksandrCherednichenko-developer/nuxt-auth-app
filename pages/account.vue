<template>
  <div class="account-page">
    <header class="page-header">
      <h1>Личный кабинет</h1>
      <button class="logout-btn" @click="handleLogout">Выход</button>
    </header>

    <main class="page-content">
      <FilterBlock @update:filters="handleFiltersUpdate" />
      <UserTable :users="usersStore.filteredUsers" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

const authStore = useAuthStore()
const usersStore = useUsersStore()

const handleLogout = () => {
  authStore.logout()
}

const handleFiltersUpdate = (filters: { status: string | null, date: Date | null }) => {
  usersStore.filterUsers(filters)
}

// Инициализируем список пользователей при монтировании компонента
onMounted(() => {
  usersStore.filterUsers({ status: null, date: null })
})
</script>

<style lang="scss" scoped>
.account-page {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  
  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h1 {
      margin: 0;
      color: #333;
    }
    
    .logout-btn {
      padding: 0.5rem 1rem;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s;
      
      &:hover {
        background: #c82333;
      }
    }
  }
  
  .page-content {
    background: #f8f9fa;
    padding: 1.5rem;
    border-radius: 8px;
  }
}
</style>
