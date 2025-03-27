<template>
  <div class="dropdown" v-click-outside="closeDropdown">
    <button 
      type="button" 
      class="dropdown-toggle filter-input" 
      @click="isOpen = !isOpen"
      :class="{ 'active': isOpen }"
    >
      <span>{{ selectedLabel }}</span>
      <svg 
        class="arrow-icon" 
        :class="{ 'open': isOpen }"
        width="12" 
        height="12" 
        viewBox="0 0 12 12"
      >
        <path d="M2 4L6 8L10 4" stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    
    <div class="dropdown-menu" v-show="isOpen">
      <div 
        v-for="option in options" 
        :key="option.value" 
        class="dropdown-item"
        :class="{ 'selected': isSelected(option.value) }"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Option {
  label: string
  value: string | null
}

const props = defineProps<{
  modelValue: string | null
  options: Option[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const isOpen = ref(false)

const selectedLabel = computed(() => {
  const selected = props.options.find(opt => opt.value === props.modelValue)
  return selected?.label || 'Выберите значение'
})

const isSelected = (value: string | null) => props.modelValue === value

const selectOption = (option: Option) => {
  emit('update:modelValue', option.value)
  isOpen.value = false
}

const closeDropdown = () => {
  isOpen.value = false
}

// Директива для закрытия дропдауна при клике вне его
const vClickOutside = {
  mounted(el: HTMLElement, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value()
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElement) {
    document.removeEventListener('click', el.clickOutsideEvent)
  },
}
</script>

<style lang="scss" scoped>
.dropdown {
  position: relative;
  width: 100%;

  .dropdown-toggle {
    width: 100%;
    height: 44px;
    padding: 0 1rem;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
    text-align: left;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    transition: all 0.2s;
    color: #333;

    &:hover {
      border-color: #007bff;
    }

    &.active {
      border-color: #007bff;
      box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
    }

    .arrow-icon {
      transition: transform 0.2s;
      color: #666;
      
      &.open {
        transform: rotate(180deg);
      }
    }
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 4px);
    left: 0;
    right: 0;
    background: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
  }

  .dropdown-item {
    padding: 0.75rem 1rem;
    cursor: pointer;
    transition: all 0.2s;
    color: #333;

    &:hover {
      background: #f8f9fa;
    }

    &.selected {
      background: #e8f0fe;
      color: #007bff;
    }

    &:first-child {
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
    }

    &:last-child {
      border-bottom-left-radius: 4px;
      border-bottom-right-radius: 4px;
    }
  }
}
</style> 