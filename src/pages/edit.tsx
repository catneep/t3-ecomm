import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

import EditProductForm from "../components/EditProductForm";
import { useRouter } from "next/router";
import Product404 from "../components/Product404";

const EditProducrt: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const product = trpc.products.getBySlug.useQuery({slug: slug});

  return (
    <>
      <Head>
        <title>New Product</title>
        <meta name="description" content="Edit a product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="pt-4">
        {
          product.isFetching
          ? <p>Loading... ⌛</p>
          : product.data
            ? <>
                <EditProductForm product={product.data} />
              </>
            : <Product404 />
        }
      </main>

    </>
  );
}

export default EditProducrt;