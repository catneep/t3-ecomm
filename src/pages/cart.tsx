import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";

const Cart: NextPage = () => {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>My Cart</h1>
      </header>

    </>
  );
}

export default Cart;