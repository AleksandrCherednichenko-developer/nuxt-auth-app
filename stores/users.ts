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
        const dateMatch = !filters.date || (() => {
          // Преобразуем строку даты из формата "DD.MM.YYYY HH:mm:ss" в объект Date
          const [datePart] = user.created.split(' ')
          const [day, month, year] = datePart.split('.')
          const userDate = new Date(Number(year), Number(month) - 1, Number(day))
          const filterDate = filters.date as Date
          
          return userDate.getDate() === filterDate.getDate() &&
                 userDate.getMonth() === filterDate.getMonth() &&
                 userDate.getFullYear() === filterDate.getFullYear()
        })()

        return statusMatch && dateMatch
      })
    }
  }
}) 