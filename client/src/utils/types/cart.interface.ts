import { Product } from './product.interface';

type CartItem = Product & {
    qty: number;
};

export type { CartItem };
