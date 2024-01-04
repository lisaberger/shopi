import { IProduct } from './product.interface';

type ICartItem = IProduct & {
    qty: number;
};

export type { ICartItem };
