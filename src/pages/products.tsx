import Head from "next/head";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import { trpc } from "../utils/trpc";

import type IProduct from "../models/IProduct";
import Link from "next/link";
import Product404 from "../components/Product404";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { addToCartCookie } from "../tools/CookieUtils";

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

      <main className="flex product-bg">
        {
          product.isFetching
          ? <Spinner />
          : product.data ?
            <LocalProductView product={product.data}/>
            : <Product404 />
        }
      </main>
    </>
  );
}

export default ProductDetails;

type LocalProductViewProps = {
  product: IProduct;
}

const LocalProductView: React.FC<LocalProductViewProps> = ({
  product
}) => {
  const formatPrice = (price: string): string[] => price.split('.');

  const [shake, setShake] = useState(false);
  const [zoom, setZoom] = useState(false);
  
  const animate = (result: boolean) => {    
    if (!result) {
      setShake(true);
      setTimeout(() => setShake(false), 100);
    } else {
      setZoom(true);
      setTimeout(() => setZoom(false), 1000);
    }
  }

  const handleCart = (product: IProduct) => {
    animate(addToCartCookie(product));
  }

  return (
    <div className="card-backdrop">
      <div className="w-full px-10 py-6 grid grid-cols-2 gap-4">
        <section className="">
          <img
            className="rounded-md"
            alt={product.name}
            src="https://picsum.photos/1600/900"
            width={1600}
            height={900}
          />
        </section>
        <section className="p-1 pl-3 border-l-2">
          <header className="flex flex-col">
            <div className="w-full flex items-center justify-between">
              <h1 className="font-semibold text-3xl ml-1 w-max">
                {product.name}
              </h1>
              <section className="text-sm">
                <Link
                  href={`/edit?slug=${product.slug}`}
                  className="mr-2"
                  >
                  <span className="hidden md:inline">Edit</span> ✏
                </Link>
                <Link
                  href={`/delete?slug=${product.slug}`}
                >
                  <span className="hidden md:inline">Delete</span> 🧺
                </Link>
              </section>
            </div>
            <p className="w-full block text-gray-400 my-3 mt-1 ml-1">
              In stock: <span> {product.inventory} </span>
            </p>
            <h2 className="w-full block text-4xl my-3 ml-1">
              $ {formatPrice((product.price / 100).toFixed(2))[0]}
              <span className="text-sm text-gray-400">
                .{formatPrice((product.price / 100).toFixed(2))[1]}
              </span>
            </h2>
            <button className={`product-view-cart-btn ${shake ? 'shake' : ''}`} onClick={() => handleCart(product)}>
              { !zoom ? 'Add to cart 🛒' : 'Done!'}
            </button>
          </header>

        </section>
      </div>
      <div className="w-full px-4">
        <article>
          <header className="font-light text-2xl text-gray-400">
            <h3>Product details</h3>
          </header>
          <p className="my-2 mx-4 text-lg">
            {product.description}
          </p>
        </article>
      </div>
    </div>
  );
}
