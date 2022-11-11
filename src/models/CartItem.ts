import IProduct from "./IProduct";

class CartItem {
  public product: IProduct;
  public quantity: number;

  constructor(product: IProduct, quantity: number | undefined){
      this.product = product;
      this.quantity = quantity ?? 1;
  }

  /**
   * Attempts to increase the quantity
   * of a product in the cart by one
   * if there's enough in stock.
   * @returns true if operation is successful
   */
  public increase(): boolean{
      if (this.quantity + 1 > this.product.inventory)
          return false;
      
      this.quantity++;
      return true;
  }

  /**
   * Decrease the quantity of a
   * product in the cart by one
   * @returns true if quantity > 0
   */
  public decrease(): boolean{
      this.quantity--;
      return !this.isEmpty();
  }

  public isEmpty(): boolean{
      return this.quantity <= 0;
  }
}

export default CartItem;