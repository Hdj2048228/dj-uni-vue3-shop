<script setup lang="ts">
import env from '@/config/env'

onLaunch(() => {
  console.log('App Launch')
  console.log(env.apiEnv, 'apiEnv')
  const appStore = useStore('app')
  const systemInfo = appStore.getSystemInfo()
  const { login } = useStore('user')
  const defaultUserInfo = uni.getStorageSync('user-info') || null
  defaultUserInfo && login(defaultUserInfo)
  console.log(systemInfo, 'systemInfo')
})
onShow(() => {
  console.log('App Show')
})
onHide(() => {
  console.log('App Hide')
})
</script>
<style lang="scss">
@import 'static/css/index.scss';

</style>
