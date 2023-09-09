import { LineItem } from '@commercetools/platform-sdk';
import { type } from '@testing-library/user-event/dist/type';
import { makeAutoObservable } from 'mobx';
import { Obj } from '../catalog_page/productsStore';

export type CartType = {
    cartId: string;
    version: number;
};

export class BasketStore {
    public cart: CartType[];

    public product: LineItem[];

    public productItem: Obj[];

    constructor() {
        this.cart = [];
        this.product = [];
        this.productItem = [];
        // this.categoryActive = [];
        makeAutoObservable(this);
    }

    setCart(cart: CartType[]) {
        this.cart = cart;
    }

    /* setCategoryActive(categoryActive: CategoryType) {
      this.categoryActive.push(categoryActive);
  }

  delCategoryActive(categoryActive: CategoryType) {
      const i = this.categoryActive.indexOf(categoryActive);
      this.categoryActive.splice(i, 1);
  } */

    setProducts(product: LineItem[]) {
        this.product = product;
    }

    setProductItem(product: Obj[]) {
        this.productItem = product;
    }

    getCart() {
        return this.cart;
    }

    /* getCategoryActive() {
        return this.categoryActive;
    } */

    getProducts() {
        return this.product;
    }

    getProductItem() {
        return this.productItem;
    }
}
