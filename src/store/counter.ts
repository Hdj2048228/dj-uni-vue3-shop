import { defineStore } from 'pinia'
type CountState = {
	count: number
}
export const useCounterStore = defineStore('counter',{
	state:()=>{
		return {
			count: 0
		} as CountState
	},
	actions:{
		add(a = 1){
			this.count += a
		}
	}

})
export default useCounterStore
