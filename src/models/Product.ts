import {v4 as uuid_v4} from 'uuid';
import type IProduct from "./IProduct";

class Product {
  public id: string;
  public name: string;
  public slug: string;
  public price: number;
  public inventory: number;
  public description: string;

  constructor(data?:IProduct){
    this.id = data?.id ?? uuid_v4().toString();
    this.name = data?.name ?? 'My Product';
    this.price = data?.price ?? 10000;
    this.inventory = data?.inventory ?? 1;
    this.description = data?.description ?? 'My Description';
    this.slug = data?.slug ?? this.generateSlug(this.name, this.id);
  }

  public generateSlug(name: string, id: string): string{
    const cleanName = name.length < 10
      ? name.trim().toLowerCase().replaceAll(' ', '-')
      : name.substring(0, 10).trim().toLowerCase().replaceAll(' ', '-')
    return `${cleanName}-${id.substring(0,8)}`;
  }
}

export default Product;