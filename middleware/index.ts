import { useAuthStore } from "~/stores/auth"

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  // Если пользователь уже аутентифицирован, сразу перенаправляем в аккаунт
  if (authStore.isAuthenticated) {
    return navigateTo('/account')
  }

  // Если нет - на страницу входа
  return navigateTo('/login')
}) 