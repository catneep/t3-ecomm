import Link from "next/link";

import { reduceInCartCookie, addToCartCookie } from "../tools/CookieUtils";

import type ICartItem from "../models/ICartItem";
import type IProduct from "../models/IProduct";
import { useState } from "react";

type CartItemViewProps = {
  item: ICartItem,
  onCallback: () => void
}

const CartItemView: React.FC<CartItemViewProps> = ({
  item,
  onCallback
}) => {
  const [count, setCount] = useState(item.quantity);

  const increase = (product: IProduct) => {
    if (addToCartCookie(product)){
      setCount(count + 1);
      onCallback()
    }
  }
  const decrease = (product: IProduct) => {
    if (reduceInCartCookie(product)){
      setCount(count - 1);
      onCallback();
    }
  }
  return (
    <>
      {
        count > 0
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
            <button onClick={() => decrease(item.product)}
              className='rounded-l-md cart-quantity-btn'
            >
              -
            </button>
            <span className="px-3 border-y-2 border-x-0 border-slate-200">
              {item.quantity}
            </span>
            <button onClick={() => increase(item.product)}
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