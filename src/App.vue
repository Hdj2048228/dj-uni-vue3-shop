<script setup lang="ts">
import { createSSRApp } from 'vue';
import * as Pinia from 'pinia';
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";
import { useUserStore } from '@/store/user'

const app = createSSRApp(App);
app.use(Pinia.createPinia());


onLaunch(() => {
	const userStore = useUserStore()
	const defaultUserInfo = (uni.getStorageSync('user-info') || null)
	console.log(userStore)
	defaultUserInfo && userStore.login(defaultUserInfo)
});
onShow(() => {
  console.log("App Show");
});
onHide(() => {
  console.log("App Hide");
});
</script>
<style></style>
