// "https://github.com/Allen-1998/pinia-auto-refs"
import { AutoToRefs, ToRef } from 'vue'

import cartStore from '@/store/cart'
import counterStore from '@/store/counter'
import userStore from '@/store/user'

declare module 'vue' {
  export type AutoToRefs<T> = {
    [K in keyof T]: T[K] extends Function ? T[K] : ToRef<T[K]>
  }
}

const storeExports = {
  cart: cartStore,
  counter: counterStore,
  user: userStore,
}

export function useStore<T extends keyof typeof storeExports>(storeName: T) {
  const store = storeExports[storeName]()
  const storeRefs = storeToRefs(store)
  return { ...store, ...storeRefs } as unknown as AutoToRefs<ReturnType<typeof storeExports[T]>>
}
