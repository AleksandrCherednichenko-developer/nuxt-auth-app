import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(({ $pinia }) => {
  if ($pinia) {
    $pinia.use(piniaPluginPersistedstate)
  }
}) 