<template>
  <div class="filter-block">
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
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
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
</script>

<style lang="scss" scoped>
.filter-block {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
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

  :deep(.filter-input) {
    width: 100%;
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
}
</style>
