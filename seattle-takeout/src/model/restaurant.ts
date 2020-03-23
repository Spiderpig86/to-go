export interface Restaurant {
    name: string;
    types: string[];
    phone: string;
    location: string;
    address: string;
    website: string;
    deliveryApps: string[];
    veganOptions: boolean | null;
    price: string;
}