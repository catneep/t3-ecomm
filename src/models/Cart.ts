import ICart from "./ICart";
import ICartItem from "./ICartItem";
import CartItem from "./CartItem";
import type IProduct from "./IProduct";

class Cart {
  public elements: ICartItem[];

  constructor(data?:ICart){
    this.elements = data?.elements ?? [];
  }

  public getData(): ICart {
    return {
      elements: this.elements
    }
  }

  public getTotal(): number {
    let total = 0;
    this.elements.map( (item) => total = total + (item.product.price * item.quantity));

    return total;
  }

  private isRepeated(product: IProduct): boolean{
    return this.elements.filter( (e) => e.product.id === product.id).length > 0;
  }

  public getCartItemOfProduct(product: IProduct): ICartItem {
    return this.elements.filter( (e) => e.product.id === product.id)[0] as ICartItem;
  }

  public addProduct(product: IProduct): boolean{
    // Check if its already in cart
    if (this.isRepeated(product)) {
      const cartItem = this.getCartItemOfProduct(product);

      if (cartItem === undefined) return false;

      const cartItemVerifier = new CartItem(product, cartItem.quantity);
      if (!cartItemVerifier.increase()) return false;

      cartItem.quantity = cartItem.quantity + 1;
    }
    // Else add it
    else this.elements.push(new CartItem(product, 1));

    return true;
  }

  public decreaseProduct(product: IProduct): boolean{
    // Check if its already in cart
    if (!this.isRepeated(product)) return false;
    
    const cartItem = this.getCartItemOfProduct(product);

    if (cartItem === undefined) return false;
    
    const cartItemVerifier = new CartItem(product, cartItem.quantity);

    // Check if empty on remove
    if (cartItemVerifier.decrease()){
      this.removeProductById(product.id);
      return true;
    }

    cartItem.quantity = cartItem.quantity - 1;

    return true;
  }

  public removeProductByIndex(index: number){
    this.elements.splice(index, 1);
  }

  public removeProductById(id: string){
    const result = this.elements.filter( (item) => item.product.id !== id);
    this.elements = result;
  }

  public clear(){
    this.elements = [];
  }
}

export default Cart;