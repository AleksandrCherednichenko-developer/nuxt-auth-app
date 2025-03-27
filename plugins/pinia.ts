import { createPinia } from 'pinia'

export default defineNuxtPlugin(({ $pinia }) => {
  const pinia = createPinia()
  $pinia = pinia
}) 