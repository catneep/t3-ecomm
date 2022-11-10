/**
 * For data that may follow the general
 * data structure for a Product, but ain't
 * quite an instance.
 */
interface IProduct {
  id: string,
  name: string,
  slug: string;
  price:number,
  inventory:number,
  description:string,
}

export default IProduct;