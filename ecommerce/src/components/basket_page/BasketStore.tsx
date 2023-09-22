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

    public quantity: number;

    constructor() {
        this.cart = [];
        this.product = [];
        this.productItem = [];
        this.quantity = 0;
        // this.categoryActive = [];
        makeAutoObservable(this);
    }

    setCart(cart: CartType[]) {
        this.cart = cart;
    }

    setQuantity(n: number) {
        this.quantity = n;
    }

    setProducts(product: LineItem[]) {
        this.product = product;
    }

    setProductItem(product: Obj[]) {
        this.productItem = product;
    }

    getCart() {
        return this.cart;
    }

    getProducts() {
        return this.product;
    }

    getProductItem() {
        return this.productItem;
    }

    getQuantity() {
        return this.quantity;
    }
}
