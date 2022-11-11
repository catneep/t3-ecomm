import { trpc } from "../utils/trpc";
import { useForm, SubmitHandler } from "react-hook-form";
import type IProduct from "../models/IProduct";
import Product from "../models/Product";
import { useRouter } from "next/router";

const NewProductForm: React.FC = () => {
  const router = useRouter();
  const formTitle = "Register a product";
  const postMutation = trpc.products.add.useMutation();
  const { register, handleSubmit, watch, formState: { errors }} = useForm<IProduct>();
  const onSubmit: SubmitHandler<IProduct> = data => {
    console.log('Form result:', data);
    data.price = formatPrice(data.price.toString());
    data.inventory = Number(data.inventory);
    handleNewEntry(data);
  }

  const handleNewEntry = async (values: IProduct) => {
    // Generates a product with default values
    const newProduct = new Product(values);
    
    postMutation.mutateAsync({
      id: newProduct.id,
      name: newProduct.name,
      description: newProduct.description,
      slug: newProduct.slug,
      price: newProduct.price,
      inventory: newProduct.inventory,
    }).then( () => router.push(`/products?slug=${newProduct.slug}`));
  }
  
  const formatPrice = (price: string):number =>
    Number(Number(price).toFixed(2)) * 100;

  return (
    <>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1 pl-4">
            <div className="px-4 sm:px-0">
              <h3 className="text-3xl font-medium leading-6 text-gray-900">
                {formTitle}
              </h3>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0 pr-8">
            {/* <form action="#" method="POST"> */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                  <div className="grid grid-cols-6 gap-6">

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="product-name" className="block text-sm font-medium text-gray-700">
                        Product name
                      </label>
                      <input
                        {...register('name')}
                        minLength={3}
                        type="text"
                        name="name"
                        id="product-name"
                        placeholder="My Product"
                        required

                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="product-description" className="block text-sm font-medium text-gray-700">
                        Product description
                      </label>
                      <textarea
                        {...register('description')}
                        minLength={50}
                        maxLength={511}
                        name="description"
                        id="product-description"
                        placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. In eum alias expedita nobis quisquam repellat perferendis quaerat consequuntur, aspernatur nesciunt? Aut sed pariatur rem a dolore ducimus quasi sequi tempora."
                        required

                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="product-price" className="block text-sm font-medium text-gray-700">
                        Price (USD)
                      </label>
                      <input
                        {...register('price')}
                        min={1}
                        max={21000000}
                        name="price"
                        id="product-price"
                        placeholder="$1.00"
                        required

                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-4">
                      <label htmlFor="product-inventory" className="block text-sm font-medium text-gray-700">
                        Stock
                      </label>
                      <input
                        {...register('inventory')}
                        min={0}
                        max={99999}
                        name="inventory"
                        id="product-inventory"
                        placeholder="1000"
                        required

                        type="number"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 text-left sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mr-2"
                  >
                    Save
                  </button>
                  <button
                    type="reset"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="hidden sm:block" aria-hidden="true">
        <div className="py-5">
          <div className="border-t border-gray-200" />
        </div>
      </div>      
    </>
  )
}

export default NewProductForm;