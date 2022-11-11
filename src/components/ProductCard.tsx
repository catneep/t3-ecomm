/// Design based on: https://tailwindcomponents.com/component/food-card

import Link from "next/link";
import { useState } from "react";

import type IProduct from "../models/IProduct";
import { addToCartCookie } from "../tools/CookieUtils";

type ProductCardProps = {
  product: IProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => {
  const [shake, setShake] = useState(false);
  const [zoom, setZoom] = useState(false);

  const animate = (result: boolean) => {    
    if (!result) {
      setShake(true);
      setTimeout(() => setShake(false), 100);
    } else {
      setZoom(true);
      setTimeout(() => setZoom(false), 90);
    }
  }

  const handleCart = (product: IProduct) => {
    animate(addToCartCookie(product));
  }

  return (
    <div
      className="col-span-4 sm:col-span-4 md:col-span-2 lg:col-span-1 xl:col-span-1 flex flex-col items-center"
    >
      <div className="bg-white rounded-lg mt-5 overflow-hidden z-0 relative">
        <img
          className="h-40 rounded-md duration-500 motion-safe:hover:scale-105"
          alt={product.name}
          // src="https://source.unsplash.com/MNtag_eXMKw/1600x900"
          src="https://picsum.photos/1600/900"
        />
      </div>
      <div className="bg-white shadow-lg rounded-lg -mt-4 w-64 z-10 relative">
        <div className="py-5 px-5">
          <Link href={`/products?slug=${product.slug}`}>
            <span className="font-bold text-gray-800 text-lg">
              {product.name}
            </span>
          </Link>
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 font-light">
              In Stock: {product.inventory}
            </div>
            <div className="text-2xl text-blue-400 font-bold">
              $ {(product.price / 100).toFixed(2)}
            </div>
          </div>
          <div className="mt-2">
            <button
              className={`add-to-cart-btn ${zoom ? 'scale-110' : ''} ${shake ? 'shake' : ''}`}
              onClick={() => handleCart(product)}
            >
              Add to cart 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;