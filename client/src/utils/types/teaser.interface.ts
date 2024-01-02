import { Product } from './product.interface';

interface TeaserItem {
    _id: string;
    title: string;
    description: string;
    product: Product;
}

export type { TeaserItem };
