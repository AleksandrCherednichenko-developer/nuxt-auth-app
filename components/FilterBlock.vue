<template>
  <div class="filter-block">
    <div class="filters-wrapper">
      <div class="filter-group">
        <label>Статус:</label>
        <BaseDropdown
          v-model="selectedStatus"
          :options="statusOptions"
          class="filter-input"
        />
      </div>
      
      <div class="filter-group">
        <label>Дата создания:</label>
        <div class="datepicker-wrapper">
          <Datepicker
            v-model="selectedDate"
            :enable-time-picker="false"
            format="dd.MM.yyyy"
            locale="ru"
            placeholder="Выберите дату"
            :clearable="true"
            class="filter-input"
            textInput
            autoApply
          />
        </div>
      </div>
    </div>

    <div class="filter-actions">
      <button 
        class="btn btn-reset"
        @click="resetFilters"
        :disabled="!hasActiveFilters"
      >
        Сбросить фильтры
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const statusOptions = [
  { label: 'Все', value: null },
  { label: 'Активные', value: 'true' },
  { label: 'Неактивные', value: 'false' }
]

const selectedStatus = ref<string | null>(null)
const selectedDate = ref<Date | null>(null)

const emit = defineEmits<{
  (e: 'update:filters', filters: { status: string | null, date: Date | null }): void
}>()

// Отправляем начальное состояние фильтров
onMounted(() => {
  emit('update:filters', {
    status: selectedStatus.value,
    date: selectedDate.value
  })
})

watch([selectedStatus, selectedDate], () => {
  emit('update:filters', {
    status: selectedStatus.value,
    date: selectedDate.value
  })
})

const hasActiveFilters = computed(() => {
  return selectedStatus.value !== null || selectedDate.value !== null
})

const resetFilters = () => {
  selectedStatus.value = null
  selectedDate.value = null
  
  emit('update:filters', {
    status: null,
    date: null
  })
}

// Делаем метод доступным через ref
defineExpose({
  resetFilters
})
</script>

<style lang="scss" scoped>
.filter-block {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

  .filters-wrapper {
    flex: 1;
    display: flex;
    gap: 1.5rem;
  }

  .filter-group {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      font-weight: 500;
      color: #666;
      font-size: 0.875rem;
    }

    .datepicker-wrapper {
      position: relative;
      width: 100%;
    }
  }

  .filter-actions {
    display: flex;
    align-items: flex-end;
  }
}

// Общие стили для кнопок
.btn {
  height: 44px;
  padding: 0 1.25rem;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  
  &.btn-reset {
    background: #f0f0f0;
    color: #666;
    
    &:hover:not(:disabled) {
      background: #e0e0e0;
      color: #333;
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &.btn-primary {
    background: #007bff;
    color: white;
    
    &:hover:not(:disabled) {
      background: #0056b3;
    }
  }
}

// Стили для датапикера
:deep(.dp__main) {
  width: 100%;
}

:deep(.dp__input) {
  height: 44px !important;

  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;
  background: white;
  color: #333;
  box-sizing: border-box;
  
  &:hover {
    border-color: #007bff;
  }
  
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    outline: none;
  }

  &::placeholder {
    color: #999;
  }
}

// Стили для иконки календаря
:deep(.dp__input_wrap) {
  position: relative;
  
  .dp__input_icon {
    position: absolute;
    right: 0.75rem;
    left: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
    pointer-events: none;
    width: 16px;
    height: 16px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
  }
}

// Стили для выпадающего календаря
:deep(.dp__menu) {
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>
