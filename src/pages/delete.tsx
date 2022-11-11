import { type NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

import { useRouter } from "next/router";
import Product404 from "../components/Product404";
import Spinner from "../components/Spinner";
import Link from "next/link";

const DeleteProduct: NextPage = () => {
  const router = useRouter();
  const slug = router.query.slug as string;

  const product = trpc.products.getBySlug.useQuery({slug: slug});
  const deleteMutation = trpc.products.remove.useMutation();

  const handleEntryDeletion = async (id: string) =>
    await deleteMutation.mutateAsync({id: id}).then( () => router.push('/'));

  return (
    <>
      <Head>
        <title>Delete a Product</title>
        <meta name="description" content="Edit a product" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex w-full items-start min-h-screen py-4 bg-gray-300 justify-center">
        {
          product.isFetching
          ? <Spinner />
          : product.data
            ? <div className="flex justify-center delete-dialog">
                <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                  <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Card title</h5>
                  <p className="text-gray-700 text-base mb-4">
                    Some quick example text to build on the card title and make up the bulk of the cards
                    content.
                  </p>
                  <Link href={`/products?slug=${product.data.slug}`} className="cancel mr-2">
                    Cancel
                  </Link>
                  <button type="button"
                    className="confirm"
                    onClick={product.data ? () => handleEntryDeletion(product.data?.id as string) : () => ''}>
                      Delete 🧺
                  </button>
                </div>
              </div>
            : <Product404 />
        }
      </main>

    </>
  );
}

export default DeleteProduct;