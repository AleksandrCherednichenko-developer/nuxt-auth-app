import { defineStore } from 'pinia'
import users from '~/data/users.json'
import type { User } from '~/types'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: users as User[],
    filteredUsers: users as User[],
    filters: {
      status: null as string | null,
      date: null as Date | null
    }
  }),
  
  actions: {
    filterUsers(filters: { status: string | null, date: Date | null }) {
      this.filters = filters
      
      this.filteredUsers = this.users.filter(user => {
        // Фильтр по статусу (null означает "все")
        const statusMatch = filters.status === null || 
          String(user.active) === filters.status

        // Фильтр по дате (null означает "без фильтра")
        const dateMatch = !filters.date || 
          new Date(user.created).toDateString() === filters.date.toDateString()

        return statusMatch && dateMatch
      })
    }
  }
}) 