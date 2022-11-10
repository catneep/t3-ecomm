import { trpc } from "../utils/trpc";
import { useForm, SubmitHandler } from "react-hook-form";
import type IProduct from "../models/IProduct";
import Product from "../models/Product";

const NewProductForm: React.FC = () => {
  const postMutation = trpc.products.add.useMutation();
  const { register, handleSubmit, watch, formState: { errors }} = useForm<IProduct>();
  const onSubmit: SubmitHandler<IProduct> = data => {
    data.price = formatPrice(data.price);
    handleNewEntry(data);
  }
  
  const handleNewEntry = (values: IProduct) => {
    // Generates a product with default values
    const newProduct = new Product(values);
    
    postMutation.mutate({
      id: newProduct.id,
      name: newProduct.name,
      description: newProduct.description,
      slug: newProduct.slug,
      price: newProduct.price,
      inventory: newProduct.inventory,
    })
  }
  
  const formatPrice = (price: number):number =>
    Number(price.toFixed(2)) * 100;
  
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='product-name'>Name</label>
          <input { ...register('name') } type="text" name="name" id="product-name" placeholder='My product'/>
        </div>
        <div>
          <label htmlFor='product-description'>Description</label>
          <textarea {...register('description')} rows={4} cols={50} id="product-description" name="description" form="product-form" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. In eum alias expedita nobis quisquam repellat perferendis quaerat consequuntur, aspernatur nesciunt? Aut sed pariatur rem a dolore ducimus quasi sequi tempora." required minLength={4} maxLength={255} />
        </div>
        <div>
          <label htmlFor='product-price'>Price</label>
          <input { ...register('price') } type='number' name="price" id="product-price" placeholder='$0.00' min={1}/>
        </div>
        <div>
          <label htmlFor='product-inventory'>Inventory</label>
          <input { ...register('name') } type="number" name="inventory" id="product-inventory" placeholder='100' min={0} max={9999}/>
        </div>
      </form>
    </>
  );
};

export default NewProductForm;