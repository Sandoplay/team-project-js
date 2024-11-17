import { watch } from 'vue'
import { type PiniaPluginContext } from 'pinia'

export function createPersistedState(options?: {
  key?: string
  paths?: string[]
}) {
  return ({ store}: PiniaPluginContext) => {
    const storageKey = options?.key || `${store.$id}`

    // Load initial state from localStorage
    const savedState = localStorage.getItem(storageKey)
    if (savedState) {
      store.$patch(JSON.parse(savedState))
    }

    watch(
      () => store.$state,
      (state) => {
        localStorage.setItem(storageKey, JSON.stringify(state))
      },
      { deep: true }
    )
  }
}
