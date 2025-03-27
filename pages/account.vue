<template>
  <div class="account-page">
    <header class="page-header">
      <h1>Личный кабинет</h1>
      <button class="logout-btn" @click="handleLogout">Выход</button>
    </header>

    <main class="page-content">
      <FilterBlock 
        @update:filters="handleFiltersUpdate"
        ref="filterBlockRef"
      />
      <UserTable 
        :users="usersStore.filteredUsers"
        :loading="usersStore.loading"
        @reset-filters="handleResetFilters"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { useUsersStore } from '~/stores/users'
import { useRoute } from 'vue-router'

const route = useRoute()
const authStore = useAuthStore()
const usersStore = useUsersStore()
const filterBlockRef = ref()

const handleLogout = () => {
  authStore.logout()
}

const handleFiltersUpdate = (filters: { status: string | null, date: Date | null, search: string }) => {
  usersStore.filterUsers(filters)
}

const handleResetFilters = () => {
  // Сбрасываем значения в компоненте FilterBlock
  if (filterBlockRef.value) {
    filterBlockRef.value.resetFilters()
  }
  // Сбрасываем фильтры в store
  usersStore.resetFilters()
}

// Инициализируем список пользователей при монтировании компонента
onMounted(() => {
  // Применяем начальные фильтры
  usersStore.filterUsers({
    search: route.query.search as string || '',
    status: route.query.status as string || null,
    date: route.query.date ? new Date(route.query.date as string) : null
  })
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
