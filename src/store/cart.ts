import { defineStore } from 'pinia'
export type CartItem = {
	id: bigint,
	image: string,
	attr_val: string ,
	stock: number,
	title: string,
	price: number,
	number: number,
	loaded?: string  | undefined,
	checked?: boolean
}
interface CartState {
	total: number,
	allChecked:  boolean,
	empty: boolean,
	cartList: CartItem[]
}
type IndexNumberData = {
	index: number,
	number: number
}
export const useCartStore = defineStore('cart',{
	state: (): CartState =>{
		return {
				total: 0,
				allChecked:  false,
				empty: false,
				cartList: []
		}
	},
	actions: {
		deleteCartItemAction(index :number){
			let list = this.cartList;
			// let row = list[index];
			// let id = row.id;
			list.splice(index, 1);
		},
		checkAction(type : string, index : number){
			const cartList = this.cartList
			if (type === 'item') {
				cartList[index].checked = !cartList[index].checked;
			} else {
				const checked = !this.allChecked
				const list = this.cartList
				list.forEach(item => {
					item.checked = checked;
				})
				this.allChecked = checked;
			}
		},
		calcTotal(){
			let list = this.cartList;
			if (list.length === 0) {
				this.empty = true;
				return;
			}
			let t = 0;
			let checked = true;
			list.forEach((item: CartItem) => {
				if (item.checked === true) {
					t += item.price * item.number;
				} else if (checked) {
					checked = false;
				}
			})
			this.allChecked = checked;
			this.total = Number(t.toFixed(2));
		},
		initCartList(provider : CartItem[]) {
			this.cartList = provider
			this.calcTotal()
		},
		imageLoadAction(index: number){
			this.cartList[index].loaded = 'loaded'
		},
		imageErrorAction(index: number){
			this.cartList[index].loaded = 'loaded'
			this.cartList[index].image = '/static/errorImage.jpg'
		},
		clearCartAction(){
			this.cartList = []
			this.calcTotal()
		},
		numberChangeAction( {index,number}: IndexNumberData){
			this.cartList[index].number = number	;
		}
	}

})
