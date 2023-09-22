import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { LineItem, createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { observer } from 'mobx-react-lite';
import { Button, Modal } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import BackGround from '../../images/backgrounds/background3.jpg';
import { apiRootAnonimusClientCastomer } from '../catalog_page/ClientsBuilderCastomer';
import { getLocalStorage } from '../login_page/BuildClient';
import { getClientWithToken } from '../login_page/createClient';
import RequestProductInBasketFromServer from './RequestProductInBasketFromServer';
import DrawProductCardFromTheBasket from './DrawProductCardFromTheBasket';
import classes from './BasketPage.module.css';
import { Context } from '../..';
import 'react-toastify/dist/ReactToastify.css';

import {
    addCodeAnonim,
    addCodeAuth,
    deleteAnonim,
    deleteAuth,
    getCartsAnonimus,
    removeCodeAnonim,
    removeCodeAuth,
} from '../catalog_page/requests';

const getProductsFromServerForAnonymUser = async (
    setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>,
    setCountProduct: React.Dispatch<React.SetStateAction<number>>,
    setSummaryCost: React.Dispatch<React.SetStateAction<number>>,
    setBasketEmpty: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const getCartsAnonym = await getCartsAnonimus();
    const temp = await apiRootAnonimusClientCastomer
        .me()
        .activeCart()
        .get()
        .execute()
        .then((body) => {
            const arr = body.body.lineItems;

            setProductInBasket(arr);
            setBasketEmpty(arr.length === 0);
            const count = arr.reduce((acc, item) => acc + item.quantity, 0);
            setCountProduct(count);

            let costSummary: number = 0;
            arr.map((item) => {
                const price: number = item.price.discounted?.value.centAmount || 1;
                const countFlower: number = item.quantity;
                const sum = price * countFlower;
                costSummary += sum;
                return 1;
            });

            setSummaryCost(costSummary);
        })
        .catch((e) => console.log(e));
};

const getProductsFromServer = async (
    setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>,
    setBasketEmpty: React.Dispatch<React.SetStateAction<boolean>>
) => {
    const { token } = getLocalStorage();
    const mapToken = getLocalStorage();
    const arrayProductInBasket = await RequestProductInBasketFromServer(mapToken.refreshToken);

    if (arrayProductInBasket) {
        setProductInBasket(arrayProductInBasket);
        setBasketEmpty(arrayProductInBasket.length === 0);
    }
};

const clearBasketOnServer = async () => {};

const defineCostOfAllFlowers = async (
    setSummaryCost: React.Dispatch<React.SetStateAction<number>>,
    setCountProduct: React.Dispatch<React.SetStateAction<number>>
) => {
    let costSummary: number = 0;
    let countProduct: number = 0;
    const { token } = getLocalStorage();
    const mapToken = getLocalStorage();
    const arrayProductInBasket = await RequestProductInBasketFromServer(mapToken.refreshToken);

    if (arrayProductInBasket) {
        arrayProductInBasket.map((item) => {
            const price: number = item.totalPrice.centAmount;

            /* if (item.discountedPricePerQuantity.length > 0) {
                price = item.discountedPricePerQuantity[0].discountedPrice.value.centAmount;
            } else {
                price = item.price.discounted?.value.centAmount || 0;
            } */
            /* const price: number = item.price.discounted?.value.centAmount || 1; */
            const count: number = item.quantity;
            countProduct += count;
            /* const sum = price * count; */
            costSummary += price;

            return 1;
        });

        setSummaryCost(costSummary);
        setCountProduct(countProduct);
    }
};

const clearBasket = async () => {
    clearBasketOnServer();
};

const lineItemsDiscountAnonim = async (
    code: string,
    setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>,
    setSummaryCost: React.Dispatch<React.SetStateAction<number>>
) => {
    const arr1 = await addCodeAnonim(code);

    apiRootAnonimusClientCastomer
        .me()
        .activeCart()
        .get()
        .execute()
        .then((body) => {
            const { id } = body.body;
            const { version } = body.body;
            const arr = () => {
                return (
                    apiRootAnonimusClientCastomer
                        .me()
                        .carts()
                        .withId({ ID: id })
                        .post({ body: { version, actions: [{ action: 'addDiscountCode', code }] } })
                        .execute()
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        .then((body) => {
                            const arrayProductAfterPromoCode = body.body.lineItems;
                            setSummaryCost(body.body.totalPrice.centAmount);

                            setProductInBasket(arrayProductAfterPromoCode);

                            arrayProductAfterPromoCode.map((item) => {
                                return 1;
                            });

                            return body.body.lineItems;
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                );
            };
            return arr();
        })
        .catch((e) => console.log(e));
};

const lineItemsDiscountAuth = async (
    code: string,
    setProductInBasket: React.Dispatch<React.SetStateAction<LineItem[]>>,
    setSummaryCost: React.Dispatch<React.SetStateAction<number>>
) => {
    const tokenStore = getLocalStorage();
    const { refreshToken } = tokenStore;
    const arr1 = await addCodeAuth(refreshToken, code);

    const client = getClientWithToken(refreshToken);
    const apiRootToken = createApiBuilderFromCtpClient(client);
    const arrTemp = apiRootToken
        .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
        .me()
        .activeCart()
        .get()
        .execute()
        .then((body) => {
            const cartId = body.body.id;
            const { version } = body.body;
            const arr = () => {
                return (
                    apiRootToken
                        .withProjectKey({ projectKey: 'rsschool-final-task-stage2' })
                        .me()
                        .carts()
                        .withId({ ID: cartId })
                        .post({ body: { version, actions: [{ action: 'addDiscountCode', code }] } })
                        .execute()
                        // eslint-disable-next-line @typescript-eslint/no-shadow
                        .then((body) => {
                            const arrayProductAfterPromoCode = body.body.lineItems;
                            setProductInBasket(arrayProductAfterPromoCode);
                            setSummaryCost(body.body.totalPrice.centAmount);

                            arrayProductAfterPromoCode.map((item) => {
                                return 1;
                            });

                            return body.body.lineItems;
                        })
                        .catch((e) => {
                            console.log(e);
                        })
                );
            };
            console.log(arr());
            return arr();
        })
        .catch((e) => {
            console.log(e);
        });
};

const BasketPage = () => {
    const { store, cart } = useContext(Context);
    const [productsArrayInBasket, setProductInBasket] = useState<LineItem[]>([]);
    const [summaryCost, setSummaryCost] = useState(0);
    const [countOfProduct, setCountProduct] = useState(0);
    const [basketEmpty, setBasketEmpty] = useState(true);
    const [promoCode, setPromoCodeValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    let quantity = cart.getQuantity();
    let products = cart.getProducts();

    const notifyEmptyCart = () => {
        toast.success('Корзина была очищена', {
            position: 'top-center',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
        });
    };

    useEffect(() => {
        if (store.isAuth) {
            getProductsFromServer(setProductInBasket, setBasketEmpty);
            /* productsArrayInBasket.forEach(product => DrawProductCardFromTheBasket(product)); */
            defineCostOfAllFlowers(setSummaryCost, setCountProduct);
        } else {
            getProductsFromServerForAnonymUser(setProductInBasket, setCountProduct, setSummaryCost, setBasketEmpty);
        }
        products = cart.getProducts();
        quantity = cart.getQuantity();
    }, [quantity, products]);

    const handleEvent = async () => {
        if (store.isAuth) {
            const tokenStore = getLocalStorage();
            const { refreshToken } = tokenStore;
            const arr = await deleteAuth(refreshToken).finally(() => {
                setLoading(false);
                notifyEmptyCart();
            });
            if (arr) setProductInBasket(arr);
            setProductInBasket([]);
            cart.setQuantity(0);
            cart.setProducts([]);
            setSummaryCost(0);
            setIsModalOpen(false);
        } else {
            const arr = await deleteAnonim().finally(() => {
                setLoading(false);
                notifyEmptyCart();
            });
            if (arr) setProductInBasket(arr);
            setProductInBasket([]);
            cart.setQuantity(0);
            cart.setProducts([]);
            setSummaryCost(0);
            setIsModalOpen(false);
        }

        setBasketEmpty(true);
    };

    const removePromoCode = async () => {
        const codeId = localStorage.getItem('promoCode');
        if (codeId) {
            if (store.isAuth) {
                const tokenStore = getLocalStorage();
                const { refreshToken } = tokenStore;
                const cartCastomer = await removeCodeAuth(refreshToken, codeId);
                if (cartCastomer) {
                    cart.setProducts(cartCastomer);
                    setProductInBasket(cartCastomer);
                }
            } else {
                const cartAnonim = await removeCodeAnonim(codeId);
                if (cartAnonim) {
                    cart.setProducts(cartAnonim);
                    setProductInBasket(cartAnonim);
                }
            }
        }
    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {};

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <img
                src={BackGround}
                alt="mainPage"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}
            />

            <div
                className={basketEmpty ? ['page_title main', classes.displayBlock].join(' ') : classes.displayNone}
                style={{
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <p>
                    Корзина пуста. Добавить товар можно в странице Каталога<Link to="/catalog"> ЗДЕСЬ</Link>
                </p>
            </div>

            <div
                className={!basketEmpty ? ['page_title main', classes.displayBlock].join(' ') : classes.displayNone}
                style={{
                    position: 'relative',
                    zIndex: 1,
                }}
            >
                <div className={classes.basketTitleBlock}>
                    <div className={classes.promoCodeBlock}>
                        <p>Введи промокод:</p>
                        <input
                            type="text"
                            className={classes.inputPromoCode}
                            value={promoCode}
                            onChange={(event) => {
                                setPromoCodeValue(event.target.value);
                            }}
                        ></input>

                        <Button
                            type="default"
                            onClick={() => {
                                if (!store.isAuth) {
                                    lineItemsDiscountAnonim(promoCode, setProductInBasket, setSummaryCost);
                                } else {
                                    lineItemsDiscountAuth(promoCode, setProductInBasket, setSummaryCost);
                                    defineCostOfAllFlowers(setSummaryCost, setCountProduct);
                                }
                            }}
                        >
                            Add PromoCode
                        </Button>
                        <Button type="default" onClick={removePromoCode}>
                            Remove PromoCode
                        </Button>
                    </div>
                    <Button type="primary" loading={loading} onClick={showModal} className={classes.clearBasketBtn}>
                        Очистить корзину
                    </Button>
                </div>

                <div className={classes.basketContainer}>
                    {productsArrayInBasket.map((product: LineItem) => {
                        return (
                            <div>
                                <DrawProductCardFromTheBasket product={product} />
                            </div>
                        );
                    })}
                </div>
                <div>
                    <div className={classes.totalPrice}>Всего товаров: {cart.getQuantity()}</div>
                    <div className={classes.totalPrice}>Итого стоимость: {summaryCost} EUR</div>
                </div>
                <Modal open={isModalOpen} onOk={handleEvent} onCancel={handleCancel}>
                    <p>Вы уверены, что хотите очистить корзину?</p>
                </Modal>
            </div>
            <ToastContainer />
        </div>
    );
};

export default observer(BasketPage);
