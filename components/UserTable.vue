<template>
  <div class="user-table">
    <table>
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
            <span :class="['status', user.active ? 'active' : 'inactive']">
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
}>()
</script>

<style lang="scss" scoped>
.user-table {
  width: 100%;
  overflow-x: auto;
  
  table {
    width: 100%;
    border-collapse: collapse;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #eee;
    }
    
    th {
      background: #f8f9fa;
      font-weight: 600;
    }
    
    .status {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.875rem;
      
      &.active {
        background: #e6f4ea;
        color: #1e7e34;
      }
      
      &.inactive {
        background: #feeced;
        color: #dc3545;
      }
    }
  }
}
</style>
