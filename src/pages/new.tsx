import { type NextPage } from "next";
import Head from "next/head";

import NewProductForm from "../components/NewProductForm";

const NewProduct: NextPage = () => {

  return (
    <>
      <Head>
        <title>New Product</title>
        <meta name="description" content="Register a new product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="pt-4">
        <NewProductForm />
      </main>

    </>
  );
}

export default NewProduct;