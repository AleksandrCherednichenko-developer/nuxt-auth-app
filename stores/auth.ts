import { defineStore } from 'pinia'
import users from '~/data/users.json'
import type { User } from '~/types'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    currentUser: null as User | null,
  }),
  
  actions: {
    async login(username: string, password: string) {
      // Имитация задержки сети
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const user = users.find(u => 
        u.credentials.username === username && 
        u._comment?.includes(password)
      )
      
      if (!user) {
        throw new Error('Invalid credentials')
      }

      this.isAuthenticated = true
      this.currentUser = user
    },
    
    logout() {
      this.isAuthenticated = false
      this.currentUser = null
      navigateTo('/login')
    }
  },
  
  persist: {
    storage: process.client ? localStorage : undefined
  },
})