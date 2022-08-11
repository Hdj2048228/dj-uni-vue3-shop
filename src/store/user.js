import { defineStore } from 'pinia'

export const useUserStore = defineStore('user',{
	state: ()=>{
		return {
				hasLogin: false,
				userInfo:  {}
		}
	},
	actions: {
		login(provider) {
			this.hasLogin = true;
			this.userInfo = provider;
			console.log(2222,this.userInfo)
			uni.setStorage({//缓存用户登陆状态
				key: 'user-info',  
				data: provider  
			}) 
		},
		logout() {
			this.hasLogin = false;
			this.userInfo = {};
			console.log(2222,this.hasLogin)
			// uni.removeStorage({  
			// 	key: 'user-info'  
			// })
		}
	}
	
})
