import Head from "next/head";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

const ProductDetails: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const product = trpc.products.getBySlug.useQuery({slug: slug});

  return (
    <>
      <Head>
        <title>Product details</title>
        <meta name="description" content={product.data ? product.data.description : "Product details"} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <h1>Product details</h1>
      </header>

      <main className="flex flex-wrap w-full">
        {
          product.isFetching
          ? <p>Loading...</p>
          : product.data ?
            <>
            <p className="w-full justify-center"> {product.data.id} </p>
            <p className="w-full justify-center"> {product.data.name} </p>
            <p className="w-full justify-center"> {product.data.description} </p>
            <p className="w-full justify-center"> {product.data.slug} </p>
            <p className="w-full justify-center"> {product.data.price} </p>
            <p className="w-full justify-center"> {product.data.inventory} </p>
            </>
            : <p>Product not found 😢</p>
        }
      </main>


    </>
  );
}

export default ProductDetails;