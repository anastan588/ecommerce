import { Attribute, Image, LocalizedString, Price } from '@commercetools/platform-sdk';
import { makeAutoObservable } from 'mobx';

export type Obj = {
    id: string;
    name: LocalizedString;
    categoriesId: string;
    attributes: Attribute[] | undefined;
    description: LocalizedString | undefined;
    images: Image[] | undefined;
    prices: Price[] | undefined;
};

/* export type Price = {
    centAmount: number;
    currencyCode: string;
    fractionDigits: number;
    type: string;
}; */

export type Prices = {
    discounted: Discount;
    id: string;
    value: Price;
};

export type Discount = {
    id: string;
    value: Price;
};

export type CategoryType = {
    id: string;
    name: string;
};

export type TypeProducts = {
    id: string;
    name: string;
};

export type AttributeType = {
    name: string;
    value: string[];
};

// eslint-disable-next-line import/prefer-default-export
export class ProductsStore {
    public types: TypeProducts[];

    public category: CategoryType[];

    public attributes: AttributeType[];

    public product: Obj[];

    public productItem: Obj[];

    public categoryActive: CategoryType[];

    public attributesActive: AttributeType[];

    constructor() {
        this.types = [];
        this.category = [];
        this.attributes = [];
        this.product = [];
        this.productItem = [];
        this.categoryActive = [];
        this.attributesActive = [];
        makeAutoObservable(this);
    }

    setTypes(types: TypeProducts[]) {
        this.types = types;
    }

    setActiveAttributes(attributesActiveCurr: AttributeType) {
        this.attributesActive.push(attributesActiveCurr);
    }

    delActiveAttributes(attributesActiveCurr: AttributeType) {
        const i = this.attributesActive.indexOf(attributesActiveCurr);
        this.attributesActive.splice(i, 1);
    }

    setCategory(category: CategoryType[]) {
        this.category = category;
    }

    setCategoryActive(categoryActive: CategoryType) {
        this.categoryActive.push(categoryActive);
    }

    delCategoryActive(categoryActive: CategoryType) {
        const i = this.categoryActive.indexOf(categoryActive);
        this.categoryActive.splice(i, 1);
    }

    setAttributes(category: AttributeType[]) {
        this.attributes = category;
    }

    setProducts(product: Obj[]) {
        this.product = product;
    }

    setProductItem(product: Obj[]) {
        this.productItem = product;
    }

    getTypes() {
        return this.types;
    }

    getActiveAttributes() {
        return this.attributesActive;
    }

    getCategory() {
        return this.category;
    }

    getCategoryActive() {
        return this.categoryActive;
    }

    getAttributes() {
        return this.attributes;
    }

    getProducts() {
        return this.product;
    }

    getProductItem() {
        return this.productItem;
    }
}
