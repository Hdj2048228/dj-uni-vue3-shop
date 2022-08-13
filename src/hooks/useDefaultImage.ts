import { DEFAULT_IMAGE } from '@/config/app'
export function useDefaultImage() {
  const defaultImage = ref<string>(DEFAULT_IMAGE)
  return {
    defaultImage,
  }
}
