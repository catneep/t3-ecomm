import Link from "next/link";

const Product404 = () => {
  return (
    <div className="flex flex-wrap w-full min-h-full items-center justify-center bg-gray-500 text-white">
      <h1 className="w-full text-center my-9 font-bold text-6xl">
        Woah! you sure about that?
      </h1>
      <p className="w-full text-center font-semibold text-3xl">
        We couldn&apos;t find what you were looking for 😕
      </p>
      <p className="w-full text-center my-9 text-2xl">
        Try going back <Link href='/' className="underline font-semibold">home</Link> 🏠
      </p>
    </div>
  );
}

export default Product404;