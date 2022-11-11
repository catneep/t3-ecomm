import type IProduct from "./IProduct";

export default interface ICartItem {
  product: IProduct,
  quantity: number
}