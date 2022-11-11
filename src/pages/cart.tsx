import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import CartView from "../components/CartView";
import Cart from "../models/Cart";
import { trpc } from "../utils/trpc";

import { buildCartFromCookie } from "../tools/CookieUtils";

const CartPage: NextPage = () => {
  const currentCart = buildCartFromCookie();

  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <main className="product-bg">
        <div className="card-backdrop pt-4 px-3">
          <header className="font-semibold text-2xl ml-2 mb-4">
            <h1>My Cart 🛒</h1>
          </header>

          <section className="mx-8">
            <CartView cart={currentCart}/>
          </section>
        </div>
      </main>

    </>
  );
}

export default CartPage;