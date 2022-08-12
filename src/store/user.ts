import { defineStore } from 'pinia'
interface UserInfo {
	nickName?: string,
	avatarUrl?: string,
}
type UserState = {
	hasLogin: boolean,
	userInfo?:  UserInfo
}

export const useUserStore = defineStore('user',{
	state: () : UserState =>{
		return {
			hasLogin: false,
			userInfo: {}
		}

	},
	actions: {
		login(provider : UserInfo) {
			this.hasLogin = true;
			this.userInfo = provider;
			uni.setStorage({//缓存用户登陆状态
				key: 'user-info',
				data: provider
			})
		},
		logout() {
			this.hasLogin = false;
			this.userInfo = {};
			// uni.removeStorage({
			// 	key: 'user-info'
			// })
		}
	}

})
