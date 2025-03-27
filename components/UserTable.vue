<template>
  <div class="table-container">
    <!-- Добавляем подсказку по использованию -->
    <div class="sort-hint" v-if="sortFields.length > 0">
      <span>Порядок сортировки:</span>
      <div class="sort-tags">
        <div v-for="(sort, index) in sortFields" :key="index" class="sort-tag">
          {{ getSortFieldName(sort.field) }} {{ sort.direction === 'asc' ? '↑' : '↓' }}
          <button class="remove-sort" @click="removeSortField(index)">&times;</button>
        </div>
      </div>
    </div>

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
          <th @click="handleSort('name')" 
              :class="getSortClasses('name')">
            Имя
            <div class="sort-icon" v-if="getSortDirection('name')">
              <span class="order-badge" v-if="getSortOrder('name') > 0">
                {{ getSortOrder('name') + 1 }}
              </span>
              {{ getSortDirection('name') === 'asc' ? '↑' : '↓' }}
            </div>
          </th>
          <th @click="handleSort('surname')" 
              :class="getSortClasses('surname')">
            Фамилия
            <div class="sort-icon" v-if="getSortDirection('surname')">
              <span class="order-badge" v-if="getSortOrder('surname') > 0">
                {{ getSortOrder('surname') + 1 }}
              </span>
              {{ getSortDirection('surname') === 'asc' ? '↑' : '↓' }}
            </div>
          </th>
          <th @click="handleSort('credentials.username')" 
              :class="getSortClasses('credentials.username')">
            Email
            <div class="sort-icon" v-if="getSortDirection('credentials.username')">
              <span class="order-badge" v-if="getSortOrder('credentials.username') > 0">
                {{ getSortOrder('credentials.username') + 1 }}
              </span>
              {{ getSortDirection('credentials.username') === 'asc' ? '↑' : '↓' }}
            </div>
          </th>
          <th @click="handleSort('active')" 
              :class="getSortClasses('active')">
            Статус
            <div class="sort-icon" v-if="getSortDirection('active')">
              <span class="order-badge" v-if="getSortOrder('active') > 0">
                {{ getSortOrder('active') + 1 }}
              </span>
              {{ getSortDirection('active') === 'asc' ? '↑' : '↓' }}
            </div>
          </th>
          <th @click="handleSort('created')" 
              :class="getSortClasses('created')">
            Дата создания
            <div class="sort-icon" v-if="getSortDirection('created')">
              <span class="order-badge" v-if="getSortOrder('created') > 0">
                {{ getSortOrder('created') + 1 }}
              </span>
              {{ getSortDirection('created') === 'asc' ? '↑' : '↓' }}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <TransitionGroup name="list">
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
        </TransitionGroup>
      </tbody>
    </table>

    <!-- Подсказка по использованию множественной сортировки -->
    <div class="sort-help">
      <small>Используйте Ctrl + клик для сортировки по нескольким полям</small>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { User } from '~/types'

const route = useRoute()
const router = useRouter()

const props = defineProps<{
  users: User[]
  loading?: boolean
}>()

interface SortField {
  field: string
  direction: 'asc' | 'desc'
}

// Словарь для отображения названий полей
const fieldNames: Record<string, string> = {
  'name': 'Имя',
  'surname': 'Фамилия',
  'credentials.username': 'Email',
  'active': 'Статус',
  'created': 'Дата создания'
}

const getSortFieldName = (field: string) => fieldNames[field] || field

const sortFields = ref<SortField[]>([])

// Получение классов для заголовка
const getSortClasses = (field: string) => ({
  sortable: true,
  active: sortFields.value.some(f => f.field === field),
  'sort-primary': sortFields.value[0]?.field === field
})

// Получение направления сортировки для поля
const getSortDirection = (field: string) => {
  const sortField = sortFields.value.find(f => f.field === field)
  return sortField?.direction || null
}

// Получение порядка сортировки для поля
const getSortOrder = (field: string) => {
  return sortFields.value.findIndex(f => f.field === field)
}

// Удаление поля сортировки
const removeSortField = (index: number) => {
  sortFields.value.splice(index, 1)
  updateURL()
}

// Обновление URL
const updateURL = () => {
  const sortQuery = sortFields.value
    .map(f => `${f.field}:${f.direction}`)
    .join(',')

  router.replace({
    query: {
      ...route.query,
      sort: sortQuery || undefined
    }
  })
}

// Обработчик сортировки
const handleSort = (field: string) => {
  const isCtrlPressed = event?.ctrlKey || event?.metaKey
  
  if (!isCtrlPressed) {
    // Если Ctrl не нажат, работаем только с одним полем
    if (sortFields.value.length === 1 && sortFields.value[0].field === field) {
      // Меняем направление сортировки
      sortFields.value[0].direction = sortFields.value[0].direction === 'asc' ? 'desc' : 'asc'
    } else {
      // Устанавливаем новую сортировку
      sortFields.value = [{ field, direction: 'asc' }]
    }
  } else {
    // Если Ctrl нажат, добавляем или обновляем поле
    const existingIndex = sortFields.value.findIndex(f => f.field === field)
    if (existingIndex > -1) {
      // Меняем направление существующего поля
      sortFields.value[existingIndex].direction = 
        sortFields.value[existingIndex].direction === 'asc' ? 'desc' : 'asc'
    } else {
      // Добавляем новое поле
      sortFields.value.push({ field, direction: 'asc' })
    }
  }

  updateURL()
}

// Отсортированные пользователи
const sortedUsers = computed(() => {
  return [...props.users].sort((a, b) => {
    for (const { field, direction } of sortFields.value) {
      const aValue = getNestedValue(a, field)
      const bValue = getNestedValue(b, field)
      
      if (aValue === bValue) continue
      
      return direction === 'asc' 
        ? (aValue > bValue ? 1 : -1)
        : (aValue < bValue ? 1 : -1)
    }
    return 0
  })
})

// Получение вложенного значения объекта
const getNestedValue = (obj: any, path: string) => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj)
}

// Инициализация сортировки из URL при монтировании
onMounted(() => {
  const sort = route.query.sort as string
  if (sort) {
    sortFields.value = sort.split(',').map(field => {
      const [name, direction] = field.split(':')
      return { field: name, direction: direction as 'asc' | 'desc' }
    })
  }
})

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
    font-weight: 500;
    color: #666;
    white-space: nowrap;

    &.sortable {
      cursor: pointer;
      user-select: none;
      position: relative;
      padding-right: 2rem;

      &:hover {
        background-color: #f0f0f0;
      }

      &.active {
        color: #007bff;
      }

      .sort-icon {
        position: absolute;
        right: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        align-items: center;
        gap: 0.25rem;

        .order-badge {
          font-size: 0.75rem;
          background: #007bff;
          color: white;
          width: 1.25rem;
          height: 1.25rem;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  td {
    color: #333;
    line-height: 1.4;
  }

  tbody tr {
    &:hover {
      background-color: #f8f9fa;
    }
  }
}

.status-badge {
  display: inline-flex;
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
  background: rgba(255, 255, 255, 0.9);
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

.sort-hint {
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid #eee;
  
  span {
    color: #666;
    font-size: 0.875rem;
  }

  .sort-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .sort-tag {
    background: #e9ecef;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #495057;

    .remove-sort {
      border: none;
      background: none;
      padding: 2px;
      margin-left: 0.25rem;
      cursor: pointer;
      color: #666;
      border-radius: 50%;
      width: 16px;
      height: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      
      &:hover {
        background-color: rgba(220, 53, 69, 0.1);
        color: #dc3545;
      }
    }
  }
}

.sort-help {
  padding: 0.5rem 1rem;
  text-align: right;
  color: #666;
  font-size: 0.75rem;
  border-top: 1px solid #eee;
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

// Анимации
.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
