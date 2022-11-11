import type Cart from "../models/Cart"
import CartItemView from "./CartItemView";

type CartViewProps = {
  cart: Cart
}

const CartView: React.FC<CartViewProps> = ({
  cart
}) => {

  return (
    <>
      <section>
        <ul>
          {
            cart.elements.length > 0
            ? cart.elements.map( (item, i) =>
                <CartItemView key={i} item={item} />
              )
            : <p>Your cart is empty 😢</p>
          }
        </ul>
      </section>
      <section className="flex justify-end items-center pr-4">
        <span className="text-lg">
          Total: <span className="font-semibold text-xl">$ {(cart.getTotal() / 100).toFixed(2)}</span>
        </span>
      </section>
    </>
  );
}

export default CartView;