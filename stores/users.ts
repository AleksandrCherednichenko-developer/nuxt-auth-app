import { defineStore } from 'pinia'
import users from '~/data/users.json'
import type { User } from '~/types'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: users as User[],
    filteredUsers: users as User[],
    loading: false,
    filters: {
      status: null as string | null,
      date: null as Date | null,
      search: '' as string
    }
  }),
  
  actions: {
    filterUsers(filters: { status: string | null, date: Date | null, search: string }) {
      this.loading = true
      
      try {
        this.filters = filters
        
        // Если все фильтры пустые - показываем все записи
        if (!filters.search && !filters.status && !filters.date) {
          this.filteredUsers = [...this.users]
          return
        }

        this.filteredUsers = this.users.filter(user => {
          // Фильтр по статусу
          const statusMatch = !filters.status || 
            String(user.active) === filters.status

          // Фильтр по дате
          const dateMatch = !filters.date || (() => {
            const [datePart] = user.created.split(' ')
            const [day, month, year] = datePart.split('.')
            const userDate = new Date(Number(year), Number(month) - 1, Number(day))
            const filterDate = filters.date as Date
            
            return userDate.getDate() === filterDate.getDate() &&
                   userDate.getMonth() === filterDate.getMonth() &&
                   userDate.getFullYear() === filterDate.getFullYear()
          })()

          // Поиск по всем полям
          const searchMatch = !filters.search || 
            Object.values(user).some(value => {
              if (typeof value === 'object') {
                return Object.values(value).some(v => 
                  String(v).toLowerCase().includes(filters.search.toLowerCase())
                )
              }
              return String(value).toLowerCase().includes(filters.search.toLowerCase())
            })

          return statusMatch && dateMatch && searchMatch
        })
      } finally {
        this.loading = false
      }
    },

    resetFilters() {
      this.filters = {
        status: null,
        date: null,
        search: ''
      }
      this.filteredUsers = [...this.users]
    }
  }
}) 