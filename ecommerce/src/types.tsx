export type Customer = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    addresses: Address[];
    defaultShippingAddress: number;
    shippingAddressIds: number[];
    defaultBillingAddressId: number;
    billingAddressIds: number[];
};

type Address = {
    streetName: string;
    city: string;
    postcode: string;
    country: string;
};
