import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter',{
	state:()=>{
		return {
			count: 0
		}
	},
	actions:{
		add(a = 1){
			this.count += a
		}
	}
	
})