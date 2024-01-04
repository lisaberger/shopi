import { IProduct } from './product.interface';

interface ITeaserItem {
    _id: string;
    title: string;
    description: string;
    product: IProduct;
}

export type { ITeaserItem };
