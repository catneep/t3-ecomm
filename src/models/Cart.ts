import CartItem from "./CartItem";
import IProduct from "./IProduct";

class Cart {
  public elements: CartItem[];
  public total: number;

  constructor(){
      this.elements = [];
      this.total = 0;
  }

  private isRepeated(product: IProduct): boolean{
      const lookupId = product.id;
      this.elements.map( (e) => {
          if (e.product.id === lookupId)
              return true;
      });
      return false;
  }

  private getStoredProduct(product: IProduct): CartItem | null{
      const lookupId = product.id;
      this.elements.map( (e) => {
          if (e.product.id === lookupId)
              return e;
      });
      return null;
  }

  public addProduct(product: IProduct): boolean{
      // Check if its already in cart
      if (this.isRepeated(product)) {
          const p = this.getStoredProduct(product);

          if (p === null) return false;

          return p.increase();

      }
      // Else add it
      else this.elements.push(new CartItem(product));

      return true;
  }

  public removeProduct(index: number){
      this.elements.splice(index, 1);
  }
}

export default Cart;