export default defineNuxtRouteMiddleware((to) => {
  // Проверяем, что код выполняется на клиенте
  if (process.client) {
    const authStore = useAuthStore()
    
    if (!authStore.isAuthenticated && to.path !== '/login') {
      return navigateTo('/login')
    }
    
    if (authStore.isAuthenticated && to.path === '/login') {
      return navigateTo('/account')
    }
  }
}) 