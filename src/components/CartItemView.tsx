import Link from "next/link";

import { reduceInCartCookie, addToCartCookie } from "../tools/CookieUtils";

import type ICartItem from "../models/ICartItem";

type CartItemViewProps = {
  item: ICartItem;
}

const CartItemView: React.FC<CartItemViewProps> = ({
  item
}) => {
  return (
    <>
      {
        item.quantity > 0
        ? <div className="cart-item">
          <section className="block">
            <Link href={`/products?slug=${item.product.slug}`}>
              <p className="text-lg font-semibold">
                {item.product.name}
              </p>
            </Link>
            <p>Stock: {item.product.inventory}</p>
          </section>
          <section className="block cart-quantity-container">
            <button onClick={() => reduceInCartCookie(item.product)}
              className='rounded-l-md cart-quantity-btn'
            >
              -
            </button>
            <span className="px-3 border-y-2 border-x-0 border-slate-200">
              {item.quantity}
            </span>
            <button onClick={() => addToCartCookie(item.product)}
              className={`rounded-r-md cart-quantity-btn ${item.product.inventory <= item.quantity ? 'disabled' : ''}`}
              disabled={item.product.inventory <= item.quantity}
            >
              +
            </button>
          </section>
          <section className="block">
            $ {(item.quantity * item.product.price / 100).toFixed(2)}
          </section>
        </div>
        : <></>
      }
    </>
  );
}

export default CartItemView;