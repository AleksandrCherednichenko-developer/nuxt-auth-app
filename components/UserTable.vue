<template>
  <div class="table-container">
    <!-- Индикатор загрузки -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
    </div>

    <!-- Сообщение при отсутствии данных -->
    <div v-else-if="!users.length" class="no-data">
      <p>По вашему запросу ничего не найдено</p>
      <button class="btn btn-reset" @click="$emit('reset-filters')">
        Сбросить фильтры
      </button>
    </div>

    <table v-else class="users-table">
      <thead>
        <tr>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Email</th>
          <th>Статус</th>
          <th>Дата создания</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.credentials.username">
          <td>{{ user.name }}</td>
          <td>{{ user.surname }}</td>
          <td>{{ user.credentials.username }}</td>
          <td>
            <span :class="['status-badge', user.active ? 'active' : 'inactive']">
              {{ user.active ? 'Активен' : 'Неактивен' }}
            </span>
          </td>
          <td>{{ user.created }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import type { User } from '~/types'

defineProps<{
  users: User[]
  loading?: boolean
}>()

defineEmits<{
  (e: 'reset-filters'): void
}>()
</script>

<style lang="scss" scoped>
.table-container {
  position: relative;
  min-height: 200px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.users-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;

  th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  th {
    background: #f8f9fa;
    font-weight: 600;
    color: #495057;
    white-space: nowrap;
  }

  td {
    color: #212529;
  }

  tbody tr {
    &:hover {
      background-color: #f8f9fa;
    }
  }
}

.status-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 500;

  &.active {
    background-color: #e8f5e9;
    color: #2e7d32;
  }

  &.inactive {
    background-color: #ffebee;
    color: #c62828;
  }
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;

  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

.no-data {
  text-align: center;
  padding: 2rem;
  color: #666;

  p {
    margin: 0.5rem 0;
  }

  .btn-reset {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    
    &:hover {
      background: #0056b3;
    }
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

// Адаптивность для мобильных устройств
@media (max-width: 768px) {
  .users-table {
    th, td {
      padding: 0.75rem;
    }
  }

  // Горизонтальный скролл на мобильных
  .table-container {
    overflow-x: auto;
  }
}
</style>
