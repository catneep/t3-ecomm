import { trpc } from "../utils/trpc";
import { useForm, SubmitHandler } from "react-hook-form";
import type IProduct from "../models/IProduct";
import Product from "../models/Product";

type EditProductFormProps = {
  product: IProduct;
};

const EditProductForm: React.FC<EditProductFormProps> = ({
  product
}) => {
  const putMutation = trpc.products.edit.useMutation();
  const { register, handleSubmit, watch, formState: { errors }} = useForm<IProduct>();
  const onSubmit: SubmitHandler<IProduct> = data => {
    console.log('Form result:', data);
    data.price = formatPrice(data.price.toString());
    data.inventory = Number(data.inventory);
    handleEditedEntry(product, data);
  }

  const handleEditedEntry = (product: IProduct, newValues: IProduct) => {
    newValues.id = product.id;
    newValues.slug = undefined;
    const newProduct = new Product(newValues);
    
    putMutation.mutate({
      id: newProduct.id,
      name: newProduct.name,
      description: newProduct.description,
      slug: newProduct.slug,
      price: newProduct.price,
      inventory: newProduct.inventory,
    })
  }
  
  const formatPrice = (price: string):number =>
    Number(Number(price).toFixed(2)) * 100;

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label htmlFor='product-name'>Name</label>
            <input { ...register('name') } defaultValue={product.name} type="text" name="name" id="product-name" placeholder='My product' minLength={3}/>
          </div>
          <div>
            <label htmlFor='product-description'>Description</label>
            <textarea {...register('description')} defaultValue={product.description} rows={4} cols={50} id="product-description" name="description" form="product-form" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. In eum alias expedita nobis quisquam repellat perferendis quaerat consequuntur, aspernatur nesciunt? Aut sed pariatur rem a dolore ducimus quasi sequi tempora." required minLength={4} maxLength={255} />
          </div>
          <div>
            <label htmlFor='product-price'>Price</label>
            <input { ...register('price') } defaultValue={product.price} type='number' name="price" id="product-price" placeholder='$0.00' min={1} />
          </div>
          <div>
            <label htmlFor='product-inventory'>Inventory</label>
            <input { ...register('inventory') } defaultValue={product.inventory} type="number" name="inventory" id="product-inventory" placeholder='100' min={0} max={9999}/>
          </div>
  
          <input type='submit' />
        </form>
      </>
    );
};

export default EditProductForm;