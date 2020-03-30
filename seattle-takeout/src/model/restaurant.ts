import { Status } from './status';

export interface Restaurant {
    name: string;
    types: string[];
    services: string[];
    phone: string;
    locations: string[];
    address: string;
    website: string;
    deliveryApps: string[];
    veganOptions: boolean | null;
    price: string;
    status?: Status;
}
