import { getCookie, setCookie, CookieValueTypes } from 'cookies-next';
import Cart from '../models/Cart';
import type ICart from '../models/ICart';

import type IProduct from '../models/IProduct';

export const buildCartFromCookie = (): Cart => {
  if (getCookie('cart') === undefined)
    return new Cart();
  
    const cartCookie: ICart = JSON.parse(getCookie('cart') as string);
    return new Cart(cartCookie);
}

export const addToCartCookie = (product: IProduct): boolean => {
  // Get cookies and create if not present
  if (getCookie('cart') === undefined){
    console.log('Created new cookie');
    setCookie('cart', {elements: []})
  }
  
  // Parse data and operate
  const cartCookie: ICart = JSON.parse(getCookie('cart') as string);
  
  const cartFromCookie = new Cart(cartCookie);
  if (!cartFromCookie.addProduct(product)){
    console.log('Cant add more of this item :(');
    return false;
  }
  
  setCookie('cart', cartFromCookie.getData())
  console.log('Item added!');
  return true;
}

export const reduceInCartCookie = (product: IProduct): boolean => {
  // Get cookies and create if not present
  if (getCookie('cart') === undefined){
    console.log('Created new cookie');
    setCookie('cart', {elements: []})
    return false;
  }
  
  // Parse data and operate
  const cartCookie: ICart = JSON.parse(getCookie('cart') as string);
  
  const cartFromCookie = new Cart(cartCookie);
  
  if (!cartFromCookie.decreaseProduct(product))
    return false;
  
  setCookie('cart', cartFromCookie.getData())
  return true;
}

export const emptyCartCookie = () => {
  setCookie('cart', {elements: []})
}

export {};