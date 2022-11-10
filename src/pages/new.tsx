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

      <header>
        <h1>
          New Product
        </h1>
        <p>
          Please fill the following for in order to register a product.
        </p>
      </header>
      <main>
        <NewProductForm />
      </main>

    </>
  );
}

export default NewProduct;