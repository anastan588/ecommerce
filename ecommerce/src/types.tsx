export type Customer = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    addresses: Address[];
    defaultShippingAddress: number | undefined;
    shippingAddresses: number[];
    defaultBillingAddress: number | undefined;
    billingAddresses: number[];
};

export type Address = {
    streetName: string;
    city: string;
    postalCode: string;
    country: string;
};
