export interface GoodsData  {
    attr_val: string | number,
    number: number
}
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
interface UserState {
    userInfo: [];
}
