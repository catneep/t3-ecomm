import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

import EditProductForm from "../components/EditProductForm";
import { useRouter } from "next/router";
import Product404 from "../components/Product404";
import Spinner from "../components/Spinner";

const EditProduct: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const product = trpc.products.getBySlug.useQuery({slug: slug});

  return (
    <>
      <Head>
        <title>Edit Product</title>
        <meta name="description" content="Edit a product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="product-bg">
        {
          product.isFetching
          ? <Spinner />
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

export default EditProduct;