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
          <th @click="handleSort('name')" :class="{ sortable: true, active: sortField === 'name' }">
            Имя
            <span class="sort-icon" v-if="sortField === 'name'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="handleSort('surname')" :class="{ sortable: true, active: sortField === 'surname' }">
            Фамилия
            <span class="sort-icon" v-if="sortField === 'surname'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="handleSort('credentials.username')" :class="{ sortable: true, active: sortField === 'credentials.username' }">
            Email
            <span class="sort-icon" v-if="sortField === 'credentials.username'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="handleSort('active')" :class="{ sortable: true, active: sortField === 'active' }">
            Статус
            <span class="sort-icon" v-if="sortField === 'active'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
          <th @click="handleSort('created')" :class="{ sortable: true, active: sortField === 'created' }">
            Дата создания
            <span class="sort-icon" v-if="sortField === 'created'">
              {{ sortDirection === 'asc' ? '↑' : '↓' }}
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in sortedUsers" :key="user.credentials.username">
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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { User } from '~/types'

const route = useRoute()
const router = useRouter()

const props = defineProps<{
  users: User[]
  loading?: boolean
}>()

const sortField = ref(route.query.sortField?.toString() || 'name')
const sortDirection = ref(route.query.sortDirection?.toString() || 'asc')

// Функция для получения значения вложенного свойства объекта
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

// Отсортированные пользователи
const sortedUsers = computed(() => {
  return [...props.users].sort((a, b) => {
    const aValue = getNestedValue(a, sortField.value)
    const bValue = getNestedValue(b, sortField.value)
    
    if (sortDirection.value === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })
})

// Обработчик сортировки
const handleSort = (field: string) => {
  if (sortField.value === field) {
    // Если поле то же, меняем направление
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    // Если поле новое, устанавливаем его и направление по умолчанию
    sortField.value = field
    sortDirection.value = 'asc'
  }

  // Обновляем URL
  router.replace({
    query: {
      ...route.query,
      sortField: sortField.value,
      sortDirection: sortDirection.value
    }
  })
}

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

  th.sortable {
    cursor: pointer;
    user-select: none;
    position: relative;
    padding-right: 1.5rem;

    &:hover {
      background-color: #f0f0f0;
    }

    &.active {
      color: #007bff;
    }

    .sort-icon {
      position: absolute;
      right: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
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

// Анимация для сортировки
tbody tr {
  transition: all 0.2s ease-in-out;
}
</style>
